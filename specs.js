/* Demonstration specs, derived from category + price tier. Replace with real data per product if needed. */
const SPEC={
phones:[['Display','6.5" LCD, 90Hz','6.6" AMOLED, 120Hz','6.8" OLED, 120Hz'],['Processor','Octa-core, entry class','Octa-core, mid-range','Flagship octa-core'],['RAM','4GB','8GB','12GB'],['Storage','64GB','128GB','256GB'],['Battery','5,000mAh','5,000mAh','5,200mAh'],['Camera','50MP + depth','50MP triple','200MP + ultrawide + tele'],['Operating system','OS','OS','OS']],
laptops:[['Display','15.6" FHD','14" 2.8K','14" OLED, 120Hz'],['Processor','Entry-level quad-core','Mid-range 8-core','High-performance 12-core'],['RAM','8GB','16GB','32GB'],['Storage','256GB SSD','512GB SSD','1TB SSD'],['Battery','Up to 8 hours','Up to 12 hours','Up to 18 hours'],['Operating system','OS','OS','OS']],
tablets:[['Display','10.1" LCD','11" 120Hz LCD','12.9" mini-LED'],['Processor','Octa-core, entry class','Octa-core, mid-range','Desktop-class chip'],['RAM','4GB','8GB','16GB'],['Storage','64GB','128GB','256GB'],['Battery','Up to 10 hours','Up to 12 hours','Up to 10 hours'],['Operating system','OS','OS','OS']],
audio:[['Type','Compact','Wireless','Premium wireless'],['Battery','Up to 8 hours','Up to 20 hours','Up to 30 hours'],['Connectivity','Bluetooth 5.0','Bluetooth 5.3','Bluetooth 5.3 + wired'],['Water resistance','Splash resistant','IPX5','IP67'],['Noise cancelling','No','Passive','Active']],
watches:[['Display','1.4" LCD','1.4" AMOLED','1.5" AMOLED, always-on'],['Battery','Up to 7 days','Up to 10 days','Up to 14 days'],['Water resistance','5ATM','5ATM','10ATM'],['Sensors','Heart rate','Heart rate, SpO2','Heart rate, SpO2, GPS'],['Compatibility','Android and iOS','Android and iOS','Android and iOS']],
gaming:[['Platform','Console','Console','Console'],['Connectivity','Wireless','Wireless','Wireless + wired'],['Battery','Up to 10 hours','Up to 12 hours','Up to 15 hours'],['Included','1 item','Controller','2 controllers']],
accessories:[['Type','Everyday','Everyday','Premium'],['Connectivity','USB / wireless','USB-C / wireless','USB-C / Wi-Fi'],['Warranty','6 months','12 months','12 months']],
tvs:[['Panel','LED','QLED','OLED / Mini-LED'],['Resolution','4K UHD','4K UHD','4K UHD'],['Refresh rate','60Hz','60Hz','120Hz'],['HDR','HDR10','HDR10+','Dolby Vision'],['Smart platform','Smart TV OS','Smart TV OS','Smart TV OS']]};
function tierOf(p){const l=P.filter(x=>x.c===p.c).map(x=>x.p).sort((a,b)=>a-b);return Math.min(2,Math.floor(l.indexOf(p.p)*3/l.length))}
function specsFor(p){const t=tierOf(p),os=p.b==='Apple'?(p.c==='laptops'?'macOS':p.c==='tablets'?'iPadOS':'iOS'):(p.c==='laptops'?'Windows 11':'Android 14');
 let rows=SPEC[p.c].map(r=>[r[0],r[1+t]==='OS'?os:r[1+t]]);
 if(p.c==='tvs'){const s=(p.n.match(/(\d+)"/)||[])[1];rows=[['Screen size',s?s+'"':'—'],...rows];
  rows=rows.map(r=>r[0]==='Panel'?['Panel',/Mini-LED/.test(p.n)?'Mini-LED':/QLED/.test(p.n)?'QLED':/OLED/.test(p.n)?'OLED':'LED']:r[0]==='Resolution'&&/Full HD/.test(p.n)?['Resolution','Full HD']:r)}
 return rows}
