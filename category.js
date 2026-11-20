/* Category + deals pages. Set <body data-cat="phones|computers|tvs|audio|accessories|deals"> */
document.addEventListener('DOMContentLoaded',()=>{
const CFG={
phones:{t:'Smartphones',h:'Phones for every pace.',p:'From dependable everyday phones to flagship cameras. Filter by brand, then compare before you buy.',cats:['phones'],img:'cat-smartphones',tips:[['Camera','More megapixels help less than a good sensor. Look at low-light photos.'],['Battery','5,000mAh or more usually lasts a full day of heavy use.'],['Storage','128GB suits most people. Choose 256GB if you shoot a lot of video.']]},
computers:{t:'Computers',h:'Power for work and play.',p:'Laptops for study, business, creative work and gaming. Compare processors, memory and storage side by side.',cats:['laptops'],img:'cat-laptops',tips:[['Memory','16GB of RAM is a comfortable starting point for multitasking.'],['Storage','An SSD makes everything feel faster. 512GB is a good baseline.'],['Weight','Ultrabooks travel easily. Gaming laptops trade weight for power.']]},
tvs:{t:'Televisions',h:'Make the living room the main event.',p:'Smart TVs from compact Full HD to large OLED and Mini-LED screens.',cats:['tvs'],img:'cat-televisions',tips:[['Size','Sit about 1.5 to 2.5 times the screen height away for a comfortable view.'],['Panel','OLED gives deep blacks. QLED and Mini-LED get brighter in daylight.'],['Refresh rate','120Hz helps with fast sports and gaming.']]},
audio:{t:'Audio',h:'Hear every detail.',p:'Headphones, earbuds, speakers and soundbars for music, calls and movie nights.',cats:['audio'],img:'cat-audio',tips:[['Fit','Over-ear for long sessions, earbuds for travel and workouts.'],['Noise cancelling','Active cancelling blocks engine and crowd noise.'],['Battery','Check playback time with noise cancelling switched on.']]},
accessories:{t:'Accessories',h:'The small things that finish the setup.',p:'Chargers, power banks, mice, printers, cameras and smart home gear.',cats:['accessories'],img:'cat-accessories',tips:[['Chargers','Match the wattage to your device. USB-C works across most phones and laptops.'],['Power banks','20,000mAh recharges most phones about four times.'],['Compatibility','Check the connection type before you order.']]},
deals:{t:'Deals',h:'Upgrade your tech. Not your budget.',p:'Devices with a reduced price right now, sorted by the biggest saving.',cats:null,img:'offer',tips:[['Check the specs','A bigger discount is only a good deal if the device fits your needs.'],['Compare','Use the compare tool to see how discounted devices stack up.'],['Ask us','Not sure which offer suits you? Message the store.']]}};
const key=document.body.dataset.cat,C=CFG[key],deals=key==='deals';
document.title=C.t+' – Vernyuy Tech';
$('#ch').textContent=C.h;$('#cp').textContent=C.p;$('#cimg').outerHTML=slot(C.img,C.t);
$('#gt').innerHTML=C.tips.map(t=>`<div><h3>${t[0]}</h3><p>${t[1]}</p></div>`).join('');
const base=P.filter(p=>deals?p.o:C.cats.includes(p.c)),disc=p=>p.o?(1-p.p/p.o):0;
const keys=deals?[...new Set(base.map(p=>p.c))]:[...new Set(base.map(p=>p.b))].sort();
let sel='All',sort=deals?'disc':'featured',stock=false;
$('#chips').innerHTML=['All',...keys].map(k=>`<button class="chip ${k==='All'?'on':''}" data-k="${k}" aria-pressed="${k==='All'}">${deals&&k!=='All'?CAT_LABELS[k]:k}</button>`).join('');
$('#sort').value=sort;
const S={featured:(a,b)=>(b.new-a.new)||(b.r*Math.log(b.rv)-a.r*Math.log(a.rv)),disc:(a,b)=>disc(b)-disc(a),lo:(a,b)=>a.p-b.p,hi:(a,b)=>b.p-a.p,pop:(a,b)=>b.rv-a.rv,rate:(a,b)=>b.r-a.r};
function draw(anim){
 const l=base.filter(p=>(sel==='All'||(deals?p.c:p.b)===sel)&&(!stock||p.stock)).sort(S[sort]);
 $('#grid').innerHTML=l.length?l.map(card).join(''):'<div class="nores"><h3>No products match</h3><p>Try another filter.</p></div>';
 $('#count').textContent=l.length+(l.length===1?' product':' products');
 if(anim&&window.gsap&&!calm&&l.length)gsap.from('#grid .card',{opacity:0,y:24,duration:.5,stagger:{each:.04,amount:.4},clearProps:'all'});
}
$('#chips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;sel=b.dataset.k;$$('#chips .chip').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});draw(true)});
$('#sort').onchange=e=>{sort=e.target.value;draw(true)};$('#stk').onchange=e=>{stock=e.target.checked;draw(true)};
$('#more').href=deals?'shop.html?s=new':'shop.html?c='+C.cats[0];
$('#wa').href=WA;
if(deals){const b=$$('#tm b');setInterval(()=>{const n=Date.now(),t=6*36e5-(n%(6*36e5)),f=x=>String(Math.floor(x)).padStart(2,'0');b[0].textContent=f(t/36e5);b[1].textContent=f(t%36e5/6e4);b[2].textContent=f(t%6e4/1e3)},1000)}
draw(true);
if(window.gsap&&!calm)gsap.from('.cat-hero .wrap>*',{opacity:0,y:30,duration:.8,stagger:.12,ease:'power3.out'});
});
