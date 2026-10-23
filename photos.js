// Draws the mockups' status bars, tab bar and placeholder photos (concerts, festivals, games). No real photos are used.
/* Status bars, home indicators and the app's floating oval tab bar */
const SB=t=>`<div class="sbar"><span>${t}</span><span class="isl"></span><span><svg viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#fff"/><rect x="5" y="5" width="3" height="6" rx="1" fill="#fff"/><rect x="10" y="2.5" width="3" height="8.5" rx="1" fill="#fff"/><rect x="15" y="0" width="3" height="11" rx="1" fill="#fff"/></svg><svg viewBox="0 0 16 11"><path d="M8 10.5 5.6 8a3.4 3.4 0 0 1 4.8 0zM3.4 5.8a6.5 6.5 0 0 1 9.2 0l-1.4 1.4a4.5 4.5 0 0 0-6.4 0zM1 3.4a9.9 9.9 0 0 1 14 0l-1.4 1.4a7.9 7.9 0 0 0-11.2 0z" fill="#fff"/></svg><svg viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3.2" fill="none" stroke="rgba(255,255,255,.5)"/><rect x="2.2" y="2.2" width="16" height="7.6" rx="1.8" fill="#fff"/><rect x="23.8" y="4" width="1.6" height="4" rx=".8" fill="rgba(255,255,255,.5)"/></svg></span></div>`;
document.querySelectorAll('.sc').forEach(sc=>{
  sc.insertAdjacentHTML('afterbegin',SB(sc.dataset.t||''));
  sc.insertAdjacentHTML('beforeend','<span class="home-ind"></span>');
});
document.querySelectorAll('nav.oval').forEach(n=>{
  const on=n.dataset.on, item=(k,inner,extra='')=>`<span class="${k===on?'on':''}">${inner}${extra}</span>`;
  n.innerHTML=item('nights','<svg class="ic"><use href="#i-ticket"/></svg>')+
    item('friends','<svg class="ic"><use href="#i-friends"/></svg>')+
        item('you','<span class="av sm a1" style="width:20px;height:20px">JD</span>');
  n.setAttribute('aria-hidden','true');
});

/* Drawn placeholder photos: concerts, festivals, games */
function rng(s){return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function crowd(x,W,H,r,top,rows,light){
  for(let i=0;i<rows;i++){
    const y=top+(H-top)*(i/rows)+r()*6, sz=6+i*4.2;
    for(let px=-10;px<W+10;px+=sz*1.5+r()*sz){
      const hx=px+r()*sz*.6, hy=y+r()*5;
      if(r()<.18){
        x.strokeStyle='#040406';x.lineWidth=sz*.28;x.beginPath();x.moveTo(hx+sz*.4,hy+sz*.8);
        const ax=hx+sz*(r()-.3),ay=hy-sz*(1.6+r());x.lineTo(ax,ay);x.stroke();
        if(r()<.5){x.save();x.shadowColor=light;x.shadowBlur=10;x.fillStyle='rgba(235,240,255,.95)';x.fillRect(ax-sz*.22,ay-sz*.55,sz*.44,sz*.7);x.restore()}
        else{x.fillStyle='#040406';x.beginPath();x.arc(ax,ay,sz*.22,0,7);x.fill()}
      }
      x.fillStyle='#040406';x.beginPath();x.ellipse(hx,hy,sz*.42,sz*.5,0,0,7);x.fill();
      x.beginPath();x.ellipse(hx,hy+sz*1.2,sz*.95,sz*.8,0,0,7);x.fill();
    }
  }
  x.fillStyle='#040406';x.fillRect(0,H*.96,W,H*.04);
}
function concert(seed,hue){
  const c=document.createElement('canvas'),W=c.width=420,H=c.height=520,x=c.getContext('2d'),r=rng(seed);
  let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,`hsl(${hue},55%,9%)`);g.addColorStop(1,'#050507');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.save();x.filter='blur(8px)';g=x.createLinearGradient(0,H*.18,W,H*.45);g.addColorStop(0,`hsla(${hue+30},95%,55%,.55)`);g.addColorStop(1,`hsla(${hue-30},95%,50%,.35)`);
  x.fillStyle=g;x.fillRect(W*.12,H*.16,W*.76,H*.32);x.restore();
  x.globalCompositeOperation='lighter';
  const n=5+Math.floor(r()*4);
  for(let i=0;i<n;i++){
    const ox=W*(.08+r()*.84),oy=H*(.02+r()*.06),tx=W*(r()*1.4-.2),spread=30+r()*70,h=hue+(r()-.5)*70;
    g=x.createLinearGradient(ox,oy,tx,H*.85);g.addColorStop(0,`hsla(${h},100%,72%,.75)`);g.addColorStop(1,`hsla(${h},100%,60%,0)`);
    x.fillStyle=g;x.beginPath();x.moveTo(ox,oy);x.lineTo(tx-spread,H*.9);x.lineTo(tx+spread,H*.9);x.closePath();x.fill();
  }
  g=x.createRadialGradient(W/2,H*.5,10,W/2,H*.5,W*.6);g.addColorStop(0,`hsla(${hue},100%,65%,.55)`);g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(0,0,W,H);
  for(let i=0;i<9;i++){const lx=W*(.06+i*.11);g=x.createRadialGradient(lx,H*.05,0,lx,H*.05,16);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(lx-16,H*.05-16,32,32)}
  x.globalCompositeOperation='source-over';
  x.fillStyle='rgba(5,5,8,.92)';x.fillRect(0,H*.56,W,H*.06);
  const px=W*(.35+r()*.3);x.beginPath();x.ellipse(px,H*.44,9,11,0,0,7);x.fill();x.fillRect(px-11,H*.46,22,H*.1);
  crowd(x,W,H,r,H*.6,6,`hsl(${hue},100%,70%)`);
  return c.toDataURL('image/jpeg',.82);
}
function fest(seed,hue){
  const c=document.createElement('canvas'),W=c.width=420,H=c.height=520,x=c.getContext('2d'),r=rng(seed);
  let g=x.createLinearGradient(0,0,0,H*.7);g.addColorStop(0,`hsl(${hue+200},45%,22%)`);g.addColorStop(.55,`hsl(${hue+330},70%,55%)`);g.addColorStop(1,`hsl(${hue+30},95%,62%)`);
  x.fillStyle=g;x.fillRect(0,0,W,H);
  g=x.createRadialGradient(W*.7,H*.5,0,W*.7,H*.5,70);g.addColorStop(0,'rgba(255,236,190,1)');g.addColorStop(.4,'rgba(255,200,120,.6)');g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle='#0a0709';x.fillRect(W*.18,H*.28,W*.06,H*.34);x.fillRect(W*.76,H*.28,W*.06,H*.34);x.fillRect(W*.18,H*.26,W*.64,H*.05);
  x.fillStyle=`hsla(${hue},90%,55%,.85)`;x.fillRect(W*.27,H*.33,W*.46,H*.2);
  for(let i=0;i<5;i++){const fx=W*(.05+r()*.9),fy=H*(.3+r()*.15);x.strokeStyle='#0a0709';x.lineWidth=2;x.beginPath();x.moveTo(fx,fy);x.lineTo(fx,H*.62);x.stroke();x.fillStyle=`hsl(${r()*360},70%,50%)`;x.fillRect(fx,fy,18,12)}
  crowd(x,W,H,r,H*.58,6,'#ffd38a');
  return c.toDataURL('image/jpeg',.82);
}
function game(seed){
  const c=document.createElement('canvas'),W=c.width=420,H=c.height=520,x=c.getContext('2d'),r=rng(seed);
  x.fillStyle='#08142c';x.fillRect(0,0,W,H);
  for(let y=H*.08;y<H*.5;y+=7)for(let px=0;px<W;px+=6){x.fillStyle=`hsla(${r()<.5?220:45},${30+r()*50}%,${20+r()*45}%,${.5+r()*.5})`;x.fillRect(px+r()*2,y+r()*2,3.5,3.5)}
  let g=x.createRadialGradient(W/2,0,0,W/2,0,W*.7);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle='#0d0d10';x.fillRect(W*.36,H*.04,W*.28,H*.1);x.fillStyle='rgba(120,180,255,.85)';x.fillRect(W*.38,H*.055,W*.24,H*.07);
  x.beginPath();x.moveTo(-W*.3,H);x.lineTo(W*.12,H*.5);x.lineTo(W*.88,H*.5);x.lineTo(W*1.3,H);x.closePath();
  g=x.createLinearGradient(0,H*.5,0,H);g.addColorStop(0,'#b88a4d');g.addColorStop(1,'#e2b878');x.fillStyle=g;x.fill();
  x.fillStyle='rgba(0,45,98,.85)';x.beginPath();x.moveTo(W*.36,H);x.lineTo(W*.43,H*.62);x.lineTo(W*.57,H*.62);x.lineTo(W*.64,H);x.fill();
  x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=2;x.beginPath();x.ellipse(W/2,H*.7,W*.13,H*.035,0,0,7);x.stroke();
  for(let i=0;i<6;i++){const px=W*(.25+r()*.5),py=H*(.58+r()*.18),s=.8+(py/H-.58)*3;x.fillStyle=i%2?'#FDBB30':'#f2f2f2';x.fillRect(px-4*s,py-14*s,8*s,14*s);x.fillStyle='#2a1a10';x.beginPath();x.arc(px,py-16*s,3.2*s,0,7);x.fill()}
  return c.toDataURL('image/jpeg',.82);
}
const P={c1:()=>concert(3,355),c2:()=>concert(7,222),c3:()=>concert(11,285),c4:()=>concert(21,28),c5:()=>concert(33,165),c6:()=>concert(44,320),c7:()=>concert(52,200),c8:()=>concert(61,5),
  f1:()=>fest(5,10),f2:()=>fest(9,40),s1:()=>game(3),s2:()=>game(8)};
const cache={};
document.querySelectorAll('[data-s]').forEach(el=>{
  const k=el.dataset.s; if(!P[k]) return;
  try{ cache[k]=cache[k]||P[k](); el.style.backgroundImage=`url(${cache[k]})`; el.style.backgroundSize='cover'; el.style.backgroundPosition='center'; }catch(e){}
});

