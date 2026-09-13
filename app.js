const state = {
  questions: [],
  mockQuestions: [],
  mockIndex: 0,
  mockScore: 0,
  mockAnswers: [],
  orientationStep: 0,
  lastPracticeId: null
};

const DB_NAME = "mzansiLearnerDriverDB";
const STORE = "progress";

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
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result ?? fallback);
    req.onerror = () => resolve(fallback);
  });
}

async function dbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = resolve;
  });
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

document.querySelectorAll("[data-view]").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});
document.querySelectorAll(".back").forEach(btn => btn.addEventListener("click", () => showView("homeView")));

function updateConnection() {
  const badge = document.getElementById("offlineBadge");
  badge.textContent = navigator.onLine ? "● Online" : "● Offline ready";
}
window.addEventListener("online", updateConnection);
window.addEventListener("offline", updateConnection);
updateConnection();

async function loadQuestions() {
  const paths = [
    "data/questions/rules.json",
    "data/questions/signs.json",
    "data/questions/controls.json"
  ];
  const responses = await Promise.all(paths.map(path => fetch(path)));
  const packs = await Promise.all(responses.map(res => {
    if (!res.ok) throw new Error("Question pack failed to load");
    return res.json();
  }));
  state.questions = packs.flatMap(pack => pack.items || []);
  if (state.questions.length !== 25) {
    throw new Error("Expected 25 pilot questions");
  }
}

function getEnglish(q) {
  return q.language?.en || q;
}

function renderQuestion(q, container, onDone, metaText = "PILOT QUESTION") {
  const en = getEnglish(q);
  const sectionLabel = q.section === "rules" ? "RULES" : q.section === "signs" ? "SIGNS" : "CONTROLS";
  container.innerHTML = `
    <div class="question-card">
      <div class="question-meta">
        <span class="section-pill ${q.section}">${sectionLabel}</span>
        <span class="question-count">${metaText}</span>
      </div>
      <h3>${en.question}</h3>
      <div id="answers"></div>
      <div id="feedback"></div>
    </div>`;

  const answers = container.querySelector("#answers");

  en.options.forEach((opt, idx) => {
    const b = document.createElement("button");
    b.className = "answer-btn";
    b.dataset.index = String(idx);
    const letter = String.fromCharCode(65 + idx);
    b.innerHTML = `<span class="option-letter">${letter}</span><span>${opt}</span>`;

    b.onclick = () => {
      answers.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");

      const correct = idx === q.correct_index;
      const feedback = container.querySelector("#feedback");

      if (correct) {
        b.classList.add("correct-answer");
      } else {
        b.classList.add("wrong-answer");
        const correctButton = answers.querySelector(`button[data-index="${q.correct_index}"]`);
        if (correctButton) correctButton.classList.add("correct-answer");
      }

      feedback.innerHTML = `<div class="feedback ${correct ? "" : "bad"}"><strong>${correct ? "Correct" : "Not quite"}</strong><br>${en.explanation}</div>`;
      onDone(correct, q);
      answers.querySelectorAll("button").forEach(x => x.disabled = true);
    };

    answers.appendChild(b);
  });
}

function choosePracticeQuestion() {
  const candidates = state.questions.filter(q => q.id !== state.lastPracticeId);
  const pool = candidates.length ? candidates : state.questions;
  const q = pool[Math.floor(Math.random() * pool.length)];
  state.lastPracticeId = q.id;
  return q;
}

async function renderPractice() {
  const box = document.getElementById("practiceBox");

  if (!state.questions.length) {
    box.innerHTML = '<div class="result-card status-warn"><div class="result-title">Question pack unavailable</div><p>Please reopen the app after the content pack has loaded once.</p></div>';
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
    n.className = "next-btn";
    n.textContent = "Try another";
    n.onclick = renderPractice;
    box.appendChild(n);
    refreshHome();
  });
}

function randomFromSection(section) {
  const pool = state.questions.filter(q => q.section === section);
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildMockSet() {
  return ["rules","signs","controls"].map(randomFromSection);
}

const startMockButton = document.getElementById("startMock");

startMockButton.addEventListener("click", () => {
  state.mockQuestions = buildMockSet();
  state.mockIndex = 0;
  state.mockScore = 0;
  state.mockAnswers = [];
  startMockButton.classList.add("hidden");
  runMock();
});

function resetMockLanding() {
  const box = document.getElementById("mockBox");
  box.innerHTML = "";
  startMockButton.classList.remove("hidden");
  startMockButton.innerHTML = 'Start 3-question mock <span>→</span>';
}

function runMock() {
  const box = document.getElementById("mockBox");

  if (state.mockIndex >= state.mockQuestions.length) {
    finishMock();
    return;
  }

  const q = state.mockQuestions[state.mockIndex];
  const meta = `QUESTION ${state.mockIndex + 1} OF ${state.mockQuestions.length}`;

  renderQuestion(q, box, (correct, question) => {
    if (correct) state.mockScore++;
    state.mockAnswers.push({section: question.section, question_id: question.id, correct});

    const n = document.createElement("button");
    n.className = "next-btn";
    n.textContent = state.mockIndex === state.mockQuestions.length - 1 ? "Finish" : "Next";
    n.onclick = () => {
      state.mockIndex++;
      runMock();
    };
    box.appendChild(n);
  }, meta);
}

async function finishMock() {
  const box = document.getElementById("mockBox");
  const result = {
    date: new Date().toISOString(),
    score: state.mockScore,
    total: state.mockQuestions.length,
    answers: state.mockAnswers
  };

  const history = await dbGet("mockHistory", []);
  history.unshift(result);
  await dbSet("mockHistory", history.slice(0, 10));

  const pct = Math.round((result.score / result.total) * 100);
  box.innerHTML = `<div class="result-card status-info"><span class="screen-chip purple">MOCK COMPLETE</span><div class="score-large">${result.score}/${result.total}</div><p>You answered ${pct}% correctly in this CLLT-style pilot mock.</p><p class="small">This is preparation, not an official CLLT score.</p></div>`;

  startMockButton.classList.remove("hidden");
  startMockButton.innerHTML = 'Start another 3-question mock <span>→</span>';
  refreshHome();
}

async function renderWeak() {
  const box = document.getElementById("weakBox");
  const stats = await dbGet("practiceStats", {bySection:{}});
  const rows = Object.entries(stats.bySection || {});

  if (!rows.length) {
    box.innerHTML = '<div class="result-card status-info"><div class="result-title">Nothing to show yet</div><p>Complete some practice questions first. Your weaker areas will appear here.</p></div>';
    return;
  }

  rows.sort((a,b) => (a[1].correct/a[1].total) - (b[1].correct/b[1].total));

  box.innerHTML = rows.map(([section,s]) => {
    const pct = Math.round((s.correct/s.total)*100);
    const statusClass = pct >= 85 ? "status-good" : "status-warn";
    return `<div class="result-card ${statusClass}"><div class="result-title">${section.charAt(0).toUpperCase() + section.slice(1)}</div><p><strong>${pct}%</strong> correct in practice.</p></div>`;
  }).join("");
}

async function renderReady() {
  const box = document.getElementById("readyBox");
  const orientationDone = await dbGet("orientationDone", false);
  const stats = await dbGet("practiceStats", {total:0, correct:0, bySection:{}});

  if (!stats.total) {
    box.innerHTML = '<div class="result-card status-warn"><span class="screen-chip orange">NEXT STEP</span><div class="result-title">Not ready yet</div><p>Complete the digital orientation and some practice first.</p></div>';
    return;
  }

  const pct = Math.round((stats.correct/stats.total)*100);
  const requiredSections = ["rules","signs","controls"];
  const allSectionsPresent = requiredSections.every(section => stats.bySection?.[section]?.total > 0);
  const sectionOK = allSectionsPresent && requiredSections.every(section => {
    const s = stats.bySection[section];
    return (s.correct/s.total) >= .85;
  });

  const ready = orientationDone && sectionOK && stats.total >= 6;

  box.innerHTML = `<div class="result-card ${ready ? "status-good" : "status-warn"}"><span class="screen-chip ${ready ? "green" : "orange"}">${ready ? "READINESS CHECK" : "KEEP PRACTISING"}</span>
    <div class="result-title">${ready ? "Ready for more serious mock practice" : "Not ready yet"}</div>
    <p><strong>Practice accuracy:</strong> ${pct}%</p>
    <p><strong>All three sections practised:</strong> ${allSectionsPresent ? "Yes" : "Not yet"}</p>
    <p><strong>Computer test orientation:</strong> ${orientationDone ? "Complete" : "Not complete"}</p>
    <p class="small">This readiness message is a training indicator, not an official prediction of your test result.</p></div>`;
}

async function renderOrientation() {
  const box = document.getElementById("orientationBox");
  const done = await dbGet("orientationDone", false);

  if (done) {
    box.innerHTML = '<div class="result-card status-good"><span class="screen-chip green">COMPLETE</span><div class="result-title">Digital orientation complete</div><p>You can repeat it at any time.</p><button id="repeatOrientation" class="next-btn">Repeat orientation</button></div>';
    document.getElementById("repeatOrientation").onclick = () => {
      state.orientationStep = 0;
      runOrientationStep();
    };
    return;
  }

  state.orientationStep = 0;
  runOrientationStep();
}

function runOrientationStep() {
  const box = document.getElementById("orientationBox");
  const steps = [
    {
      html: '<div class="orientation-steps"><span class="active"></span><span></span><span></span></div><div class="question-card orientation-card"><span class="screen-chip gold">STEP 1 OF 3</span><h3>Tap a button</h3><p>Tap the large button below, just as you would on a test screen.</p><button id="oriAction" class="next-btn">Tap me</button></div>',
      bind: () => document.getElementById("oriAction").onclick = nextOrientation
    },
    {
      html: '<div class="orientation-steps"><span class="active"></span><span class="active"></span><span></span></div><div class="question-card orientation-card"><span class="screen-chip gold">STEP 2 OF 3</span><h3>Select and change an answer</h3><p>Select one answer, then change your selection before continuing.</p><button class="answer-btn oriChoice"><span class="option-letter">A</span><span>Answer A</span></button><button class="answer-btn oriChoice"><span class="option-letter">B</span><span>Answer B</span></button><button id="oriNext" class="next-btn" disabled>Next</button></div>',
      bind: () => {
        let count = 0;
        let last = null;
        document.querySelectorAll(".oriChoice").forEach(b => b.onclick = () => {
          document.querySelectorAll(".oriChoice").forEach(x => x.classList.remove("selected"));
          b.classList.add("selected");
          if (last !== b) count++;
          last = b;
          if (count >= 2) document.getElementById("oriNext").disabled = false;
        });
        document.getElementById("oriNext").onclick = nextOrientation;
      }
    },
    {
      html: '<div class="orientation-steps"><span class="active"></span><span class="active"></span><span class="active"></span></div><div class="question-card orientation-card"><span class="screen-chip gold">STEP 3 OF 3</span><h3>Finish the screen</h3><p>Read the screen carefully and tap <strong>Finish</strong>.</p><button id="oriFinish" class="next-btn">Finish</button></div>',
      bind: () => document.getElementById("oriFinish").onclick = finishOrientation
    }
  ];

  const step = steps[state.orientationStep];
  box.innerHTML = step.html;
  step.bind();
}

function nextOrientation() {
  state.orientationStep++;
  runOrientationStep();
}

async function finishOrientation() {
  await dbSet("orientationDone", true);
  document.getElementById("orientationBox").innerHTML =
    '<div class="result-card status-good"><span class="screen-chip green">COMPLETE</span><div class="result-title">Computer test orientation complete</div><p>You have practised selecting and changing an answer and moving to the next screen.</p></div>';
  refreshHome();
}

async function refreshHome() {
  const orientationDone = await dbGet("orientationDone", false);
  const stats = await dbGet("practiceStats", {total:0, correct:0});
  const mockHistory = await dbGet("mockHistory", []);

  const parts = [];
  parts.push(`Computer orientation: ${orientationDone ? "complete" : "not complete"}`);
  parts.push(`Practice questions: ${stats.total || 0}`);
  parts.push(`Mock tests: ${mockHistory.length}`);

  document.getElementById("homeProgress").textContent = parts.join(" · ");
}

async function init() {
  try {
    await loadQuestions();
    await refreshHome();
  } catch (err) {
    document.getElementById("homeProgress").textContent = "Pilot question pack could not load.";
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
