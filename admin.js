/* Admin dashboard demo. No auth, no server. State lives in localStorage key "nx_admin" and does not change the storefront. */
document.addEventListener('DOMContentLoaded',()=>{
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NAMES=['Amara Okoye','Luc Bello','Sandra Mekui','Peter Ngwa','Joy Tabe','Ibrahim Sali','Chantal Fru','Emma Njoh'];
const SALES=[12,15,14,18,22,20,26,24,29,33,38,45],MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ST=['Pending','Processing','Shipped','Delivered','Cancelled'];
function def(){
 const stt=['Delivered','Shipped','Processing','Pending','Delivered','Cancelled','Delivered'];
 return{prods:P.map(p=>({id:p.id,n:p.n,b:p.b,c:p.c,p:p.p,o:p.o||0,s:p.stock?5+(p.id*7)%30:0,f:!!p.new,img:p.img})),
 cats:{...CAT_LABELS},brands:[...new Set(P.map(p=>p.b))].sort(),
 orders:Array.from({length:14},(_,i)=>{const a=P[(i*3)%P.length],b=P[(i*5+1)%P.length];return{id:'NX-'+(1050-i),cust:NAMES[i%8],items:[a.n,b.n],date:`2026-11-${String(18-i).padStart(2,'0')}`,total:a.p+b.p+5000,st:stt[i%7]}}),
 camps:[{id:1,n:'Black Friday demo',pct:15,on:true},{id:2,n:'Back to school',pct:10,on:false},{id:3,n:'Audio week',pct:20,on:true}],
 banners:['Upgrade your tech. Not your budget.','Free demo delivery on selected devices.'],
 reviews:[{id:1,who:'Amara O.',prod:'Galaxy-class Flagship 5G',r:5,t:'Great phone, fast delivery.',st:'Approved'},{id:2,who:'Luc B.',prod:'Wireless Noise-Cancelling Headphones',r:4,t:'Good sound, a bit tight at first.',st:'Pending'},{id:3,who:'Sandra M.',prod:'55" 4K OLED Smart TV',r:5,t:'Picture is stunning.',st:'Approved'},{id:4,who:'Peter N.',prod:'Portable Bluetooth Speaker',r:2,t:'Battery was below expectations.',st:'Pending'}],
 content:{hero:'Technology that moves you forward.',promo:'Special offers on selected devices.',about:'Vernyuy Tech is a demonstration electronics store.',phone:'+237 600 000 000',email:'hello@vernyuytech.example',fcats:['phones','laptops','tvs','audio']},
 set:{name:'Vernyuy Tech',del:5000,maint:false}}}
let S;try{S=JSON.parse(localStorage.getItem('nx_admin'))}catch(e){}if(!S||!S.prods)S=def();
const save=()=>{try{localStorage.setItem('nx_admin',JSON.stringify(S))}catch(e){}};
const cl=c=>S.cats[c]||c,$av=$('#av');
const pill=(t,c)=>`<span class="pill ${c}">${esc(t)}</span>`;
const stCls=s=>({Delivered:'g',Shipped:'g',Processing:'y',Pending:'y',Cancelled:'r'}[s]||'');
const tbl=(h,r)=>`<div class="tw"><table class="tb"><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r}</tbody></table></div>`;
const sw=(a,on,id)=>`<label class="sw2"><input type="checkbox" data-chg="${a}" data-id="${id}" ${on?'checked':''}><span></span></label>`;
let view='overview',q='';

/* chart */
function chart(){const W=520,H=220,m=28,bw=(W-m)/12,mx=50;
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sample monthly sales in thousands of dollars">${[0,25,50].map(v=>{const y=H-24-(H-44)*v/mx;return `<line x1="${m}" x2="${W}" y1="${y}" y2="${y}" stroke="#dfe1e5"/><text x="0" y="${y+4}">${v}k</text>`}).join('')}
 ${SALES.map((v,i)=>{const h=(H-44)*v/mx;return `<rect x="${m+i*bw+6}" y="${H-24-h}" width="${bw-12}" height="${h}" rx="4"><title>${MON[i]}: $${v}k</title></rect><text x="${m+i*bw+bw/2}" y="${H-6}" text-anchor="middle">${MON[i]}</text>`}).join('')}</svg>`}

const V={
overview(){const inS=S.prods.filter(p=>p.s>=10).length,low=S.prods.filter(p=>p.s>0&&p.s<10).length,out=S.prods.filter(p=>!p.s).length,n=S.prods.length||1;
 const best=[...P].sort((a,b)=>b.rv-a.rv).slice(0,5);
 return `<div class="vh"><h2>Overview</h2></div><div class="demo" role="note">Sample data. Only the product count and inventory come from your edits.</div>
<div class="kpis"><div class="kpi"><small>Total products</small><b>${S.prods.length}</b></div><div class="kpi"><small>Total orders</small><b>1,284</b></div><div class="kpi"><small>Total revenue</small><b>$${SALES.reduce((a,b)=>a+b,0)}k</b></div><div class="kpi"><small>Total customers</small><b>842</b></div></div>
<div class="two2"><div class="pan"><h3>Sales overview (sample, 2026)</h3>${chart()}</div>
<div class="pan"><h3>Inventory overview</h3><div class="bars">${[['In stock',inS],['Low stock (under 10)',low],['Out of stock',out]].map(x=>`<div><div class="l"><span>${x[0]}</span><b>${x[1]}</b></div><div class="bar2"><i style="width:${x[1]/n*100}%"></i></div></div>`).join('')}</div></div></div>
<div class="two2"><div class="pan"><h3>Recent orders</h3>${tbl(['Order','Customer','Total','Status'],S.orders.slice(0,5).map(o=>`<tr><td>${o.id}</td><td>${esc(o.cust)}</td><td>${money(o.total)}</td><td>${pill(o.st,stCls(o.st))}</td></tr>`).join(''))}</div>
<div class="pan"><h3>Best-selling products</h3>${tbl(['Product','Reviews'],best.map(p=>`<tr><td>${esc(p.n)}</td><td>${p.rv}</td></tr>`).join(''))}</div></div>`},

products(){const l=S.prods.filter(p=>!q||(p.n+p.b+cl(p.c)).toLowerCase().includes(q));
 return `<div class="vh"><h2>Products (${l.length})</h2><div class="arow"><input type="search" id="pq" placeholder="Search products" aria-label="Search products" value="${esc(q)}" style="width:220px"><button class="btn" data-act="addp" style="padding:10px 20px">Add product</button></div></div>
${tbl(['','Product','Brand','Category','Price','Stock','Featured',''],l.map(p=>`<tr><td>${slot(p.img)}</td><td>${esc(p.n)}</td><td>${esc(p.b)}</td><td>${esc(cl(p.c))}</td><td>${money(p.p)}${p.o?` <s style="color:var(--silver)">${money(p.o)}</s>`:''}</td><td>${p.s?(p.s<10?pill(p.s+' low','y'):p.s):pill('Out','r')}</td><td>${sw('feat',p.f,p.id)}</td><td style="white-space:nowrap"><button class="sm" data-act="editp" data-id="${p.id}">Edit</button> <button class="sm dg" data-act="delp" data-id="${p.id}">Delete</button></td></tr>`).join(''))}`},

categories(){return mgr('Categories','cat',Object.entries(S.cats).map(([k,v])=>[k,v,S.prods.filter(p=>p.c===k).length]))},
brands(){return mgr('Brands','brand',S.brands.map(b=>[b,b,S.prods.filter(p=>p.b===b).length]))},

orders(){return `<div class="vh"><h2>Orders</h2></div>${tbl(['Order','Customer','Products','Date','Total','Status'],S.orders.map(o=>`<tr><td>${o.id}</td><td>${esc(o.cust)}</td><td>${o.items.map(esc).join(', ')}</td><td>${o.date}</td><td>${money(o.total)}</td><td><select data-chg="ord" data-id="${o.id}" aria-label="Status for ${o.id}">${ST.map(s=>`<option ${s===o.st?'selected':''}>${s}</option>`).join('')}</select></td></tr>`).join(''))}`},

customers(){const m={};S.orders.forEach(o=>{const c=m[o.cust]||(m[o.cust]={n:0,t:0});c.n++;if(o.st!=='Cancelled')c.t+=o.total});
 return `<div class="vh"><h2>Customers</h2></div><div class="demo">Sample customers derived from the sample orders.</div>${tbl(['Name','Email (demo)','Orders','Spent'],Object.entries(m).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(k.toLowerCase().replace(/ /g,'.'))}@example.com</td><td>${v.n}</td><td>${money(v.t)}</td></tr>`).join(''))}`},

promotions(){const feat=S.prods.filter(p=>p.f),off=S.prods.filter(p=>p.o);
 return `<div class="vh"><h2>Promotions</h2><button class="btn" data-act="addc" style="padding:10px 20px">New campaign</button></div>
<div class="pan"><h3>Discount campaigns</h3>${tbl(['Campaign','Discount','Active',''],S.camps.map(c=>`<tr><td>${esc(c.n)}</td><td>${c.pct}%</td><td>${sw('camp',c.on,c.id)}</td><td><button class="sm dg" data-act="delc" data-id="${c.id}">Delete</button></td></tr>`).join(''))}</div>
<div class="pan"><h3>Promotional banners</h3>${S.banners.map((b,i)=>`<div class="fld"><input data-bn="${i}" value="${esc(b)}" aria-label="Banner ${i+1}"></div>`).join('')}<button class="sm" data-act="savebn">Save banners</button></div>
<div class="two2"><div class="pan"><h3>Featured products (${feat.length})</h3><p>${feat.map(p=>esc(p.n)).join(', ')||'None'}</p><p class="meta">Change these in Products.</p></div><div class="pan"><h3>Special offers (${off.length})</h3><p>${off.map(p=>esc(p.n)).join(', ')||'None'}</p></div></div>`},

reviews(){return `<div class="vh"><h2>Reviews</h2></div><div class="demo">Demonstration reviews.</div>${tbl(['Customer','Product','Rating','Review','Status'],S.reviews.map(r=>`<tr><td>${esc(r.who)}</td><td>${esc(r.prod)}</td><td>${'★'.repeat(r.r)}</td><td>${esc(r.t)}</td><td><select data-chg="rev" data-id="${r.id}" aria-label="Review status">${['Approved','Pending','Hidden'].map(s=>`<option ${s===r.st?'selected':''}>${s}</option>`).join('')}</select></td></tr>`).join(''))}`},

content(){const c=S.content,f=(k,l,t)=>`<div class="fld"><label for="w-${k}">${l}</label>${t?`<textarea id="w-${k}" rows="3">${esc(c[k])}</textarea>`:`<input id="w-${k}" value="${esc(c[k])}">`}</div>`;
 return `<div class="vh"><h2>Website content</h2></div><div class="demo">These controls save to this browser only. They do not change the live pages in this demo.</div><div class="pan" style="max-width:640px">${f('hero','Homepage hero headline')}${f('promo','Promotional message')}${f('about','About section',1)}${f('phone','Contact phone')}${f('email','Contact email')}
<h3>Featured categories</h3><div class="arow" style="margin-bottom:16px">${Object.entries(S.cats).map(([k,v])=>`<label class="stk"><input type="checkbox" data-fc="${k}" ${c.fcats.includes(k)?'checked':''}> ${esc(v)}</label>`).join('')}</div><button class="btn" data-act="savect" style="padding:10px 22px">Save content</button></div>`},

settings(){const s=S.set;return `<div class="vh"><h2>Settings</h2></div><div class="pan" style="max-width:520px"><div class="fld"><label for="s-name">Store name</label><input id="s-name" value="${esc(s.name)}"></div><div class="fld"><label for="s-del">Demo delivery fee</label><input id="s-del" type="number" min="0" value="${s.del}"></div><label class="arow" style="margin-bottom:18px">${sw('maint',s.maint,'x')} Maintenance mode (visual only)</label><div class="arow"><button class="btn" data-act="saveset" style="padding:10px 22px">Save settings</button><button class="sm dg" data-act="reset">Reset demo data</button></div></div>`}};

function mgr(t,kind,rows){return `<div class="vh"><h2>${t}</h2><button class="btn" data-act="add${kind}" style="padding:10px 20px">Add</button></div>${tbl(['Name','Products',''],rows.map(r=>`<tr><td>${esc(r[1])}</td><td>${r[2]}</td><td style="white-space:nowrap"><button class="sm" data-act="ren${kind}" data-id="${esc(r[0])}">Rename</button> <button class="sm dg" data-act="del${kind}" data-id="${esc(r[0])}">Delete</button></td></tr>`).join(''))}`}

/* render + nav */
const TITLES={overview:'Overview',products:'Products',categories:'Categories',brands:'Brands',orders:'Orders',customers:'Customers',promotions:'Promotions',reviews:'Reviews',content:'Website Content',settings:'Settings'};
$('#aside').innerHTML=Object.entries(TITLES).map(([k,v])=>`<button data-v="${k}">${v}</button>`).join('');
function render(anim){$av.innerHTML=V[view]();$$('#aside button').forEach(b=>b.setAttribute('aria-current',b.dataset.v===view));
 if(anim&&window.gsap&&!calm)gsap.from($av,{opacity:0,y:14,duration:.35,clearProps:'all'})}
const kp=(f)=>{const p=$('#pq');const pos=p?p.selectionStart:0;f();const n=$('#pq');if(n){n.focus();n.setSelectionRange(pos,pos)}};

/* modal */
const am=$('#am');let onOk=null;
function modal(title,fields,vals,ok){$('#amt').textContent=title;
 $('#amf').innerHTML=fields.map(f=>{const id='m-'+f.k,v=vals[f.k]??'';
  if(f.t==='check')return `<label class="stk fld"><input type="checkbox" id="${id}" ${v?'checked':''}> ${f.l}</label>`;
  const ctl=f.t==='select'?`<select id="${id}">${f.o.map(o=>`<option value="${esc(o[0])}" ${o[0]===v?'selected':''}>${esc(o[1])}</option>`).join('')}</select>`:f.t==='file'?`<input type="file" id="${id}" accept="image/*"><img id="m-prev" alt="Preview" hidden>`:`<input id="${id}" type="${f.t||'text'}" value="${esc(v)}" ${f.t==='number'?'min="0" step="any"':''}>`;
  return `<div class="fld"><label for="${id}">${f.l}</label>${ctl}<span class="err"></span></div>`}).join('');
 onOk=()=>{const out={};let bad=null;fields.forEach(f=>{const el=$('#m-'+f.k);if(f.t==='check'){out[f.k]=el.checked;return}if(f.t==='file')return;let v=el.value.trim(),e='';
  if(f.t==='number'){if(v===''&&!f.r)v=0;else if(v===''||isNaN(+v)||+v<0)e='Enter a number, 0 or more.';else v=+v}else if(f.r&&!v)e='Required.';
  el.setAttribute('aria-invalid',!!e);el.nextElementSibling.textContent=e;if(e&&!bad)bad=el;out[f.k]=v});
  if(bad){bad.focus();return}am.hidden=true;ok(out)};
 const fi=$('#m-img');if(fi)fi.onchange=()=>{const f=fi.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const i=$('#m-prev');i.src=r.result;i.hidden=false};r.readAsDataURL(f)};
 am.hidden=false;const f1=$('#amf input,#amf select');f1&&f1.focus()}
$('#amo').onclick=()=>onOk&&onOk();$('#amc').onclick=()=>am.hidden=true;
am.addEventListener('click',e=>{if(e.target===am)am.hidden=true});
$('#amf').addEventListener('submit',e=>{e.preventDefault();onOk&&onOk()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')am.hidden=true});

const pf=()=>[{k:'n',l:'Product name',r:1},{k:'b',l:'Brand',t:'select',o:S.brands.map(b=>[b,b])},{k:'c',l:'Category',t:'select',o:Object.entries(S.cats)},{k:'p',l:'Price',t:'number',r:1},{k:'o',l:'Previous price (optional)',t:'number'},{k:'s',l:'Stock quantity',t:'number',r:1},{k:'img',l:'Image preview (not saved)',t:'file'},{k:'f',l:'Featured product',t:'check'}];
const done=m=>{save();render(false);toast(m)};
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const A={
 addp(){modal('Add product',pf(),{b:S.brands[0],c:Object.keys(S.cats)[0]},v=>{const id=Math.max(0,...S.prods.map(p=>p.id))+1;S.prods.unshift({id,n:v.n,b:v.b,c:v.c,p:v.p,o:v.o,s:v.s,f:v.f,img:'p'+id});done('Product added')})},
 editp(el){const p=S.prods.find(x=>x.id==el.dataset.id);modal('Edit product',pf(),p,v=>{Object.assign(p,{n:v.n,b:v.b,c:v.c,p:v.p,o:v.o,s:v.s,f:v.f});done('Product updated')})},
 delp(el){const p=S.prods.find(x=>x.id==el.dataset.id);if(confirm('Delete "'+p.n+'"? (demo data only)')){S.prods=S.prods.filter(x=>x!==p);done('Product deleted')}},
 addcat(){modal('Add category',[{k:'n',l:'Category name',r:1}],{},v=>{const k=slug(v.n);if(!k||S.cats[k])return toast('That category already exists');S.cats[k]=v.n;done('Category added')})},
 rencat(el){modal('Rename category',[{k:'n',l:'Category name',r:1}],{n:S.cats[el.dataset.id]},v=>{S.cats[el.dataset.id]=v.n;done('Category renamed')})},
 delcat(el){const k=el.dataset.id;if(S.prods.some(p=>p.c===k))return toast('Move or delete its products first');if(confirm('Delete this category?')){delete S.cats[k];done('Category deleted')}},
 addbrand(){modal('Add brand',[{k:'n',l:'Brand name',r:1}],{},v=>{if(S.brands.includes(v.n))return toast('That brand already exists');S.brands.push(v.n);S.brands.sort();done('Brand added')})},
 renbrand(el){const o=el.dataset.id;modal('Rename brand',[{k:'n',l:'Brand name',r:1}],{n:o},v=>{S.brands=S.brands.map(b=>b===o?v.n:b).sort();S.prods.forEach(p=>{if(p.b===o)p.b=v.n});done('Brand renamed')})},
 delbrand(el){const b=el.dataset.id;if(S.prods.some(p=>p.b===b))return toast('Move or delete its products first');if(confirm('Delete this brand?')){S.brands=S.brands.filter(x=>x!==b);done('Brand deleted')}},
 addc(){modal('New campaign',[{k:'n',l:'Campaign name',r:1},{k:'pct',l:'Discount %',t:'number',r:1}],{},v=>{S.camps.push({id:Date.now(),n:v.n,pct:Math.min(90,v.pct),on:true});done('Campaign created')})},
 delc(el){S.camps=S.camps.filter(c=>c.id!=el.dataset.id);done('Campaign deleted')},
 savebn(){$$('[data-bn]').forEach(i=>S.banners[+i.dataset.bn]=i.value.trim());done('Banners saved')},
 savect(){const c=S.content;['hero','promo','about','phone','email'].forEach(k=>c[k]=$('#w-'+k).value.trim());c.fcats=$$('[data-fc]:checked').map(x=>x.dataset.fc);done('Content saved (demo)')},
 saveset(){S.set.name=$('#s-name').value.trim()||'Vernyuy Tech';S.set.del=Math.max(0,+$('#s-del').value||0);done('Settings saved (demo)')},
 reset(){if(confirm('Reset all admin demo data?')){localStorage.removeItem('nx_admin');S=def();render(true);toast('Demo data reset')}}
};
$av.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b&&A[b.dataset.act])A[b.dataset.act](b)});
$av.addEventListener('change',e=>{const t=e.target,k=t.dataset.chg;if(!k)return;
 if(k==='feat')S.prods.find(p=>p.id==t.dataset.id).f=t.checked;
 else if(k==='ord')S.orders.find(o=>o.id===t.dataset.id).st=t.value;
 else if(k==='rev')S.reviews.find(r=>r.id==t.dataset.id).st=t.value;
 else if(k==='camp')S.camps.find(c=>c.id==t.dataset.id).on=t.checked;
 else if(k==='maint')S.set.maint=t.checked;
 save();toast('Saved');if(k==='ord')render(false)});
$av.addEventListener('input',e=>{if(e.target.id==='pq'){q=e.target.value.trim().toLowerCase();kp(()=>{$av.innerHTML=V.products()})}});
$('#aside').addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(b){view=b.dataset.v;render(true)}});
render(true);
});
