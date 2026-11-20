/* Vernyuy Tech shared app: layout, cart, wishlist, quick view. Needs products.js first. */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const WA='https://wa.me/237652311022?text='+encodeURIComponent("Hello Vernyuy Services. I saw your Vernyuy Tech electronics website demonstration and would like to know how I can get a similar website for my electronics business.");
const money=n=>Math.round(n).toLocaleString('en-US').replace(/,/g,' ')+' XAF';
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const store={get:k=>{try{return JSON.parse(localStorage.getItem(k))||[]}catch(e){return[]}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const slot=(f,alt='')=>`<div class="ph" data-slot="${f}.jpg"><img src="images/${f}.jpg" alt="${alt}" loading="lazy" onerror="this.remove()"></div>`;
const byId=id=>P.find(p=>p.id===+id);

function card(p){const w=store.get('nx_wish').includes(p.id),d=p.o?Math.round((1-p.p/p.o)*100):0;
return `<article class="card"><div style="position:relative">${slot(p.img,p.n)}${p.new?'<span class="badge">New arrival</span>':d?`<span class="badge off">-${d}%</span>`:''}<button class="wish ${w?'on':''}" data-w="${p.id}" aria-label="Save to wishlist">${w?'♥':'♡'}</button></div>
<div class="cbody"><small>${p.b} · ${CAT_LABELS[p.c]}</small><h3><a href="product-details.html?id=${p.id}">${p.n}</a></h3>
<div class="meta">★ ${p.r} (${p.rv}) · <span class="${p.stock?'in':'out'}">${p.stock?'In stock':'Out of stock'}</span></div>
<div class="price">${money(p.p)}${p.o?`<s>${money(p.o)}</s>`:''}${d?`<em class="pct">-${d}%</em>`:''}</div>
<div class="acts"><button data-q="${p.id}">Quick view</button><button class="add" data-a="${p.id}" ${p.stock?'':'disabled'}>Add to cart</button></div><label class="cmp"><input type="checkbox" data-c="${p.id}" ${store.get('nx_cmp').includes(p.id)?'checked':''}> Compare</label></div></article>`}

/* layout */
const NAV=[['Home','index.html'],['Shop','shop.html'],['Smartphones','smartphones.html'],['Computers','computers.html'],['TVs','televisions.html'],['Accessories','accessories.html'],['Deals','deals.html'],['About','about.html'],['Contact','contact.html'],['Admin','admin/dashboard.html']];
const page=location.pathname.split('/').pop()||'index.html';
function layout(){
 const h=$('#nx-header'),f=$('#nx-footer');
 if(h)h.innerHTML=`<div class="ann" id="ann"><p>Discover the latest technology.</p><p>Special offers on selected devices.</p><p>Shop your favourite brands.</p><p>Quality technology. Better experiences.</p></div>
<header><div class="wrap nav"><a class="logo" href="index.html">Vernyuy <b>Tech</b></a>
<ul class="links">${NAV.map(([t,u])=>t==='Shop'?`<li class="has-mega"><a href="${u}">${t}</a><button class="caret" id="mgb" aria-expanded="false" aria-controls="mega" aria-label="Show product categories">▾</button><div class="mega" id="mega">${Object.entries(CAT_LABELS).map(([k,v])=>`<a href="shop.html?c=${k}">${v}</a>`).join('')}</div></li>`:`<li><a href="${u}" ${u===page?'aria-current="page" style="color:var(--blue)"':''}>${t}</a></li>`).join('')}</ul>
<div class="icons"><a href="shop.html?focus=1" aria-label="Search">⌕</a><a class="acct" href="#" aria-label="Account (demo)">☺</a><a href="wishlist.html" aria-label="Wishlist">♡<span class="cnt" id="wc">0</span></a><a href="cart.html" aria-label="Cart">🛒<span class="cnt" id="cc">0</span></a><button class="burger" id="bg" aria-label="Open menu" aria-expanded="false" aria-controls="dr">☰</button></div></div></header>
<div class="scrim" id="scrim" hidden></div><nav class="drawer" id="dr" aria-label="Menu"><button class="dx" id="dx" aria-label="Close menu">✕</button>${NAV.map(([t,u])=>`<a href="${u}">${t}</a>`).join('')}<div class="dsub"><a href="shop.html?c=tablets">Tablets</a><a href="shop.html?c=watches">Smartwatches</a><a href="shop.html?c=gaming">Gaming</a><a href="audio.html">Audio</a></div></nav>`;
 if(f)f.innerHTML=`<footer><div class="wrap"><div class="fg"><div><a class="logo" href="index.html" style="color:#fff">Vernyuy <b>Tech</b></a><p style="margin-top:12px;max-width:300px">Premium digital devices, from smartphones to smart homes. Demonstration store.</p></div>
<div><h4>Shop</h4><ul><li><a href="smartphones.html">Smartphones</a></li><li><a href="computers.html">Computers</a></li><li><a href="televisions.html">TVs</a></li><li><a href="audio.html">Audio</a></li></ul></div>
<div><h4>Support</h4><ul><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li><li><a href="cart.html">Cart</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="about.html">About</a></li><li><a href="team.html">Our team</a></li><li><a href="deals.html">Deals</a></li></ul></div></div>
<div class="fb"><span>© 2026 Vernyuy Tech. Demonstration website.</span><a href="${WA}" target="_blank" rel="noopener">Made by Vernyuy Services.</a></div></div></footer>`;
 document.body.insertAdjacentHTML('beforeend',`<a class="wa" href="${WA}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" title="Chat on WhatsApp"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.93L2 22l5.2-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.89.9-3-.2-.31A8.1 8.1 0 1 1 12.04 20.1Zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg></a><div class="toast" id="toast" role="status"></div>
<div class="cbar" id="cbar" hidden><span>Compare (<b id="cbn">0</b>)</span><a class="btn" href="compare.html">Compare now</a><button id="cclr">Clear</button></div><div class="qv" id="qv" hidden><div class="qv-box" role="dialog" aria-modal="true" aria-label="Quick view"></div></div>`);
 const dr=$('#dr'),sc=$('#scrim'),bg=$('#bg'),mg=$('#mgb'),mega=$('#mega');
 if(bg){const setMenu=o=>{dr.classList.toggle('open',o);sc.hidden=!o;bg.setAttribute('aria-expanded',o);bg.textContent=o?'✕':'☰';bg.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':'';if(o)$('#dx').focus()};
  const setMega=o=>{mega.parentNode.classList.toggle('open',o);mg.setAttribute('aria-expanded',o)};
  bg.onclick=()=>setMenu(!dr.classList.contains('open'));
  $('#dx').onclick=sc.onclick=()=>{setMenu(false);bg.focus()};
  dr.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
  mg.onclick=()=>setMega(!mega.parentNode.classList.contains('open'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);setMega(false)}});
  document.addEventListener('click',e=>{if(!e.target.closest('.has-mega'))setMega(false)});
  matchMedia('(min-width:901px)').addEventListener('change',()=>setMenu(false))}
 counts();cbar();
}
function counts(){const c=$('#cc'),w=$('#wc');if(c)c.textContent=store.get('nx_cart').reduce((s,i)=>s+i.q,0);if(w)w.textContent=store.get('nx_wish').length}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2200)}
function pop(el){if(window.gsap&&!calm&&el)gsap.fromTo(el,{scale:1.6},{scale:1,duration:.5,ease:'back.out(3)',overwrite:true})}

/* cart + wishlist */
function addToCart(id,q=1,o){const c=store.get('nx_cart'),i=c.find(x=>x.id===id);i?(i.q+=q,o&&(i.o=o)):c.push({id,q,o});store.set('nx_cart',c);counts();pop($('#cc'));toast('Added to cart')}
function toggleWish(id){let l=store.get('nx_wish');const on=l.includes(id);l=on?l.filter(x=>x!==id):[...l,id];store.set('nx_wish',l);counts();pop($('#wc'));toast(on?'Removed from wishlist':'Saved to wishlist');return!on}

/* quick view */
function openQV(id){const p=byId(id),d=p.o?Math.round((1-p.p/p.o)*100):0,m=$('#qv'),b=$('.qv-box',m);
 b.innerHTML=`<button class="qv-x" aria-label="Close">✕</button>${slot(p.img,p.n)}<div class="qv-t"><small>${p.b} · ${CAT_LABELS[p.c]}</small><h3>${p.n}</h3><div class="meta">★ ${p.r} (${p.rv} demo reviews) · ${p.stock?'In stock':'Out of stock'}</div><div class="price" style="font-size:1.6rem">${money(p.p)}${p.o?`<s>${money(p.o)}</s><em class="pct">-${d}%</em>`:''}</div><p class="meta">Demonstration product. See the details page for full specifications.</p><div class="acts"><a class="btn ghost" style="color:var(--ink)" href="product-details.html?id=${p.id}">Full details</a><button class="btn add2" data-a="${p.id}" ${p.stock?'':'disabled'}>Add to cart</button></div></div>`;
 m.hidden=false;m._from=document.activeElement;$('.qv-x',b).focus();
 if(window.gsap&&!calm){gsap.fromTo(m,{opacity:0},{opacity:1,duration:.25});gsap.fromTo(b,{y:30,scale:.96},{y:0,scale:1,duration:.4,ease:'power3.out'})}}
function closeQV(){const m=$('#qv');if(m.hidden)return;m.hidden=true;m._from&&m._from.focus()}

document.addEventListener('click',e=>{
 const a=e.target.closest('[data-a]'),w=e.target.closest('[data-w]'),q=e.target.closest('[data-q]'),r=e.target.closest('[data-r]');
 if(a)addToCart(+a.dataset.a);
 if(w){const on=toggleWish(+w.dataset.w);$$(`[data-w="${w.dataset.w}"]`).forEach(x=>{x.classList.toggle('on',on);x.textContent=on?'♥':'♡'});pop(w)}
 if(q&&typeof openQV==='function'&&$('#qv'))openQV(+q.dataset.q);
 if(r)$('#'+r.dataset.r).scrollBy({left:r.dataset.d*300,behavior:'smooth'});
 if(e.target.id==='qv'||e.target.closest('.qv-x'))closeQV();
});
/* compare (same category only, max 4) */
function cbar(){const l=store.get('nx_cmp'),b=$('#cbar');if(!b)return;b.hidden=!l.length;$('#cbn').textContent=l.length}
document.addEventListener('change',e=>{const c=e.target.closest('[data-c]');if(!c)return;const id=+c.dataset.c;let l=store.get('nx_cmp');
 if(c.checked){const f=l.length&&byId(l[0]);if(f&&f.c!==byId(id).c){c.checked=false;toast('Compare products from the same category');return}
  if(l.length>=4){c.checked=false;toast('You can compare up to 4 products');return}l.push(id)}else l=l.filter(x=>x!==id);
 store.set('nx_cmp',l);cbar()});
document.addEventListener('click',e=>{if(e.target.id==='cclr'){store.set('nx_cmp',[]);$$('[data-c]').forEach(x=>x.checked=false);cbar()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeQV()});
document.addEventListener('DOMContentLoaded',()=>{layout();
 if(window.gsap&&!calm){const ps=$$('#ann p');if(ps.length){$('#ann').style.position='relative';gsap.set(ps,{yPercent:100,position:'absolute',left:0,right:0});gsap.set(ps[0],{yPercent:0});let i=0;setInterval(()=>{const o=ps[i];i=(i+1)%ps.length;gsap.to(o,{yPercent:-100,duration:.5});gsap.fromTo(ps[i],{yPercent:100},{yPercent:0,duration:.5})},3500)}
  gsap.to('.wa',{scale:1.1,duration:1,yoyo:true,repeat:-1,ease:'sine.inOut'})}
 else{$$('#ann p').forEach((p,i)=>i&&(p.style.display='none'))}
});
