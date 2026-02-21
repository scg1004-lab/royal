import './style.css'

const ALAS = [
  { nombre: 'BRISA', color: '#C9A84C', desc: 'Ala Norte', vista: 'Vista Mar Lateral', total: 46, cats: ['Estandar', 'Superior', 'Junior Suite'] },
  { nombre: 'MAR', color: '#1565C0', desc: 'Ala Norte', vista: 'Vista Mar Frontal', total: 42, cats: ['Junior Suite', 'Suite'] },
  { nombre: 'ARENA', color: '#EF6C00', desc: 'Ala Sur', vista: 'Vista Mar Lateral', total: 48, cats: ['Estandar', 'Superior', 'Junior Suite'] },
  { nombre: 'PALMA', color: '#2E7D32', desc: 'Ala Sur', vista: 'Vista Mar Frontal', total: 48, cats: ['Estandar', 'Superior', 'Junior Suite'] },
  { nombre: 'LAGUNA', color: '#00838F', desc: 'Ala Este', vista: 'Vista Jardin', total: 46, cats: ['Estandar', 'Superior', 'Junior Suite'] },
  { nombre: 'JARDIN', color: '#6A1B9A', desc: 'Ala Norte / Central', vista: 'Vista Jardin Central', total: 45, cats: ['Estandar', 'Superior', 'Junior Suite', 'Suite'] },
];

const CAT_COLORS = {
  'Estandar': { bg: 'rgba(255,255,255,0.05)', text: '#9A9080' },
  'Superior': { bg: 'rgba(21,101,192,0.2)', text: '#64B5F6' },
  'Junior Suite': { bg: 'rgba(230,120,0,0.2)', text: '#FFB74D' },
  'Suite': { bg: 'rgba(198,40,40,0.2)', text: '#EF9A9A' },
};

const CAMAS = { 'Estandar': 'Doble / Twin', 'Superior': 'King / Doble', 'Junior Suite': 'King', 'Suite': 'King + Sofa' };
const PL = ['Planta Baja', 'Planta 1a', 'Planta 2a', 'Planta 3a'];

function generateRooms() {
  const rooms = [];
  const d = { p1: { 'Estandar': 8, 'Superior': 4 }, p2: { 'Estandar': 8, 'Superior': 3, 'Junior Suite': 1 }, p3: { 'Estandar': 7, 'Superior': 3, 'Junior Suite': 1 }, p4: { 'Superior': 6, 'Junior Suite': 3, 'Suite': 2 } };
  const dJ = { p1: { 'Estandar': 8, 'Superior': 4 }, p2: { 'Estandar': 6, 'Superior': 3, 'Junior Suite': 2 }, p3: { 'Estandar': 5, 'Superior': 3, 'Junior Suite': 2, 'Suite': 1 }, p4: { 'Junior Suite': 5, 'Suite': 6 } };
  
  ALAS.forEach(a => {
    const dist = a.nombre === 'JARDIN' ? dJ : d;
    [1, 2, 3, 4].forEach((p, pi) => {
      let n = 1;
      if (!dist['p' + p]) return;
      Object.entries(dist['p' + p]).forEach(([cat, qty]) => {
        for (let i = 0; i < qty; i++) {
          rooms.push({
            codigo: `${a.nombre}-${p}${String(n).padStart(2, '0')}`,
            ala: a.nombre,
            color: a.color,
            planta: PL[pi],
            cat,
            camas: CAMAS[cat]
          });
          n++;
        }
      });
    });
  });
  return rooms;
}

const ALL_ROOMS = generateRooms();
let activeAla = 'TODAS';
let activeCat = 'TODAS';

// Navigation
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`view-${view}`).classList.add('active');
    btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

function renderAlas() {
  const container = document.getElementById('alas-container');
  container.innerHTML = ALAS.map(a => `
    <div class="ala-card" style="--ala-color: ${a.color}" onclick="window.filterByAla('${a.nombre}')">
      <div>
        <h3 style="color: ${a.color}">${a.nombre}</h3>
        <p class="meta">${a.desc} • ${a.vista}</p>
      </div>
      <div class="ala-count">
        <div class="num">${a.total}</div>
        <div class="label">HAB.</div>
      </div>
    </div>
  `).join('');
}

function renderFilters() {
  const alas = ['TODAS', ...ALAS.map(a => a.nombre)];
  const cats = ['TODAS', 'Estandar', 'Superior', 'Junior Suite', 'Suite'];
  
  document.getElementById('filter-alas').innerHTML = alas.map(a => `
    <button class="btn-filter ${a === activeAla ? 'active' : ''}" onclick="window.setAlaFilter('${a}')">${a}</button>
  `).join('');
  
  document.getElementById('filter-cats').innerHTML = cats.map(c => `
    <button class="btn-filter ${c === activeCat ? 'active' : ''}" onclick="window.setCatFilter('${c}')">${c}</button>
  `).join('');
}

function renderRooms() {
  let filtered = ALL_ROOMS;
  if (activeAla !== 'TODAS') filtered = filtered.filter(r => r.ala === activeAla);
  if (activeCat !== 'TODAS') filtered = filtered.filter(r => r.cat === activeCat);
  
  document.getElementById('rooms-count').textContent = `${filtered.length} habitaciones encontradas`;
  
  const container = document.getElementById('rooms-grid');
  container.innerHTML = filtered.map(r => {
    const cc = CAT_COLORS[r.cat] || { bg: 'rgba(255,255,255,0.05)', text: '#9A9080' };
    return `
      <div class="room-card" style="--ala-color: ${r.color}">
        <div class="room-code" style="color: ${r.color}">${r.codigo}</div>
        <div class="room-floor">${r.planta}</div>
        <div class="room-cat" style="background: ${cc.bg}; color: ${cc.text}">${r.cat}</div>
        <div class="room-beds" style="font-size: 8px; color: var(--text-dim); margin-top: 5px;">${r.camas}</div>
      </div>
    `;
  }).join('');
}

function renderSummary() {
  const container = document.getElementById('summary-alas');
  container.innerHTML = ALAS.map(a => `
    <div class="card" style="border-left: 4px solid ${a.color}; margin-bottom: 12px; padding: 15px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-family: var(--font-serif); font-size: 20px; color: ${a.color}">${a.nombre}</h4>
        <span style="font-weight: 600; color: var(--gold)">${a.total} HAB</span>
      </div>
      <p style="font-size: 10px; color: var(--text-dim); text-transform: uppercase;">${a.desc} • ${a.vista}</p>
    </div>
  `).join('');
}

// Global exposure for onclick handlers (Vite modules scope them)
window.setAlaFilter = (a) => {
  activeAla = a;
  renderFilters();
  renderRooms();
};

window.setCatFilter = (c) => {
  activeCat = c;
  renderFilters();
  renderRooms();
};

window.filterByAla = (a) => {
  activeAla = a;
  activeCat = 'TODAS';
  document.querySelector('[data-view="habitaciones"]').click();
  renderFilters();
  renderRooms();
};

// Initial Render
renderAlas();
renderFilters();
renderRooms();
renderSummary();
