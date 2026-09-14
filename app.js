const state = {
  questions: [],
  activeVehicleGroup: "code2",
  mockQuestions: [],
  mockIndex: 0,
  mockScore: 0,
  mockAnswers: [],
  orientationStep: 0,
  lastPracticeId: null,
  practiceSection: "all",
  practiceQueue: [],
  studySection: "rules",
  studyIndex: 0
};

const DB_NAME = "mzansiLearnerDriverDB";
const STORE = "progress";
const tr = key => window.MLD_I18N.t(key);
const lang = () => window.MLD_I18N.language;
const accessibilityState = { highContrast: false, largerText: false };
const speechState = {
  supported: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
  activeButton: null,
  session: 0
};

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

function pathwayKey(base, group = state.activeVehicleGroup) {
  return `${base}:${group}`;
}

function pathwayLabel(group = state.activeVehicleGroup) {
  return group === "code1" ? tr("motorcyclePath") : tr("lightPath");
}

async function migrateLegacyProgress() {
  const migrated = await dbGet("pathwayProgressMigrationV1", false);
  if (migrated) return;

  const legacyStats = await dbGet("practiceStats", null);
  const code2Stats = await dbGet("practiceStats:code2", null);
  if (legacyStats && !code2Stats) await dbSet("practiceStats:code2", legacyStats);

  const legacyMocks = await dbGet("mockHistory", null);
  const code2Mocks = await dbGet("mockHistory:code2", null);
  if (legacyMocks && !code2Mocks) await dbSet("mockHistory:code2", legacyMocks);

  await dbSet("pathwayProgressMigrationV1", true);
}

function updatePathwayUI() {
  document.querySelectorAll(".pathway-btn").forEach(btn => {
    const active = btn.dataset.pathway === state.activeVehicleGroup;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  const practiceIntro = document.getElementById("practiceIntro");
  if (practiceIntro) practiceIntro.textContent = tr(state.activeVehicleGroup === "code1" ? "practiceIntroCode1" : "practiceIntroCode2");

  const mockIntro = document.getElementById("mockIntro");
  if (mockIntro) mockIntro.textContent = tr(state.activeVehicleGroup === "code1" ? "mockIntroCode1" : "mockIntroCode2");
}

async function changePathway(group) {
  if (!["code1","code2"].includes(group) || group === state.activeVehicleGroup) return;
  stopSpeech();
  state.activeVehicleGroup = group;
  state.lastPracticeId = null;
  state.practiceSection = "all";
  state.practiceQueue = [];
  state.studySection = "rules";
  state.studyIndex = 0;
  state.mockQuestions = [];
  state.mockIndex = 0;
  state.mockScore = 0;
  state.mockAnswers = [];
  await dbSet("vehiclePathway", group);
  updatePathwayUI();
  await refreshHome();
}

document.querySelectorAll(".pathway-btn").forEach(btn => {
  btn.addEventListener("click", () => changePathway(btn.dataset.pathway));
});

function applyAccessibilitySettings(settings = accessibilityState) {
  accessibilityState.highContrast = Boolean(settings.highContrast);
  accessibilityState.largerText = Boolean(settings.largerText);
  document.documentElement.classList.toggle("high-contrast", accessibilityState.highContrast);
  document.documentElement.classList.toggle("large-text", accessibilityState.largerText);
  updateAccessibilityControls();
}

function updateAccessibilityControls() {
  const contrast = document.getElementById("contrastToggle");
  const textSize = document.getElementById("textSizeToggle");
  if (!contrast || !textSize) return;
  contrast.setAttribute("aria-checked", String(accessibilityState.highContrast));
  textSize.setAttribute("aria-checked", String(accessibilityState.largerText));
  contrast.querySelector("[data-setting-status]").textContent = accessibilityState.highContrast ? tr("on") : tr("off");
  textSize.querySelector("[data-setting-status]").textContent = accessibilityState.largerText ? tr("on") : tr("off");
}

async function saveAccessibilitySettings() {
  await dbSet("accessibilitySettings", {...accessibilityState});
}

function speechLanguageCode() {
  return lang() === "af" ? "af" : lang() === "xh" ? "xh" : "en";
}

function speechOptionLabel(index) {
  if (index === 0) return tr("answerA");
  if (index === 1) return tr("answerB");
  return tr("answerC");
}

function setSpeechStatus(statusEl, message = "") {
  if (!statusEl) return;
  statusEl.textContent = message;
}

function resetSpeechButton(button) {
  if (!button) return;
  const key = button.dataset.idleKey || "readAloud";
  button.textContent = tr(key);
  button.dataset.speaking = "false";
  button.removeAttribute("aria-pressed");
}

function stopSpeech() {
  speechState.session++;
  if (speechState.supported) window.speechSynthesis.cancel();
  if (speechState.activeButton) resetSpeechButton(speechState.activeButton);
  speechState.activeButton = null;
}

function waitForSpeechVoices(timeoutMs = 3000) {
  if (!speechState.supported) return Promise.resolve([]);
  const existing = window.speechSynthesis.getVoices();
  if (existing.length) return Promise.resolve(existing);
  return new Promise(resolve => {
    let settled = false;
    const started = Date.now();
    const finish = () => {
      if (settled) return;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length || Date.now() - started >= timeoutMs) {
        settled = true;
        window.speechSynthesis.removeEventListener("voiceschanged", finish);
        window.clearInterval(poll);
        resolve(voices);
      }
    };
    const poll = window.setInterval(finish, 250);
    window.speechSynthesis.addEventListener("voiceschanged", finish);
    finish();
  });
}

function chooseSpeechVoice(voices, appLanguage = speechLanguageCode()) {
  const normalised = voices.map(v => ({
    voice: v,
    code: String(v.lang || "").toLowerCase(),
    name: String(v.name || "").toLowerCase()
  }));
  if (appLanguage === "en") {
    return normalised.find(v => v.code === "en-za")?.voice
      || normalised.find(v => v.code.startsWith("en-za"))?.voice
      || normalised.find(v => v.code.startsWith("en-"))?.voice
      || normalised.find(v => v.code === "en")?.voice
      || null;
  }
  if (appLanguage === "af") {
    return normalised.find(v => v.code === "af-za")?.voice
      || normalised.find(v => v.code.startsWith("af"))?.voice
      || normalised.find(v => v.name.includes("afrikaans"))?.voice
      || null;
  }
  if (appLanguage === "xh") {
    return normalised.find(v => v.code === "xh-za")?.voice
      || normalised.find(v => v.code.startsWith("xh"))?.voice
      || normalised.find(v => v.name.includes("xhosa"))?.voice
      || null;
  }
  return null;
}

async function speakText(text, button, statusEl, idleKey) {
  if (button?.dataset.speaking === "true") {
    stopSpeech();
    setSpeechStatus(statusEl, tr("speechStopped"));
    return;
  }

  stopSpeech();
  setSpeechStatus(statusEl, "");

  if (!speechState.supported) {
    setSpeechStatus(statusEl, tr("speechUnavailable"));
    return;
  }

  const requestSession = ++speechState.session;
  button.disabled = true;
  setSpeechStatus(statusEl, tr("speechPreparing"));
  const voices = await waitForSpeechVoices();

  if (requestSession !== speechState.session) return;

  button.disabled = false;
  const voice = chooseSpeechVoice(voices);
  const appLanguage = speechLanguageCode();
  const allowEnglishDeviceFallback = appLanguage === "en";

  if (!voice && !allowEnglishDeviceFallback) {
    setSpeechStatus(statusEl, tr("speechUnavailable"));
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "en-ZA";
  }
  const speakingSession = ++speechState.session;

  button.dataset.idleKey = idleKey;
  button.dataset.speaking = "true";
  button.setAttribute("aria-pressed", "true");
  button.textContent = tr("stopReading");
  speechState.activeButton = button;
  setSpeechStatus(statusEl, tr("speaking"));

  const finish = (messageKey = "") => {
    if (speakingSession !== speechState.session) return;
    resetSpeechButton(button);
    speechState.activeButton = null;
    setSpeechStatus(statusEl, messageKey ? tr(messageKey) : "");
  };

  utterance.onend = () => finish();
  utterance.onerror = () => finish("speechError");
  window.speechSynthesis.speak(utterance);
}

function buildQuestionSpeech(txt) {
  return [
    txt.question,
    ...txt.options.map((option, index) => `${speechOptionLabel(index)}. ${option}`)
  ].join(". ");
}

const accessibilityToggle = document.getElementById("accessibilityToggle");
const accessibilityPanel = document.getElementById("accessibilityPanel");
accessibilityToggle.addEventListener("click", () => {
  const open = accessibilityPanel.classList.toggle("hidden") === false;
  accessibilityToggle.setAttribute("aria-expanded", String(open));
});

document.getElementById("contrastToggle").addEventListener("click", async () => {
  accessibilityState.highContrast = !accessibilityState.highContrast;
  applyAccessibilitySettings();
  await saveAccessibilitySettings();
});

document.getElementById("textSizeToggle").addEventListener("click", async () => {
  accessibilityState.largerText = !accessibilityState.largerText;
  applyAccessibilitySettings();
  await saveAccessibilitySettings();
});

function currentViewId() {
  return document.querySelector(".view.active")?.id || "homeView";
}
function showView(id) {
  stopSpeech();
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (accessibilityPanel && id !== "homeView") {
    accessibilityPanel.classList.add("hidden");
    accessibilityToggle.setAttribute("aria-expanded", "false");
  }
  if (id === "learnView") {
    updateStudyFocusUI();
    renderStudyGuide();
  }
  if (id === "practiceView") {
    updatePracticeFocusUI();
    renderPractice();
  }
  if (id === "weakView") renderWeak();
  if (id === "readyView") renderReady();
  if (id === "orientationView") renderOrientation();
  if (id === "mockView") resetMockLanding();
  refreshHome();
}
document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
document.querySelectorAll(".back").forEach(btn => btn.addEventListener("click", () => showView("homeView")));

async function changeLanguage(newLang) {
  stopSpeech();
  window.MLD_I18N.setLanguage(newLang);
  await dbSet("language", newLang);
  updateConnection();
  const view = currentViewId();
  if (view === "learnView") renderStudyGuide();
  if (view === "practiceView") renderPractice();
  if (view === "weakView") renderWeak();
  if (view === "readyView") renderReady();
  if (view === "orientationView") renderOrientation();
  if (view === "mockView") {
    if (state.mockQuestions.length && state.mockIndex < state.mockQuestions.length) runMock();
    else resetMockLanding();
  }
  updateAccessibilityControls();
  updatePathwayUI();
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
  const paths = ["data/questions/rules.json","data/questions/signs.json","data/questions/controls.json","data/questions/motorcycle.json","data/questions/completion-rules.json","data/questions/completion-signs.json","data/questions/completion-controls.json"];
  const responses = await Promise.all(paths.map(path => fetch(path)));
  const packs = await Promise.all(responses.map(res => {
    if (!res.ok) throw new Error("Question pack failed to load");
    return res.json();
  }));
  state.questions = packs.flatMap(pack => pack.items || []);
  if (state.questions.length !== 186) throw new Error("Expected 186 completion questions");
  if (!eligibleQuestions().length) throw new Error("No Code 2 pilot questions available");
}
function questionText(q) {
  return q.language?.[lang()] || q.language?.en || q;
}
function sectionLabel(section) {
  return section === "rules" ? tr("rules") : section === "signs" ? tr("signs") : tr("controls");
}
function shuffleArray(values) {
  const a = [...values];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderQuestion(q, container, onDone, metaText = tr("pilotQuestion")) {
  stopSpeech();
  const txt = questionText(q);
  const displayOptions = shuffleArray(txt.options.map((text, originalIndex) => ({text, originalIndex})));
  const speechTxt = {...txt, options: displayOptions.map(x => x.text)};
  const questionId = `question-${q.id}-${Math.random().toString(36).slice(2,8)}`;
  container.innerHTML = `
    <div class="question-card">
      <div class="question-meta">
        <span class="section-pill ${q.section}">${sectionLabel(q.section)}</span>
        <span class="question-count">${metaText}</span>
      </div>
      <h3 id="${questionId}">${txt.question}</h3>
      <div class="speech-row">
        <button class="speech-btn question-speech-btn" type="button" data-idle-key="readAloud" aria-pressed="false">${tr("readAloud")}</button>
        <span class="speech-status" role="status" aria-live="polite"></span>
      </div>
      <div id="answers" role="group" aria-labelledby="${questionId}"></div>
      <div id="feedback" role="status" aria-live="polite"></div>
    </div>`;
  const answers = container.querySelector("#answers");
  const questionSpeechButton = container.querySelector(".question-speech-btn");
  const questionSpeechStatus = container.querySelector(".speech-status");
  questionSpeechButton.onclick = () => speakText(
    buildQuestionSpeech(speechTxt),
    questionSpeechButton,
    questionSpeechStatus,
    "readAloud"
  );

  displayOptions.forEach((entry, displayIndex) => {
    const b = document.createElement("button");
    b.className = "answer-btn";
    b.dataset.originalIndex = String(entry.originalIndex);
    b.setAttribute("aria-pressed", "false");
    b.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + displayIndex)}</span><span>${entry.text}</span>`;
    b.onclick = () => {
      answers.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      const correct = entry.originalIndex === q.correct_index;
      if (correct) {
        b.classList.add("correct-answer");
        b.insertAdjacentHTML("beforeend", `<span class="answer-state">${tr("correctAnswer")}</span>`);
      } else {
        b.classList.add("wrong-answer");
        b.insertAdjacentHTML("beforeend", `<span class="answer-state">${tr("wrongAnswer")}</span>`);
        const correctButton = answers.querySelector(`button[data-original-index="${q.correct_index}"]`);
        if (correctButton) {
          correctButton.classList.add("correct-answer");
          correctButton.insertAdjacentHTML("beforeend", `<span class="answer-state">${tr("correctAnswer")}</span>`);
        }
      }
      b.setAttribute("aria-pressed", "true");
      stopSpeech();
      const feedbackBox = container.querySelector("#feedback");
      feedbackBox.innerHTML =
        `<div class="feedback ${correct ? "" : "bad"}"><strong>${correct ? tr("correct") : tr("notQuite")}</strong><br>${txt.explanation}</div>
         <div class="speech-row feedback-speech-row">
           <button class="speech-btn feedback-speech-btn" type="button" data-idle-key="readFeedback" aria-pressed="false">${tr("readFeedback")}</button>
           <span class="speech-status" role="status" aria-live="polite"></span>
         </div>`;
      const feedbackSpeechButton = feedbackBox.querySelector(".feedback-speech-btn");
      const feedbackSpeechStatus = feedbackBox.querySelector(".speech-status");
      feedbackSpeechButton.onclick = () => speakText(
        `${correct ? tr("correct") : tr("notQuite")}. ${txt.explanation}`,
        feedbackSpeechButton,
        feedbackSpeechStatus,
        "readFeedback"
      );
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

function updateStudyFocusUI() {
  document.querySelectorAll(".study-focus-btn").forEach(btn => {
    const active = btn.dataset.studySection === state.studySection;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function setStudySection(section) {
  if (!["rules","signs","controls"].includes(section)) return;
  if (state.studySection === section) return;
  stopSpeech();
  state.studySection = section;
  state.studyIndex = 0;
  updateStudyFocusUI();
  if (currentViewId() === "learnView") renderStudyGuide();
}

document.querySelectorAll(".study-focus-btn").forEach(btn => {
  btn.addEventListener("click", () => setStudySection(btn.dataset.studySection));
});

async function renderStudyGuide() {
  const box = document.getElementById("studyBox");
  if (!box) return;
  const pool = eligibleQuestions(state.studySection).slice().sort((a,b) => a.id.localeCompare(b.id, undefined, {numeric:true}));
  if (!pool.length) {
    box.innerHTML = `<div class="result-card status-warn"><div class="result-title">${tr("packUnavailable")}</div></div>`;
    return;
  }
  if (state.studyIndex >= pool.length) state.studyIndex = 0;
  if (state.studyIndex < 0) state.studyIndex = pool.length - 1;
  const q = pool[state.studyIndex];
  const txt = questionText(q);
  const correct = txt.options[q.correct_index];
  const key = pathwayKey(`studySeen:${state.studySection}`);
  const seen = await dbGet(key, []);
  if (!seen.includes(q.id)) {
    seen.push(q.id);
    await dbSet(key, seen);
  }
  const progress = `${seen.length}/${pool.length}`;
  box.innerHTML = `
    <div class="question-card">
      <div class="question-meta">
        <span class="section-pill ${q.section}">${sectionLabel(q.section)}</span>
        <span class="question-count">${tr("studyProgress")} ${progress}</span>
      </div>
      <h3>${txt.question}</h3>
      <div class="feedback">
        <strong>${tr("keyPoint")}</strong><br>${correct}
      </div>
      <div class="result-card status-info">
        <strong>${tr("whyItMatters")}</strong>
        <p>${txt.explanation}</p>
      </div>
      <div class="practice-focus-buttons">
        <button id="studyPrev" class="next-btn" type="button">${tr("previous")}</button>
        <button id="studyNext" class="next-btn" type="button">${tr("nextStudy")}</button>
      </div>
    </div>`;
  document.getElementById("studyPrev").onclick = () => { state.studyIndex--; renderStudyGuide(); };
  document.getElementById("studyNext").onclick = () => { state.studyIndex++; renderStudyGuide(); };
  refreshHome();
}
function updatePracticeFocusUI() {
  document.querySelectorAll(".practice-focus-btn").forEach(btn => {
    const active = btn.dataset.practiceSection === state.practiceSection;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function setPracticeSection(section) {
  if (!["all","rules","signs","controls"].includes(section)) return;
  if (state.practiceSection === section) return;
  stopSpeech();
  state.practiceSection = section;
  state.lastPracticeId = null;
  state.practiceQueue = [];
  updatePracticeFocusUI();
  if (currentViewId() === "practiceView") renderPractice();
}

document.querySelectorAll(".practice-focus-btn").forEach(btn => {
  btn.addEventListener("click", () => setPracticeSection(btn.dataset.practiceSection));
});

function shuffledPracticeIds(questions) {
  const ids = questions.map(q => q.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  if (ids.length > 1 && ids[ids.length - 1] === state.lastPracticeId) {
    [ids[0], ids[ids.length - 1]] = [ids[ids.length - 1], ids[0]];
  }
  return ids;
}

function choosePracticeQuestion() {
  const section = state.practiceSection === "all" ? null : state.practiceSection;
  const eligible = eligibleQuestions(section);
  if (!eligible.length) return null;

  const eligibleIds = new Set(eligible.map(q => q.id));
  state.practiceQueue = state.practiceQueue.filter(id => eligibleIds.has(id));

  if (!state.practiceQueue.length) {
    state.practiceQueue = shuffledPracticeIds(eligible);
  }

  const nextId = state.practiceQueue.pop();
  const q = eligible.find(item => item.id === nextId) || eligible[0];
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
    const stats = await dbGet(pathwayKey("practiceStats"), {total:0, correct:0, bySection:{}});
    stats.total++;
    if (correct) stats.correct++;
    stats.bySection[question.section] ??= {total:0, correct:0, seenIds:[]};
    stats.bySection[question.section].seenIds ??= [];
    stats.bySection[question.section].total++;
    if (correct) stats.bySection[question.section].correct++;
    if (!stats.bySection[question.section].seenIds.includes(question.id)) {
      stats.bySection[question.section].seenIds.push(question.id);
    }
    await dbSet(pathwayKey("practiceStats"), stats);
    const n = document.createElement("button");
    n.className = "next-btn"; n.textContent = tr("tryAnother"); n.onclick = renderPractice;
    box.appendChild(n); refreshHome();
  });
}
function sampleFromSection(section, count) {
  const pool = shuffleArray(eligibleQuestions(section));
  if (pool.length < count) throw new Error(`Not enough ${section} questions for 64-question practice simulation`);
  return pool.slice(0, count);
}
function buildMockSet() {
  return shuffleArray([
    ...sampleFromSection("rules", 28),
    ...sampleFromSection("signs", 28),
    ...sampleFromSection("controls", 8)
  ]);
}
const startMockButton = document.getElementById("startMock");
startMockButton.addEventListener("click", () => {
  state.mockQuestions = buildMockSet(); state.mockIndex = 0; state.mockScore = 0; state.mockAnswers = [];
  startMockButton.classList.add("hidden"); runMock();
});
function setStartMockLabel(key="startMock") {
  document.getElementById("startMockText").textContent = tr(key);
}
function resetMockLanding() {
  stopSpeech();
  document.getElementById("mockBox").innerHTML = "";
  startMockButton.classList.remove("hidden"); setStartMockLabel("startMock");
}
function renderMockQuestion(q, container, onDone, metaText, continueLabel) {
  stopSpeech();
  const txt = questionText(q);
  const displayOptions = shuffleArray(txt.options.map((text, originalIndex) => ({text, originalIndex})));
  const speechTxt = {...txt, options: displayOptions.map(x => x.text)};
  const questionId = `mock-${q.id}-${Math.random().toString(36).slice(2,8)}`;
  let selectedOriginalIndex = null;

  container.innerHTML = `
    <div class="question-card">
      <div class="question-meta">
        <span class="section-pill ${q.section}">${sectionLabel(q.section)}</span>
        <span class="question-count">${metaText}</span>
      </div>
      <h3 id="${questionId}">${txt.question}</h3>
      <div class="speech-row">
        <button class="speech-btn question-speech-btn" type="button" data-idle-key="readAloud" aria-pressed="false">${tr("readAloud")}</button>
        <span class="speech-status" role="status" aria-live="polite"></span>
      </div>
      <div id="answers" role="group" aria-labelledby="${questionId}"></div>
      <p class="small">${tr("mockChangeBeforeNext")}</p>
      <button id="mockContinue" class="next-btn" type="button" disabled>${continueLabel}</button>
    </div>`;

  const answers = container.querySelector("#answers");
  const continueButton = container.querySelector("#mockContinue");
  const questionSpeechButton = container.querySelector(".question-speech-btn");
  const questionSpeechStatus = container.querySelector(".speech-status");

  questionSpeechButton.onclick = () => speakText(
    buildQuestionSpeech(speechTxt),
    questionSpeechButton,
    questionSpeechStatus,
    "readAloud"
  );

  displayOptions.forEach((entry, displayIndex) => {
    const b = document.createElement("button");
    b.className = "answer-btn";
    b.dataset.originalIndex = String(entry.originalIndex);
    b.setAttribute("aria-pressed", "false");
    b.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + displayIndex)}</span><span>${entry.text}</span>`;
    b.onclick = () => {
      selectedOriginalIndex = entry.originalIndex;
      answers.querySelectorAll("button").forEach(x => {
        x.classList.remove("selected");
        x.setAttribute("aria-pressed", "false");
      });
      b.classList.add("selected");
      b.setAttribute("aria-pressed", "true");
      continueButton.disabled = false;
    };
    answers.appendChild(b);
  });

  continueButton.onclick = () => {
    if (selectedOriginalIndex === null) return;
    const correct = selectedOriginalIndex === q.correct_index;
    onDone(correct, q, selectedOriginalIndex);
  };
}

function runMock() {
  const box = document.getElementById("mockBox");
  if (state.mockIndex >= state.mockQuestions.length) { finishMock(); return; }
  const q = state.mockQuestions[state.mockIndex];
  const meta = lang() === "af" ? `VRAAG ${state.mockIndex+1} VAN ${state.mockQuestions.length}`
    : lang() === "xh" ? `UMBUZO ${state.mockIndex+1} KWA-${state.mockQuestions.length}`
    : `QUESTION ${state.mockIndex+1} OF ${state.mockQuestions.length}`;
  const continueLabel = state.mockIndex === state.mockQuestions.length - 1 ? tr("finish") : tr("next");

  renderMockQuestion(q, box, (correct, question, selectedIndex) => {
    if (correct) state.mockScore++;
    state.mockAnswers.push({section:question.section, question_id:question.id, correct, selected_index:selectedIndex});
    state.mockIndex++;
    runMock();
  }, meta, continueLabel);
}

async function finishMock() {
  stopSpeech();
  const box = document.getElementById("mockBox");
  const result = {date:new Date().toISOString(), score:state.mockScore, total:state.mockQuestions.length, answers:state.mockAnswers};
  const sectionScores = {
    rules: result.answers.filter(a=>a.section==="rules"&&a.correct).length,
    signs: result.answers.filter(a=>a.section==="signs"&&a.correct).length,
    controls: result.answers.filter(a=>a.section==="controls"&&a.correct).length
  };
  result.sectionScores = sectionScores;
  result.practiceTargetMet = sectionScores.rules >= 22 && sectionScores.signs >= 23 && sectionScores.controls >= 6;
  const history = await dbGet(pathwayKey("mockHistory"), []);
  history.unshift(result);
  await dbSet(pathwayKey("mockHistory"), history.slice(0,10));

  const pct = Math.round((result.score/result.total)*100);
  const resultText = lang() === "af" ? `Jy het ${pct}% korrek beantwoord in hierdie 64-vraag CLLT-styl oefensessie.`
    : lang() === "xh" ? `Uphendule ${pct}% ngokuchanekileyo kolu qheliselo lwe-CLLT olunemibuzo engama-64.`
    : `You answered ${pct}% correctly in this 64-question CLLT-style practice session.`;

  const wrongAnswers = result.answers.filter(a=>!a.correct);
  const reviewHtml = wrongAnswers.length ? `
    <div class="result-card status-info">
      <div class="result-title">${tr("reviewMistakes")} (${wrongAnswers.length})</div>
      ${wrongAnswers.map((answer, index) => {
        const q = state.questions.find(item=>item.id===answer.question_id);
        if (!q) return "";
        const txt = questionText(q);
        const selected = txt.options[answer.selected_index] ?? "";
        const correct = txt.options[q.correct_index] ?? "";
        return `<details class="review-item">
          <summary>${index+1}. ${txt.question}</summary>
          <p><strong>${tr("yourAnswer")}:</strong> ${selected}</p>
          <p><strong>${tr("correctAnswer")}:</strong> ${correct}</p>
          <p>${txt.explanation}</p>
        </details>`;
      }).join("")}
    </div>` : `<div class="result-card status-good"><strong>${tr("noMistakes")}</strong></div>`;

  box.innerHTML = `<div class="result-card ${result.practiceTargetMet?"status-good":"status-warn"}"><span class="screen-chip purple">${tr("mockComplete")}</span><div class="score-large">${result.score}/${result.total}</div><p>${resultText}</p><p><strong>${tr("rules")}:</strong> ${sectionScores.rules}/28 &nbsp; <strong>${tr("signs")}:</strong> ${sectionScores.signs}/28 &nbsp; <strong>${tr("controls")}:</strong> ${sectionScores.controls}/8</p><p><strong>${result.practiceTargetMet?tr("practiceTargetMet"):tr("practiceTargetNotMet")}</strong></p><p class="small">${tr("notOfficialScore")}</p></div>${reviewHtml}`;
  startMockButton.classList.remove("hidden");
  setStartMockLabel("startAnother");
  refreshHome();
}
async function renderWeak() {
  const box = document.getElementById("weakBox");
  const stats = await dbGet(pathwayKey("practiceStats"), {bySection:{}});
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
  const stats=await dbGet(pathwayKey("practiceStats"),{total:0,correct:0,bySection:{}});
  if(!stats.total){box.innerHTML=`<div class="result-card status-warn"><span class="screen-chip orange">${tr("nextStep")}</span><div class="result-title">${tr("notReady")}</div><p>${tr("completeOrientationPractice")}</p></div>`;return;}
  const pct=Math.round((stats.correct/stats.total)*100);
  const minimums={rules:28,signs:28,controls:8};
  const required=["rules","signs","controls"];
  const uniqueSeen=s=>stats.bySection?.[s]?.seenIds?.length||0;
  const coverageOK=required.every(s=>uniqueSeen(s)>=minimums[s]);
  const sectionOK=coverageOK&&required.every(s=>(stats.bySection[s].correct/stats.bySection[s].total)>=.85);
  const ready=orientationDone&&sectionOK;
  const coverageText=required.map(s=>`${sectionLabel(s)} ${uniqueSeen(s)}/${minimums[s]}`).join(" · ");
  box.innerHTML=`<div class="result-card ${ready?"status-good":"status-warn"}"><span class="screen-chip ${ready?"green":"orange"}">${ready?tr("readinessCheck"):tr("keepPractising")}</span><div class="result-title">${ready?tr("seriousMock"):tr("notReady")}</div><p><strong>${tr("practiceAccuracy")}</strong> ${pct}%</p><p><strong>${tr("uniqueCoverage")}:</strong> ${coverageText}</p><p><strong>${tr("orientation")}</strong> ${orientationDone?tr("complete"):tr("notComplete")}</p><p class="small">${tr("readinessNote")}</p></div>`;
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
  const stats=await dbGet(pathwayKey("practiceStats"),{total:0,correct:0});
  const mockHistory=await dbGet(pathwayKey("mockHistory"),[]);
  const studiedRules=(await dbGet(pathwayKey("studySeen:rules"),[])).length;
  const studiedSigns=(await dbGet(pathwayKey("studySeen:signs"),[])).length;
  const studiedControls=(await dbGet(pathwayKey("studySeen:controls"),[])).length;
  const studiedTotal=studiedRules+studiedSigns+studiedControls;
  const yesNo=orientationDone?tr("complete"):tr("notComplete");
  document.getElementById("homeProgress").textContent=`${pathwayLabel()} · ${tr("progressOrientation")}: ${yesNo} · ${tr("progressStudy")}: ${studiedTotal} · ${tr("progressPractice")}: ${stats.total||0} · ${tr("progressMocks")}: ${mockHistory.length}`;
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
document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeech(); });
window.addEventListener("pagehide", stopSpeech);

async function init(){
  await migrateLegacyProgress();
  const savedPathway=await dbGet("vehiclePathway","code2");
  state.activeVehicleGroup=["code1","code2"].includes(savedPathway)?savedPathway:"code2";
  const savedLanguage=await dbGet("language","en");
  window.MLD_I18N.setLanguage(savedLanguage);
  const savedAccessibility=await dbGet("accessibilitySettings",{highContrast:false,largerText:false});
  applyAccessibilitySettings(savedAccessibility);
  updatePathwayUI();
  updateConnection();
  try{await loadQuestions();await refreshHome();}catch(err){document.getElementById("homeProgress").textContent=tr("pilotLoadFail");}
  if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
}
init();