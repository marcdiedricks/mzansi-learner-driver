const state = {
  questions: [],
  mockIndex: 0,
  mockScore: 0,
  mockAnswers: [],
  orientationStep: 0
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
  refreshHome();
}

document.querySelectorAll("[data-view]").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});
document.querySelectorAll(".back").forEach(btn => btn.addEventListener("click", () => showView("homeView")));

function updateConnection() {
  const badge = document.getElementById("offlineBadge");
  badge.textContent = navigator.onLine ? "Online" : "Offline ready";
}
window.addEventListener("online", updateConnection);
window.addEventListener("offline", updateConnection);
updateConnection();

async function loadQuestions() {
  const res = await fetch("data/sample-questions.json");
  state.questions = await res.json();
}

function renderQuestion(q, container, onDone) {
  container.innerHTML = \`
    <div class="question-card">
      <p class="small">\${q.section.toUpperCase()} · SAMPLE</p>
      <h3>\${q.question}</h3>
      <div id="answers"></div>
      <div id="feedback"></div>
    </div>\`;
  const answers = container.querySelector("#answers");
  q.options.forEach((opt, idx) => {
    const b = document.createElement("button");
    b.className = "answer-btn";
    b.textContent = opt;
    b.onclick = () => {
      answers.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      const correct = idx === q.correct_index;
      const feedback = container.querySelector("#feedback");
      feedback.innerHTML = \`<div class="feedback"><strong>\${correct ? "Correct" : "Not correct"}</strong><br>\${q.explanation}</div>\`;
      onDone(correct, q);
      answers.querySelectorAll("button").forEach(x => x.disabled = true);
    };
    answers.appendChild(b);
  });
}

async function renderPractice() {
  const box = document.getElementById("practiceBox");
  const q = state.questions[Math.floor(Math.random() * state.questions.length)];
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
  });
}

document.getElementById("startMock").addEventListener("click", () => {
  state.mockIndex = 0;
  state.mockScore = 0;
  state.mockAnswers = [];
  runMock();
});

function runMock() {
  const box = document.getElementById("mockBox");
  if (state.mockIndex >= state.questions.length) {
    finishMock();
    return;
  }
  const q = state.questions[state.mockIndex];
  renderQuestion(q, box, (correct, question) => {
    if (correct) state.mockScore++;
    state.mockAnswers.push({section: question.section, correct});
    const n = document.createElement("button");
    n.className = "next-btn";
    n.textContent = state.mockIndex === state.questions.length - 1 ? "Finish" : "Next";
    n.onclick = () => {
      state.mockIndex++;
      runMock();
    };
    box.appendChild(n);
  });
}

async function finishMock() {
  const box = document.getElementById("mockBox");
  const result = {
    date: new Date().toISOString(),
    score: state.mockScore,
    total: state.questions.length,
    answers: state.mockAnswers
  };
  const history = await dbGet("mockHistory", []);
  history.unshift(result);
  await dbSet("mockHistory", history.slice(0, 10));
  box.innerHTML = \`<div class="result-card"><h3>Mock complete</h3><p>You scored \${result.score}/\${result.total}.</p><p class="small">This is a sample proof build, not an official CLLT score.</p></div>\`;
  refreshHome();
}

async function renderWeak() {
  const box = document.getElementById("weakBox");
  const stats = await dbGet("practiceStats", {bySection:{}});
  const rows = Object.entries(stats.bySection || {});
  if (!rows.length) {
    box.innerHTML = \`<div class="result-card"><p>No weak areas yet. Complete some practice questions first.</p></div>\`;
    return;
  }
  rows.sort((a,b) => (a[1].correct/a[1].total) - (b[1].correct/b[1].total));
  box.innerHTML = rows.map(([section,s]) => {
    const pct = Math.round((s.correct/s.total)*100);
    return \`<div class="result-card"><strong>\${section}</strong><p>\${pct}% correct in practice.</p></div>\`;
  }).join("");
}

async function renderReady() {
  const box = document.getElementById("readyBox");
  const orientationDone = await dbGet("orientationDone", false);
  const stats = await dbGet("practiceStats", {total:0, correct:0, bySection:{}});
  if (!stats.total) {
    box.innerHTML = \`<div class="result-card"><strong>NOT READY YET</strong><p>Complete the digital orientation and some practice first.</p></div>\`;
    return;
  }
  const pct = Math.round((stats.correct/stats.total)*100);
  const sectionOK = Object.values(stats.bySection).every(s => (s.correct/s.total) >= .85);
  const ready = orientationDone && sectionOK && stats.total >= 6;
  box.innerHTML = \`<div class="result-card"><strong>\${ready ? "READY FOR MORE SERIOUS MOCKING" : "NOT READY YET"}</strong>
    <p>Practice accuracy: \${pct}%</p>
    <p>Computer test orientation: \${orientationDone ? "Complete" : "Not complete"}</p>
    <p class="small">This readiness message is a training indicator, not an official prediction of your test result.</p></div>\`;
}

async function renderOrientation() {
  const box = document.getElementById("orientationBox");
  const done = await dbGet("orientationDone", false);
  if (done) {
    box.innerHTML = \`<div class="result-card"><strong>Orientation complete.</strong><p>You can repeat it at any time.</p><button id="repeatOrientation" class="next-btn">Repeat orientation</button></div>\`;
    document.getElementById("repeatOrientation").onclick = () => { state.orientationStep = 0; runOrientationStep(); };
    return;
  }
  state.orientationStep = 0;
  runOrientationStep();
}

function runOrientationStep() {
  const box = document.getElementById("orientationBox");
  const steps = [
    {
      html: \`<div class="question-card"><h3>Step 1 of 3</h3><p>Tap the large button below.</p><button id="oriAction" class="next-btn">Tap me</button></div>\`,
      bind: () => document.getElementById("oriAction").onclick = nextOrientation
    },
    {
      html: \`<div class="question-card"><h3>Step 2 of 3</h3><p>Select one answer, then change your selection before continuing.</p>
        <button class="answer-btn oriChoice">Answer A</button><button class="answer-btn oriChoice">Answer B</button>
        <button id="oriNext" class="next-btn" disabled>Next</button></div>\`,
      bind: () => {
        let count = 0, last = null;
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
      html: \`<div class="question-card"><h3>Step 3 of 3</h3><p>Read the screen carefully and tap <strong>Finish</strong>.</p><button id="oriFinish" class="next-btn">Finish</button></div>\`,
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
    \`<div class="result-card"><strong>Computer test orientation complete.</strong><p>You have practised selecting and changing an answer and moving to the next screen.</p></div>\`;
  refreshHome();
}

async function refreshHome() {
  const orientationDone = await dbGet("orientationDone", false);
  const stats = await dbGet("practiceStats", {total:0, correct:0});
  const mockHistory = await dbGet("mockHistory", []);
  const parts = [];
  parts.push(\`Computer orientation: \${orientationDone ? "complete" : "not complete"}\`);
  parts.push(\`Practice questions: \${stats.total || 0}\`);
  parts.push(\`Mock tests: \${mockHistory.length}\`);
  document.getElementById("homeProgress").textContent = parts.join(" · ");
}

async function init() {
  try {
    await loadQuestions();
    await refreshHome();
  } catch (err) {
    document.getElementById("homeProgress").textContent = "App content could not load.";
  }
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}
init();
