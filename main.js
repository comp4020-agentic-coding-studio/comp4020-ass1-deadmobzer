/* ==========================================================================
   Glock 17 teardown — cel-shaded.
   Geometry parsed from the supplied FBX (authored as an exploded view);
   ASSEMBLY holds the per-part offset that pulls each piece back into place.
   Section content (hero/steps/outro) is authored statically in index.html —
   this script reads it via data-* attributes instead of building it.
   ========================================================================== */

const MAT = {
  polymer:{label:'Polymer',        css:'p', hex:0x7C879B},
  nitride:{label:'Nitrided steel', css:'n', hex:0x4E93C4},
  steel:  {label:'Steel',          css:'s', hex:0xCBD4DE},
  spring: {label:'Spring steel',   css:'g', hex:0x9DAE95},
  brass:  {label:'Brass',          css:'b', hex:0xE0A945},
};

const PART_MAT = {
  '17_Frame_a_low':'polymer','17_Frame_b_low':'polymer','17_Frame_c_low':'polymer',
  '17_Frame_d_low':'polymer','35_Plug_low':'polymer',
  '01_Slide_low':'nitride','02_Barrel_low':'nitride',
  '15_Slide_Cover_Plate_low':'polymer',
  '16_Sights_a_low':'polymer','16_Sights_b_low':'polymer','16_Sights_c_low':'polymer',
  '26_Trigger_a_low':'polymer','26_Trigger_b_low':'polymer','26_Trigger_c_low':'polymer',
  '23_Trigger_Mechanism_Housing_low':'polymer','19_Magazine_Catch_low':'polymer',
  '06_Spacer_Sleeve_low':'polymer','30_Follower_low':'polymer',
  '32_Magazine_Floorplate_a_low':'polymer','32_Magazine_Floorplate_b_low':'polymer',
  '33_Magazite_Tube_low.001':'polymer',
  '03_Recoil_Spin_Guide_Rod_a_low':'steel','03_Recoil_Spin_Guide_Rod_b_low':'steel',
  '03_Recoil_Spin_Guide_Rod_c_low':'steel',
  '05_Firing_Pin_low':'steel','08_Spring_cups_low':'steel','09_Firing_Pin_Safety_low':'steel',
  '11_Extractor_low':'steel','12_Extractor_Depressor_Plunger_low':'steel',
  '14_Spring_Loaded_Bearing_low':'steel','21_Slide_Lock_low':'steel','22_Locking_Block_low':'steel',
  '23_Ejector_low':'steel','24_Connector_low':'steel','26_Trigger_Bar_low':'steel',
  '27_Slide_Stop_Lever_a_low':'steel','27_Slide_Stop_Lever_b_low':'steel',
  '28_Trigger_Pin_low':'steel','29_Trigger_Housing_Pin_low':'steel','34_Locking_Block_Pin_low':'steel',
  '04_Recil_Spiring_a1_low':'spring','04_Recil_Spiring_a2_low':'spring',
  '04_Recil_Spiring_b1_low':'spring','04_Recil_Spiring_b2_low':'spring',
  '07_Firing_Pin_Spiring1_low':'spring','07_Firing_Pin_Spiring2_low':'spring',
  '10_Firing_pin_Safety_Spiring_low':'spring','13_Extractor_Depressor_Plunger_Spiring_low':'spring',
  '20_Slide_Lock_Spiring_low':'spring','25_Trigger_Spiring_low':'spring',
  '31_Magazine_Spring_low':'spring',
  '00_Cartridge_a_low':'brass','00_Cartridge_b_low':'brass',
};

/* offset from the model's exploded position back to the assembled position */
const SL = [0,-0.538,-0.490];
const ASSEMBLY = {
  '17_Frame_a_low':[0,0,0],'17_Frame_b_low':[0,0,0],'17_Frame_c_low':[0,0,0],
  '17_Frame_d_low':[0,0,0],'35_Plug_low':[0,0,0],
  '19_Magazine_Catch_low':[0,0,0],'20_Slide_Lock_Spiring_low':[0,0,0],
  '01_Slide_low':SL,'16_Sights_c_low':SL,
  '15_Slide_Cover_Plate_low':[0,-0.408,-0.490],
  '16_Sights_a_low':[0.164,-0.538,-0.490],
  '16_Sights_b_low':[0,-0.573,-0.490],
  '02_Barrel_low':[0,-0.316,-0.605],
  '03_Recoil_Spin_Guide_Rod_a_low':[0,-0.156,-0.595],
  '03_Recoil_Spin_Guide_Rod_b_low':[0,-0.283,-0.595],
  '03_Recoil_Spin_Guide_Rod_c_low':[0,-0.283,-0.595],
  '04_Recil_Spiring_a1_low':[0,-0.283,-0.595],'04_Recil_Spiring_a2_low':[0,-0.283,-0.595],
  '04_Recil_Spiring_b1_low':[0,-0.283,-0.595],'04_Recil_Spiring_b2_low':[0,-0.283,-0.595],
  '05_Firing_Pin_low':[0,-0.459,0.340],'06_Spacer_Sleeve_low':[0,-0.459,0.340],
  '07_Firing_Pin_Spiring1_low':[0,-0.459,0.340],'07_Firing_Pin_Spiring2_low':[0,-0.459,0.340],
  '08_Spring_cups_low':[0,-0.459,0.340],
  '09_Firing_Pin_Safety_low':[0.140,-0.350,-0.370],
  '10_Firing_pin_Safety_Spiring_low':[0.165,-0.560,0],
  '11_Extractor_low':[0.190,-0.529,0.100],'12_Extractor_Depressor_Plunger_low':[0.190,-0.529,0.100],
  '13_Extractor_Depressor_Plunger_Spiring_low':[0.190,-0.529,0.100],
  '14_Spring_Loaded_Bearing_low':[0.190,-0.529,0.100],
  '26_Trigger_a_low':[0,-0.38,-0.105],'26_Trigger_b_low':[0,-0.38,-0.105],'26_Trigger_c_low':[0,-0.38,-0.105],
  '26_Trigger_Bar_low':[0,-0.38,-0.105],
  '24_Connector_low':[0,-0.380,0.150],'25_Trigger_Spiring_low':[0,-0.380,0],
  '23_Trigger_Mechanism_Housing_low':[0,-0.260,0],'23_Ejector_low':[-0.060,-0.440,0],
  '22_Locking_Block_low':[0,-0.170,0],
  '34_Locking_Block_Pin_low':[-0.181,0,0],'28_Trigger_Pin_low':[-0.239,0,0],
  '29_Trigger_Housing_Pin_low':[-0.163,0,0],'21_Slide_Lock_low':[-0.266,0,0],
  '27_Slide_Stop_Lever_a_low':[-0.045,-0.100,0],'27_Slide_Stop_Lever_b_low':[0,-0.380,0],
  '33_Magazite_Tube_low.001':[0,0.626,0.175],
  '32_Magazine_Floorplate_a_low':[0,0.626,-0.051],
  '32_Magazine_Floorplate_b_low':[0,0.620,0.585],
  '30_Follower_low':[0,0.486,0.470],'31_Magazine_Spring_low':[0,0.575,0.500],
  '00_Cartridge_a_low':[0,0,0],'00_Cartridge_b_low':[0,0,0],
};

const TAG = {
  '17_Frame_a_low':'Frame','17_Frame_b_low':'Rail insert','17_Frame_c_low':'Grip panel',
  '17_Frame_d_low':'Frame rail','35_Plug_low':'Frame plug',
  '01_Slide_low':'Slide','15_Slide_Cover_Plate_low':'Cover plate','02_Barrel_low':'Barrel',
  '03_Recoil_Spin_Guide_Rod_a_low':'Guide rod','03_Recoil_Spin_Guide_Rod_b_low':'Rod head',
  '03_Recoil_Spin_Guide_Rod_c_low':'Rod sleeve',
  '04_Recil_Spiring_a1_low':'Outer spring','04_Recil_Spiring_a2_low':'Spring seat',
  '04_Recil_Spiring_b1_low':'Spring seat','04_Recil_Spiring_b2_low':'Inner spring',
  '05_Firing_Pin_low':'Striker','06_Spacer_Sleeve_low':'Spacer sleeve',
  '07_Firing_Pin_Spiring1_low':'Striker spring','07_Firing_Pin_Spiring2_low':'Striker spring',
  '08_Spring_cups_low':'Spring cups',
  '09_Firing_Pin_Safety_low':'Safety plunger','10_Firing_pin_Safety_Spiring_low':'Plunger spring',
  '11_Extractor_low':'Extractor','12_Extractor_Depressor_Plunger_low':'Plunger',
  '13_Extractor_Depressor_Plunger_Spiring_low':'Plunger spring','14_Spring_Loaded_Bearing_low':'Bearing',
  '16_Sights_a_low':'Rear sight','16_Sights_b_low':'Front sight','16_Sights_c_low':'Sight base',
  '26_Trigger_a_low':'Trigger','26_Trigger_b_low':'Trigger safety','26_Trigger_c_low':'Safety pivot',
  '26_Trigger_Bar_low':'Trigger bar','24_Connector_low':'Connector','25_Trigger_Spiring_low':'Trigger spring',
  '23_Trigger_Mechanism_Housing_low':'Housing','23_Ejector_low':'Ejector',
  '22_Locking_Block_low':'Locking block','34_Locking_Block_Pin_low':'Block pin',
  '28_Trigger_Pin_low':'Trigger pin','29_Trigger_Housing_Pin_low':'Housing pin',
  '27_Slide_Stop_Lever_a_low':'Slide stop','27_Slide_Stop_Lever_b_low':'Stop lever arm',
  '20_Slide_Lock_Spiring_low':'Lock spring','21_Slide_Lock_low':'Takedown lever',
  '19_Magazine_Catch_low':'Magazine catch',
  '30_Follower_low':'Follower','31_Magazine_Spring_low':'Magazine spring',
  '32_Magazine_Floorplate_a_low':'Floorplate','32_Magazine_Floorplate_b_low':'Insert plate',
  '33_Magazite_Tube_low.001':'Magazine body',
  '00_Cartridge_a_low':'Cartridge','00_Cartridge_b_low':'Cartridge',
};

/* ---------- read the statically-authored sections instead of building them ---------- */
const steps = [...document.querySelectorAll('.step')];
const SECTIONS = steps.map(el => ({
  el,
  hero: el.classList.contains('hero'),
  outro: el.classList.contains('outro'),
  mat: el.dataset.mat,
  chap: el.dataset.chap || '',
  az: el.dataset.az !== undefined ? +el.dataset.az : undefined,
  elev: el.dataset.elev !== undefined ? +el.dataset.elev : undefined,
  parts: el.dataset.parts ? el.dataset.parts.split(',') : [],
}));

/* ---------- sound cues (flourish, not the graded interaction) ---------- */
const sndClick = new Audio('./assets/sfx/click-soft.wav');
const sndSwitch = new Audio('./assets/sfx/switch.wav');
const sndHeavy = new Audio('./assets/sfx/click-heavy.wav');
function playSfx(a){ a.currentTime = 0; a.play().catch(()=>{}); }

/* ==========================================================================
   decode
   ========================================================================== */
const payload = JSON.parse(document.getElementById('geom').textContent.trim());
const bin = (()=>{ const s=atob(payload.b64), a=new Uint8Array(s.length);
  for(let i=0;i<s.length;i++) a[i]=s.charCodeAt(i); return a; })();

const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, .05, 60);
const root = new THREE.Group(); scene.add(root);

/* ---------- cel shader ----------
   Three flat bands plus a tight specular step and a fresnel rim, so parts
   separate from the black background without any environment lighting. */
const CEL_VERT = `
varying vec3 vN; varying vec3 vP;
void main(){
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vP = mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;
const CEL_FRAG = `
uniform vec3 uColor; uniform float uOpacity; uniform float uLit;
varying vec3 vN; varying vec3 vP;
void main(){
  vec3 N = normalize(vN);
  vec3 L = normalize(vec3(0.38, 0.66, 0.55));
  float d = dot(N, L);
  float band = d > 0.46 ? 1.16 : (d > -0.04 ? 0.78 : 0.48);
  float spec = smoothstep(0.90, 0.945, d) * 0.55;
  vec3 col = uColor * band + vec3(spec);
  vec3 V = normalize(-vP);
  float rim = pow(1.0 - clamp(dot(N,V),0.0,1.0), 3.0);
  col += vec3(0.42,0.60,0.82) * smoothstep(0.40,1.0,rim) * 0.85;
  col = mix(vec3(0.075,0.082,0.10), col, uLit);
  gl_FragColor = vec4(col, uOpacity);
}`;
const OUT_VERT = `
attribute vec3 aSmooth;
uniform float uThick; uniform vec2 uRes;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vec3 n = normalize(normalMatrix * aSmooth);
  vec4 clip = projectionMatrix * mv;
  vec2 nd = (projectionMatrix * vec4(n,0.0)).xy;
  float l = length(nd);
  if(l > 0.00001) clip.xy += (nd/l) * uThick * clip.w * 2.0 / uRes;
  gl_Position = clip;
}`;
const OUT_FRAG = `
uniform float uOpacity;
void main(){ gl_FragColor = vec4(0.02,0.022,0.03,uOpacity); }`;

const RES = new THREE.Vector2(1,1);
const parts = [];

payload.index.forEach(e=>{
  const n=e.v;
  const pq=new Uint16Array(bin.buffer, bin.byteOffset+e.po, n*3);
  const pos=new Float32Array(n*3);
  for(let i=0;i<n;i++){
    pos[i*3  ]=pq[i*3  ]/65535*e.sp[0]+e.lo[0];
    pos[i*3+1]=pq[i*3+1]/65535*e.sp[1]+e.lo[1];
    pos[i*3+2]=pq[i*3+2]/65535*e.sp[2]+e.lo[2];
  }
  const nrm=new Int8Array(bin.buffer, bin.byteOffset+e.no, n*3);
  const idx=e.t==='u16'? new Uint16Array(bin.buffer,bin.byteOffset+e.io,e.i)
                       : new Uint32Array(bin.buffer,bin.byteOffset+e.io,e.i);

  /* Weld by position only. Gives (a) averaged normals for a gap-free outline
     hull, and (b) a shared-vertex index so EdgesGeometry finds real creases
     instead of treating every hard edge as a boundary. */
  const map=new Map(), rep=new Int32Array(n), wpos=[], acc=[];
  for(let i=0;i<n;i++){
    const k=(pos[i*3]*4096|0)+'_'+(pos[i*3+1]*4096|0)+'_'+(pos[i*3+2]*4096|0);
    let w=map.get(k);
    if(w===undefined){ w=wpos.length/3; map.set(k,w);
      wpos.push(pos[i*3],pos[i*3+1],pos[i*3+2]); acc.push(0,0,0); }
    rep[i]=w;
    acc[w*3]+=nrm[i*3]; acc[w*3+1]+=nrm[i*3+1]; acc[w*3+2]+=nrm[i*3+2];
  }
  const smooth=new Float32Array(n*3);
  for(let i=0;i<n;i++){
    const w=rep[i]; let x=acc[w*3],y=acc[w*3+1],z=acc[w*3+2];
    const L=Math.hypot(x,y,z)||1;
    smooth[i*3]=x/L; smooth[i*3+1]=y/L; smooth[i*3+2]=z/L;
  }

  const g=new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  g.setAttribute('normal', new THREE.BufferAttribute(new Int8Array(nrm),3,true));
  g.setAttribute('aSmooth', new THREE.BufferAttribute(smooth,3));
  g.setIndex(new THREE.BufferAttribute(idx.slice(),1));
  g.computeBoundingBox();

  /* welded copy purely to extract crease lines */
  const wg=new THREE.BufferGeometry();
  wg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(wpos),3));
  const widx=new Uint32Array(idx.length);
  for(let i=0;i<idx.length;i++) widx[i]=rep[idx[i]];
  wg.setIndex(new THREE.BufferAttribute(widx,1));
  const eg=new THREE.EdgesGeometry(wg, 22);
  wg.dispose();

  const mk=PART_MAT[e.n]||'steel', base=new THREE.Color(MAT[mk].hex);
  const fillMat=new THREE.ShaderMaterial({
    vertexShader:CEL_VERT, fragmentShader:CEL_FRAG, transparent:true,
    uniforms:{uColor:{value:base.clone()}, uOpacity:{value:1}, uLit:{value:1}}});
  const outMat=new THREE.ShaderMaterial({
    vertexShader:OUT_VERT, fragmentShader:OUT_FRAG, transparent:true, side:THREE.BackSide,
    uniforms:{uThick:{value:2.0}, uRes:{value:RES}, uOpacity:{value:1}}});
  const lineMat=new THREE.LineBasicMaterial({color:0x05060A, transparent:true, opacity:1});

  const grp=new THREE.Group();
  const hull=new THREE.Mesh(g,outMat); hull.renderOrder=0;
  const fill=new THREE.Mesh(g,fillMat); fill.renderOrder=1;
  const lines=new THREE.LineSegments(eg,lineMat); lines.renderOrder=2;
  grp.add(hull); grp.add(fill); grp.add(lines);
  root.add(grp);

  const a=ASSEMBLY[e.n]||[0,0,0];
  parts.push({name:e.n, grp, fillMat, outMat, lineMat, matKey:mk, base,
    asm:new THREE.Vector3(a[0],a[1],a[2]),
    home:new THREE.Vector3(...e.c), bbox:g.boundingBox,
    drift:new THREE.Vector3(Math.random()-.5,(Math.random()-.5)+.5,Math.random()-.5).multiplyScalar(1.5),
    s:{focus:1, intro:1}});
});
const byName=Object.fromEntries(parts.map(p=>[p.name,p]));

/* ==========================================================================
   framing — accounts for how assembled/exploded the model currently is
   ========================================================================== */
const _box=new THREE.Box3(), _v=new THREE.Vector3(), _t=new THREE.Vector3();
function frameOf(names, asmT){
  _box.makeEmpty();
  const list = names && names.length ? names : parts.map(p=>p.name);
  list.forEach(n=>{
    const p=byName[n]; if(!p) return;
    _t.copy(p.asm).multiplyScalar(asmT);
    _box.expandByPoint(_v.copy(p.bbox.min).add(_t));
    _box.expandByPoint(_v.copy(p.bbox.max).add(_t));
  });
  if(_box.isEmpty()) return {c:new THREE.Vector3(), r:1};
  return {c:_box.getCenter(new THREE.Vector3()), r:Math.max(_box.getSize(_v).length()*.5,.06)};
}

/* ==========================================================================
   state
   ========================================================================== */
const view={az:38, el:12, dist:3.2, tx:0, ty:0, tz:0, spin:0, dragAz:0, dragEl:0};
const morph={asm:1};   // 1 = assembled, 0 = exploded
let autoAz=0;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const narrow = () => innerWidth < 900;

function applySection(i, instant){
  const s=SECTIONS[i], showAll=!!(s.hero||s.outro);
  const asmT = s.hero ? 1 : 0;            // hero sits assembled, teardown flies apart
  const f=frameOf(showAll?null:(s.parts||null), asmT);
  const fov=camera.fov*Math.PI/180;
  const pad = showAll ? 1.5 : (narrow()?2.35:2.0);
  const dist=(f.r/Math.tan(fov/2))*pad;

  const dur=instant?0:(reduce?220:1200);
  anime.remove(view);
  anime({targets:view,
    az:s.az!==undefined?s.az:38, el:s.elev!==undefined?s.elev:12,
    dist, tx:f.c.x, ty:f.c.y, tz:f.c.z, dragAz:0, dragEl:0,
    duration:dur, easing:'easeInOutQuart'});
  anime.remove(morph);
  if(!s.outro) anime({targets:morph, asm:asmT, duration:dur, easing:'easeInOutQuart'});

  const set=new Set(s.parts||[]);
  parts.forEach((p,k)=>{
    anime.remove(p.s);
    anime({targets:p.s,
      focus: showAll||set.has(p.name) ? 1 : 0,
      duration: instant?0:(reduce?220:850),
      delay: instant?0:(set.has(p.name)?Math.min(k*10,240):0),
      easing:'easeOutQuart'});
  });

  document.documentElement.style.setProperty('--accent', `var(--m-${s.mat})`);
  document.getElementById('chap').textContent=s.chap||'';
  document.getElementById('railSec').textContent=
    String(i).padStart(2,'0')+'/'+String(SECTIONS.length-1).padStart(2,'0');
  buildTags(s.parts||[]);
  updateLegend(i);
}

/* ---------- callouts ---------- */
const tagsEl=document.getElementById('tags'), leadsEl=document.getElementById('leads');
let tagItems=[];
function buildTags(names){
  tagsEl.innerHTML=''; leadsEl.innerHTML='';
  const max=narrow()?4:7;
  tagItems=names.slice(0,max).map(n=>{
    const p=byName[n]; if(!p) return null;
    const el=document.createElement('div'); el.className='tag';
    el.innerHTML=`<em>${(n.match(/^\d+/)||[''])[0]}</em>${TAG[n]||n}`;
    tagsEl.appendChild(el);
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('r','2');
    leadsEl.appendChild(path); leadsEl.appendChild(dot);
    return {p, el, path, dot};
  }).filter(Boolean);
}
function updateTags(w,h){
  if(!tagItems.length) return;
  const rt=w<700, colX= rt? w-10 : w-Math.min(150,w*0.24);
  const pts=tagItems.map(t=>{
    _v.copy(t.p.home).add(_t.copy(t.p.asm).multiplyScalar(morph.asm))
      .applyMatrix4(root.matrixWorld).project(camera);
    return {t, x:(_v.x*.5+.5)*w, y:(-_v.y*.5+.5)*h, z:_v.z};
  }).sort((a,b)=>a.y-b.y);
  const gap=20, top=46, bot=h-(rt?58:88);
  let last=top-gap;
  pts.forEach((q,i)=>{
    let ly=Math.min(Math.max(q.y,last+gap), bot-(pts.length-1-i)*gap);
    ly=Math.max(ly,top); last=ly;
    const vis=q.z<1 && q.t.p.s.focus>.55;
    q.t.el.classList.toggle('rt', rt);
    q.t.el.style.opacity=vis?1:0;
    q.t.el.style.left=colX+'px'; q.t.el.style.top=ly+'px';
    const mid=q.x+(colX-q.x)*.55;
    q.t.path.setAttribute('d',
      `M${q.x.toFixed(1)},${q.y.toFixed(1)} L${mid.toFixed(1)},${q.y.toFixed(1)} L${(colX-7).toFixed(1)},${ly.toFixed(1)} L${colX.toFixed(1)},${ly.toFixed(1)}`);
    q.t.path.style.opacity=vis?.5:0;
    q.t.dot.setAttribute('cx',q.x.toFixed(1)); q.t.dot.setAttribute('cy',q.y.toFixed(1));
    q.t.dot.style.opacity=vis?.9:0;
  });
}

/* ---------- legend ---------- */
const counts={}; parts.forEach(p=>counts[p.matKey]=(counts[p.matKey]||0)+1);
const legendEl=document.getElementById('legend'), legendBtns={};
Object.entries(MAT).forEach(([k,m])=>{
  const b=document.createElement('button'); b.className=m.css;
  b.innerHTML=`<span class="lab">${m.label}</span><span class="num">${counts[k]||0} parts</span>`;
  const on=()=>{hovered=k; playSfx(sndClick);}, off=()=>{hovered=null;};
  b.addEventListener('mouseenter',on); b.addEventListener('mouseleave',off);
  b.addEventListener('focus',on); b.addEventListener('blur',off);
  legendEl.appendChild(b); legendBtns[k]=b;
});
let hovered=null;
function updateLegend(i){
  const s=SECTIONS[i];
  if(s.hero||s.outro){ Object.keys(MAT).forEach(k=>legendBtns[k].classList.add('on')); return; }
  const seen=new Set((s.parts||[]).map(n=>PART_MAT[n]||'steel'));
  Object.keys(MAT).forEach(k=>legendBtns[k].classList.toggle('on', seen.has(k)));
}

/* ---------- scroll ---------- */
let active=-1, tops=[], outroPlayed=false;
function measure(){ tops=steps.map(el=>el.getBoundingClientRect().top+scrollY); }
function onScroll(){
  const mid=scrollY+innerHeight*(narrow()?0.62:0.5);
  let idx=0; for(let i=0;i<tops.length;i++){ if(tops[i]<=mid) idx=i; }
  const doc=document.body.scrollHeight-innerHeight;
  document.getElementById('railProg').style.width=(scrollY/Math.max(doc,1)*100).toFixed(1)+'%';
  steps.forEach((el,i)=>el.classList.toggle('active', i===idx));
  if(idx!==active){
    const first=active===-1;
    active=idx; applySection(idx);
    if(!first) playSfx(sndSwitch);
  }
  if(SECTIONS[idx].outro){
    const el=steps[idx];
    const p=Math.min(Math.max((scrollY-tops[idx]+innerHeight*.55)/el.offsetHeight,0),1);
    anime.remove(morph);        // scroll drives the reassembly directly
    morph.asm=p; view.spin=p*260;
    if(p>=0.999 && !outroPlayed){ outroPlayed=true; playSfx(sndHeavy); }
    else if(p<0.98) outroPlayed=false;
  } else view.spin=0;
}
addEventListener('scroll', onScroll, {passive:true});
addEventListener('resize', ()=>{ measure(); if(active>=0) applySection(active,true); onScroll(); });
if(document.fonts && document.fonts.ready) document.fonts.ready.then(()=>{measure(); onScroll();});

/* ---------- orbit ---------- */
let dragging=false, lx=0, ly=0;
canvas.addEventListener('pointerdown', e=>{dragging=true; lx=e.clientX; ly=e.clientY;
  canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove', e=>{
  if(!dragging) return;
  view.dragAz += (e.clientX-lx)*0.35;
  if(e.pointerType!=='touch') view.dragEl=Math.max(-70,Math.min(70,view.dragEl+(e.clientY-ly)*0.25));
  lx=e.clientX; ly=e.clientY;
});
addEventListener('pointerup',()=>dragging=false);
addEventListener('pointercancel',()=>dragging=false);

/* ---------- render ---------- */
let t0=performance.now();
function tick(now){
  const dt=Math.min((now-t0)/1000,.05); t0=now;
  const w=canvas.clientWidth, h=canvas.clientHeight, dpr=renderer.getPixelRatio();
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){
    renderer.setSize(w,h,false); camera.aspect=w/Math.max(h,1); camera.updateProjectionMatrix();
    RES.set(Math.max(w,1),Math.max(h,1));
    leadsEl.setAttribute('viewBox',`0 0 ${w} ${h}`);
  }
  if(!dragging && !reduce) autoAz+=dt*1.6;

  const az=(view.az+autoAz+view.dragAz+view.spin)*Math.PI/180;
  const el=Math.max(-1.35,Math.min(1.35,(view.el+view.dragEl)*Math.PI/180));
  camera.position.set(
    view.tx+view.dist*Math.cos(el)*Math.sin(az),
    view.ty+view.dist*Math.sin(el),
    view.tz+view.dist*Math.cos(el)*Math.cos(az));
  camera.lookAt(view.tx, view.ty, view.tz);

parts.forEach(p=>{
const f=p.s.focus;
let a=0.55+f*0.945, lit=0.10+f*0.90, ln=0.14+f*0.66, o=0.5;

if(hovered){
  const on=p.matKey===hovered;
  a=on ? 1 : 0.15;
  lit=on ? 1 : 0.08;
  ln=on ? 0.8 : 0.10;
  o=on ? 1 : 0.15;
}

p.fillMat.uniforms.uOpacity.value=a;
p.fillMat.uniforms.uLit.value=lit;
p.fillMat.depthWrite=a>0.55;

p.outMat.uniforms.uOpacity.value=o*0.95;
p.outMat.uniforms.uThick.value=narrow()?1.5:2.0;
p.lineMat.opacity=ln;

  // intro drift + assembled/exploded morph
  p.grp.position.copy(p.asm).multiplyScalar(morph.asm)
       .addScaledVector(p.drift,p.s.intro);
});

  root.updateMatrixWorld();
  updateTags(w,h);
  renderer.render(scene,camera);
  requestAnimationFrame(tick);
}

measure(); applySection(0,true); onScroll(); requestAnimationFrame(tick);
addEventListener('load', ()=>{ measure(); onScroll(); });
anime({targets:parts.map(p=>p.s), intro:0,
  duration: reduce?300:1400, delay: anime.stagger(12), easing:'easeOutQuint'});
