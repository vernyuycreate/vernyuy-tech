/* Product details. URL: product-details.html?id=<n>. Images: p<id>.jpg, p<id>-2.jpg ... p<id>-4.jpg */
document.addEventListener('DOMContentLoaded',()=>{
const root=$('#pd'),id=+new URLSearchParams(location.search).get('id'),p=byId(id);
if(!p){root.innerHTML='<div class="wrap emptyst" style="margin:48px auto"><h2>Product not found</h2><p>This product is not in the demo catalogue.</p><a class="btn" href="shop.html">Browse the shop</a></div>';return}
document.title=p.n+' – Vernyuy Tech';
const d=p.o?Math.round((1-p.p/p.o)*100):0,specs=specsFor(p);
const COL=[['Midnight','#1b1d22'],['Silver','#d4d7dc'],['Blue','#3b6df0']];
const CFG={phones:['128GB','256GB','512GB'],tablets:['128GB','256GB','512GB'],laptops:['16GB / 512GB','16GB / 1TB','32GB / 1TB']}[p.c];
const hasCol=['phones','laptops','tablets','watches','audio'].includes(p.c);
const imgs=[`p${id}`,`p${id}-2`,`p${id}-3`,`p${id}-4`];
let cur=0,qty=1,col=COL[0][0],cfg=CFG&&CFG[0];
const wish=()=>store.get('nx_wish').includes(id),cmp=()=>store.get('nx_cmp').includes(id);

/* recently viewed */
const seen=store.get('nx_recent').filter(x=>x!==id);store.set('nx_recent',[id,...seen].slice(0,8));
const rel=P.filter(x=>x.c===p.c&&x.id!==id).slice(0,8);
const waMsg=`https://wa.me/237652311022?text=${encodeURIComponent(`Hello, I'm interested in the ${p.n} (${money(p.p)}) from the Vernyuy Tech demonstration store. Is it available?`)}`;
const REV=[['Amara O.',5,'Exactly what I needed. Setup was quick and it feels well made.'],['Luc B.',4,'Good value for the price. Battery life is solid for daily use.'],['Sandra M.',5,'Clear specs on the page made choosing easy. Would recommend.']];

root.innerHTML=`<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <a href="shop.html?c=${p.c}">${CAT_LABELS[p.c]}</a> / ${p.n}</nav>
<div class="pd"><div class="gal"><button class="main" id="main" aria-label="Open image larger"></button><div class="thumbs" id="thumbs"></div></div>
<div class="info"><span class="brand">${p.b}</span><h1>${p.n}</h1>
<div class="meta">★ ${p.r} · ${p.rv} demo reviews · <span class="${p.stock?'in':'out'}">${p.stock?'In stock':'Out of stock'}</span></div>
<div class="pr">${money(p.p)}${p.o?`<s>${money(p.o)}</s><span class="badge off">-${d}%</span>`:''}</div>
<ul class="hl">${specs.slice(0,4).map(s=>`<li>${s[0]}: ${s[1]}</li>`).join('')}</ul>
${hasCol?`<div class="opt"><h4>Colour: <span id="coln">${col}</span></h4><div class="sw" id="cols">${COL.map((c,i)=>`<button class="${i?'':'on'}" data-col="${c[0]}"><i style="background:${c[1]}"></i>${c[0]}</button>`).join('')}</div></div>`:''}
${CFG?`<div class="opt"><h4>${p.c==='laptops'?'Configuration':'Storage'}</h4><div class="sw" id="cfgs">${CFG.map((c,i)=>`<button class="${i?'':'on'}" data-cfg="${c}">${c}</button>`).join('')}</div></div>`:''}
<div class="buy"><div class="qty"><button id="qm" aria-label="Decrease quantity">−</button><span id="qn">1</span><button id="qp" aria-label="Increase quantity">+</button></div>
<button class="btn" id="add" ${p.stock?'':'disabled'}>Add to cart</button></div>
<div class="sec2"><button id="wl">${wish()?'♥ Saved':'♡ Add to wishlist'}</button><button id="cm">${cmp()?'✓ In compare':'Compare'}</button><a href="${waMsg}" target="_blank" rel="noopener">WhatsApp inquiry</a></div>
<p class="meta" style="margin-top:16px">Demonstration store. Prices and specifications are sample data.</p></div></div></div>
<div class="wrap"><section class="blk"><div class="two"><div><h2>Product information</h2><p>The ${p.n} from ${p.b} is part of our ${CAT_LABELS[p.c].toLowerCase()} range. This is demonstration copy: replace it with your own product description, key features and what is in the box.</p></div>
<div><h2>Specifications</h2><table class="stab"><tr><th>Brand</th><td>${p.b}</td></tr>${specs.map(s=>`<tr><th>${s[0]}</th><td>${s[1]}</td></tr>`).join('')}</table></div></div></section>
<section class="blk"><div class="two"><div><h2>Shipping and warranty</h2><details open><summary>Delivery</summary><p>Demonstration information. Delivery options and timing are confirmed when you contact the store.</p></details><details><summary>Warranty</summary><p>Warranty terms depend on the product and brand. Ask the store for the details before you buy.</p></details><details><summary>Returns</summary><p>Return conditions are shown here in a real store. This is sample content.</p></details></div>
<div><h2>Customer reviews</h2><span class="demoflag">Demonstration reviews, not from real customers</span>${REV.map(r=>`<div class="rv"><b>${r[0]}</b>${'★'.repeat(r[1])}${'☆'.repeat(5-r[1])}<p>${r[2]}</p></div>`).join('')}</div></div></section>
${rel.length?`<section class="blk"><h2>Related products</h2><div class="rail" id="rel">${rel.map(card).join('')}</div></section>`:''}
<section class="blk" id="rvw" hidden><h2>Recently viewed</h2><div class="rail" id="rec"></div></section></div>
<div class="lb" id="lb" hidden><button class="x" aria-label="Close">✕</button><button class="pv" aria-label="Previous image">←</button><div id="lbi"></div><button class="nx" aria-label="Next image">→</button></div>`;

const rec=seen.map(byId).filter(Boolean).slice(0,6);
if(rec.length){$('#rvw').hidden=false;$('#rec').innerHTML=rec.map(card).join('')}

/* gallery */
function drawGal(fade){
 $('#main').innerHTML=slot(imgs[cur],p.n);
 $('#thumbs').innerHTML=imgs.map((f,i)=>`<button class="${i===cur?'on':''}" data-t="${i}" aria-label="Image ${i+1}">${slot(f)}</button>`).join('');
 if(fade&&window.gsap&&!calm)gsap.from('#main .ph',{opacity:0,scale:.98,duration:.4})}
drawGal();
const lb=$('#lb');
function lbShow(){$('#lbi').innerHTML=slot(imgs[cur],p.n);lb.hidden=false;if(window.gsap&&!calm)gsap.from('#lbi',{opacity:0,scale:.95,duration:.3})}
const step=n=>{cur=(cur+n+imgs.length)%imgs.length;drawGal(false);if(!lb.hidden)lbShow()};
$('#thumbs').addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(t){cur=+t.dataset.t;drawGal(true)}});
$('#main').onclick=lbShow;
lb.addEventListener('click',e=>{if(e.target===lb||e.target.closest('.x'))lb.hidden=true;else if(e.target.closest('.pv'))step(-1);else if(e.target.closest('.nx'))step(1)});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});

/* options + actions */
const pick=(sel,attr,fn)=>{const el=$(sel);el&&el.addEventListener('click',e=>{const b=e.target.closest('['+attr+']');if(!b)return;$$('button',el).forEach(x=>x.classList.toggle('on',x===b));fn(b.getAttribute(attr))})};
pick('#cols','data-col',v=>{col=v;$('#coln').textContent=v});pick('#cfgs','data-cfg',v=>cfg=v);
$('#qm').onclick=()=>{qty=Math.max(1,qty-1);$('#qn').textContent=qty};$('#qp').onclick=()=>{qty=Math.min(9,qty+1);$('#qn').textContent=qty};
$('#add').onclick=()=>addToCart(id,qty,[hasCol&&col,cfg].filter(Boolean).join(' · ')||undefined);
$('#wl').onclick=()=>{const on=toggleWish(id);$('#wl').textContent=on?'♥ Saved':'♡ Add to wishlist';$('#wl').classList.toggle('on',on)};
$('#cm').onclick=()=>{let l=store.get('nx_cmp');
 if(l.includes(id))l=l.filter(x=>x!==id);
 else{const f=l.length&&byId(l[0]);if(f&&f.c!==p.c)return toast('Compare products from the same category');if(l.length>=4)return toast('You can compare up to 4 products');l.push(id)}
 store.set('nx_cmp',l);$('#cm').textContent=l.includes(id)?'✓ In compare':'Compare';cbar()};
});
