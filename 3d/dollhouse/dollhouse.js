// 聚社區 娃娃屋視角（2026-11-23；立體室內版）。樓板高度由模型量得（單位 m，已含 GY）；D2 位置＝北排東數第一戶。
(function(){
const FLOORS=[{k:'1F',n:1,y:2.57},{k:'2F',n:2,y:6.17},{k:'3F',n:3,y:9.37},{k:'4F',n:4,y:12.57},{k:'5F',n:5,y:15.77},{k:'RF',n:6,name:'屋頂',y:18.97}];
// 立體室內（interior.js，搬自 D戶型室內試作）：舊檔面寬 6.00 m、模型 5.86 m → 東西向縮 0.9767；深度 12.22 m 兩邊一致
// 對位（模型實測）：樓梯東牆 x 差 2 cm；電梯、樓梯後牆在 z 方向舊檔都偏前 10～15 cm → 整組往後移 12 cm。電梯東牆仍差 16 cm（舊檔電梯較寬），小於 30 cm，不改室內
const IN={x0:33.79,z0:-20.09-0.12,sx:5.86/6,lift:.008};
let inner={},mode='3d';
const CUT=1.25;                       // 剖切高度：樓板上 1.25 m，牆會留半截，看得出房間
// D2 室內淨尺寸（模型量得）：x 33.79～39.65、z -20.09（後）～-7.87（前）；格局圖 600×1222 cm 對齊到這個框
const D2={x0:33.79,x1:39.65,z0:-20.09,z1:-7.87,wall:.15};
// 各層格局圖（Drive 原圖：平面配置圖\D戶型\日式極簡）。框＝圖面含外牆的範圍，各層以電梯中心對齊 1F
const BOUNDS={"1F":{"x0":33.643,"x1":39.797,"z0":-20.24,"z1":-7.72},"2F":{"x0":33.595,"x1":39.846,"z0":-20.27,"z1":-7.665},"3F":{"x0":33.595,"x1":39.846,"z0":-18.725,"z1":-7.8},"4F":{"x0":33.595,"x1":39.846,"z0":-19.58,"z1":-8.935},"5F":{"x0":33.595,"x1":39.846,"z0":-18.79,"z1":-8.935},"RF":{"x0":33.595,"x1":39.846,"z0":-19.65,"z1":-7.995}};
const PLANS={};FLOORS.forEach(f=>{PLANS[f.k]={b:BOUNDS[f.k],src:()=>(window.PLAN_D&&window.PLAN_D[f.k])||'plan_D_'+f.k+'.jpg',title:'D2 戶型・'+(f.name||f.k)+' 格局'};});
const plane=new THREE.Plane(new THREE.Vector3(0,-1,0),1e5);
let mats=[],planMeshes={},cur=null,fly=null,ui,info;
function waitModel(){return new Promise(r=>{const t=setInterval(()=>{if(window.MODEL&&document.getElementById('load').classList.contains('off')){clearInterval(t);r();}},120);});}
function setup(){R.localClippingEnabled=true;const set=new Set(),box=new THREE.Box3(),c=new THREE.Vector3();
 S.traverse(o=>{if(!(o.isMesh||o.isLineSegments||o.isSprite)||!o.material||o.material.isShaderMaterial)return;
  box.setFromObject(o);box.getCenter(c);if(Math.abs(c.x-20)>60||Math.abs(c.z)>60)return;   // 只剖本案與鄰宅；天空、車站不動
  (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>set.add(m));});
 mats=[...set];mats.forEach(m=>{m.clippingPlanes=[plane];m.clipShadows=true;m.userData.side0=m.side;m.needsUpdate=true;});
 // 立體室內：每層一組，放在 D2 室內框，顏色換成線性色彩（外觀頁有 sRGB 輸出，不換會偏白）
 if(window.buildDInterior){inner=buildDInterior();const seen=new Set();
  FLOORS.forEach(f=>{const g=inner[f.n];if(!g)return;g.position.set(IN.x0,f.y+IN.lift,IN.z0);g.scale.set(IN.sx,1,1);S.add(g);
   g.traverse(o=>{if(!o.material)return;if(LITE)o.castShadow=false;(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(seen.has(m))return;seen.add(m);
    if(m.color)m.color.convertSRGBToLinear();m.clippingPlanes=[plane];m.clipShadows=true;m.userData.side0=m.side;m.needsUpdate=true;mats.push(m);});});});}
 // 格局圖：每層一張，貼在該層樓板上
 FLOORS.forEach(f=>{const pl=PLANS[f.k],b=pl.b;if(!b)return;
  const tex=new THREE.TextureLoader().load(pl.src());tex.encoding=THREE.sRGBEncoding;tex.anisotropy=8;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(b.x1-b.x0,b.z1-b.z0),new THREE.MeshBasicMaterial({map:tex,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));
  m.rotation.x=-Math.PI/2;m.position.set((b.x0+b.x1)/2,f.y+.012,(b.z0+b.z1)/2);m.visible=false;m.renderOrder=2;S.add(m);planMeshes[f.k]=m;});}
function showPlan(k){const f=k&&FLOORS.find(x=>x.k===k),has3d=!!(f&&inner[f.n]),flat=mode==='2d'||!has3d;
 Object.keys(planMeshes).forEach(n=>planMeshes[n].visible=flat&&n===k);FLOORS.forEach(x=>{if(inner[x.n])inner[x.n].visible=!flat&&x.k===k;});}
function sides(on){mats.forEach(m=>{const s=on&&!m.transparent?THREE.DoubleSide:m.userData.side0;if(m.side!==s){m.side=s;m.needsUpdate=true;}});}
function flyTo(p,t){fly={s:performance.now(),p0:cam.position.clone(),q0:orbit.target.clone(),p1:p,q1:t};try{auto=false;document.getElementById('auto').setAttribute('aria-pressed','false');}catch(e){}}
function select(k,keep){cur=k==='ext'?null:FLOORS.find(f=>f.k===k)||null;
 ui.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===(cur?cur.k:'ext')));
 document.body.classList.toggle('doll',!!cur);
 if(!cur){plane.constant=1e5;sides(false);showPlan(null);info.hidden=true;orbit.minDistance=18;flyTo(new THREE.Vector3(C.x-55,30,C.z+58),C.clone());return;}
 plane.constant=cur.y+(cur.k==='RF'?1.4:CUT);sides(true);
 const pl=PLANS[cur.k];showPlan(cur.k);
 info.hidden=false;const t3=pl.title.replace('格局','室內');info.innerHTML='<b>'+(mode==='2d'?pl.title:t3)+'</b><small>'+(mode==='2d'?'格局圖對齊牆位與比例・家具為示意':'家具配置示意，實際以合約圖說為準')+'</small>'
  +(inner[cur.n]?'<div class="vm" role="group" aria-label="顯示方式"><button type="button" data-m="3d" aria-pressed="'+(mode==='3d')+'">立體</button><button type="button" data-m="2d" aria-pressed="'+(mode==='2d')+'">平面圖</button></div>':'');
 info.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{mode=b.dataset.m;const k=cur.k;showPlan(k);select(k,true);});
 if(keep)return;
 const narrow=matchMedia('(max-width:759.98px)').matches,cx=(D2.x0+D2.x1)/2,cz=(D2.z0+D2.z1)/2;
 const t=new THREE.Vector3(cx,cur.y,cz+(narrow?-1.3:0));orbit.minDistance=8;
 flyTo(new THREE.Vector3(cx+(narrow?0:3),cur.y+(narrow?29:21),cz+(narrow?8:9)),t);}
function frame(){requestAnimationFrame(frame);if(!fly)return;const t=Math.min(1,(performance.now()-fly.s)/1000),k=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
 cam.position.lerpVectors(fly.p0,fly.p1,k);orbit.target.lerpVectors(fly.q0,fly.q1,k);if(t>=1)fly=null;}
(async()=>{await waitModel();setup();
 ui=document.createElement('div');ui.className='fl';ui.setAttribute('role','group');ui.setAttribute('aria-label','樓層');
 ui.innerHTML='<div class="cap">樓層</div>'+[['ext','外觀'],...FLOORS.slice().reverse().map(f=>[f.k,f.name||f.k])].map(([k,n])=>'<button type="button" data-k="'+k+'" aria-pressed="'+(k==='ext')+'">'+n+'</button>').join('');
 ui.querySelectorAll('button').forEach(b=>b.onclick=()=>select(b.dataset.k));
 info=document.createElement('div');info.className='fi';info.hidden=true;info.setAttribute('aria-live','polite');
 document.body.append(ui,info);requestAnimationFrame(frame);
 const h=location.hash.slice(1).toUpperCase();if(FLOORS.some(f=>f.k===h))select(h);})();
})();
