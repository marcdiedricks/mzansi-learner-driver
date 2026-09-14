const state = {
  questions: [],
  activeVehicleGroup: "code2",
  mockQuestions: [],
  mockIndex: 0,
  mockScore: 0,
  mockAnswers: [],
  orientationStep: 0,
  lastPracticeId: null
};

const DB_NAME = "mzansiLearnerDriverDB";
const STORE = "progress";
const tr = key => window.MLD_I18N.t(key);
const lang = () => window.MLD_I18N.language;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbGet(key, fallback = null) {
  const db = await openDB();
  return new Promise(resolve => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result ?? fallback);
    req.onerror = () => resolve(fallback);
  });
}
async function dbSet(key, value) {
  const db = await openDB();
  return new Promise(resolve => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = resolve;
  });
}

function currentViewId() {
  return document.querySelector(".view.active")?.id || "homeView";
}
function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "practiceView") renderPractice();
  if (id === "weakView") renderWeak();
  if (id === "readyView") renderReady();
  if (id === "orientationView") renderOrientation();
  if (id === "mockView") resetMockLanding();
  refreshHome();
}
document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
document.querySelectorAll(".back").forEach(btn => btn.addEventListener("click", () => showView("homeView")));

async function changeLanguage(newLang) {
  window.MLD_I18N.setLanguage(newLang);
  await dbSet("language", newLang);
  updateConnection();
  const view = currentViewId();
  if (view === "practiceView") renderPractice();
  if (view === "weakView") renderWeak();
  if (view === "readyView") renderReady();
  if (view === "orientationView") renderOrientation();
  if (view === "mockView") {
    if (state.mockQuestions.length && state.mockIndex < state.mockQuestions.length) runMock();
    else resetMockLanding();
  }
  refreshHome();
}
document.querySelectorAll(".lang-btn").forEach(btn => btn.addEventListener("click", () => changeLanguage(btn.dataset.lang)));

function updateConnection() {
  const badge = document.getElementById("offlineBadge");
  badge.textContent = navigator.onLine ? tr("online") : tr("offline");
}
window.addEventListener("online", updateConnection);
window.addEventListener("offline", updateConnection);

async function loadQuestions() {
  const paths = ["data/questions/rules.json","data/questions/signs.json","data/questions/controls.json"];
  const responses = await Promise.all(paths.map(path => fetch(path)));
  const packs = await Promise.all(responses.map(res => {
    if (!res.ok) throw new Error("Question pack failed to load");
    return res.json();
  }));
  state.questions = packs.flatMap(pack => pack.items || []);
  if (state.questions.length !== 25) throw new Error("Expected 25 pilot questions");
  if (!eligibleQuestions().length) throw new Error("No Code 2 pilot questions available");
}
function questionText(q) {
  return q.language?.[lang()] || q.language?.en || q;
}
function sectionLabel(section) {
  return section === "rules" ? tr("rules") : section === "signs" ? tr("signs") : tr("controls");
}
function renderQuestion(q, container, onDone, metaText = tr("pilotQuestion")) {
  const txt = questionText(q);
  container.innerHTML = `
    <div class="question-card">
      <div class="question-meta">
        <span class="section-pill ${q.section}">${sectionLabel(q.section)}</span>
        <span class="question-count">${metaText}</span>
      </div>
      <h3>${txt.question}</h3><div id="answers"></div><div id="feedback"></div>
    </div>`;
  const answers = container.querySelector("#answers");
  txt.options.forEach((opt, idx) => {
    const b = document.createElement("button");
    b.className = "answer-btn";
    b.dataset.index = String(idx);
    b.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)}</span><span>${opt}</span>`;
    b.onclick = () => {
      answers.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      const correct = idx === q.correct_index;
      if (correct) b.classList.add("correct-answer");
      else {
        b.classList.add("wrong-answer");
        answers.querySelector(`button[data-index="${q.correct_index}"]`)?.classList.add("correct-answer");
      }
      container.querySelector("#feedback").innerHTML =
        `<div class="feedback ${correct ? "" : "bad"}"><strong>${correct ? tr("correct") : tr("notQuite")}</strong><br>${txt.explanation}</div>`;
      onDone(correct, q);
      answers.querySelectorAll("button").forEach(x => x.disabled = true);
    };
    answers.appendChild(b);
  });
}
function isEligibleForActiveVehicle(q) {
  return q.vehicle_group.includes("all") || q.vehicle_group.includes(state.activeVehicleGroup);
}
function eligibleQuestions(section = null) {
  return state.questions.filter(q => isEligibleForActiveVehicle(q) && (!section || q.section === section));
}
function choosePracticeQuestion() {
  const eligible = eligibleQuestions();
  const candidates = eligible.filter(q => q.id !== state.lastPracticeId);
  const pool = candidates.length ? candidates : eligible;
  const q = pool[Math.floor(Math.random() * pool.length)];
  state.lastPracticeId = q.id;
  return q;
}
async function renderPractice() {
  const box = document.getElementById("practiceBox");
  if (!state.questions.length) {
    box.innerHTML = `<div class="result-card status-warn"><div class="result-title">${tr("packUnavailable")}</div><p>${tr("reopenAfterLoad")}</p></div>`;
    return;
  }
  const q = choosePracticeQuestion();
  renderQuestion(q, box, async (correct, question) => {
    const stats = await dbGet("practiceStats", {total:0, correct:0, bySection:{}});
    stats.total++;
    if (correct) stats.correct++;
    stats.bySection[question.section] ??= {total:0, correct:0};
    stats.bySection[question.section].total++;
    if (correct) stats.bySection[question.section].correct++;
    await dbSet("practiceStats", stats);
    const n = document.createElement("button");
    n.className = "next-btn"; n.textContent = tr("tryAnother"); n.onclick = renderPractice;
    box.appendChild(n); refreshHome();
  });
}
function randomFromSection(section) {
  const pool = eligibleQuestions(section);
  return pool[Math.floor(Math.random() * pool.length)];
}
function buildMockSet() { return ["rules","signs","controls"].map(randomFromSection); }
const startMockButton = document.getElementById("startMock");
startMockButton.addEventListener("click", () => {
  state.mockQuestions = buildMockSet(); state.mockIndex = 0; state.mockScore = 0; state.mockAnswers = [];
  startMockButton.classList.add("hidden"); runMock();
});
function setStartMockLabel(key="startMock") {
  document.getElementById("startMockText").textContent = tr(key);
}
function resetMockLanding() {
  document.getElementById("mockBox").innerHTML = "";
  startMockButton.classList.remove("hidden"); setStartMockLabel("startMock");
}
function runMock() {
  const box = document.getElementById("mockBox");
  if (state.mockIndex >= state.mockQuestions.length) { finishMock(); return; }
  const q = state.mockQuestions[state.mockIndex];
  const meta = lang() === "af" ? `VRAAG ${state.mockIndex+1} VAN ${state.mockQuestions.length}`
    : lang() === "xh" ? `UMBUZO ${state.mockIndex+1} KWA-${state.mockQuestions.length}`
    : `QUESTION ${state.mockIndex+1} OF ${state.mockQuestions.length}`;
  renderQuestion(q, box, (correct, question) => {
    if (correct) state.mockScore++;
    state.mockAnswers.push({section:question.section, question_id:question.id, correct});
    const n = document.createElement("button");
    n.className = "next-btn";
    n.textContent = state.mockIndex === state.mockQuestions.length - 1 ? tr("finish") : tr("next");
    n.onclick = () => { state.mockIndex++; runMock(); };
    box.appendChild(n);
  }, meta);
}
async function finishMock() {
  const box = document.getElementById("mockBox");
  const result = {date:new Date().toISOString(), score:state.mockScore, total:state.mockQuestions.length, answers:state.mockAnswers};
  const history = await dbGet("mockHistory", []); history.unshift(result); await dbSet("mockHistory", history.slice(0,10));
  const pct = Math.round((result.score/result.total)*100);
  const resultText = lang() === "af" ? `Jy het ${pct}% korrek beantwoord in hierdie CLLT-styl loodsproeftoets.`
    : lang() === "xh" ? `Uphendule ${pct}% ngokuchanekileyo kolu vavanyo lokuziqhelisa lwe-CLLT.`
    : `You answered ${pct}% correctly in this CLLT-style pilot mock.`;
  box.innerHTML = `<div class="result-card status-info"><span class="screen-chip purple">${tr("mockComplete")}</span><div class="score-large">${result.score}/${result.total}</div><p>${resultText}</p><p class="small">${tr("notOfficialScore")}</p></div>`;
  startMockButton.classList.remove("hidden"); setStartMockLabel("startAnother"); refreshHome();
}
async function renderWeak() {
  const box = document.getElementById("weakBox");
  const stats = await dbGet("practiceStats", {bySection:{}});
  const rows = Object.entries(stats.bySection || {});
  if (!rows.length) {
    box.innerHTML = `<div class="result-card status-info"><div class="result-title">${tr("nothingYet")}</div><p>${tr("practiseFirst")}</p></div>`; return;
  }
  rows.sort((a,b)=>(a[1].correct/a[1].total)-(b[1].correct/b[1].total));
  box.innerHTML = rows.map(([section,s]) => {
    const pct=Math.round((s.correct/s.total)*100);
    return `<div class="result-card ${pct>=85?"status-good":"status-warn"}"><div class="result-title">${sectionLabel(section)}</div><p><strong>${pct}%</strong> ${tr("correctInPractice")}</p></div>`;
  }).join("");
}
async function renderReady() {
  const box=document.getElementById("readyBox");
  const orientationDone=await dbGet("orientationDone",false);
  const stats=await dbGet("practiceStats",{total:0,correct:0,bySection:{}});
  if(!stats.total){box.innerHTML=`<div class="result-card status-warn"><span class="screen-chip orange">${tr("nextStep")}</span><div class="result-title">${tr("notReady")}</div><p>${tr("completeOrientationPractice")}</p></div>`;return;}
  const pct=Math.round((stats.correct/stats.total)*100);
  const required=["rules","signs","controls"];
  const all=required.every(s=>stats.bySection?.[s]?.total>0);
  const sectionOK=all&&required.every(s=>(stats.bySection[s].correct/stats.bySection[s].total)>=.85);
  const ready=orientationDone&&sectionOK&&stats.total>=6;
  box.innerHTML=`<div class="result-card ${ready?"status-good":"status-warn"}"><span class="screen-chip ${ready?"green":"orange"}">${ready?tr("readinessCheck"):tr("keepPractising")}</span><div class="result-title">${ready?tr("seriousMock"):tr("notReady")}</div><p><strong>${tr("practiceAccuracy")}</strong> ${pct}%</p><p><strong>${tr("allSections")}</strong> ${all?tr("yes"):tr("notYet")}</p><p><strong>${tr("orientation")}</strong> ${orientationDone?tr("complete"):tr("notComplete")}</p><p class="small">${tr("readinessNote")}</p></div>`;
}
async function renderOrientation() {
  const box=document.getElementById("orientationBox");
  const done=await dbGet("orientationDone",false);
  if(done){box.innerHTML=`<div class="result-card status-good"><span class="screen-chip green">${tr("complete")}</span><div class="result-title">${tr("digitalOrientationComplete")}</div><p>${tr("repeatAnytime")}</p><button id="repeatOrientation" class="next-btn">${tr("repeatOrientation")}</button></div>`;document.getElementById("repeatOrientation").onclick=()=>{state.orientationStep=0;runOrientationStep();};return;}
  state.orientationStep=0; runOrientationStep();
}
function runOrientationStep() {
  const box=document.getElementById("orientationBox");
  const steps=[
    {html:`<div class="orientation-steps"><span class="active"></span><span></span><span></span></div><div class="question-card orientation-card"><span class="screen-chip gold">${tr("step1")}</span><h3>${tr("tapButton")}</h3><p>${tr("tapButtonText")}</p><button id="oriAction" class="next-btn">${tr("tapMe")}</button></div>`,bind:()=>document.getElementById("oriAction").onclick=nextOrientation},
    {html:`<div class="orientation-steps"><span class="active"></span><span class="active"></span><span></span></div><div class="question-card orientation-card"><span class="screen-chip gold">${tr("step2")}</span><h3>${tr("selectChange")}</h3><p>${tr("selectChangeText")}</p><button class="answer-btn oriChoice"><span class="option-letter">A</span><span>${tr("answerA")}</span></button><button class="answer-btn oriChoice"><span class="option-letter">B</span><span>${tr("answerB")}</span></button><button id="oriNext" class="next-btn" disabled>${tr("next")}</button></div>`,bind:()=>{let count=0,last=null;document.querySelectorAll(".oriChoice").forEach(b=>b.onclick=()=>{document.querySelectorAll(".oriChoice").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");if(last!==b)count++;last=b;if(count>=2)document.getElementById("oriNext").disabled=false;});document.getElementById("oriNext").onclick=nextOrientation;}},
    {html:`<div class="orientation-steps"><span class="active"></span><span class="active"></span><span class="active"></span></div><div class="question-card orientation-card"><span class="screen-chip gold">${tr("step3")}</span><h3>${tr("finishScreen")}</h3><p>${tr("finishScreenText")}</p><button id="oriFinish" class="next-btn">${tr("finish")}</button></div>`,bind:()=>document.getElementById("oriFinish").onclick=finishOrientation}
  ];
  const step=steps[state.orientationStep]; box.innerHTML=step.html; step.bind();
}
function nextOrientation(){state.orientationStep++;runOrientationStep();}
async function finishOrientation(){await dbSet("orientationDone",true);document.getElementById("orientationBox").innerHTML=`<div class="result-card status-good"><span class="screen-chip green">${tr("complete")}</span><div class="result-title">${tr("orientationDoneTitle")}</div><p>${tr("orientationDoneText")}</p></div>`;refreshHome();}
async function refreshHome(){
  const orientationDone=await dbGet("orientationDone",false);
  const stats=await dbGet("practiceStats",{total:0,correct:0});
  const mockHistory=await dbGet("mockHistory",[]);
  const yesNo=orientationDone?tr("complete"):tr("notComplete");
  document.getElementById("homeProgress").textContent=`${tr("progressOrientation")}: ${yesNo} · ${tr("progressPractice")}: ${stats.total||0} · ${tr("progressMocks")}: ${mockHistory.length}`;
}

let deferredInstallPrompt=null;
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault(); deferredInstallPrompt=event;
  document.getElementById("installCard").classList.remove("hidden");
});
document.getElementById("installApp").addEventListener("click", async () => {
  if(!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;
  document.getElementById("installCard").classList.add("hidden");
});
window.addEventListener("appinstalled",()=>document.getElementById("installCard").classList.add("hidden"));

async function init(){
  const savedLanguage=await dbGet("language","en");
  window.MLD_I18N.setLanguage(savedLanguage);
  updateConnection();
  try{await loadQuestions();await refreshHome();}catch(err){document.getElementById("homeProgress").textContent=tr("pilotLoadFail");}
  if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
}
init();