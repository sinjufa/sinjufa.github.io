// D 戶型立體室內（1～5F＋屋頂）。來源：網頁用\D戶型室內試作_1-5F+屋頂.html（2026-11-14，Tim 製作），
// 場景程式原樣搬入，只拿掉燈光、相機與「走進去」操作。局部座標：x 0～6 m（西→東）、z 0（後）～12.22 m（前），樓板在 y=0。
// 回傳 {1:Group,…,5:Group,6:Group(屋頂)}；由 dollhouse.js 放到 3D 外觀的 D2 位置。
window.buildDInterior=function(){
const S=new THREE.Group();
// 座標：x = 面寬（0..6m，左→右），z = 深度（0 = 後側衛浴，12.22 = 車庫入口），單位 m
const H=3.6,T=0.15,W=6.0,D=12.22;
let G=new THREE.Group();G.position.set(-W/2,0,-D/2);S.add(G);
const M=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o||{}));
const mWall=M(0xeeebe5),mDark=M(0x3a3632),mWood=M(0xbf9a6a,{roughness:.7}),mTile=M(0xdedbd5),mGarage=M(0xcfcbc4),
      mGlass=new THREE.MeshStandardMaterial({color:0xa9c0c4,transparent:true,opacity:.3,roughness:.05}),mStair=M(0xe3cfa7),mLift=M(0xbdb6ac),
      mGreen=M(0x6f8a5a),mPot=M(0x8a6a4c),mStone=M(0xa7a39b),mWhite=M(0xf6f4ef),mCarW=M(0xefede8,{roughness:.4}),mCarG=M(0x8c8780,{roughness:.4}),mWin=M(0x3b4148,{roughness:.2});
let walls=[];
function box(x0,z0,x1,z1,y0,y1,m,solid){const g=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,y1-y0,z1-z0),m);g.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);g.castShadow=g.receiveShadow=true;G.add(g);if(solid)walls.push([x0,z0,x1,z1]);return g;}
const wall=(x0,z0,x1,z1,m)=>box(x0,z0,x1,z1,0,H,m||mWall,true);
const cm=v=>v/100;

// 地坪
box(0,0,W,cm(147),-0.02,0,mTile);                // 衛浴＋庭院
box(cm(190),cm(147),W,cm(680),-0.02,0,mWood);    // 客廳木地板
box(0,cm(147),cm(206),cm(680),-0.02,0,mWood);
box(0,cm(680),W,D,-0.04,-0.02,mGarage);          // 車庫
box(cm(281),0,W,cm(147),-0.01,0.005,M(0xe6e1d6)); // 庭院地面

// 外牆（車庫前方開口）
const mOuter=M(0xd6d1c9);wall(-T,-T,W+T,0,mOuter);wall(-T,0,0,D,mOuter);wall(W,0,W+T,D,mOuter);
// 衛浴段隔牆（依配置圖：衛浴門開在右牆、朝浴室內開；中庭門開在左牆、朝中庭開）
const mDoor=M(0xa5784e,{roughness:.6}),DH=2.1;
function doorLeaf(hx,hz,len,ang){const g=new THREE.Mesh(new THREE.BoxGeometry(0.04,DH,len),mDoor);g.castShadow=true;
  const piv=new THREE.Group();piv.position.set(hx,0,hz);g.position.set(0,DH/2,-len/2);piv.add(g);piv.rotation.y=ang;G.add(piv);
  const knob=new THREE.Mesh(new THREE.SphereGeometry(0.03,10,8),M(0x9a9da1));knob.position.set(0.04,1.0,-len+0.08);piv.add(knob);}
wall(cm(200)-T/2,0,cm(200)+T/2,cm(74));            // 衛浴右牆（上段）
box(cm(200)-T/2,cm(74),cm(200)+T/2,cm(147),DH,H,mWall); // 衛浴門楣
doorLeaf(cm(200),cm(143),cm(68),1.25);            // 衛浴門：鉸鏈在下，往浴室內開
wall(cm(281)-T/2,0,cm(281)+T/2,cm(86));            // 中庭左牆（上段）
box(cm(281)-T/2,cm(86),cm(281)+T/2,cm(147),DH,H,mWall); // 中庭門楣
doorLeaf(cm(281),cm(86),cm(61),Math.PI+1.25);       // 中庭門：鉸鏈在上，往中庭開
wall(0,cm(147)-T/2,cm(206),cm(147)+T/2);          // 衛浴下牆（實牆）
// 庭院牆：281~600 分三等份，中間一段為窗
{const a=cm(281),w3=(W-cm(281))/3,zc=cm(147),t=T/2,sill=0.9,head=2.2;
 wall(a,zc-t,a+w3,zc+t);wall(a+2*w3,zc-t,W,zc+t);
 box(a+w3,zc-t,a+2*w3,zc+t,0,sill,mWall,true);       // 窗台下牆
 box(a+w3,zc-t,a+2*w3,zc+t,head,H,mWall);            // 窗楣上牆
 const fr=0.05,mWF=M(0x3b3d3f,{roughness:.4});
 box(a+w3,zc-0.04,a+2*w3,zc+0.04,sill,sill+fr,mWF);box(a+w3,zc-0.04,a+2*w3,zc+0.04,head-fr,head,mWF);
 box(a+w3,zc-0.04,a+w3+fr,zc+0.04,sill,head,mWF);box(a+2*w3-fr,zc-0.04,a+2*w3,zc+0.04,sill,head,mWF);
 box(a+1.5*w3-fr/2,zc-0.04,a+1.5*w3+fr/2,zc+0.04,sill,head,mWF);  // 中框
 box(a+w3,zc-0.01,a+2*w3,zc+0.01,sill,head,mGlass);}


// 樓梯與電梯

// 電梯：井道三面牆＋右側（朝客廳、對著東側牆）開門
const mShaft=M(0xcfcac2),mSteel=M(0xd3d6d9,{metalness:.2,roughness:.3}),mFrame=M(0x9a9da1,{metalness:.2,roughness:.35});
const LX=cm(185),LZ0=cm(492),LZ1=cm(680);
wall(0,LZ0-T/2,LX+T,LZ0+T/2,mShaft);             // 上牆
wall(0,LZ1-T/2,LX+T,LZ1+T/2,mShaft);             // 下牆
const dz0=cm(540),dz1=cm(632);                    // 門洞（配置圖門位）
wall(LX,LZ0,LX+T,dz0,mShaft);wall(LX,dz1,LX+T,LZ1,mShaft);
box(LX,dz0,LX+T,dz1,2.15,H,mShaft,false);        // 門楣上方
box(LX+T,dz0-0.06,LX+T+0.03,dz1+0.06,0,2.21,mFrame); // 不鏽鋼門框
box(LX+T+0.031,dz0,LX+T+0.045,(dz0+dz1)/2-0.005,0.02,2.15,mSteel,true); // 左門片
box(LX+T+0.031,(dz0+dz1)/2+0.005,LX+T+0.045,dz1,0.02,2.15,mSteel,true); // 右門片
box(LX+T,dz0-0.1,LX+T+0.035,dz1+0.1,2.21,2.36,mFrame); // 樓層顯示框
const disp=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.07),new THREE.MeshBasicMaterial({color:0xff9a3c}));
disp.rotation.y=Math.PI/2;disp.position.set(LX+T+0.037,2.285,(dz0+dz1)/2);G.add(disp);
box(LX+T,dz1+0.14,LX+T+0.02,dz1+0.24,1.0,1.28,mSteel);  // 呼叫按鈕面板
const btn=new THREE.Mesh(new THREE.CircleGeometry(0.022,20),new THREE.MeshBasicMaterial({color:0xe9f2ff}));
btn.rotation.y=Math.PI/2;btn.position.set(LX+T+0.022,1.14,dz1+0.19);G.add(btn);
box(0,LZ0,LX,LZ1,0,0.02,mLift);                  // 車廂地坪
box(0,LZ0,LX+T,LZ1,H-0.02,H,mShaft);             // 井道頂
// 階梯：依配置圖編號 1→19
// 1~4 在下方由右往左；5 轉角；6~13 沿左側往上；14~16 上方迴轉；17~19 右側往下接二樓
const riser=H/20,ST=[];
[[175,200],[150,175],[127,150],[104,127]].forEach(([a,b])=>ST.push([a,399,b,486]));   // 1~4
ST.push([0,399,104,486]);                                                            // 5
for(let k=6;k<=13;k++){const z1=399-(k-6)*21;ST.push([0,z1-21,98,z1]);}             // 6~13
ST.push([0,154.5,69,231],[69,154.5,137,231],[137,154.5,206,231]);                          // 14~16
ST.push([104,231,197,258],[104,258,197,285],[104,285,197,312]);                      // 17~19
// 踏階：14~19 階下方是空的，只保留每階上方 1/3 的厚度
ST.forEach(([a,b,c,d],i)=>{const h=riser*(i+1),y0=(i>=13)?h*2/3:0;box(cm(a),cm(b),cm(c),cm(d),y0,h,mStair,true);});
// 洗手台：木作檯面櫃＋白色檯面盆＋鍍鉻水龍頭（wall：水龍頭靠哪一面牆，'n' 後牆 / 'e' 東牆）
function vanity(x0,z0,x1,z1,wall){x0=cm(x0);z0=cm(z0);x1=cm(x1);z1=cm(z1);
  const mV=M(0xa47a52,{roughness:.6}),mTop=M(0xe9e6e0,{roughness:.4}),mBasin=M(0xfbfaf8,{roughness:.25}),mIn=M(0xbfc5ca,{roughness:.2}),
        mChrome=M(0xe2e5e8,{metalness:.15,roughness:.2});
  box(x0,z0,x1,z1,0,0.8,mV,true);box(x0-0.01,z0,x1+0.01,z1+0.01,0.8,0.84,mTop);
  const w=x1-x0,d=z1-z0,cx=(x0+x1)/2,cz=(z0+z1)/2;
  const along=wall==='n'?w:d, depth=wall==='n'?d:w, rA=Math.min(0.24,along*0.38), rD=Math.min(0.17,depth*0.36);
  const bx=wall==='e'?cx-0.03:cx, bz=wall==='n'?cz+0.03:cz;
  const basin=new THREE.Mesh(new THREE.CylinderGeometry(1,0.86,0.13,40),mBasin);basin.position.set(bx,0.905,bz);
  if(wall==='n')basin.scale.set(rA,1,rD);else basin.scale.set(rD,1,rA);basin.castShadow=true;G.add(basin);
  const bowl=new THREE.Mesh(new THREE.CircleGeometry(1,40),mIn);bowl.rotation.x=-Math.PI/2;bowl.position.set(bx,0.972,bz);
  if(wall==='n')bowl.scale.set(rA*0.85,rD*0.82,1);else bowl.scale.set(rD*0.82,rA*0.85,1);G.add(bowl);
  const fx=wall==='e'?x1-0.06:bx, fz=wall==='n'?z0+0.06:bz;
  const post=new THREE.Mesh(new THREE.CylinderGeometry(0.016,0.02,0.3,16),mChrome);post.position.set(fx,0.99,fz);G.add(post);
  const sp=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.15,12),mChrome);sp.rotation.set(wall==='n'?Math.PI/2:0,0,wall==='e'?Math.PI/2:0);
  sp.position.set(wall==='e'?fx-0.07:fx,1.13,wall==='n'?fz+0.07:fz);G.add(sp);
  const tip=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.04,12),mChrome);tip.position.set(wall==='e'?fx-0.14:fx,1.11,wall==='n'?fz+0.14:fz);G.add(tip);
  const lever=new THREE.Mesh(new THREE.BoxGeometry(wall==='e'?0.02:0.09,0.012,wall==='e'?0.09:0.02),mChrome);lever.position.set(fx,1.15,fz);G.add(lever);
  const mir=M(0xdfe6e8,{roughness:.08,metalness:.2});
  if(wall==='n')box(cx-Math.min(0.3,w*0.4),z0-0.005,cx+Math.min(0.3,w*0.4),z0+0.015,1.25,1.95,mir);
  else box(x1-0.015,cz-Math.min(0.3,d*0.4),x1+0.005,cz+Math.min(0.3,d*0.4),1.25,1.95,mir);
}
// 樓梯扶手：實木扶手（頂部）＋黑色金屬立柱，沿踏階斜度，扶手高 90 cm
const mRail=M(0x8a5a35,{roughness:.5}),mBal=M(0x2b2d2f,{roughness:.4,metalness:.3});
function railing(pts){ // pts: [[x,z,stepTop],...] 沿樓梯內緣
  for(let i=0;i<pts.length-1;i++){const [x0,z0,y0]=pts[i],[x1,z1,y1]=pts[i+1];
    const a=new THREE.Vector3(x0,y0+0.9,z0),b=new THREE.Vector3(x1,y1+0.9,z1),len=a.distanceTo(b);
    const r=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,len),mRail);r.position.copy(a).add(b).multiplyScalar(.5);r.lookAt(b);r.castShadow=true;G.add(r);
    const n=Math.max(1,Math.round(Math.hypot(x1-x0,z1-z0)/0.11));
    for(let k=0;k<n;k++){const t=k/n,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t,y=y0+(y1-y0)*t;
      const bl=new THREE.Mesh(new THREE.BoxGeometry(0.02,0.9,0.02),mBal);bl.position.set(x,y+0.45,z);G.add(bl);}}
  const [ex,ez,ey]=pts[0];box(ex-0.04,ez-0.04,ex+0.04,ez+0.04,ey,ey+0.98,mRail); // 起始端柱
}
const sh=i=>riser*i;
railing([[cm(200),cm(399),sh(1)],[cm(101),cm(399),sh(5)],[cm(101),cm(231),sh(13)],[cm(104),cm(231),sh(16)],[cm(104),cm(312),sh(19)]]); // 1~19 階內緣連續扶手











// 衛浴設備
box(0.15,0.15,0.55,0.25,0,1.9,mStone);            // 淋浴
box(cm(120),0.05,cm(165),0.25,0,0.8,mWhite);       // 馬桶水箱
box(cm(125),0.25,cm(160),0.75,0,0.42,mWhite);
vanity(210,5,272,55,'n');                          // 洗手台
// 庭院植栽
box(cm(300),0.08,cm(360),0.55,0,0.5,mPot);box(cm(305),0.12,cm(355),0.5,0.5,1.1,mGreen);
box(cm(390),0.05,cm(520),0.3,0,0.4,mDark);box(cm(395),0.08,cm(515),0.27,0.4,0.9,mGreen);
const pot=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.38,0.5,24),mStone);pot.position.set(cm(560),0.25,0.45);G.add(pot);
const fl=new THREE.Mesh(new THREE.SphereGeometry(0.4,16,12),M(0xc8553a));fl.position.set(cm(560),0.7,0.45);G.add(fl);
// 車庫兩台車
// 流線型電動轎車（通用造型：無水箱罩、全景玻璃車頂、斜背車尾）
function sideShape(pts){const s=new THREE.Shape();s.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i+=3){s.bezierCurveTo(...pts[i],...pts[i+1],...pts[i+2]);}return s;}
// 側面輪廓：x = 車長方向（0 車尾 → 4.72 車頭），y = 高度
const bodyPts=[[0.05,0.34],
  [0.0,0.5],[0.0,0.78],[0.12,0.86],        // 車尾
  [0.6,0.9],[1.1,0.92],[1.5,0.93],         // 後廂蓋→腰線
  [2.4,0.95],[3.2,0.93],[3.7,0.9],         // 車身腰線
  [4.2,0.84],[4.6,0.72],[4.72,0.55],       // 引擎蓋下滑
  [4.75,0.42],[4.68,0.32],[4.55,0.3],      // 車頭下緣
  [3.2,0.3],[1.5,0.3],[0.05,0.34]];
const roofPts=[[0.15,0.86],
  [0.6,0.98],[1.0,1.2],[1.5,1.36],         // 斜背後窗
  [2.0,1.45],[2.7,1.47],[3.05,1.42],       // 全景玻璃車頂
  [3.4,1.3],[3.65,1.05],[3.85,0.9],        // 前擋風
  [3.0,0.9],[1.0,0.88],[0.15,0.86]];
const bodyGeo=new THREE.ExtrudeGeometry(sideShape(bodyPts),{depth:1.62,bevelEnabled:true,bevelSize:0.06,bevelThickness:0.08,bevelSegments:6,curveSegments:24});
const roofGeo=new THREE.ExtrudeGeometry(sideShape(roofPts),{depth:1.3,bevelEnabled:true,bevelSize:0.05,bevelThickness:0.08,bevelSegments:6,curveSegments:24});
bodyGeo.translate(-2.36,0,-0.81);roofGeo.translate(-2.36,0,-0.65);
const mGlassCar=new THREE.MeshStandardMaterial({color:0x2a323b,metalness:.25,roughness:.1});
const mTire=M(0x1c1c1c,{roughness:.95}),mRim=M(0x55595e,{metalness:.7,roughness:.3});
const mHead=new THREE.MeshBasicMaterial({color:0xf3f6ff}),mTail=new THREE.MeshBasicMaterial({color:0xc4232c});
function car(x,paint){const c=new THREE.Group();
  const b=new THREE.Mesh(bodyGeo,paint);b.castShadow=true;c.add(b);
  const r=new THREE.Mesh(roofGeo,mGlassCar);r.castShadow=true;c.add(r);
  for(const [wx,wz] of [[-1.45,0.82],[-1.45,-0.82],[1.42,0.82],[1.42,-0.82]]){
    const t=new THREE.Mesh(new THREE.CylinderGeometry(0.34,0.34,0.24,28),mTire);t.rotation.x=Math.PI/2;t.position.set(wx,0.34,wz);c.add(t);
    const rim=new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.24,0.25,6),mRim);rim.rotation.x=Math.PI/2;rim.position.set(wx,0.34,wz);c.add(rim);}
  const hl=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.05,0.42),mHead);hl.position.set(2.36,0.68,0.55);c.add(hl);
  const hr=hl.clone();hr.position.z=-0.55;c.add(hr);
  const tl=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.05,1.5),mTail);tl.position.set(-2.35,0.8,0);c.add(tl); // 貫穿式尾燈
  c.rotation.y=-Math.PI/2;                        // 車頭朝車庫門（+z）
  c.position.set(x,0,cm(680)+2.9);G.add(c);walls.push([x-0.95,cm(680)+0.5,x+0.95,cm(680)+5.3]);}
car(cm(190),M(0xf4f3f0,{metalness:.1,roughness:.3}));   // 珍珠白
car(cm(440),M(0x5c636a,{metalness:.15,roughness:.32}));    // 午夜灰

// 壁掛式電動車充電座（電梯井朝車庫那面牆，白色車正前方）
const fz=cm(680)+T/2,cx=0.95;
const mCh=M(0xf4f4f2,{roughness:.35}),mChFace=M(0x1e2124,{roughness:.2});
box(cx-0.17,fz,cx+0.17,fz+0.1,1.05,1.5,mCh);          // 主機
box(cx-0.13,fz+0.1,cx+0.13,fz+0.105,1.12,1.42,mChFace); // 黑色面板
const led=new THREE.Mesh(new THREE.PlaneGeometry(0.16,0.012),new THREE.MeshBasicMaterial({color:0x3fd27a}));
led.position.set(cx,1.36,fz+0.107);G.add(led);
box(cx+0.22,fz,cx+0.32,fz+0.09,1.1,1.2,mCh);          // 充電槍座
const mCable=M(0x222426,{roughness:.6});
const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(cx,1.06,fz+0.06),new THREE.Vector3(cx+0.05,0.45,fz+0.12),new THREE.Vector3(cx+0.35,0.25,fz+0.2),new THREE.Vector3(cx+0.3,0.6,fz+0.12),new THREE.Vector3(cx+0.27,1.12,fz+0.07)]);
const cable=new THREE.Mesh(new THREE.TubeGeometry(curve,40,0.014,8,false),mCable);cable.castShadow=true;G.add(cable);
const conduit=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,H-1.5,10),M(0xb9b6b0));conduit.position.set(cx,1.5+(H-1.5)/2,fz+0.03);G.add(conduit);
// 天花（走進去時才顯示）
const ceil=box(0,0,W,D,H,H+0.12,M(0xf3f1ec));ceil.visible=false;

// ===== 壹層資料 =====
const F1={name:'壹層',g:G,walls:walls,start:{x:3.0,z:11.6,yaw:0},
  zones:[[0,0,2,1.47,'衛浴'],[2,0,2.81,1.47,'洗手間'],[2.81,0,6,1.47,'中庭'],[0,1.47,2.06,4.92,'樓梯'],[0,4.92,1.85,6.8,'電梯'],[1.9,1.47,6,6.8,'客廳'],[0,6.8,6,12.3,'車庫']]};

// ===== 貳層（依貳層配置圖） =====
G=new THREE.Group();G.position.set(-W/2,0,-D/2);S.add(G);walls=[];
{
const mTile2=M(0xdcd9d3),mBal2=M(0xcfccc6),mCab=M(0xd8c3a0,{roughness:.6}),mSofa=M(0x8f8b85),mSofaD=M(0x6f6b66),mRug=M(0xe6dccb),
      mTable=M(0xb48a5c,{roughness:.6}),mChair=M(0xcdb089,{roughness:.6}),mCounter=M(0x8d8a86,{roughness:.5}),mBlack=M(0x232526,{roughness:.3}),
      mFridge=M(0xeeeeec,{roughness:.3}),mTV=M(0x111213,{roughness:.2});
const C=(a,b,c,d,y0,y1,m,s)=>box(cm(a),cm(b),cm(c),cm(d),y0,y1,m,s);
const WALL=(a,b,c,d,m)=>C(a,b,c,d,0,H,m||mWall,true);
// 地坪（左半樓梯為樓梯開口）
C(0,0,600,147,-0.02,0,mTile2);
C(292,0,600,147,-0.015,0.002,mBal2);                 // 後陽台
C(206,147,600,1107,-0.02,0,mWood);
C(197,296,206,486,-0.02,0,mWood);C(0,486,206,1107,-0.02,0,mWood);
C(186,1107,600,1222,-0.02,0,mWood);
C(0,1107,186,1222,-0.02,0,mBal2);                    // 前陽台
C(0,230,96,486,-0.6,-0.58,M(0x55524e));              // 樓梯開口下方（往壹層）
// 外牆
const mOuter2=M(0xd6d1c9);
WALL(-15,-15,615,0,mOuter2);WALL(-15,0,0,1222,mOuter2);WALL(600,0,615,1222,mOuter2);
// 前側：陽台矮牆、陽台隔牆、客廳大窗
C(-15,1214,186,1229,0,1.1,mOuter2,true);
WALL(181,1107,202,1222,mOuter2);
function win(x0,x1,z,sill,head){const fr=0.05,mWF=M(0x3b3d3f,{roughness:.4}),t=T/2;
  C(x0,z*100-t*100,x1,z*100+t*100,0,sill,mOuter2,true);C(x0,z*100-t*100,x1,z*100+t*100,head,H,mOuter2);
  box(cm(x0),z-0.04,cm(x1),z+0.04,sill,sill+fr,mWF);box(cm(x0),z-0.04,cm(x1),z+0.04,head-fr,head,mWF);
  box(cm(x0),z-0.04,cm(x0)+fr,z+0.04,sill,head,mWF);box(cm(x1)-fr,z-0.04,cm(x1),z+0.04,sill,head,mWF);
  box((cm(x0)+cm(x1))/2-fr/2,z-0.04,(cm(x0)+cm(x1))/2+fr/2,z+0.04,sill,head,mWF);
  box(cm(x0),z-0.01,cm(x1),z+0.01,sill,head,mGlass);}
WALL(202,1214,278,1229,mOuter2);WALL(517,1214,600,1229,mOuter2);
win(278,517,12.215,0.5,2.4);                         // 客廳前窗
// 陽台落地拉門（客廳→前陽台）
WALL(0,1100,37,1114);win(37,181,11.07,0.02,2.2);
// 後側：廁所、洗手間、後陽台
WALL(158,0,172,74);C(158,74,172,147,DH,H,mWall);
doorLeaf(cm(165),cm(143),cm(68),1.25);               // 廁所門：往廁所內開
WALL(285,0,295,70);                                   // 洗手間｜陽台
WALL(0,140,344,154);                                  // 後段下牆
C(344,140,427,154,DH,H,mWall);                        // 陽台門楣
doorLeaf(cm(427),cm(147),cm(83),0.35);                // 陽台門：往陽台開
C(427,140,432,154,0,H,mWall,true);
{const a=432,b=528;C(a,140,b,154,0,0.9,mWall,true);C(a,140,b,154,2.2,H,mWall);
 const fr=0.05,mWF=M(0x3b3d3f,{roughness:.4}),z=cm(147);
 box(cm(a),z-0.04,cm(b),z+0.04,0.9,0.9+fr,mWF);box(cm(a),z-0.04,cm(b),z+0.04,2.2-fr,2.2,mWF);
 box(cm(a),z-0.04,cm(a)+fr,z+0.04,0.9,2.2,mWF);box(cm(b)-fr,z-0.04,cm(b),z+0.04,0.9,2.2,mWF);
 box(cm(a),z-0.01,cm(b),z+0.01,0.9,2.2,mGlass);}
WALL(528,140,600,154);
// 廁所、洗手台
C(38,5,86,20,0,0.8,mWhite);C(43,20,81,72,0,0.42,mWhite);       // 馬桶
C(112,0,148,8,0.4,1.0,mWhite);C(114,8,146,34,0.42,0.72,mWhite);C(118,10,142,30,0.721,0.725,M(0xe6eaed));C(128,2,132,6,1.0,1.25,mFrame); // 小便斗（壁掛式）
vanity(195,0,267,59,'n');                                        // 洗手間洗手台
{const pl=new THREE.Mesh(new THREE.SphereGeometry(0.32,14,10),mGreen);pl.position.set(cm(540),0.55,cm(40));G.add(pl);
 C(520,20,560,60,0,0.35,mStone);}
// 樓梯（2026-11-14 更正）：顯示從下一層上來的梯段，最上一階與本層地板齊平；左半往上（前→後），後方平台，右半往上（後→前）
WALL(197,154,214,296,mWall);
const r2=H/20;                                        // 2026-11-14：右半＝從下一層爬上來（最上一階接本層地板）→前方轉角平台（本層地板高）→左半往後往上→後方轉角平台
C(0,432,197,486,-0.12,0,mStair,true);                    // 前方轉角平台
{const t=(432-220)/9;for(let k=1;k<=9;k++){const z1=432-t*(k-1),z0=z1-t,h=r2*k;C(0,z0,96,z1,h*2/3,h,mStair,true);}
C(0,154,197,220,r2*10-0.2,r2*10,mStair,true);              // 後方轉角平台
for(let k=11;k<=19;k++){const z0=220+t*(k-11),z1=z0+t,h=r2*k-H;C(104,z0,197,z1,h-0.25,h,mStair,true);}}  // 右半：從下一層爬上來，最上一階接本層地板
railing([[cm(100),cm(432),r2*1],[cm(100),cm(220),r2*9]]);
railing([[cm(100),cm(220),r2*11-H],[cm(100),cm(432),r2*19-H]]);
// 電梯（同壹層位置，門朝東）
WALL(0,486,201,498,mShaft);WALL(0,674,201,686,mShaft);
WALL(186,498,201,540,mShaft);WALL(186,632,201,674,mShaft);C(186,540,201,632,2.15,H,mShaft);
C(201,534,204,638,0,2.21,mFrame);
C(204.1,540,205.5,585.5,0.02,2.15,mSteel,true);C(204.1,586.5,205.5,632,0.02,2.15,mSteel,true);
C(201,530,204.5,642,2.21,2.36,mFrame);
{const d2=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.07),new THREE.MeshBasicMaterial({color:0xff9a3c}));d2.rotation.y=Math.PI/2;d2.position.set(cm(204.7),2.285,cm(586));G.add(d2);}
C(201,646,203,656,1.0,1.28,mSteel);
C(0,498,186,674,0,0.02,mLift);C(0,486,201,686,H-0.02,H,mShaft);
// 廚房
C(215,164,283,220,0,1.8,mFridge,true);                            // 冰箱
C(535,164,596,405,0,0.88,mCab,true);C(533,164,596,405,0.88,0.92,mCounter);  // 流理台
C(545,175,590,245,0.92,0.93,mBlack);                              // 爐台
C(545,300,590,360,0.89,0.921,M(0xb9bcbf,{metalness:.3,roughness:.3})); // 水槽
C(560,164,596,405,1.5,2.2,mCab);                                  // 吊櫃
C(397,405,596,462,0,1.0,mTable,true);                             // 吧台
{const cy=new THREE.Mesh(new THREE.CylinderGeometry(0.285,0.285,1.0,32),mTable);cy.position.set(cm(397),0.5,cm(433.5));cy.castShadow=true;G.add(cy);walls.push([cm(369),cm(405),cm(397),cm(462)]);}
// 餐廳
C(300,501,519,715,0,0.008,mRug);
C(366,520,451,700,0.72,0.77,mTable,true);
for(const [lx,lz] of [[370,524],[441,524],[370,690],[441,690]])C(lx,lz,lx+6,lz+6,0,0.72,mTable);
for(const z of [525,583,641]){
  C(316,z,358,z+42,0.42,0.47,mChair);C(316,z,322,z+42,0.47,0.9,mChair);C(318,z+2,356,z+40,0,0.42,mChair);
  C(459,z,501,z+42,0.42,0.47,mChair);C(495,z,501,z+42,0.47,0.9,mChair);C(461,z+2,499,z+40,0,0.42,mChair);}
// 鞋櫃
C(4,686,186,728,0,0.9,mCab,true);
// 客廳
C(118,762,348,1069,0,0.008,mRug);
C(15,849,104,1080,0,0.42,mSofa,true);C(15,849,32,1080,0.42,0.82,mSofaD);    // 長沙發
C(30,778,94,842,0,0.5,mTable,true);                                         // 邊几
C(131,772,273,851,0,0.42,mSofa,true);C(131,772,273,790,0.42,0.82,mSofaD);  // 雙人沙發
C(150,909,268,1027,0,0.4,mTable,true);                                      // 茶几
C(548,750,592,1098,0,0.45,mTable,true);                                     // 電視櫃
C(590,839,596,1008,0.9,1.6,mTV);                                            // 電視
for(const [px,pz] of [[575,770],[240,1160],[40,1160]]){const pl=new THREE.Mesh(new THREE.SphereGeometry(0.28,14,10),mGreen);pl.position.set(cm(px),0.6,cm(pz));G.add(pl);C(px-18,pz-18,px+18,pz+18,0,0.35,mStone);}
}
const F2={name:'貳層',g:G,walls:walls,start:{x:4.0,z:10.6,yaw:0},
  zones:[[0,0,1.65,1.47,'廁所'],[1.65,0,2.9,1.47,'洗手間'],[2.9,0,6,1.47,'陽台'],[0,1.47,2.06,4.92,'樓梯'],[2.06,1.47,6,4.62,'廚房'],[0,4.92,1.86,6.8,'電梯'],[0,11.07,1.86,12.3,'陽台'],[2.0,4.62,6,7.4,'餐廳'],[0,6.8,6,12.3,'客廳']]};

// ===== 參層（依參層配置圖） =====
G=new THREE.Group();G.position.set(-W/2,0,-D/2);S.add(G);walls=[];
{
const mTile3=M(0xdcd9d3),mTer=M(0xcfccc6),mCab=M(0xe7dcc8,{roughness:.6}),mBedF=M(0x9c7550,{roughness:.6}),mLinen=M(0xeeeae2),mSage=M(0xa8b59a),
      mBook=M(0x8a6a4c),mOuter3=M(0xd6d1c9),mGlassBlue=new THREE.MeshStandardMaterial({color:0xbfd8e2,transparent:true,opacity:.35,roughness:.05});
const C=(a,b,c,d,y0,y1,m,s)=>box(cm(a),cm(b),cm(c),cm(d),y0,y1,m,s);
const WALL=(a,b,c,d,m)=>C(a,b,c,d,0,H,m||mWall,true);
function winZ(x0,x1,zc,sill,head,mid){const fr=0.05,mWF=M(0x3b3d3f,{roughness:.4}),z=cm(zc),t=T/2;
  box(cm(x0),z-t,cm(x1),z+t,0,sill,mOuter3,true);box(cm(x0),z-t,cm(x1),z+t,head,H,mOuter3);
  box(cm(x0),z-0.04,cm(x1),z+0.04,sill,sill+fr,mWF);box(cm(x0),z-0.04,cm(x1),z+0.04,head-fr,head,mWF);
  box(cm(x0),z-0.04,cm(x0)+fr,z+0.04,sill,head,mWF);box(cm(x1)-fr,z-0.04,cm(x1),z+0.04,sill,head,mWF);
  if(mid!==false)box((cm(x0)+cm(x1))/2-fr/2,z-0.04,(cm(x0)+cm(x1))/2+fr/2,z+0.04,sill,head,mWF);
  box(cm(x0),z-0.01,cm(x1),z+0.01,sill,head,mGlass);}
// 地坪
C(0,0,600,147,-0.02,0,mTer);                                  // 後露臺＋陽台
C(202,147,600,388,-0.02,0,mTile3);                            // 浴室＋廁所
C(188,388,600,1117,-0.02,0,mWood);C(0,486,188,1117,-0.02,0,mWood);
C(0,1117,600,1222,-0.02,0,mTer);                              // 前陽台
// 外牆（露臺、陽台為 110 cm 女兒牆）
WALL(-15,147,0,1117,mOuter3);WALL(600,147,615,1117,mOuter3);
C(-15,-15,615,0,0,1.1,mOuter3,true);C(-15,0,0,147,0,1.1,mOuter3,true);C(600,0,615,147,0,1.1,mOuter3,true);
C(-15,1214,615,1229,0,1.1,mOuter3,true);C(-15,1117,0,1222,0,1.1,mOuter3,true);C(600,1117,615,1222,0,1.1,mOuter3,true);
{const dl=M(0xbdb9b2);box(cm(227),cm(40),cm(229),cm(147),0,0.01,dl);}   // 露臺／陽台分界
// 後牆：樓梯側落地窗、浴室實牆、廁所窗
winZ(10,188,147,0.02,2.2);C(0,140,10,154,0,H,mOuter3,true);
WALL(188,140,437,154,mOuter3);winZ(437,569,147,0.9,2.0);WALL(569,140,600,154,mOuter3);
// 前牆：臥室落地拉門
WALL(0,1110,69,1124,mOuter3);winZ(69,337,1117,0.02,2.2);WALL(337,1110,600,1124,mOuter3);
// 樓梯：左半往上（前→後），後方平台，右半繼續往上（後→前）；下方掏空只留上方 1/3
WALL(188,147,202,395);                                             // 樓梯東牆只到浴室牆；前段（電梯旁）無牆，可從轉角平台走到走道
const r3=H/20;                                        // 2026-11-14：右半＝從下一層爬上來（最上一階接本層地板）→前方轉角平台（本層地板高）→左半往後往上→後方轉角平台
C(0,432,188,486,-0.12,0,mStair,true);                    // 前方轉角平台
{const t=(432-213)/9;for(let k=1;k<=9;k++){const z1=432-t*(k-1),z0=z1-t,h=r3*k;C(0,z0,92,z1,h*2/3,h,mStair,true);}
C(0,147,188,213,r3*10-0.2,r3*10,mStair,true);              // 後方轉角平台
for(let k=11;k<=19;k++){const z0=213+t*(k-11),z1=z0+t,h=r3*k-H;C(100,z0,188,z1,h-0.25,h,mStair,true);}}  // 右半：從下一層爬上來，最上一階接本層地板
railing([[cm(96),cm(432),r3*1],[cm(96),cm(213),r3*9]]);
railing([[cm(96),cm(213),r3*11-H],[cm(96),cm(432),r3*19-H]]);
// 電梯（同下層位置，門朝東）
WALL(0,486,201,498,mShaft);WALL(0,674,201,686,mShaft);
WALL(186,498,201,540,mShaft);WALL(186,632,201,674,mShaft);C(186,540,201,632,2.15,H,mShaft);
C(201,534,204,638,0,2.21,mFrame);
C(204.1,540,205.5,585.5,0.02,2.15,mSteel,true);C(204.1,586.5,205.5,632,0.02,2.15,mSteel,true);
C(201,530,204.5,642,2.21,2.36,mFrame);
{const d3=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.07),new THREE.MeshBasicMaterial({color:0xff9a3c}));d3.rotation.y=Math.PI/2;d3.position.set(cm(204.7),2.285,cm(586));G.add(d3);}
C(201,646,203,656,1.0,1.28,mSteel);
C(0,498,186,674,0,0.02,mLift);C(0,486,201,686,H-0.02,H,mShaft);
// 浴室＋廁所
WALL(188,381,379,395);C(379,381,454,395,DH,H,mWall);WALL(454,381,600,395);
doorLeaf(cm(454),cm(388),cm(75),0);                         // 浴廁門（開向浴室內）
box(cm(376),cm(147),cm(378),cm(297),0,2.1,mGlassBlue,true); // 玻璃隔間
box(cm(302),cm(370),cm(379),cm(372),0,2.0,mGlassBlue);       // 淋浴玻璃門
C(212,153,362,234,0,0.55,mWhite,true);C(222,163,352,224,0.45,0.551,M(0xdfe9ec)); // 浴缸
C(202,308,210,322,1.1,1.95,mFrame);                          // 蓮蓬頭
{const sh=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.02,20),mFrame);sh.position.set(cm(225),1.95,cm(315));G.add(sh);}
C(250,319,300,371,0,0.42,mPot);                              // 木凳
C(578,179,596,216,0,0.8,mWhite);C(533,183,578,212,0,0.42,mWhite);   // 馬桶
vanity(540,257,600,353,'e');                                  // 洗手台
// 走道與更衣室
WALL(315,388,325,543);C(315,543,325,629,DH,H,mWall);WALL(315,629,325,682);
doorLeaf(cm(325),cm(629),cm(86),-1.4);                       // 更衣室門
C(325,393,329,438,0.3,1.9,M(0xdfe6e8,{roughness:.1}));       // 立身鏡
C(325,443,382,539,0,0.95,mCab,true);                         // 抽屜櫃
C(533,390,596,672,0,2.2,mCab,true);                          // 衣櫃
WALL(0,675,325,689);WALL(446,675,600,689);                   // 臥室上方牆（更衣室入口 325~446）
// 臥室
C(8,689,315,741,0,2.2,mCab,true);C(452,689,591,741,0,2.2,mCab,true);   // 衣櫃
C(150,840,290,1069,0,0.008,M(0xe6dccb));                     // 地毯
C(28,868,245,1031,0,0.3,mBedF,true);C(28,868,43,1031,0.3,1.0,mBedF);    // 床架＋床頭板
C(43,873,240,1026,0.3,0.55,mLinen);C(200,873,240,1026,0.55,0.57,mSage); // 床墊、床尾巾
C(50,885,85,945,0.55,0.68,mWhite);C(50,955,85,1015,0.55,0.68,mWhite);  // 枕頭
C(27,813,68,854,0,0.5,mPot,true);C(27,1036,68,1077,0,0.5,mPot,true);    // 床頭櫃
C(564,780,598,1077,0,2.0,mBook,true);                        // 書櫃
for(let i=0;i<5;i++)C(566,790+i*58,597,840+i*58,0.3+i*0.0,1.9,M([0xd9cbb2,0x5d6a5b,0x3e4a56,0xc8b48f,0x8f7e66][i]));
for(const [px,pz] of [[519,1092],[40,40],[560,40],[40,1170]]){const pl=new THREE.Mesh(new THREE.SphereGeometry(0.28,14,10),mGreen);pl.position.set(cm(px),0.6,cm(pz));G.add(pl);C(px-18,pz-18,px+18,pz+18,0,0.35,mStone);}
}
const F3={name:'參層',g:G,walls:walls,start:{x:4.0,z:10.4,yaw:0},
  zones:[[0,0,6,1.47,'露臺／陽台'],[0,1.47,1.88,4.86,'樓梯'],[2.02,1.47,3.78,3.88,'浴室'],[3.78,1.47,6,3.88,'廁所'],[1.88,3.88,3.25,6.82,'走道'],[3.25,3.88,6,6.82,'更衣室'],[0,4.86,1.88,6.82,'電梯'],[0,6.82,6,11.17,'臥室'],[0,11.17,6,12.3,'陽台']]};

// ===== 肆層（依肆層配置圖） =====
G=new THREE.Group();G.position.set(-W/2,0,-D/2);S.add(G);walls=[];
{
const mT4=M(0xdcd9d3),mBal4=M(0xcfccc6),mCab=M(0xe7dcc8,{roughness:.6}),mBedF=M(0x9c7550,{roughness:.6}),mLinen=M(0xeeeae2),mSage=M(0xa8b59a),
      mO4=M(0xd6d1c9),mGlassBlue=new THREE.MeshStandardMaterial({color:0xbfd8e2,transparent:true,opacity:.35,roughness:.05}),mTV=M(0x111213,{roughness:.2});
const C=(a,b,c,d,y0,y1,m,s)=>box(cm(a),cm(b),cm(c),cm(d),y0,y1,m,s);
const WALL=(a,b,c,d,m)=>C(a,b,c,d,0,H,m||mWall,true);
function winZ(x0,x1,zc,sill,head){const fr=0.05,mWF=M(0x3b3d3f,{roughness:.4}),z=cm(zc),t=T/2;
  box(cm(x0),z-t,cm(x1),z+t,0,sill,mO4,true);box(cm(x0),z-t,cm(x1),z+t,head,H,mO4);
  box(cm(x0),z-0.04,cm(x1),z+0.04,sill,sill+fr,mWF);box(cm(x0),z-0.04,cm(x1),z+0.04,head-fr,head,mWF);
  box(cm(x0),z-0.04,cm(x0)+fr,z+0.04,sill,head,mWF);box(cm(x1)-fr,z-0.04,cm(x1),z+0.04,sill,head,mWF);
  box((cm(x0)+cm(x1))/2-fr/2,z-0.04,(cm(x0)+cm(x1))/2+fr/2,z+0.04,sill,head,mWF);
  box(cm(x0),z-0.01,cm(x1),z+0.01,sill,head,mGlass);}
// 地坪
C(197,147,600,1087,-0.02,0,mWood);C(0,486,197,1087,-0.02,0,mWood);
C(324,492,600,672,-0.015,0.002,mT4);                // 衛浴
C(233,43,380,140,-0.02,0,mT4);C(380,43,600,140,-0.02,0,mBal4);   // 後側廁所、陽台
C(0,1087,600,1216,-0.02,0,mBal4);                   // 前陽台／露臺
// 外牆
WALL(-15,147,0,1087,mO4);WALL(600,43,615,1087,mO4);
WALL(233,28,615,43,mO4);WALL(220,43,233,140,mO4);    // 後側凸出（廁所＋陽台）
C(-15,1209,615,1224,0,1.1,mO4,true);C(-15,1087,0,1216,0,1.1,mO4,true);C(600,1087,615,1216,0,1.1,mO4,true);
C(430,1094,437,1209,0,1.8,mO4,true);                 // 陽台／露臺隔牆
// 後牆：樓梯高窗、通往陽台的窗
C(0,133,233,147,0,1.6,mO4,true);C(0,133,233,147,2.0,H,mO4);
box(cm(30),cm(140)-0.01,cm(180),cm(140)+0.01,1.6,2.0,mGlass);
WALL(233,133,437,147,mO4);winZ(437,560,140,0.02,2.2);WALL(560,133,600,147,mO4);
// 後側廁所與陽台
WALL(375,43,385,57);C(375,57,385,133,DH,H,mWall);
doorLeaf(cm(380),cm(129),cm(70),1.4);                // 廁所門（往廁所內開）
C(233,72,250,114,0,0.8,mWhite);C(250,76,308,110,0,0.42,mWhite);    // 馬桶
vanity(547,59,600,123,'e');                          // 陽台洗手槽
// 前側：主臥落地窗
WALL(0,1080,70,1094,mO4);winZ(70,340,1087,0.02,2.2);WALL(340,1080,600,1094,mO4);
// 樓梯（同參層）
WALL(197,147,210,395);
const r4=H/20;                                        // 2026-11-14：右半＝從下一層爬上來（最上一階接本層地板）→前方轉角平台（本層地板高）→左半往後往上→後方轉角平台
C(0,432,197,486,-0.12,0,mStair,true);                    // 前方轉角平台
{const t=(432-218)/9;for(let k=1;k<=9;k++){const z1=432-t*(k-1),z0=z1-t,h=r4*k;C(0,z0,96,z1,h*2/3,h,mStair,true);}
C(0,147,197,218,r4*10-0.2,r4*10,mStair,true);              // 後方轉角平台
for(let k=11;k<=19;k++){const z0=218+t*(k-11),z1=z0+t,h=r4*k-H;C(104,z0,197,z1,h-0.25,h,mStair,true);}}  // 右半：從下一層爬上來，最上一階接本層地板
railing([[cm(100),cm(432),r4*1],[cm(100),cm(218),r4*9]]);
railing([[cm(100),cm(218),r4*11-H],[cm(100),cm(432),r4*19-H]]);
// 後臥室
WALL(210,383,279,395);C(279,383,289,402,0,H,mWall,true);C(279,402,289,487,DH,H,mWall);
WALL(279,487,600,497);
doorLeaf(cm(284),cm(482),cm(78),-1.4);              // 後臥室門
C(216,150,275,383,0,2.2,mCab,true);                 // 衣櫃
C(371,199,570,379,0,0.008,M(0xdcd8d1));             // 地毯
C(410,213,600,365,0,0.3,mBedF,true);C(585,213,600,365,0.3,1.0,mBedF);  // 床（床頭靠東牆）
C(415,218,585,360,0.3,0.55,mLinen);C(415,218,452,360,0.55,0.57,mSage);
C(548,229,580,285,0.55,0.68,mWhite);C(548,293,580,349,0.55,0.68,mWhite);
C(548,370,597,475,0.72,0.76,mPot,true);C(552,374,556,471,0,0.72,mPot);C(589,374,593,471,0,0.72,mPot);   // 書桌
C(498,399,539,440,0,0.45,M(0xcdb089),true);         // 椅凳
// 電梯（同下層位置，門朝東）
WALL(0,486,201,498,mShaft);WALL(0,674,201,686,mShaft);
WALL(186,498,201,540,mShaft);WALL(186,632,201,674,mShaft);C(186,540,201,632,2.15,H,mShaft);
C(201,534,204,638,0,2.21,mFrame);
C(204.1,540,205.5,585.5,0.02,2.15,mSteel,true);C(204.1,586.5,205.5,632,0.02,2.15,mSteel,true);
C(201,530,204.5,642,2.21,2.36,mFrame);
{const d4=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.07),new THREE.MeshBasicMaterial({color:0xff9a3c}));d4.rotation.y=Math.PI/2;d4.position.set(cm(204.7),2.285,cm(586));G.add(d4);}
C(201,646,203,656,1.0,1.28,mSteel);
C(0,498,186,674,0,0.02,mLift);C(0,486,201,686,H-0.02,H,mShaft);
// 衛浴（門開在下方牆、往浴室內開）
WALL(315,497,324,672);
WALL(201,673,216,683);C(216,673,305,683,DH,H,mWall);WALL(305,673,324,683);   // 主臥上牆（門 216~305）
C(324,673,404,683,DH,H,mWall);WALL(404,673,600,683);                       // 衛浴下牆（門 324~404）
doorLeaf(cm(324),cm(678),cm(80),-0.3);              // 衛浴門
doorLeaf(cm(305),cm(678),cm(89),Math.PI-0.25);      // 主臥門
vanity(324,497,410,549,'n');                        // 洗手台
C(445,497,476,512,0,0.8,mWhite);C(441,512,480,565,0,0.42,mWhite);   // 馬桶
box(cm(498),cm(497),cm(500),cm(618),0,2.1,mGlassBlue,true);         // 淋浴玻璃
C(549,497,557,505,1.1,1.95,mFrame);
{const sh=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.02,20),mFrame);sh.position.set(cm(553),1.95,cm(525));G.add(sh);}
C(519,588,581,657,0,0.03,mPot);                     // 淋浴木棧板
// 主臥
C(15,687,205,744,0,2.2,mCab,true);C(410,687,590,744,0,2.2,mCab,true);   // 衣櫃
C(150,788,380,1027,0,0.008,M(0xdcd8d1));
C(15,824,221,998,0,0.3,mBedF,true);C(15,824,30,998,0.3,1.0,mBedF);
C(30,829,216,993,0.3,0.55,mLinen);C(180,829,216,993,0.55,0.57,mSage);
C(35,840,70,900,0.55,0.68,mWhite);C(35,920,70,980,0.55,0.68,mWhite);
C(15,780,56,821,0,0.5,mPot,true);C(15,1003,56,1044,0,0.5,mPot,true);   // 床頭櫃
C(553,788,595,1007,0,0.45,mPot,true);C(590,826,596,966,0.9,1.6,mTV);   // 電視櫃＋電視
for(const [px,pz] of [[250,1052],[520,1052],[299,176],[40,1150]]){const pl=new THREE.Mesh(new THREE.SphereGeometry(0.28,14,10),mGreen);pl.position.set(cm(px),0.6,cm(pz));G.add(pl);C(px-18,pz-18,px+18,pz+18,0,0.35,mStone);}
}
const F4={name:'肆層',g:G,walls:walls,start:{x:4.0,z:10.2,yaw:0},
  zones:[[2.33,0.43,3.8,1.4,'廁所'],[3.8,0.43,6,1.4,'陽台'],[0,1.47,1.97,4.92,'樓梯'],[2.1,1.47,6,4.92,'臥室'],[0,4.92,2.0,6.78,'電梯'],[3.24,4.92,6,6.73,'衛浴'],[2.0,3.95,3.24,6.78,'走道'],[0,6.78,6,10.87,'主臥'],[0,10.87,6,12.3,'陽台／露臺']]};

// ===== 伍層（依伍層配置圖，格局同肆層；差異：後側整片陽台、衛浴門開左牆、右側衣櫃加長） =====
G=new THREE.Group();G.position.set(-W/2,0,-D/2);S.add(G);walls=[];
{
const mT4=M(0xdcd9d3),mBal4=M(0xcfccc6),mCab=M(0xe7dcc8,{roughness:.6}),mBedF=M(0x9c7550,{roughness:.6}),mLinen=M(0xeeeae2),mSage=M(0xa8b59a),
      mO4=M(0xd6d1c9),mGlassBlue=new THREE.MeshStandardMaterial({color:0xbfd8e2,transparent:true,opacity:.35,roughness:.05}),mTV=M(0x111213,{roughness:.2});
const C=(a,b,c,d,y0,y1,m,s)=>box(cm(a),cm(b),cm(c),cm(d),y0,y1,m,s);
const WALL=(a,b,c,d,m)=>C(a,b,c,d,0,H,m||mWall,true);
function winZ(x0,x1,zc,sill,head){const fr=0.05,mWF=M(0x3b3d3f,{roughness:.4}),z=cm(zc),t=T/2;
  box(cm(x0),z-t,cm(x1),z+t,0,sill,mO4,true);box(cm(x0),z-t,cm(x1),z+t,head,H,mO4);
  box(cm(x0),z-0.04,cm(x1),z+0.04,sill,sill+fr,mWF);box(cm(x0),z-0.04,cm(x1),z+0.04,head-fr,head,mWF);
  box(cm(x0),z-0.04,cm(x0)+fr,z+0.04,sill,head,mWF);box(cm(x1)-fr,z-0.04,cm(x1),z+0.04,sill,head,mWF);
  box((cm(x0)+cm(x1))/2-fr/2,z-0.04,(cm(x0)+cm(x1))/2+fr/2,z+0.04,sill,head,mWF);
  box(cm(x0),z-0.01,cm(x1),z+0.01,sill,head,mGlass);}
// 地坪
C(197,147,600,1087,-0.02,0,mWood);C(0,486,197,1087,-0.02,0,mWood);
C(324,492,600,672,-0.015,0.002,mT4);                // 衛浴
C(233,43,600,140,-0.02,0,mBal4);                     // 後陽台
C(0,1087,600,1216,-0.02,0,mBal4);                   // 前陽台／露臺
// 外牆
WALL(-15,147,0,1087,mO4);WALL(600,43,615,1087,mO4);
C(233,28,615,43,0,1.1,mO4,true);C(220,43,233,140,0,1.1,mO4,true);   // 後陽台女兒牆
C(-15,1209,615,1224,0,1.1,mO4,true);C(-15,1087,0,1216,0,1.1,mO4,true);C(600,1087,615,1216,0,1.1,mO4,true);
C(430,1094,437,1209,0,1.8,mO4,true);                 // 陽台／露臺隔牆
// 後牆：樓梯高窗、通往陽台的窗
C(0,133,233,147,0,1.6,mO4,true);C(0,133,233,147,2.0,H,mO4);
box(cm(30),cm(140)-0.01,cm(180),cm(140)+0.01,1.6,2.0,mGlass);
WALL(233,133,282,147,mO4);winZ(282,560,140,0.02,2.2);WALL(560,133,600,147,mO4);
// 後側廁所與陽台

// 前側：主臥落地窗
WALL(0,1080,70,1094,mO4);winZ(70,340,1087,0.02,2.2);WALL(340,1080,600,1094,mO4);
// 樓梯（同參層）
WALL(197,147,210,395);
const r4=H/20;                                        // 2026-11-14：右半＝從下一層爬上來（最上一階接本層地板）→前方轉角平台（本層地板高）→左半往後往上→後方轉角平台
C(0,432,197,486,-0.12,0,mStair,true);                    // 前方轉角平台
{const t=(432-218)/9;for(let k=1;k<=9;k++){const z1=432-t*(k-1),z0=z1-t,h=r4*k;C(0,z0,96,z1,h*2/3,h,mStair,true);}
C(0,147,197,218,r4*10-0.2,r4*10,mStair,true);              // 後方轉角平台
for(let k=11;k<=19;k++){const z0=218+t*(k-11),z1=z0+t,h=r4*k-H;C(104,z0,197,z1,h-0.25,h,mStair,true);}}  // 右半：從下一層爬上來，最上一階接本層地板
railing([[cm(100),cm(432),r4*1],[cm(100),cm(218),r4*9]]);
railing([[cm(100),cm(218),r4*11-H],[cm(100),cm(432),r4*19-H]]);
// 後臥室
WALL(210,383,279,395);C(279,383,289,402,0,H,mWall,true);C(279,402,289,487,DH,H,mWall);
WALL(279,487,600,497);
doorLeaf(cm(284),cm(482),cm(78),-1.4);              // 後臥室門
C(216,150,275,383,0,2.2,mCab,true);                 // 衣櫃
C(371,199,570,379,0,0.008,M(0xdcd8d1));             // 地毯
C(410,213,600,365,0,0.3,mBedF,true);C(585,213,600,365,0.3,1.0,mBedF);  // 床（床頭靠東牆）
C(415,218,585,360,0.3,0.55,mLinen);C(415,218,452,360,0.55,0.57,mSage);
C(548,229,580,285,0.55,0.68,mWhite);C(548,293,580,349,0.55,0.68,mWhite);
C(548,370,597,475,0.72,0.76,mPot,true);C(552,374,556,471,0,0.72,mPot);C(589,374,593,471,0,0.72,mPot);   // 書桌
C(498,399,539,440,0,0.45,M(0xcdb089),true);         // 椅凳
// 電梯（同下層位置，門朝東）
WALL(0,486,201,498,mShaft);WALL(0,674,201,686,mShaft);
WALL(186,498,201,540,mShaft);WALL(186,632,201,674,mShaft);C(186,540,201,632,2.15,H,mShaft);
C(201,534,204,638,0,2.21,mFrame);
C(204.1,540,205.5,585.5,0.02,2.15,mSteel,true);C(204.1,586.5,205.5,632,0.02,2.15,mSteel,true);
C(201,530,204.5,642,2.21,2.36,mFrame);
{const d4=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.07),new THREE.MeshBasicMaterial({color:0xff9a3c}));d4.rotation.y=Math.PI/2;d4.position.set(cm(204.7),2.285,cm(586));G.add(d4);}
C(201,646,203,656,1.0,1.28,mSteel);
C(0,498,186,674,0,0.02,mLift);C(0,486,201,686,H-0.02,H,mShaft);
// 衛浴（門開在下方牆、往浴室內開）
WALL(315,497,324,553);C(315,553,324,637,DH,H,mWall);WALL(315,637,324,672);
WALL(201,673,216,683);C(216,673,305,683,DH,H,mWall);WALL(305,673,324,683);   // 主臥上牆（門 216~305）
WALL(324,673,600,683);                                                     // 衛浴下牆
doorLeaf(cm(320),cm(637),cm(84),-1.4);              // 衛浴門（開在左牆）
doorLeaf(cm(305),cm(678),cm(89),Math.PI-0.25);      // 主臥門
vanity(324,497,410,549,'n');                        // 洗手台
C(445,497,476,512,0,0.8,mWhite);C(441,512,480,565,0,0.42,mWhite);   // 馬桶
box(cm(498),cm(497),cm(500),cm(618),0,2.1,mGlassBlue,true);         // 淋浴玻璃
C(549,497,557,505,1.1,1.95,mFrame);
{const sh=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.02,20),mFrame);sh.position.set(cm(553),1.95,cm(525));G.add(sh);}
C(519,588,581,657,0,0.03,mPot);                     // 淋浴木棧板
// 主臥
C(15,687,205,744,0,2.2,mCab,true);C(310,687,590,744,0,2.2,mCab,true);   // 衣櫃
C(150,788,380,1027,0,0.008,M(0xdcd8d1));
C(15,824,221,998,0,0.3,mBedF,true);C(15,824,30,998,0.3,1.0,mBedF);
C(30,829,216,993,0.3,0.55,mLinen);C(180,829,216,993,0.55,0.57,mSage);
C(35,840,70,900,0.55,0.68,mWhite);C(35,920,70,980,0.55,0.68,mWhite);
C(15,780,56,821,0,0.5,mPot,true);C(15,1003,56,1044,0,0.5,mPot,true);   // 床頭櫃
C(553,788,595,1007,0,0.45,mPot,true);C(590,826,596,966,0.9,1.6,mTV);   // 電視櫃＋電視
for(const [px,pz] of [[250,1052],[520,1052],[299,176],[40,1150],[570,70]]){const pl=new THREE.Mesh(new THREE.SphereGeometry(0.28,14,10),mGreen);pl.position.set(cm(px),0.6,cm(pz));G.add(pl);C(px-18,pz-18,px+18,pz+18,0,0.35,mStone);}
}
const F5={name:'伍層',g:G,walls:walls,start:{x:4.0,z:10.2,yaw:0},
  zones:[[2.33,0.43,6,1.4,'陽台'],[0,1.47,1.97,4.92,'樓梯'],[2.1,1.47,6,4.92,'臥室'],[0,4.92,2.0,6.78,'電梯'],[3.24,4.92,6,6.73,'衛浴'],[2.0,3.95,3.24,6.78,'走道'],[0,6.78,6,10.87,'主臥'],[0,10.87,6,12.3,'陽台']]};

// ===== 屋頂層（依屋頂層配置圖） =====
G=new THREE.Group();G.position.set(-W/2,0,-D/2);S.add(G);walls=[];
{
const mTer=M(0xcfccc6),mDeck=M(0xa9875f,{roughness:.8}),mO=M(0xd6d1c9),mCab=M(0xb48a5c,{roughness:.6}),
      mSofa=M(0x8f8b85),mSofaD=M(0x6f6b66),mRug=M(0xe6dccb),mApp=M(0xf1f1ef,{roughness:.3}),mMetal=M(0x9a9da1,{metalness:.2,roughness:.4});
const C=(a,b,c,d,y0,y1,m,s)=>box(cm(a),cm(b),cm(c),cm(d),y0,y1,m,s);
const WALL=(a,b,c,d,m)=>C(a,b,c,d,0,H,m||mWall,true);
// 地坪
C(197,396,214,486,-0.02,0,mWood);                                 // 樓梯口
C(213,50,600,356,-0.02,0,mTer);                                     // 曬衣露臺
C(197,364,600,690,-0.02,0,mWood);C(0,486,197,690,-0.02,0,mWood);    // 樓梯間
C(0,690,600,1190,-0.03,0,mDeck);                                    // 屋頂露臺木平台
for(let z=700;z<1190;z+=14)C(0,z,600,z+1,0,0.002,M(0x8d6e4c));     // 木板縫
// 樓梯（2026-11-14 更正）：從伍層由右半往前上來；屋頂層往下＝右半往後，到後方平台，左半為挑空
const rr=H/20;                                                     // 屋頂層：只有前方轉角平台（伍層上來的終點），不再往上
C(0,432,197,486,-0.12,0,mStair,true);                               // 前方轉角平台
{const t=(432-220)/9;for(let k=1;k<=9;k++){const z1=432-t*(k-1),z0=z1-t,h=-rr*k;C(104,z0,197,z1,h-0.12,h,mStair,true);}}  // 從伍層上來的右半梯段（在地板下）
C(0,153,197,220,-rr*10-0.12,-rr*10,mStair,true);                   // 後方平台（半層高）
railing([[cm(100),cm(432),0],[cm(100),cm(220),-rr*9]]);
railing([[cm(4),cm(432),0],[cm(96),cm(432),0]]);                    // 挑空前緣護欄
// 外牆、女兒牆
WALL(-15,143,0,690,mO);                                             // 樓梯、電梯西牆
C(0,143,197,153,0,1.0,mO,true);C(0,143,197,153,2.2,H,mO);box(cm(10),cm(148)-0.01,cm(179),cm(148)+0.01,1.0,2.2,mGlass); // 樓梯後窗
WALL(197,44,213,396,mWall);                                         // 樓梯｜曬衣露臺
C(213,36,615,50,0,1.2,mO,true);C(600,50,615,356,0,1.2,mO,true);     // 曬衣露臺女兒牆
WALL(600,356,615,690,mO);                                           // 樓梯間東牆
// 曬衣露臺下牆＋門
C(213,349,300,363,DH,H,mWall);WALL(300,349,600,363);
doorLeaf(cm(215),cm(356),cm(85),-0.2);
// 曬衣露臺設備
C(296,76,304,120,0,1.6,mMetal);C(490,76,498,120,0,1.6,mMetal);     // 曬衣架立柱
C(296,96,498,100,1.55,1.6,mMetal);
for(let i=0;i<8;i++)C(320+i*22,92,330+i*22,104,0.9,1.55,M([0xe9e2d3,0xf2efe8,0xdcd2c0,0xece7dc,0xf5f3ee,0xd8d4cc,0xa8b59a,0x3e4a56][i]));
vanity(515,113,600,191,'e');                                        // 洗手台
C(529,206,592,267,0,0.85,mApp,true);C(529,275,592,337,0,0.85,mApp,true);   // 洗衣機、烘衣機
for(const z of [236,306]){const dr=new THREE.Mesh(new THREE.CircleGeometry(0.2,24),M(0x9aa3a8,{roughness:.2}));dr.rotation.y=-Math.PI/2;dr.position.set(cm(528.5),0.5,cm(z));G.add(dr);}
for(let i=0;i<6;i++)C(213,152+i*12,256,155+i*12,0.5+i*0.3,0.53+i*0.3,mMetal);      // 爬梯踏桿
C(213,150,256,154,0.4,2.4,mMetal);C(213,208,256,212,0.4,2.4,mMetal);
{const st=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,0.42,20),M(0xd8bf94));st.position.set(cm(470),0.21,cm(312));G.add(st);}
// 電梯（同下層位置，門朝東）
WALL(0,486,201,498,mShaft);WALL(0,680,201,692,mShaft);
WALL(186,498,201,540,mShaft);WALL(186,632,201,680,mShaft);C(186,540,201,632,2.15,H,mShaft);
C(201,534,204,638,0,2.21,mFrame);
C(204.1,540,205.5,585.5,0.02,2.15,mSteel,true);C(204.1,586.5,205.5,632,0.02,2.15,mSteel,true);
C(201,530,204.5,642,2.21,2.36,mFrame);
{const dR=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.07),new THREE.MeshBasicMaterial({color:0xff9a3c}));dR.rotation.y=Math.PI/2;dR.position.set(cm(204.7),2.285,cm(586));G.add(dR);}
C(201,646,203,656,1.0,1.28,mSteel);
C(0,498,186,680,0,0.02,mLift);C(0,486,201,692,H-0.02,H,mShaft);
// 樓梯間
C(419,375,550,411,0,0.45,mCab,true);                                // 矮櫃
// 樓梯間前牆：門（188~273）＋實牆＋拉窗
C(201,683,273,697,DH,H,mWall);WALL(273,683,330,697);
{const fr=0.05,mWF=M(0x3b3d3f,{roughness:.4}),z=cm(690);
 C(330,683,552,697,0,0.02,mWall,true);C(330,683,552,697,2.2,H,mWall);
 box(cm(330),z-0.04,cm(552),z+0.04,2.15,2.2,mWF);box(cm(330),z-0.04,cm(334),z+0.04,0,2.2,mWF);box(cm(548),z-0.04,cm(552),z+0.04,0,2.2,mWF);box(cm(440),z-0.04,cm(444),z+0.04,0,2.2,mWF);
 box(cm(330),z-0.01,cm(552),z+0.01,0.02,2.15,mGlass);}
WALL(552,683,600,697);
doorLeaf(cm(201),cm(690),cm(72),-Math.PI+0.25);                      // 通往屋頂露臺的門
// 屋頂露臺
C(-15,690,0,1197,0,1.2,mO,true);C(600,690,615,1197,0,1.2,mO,true);C(-15,1190,615,1204,0,1.2,mO,true);
C(9,911,90,1176,0,0.42,mSofa,true);C(9,911,26,1176,0.42,0.8,mSofaD);       // L 型戶外沙發
C(90,1100,368,1176,0,0.42,mSofa,true);C(9,1159,368,1176,0.42,0.8,mSofaD);
C(106,939,356,1100,0,0.008,mRug);
{const t=new THREE.Mesh(new THREE.CylinderGeometry(0.48,0.48,0.06,36),mCab);t.position.set(cm(220),0.4,cm(1019));G.add(t);
 const l=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.08,0.37,12),mCab);l.position.set(cm(220),0.185,cm(1019));G.add(l);walls.push([cm(172),cm(971),cm(268),cm(1067)]);
 const s=new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.13,0.5,20),mCab);s.position.set(cm(437),0.25,cm(1000));G.add(s);}
for(const z of [916,1021]){C(400,z,475,z+69,0,0.42,mSofa,true);C(458,z,475,z+69,0.42,0.8,mSofaD);}   // 單人椅
C(548,791,594,1067,0,0.5,M(0x5a4a3a),true);                         // 植栽槽
for(let i=0;i<8;i++){const g=new THREE.Mesh(new THREE.ConeGeometry(0.15,0.55,8),mGreen);g.position.set(cm(571),0.78,cm(808+i*33));G.add(g);}
for(const [px,pz] of [[40,730],[560,730],[468,1140],[560,1140],[580,75]]){const pl=new THREE.Mesh(new THREE.SphereGeometry(0.3,14,10),mGreen);pl.position.set(cm(px),0.6,cm(pz));G.add(pl);C(px-18,pz-18,px+18,pz+18,0,0.35,mStone);}
}
const FR={name:'屋頂層',g:G,walls:walls,start:{x:3.0,z:7.6,yaw:Math.PI},
  zones:[[2.13,0.4,6,3.56,'曬衣露臺'],[0,1.43,1.97,4.86,'樓梯'],[0,4.86,2.0,6.86,'電梯'],[1.97,3.56,6,6.9,'樓梯間'],[0,6.9,6,12.1,'屋頂露臺']]};

const out={1:F1.g,2:F2.g,3:F3.g,4:F4.g,5:F5.g,6:FR.g};
// 手機效能：同材質的零件合併成一個網格（每層約 3,000 個零件 → 幾十個），畫面一樣、繪製次數大減
function merge(g){g.position.set(0,0,0);g.updateMatrixWorld(true);const by=new Map(),inv=new THREE.Matrix4().copy(g.matrixWorld).invert(),m4=new THREE.Matrix4(),nm=new THREE.Matrix3();let n0=0;
 g.traverse(o=>{if(!o.isMesh||!o.visible)return;n0++;let geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();m4.multiplyMatrices(inv,o.matrixWorld);geo.applyMatrix4(m4);
  if(!geo.attributes.normal)geo.computeVertexNormals();const k=o.material;if(!by.has(k))by.set(k,[]);by.get(k).push(geo);});
 const ng=new THREE.Group();ng.userData.parts=n0;
 by.forEach((list,mat)=>{let len=0;list.forEach(q=>len+=q.attributes.position.count);const P=new Float32Array(len*3),N=new Float32Array(len*3);let o=0;
  list.forEach(q=>{P.set(q.attributes.position.array,o*3);N.set(q.attributes.normal.array,o*3);o+=q.attributes.position.count;q.dispose();});
  const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.BufferAttribute(P,3));bg.setAttribute('normal',new THREE.BufferAttribute(N,3));bg.computeBoundingSphere();
  const me=new THREE.Mesh(bg,mat);me.castShadow=!mat.transparent;me.receiveShadow=true;ng.add(me);});
 g.traverse(o=>{if(o.isMesh)o.geometry.dispose();});return ng;}
Object.keys(out).forEach(k=>{out[k]=merge(out[k]);out[k].visible=false;});
return out;};
