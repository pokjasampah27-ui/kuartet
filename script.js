'use strict';

const QUARTETS = [
  {id:'dasar', name:'Dasar Drama', icon:'🎭', color:'#6c5ce7'},
  {id:'tokoh', name:'Tokoh', icon:'👥', color:'#ff6b9d'},
  {id:'konflik', name:'Konflik', icon:'⚡', color:'#f4a261'},
  {id:'tuturan', name:'Tuturan', icon:'💬', color:'#20bfa9'},
  {id:'alur', name:'Alur & Struktur', icon:'📈', color:'#3d8bfd'},
  {id:'pementasan', name:'Pementasan', icon:'🎬', color:'#8b5cf6'}
];

const CARDS = [
  {id:'D1',q:'dasar',title:'Pengertian Drama',icon:'🎭',text:'Karya sastra yang menggambarkan kehidupan melalui dialog, tindakan, konflik, dan interaksi antartokoh serta dapat diwujudkan dalam pertunjukan.'},
  {id:'D2',q:'dasar',title:'Drama Naskah',icon:'📖',text:'Drama dalam bentuk teks tertulis yang memuat unsur yang diperlukan untuk menggambarkan cerita dan menjadi dasar pementasan.'},
  {id:'D3',q:'dasar',title:'Drama Pentas',icon:'🎬',text:'Drama yang diwujudkan menjadi pertunjukan di hadapan penonton melalui tindakan dan berbagai unsur pertunjukan.'},
  {id:'D4',q:'dasar',title:'Tema',icon:'💡',text:'Gagasan pokok atau persoalan utama yang mendasari cerita.'},

  {id:'T1',q:'tokoh',title:'Protagonis',icon:'🦸',text:'Tokoh yang menjadi pusat perjuangan atau tujuan utama dalam konflik cerita. Tidak selalu tokoh yang paling baik.'},
  {id:'T2',q:'tokoh',title:'Antagonis',icon:'🥊',text:'Tokoh atau kekuatan yang beroposisi atau bertentangan dengan tujuan protagonis. Tidak selalu tokoh jahat.'},
  {id:'T3',q:'tokoh',title:'Tritagonis',icon:'🤝',text:'Tokoh yang dapat berfungsi sebagai penengah, pendukung, atau membantu mengembangkan konflik antara protagonis dan antagonis.'},
  {id:'T4',q:'tokoh',title:'Deuteragonis',icon:'👤',text:'Tokoh penting kedua setelah protagonis yang memiliki peran cukup besar dalam perkembangan cerita.'},

  {id:'K1',q:'konflik',title:'Konflik',icon:'⚡',text:'Pertentangan atau permasalahan yang menggerakkan perkembangan cerita.'},
  {id:'K2',q:'konflik',title:'Konflik Internal',icon:'💭',text:'Konflik yang terjadi di dalam diri tokoh, seperti pertentangan pikiran atau perasaan.'},
  {id:'K3',q:'konflik',title:'Konflik Eksternal',icon:'⚔️',text:'Konflik yang terjadi antara tokoh dengan sesuatu di luar dirinya, misalnya tokoh lain, kelompok, masyarakat, lingkungan, atau keadaan.'},
  {id:'K4',q:'konflik',title:'Penokohan',icon:'🧩',text:'Cara pengarang menggambarkan dan mengembangkan karakter tokoh dalam cerita.'},

  {id:'U1',q:'tuturan',title:'Dialog',icon:'🗣️',text:'Percakapan antara dua tokoh atau lebih untuk menyampaikan informasi, karakter, konflik, alur, dan perasaan.'},
  {id:'U2',q:'tuturan',title:'Monolog',icon:'🎙️',text:'Tuturan panjang yang disampaikan oleh seorang tokoh tanpa pertukaran percakapan langsung dengan tokoh lain.'},
  {id:'U3',q:'tuturan',title:'Solilokui',icon:'🧠',text:'Tuturan seorang tokoh yang mengungkapkan pikiran atau perasaan batinnya, biasanya ketika tokoh tersebut sendirian.'},
  {id:'U4',q:'tuturan',title:'Kramagung',icon:'📝',text:'Petunjuk dalam naskah drama yang menjelaskan tindakan, gerakan, ekspresi, suasana, atau cara tokoh melakukan sesuatu.'},

  {id:'A1',q:'alur',title:'Eksposisi',icon:'🌱',text:'Bagian awal yang memperkenalkan tokoh, latar, situasi, dan kondisi awal cerita.'},
  {id:'A2',q:'alur',title:'Klimaks',icon:'🌋',text:'Titik puncak konflik atau ketegangan dalam cerita.'},
  {id:'A3',q:'alur',title:'Antiklimaks',icon:'📉',text:'Bagian setelah puncak konflik ketika ketegangan mulai menurun.'},
  {id:'A4',q:'alur',title:'Resolusi',icon:'🏁',text:'Bagian penyelesaian konflik; masalah dapat selesai, tokoh menerima keadaan, terjadi perubahan, atau berakhir terbuka.'},

  {id:'P1',q:'pementasan',title:'Blocking',icon:'📍',text:'Pengaturan posisi, arah, dan perpindahan aktor di atas panggung.'},
  {id:'P2',q:'pementasan',title:'Gestur & Mimik',icon:'😊',text:'Gestur adalah gerakan tubuh yang bermakna. Mimik adalah ekspresi wajah yang menunjukkan emosi atau keadaan tokoh.'},
  {id:'P3',q:'pementasan',title:'Vokal',icon:'🎤',text:'Artikulasi adalah kejelasan pengucapan; intonasi adalah tinggi-rendah nada; volume adalah keras-lembut suara; tempo adalah cepat-lambat pengucapan.'},
  {id:'P4',q:'pementasan',title:'Tata Artistik',icon:'🎨',text:'Keseluruhan pengaturan unsur visual dan pendukung, seperti tata panggung, set, properti, kostum, rias, cahaya, dan suara.'}
];

const faces = ['🧑‍🎭','👩‍🎭','🧑‍🎤','👩‍🎤'];
let state = {
  screen:'screenHome',
  players:[],
  current:0,
  selectedQuartet:null,
  selectedOpponent:null,
  locked: new Set(),
  gameOver:false
};

const $ = id => document.getElementById(id);
const quartetById = id => QUARTETS.find(q=>q.id===id);
const cardById = id => CARDS.find(c=>c.id===id);
const shuffle = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  state.screen=id;
  window.scrollTo({top:0,behavior:'smooth'});
}
function openModal(id){$(id).classList.add('show');$(id).setAttribute('aria-hidden','false')}
function closeModal(id){$(id).classList.remove('show');$(id).setAttribute('aria-hidden','true')}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2600)}

function renderPlayerInputs(count){
  const wrap=$('playerInputs'); wrap.innerHTML='';
  for(let i=0;i<count;i++){
    const label=document.createElement('label');
    label.innerHTML=`Pemain ${i+1}<input maxlength="18" value="${i===0?'Pemain 1':i===1?'Pemain 2':`Pemain ${i+1}`}" data-player-input="${i}" autocomplete="off">`;
    wrap.appendChild(label);
  }
}

function startSetup(){showScreen('screenSetup');renderPlayerInputs(2)}
function deal(){
  const count=Number(document.querySelector('.segmented button.selected').dataset.count);
  const inputs=[...document.querySelectorAll('[data-player-input]')];
  const names=inputs.map((x,i)=>x.value.trim()||`Pemain ${i+1}`);
  const deck=shuffle(CARDS.map(c=>c.id));
  const players=names.map((name,i)=>({id:i,name,hand:[],score:0,completed:[]}));
  deck.forEach((cardId,i)=>players[i%count].hand.push(cardId));
  state={screen:'screenGame',players,current:0,selectedQuartet:null,selectedOpponent:null,locked:new Set(),gameOver:false};
  showScreen('screenGame');renderGame();toast(`Kartu sudah dibagikan. Giliran ${players[0].name}.`);
}

function cardHtml(card, compact=false){
  const q=quartetById(card.q);
  return `<article class="game-card" style="--card-accent:${q.color};--card-bg:${q.color}18">
    <span class="card-quartet">${q.icon} ${q.name}</span>
    <div class="card-num">KARTU ${card.id}</div>
    <div class="card-icon">${card.icon}</div>
    <h4>${card.title}</h4>
    ${compact?'':`<p>${card.text}</p>`}
  </article>`;
}

function renderGame(){
  const p=state.players[state.current];
  $('turnTitle').textContent=`Giliran ${p.name}`;
  $('turnNotice').innerHTML=`🎯 <strong>${p.name}</strong>, pilih kuartet dari kartu tanganmu lalu minta satu kartu dari pemain lain.`;
  $('deckInfo').textContent=`${state.players.reduce((n,p)=>n+p.hand.length,0)} kartu di tangan`;
  $('scorePills').innerHTML=state.players.map((x,i)=>`<span class="score-pill ${i===state.current?'current':''}">${faces[i]} ${escapeHtml(x.name)}: ${x.score} 🏆</span>`).join('');
  renderQuartets();renderOpponents();
}
function renderQuartets(){
  const p=state.players[state.current];
  $('quartetStatus').innerHTML=QUARTETS.map(q=>{
    const n=p.hand.filter(id=>cardById(id).q===q.id).length;
    const done=state.locked.has(q.id);
    return `<div class="q-status ${done?'done':''}" style="--q:${q.color}">${q.icon} ${q.name} <span style="float:right">${done?'✓':`${n}/4`}</span></div>`;
  }).join('');
}
function renderOpponents(){
  $('opponents').innerHTML=state.players.map((x,i)=>`<div class="opponent ${i===state.current?'current':''}" data-opponent="${i}"><div class="face">${faces[i]}</div><h4>${escapeHtml(x.name)}</h4><p>${i===state.current?'Giliran sekarang':'Pegang '+x.hand.length+' kartu'}</p></div>`).join('');
  document.querySelectorAll('[data-opponent]').forEach(el=>el.addEventListener('click',()=>{
    const i=Number(el.dataset.opponent); if(i!==state.current) openAskModal(i);
  }));
}

function openHand(){
  const p=state.players[state.current];
  $('handTitle').textContent=`Kartu ${p.name} (${p.hand.length})`;
  $('handGrid').innerHTML=shuffle(p.hand).map(id=>cardHtml(cardById(id))).join('');
  openModal('handModal');
}

function openAskModal(opponentIndex){
  const p=state.players[state.current];
  const possible=QUARTETS.filter(q=>p.hand.some(id=>cardById(id).q===q.id)&&!state.locked.has(q.id));
  if(!possible.length){toast('Semua kartu di tanganmu sudah menjadi kuartet.');return;}
  state.selectedOpponent=opponentIndex;state.selectedQuartet=null;
  $('askHelp').textContent=`Kamu akan meminta kartu dari ${state.players[opponentIndex].name}. Pilih kuartet yang ingin kamu lengkapi.`;
  $('askQuartet').innerHTML=possible.map(q=>`<button class="ask-q-btn" data-ask-q="${q.id}">${q.icon} ${q.name}</button>`).join('');
  $('askPlayers').innerHTML=`<button class="ask-player-btn active">${faces[opponentIndex]} ${escapeHtml(state.players[opponentIndex].name)}</button>`;
  $('askCards').classList.add('hidden');
  document.querySelectorAll('[data-ask-q]').forEach(btn=>btn.addEventListener('click',()=>selectAskQuartet(btn.dataset.askQ)));
  openModal('askModal');
}
function selectAskQuartet(qid){
  state.selectedQuartet=qid;
  document.querySelectorAll('[data-ask-q]').forEach(b=>b.classList.toggle('active',b.dataset.askQ===qid));
  const q=quartetById(qid), target=state.players[state.selectedOpponent];
  const missing=CARDS.filter(c=>c.q===qid && state.players[state.current].hand.includes(c.id)===false && !state.locked.has(qid));
  // A player can ask for any specific card in the chosen quartet that they do not already have.
  $('askCards').classList.remove('hidden');
  $('askCards').innerHTML=missing.map(c=>`<button class="ask-card-btn" data-ask-card="${c.id}">${c.icon} ${c.title}</button>`).join('') || `<p class="modal-help">Tidak ada kartu lain yang bisa diminta dari kuartet ini.</p>`;
  document.querySelectorAll('[data-ask-card]').forEach(btn=>btn.addEventListener('click',()=>askCard(btn.dataset.askCard,target)));
  if(missing.length===0) toast('Kamu sudah memegang semua kartu yang belum terkunci dari kuartet ini.');
}
function askCard(cardId,target){
  const me=state.players[state.current];
  const idx=target.hand.indexOf(cardId);
  const card=cardById(cardId);
  closeModal('askModal');
  if(idx!==-1){
    target.hand.splice(idx,1);me.hand.push(cardId);
    toast(`🎉 ${target.name} memiliki ${card.title}. Kartu berpindah ke ${me.name}. Kamu boleh meminta lagi.`);
    completeAvailable(me);
    renderGame();
    if(!state.gameOver && me.hand.length) setTimeout(()=>toast('Pilih pemain lain untuk meminta kartu lagi.'),700);
  }else{
    toast(`😯 ${target.name} tidak memiliki ${card.title}. Giliran berpindah.`);
    completeAvailable(me);
    nextTurn();
  }
}
function completeAvailable(player){
  QUARTETS.forEach(q=>{
    if(state.locked.has(q.id)) return;
    const ids=player.hand.filter(id=>cardById(id).q===q.id);
    if(ids.length===4){
      player.hand=player.hand.filter(id=>cardById(id).q!==q.id);
      player.score++;player.completed.push(q.id);state.locked.add(q.id);
      toast(`🏆 ${player.name} melengkapi kuartet ${q.name}! +1 poin.`);
    }
  });
  if(state.locked.size===QUARTETS.length) finishGame();
}
function nextTurn(){
  if(state.gameOver)return;
  state.current=(state.current+1)%state.players.length;
  state.selectedQuartet=null;state.selectedOpponent=null;renderGame();
}
function finishGame(){
  state.gameOver=true;
  const sorted=[...state.players].sort((a,b)=>b.score-a.score);
  const max=sorted[0].score,winners=sorted.filter(p=>p.score===max);
  $('winnerTitle').textContent=winners.length>1?'Hasilnya seri!':`Selamat, ${winners[0].name}!`;
  $('winnerText').textContent=winners.length>1?`Beberapa pemain sama-sama mengumpulkan ${max} kuartet.`:`Berhasil mengumpulkan ${max} kuartet.`;
  $('finalScores').innerHTML=sorted.map((p,i)=>`<div class="final-row"><span>${i+1}. ${faces[state.players.indexOf(p)]} ${escapeHtml(p.name)}</span><span>${p.score} kuartet</span></div>`).join('');
  openModal('resultModal');
}
function restart(){state={screen:'screenHome',players:[],current:0,selectedQuartet:null,selectedOpponent:null,locked:new Set(),gameOver:false};closeModal('resultModal');showScreen('screenHome')}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

$('btnStart').addEventListener('click',startSetup);
$('btnRules').addEventListener('click',()=>openModal('rulesModal'));
$('btnHand').addEventListener('click',openHand);
$('btnRestart').addEventListener('click',()=>{if(confirm('Mulai ulang permainan? Permainan saat ini akan dihapus.'))restart()});
$('btnPlayAgain').addEventListener('click',restart);
$('btnDeal').addEventListener('click',deal);
$('playerCount').addEventListener('click',e=>{const b=e.target.closest('[data-count]');if(!b)return;document.querySelectorAll('[data-count]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');renderPlayerInputs(Number(b.dataset.count))});
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.back)));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.close)));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));

document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.show').forEach(m=>closeModal(m.id))});

renderPlayerInputs(2);
