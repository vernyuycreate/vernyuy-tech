/* Shop page logic. URL params: c (category), brand, q, s=new, life, focus */
(function(){
const SIZE=12,LIFE={professionals:['laptops','tablets'],creators:['tablets','accessories','phones'],gamers:['gaming','laptops'],students:['laptops','tablets','phones'],entertainment:['tvs','audio'],everyday:['phones','accessories','watches']};
const brands=[...new Set(P.map(p=>p.b))].sort();
const st={cats:new Set(),brands:new Set(),q:'',min:'',max:'',rate:0,stock:false,disc:false,sort:'featured',view:'grid',shown:SIZE,life:''};

/* read URL */
const u=new URLSearchParams(location.search);
if(CAT_LABELS[u.get('c')])st.cats.add(u.get('c'));
const bp=u.get('brand');if(bp){const b=brands.find(x=>x.toLowerCase()===bp.toLowerCase());if(b)st.brands.add(b)}
if(u.get('q'))st.q=u.get('q');
if(u.get('s')==='new')st.sort='new';
if(LIFE[u.get('life')]){st.life=u.get('life');LIFE[st.life].forEach(c=>st.cats.add(c))}

/* build filter UI */
const box=(grp,v,l,on)=>`<label><input type="checkbox" data-g="${grp}" value="${v}" ${on?'checked':''}> ${l}</label>`;
function drawFilters(){
 $('#fcat').innerHTML=Object.entries(CAT_LABELS).map(([k,v])=>box('c',k,v,st.cats.has(k))).join('');
 $('#fbrand').innerHTML=brands.map(b=>box('b',b,b,st.brands.has(b))).join('');
 $('#q').value=st.q;$('#sort').value=st.sort;$('#frate').value=st.rate;
 $('#pmin').value=st.min;$('#pmax').value=st.max;$('#fstock').checked=st.stock;$('#fdisc').checked=st.disc;
}

/* filter + sort */
function list(){
 const q=st.q.trim().toLowerCase();
 let l=P.filter(p=>
  (!q||(p.n+' '+p.b+' '+CAT_LABELS[p.c]).toLowerCase().includes(q))&&
  (!st.cats.size||st.cats.has(p.c))&&(!st.brands.size||st.brands.has(p.b))&&
  (st.min===''||p.p>=+st.min)&&(st.max===''||p.p<=+st.max)&&
  p.r>=st.rate&&(!st.stock||p.stock)&&(!st.disc||p.o));
 const s={featured:(a,b)=>(b.new-a.new)||(b.r*Math.log(b.rv)-a.r*Math.log(a.rv)),new:(a,b)=>b.id-a.id,lo:(a,b)=>a.p-b.p,hi:(a,b)=>b.p-a.p,pop:(a,b)=>b.rv-a.rv,rate:(a,b)=>b.r-a.r||b.rv-a.rv}[st.sort];
 return l.sort(s);
}

/* render */
function render(anim){
 const l=list(),vis=l.slice(0,st.shown),g=$('#grid');
 g.className='pgrid'+(st.view==='list'?' list':'');
 g.innerHTML=vis.length?vis.map(card).join(''):`<div class="nores"><h3>No products match</h3><p>Try a different search, or remove some filters.</p><button class="btn" id="clear2">Clear filters</button></div>`;
 $('#count').textContent=`${l.length} ${l.length===1?'product':'products'}`+(vis.length<l.length?` · showing ${vis.length}`:'');
 $('#more').hidden=vis.length>=l.length;
 $('#ttl').textContent=st.life?'For the '+st.life:st.cats.size===1?CAT_LABELS[[...st.cats][0]]:'All products';
 if(anim&&window.gsap&&!calm&&vis.length)gsap.from('#grid .card',{opacity:0,y:24,duration:.5,stagger:{each:.03,amount:.4},clearProps:'all'});
}
const reset=()=>{st.cats.clear();st.brands.clear();st.q='';st.min=st.max='';st.rate=0;st.stock=st.disc=false;st.sort='featured';st.life='';st.shown=SIZE;history.replaceState(null,'',location.pathname);drawFilters();render(true)};
const upd=()=>{st.shown=SIZE;render(true)};

/* events */
$('#filters').addEventListener('change',e=>{const t=e.target;
 if(t.dataset.g){const s=t.dataset.g==='c'?st.cats:st.brands;t.checked?s.add(t.value):s.delete(t.value);st.life=''}
 else if(t.id==='frate')st.rate=+t.value;else if(t.id==='fstock')st.stock=t.checked;else if(t.id==='fdisc')st.disc=t.checked;
 upd()});
['pmin','pmax'].forEach(id=>$('#'+id).addEventListener('input',e=>{st[id==='pmin'?'min':'max']=e.target.value;upd()}));
$('#q').addEventListener('input',e=>{st.q=e.target.value;upd()});
$('#sort').addEventListener('change',e=>{st.sort=e.target.value;upd()});
$('#clear').onclick=reset;
document.addEventListener('click',e=>{if(e.target.id==='clear2')reset()});
$$('.view button').forEach(b=>b.onclick=()=>{st.view=b.dataset.v;$$('.view button').forEach(x=>x.classList.toggle('on',x===b));render(false)});
$('#more').onclick=()=>{const n=st.shown;st.shown+=SIZE;render(false);if(window.gsap&&!calm)gsap.from($$('#grid .card').slice(n),{opacity:0,y:24,duration:.5,stagger:.04,clearProps:'all'})};
$('#ftoggle').onclick=()=>$('#filters').classList.add('open');
$('#fclose').onclick=()=>$('#filters').classList.remove('open');

drawFilters();render(true);
if(u.get('focus'))$('#q').focus();
})();
