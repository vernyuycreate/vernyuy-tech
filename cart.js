/* Cart, wishlist and demo checkout. Page chosen by <body data-page>. */
(function(){
const DEL=5000; /* demo flat delivery estimate */
const lines=()=>store.get('nx_cart').map(i=>({...i,p:byId(i.id)})).filter(l=>l.p);
const totals=()=>{const s=lines().reduce((t,l)=>t+l.p.p*l.q,0);return{s,d:s?DEL:0,t:s?s+DEL:0}};
const rows=t=>`<div class="r"><span>Subtotal</span><span>${money(t.s)}</span></div><div class="r"><span>Estimated delivery (demo)</span><span>${money(t.d)}</span></div><div class="r tot"><span>Estimated total</span><span>${money(t.t)}</span></div>`;
const empty=(h,p,a,u)=>`<div class="emptyst"><h2>${h}</h2><p>${p}</p><a class="btn" href="${u}">${a}</a></div>`;
const intro=el=>{if(window.gsap&&!calm)gsap.from(el,{opacity:0,y:20,duration:.5,stagger:.06,clearProps:'all'})};
const page=document.body.dataset.page;

/* ---------- cart ---------- */
function drawCart(anim){
 const root=$('#cart'),l=lines();
 if(!l.length){root.innerHTML=empty('Your cart is empty','Add a device to see it here.','Continue shopping','shop.html');return}
 const t=totals();
 root.innerHTML=`<div>${l.map(x=>`<div class="line" data-id="${x.id}">${slot(x.p.img,x.p.n)}<div><small>${x.p.b}</small><h3><a href="product-details.html?id=${x.id}">${x.p.n}</a></h3><div class="meta">${money(x.p.p)} each${x.o?` · ${x.o}`:''}</div>
<div class="qty"><button data-qd="${x.id}:-1" aria-label="Decrease quantity">−</button><span aria-live="polite">${x.q}</span><button data-qd="${x.id}:1" aria-label="Increase quantity">+</button></div></div>
<div class="lp"><b>${money(x.p.p*x.q)}</b><button class="rm" data-rm="${x.id}">Remove</button></div></div>`).join('')}</div>
<aside class="sum"><h2>Order summary</h2>${rows(t)}<a class="btn" href="checkout.html">Proceed to checkout</a><a class="btn ghost" style="color:var(--ink)" href="shop.html">Continue shopping</a><p class="fine">Delivery is a demonstration estimate only.</p></aside>`;
 if(anim)intro('.line')
}
function setQty(id,d){const c=store.get('nx_cart'),i=c.find(x=>x.id===id);if(!i)return;i.q+=d;store.set('nx_cart',i.q>0?c:c.filter(x=>x.id!==id));counts();pop($('#cc'));drawCart(false)}
function removeLine(id){const el=$(`.line[data-id="${id}"]`),go=()=>{store.set('nx_cart',store.get('nx_cart').filter(x=>x.id!==id));counts();drawCart(false)};
 window.gsap&&!calm&&el?gsap.to(el,{opacity:0,x:40,duration:.3,onComplete:go}):go()}
if(page==='cart'){
 document.addEventListener('click',e=>{const q=e.target.closest('[data-qd]'),r=e.target.closest('[data-rm]');
  if(q){const[a,b]=q.dataset.qd.split(':');setQty(+a,+b)}if(r)removeLine(+r.dataset.rm)});
 drawCart(true);
}

/* ---------- wishlist ---------- */
function drawWish(anim){
 const ids=store.get('nx_wish'),l=ids.map(byId).filter(Boolean),root=$('#wl');
 root.innerHTML=l.length?l.map(card).join(''):empty('No saved items yet','Tap the heart on any product to save it here.','Browse products','shop.html');
 if(anim&&l.length)intro('#wl .card')
}
if(page==='wishlist'){
 /* app.js runs first and updates storage, then we redraw */
 document.addEventListener('click',e=>{if(e.target.closest('[data-w]'))setTimeout(()=>drawWish(false),0)});
 drawWish(true);
}

/* ---------- checkout (demo) ---------- */
if(page==='checkout'){
 const root=$('#co'),l=lines();
 if(!l.length)root.innerHTML=empty('Nothing to check out','Your cart is empty.','Shop products','shop.html');
 else{
  const t=totals();
  root.innerHTML=`<form id="cf" novalidate><div class="demo" role="note">Demonstration checkout. No real payment is taken and no order is processed.</div>
<fieldset class="fs"><legend>Your details</legend><div class="fg2">
<div class="fld"><label for="f-name">Full name</label><input id="f-name" autocomplete="name"><span class="err"></span></div>
<div class="fld"><label for="f-email">Email</label><input id="f-email" type="email" autocomplete="email"><span class="err"></span></div>
<div class="fld"><label for="f-phone">Phone number</label><input id="f-phone" type="tel" autocomplete="tel" placeholder="+237 6XX XXX XXX"><span class="err"></span></div>
<div class="fld"><label for="f-loc">Delivery location</label><select id="f-loc"><option value="">Select a city</option><option>Douala</option><option>Yaoundé</option><option>Bamenda</option><option>Buea</option><option>Bafoussam</option><option>Other</option></select><span class="err"></span></div>
<div class="fld full"><label for="f-addr">Delivery address</label><textarea id="f-addr" rows="3" autocomplete="street-address"></textarea><span class="err"></span></div></div></fieldset>
<fieldset class="fs"><legend>Payment method (visual demo only)</legend><div class="pay">
<label><input type="radio" name="pay" value="Mobile Money" checked> Mobile Money</label><label><input type="radio" name="pay" value="Orange Money"> Orange Money</label>
<label><input type="radio" name="pay" value="Bank Transfer"> Bank Transfer</label><label><input type="radio" name="pay" value="Cash on Delivery"> Cash on Delivery</label></div></fieldset>
<button class="btn" type="submit">Place demo order</button></form>
<aside class="sum"><h2>Order summary</h2>${l.map(x=>`<div class="mini"><span>${x.p.n} × ${x.q}</span><span>${money(x.p.p*x.q)}</span></div>`).join('')}<div style="margin-top:12px">${rows(t)}</div><a class="btn ghost" style="color:var(--ink)" href="cart.html">Edit cart</a></aside>`;
  const rules={'f-name':v=>v.trim().length>=2||'Enter your full name.','f-email':v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Enter a valid email, like name@example.com.','f-phone':v=>/^\+?[\d\s-]{8,16}$/.test(v.trim())||'Enter a valid phone number.','f-loc':v=>!!v||'Select a delivery location.','f-addr':v=>v.trim().length>=6||'Enter your delivery address.'};
  const check=id=>{const el=$('#'+id),r=rules[id](el.value),ok=r===true;el.setAttribute('aria-invalid',!ok);el.nextElementSibling.textContent=ok?'':r;return ok};
  Object.keys(rules).forEach(id=>$('#'+id).addEventListener('blur',()=>check(id)));
  $('#cf').addEventListener('submit',e=>{e.preventDefault();
   const bad=Object.keys(rules).filter(id=>!check(id));
   if(bad.length){$('#'+bad[0]).focus();return}
   const name=$('#f-name').value.trim(),pay=$('input[name=pay]:checked').value,no='NX-DEMO-'+Math.floor(10000+Math.random()*90000);
   root.innerHTML=`<div class="ok"><h2>Demo order received</h2><p>Thank you, <span id="ok-n"></span>. This is a demonstration, so no payment was taken and no real order was created.</p><div class="no">${no}</div><p>Selected payment option: ${pay} (not processed). Estimated total: ${money(t.t)}.</p><a class="btn" href="shop.html">Back to the shop</a></div>`;
   $('#ok-n').textContent=name;
   store.set('nx_cart',[]);counts();window.scrollTo({top:0});intro('.ok');
  });
 }
}
})();
