/* Info pages: reveals, stat count-up, FAQ accordion, contact form. Page picked via <body data-page>. */
document.addEventListener('DOMContentLoaded',()=>{
const page=document.body.dataset.page,rm=calm||!window.gsap;
/* scroll reveals */
if(!rm){gsap.registerPlugin(ScrollTrigger);
 $$('.rv').forEach(el=>gsap.from(el,{opacity:0,y:36,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
 $$('.split .ph img,.lead .ph img').forEach(im=>gsap.fromTo(im,{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:im.parentNode,scrub:true}}));
 gsap.from('.ih .wrap>*',{opacity:0,y:30,duration:.8,stagger:.12,ease:'power3.out'})}
/* stats count up */
$$('.stat b').forEach(b=>{const n=+b.dataset.n,suf=b.dataset.s||'';b.textContent=n+suf;
 if(rm)return;const o={v:0};ScrollTrigger.create({trigger:b,start:'top 90%',once:true,onEnter:()=>gsap.to(o,{v:n,duration:1.6,ease:'power2.out',onUpdate:()=>b.textContent=Math.round(o.v)+suf})})});

/* FAQ */
if(page==='faq'){
 const F={Products:[['Are the products genuine?','In a real store this answer would explain how products are sourced and how to verify them. This is demonstration content.'],['How can I confirm product specifications?','Each product page lists its specifications. You can also use the compare tool or message the store to confirm details before ordering.'],['Are products available in different colours?','Many devices come in several colours. Options are shown on the product page where they apply, and availability can vary.'],['Can I request a particular device?','Yes. Send the store a message with the model you want and the team can tell you what is possible.']],
Orders:[['How do I place an order?','Add products to your cart and go to checkout. In this demonstration no real order is created.'],['Can I modify an order?','In a real store you would contact the team as early as possible. This is sample content.'],['How can I check my order?','A real store would let you check status with your order number. This demo has no live orders.']],
Payments:[['What payment methods are supported?','The checkout shows Mobile Money, Orange Money, Bank Transfer and Cash on Delivery as a visual demonstration only.'],['Is payment required before delivery?','That depends on the payment method and store policy. This is sample content, so confirm details with the store.']],
Delivery:[['Do you deliver?','A real store would list the areas it delivers to. Delivery fees in this demo are estimates only.'],['How long does delivery take?','Delivery times vary by location and product. Exact timing would be confirmed by the store.'],['Can I arrange collection?','A real store may offer collection. Ask the team through the contact page.']],
'Warranty and returns':[['Do products come with warranties?','Warranty terms depend on the product and brand. Details would be shown on each product page.'],['What happens if a product develops a fault?','Contact the store with your order details and the team would explain the next steps. This is sample content.'],['Can I return a product?','Return conditions would be set out by the store. This demonstration does not process returns.']],
'Customer support':[['How can I contact the store?','Use the contact page, phone or WhatsApp. Contact details on this site are demonstration information.'],['Can someone help me choose a device?','Yes. Tell the team what you need and your budget and they can suggest options.']]};
 const root=$('#acc'),cats=Object.keys(F);let cat='All',q='';
 $('#fchips').innerHTML=['All',...cats].map(c=>`<button class="chip ${c==='All'?'on':''}" data-c="${c}">${c}</button>`).join('');
 function draw(){let n=0,h='';
  cats.forEach(c=>{if(cat!=='All'&&cat!==c)return;const it=F[c].filter(x=>!q||(x[0]+x[1]).toLowerCase().includes(q));if(!it.length)return;n+=it.length;
   h+=`<h2 class="fcat">${c}</h2><div class="acc">${it.map(x=>`<div class="q"><button aria-expanded="false">${x[0]}</button><div class="ans"><div><p>${x[1]}</p></div></div></div>`).join('')}</div>`});
  root.innerHTML=n?h:'<div class="nores"><h3>No questions found</h3><p>Try different words, or contact the store.</p></div>';$('#fcount').textContent=n+(n===1?' question':' questions')}
 root.addEventListener('click',e=>{const b=e.target.closest('.q>button');if(!b)return;const o=b.parentNode.classList.toggle('open');b.setAttribute('aria-expanded',o)});
 $('#fchips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.c;$$('#fchips .chip').forEach(x=>x.classList.toggle('on',x===b));draw()});
 $('#fq').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();draw()});
 $('#fwa').href=WA;draw()}

/* Contact */
if(page==='contact'){
 $('#cwa').href=WA;
 const R={'c-name':v=>v.trim().length>=2||'Enter your full name.','c-email':v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Enter a valid email address.','c-phone':v=>/^\+?[\d\s-]{8,16}$/.test(v.trim())||'Enter a valid phone number.','c-sub':v=>v.trim().length>=3||'Enter a subject.','c-msg':v=>v.trim().length>=10||'Write at least 10 characters.'};
 const chk=id=>{const el=$('#'+id),r=R[id](el.value),ok=r===true;el.setAttribute('aria-invalid',!ok);el.nextElementSibling.textContent=ok?'':r;return ok};
 Object.keys(R).forEach(id=>$('#'+id).addEventListener('blur',()=>chk(id)));
 $('#cf').addEventListener('submit',e=>{e.preventDefault();const bad=Object.keys(R).filter(id=>!chk(id)),m=$('#cm');
  if(bad.length){m.className='cm';m.textContent='';$('#'+bad[0]).focus();return}
  m.className='cm ok';m.textContent='Thanks, '+$('#c-name').value.trim()+'. This is a demonstration form, so your message was not sent or stored.';
  e.target.reset();if(!rm)gsap.from(m,{y:10,opacity:0,duration:.4})})}
});
