const ADMIN_PW = 'victory2026';
const TG_ADMIN = 'https://t.me/master_picks_odds';
const TG_CHANNEL = 'https://t.me/+11ot3EOvrYozNmI8';
const THREE_DAYS = 3*24*60*60*1000;
const API_URL = 'https://victory-edge-backend.vercel.app/api'; // You'll create this backend

const DEFAULT_TIPS=[
  {id:1, time:'23:00',country:'Spain 🇪🇸',   match:'Real Madrid vs Getafe',       tip:'Over 1.5',       odds:'1.30',result:'pending',plan:'free'},
  {id:2, time:'19:00',country:'Portugal 🇵🇹', match:'Gil Vicente vs Benfica',      tip:'FT 2 (Away Win)',odds:'1.55',result:'pending',plan:'free'},
  {id:3, time:'19:00',country:'Bulgaria 🇧🇬', match:'Ludogorets vs Lok. Plovdiv',  tip:'FT 1 (Home Win)',odds:'1.36',result:'pending',plan:'free'},
  {id:4, time:'14:00',country:'Kenya 🇰🇪',    match:'Bidco United vs Ulinzi Stars',tip:'BTTS Yes',       odds:'2.13',result:'pending',plan:'gold'},
  {id:5, time:'15:00',country:'Russia 🇷🇺',   match:'Sochi vs Spartak Moscow',     tip:'Over 1.5',       odds:'1.51',result:'pending',plan:'gold'},
  {id:6, time:'08:00',country:'South Korea 🇰🇷',match:'Daejeon Hana vs Anyang',   tip:'Over 2 Goals',   odds:'1.39',result:'pending',plan:'gold'},
  {id:7, time:'21:00',country:'Sweden 🇸🇪',   match:'Sandviken vs GAIS',           tip:'FT 2 (Away Win)',odds:'1.38',result:'pending',plan:'gold'},
  {id:8, time:'20:30',country:'Romania 🇷🇴',  match:'Unirea Slobozia vs FC Rapid', tip:'FT 2 (Away Win)',odds:'1.40',result:'pending',plan:'gold'},
  {id:9, time:'21:45',country:'Saudi Arabia 🇸🇦',match:'Al Draih vs Al-Batin',     tip:'FT 1 (Home Win)',odds:'1.27',result:'pending',plan:'silver'},
  {id:10,time:'21:45',country:'Saudi Arabia 🇸🇦',match:'Al Jabalain vs Al Zulfi',  tip:'FT 1 (Home Win)',odds:'1.74',result:'pending',plan:'silver'},
  {id:11,time:'20:00',country:'Turkey 🇹🇷',   match:'Manisa vs Arca Corum',        tip:'Over 2 Goals',   odds:'1.29',result:'pending',plan:'silver'},
  {id:12,time:'18:30',country:'Italy 🇮🇹',    match:'Udinese vs Fiorentina',       tip:'Over 1.5',       odds:'1.35',result:'pending',plan:'silver'},
  {id:13,time:'15:00',country:'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿',  match:'Birmingham vs Middlesbrough', tip:'DC X2',          odds:'1.45',result:'pending',plan:'silver'},
  {id:14,time:'16:00',country:'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿',  match:'Crewe Alexandra U21 vs Wigan U21',tip:'BTTS Each 2+',odds:'2.83',result:'pending',plan:'diamond'},
  {id:15,time:'10:15',country:'Australia 🇦🇺', match:'Bulleen Lions U23 vs Eltham U23',tip:'Over 2.5',   odds:'1.21',result:'pending',plan:'diamond'},
  {id:16,time:'13:00',country:'Turkey 🇹🇷',   match:'Kocaelispor U19 vs Besiktas U19',tip:'Over 1.5',   odds:'1.23',result:'pending',plan:'diamond'},
  {id:17,time:'19:30',country:'Russia 🇷🇺',   match:'Rodina Moskva vs Shinnik',    tip:'Over 1.5',       odds:'1.40',result:'pending',plan:'diamond'},
  {id:18,time:'ACCA', country:'🌍 Multi',     match:'7-Fold Mega Accumulator',     tip:'Total Odds 15.38',odds:'15.38',result:'pending',plan:'diamond'},
];

const DEFAULT_HISTORY=[
  {id:1, date:'01.03.2026',league:'National League 🇨🇿',   match:'Viktoria Zizkov vs MFK Chrudim',       tip:'FT 12',          odds:'1.25',score:'2-1'},
  {id:2, date:'01.03.2026',league:'National League 🇨🇿',   match:'FC Vlasim vs Taborsko',                tip:'FT 1 (Home Win)',odds:'2.70',score:'2-1'},
  {id:3, date:'01.03.2026',league:'National League 🇨🇿',   match:'Banik Ostrava B vs Dynamo C. Bud.',    tip:'DC 1X',          odds:'1.21',score:'2-0'},
  {id:4, date:'01.03.2026',league:'Superliga 🇩🇰',         match:'Sonderjyske vs Odense',                tip:'FT 12',          odds:'1.26',score:'1-0'},
  {id:5, date:'01.03.2026',league:'Superliga 🇩🇰',         match:'Vejle vs AGF Aarhus',                  tip:'FT 2 (Away Win)',odds:'1.54',score:'1-2'},
  {id:6, date:'01.03.2026',league:'Superliga 🇩🇰',         match:'Viborg vs FC Nordsjaelland',           tip:'FT 12',          odds:'1.26',score:'2-1'},
  {id:7, date:'01.03.2026',league:'Ligue 1 🇫🇷',           match:'Paris FC vs Nice',                     tip:'FT 12',          odds:'1.31',score:'1-0'},
  {id:8, date:'01.03.2026',league:'Ligue 1 🇫🇷',           match:'Lorient vs Auxerre',                   tip:'DC 1X',          odds:'1.24',score:'2-2'},
  {id:9, date:'01.03.2026',league:'Ligue 1 🇫🇷',           match:'Metz vs Brest',                        tip:'FT 2 (Away Win)',odds:'2.19',score:'0-1'},
  {id:10,date:'01.03.2026',league:'Ligue 1 🇫🇷',           match:'Lille vs Nantes',                      tip:'FT 1 (Home Win)',odds:'1.51',score:'1-0'},
];

let curTheme='dark', adminLoggedIn=false, activeVipTab='gold', timerInt=null;
curTheme = localStorage.getItem('theme') || 'dark';

/* ════════ DEVICE ID GENERATION ════════ */
function genDID(){
  const n = navigator, s = screen;
  const raw = [n.userAgent, n.language, s.width, s.height, s.colorDepth, new Date().getTimezoneOffset()].join('|');
  let h = 0;
  for(let i=0; i<raw.length; i++){
    h = ((h<<5)-h) + raw.charCodeAt(i);
    h |= 0;
  }
  const base = Math.abs(h).toString(16).toUpperCase().padStart(8,'0');
  let rand = localStorage.getItem('dRand');
  if(!rand){
    rand = Math.random().toString(36).substr(2,6).toUpperCase();
    localStorage.setItem('dRand', rand);
  }
  return `VE-${base}-${rand}`;
}
const DEVICE_ID = genDID();

/* ════════ LOCAL STORAGE MANAGEMENT ════════ */
function getReg(){
  return JSON.parse(localStorage.getItem('devReg') || '{}');
}

function saveReg(r){
  localStorage.setItem('devReg', JSON.stringify(r));
  syncToBackend(); // Sync with backend
}

function getMyDev(){
  const r = getReg();
  if(!r[DEVICE_ID]){
    r[DEVICE_ID] = {
      id: DEVICE_ID,
      plan: 'trial',
      trialStart: Date.now(),
      joined: new Date().toLocaleDateString()
    };
    saveReg(r);
  }
  return r[DEVICE_ID];
}

function getEffPlan(){
  const d = getMyDev();
  if(!['trial','free'].includes(d.plan)) return d.plan;
  if(d.plan === 'trial'){
    const e = Date.now() - d.trialStart;
    return e < THREE_DAYS ? 'vip' : 'expired';
  }
  return 'free';
}

/* ════════ BACKEND SYNC ════════ */
async function syncToBackend(){
  try {
    const data = {
      deviceId: DEVICE_ID,
      devices: getReg(),
      tips: getTips(),
      history: getHistory()
    };
    
    const response = await fetch(`${API_URL}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if(!response.ok) console.error('Sync failed');
  } catch(e) {
    console.log('Backend sync unavailable - using local storage');
  }
}

async function fetchFromBackend(){
  try {
    const response = await fetch(`${API_URL}/data?deviceId=${DEVICE_ID}`);
    if(response.ok){
      const data = await response.json();
      if(data.devices) localStorage.setItem('devReg', JSON.stringify(data.devices));
      if(data.tips) localStorage.setItem('tips', JSON.stringify(data.tips));
      if(data.history) localStorage.setItem('winHistory', JSON.stringify(data.history));
    }
  } catch(e) {
    console.log('Backend unavailable - using local storage');
  }
}

/* ════════ PLAN LEVEL CHECK ════════ */
const planLvl = {free:0, gold:1, silver:2, diamond:3, vip:10};
function canSee(tipPlan, userPlan){
  if(userPlan === 'vip') return true;
  if(userPlan === 'expired') return false;
  return (planLvl[userPlan]||0) >= (planLvl[tipPlan]||0);
}

/* ════════ TIMER MANAGEMENT ════════ */
function updateTimers(){
  const d = getMyDev();
  if(d.plan !== 'trial'){
    document.getElementById('trialStripActive').classList.add('hide');
    document.getElementById('trialStripExpired').classList.add('hide');
    ['heroTimer','sbTimer'].forEach(i=>{
      const e = document.getElementById(i);
      if(e) e.textContent = '--:--:--';
    });
    const l = document.getElementById('sbTimerLabel');
    if(l) l.textContent = 'No Active Trial';
    updateSBPlan();
    return;
  }
  
  const remaining = THREE_DAYS - (Date.now() - d.trialStart);
  if(remaining <= 0){
    document.getElementById('trialStripActive').classList.add('hide');
    document.getElementById('trialStripExpired').classList.remove('hide');
    ['heroTimer','sbTimer'].forEach(i=>{
      const e = document.getElementById(i);
      if(e) e.textContent = '00:00:00';
    });
    const l = document.getElementById('sbTimerLabel');
    if(l) l.textContent = 'Trial Expired';
    if(timerInt){clearInterval(timerInt);timerInt=null;}
    updateSBPlan();
    return;
  }
  
  const h = Math.floor(remaining/3600000);
  const m = Math.floor((remaining%3600000)/60000);
  const s = Math.floor((remaining%60000)/1000);
  const fmt = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  
  document.getElementById('trialStripActive').classList.remove('hide');
  document.getElementById('trialStripExpired').classList.add('hide');
  ['heroTimer','sbTimer'].forEach(i=>{
    const e = document.getElementById(i);
    if(e) e.textContent = fmt;
  });
  
  const l = document.getElementById('sbTimerLabel');
  if(l) l.textContent = 'FREE VIP Trial Remaining';
  
  if(remaining < 6*3600000 && remaining > 6*3600000-2000){
    showNotif('⚠️ Less than 6hrs left on VIP trial!', '⚠️');
    pushNotif('VIP Trial expires in 6 hours!');
  }
  updateSBPlan();
}

/* ════════ DATA MANAGEMENT ════════ */
function getTips(){
  const s = localStorage.getItem('tips');
  if(!s) return DEFAULT_TIPS;
  const p = JSON.parse(s);
  if(!p.some(t=>t.id>1000)) return DEFAULT_TIPS;
  return p;
}

function saveTips(t){
  localStorage.setItem('tips', JSON.stringify(t));
  syncToBackend();
}

function getHistory(){
  const s = localStorage.getItem('winHistory');
  if(!s) return DEFAULT_HISTORY;
  const p = JSON.parse(s);
  if(!p.some(h=>h.id>1000)) return DEFAULT_HISTORY;
  return p;
}

function saveHistory(h){
  localStorage.setItem('winHistory', JSON.stringify(h));
  syncToBackend();
}

/* ════════ RENDER FUNCTIONS ════════ */
function renderFreeTips(){
  const tips = getTips().filter(t=>t.plan==='free');
  document.getElementById('freeCnt').textContent = tips.length+' picks';
  document.getElementById('freeTipsList').innerHTML = tips.map(t=>buildCard(t,'free',true)).join('');
}

function switchVipTab(plan, btn){
  activeVipTab = plan;
  document.querySelectorAll('.ptab').forEach(t=>t.className='ptab');
  const cls = {gold:'ag', silver:'as', diamond:'ad'};
  if(btn) btn.className = 'ptab '+(cls[plan]||'');
  renderVipTips();
}

function renderVipTips(){
  const p = getEffPlan();
  const tips = getTips().filter(t=>t.plan===activeVipTab);
  const el = document.getElementById('vipTipsList');
  const ok = canSee(activeVipTab, p);
  const bt = document.getElementById('vipBannerT');
  const bs = document.getElementById('vipBannerS');
  
  if(p==='vip'){
    if(bt)bt.textContent='🎁 Full VIP Access — Trial Active';
    if(bs)bs.textContent='Enjoy all premium picks during your 3-day trial!';
  } else if(ok){
    if(bt)bt.textContent='✅ Plan Active — Full Access';
    if(bs)bs.textContent='All picks unlocked for your subscription';
  } else {
    if(bt)bt.textContent=`🔒 ${activeVipTab.charAt(0).toUpperCase()+activeVipTab.slice(1)} Plan Required`;
    if(bs)bs.textContent='Upgrade to access these picks';
  }
  
  ['gold','silver','diamond'].forEach(pl=>{
    const c=document.getElementById('vcnt-'+pl);
    if(c)c.textContent=getTips().filter(t=>t.plan===pl).length;
  });
  
  if(!ok){
    el.innerHTML=`<div class="up-prompt"><h3>🔒 LOCKED</h3><p>You need a <strong>${activeVipTab.charAt(0).toUpperCase()+activeVipTab.slice(1)}</strong> subscription.</p><button class="up-btn" onclick="showView('plans')">💎 Upgrade Now</button></div>`;
    return;
  }
  
  if(!tips.length){
    el.innerHTML=`<div style="padding:28px;text-align:center;color:var(--muted);">No tips posted yet ⚽</div>`;
    return;
  }
  
  el.innerHTML = tips.map(t=>buildCard(t,activeVipTab,ok)).join('');
}

function buildCard(tip, plan, ok){
  if(tip.time==='ACCA' && ok) {
    return `<div class="acca-card"><div class="acca-glow"></div><div class="acca-title">💎 7-FOLD MEGA ACCUMULATOR</div><div class="acca-teams">Bidco · Ludogorets · Rodina · Kakamega · Real Madrid · Slobozia · Sandviken</div><div class="acca-lbl">Total Odds</div><div class="acca-odds">${tip.odds}</div><div style="margin-top:9px;display:flex;align-items:center;gap:7px;"><div style="background:rgba(108,63,214,.18);border:1px solid rgba(108,63,214,.38);color:var(--pu2);padding:3px 11px;border-radius:7px;font-size:10px;font-weight:800;">DIAMOND EXCLUSIVE</div>${rdot(tip.result)}</div></div>`;
  }
  
  if(!ok) {
    return `<div class="tip-card locked tc-${plan}"><div class="blur-c"><div class="tc-hd"><span class="tc-league">🌍 ???</span><span class="tc-time">??:??</span></div><div class="tc-match">???? vs ????</div><div class="tc-ft"><span class="tc-chip chip-${plan}">🔒 Locked</span><span class="tc-odds">?.??</span></div></div><div class="lock-ov"><span class="lock-ico">🔒</span><button class="lock-msg-btn" onclick="showView('plans')">Upgrade to Unlock</button></div></div>`;
  }
  
  return `<div class="tip-card tc-${plan}"><div class="tc-hd"><span class="tc-league">⚽ ${tip.country}</span><span class="tc-time">${tip.time}</span></div><div class="tc-match">${tip.match}</div><div class="tc-ft"><span class="tc-chip chip-${plan}">${tip.tip}</span><span class="tc-odds">${tip.odds}</span>${rdot(tip.result)}</div></div>`;
}

function rdot(r){
  if(r==='win')return`<div class="tc-res rw">W</div>`;
  if(r==='lose')return`<div class="tc-res rl">L</div>`;
  return`<div class="tc-res rp">?</div>`;
}

function renderHistory(){
  const h = getHistory();
  document.getElementById('historyGrid').innerHTML = h.map(x=>{
    const scoreTag = x.score ? ` · <span style="background:rgba(0,230,118,.15);color:var(--gr);border:1px solid var(--gr);padding:1px 7px;border-radius:5px;font-size:10px;font-weight:800;">${x.score}</span>` : '';
    return `<div class="hc"><div class="hc-top"><span class="hc-date">📅 ${x.date}</span><span class="hc-win">✅ WIN</span></div><div class="hc-match">${x.match}</div><div class="hc-bot" style="flex-wrap:wrap;gap:5px;"><span class="hc-tip">${x.league} · ${x.tip}${scoreTag}</span><span class="hc-odds">${x.odds}</span></div></div>`;
  }).join('');
  renderHistAdmin();
}

function renderHistAdmin(){
  const c = document.getElementById('histAdminList');
  if(!c)return;
  const h = getHistory();
  c.innerHTML = h.map(x=>`<div style="background:var(--card2);border:1px solid var(--border);border-radius:9px;padding:9px 11px;margin-bottom:7px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><div style="flex:1;min-width:120px;"><div style="font-weight:800;font-size:12px;">${x.match}</div><div style="font-size:10px;color:var(--muted)">${x.date} | ${x.tip} @ ${x.odds}</div></div><button class="del-btn" onclick="delHistory(${x.id})">🗑</button></div>`).join('');
}

/* ════════ VIEW NAVIGATION ════════ */
function showView(v){
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  document.getElementById('view-'+v).classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
  document.querySelectorAll('.snav a').forEach(a=>a.classList.remove('act'));
  
  const map = {home:0, free:1, vip:2, history:3, plans:4};
  const links = document.querySelectorAll('.snav a');
  if(map[v]!==undefined && links[map[v]])links[map[v]].classList.add('act');
  
  if(v==='free')renderFreeTips();
  if(v==='vip')renderVipTips();
  if(v==='history')renderHistory();
  updateHomeUI();
}

function updateHomeUI(){
  const p = getEffPlan();
  const ico = document.getElementById('vipLock');
  if(ico)ico.textContent = (p==='vip' || planLvl[p]>=1) ? '🔓' : '🔒';
}

function updateSBPlan(){
  const p = getEffPlan();
  const el = document.getElementById('sbPlanDisplay');
  const m = {
    vip: ['pb-trial', '⏱ VIP Trial Active'],
    free: ['pb-free', '🆓 Free Plan'],
    gold: ['pb-gold', '🥇 Gold Plan'],
    silver: ['pb-silver', '🥈 Silver Plan'],
    diamond: ['pb-diamond', '💎 Diamond Plan'],
    expired: ['pb-expired', '⚠️ Trial Expired']
  };
  const [cls, lbl] = m[p] || ['pb-free', 'Free Plan'];
  if(el)el.innerHTML = `<div class="plan-badge ${cls}">${lbl}</div>`;
}

/* ════════ MODALS ════════ */
function closeWelcome(){
  document.getElementById('welcomeModal').style.display = 'none';
  checkExpired();
  requestNotifPerm();
  updateTimers();
}

function joinTG(){
  window.open(TG_CHANNEL, '_blank');
}

function checkExpired(){
  if(getEffPlan()==='expired')
    setTimeout(()=>document.getElementById('trialModal').classList.add('show'), 700);
}

function closeTrialModal(){
  document.getElementById('trialModal').classList.remove('show');
  showView('plans');
}

function subscribePlan(plan){
  const msg = encodeURIComponent(`Hi! I want to subscribe to the ${plan.toUpperCase()} plan.\n\nMy Device ID: ${DEVICE_ID}\n\nPlease activate my account. Thank you!`);
  window.open(`https://t.me/master_picks_odds?text=${msg}`, '_blank');
  showNotif(`📩 Opening Telegram for ${plan.toUpperCase()} subscription...`, '✈️');
}

function openTut(){
  document.getElementById('tutModal').classList.add('show');
}

function closeTut(){
  document.getElementById('tutModal').classList.remove('show');
}

/* ════════ NOTIFICATIONS ════════ */
function requestNotifPerm(){
  if('Notification' in window && Notification.permission === 'default')
    setTimeout(()=>Notification.requestPermission(), 3000);
}

function pushNotif(m){
  if('Notification' in window && Notification.permission === 'granted')
    new Notification('VictoryEdge Pro', {body:m});
}

function showNotif(m, i='⚽'){
  document.getElementById('notifIcon').textContent = i;
  document.getElementById('notifTxt').textContent = m;
  const n = document.getElementById('notif');
  n.classList.add('show');
  setTimeout(()=>n.classList.remove('show'), 5000);
}

function closeNotif(){
  document.getElementById('notif').classList.remove('show');
}

/* ════════ SIDEBAR ════════ */
function toggleSB(){
  document.getElementById('sb').classList.toggle('open');
  document.getElementById('sover').classList.toggle('open');
  document.getElementById('ham').classList.toggle('open');
}

function closeSB(){
  document.getElementById('sb').classList.remove('open');
  document.getElementById('sover').classList.remove('open');
  document.getElementById('ham').classList.remove('open');
}

/* ════════ THEME & LANGUAGE ════════ */
function setTheme(t){
  if(!t)t = document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  const b = document.getElementById('themeBtn');
  if(b)b.textContent = t==='dark' ? '🌙' : '☀️';
}

function setLang(l){
  localStorage.setItem('lang', l);
  document.documentElement.setAttribute('dir', l==='ar' ? 'rtl' : 'ltr');
  document.querySelectorAll('.lb').forEach(b=>b.classList.toggle('act', b.textContent.trim().toUpperCase().includes(l.toUpperCase())));
  showNotif('🌐 Language updated', '🌐');
}

/* ════════ DEVICE ID ════════ */
function copyDID(){
  navigator.clipboard.writeText(DEVICE_ID).then(()=>showNotif('✅ Device ID copied! Send to @master_picks_odds', '📋'));
}

/* ════════ SCROLL ════════ */
window.addEventListener('scroll', ()=>document.getElementById('sup').classList.toggle('show', window.scrollY>300));

/* ════════ ADMIN PANEL ════════ */
function openAdmin(){
  document.getElementById('adminPanel').classList.add('open');
  if(adminLoggedIn)showADash();
}

function closeAdmin(){
  document.getElementById('adminPanel').classList.remove('open');
}

function checkAdmin(){
  if(document.getElementById('aPw').value === ADMIN_PW){
    adminLoggedIn = true;
    showADash();
  } else {
    document.getElementById('aPw').style.borderColor = 'var(--rd)';
    setTimeout(()=>document.getElementById('aPw').style.borderColor = '', 800);
  }
}

function showADash(){
  document.getElementById('aLogin').style.display = 'none';
  document.getElementById('aDash').style.display = 'block';
  renderDevTable();
  renderAdminTips();
  renderHistAdmin();
}

function aTab(tab, btn){
  document.querySelectorAll('.atab').forEach(t=>t.classList.remove('act'));
  document.querySelectorAll('.acontent').forEach(c=>c.classList.remove('act'));
  btn.classList.add('act');
  document.getElementById('a-'+tab).classList.add('act');
}

function renderDevTable(){
  const reg = getReg();
  const tbody = document.getElementById('devTbody');
  const devs = Object.values(reg);
  
  if(!devs.length){
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:18px;">No devices yet</td></tr>`;
    return;
  }
  
  tbody.innerHTML = devs.map(d=>{
    const e = d.plan==='trial' ? Date.now()-d.trialStart : null;
    const tl = e!=null ? Math.max(0, Math.ceil((THREE_DAYS-e)/3600000))+'h left' : '-';
    return `<tr><td style="font-family:monospace;font-size:10px;color:var(--dm);word-break:break-all;max-width:150px;">${d.id}</td><td><select class="psel" id="psel-${d.id}">${['free','trial','gold','silver','diamond'].map(p=>`<option value="${p}"${d.plan===p?' selected':''}>${p}</option>`).join('')}</select></td><td style="font-size:10px;color:var(--muted);">${tl}</td><td style="font-size:10px;color:var(--muted);">${d.joined}</td><td><button class="sav-btn" onclick="adminSetPlan('${d.id}')">Save</button></td></tr>`;
  }).join('');
}

function adminSetPlan(id){
  const plan = document.getElementById('psel-'+id).value;
  const r = getReg();
  if(r[id]){
    r[id].plan = plan;
    saveReg(r);
  }
  if(id === DEVICE_ID){
    renderFreeTips();
    renderVipTips();
    updateSBPlan();
    updateHomeUI();
    updateTimers();
  }
  showNotif(`✅ ${id.slice(-8)} → ${plan.toUpperCase()}`, '✅');
}

function filterDev(){
  const q = document.getElementById('devSearch').value.toLowerCase();
  document.querySelectorAll('#devTbody tr').forEach(r=>r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none');
}

function addTip(){
  const tips = getTips();
  const nt = {
    id: Date.now(),
    time: document.getElementById('tTime').value,
    country: document.getElementById('tCountry').value.trim(),
    match: document.getElementById('tMatch').value.trim(),
    tip: document.getElementById('tTip').value,
    odds: document.getElementById('tOdds').value,
    result: document.getElementById('tResult').value,
    plan: document.getElementById('tPlan').value
  };
  
  if(!nt.match || !nt.country || !nt.odds){
    showNotif('⚠️ Fill all fields', '⚠️');
    return;
  }
  
  const lim = nt.plan==='free' ? 3 : 5;
  if(tips.filter(t=>t.plan===nt.plan && t.id>1000).length >= lim){
    showNotif(`⚠️ Max ${lim} tips for ${nt.plan}`, '⚠️');
    return;
  }
  
  tips.unshift(nt);
  saveTips(tips);
  renderFreeTips();
  renderVipTips();
  renderAdminTips();
  showNotif('✅ Tip added!', '✅');
  ['tMatch','tCountry','tOdds'].forEach(i=>document.getElementById(i).value='');
}

function renderAdminTips(){
  const c = document.getElementById('adminTipList');
  const tips = getTips();
  c.innerHTML = tips.map(tip=>`<div style="background:var(--card2);border:1px solid var(--border);border-radius:9px;padding:9px 11px;margin-bottom:7px;display:flex;align-items:center;gap:7px;flex-wrap:wrap;"><div style="flex:1;min-width:120px;"><div style="font-weight:800;font-size:12px;">${tip.time} · ${tip.match}</div><div style="font-size:10px;color:var(--muted)">${tip.country} | ${tip.tip} @ ${tip.odds} | <span style="color:var(--gd)">${tip.plan}</span></div></div><select class="rsel" onchange="setTipResult(${tip.id},this.value)"><option value="pending"${tip.result==='pending'?' selected':''}>Pending</option><option value="win"${tip.result==='win'?' selected':''}>Win</option><option value="lose"${tip.result==='lose'?' selected':''}>Lose</option></select><button class="del-btn" onclick="delTip(${tip.id})">🗑</button></div>`).join('');
}

function setTipResult(id, r){
  const tips = getTips();
  const t = tips.find(x=>x.id===id);
  if(t){
    t.result = r;
    saveTips(tips);
    renderFreeTips();
    renderVipTips();
    renderAdminTips();
  }
}

function delTip(id){
  saveTips(getTips().filter(t=>t.id!==id));
  renderFreeTips();
  renderVipTips();
  renderAdminTips();
  showNotif('🗑 Deleted', '🗑');
}

function addHistory(){
  const hist = getHistory();
  const nh = {
    id: Date.now(),
    date: document.getElementById('hDate').value,
    league: document.getElementById('hLeague').value.trim(),
    match: document.getElementById('hMatch').value.trim(),
    tip: document.getElementById('hTip').value.trim(),
    odds: document.getElementById('hOdds').value,
    score: ''
  };
  
  if(!nh.match || !nh.league){
    showNotif('⚠️ Fill all fields', '⚠️');
    return;
  }
  
  hist.unshift(nh);
  saveHistory(hist);
  renderHistory();
  showNotif('✅ History added!', '✅');
  ['hDate','hLeague','hMatch','hTip','hOdds'].forEach(i=>document.getElementById(i).value='');
}

function delHistory(id){
  saveHistory(getHistory().filter(h=>h.id!==id));
  renderHistory();
}

function adminSendNotif(){
  const m = document.getElementById('notifMsg').value.trim();
  if(!m)return;
  showNotif('📣 '+m, '📣');
  pushNotif(m);
  document.getElementById('notifMsg').value='';
  showNotif('✅ Sent!', '✅');
}

/* ════════ INITIALIZATION ════════ */
(function(){
  setTheme(curTheme);
  document.getElementById('didVal').textContent = DEVICE_ID;
  document.getElementById('footerDID').textContent = 'Device: '+DEVICE_ID;
  getMyDev();
  updateSBPlan();
  updateHomeUI();
  renderFreeTips();
  updateTimers();
  timerInt = setInterval(updateTimers, 1000);
  
  // Fetch from backend on load
  fetchFromBackend();
  
  setTimeout(()=>{
    showNotif("⚽ Today's picks are live! Tap Daily Free Tips to start.", '⚽');
    pushNotif("Today's predictions are live!");
  }, 10000);
})();
