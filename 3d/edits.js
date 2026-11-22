const TILE=new THREE.MeshStandardMaterial({color:0xf2f0ea,roughness:.55,metalness:0});
function inBox(v,b){return v.x>=b[0][0]&&v.x<=b[1][0]&&v.y>=b[0][1]&&v.y<=b[1][1]&&v.z>=b[0][2]&&v.z<=b[1][2];}
const ROOFWOOD=[[16.5,18,-11.2],[27.8,24,-8.8]],BAL2F=[[-0.5,4.2,-19.5],[4.2,9.5,-7.5]],BACK=[[39.5,1.5,-8.2],[41.5,7,-1.2]];  // 步道東端：綠牆＋兩扇木門＋灌木
function editMesh(o){const m=o.material,n=m.name||'';const pos=o.geometry.attributes.position;const q=pos.normalized?32767:1;o.updateMatrixWorld(true);
 const wv=i=>new THREE.Vector3(pos.getX(i)/q,pos.getY(i)/q,pos.getZ(i)/q).applyMatrix4(o.matrixWorld);
 // 1) 頂樓木地板、2F 露台木地板 → 白色磁磚
 if(n==='*14'){const idx=o.geometry.index;if(idx){const arr=idx.array;const keep=[],tile=[];for(let t=0;t<arr.length;t+=3){const cen=wv(arr[t]).add(wv(arr[t+1])).add(wv(arr[t+2])).multiplyScalar(1/3);(inBox(cen,BAL2F)?tile:keep).push(arr[t],arr[t+1],arr[t+2]);}
   if(tile.length){const g2=o.geometry.clone();g2.setIndex(new THREE.BufferAttribute(new (arr.constructor)(tile),1));const m2=new THREE.Mesh(g2,TILE);m2.applyMatrix4(o.matrixWorld);m2.castShadow=m2.receiveShadow=true;S.add(m2);o.geometry.setIndex(new THREE.BufferAttribute(new (arr.constructor)(keep),1));}}}
 if(!['Deciduous_17','[Vegetation_Grass1]','[Wood Bamboo]','原櫻桃木','[Wood Veneer 01]','*14'].includes(n)){const idx=o.geometry.index;if(idx){const arr=idx.array;const keep=[],tile=[];
   for(let t=0;t<arr.length;t+=3){const a=wv(arr[t]),b=wv(arr[t+1]),c=wv(arr[t+2]);const cen=a.clone().add(b).add(c).multiplyScalar(1/3);const flat=Math.abs(a.y-b.y)<.05&&Math.abs(a.y-c.y)<.05;
    (flat&&cen.y>4.2&&cen.y<6.2&&inBox(cen,BAL2F)?tile:keep).push(arr[t],arr[t+1],arr[t+2]);}
   if(tile.length){const g2=o.geometry.clone();g2.setIndex(new THREE.BufferAttribute(new (arr.constructor)(tile),1));const m2=new THREE.Mesh(g2,TILE);m2.applyMatrix4(o.matrixWorld);m2.receiveShadow=true;S.add(m2);o.geometry.setIndex(new THREE.BufferAttribute(new (arr.constructor)(keep),1));}}}
 if(n==='[Wood Floor]'||n==='[Wood Cherry Original]'){let hit=0;for(let i=0;i<pos.count;i+=37)if(inBox(wv(i),ROOFWOOD)||inBox(wv(i),BAL2F))hit++;if(hit){o.material=TILE;return;}}
 // 2) 2F 露台的樹、草、竹、櫻桃木花台；北端牆面的綠植與門 → 刪除落在範圍內的三角形
 // 大門右柱百葉窗（Tim 2026-11-17：整個刪除，招牌直接掛牆）
 const LOUV=[[0.2,3.85,-1.45],[0.9,4.6,-0.40]];
 if(n==='PaletteMaterial001'||n==='[Metal_Seamed]3'||n==='[Polished Concrete Old]'){const idx=o.geometry.index;if(idx){const arr=idx.array;const keep=[];for(let t=0;t<arr.length;t+=3){const cen=wv(arr[t]).add(wv(arr[t+1])).add(wv(arr[t+2])).multiplyScalar(1/3);const inL=inBox(cen,LOUV)&&(n!=='[Polished Concrete Old]'||cen.x>0.25);if(!inL)keep.push(arr[t],arr[t+1],arr[t+2]);}if(keep.length!==arr.length)o.geometry.setIndex(new THREE.BufferAttribute(new (arr.constructor)(keep),1));}}
 const killMat={'Deciduous_17':[BAL2F],'[Vegetation_Grass1]':[BAL2F],'[Wood Bamboo]':[BAL2F],'原櫻桃木':[BAL2F],'[Wood Veneer 01]':[BAL2F],'[Grass Light Green]':[BACK],'WoodFine0007_S':[BACK],'[Wood Veneer 02]':[BACK],'[Vegetation Juniper]':[BACK]};
 const boxes=killMat[n];if(!boxes)return;
 const idx=o.geometry.index;if(!idx)return;const arr=idx.array;const keep=[];
 for(let t=0;t<arr.length;t+=3){const a=wv(arr[t]),b=wv(arr[t+1]),c=wv(arr[t+2]);const cen=a.add(b).add(c).multiplyScalar(1/3);
  let kill=false;for(const bx of boxes){if(inBox(cen,bx)){ // 北端只刪綠植與門（低於 6.5 m 的貼牆面）；牆本身（PaletteMaterial001）只刪門片
    kill=true;}}
  if(!kill)keep.push(arr[t],arr[t+1],arr[t+2]);}
 if(keep.length!==arr.length){o.geometry.setIndex(new THREE.BufferAttribute(new (arr.constructor)(keep),1));}}
// 3) 北端種一排竹子擋住牆
function bambooRow(){const g=new THREE.Group();
 // 補一面牆（原模型這面牆就是綠色貼圖，刪掉後要補實牆）
 const wallM=new THREE.MeshStandardMaterial({color:0xcfcbc3,roughness:.9});const wall=new THREE.Mesh(new THREE.BoxGeometry(.3,4.2,6.6),wallM);wall.position.set(40.45,GY+2.1,-4.75);wall.castShadow=wall.receiveShadow=true;g.add(wall);
 const pot=new THREE.Mesh(new THREE.BoxGeometry(.8,.5,6.4),new THREE.MeshStandardMaterial({color:0x8a8780,roughness:.95}));pot.position.set(39.85,GY+.25,-4.75);pot.receiveShadow=true;g.add(pot);const stem=new THREE.MeshStandardMaterial({color:0x6e8a3a,roughness:.7});const leaf=new THREE.MeshStandardMaterial({color:0x3f7a2e,roughness:.9,side:THREE.DoubleSide});
 for(let z=-7.7;z<=-1.8;z+=0.22){const x=z;const h=4.0+Math.sin(z*7.3)*.6;const s=new THREE.Mesh(new THREE.CylinderGeometry(.045,.055,h,6),stem);s.position.set(39.85+Math.cos(z*9.3)*.28,GY+0.5+h/2,z+Math.sin(z*3.1)*.08);s.rotation.z=Math.sin(x*5)*.03;s.castShadow=true;g.add(s);
  for(let k=0;k<10;k++){const y=GY+1.4+k*(h-1.0)/10;const l=new THREE.Mesh(new THREE.PlaneGeometry(.7,.3),leaf);l.position.set(s.position.x+Math.sin(x*11+k)*.3,y,s.position.z+Math.cos(x*13+k)*.3);l.rotation.set(Math.sin(k+x)*.6,Math.cos(k*2+x)*3,Math.sin(x+k*3)*.5);l.castShadow=true;g.add(l);}}
 S.add(g);}

// ================= 2026-11-16 下午：燈具、招牌、鄰宅、太原車站 =================
window.NIGHT_HOOK=window.NIGHT_HOOK||[];
const WARM=0xffc97a;
const glowMat=()=>new THREE.MeshBasicMaterial({color:0xffb860,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
const GLOWS=[],EMIS=[];
let HALO=null;function haloTex(){if(HALO)return HALO;const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,'rgba(255,200,120,1)');r.addColorStop(.35,'rgba(255,180,90,.45)');r.addColorStop(1,'rgba(255,160,60,0)');g.fillStyle=r;g.fillRect(0,0,128,128);HALO=new THREE.CanvasTexture(c);return HALO;}
function glowCone(x,y,z,len,r,up){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:haloTex(),color:0xffc27a,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.set(r*2.2,len*.9,1);sp.position.set(x,y+(up?len*.38:-len*.38),z);S.add(sp);GLOWS.push([sp,.55]);}
// 1) 壁燈：120×240×108 mm，上下出光
function wallLamp(x,y,z,face){const g=new THREE.Group();const body=new THREE.Mesh(new THREE.BoxGeometry(.12,.24,.108),new THREE.MeshStandardMaterial({color:0x2a2c30,roughness:.5,metalness:.4}));g.add(body);
 const capM=new THREE.MeshStandardMaterial({color:0xfff2d0,emissive:WARM,emissiveIntensity:0});EMIS.push([capM,2.5]);
 for(const s of [1,-1]){const c=new THREE.Mesh(new THREE.BoxGeometry(.10,.012,.09),capM);c.position.y=s*.121;g.add(c);}
 g.position.set(x,y,z);g.rotation.y=face==='w'?0:face==='e'?Math.PI:face==='n'?Math.PI/2:-Math.PI/2;S.add(g);
 const ox=face==='w'?-.04:face==='e'?.04:0,oz=face==='n'?-.06:face==='s'?.06:0;glowCone(x+ox,y+.13,z+oz,1.3,.42,true);glowCone(x+ox,y-.13,z+oz,1.6,.5,false);}
// 2) 庭園壁燈：Φ120×37 mm 圓盤，上下出光，裝在植栽牆上
function gardenLamp(x,y,z){const g=new THREE.Group();const disc=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.037,24),new THREE.MeshStandardMaterial({color:0x2a2c30,roughness:.5,metalness:.4}));disc.rotation.x=Math.PI/2;g.add(disc);
 const capM=new THREE.MeshStandardMaterial({color:0xfff2d0,emissive:WARM,emissiveIntensity:0});EMIS.push([capM,2.5]);
 for(const s of [1,-1]){const c=new THREE.Mesh(new THREE.BoxGeometry(.07,.008,.03),capM);c.position.set(0,s*.058,-.012);g.add(c);}
 g.position.set(x,y,z);S.add(g);glowCone(x,y+.06,z-.03,.9,.35,true);glowCone(x,y-.06,z-.03,.7,.35,false);}
// 3) 聚 招牌：Φ62.4 cm，金色發光、字不發光
function sign(x,y,z){{let pm=null;MODEL.traverse(o=>{if(!pm&&o.isMesh&&o.material.name==='[Polished Concrete Old]')pm=o.material;});const fill=new THREE.Mesh(new THREE.BoxGeometry(.5,.8,1.1),pm||new THREE.MeshStandardMaterial({color:0x9a978f,roughness:.9}));fill.position.set(.48,y-.1,-.92);S.add(fill);}const tl=new THREE.TextureLoader();const map=tl.load('sign.png'),em=tl.load('sign_e.png');map.encoding=THREE.sRGBEncoding;em.encoding=THREE.sRGBEncoding;
 
 const m=new THREE.MeshStandardMaterial({map,transparent:true,alphaTest:.4,emissiveMap:em,emissive:new THREE.Color(0xffc060),emissiveIntensity:0,roughness:.45,metalness:.3,side:THREE.DoubleSide});EMIS.push([m,1.6]);
 const s=new THREE.Mesh(new THREE.PlaneGeometry(.624,.624),m);s.position.set(x-.02,y,z);s.rotation.y=-Math.PI/2;S.add(s);}
// 4) 鄰宅：透明量體＋發光白邊
function ghostHouse(x0,z0,x1,z1,fl){const h=fl*3.2;const geo=new THREE.BoxGeometry(x1-x0,h,z1-z0);const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.06,depthWrite:false}));
 m.position.set((x0+x1)/2,GY+h/2,(z0+z1)/2);S.add(m);const e=new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.9}));e.position.copy(m.position);S.add(e);}
// 5) 太原車站（外觀示意，約 70%）
function station(){const g=new THREE.Group();const X0=150,L=130,Z0=-70;const body=new THREE.MeshStandardMaterial({color:0xd8d9d6,roughness:.85});const conc=new THREE.MeshStandardMaterial({color:0xb9b8b2,roughness:.9});
 const silver=new THREE.MeshStandardMaterial({color:0xc9ccd0,metalness:.55,roughness:.35,side:THREE.DoubleSide});const orange=new THREE.MeshStandardMaterial({color:0xd9512e,roughness:.6});
 for(let z=Z0+8;z<Z0+L;z+=24){for(const x of [X0+5,X0+15]){const p=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.3,10,12),conc);p.position.set(x,GY+5,z);p.castShadow=true;g.add(p);}
  const cap=new THREE.Mesh(new THREE.BoxGeometry(16,1.6,3),conc);cap.position.set(X0+10,GY+10.6,z);g.add(cap);}
 const deck=new THREE.Mesh(new THREE.BoxGeometry(20,2.4,L),body);deck.position.set(X0+10,GY+12.4,Z0+L/2);deck.castShadow=deck.receiveShadow=true;g.add(deck);
 for(const x of [X0+0.3,X0+19.7]){const w=new THREE.Mesh(new THREE.BoxGeometry(.6,2.2,L),body);w.position.set(x,GY+14.7,Z0+L/2);g.add(w);}
 // 站體（中段 60 m）：牆、玻璃、波浪屋頂
 const SL=60,SZ=Z0+L/2;const glassM=new THREE.MeshStandardMaterial({color:0x6c7a86,roughness:.1,metalness:.6,transparent:true,opacity:.75,emissive:0xffe2b8,emissiveIntensity:0});EMIS.push([glassM,.9]);
 for(const x of [X0+1,X0+19]){const gl=new THREE.Mesh(new THREE.BoxGeometry(.3,4.2,SL),glassM);gl.position.set(x,GY+17.9,SZ);g.add(gl);}
 for(let z=SZ-SL/2;z<=SZ+SL/2;z+=10){for(const x of [X0+1,X0+19]){const c=new THREE.Mesh(new THREE.BoxGeometry(.5,6.5,.5),body);c.position.set(x,GY+17,z);g.add(c);}}
 const rg=new THREE.PlaneGeometry(26,SL+8,10,48);const pa=rg.attributes.position;for(let i=0;i<pa.count;i++){const u=pa.getX(i),v=pa.getY(i);pa.setZ(i,1.4*Math.sin(v/9*Math.PI)+2.2*Math.cos(u/13*Math.PI/2)-1.2);}rg.computeVertexNormals();
 const roof=new THREE.Mesh(rg,silver);roof.rotation.x=-Math.PI/2;roof.position.set(X0+10,GY+20.3,SZ);roof.castShadow=true;g.add(roof);
 const under=new THREE.Mesh(new THREE.PlaneGeometry(22,SL+4),new THREE.MeshStandardMaterial({color:0x3a3d44,emissive:0xffe9c8,emissiveIntensity:0,side:THREE.DoubleSide}));under.rotation.x=Math.PI/2;under.position.set(X0+10,GY+19.4,SZ);g.add(under);EMIS.push([under.material,.7]);
 // 橘紅斜格立面（西側、南段）
 const lat=new THREE.Group();const z0=SZ-SL/2-20,z1=SZ-SL/2+6;for(let z=z0;z<z1;z+=3){for(const sgn of [1,-1]){const b=new THREE.Mesh(new THREE.BoxGeometry(.25,7.2,.25),orange);b.position.set(X0-.6,GY+15.2,z+1.5);b.rotation.x=sgn*.42;lat.add(b);}}
 const rail=new THREE.Mesh(new THREE.BoxGeometry(.3,.5,z1-z0),orange);rail.position.set(X0-.6,GY+18.6,(z0+z1)/2);lat.add(rail);const rail2=rail.clone();rail2.position.y=GY+11.8;lat.add(rail2);
 const fin=new THREE.Mesh(new THREE.BoxGeometry(1.2,3,14),orange);fin.position.set(X0-.2,GY+12.4,z0+7);fin.rotation.z=.08;lat.add(fin);g.add(lat);
 // 站名牌
 const nm=new THREE.Mesh(new THREE.BoxGeometry(1.4,3.2,.2),new THREE.MeshStandardMaterial({color:0xf4f1ea,emissive:0xfff3dc,emissiveIntensity:0}));nm.position.set(X0+5,GY+4,SZ-14);g.add(nm);EMIS.push([nm.material,.8]);
 g.traverse(o=>{if(o.isMesh)o.receiveShadow=true;});S.add(g);}
window.NIGHT_HOOK.push(k=>{for(const [m,i] of EMIS)m.emissiveIntensity=i*k.lamp;for(const [g,o] of GLOWS)g.material.opacity=o*k.lamp;});
function addLightsAndSite(){
 // 壁燈：車道兩側柱子（前排西面、後排西面），高約 2.1 m
 for(const x of [11.5,17,22,28,33.5,36.2,38.5,40.2])wallLamp(x,GY+2.0,-7.95,'s');  // 8 盞，右棟每根柱子，面向步道
 // 庭園壁燈：右側植栽牆（z≈+1.25），每棵樹後面一盞
 for(const x of [12,15,18,21])gardenLamp(x,GY+.6,-0.30);
 // 招牌：大門右柱西面，取代百葉窗
 sign(.12,GY+2.35,-.92);
 // 鄰宅（透明＋白邊）：南側鄰地、西側對面、北側
 let k=0;for(let x=1;x<40;x+=6.5){ghostHouse(x,2.2,x+6,10,2+(k++%2));}
 for(let x=1;x<40;x+=7){ghostHouse(x,12,x+6.4,20,2+((k++)%3===0?1:0));}
 for(let z=-40;z<30;z+=8){ghostHouse(-46,z,-33,z+7.4,2+(k++%2));}
 for(let x=-30;x<45;x+=8){ghostHouse(x,-36,x+7.4,-24,2+(k++%3===0?1:0));}
 station();}
