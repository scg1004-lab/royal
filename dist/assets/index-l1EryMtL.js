(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const l=[{nombre:"BRISA",color:"#C9A84C",desc:"Ala Norte",vista:"Vista Mar Lateral",total:46,cats:["Estandar","Superior","Junior Suite"]},{nombre:"MAR",color:"#1565C0",desc:"Ala Norte",vista:"Vista Mar Frontal",total:42,cats:["Junior Suite","Suite"]},{nombre:"ARENA",color:"#EF6C00",desc:"Ala Sur",vista:"Vista Mar Lateral",total:48,cats:["Estandar","Superior","Junior Suite"]},{nombre:"PALMA",color:"#2E7D32",desc:"Ala Sur",vista:"Vista Mar Frontal",total:48,cats:["Estandar","Superior","Junior Suite"]},{nombre:"LAGUNA",color:"#00838F",desc:"Ala Este",vista:"Vista Jardin",total:46,cats:["Estandar","Superior","Junior Suite"]},{nombre:"JARDIN",color:"#6A1B9A",desc:"Ala Norte / Central",vista:"Vista Jardin Central",total:45,cats:["Estandar","Superior","Junior Suite","Suite"]}],v={Estandar:{bg:"#F1F3F4",text:"#5F6368"},Superior:{bg:"#E8F0FE",text:"#1967D2"},"Junior Suite":{bg:"#FEF7E0",text:"#B06000"},Suite:{bg:"#FCE8E6",text:"#C5221F"}},A={Estandar:"Doble / Twin",Superior:"King / Doble","Junior Suite":"King",Suite:"King + Sofa"},b=["Planta Baja","Planta 1a","Planta 2a","Planta 3a"];function y(){const e=[],o={p1:{Estandar:8,Superior:4},p2:{Estandar:8,Superior:3,"Junior Suite":1},p3:{Estandar:7,Superior:3,"Junior Suite":1},p4:{Superior:6,"Junior Suite":3,Suite:2}},t={p1:{Estandar:8,Superior:4},p2:{Estandar:6,Superior:3,"Junior Suite":2},p3:{Estandar:5,Superior:3,"Junior Suite":2,Suite:1},p4:{"Junior Suite":5,Suite:6}};return l.forEach(a=>{const r=a.nombre==="JARDIN"?t:o;[1,2,3,4].forEach((i,n)=>{let m=1;r["p"+i]&&Object.entries(r["p"+i]).forEach(([p,S])=>{for(let f=0;f<S;f++)e.push({codigo:`${a.nombre}-${i}${String(m).padStart(2,"0")}`,ala:a.nombre,color:a.color,planta:b[n],cat:p,camas:A[p]}),m++})})}),e}const E=y();let s="TODAS",c="TODAS";document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",()=>{const o=e.dataset.view;document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".nav-item").forEach(t=>t.classList.remove("active")),document.getElementById(`view-${o}`).classList.add("active"),e.classList.add("active"),window.scrollTo({top:0,behavior:"smooth"})})});function g(){const e=document.getElementById("alas-container");e.innerHTML=l.map(o=>`
    <div class="ala-card" style="--ala-color: ${o.color}" onclick="window.filterByAla('${o.nombre}')">
      <div>
        <h3 style="color: ${o.color}">${o.nombre}</h3>
        <p class="meta">${o.desc} • ${o.vista}</p>
      </div>
      <div class="ala-count">
        <div class="num">${o.total}</div>
        <div class="label">HAB.</div>
      </div>
    </div>
  `).join("")}function d(){const e=["TODAS",...l.map(t=>t.nombre)],o=["TODAS","Estandar","Superior","Junior Suite","Suite"];document.getElementById("filter-alas").innerHTML=e.map(t=>`
    <button class="btn-filter ${t===s?"active":""}" onclick="window.setAlaFilter('${t}')">${t}</button>
  `).join(""),document.getElementById("filter-cats").innerHTML=o.map(t=>`
    <button class="btn-filter ${t===c?"active":""}" onclick="window.setCatFilter('${t}')">${t}</button>
  `).join("")}function u(){let e=E;s!=="TODAS"&&(e=e.filter(t=>t.ala===s)),c!=="TODAS"&&(e=e.filter(t=>t.cat===c)),document.getElementById("rooms-count").textContent=`${e.length} habitaciones encontradas`;const o=document.getElementById("rooms-grid");o.innerHTML=e.map(t=>{const a=v[t.cat]||{bg:"rgba(255,255,255,0.05)",text:"#9A9080"};return`
      <div class="room-card" style="--ala-color: ${t.color}">
        <div class="room-code" style="color: ${t.color}">${t.codigo}</div>
        <div class="room-floor">${t.planta}</div>
        <div class="room-cat" style="background: ${a.bg}; color: ${a.text}">${t.cat}</div>
        <div class="room-beds" style="font-size: 8px; color: var(--text-dim); margin-top: 5px;">${t.camas}</div>
      </div>
    `}).join("")}function $(){const e=document.getElementById("summary-alas");e.innerHTML=l.map(o=>`
    <div class="card" style="border-left: 4px solid ${o.color}; margin-bottom: 12px; padding: 15px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-family: var(--font-serif); font-size: 20px; color: ${o.color}">${o.nombre}</h4>
        <span style="font-weight: 600; color: var(--gold)">${o.total} HAB</span>
      </div>
      <p style="font-size: 10px; color: var(--text-dim); text-transform: uppercase;">${o.desc} • ${o.vista}</p>
    </div>
  `).join("")}window.setAlaFilter=e=>{s=e,d(),u()};window.setCatFilter=e=>{c=e,d(),u()};window.filterByAla=e=>{s=e,c="TODAS",document.querySelector('[data-view="habitaciones"]').click(),d(),u()};g();d();u();$();
