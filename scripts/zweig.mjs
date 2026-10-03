// Berechnet das Zweig-Motiv (Stiel mit drei Blättern) als SVG-Pfad.
// Aufruf: node scripts/zweig.mjs  > schreibt src/components/zweig-pfad.json
import { writeFileSync } from 'node:fs';
const P0=[40,158],P1=[37,112],P2=[44,64],P3=[58,14];
const bez=(t)=>[0,1].map(i=>(1-t)**3*P0[i]+3*(1-t)**2*t*P1[i]+3*(1-t)*t**2*P2[i]+t**3*P3[i]);
const r=(n)=>Math.round(n*10)/10;
function blatt(t, winkel, laenge, bauch){
  const [bx,by]=bez(t);
  const a=winkel*Math.PI/180;
  const tx=bx+Math.cos(a)*laenge, ty=by-Math.sin(a)*laenge;
  const mx=(bx+tx)/2,my=(by+ty)/2, nx=-(ty-by)/laenge, ny=(tx-bx)/laenge;
  const c1=[mx+nx*bauch,my+ny*bauch], c2=[mx-nx*bauch*0.85,my-ny*bauch*0.85];
  return {aussen:`M${r(bx)} ${r(by)}Q${r(c1[0])} ${r(c1[1])} ${r(tx)} ${r(ty)}Q${r(c2[0])} ${r(c2[1])} ${r(bx)} ${r(by)}Z`,
          ader:`M${r(bx)} ${r(by)}L${r(bx+(tx-bx)*0.7)} ${r(by+(ty-by)*0.7)}`};
}
const blaetter=[blatt(0.36,152,40,13),blatt(0.6,32,38,12),blatt(0.86,128,30,10)];
const stiel=`M${P0}C${P1} ${P2} ${P3}`.replace(/,/g,' ');
const pfad={viewBox:'0 0 100 165',stiel,blaetter:blaetter.map(b=>b.aussen),adern:blaetter.map(b=>b.ader)};
writeFileSync('src/components/zweig-pfad.json',JSON.stringify(pfad,null,1));
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${pfad.viewBox}" width="300" height="495"><rect width="100" height="165" fill="#FAF7F0"/><g fill="none" stroke="#55705A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${stiel}"/>${pfad.blaetter.map(d=>`<path d="${d}"/>`).join('')}${pfad.adern.map(d=>`<path d="${d}" stroke-width="1"/>`).join('')}</g></svg>`;
writeFileSync(process.env.TEMP+'/zweig.svg',svg);
