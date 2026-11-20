/* Compare page: products from one category, up to 4. Only that category's specs are shown. */
document.addEventListener('DOMContentLoaded',()=>{
const root=$('#cmpw');
function draw(){
 const l=store.get('nx_cmp').map(byId).filter(Boolean);
 if(!l.length){root.innerHTML='<div class="emptyst"><h2>Nothing to compare yet</h2><p>Tick "Compare" on up to 4 products from the same category.</p><a class="btn" href="shop.html">Browse products</a></div>';return}
 const rows=specsFor(l[0]).map(s=>s[0]);
 const cell=(p,r)=>(specsFor(p).find(s=>s[0]===r)||[0,'—'])[1];
 root.innerHTML=`<p class="meta" style="margin-bottom:16px">${CAT_LABELS[l[0].c]} · ${l.length} of 4 selected</p><div class="ctab"><table><thead><tr><th></th>${l.map(p=>`<th scope="col">${slot(p.img,p.n)}<a href="product-details.html?id=${p.id}"><b>${p.n}</b></a><div style="margin-top:8px"><button class="rm" data-x="${p.id}">Remove</button></div></th>`).join('')}</tr></thead>
<tbody><tr><th scope="row">Brand</th>${l.map(p=>`<td>${p.b}</td>`).join('')}</tr>
<tr><th scope="row">Price</th>${l.map(p=>`<td><b>${money(p.p)}</b>${p.o?` <s style="color:var(--silver)">${money(p.o)}</s>`:''}</td>`).join('')}</tr>
<tr><th scope="row">Rating</th>${l.map(p=>`<td>★ ${p.r} (${p.rv})</td>`).join('')}</tr>
${rows.map(r=>`<tr><th scope="row">${r}</th>${l.map(p=>`<td>${cell(p,r)}</td>`).join('')}</tr>`).join('')}
<tr><th scope="row"></th>${l.map(p=>`<td><button class="btn add2" data-a="${p.id}" ${p.stock?'':'disabled'} style="padding:10px 18px">Add to cart</button></td>`).join('')}</tr></tbody></table></div>
<p style="margin-top:24px"><a class="btn ghost" style="color:var(--ink)" href="shop.html?c=${l[0].c}">Add more products</a></p>`;
 if(window.gsap&&!calm)gsap.from('.ctab td,.ctab thead th',{opacity:0,y:12,duration:.4,stagger:.015,clearProps:'all'});
}
document.addEventListener('click',e=>{const x=e.target.closest('[data-x]');if(x){store.set('nx_cmp',store.get('nx_cmp').filter(i=>i!==+x.dataset.x));draw();cbar()}});
draw();
});
