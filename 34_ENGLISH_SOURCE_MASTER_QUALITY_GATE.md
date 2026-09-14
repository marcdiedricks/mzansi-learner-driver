# ENGLISH SOURCE-MASTER QUALITY GATE

Project: Mzansi Learner Driver — CLLT Prep  
Status: **ENGLISH SOURCE-MASTER — PASS**  
Branch: `build-rules-signs-expansion-r6-github-only`  
Production: **UNCHANGED**  
Netlify: **NOT DEPLOYED**

## 1. PURPOSE

This gate closes the English content and learner-workflow QA for the held Content Completion Build.

The English bank must:
- remain grounded in approved official/public learner sources;
- use one clear best answer;
- avoid trick wording for its own sake;
- teach through explanations;
- cover the material Code 1 / Code 2 learner-study subject families;
- support repeated offline use;
- prepare learners for digital question interaction without claiming unverified official CLLT behaviour.

## 2. FACTUAL CORRECTION FOUND DURING QA

The older pilot baseline contained two incorrect general speed-limit answers.

Correct official general limits:
- urban public road: **60 km/h**
- non-freeway public road outside an urban area: **100 km/h**
- freeway: **120 km/h**

Corrected:
- `rules-002` → 100 km/h
- `rules-003` → 120 km/h

The source remains SRC-006, NaTIS Rules of the Road §6.27.

## 3. FINAL BANK

Repository total: **186 unique questions**

### Code 1
- Rules: 57
- Signs / Signals / Markings: 86
- Controls: 16
- Eligible total: 159

### Code 2
- Rules: 60
- Signs / Signals / Markings: 86
- Controls: 16
- Eligible total: 162

## 4. CONTENT QA RESULTS

- Duplicate IDs: 0
- Exact duplicate English question stems: 0
- Schema errors: 0
- Missing source IDs / source locators: 0
- Missing language objects: 0
- Blank / duplicate answer-option errors: 0
- Near-duplicate review: PASS

Intentional near-pairs retained because they teach distinct knowledge:
- front brake vs rear brake;
- separate parking-distance restrictions;
- different warning-sign meanings;
- red vs green traffic-signal behaviour.

Simple recognition questions were intentionally retained where direct recognition is the learning objective. They were not rewritten into artificial trick questions.

## 5. LEARN — COMPLETE OFFLINE STUDY MODE

The Learn area now provides systematic offline study for:
- Rules;
- Signs / Signals / Markings;
- Controls.

For each study point the learner sees:
- the learner-facing question;
- the correct key point;
- the explanation;
- section progress.

Study position and studied-item progress are stored locally per pathway and section.

## 6. PRACTISE — TEACHING MODE

Practice retains:
- section focus;
- no-repeat cycle before questions repeat;
- randomised answer-option order;
- immediate correct / incorrect feedback;
- explanation after each answer;
- local progress;
- unique-question exposure tracking;
- pathway separation.

## 7. 64-QUESTION CLLT-STYLE PRACTICE

The Mock area now generates:
- 28 Rules;
- 28 Signs / Signals / Markings;
- 8 Controls;
- 64 total unique questions per session.

The full 64-question set is randomly ordered.

During the session:
- answer options are randomised;
- the learner selects one answer;
- the learner may change the selection before tapping Next;
- correctness is NOT revealed immediately.

At the end:
- overall score is shown;
- section scores are shown;
- published section practice targets are checked:
  - Rules 22/28
  - Signs 23/28
  - Controls 6/8
- incorrect answers can be reviewed with:
  - learner's selected answer;
  - correct answer;
  - explanation.

This is deliberately labelled CLLT-style practice, not an exact official simulator.

## 8. READINESS

Readiness now requires:
- digital orientation completed;
- unique question exposure of at least:
  - 28 Rules;
  - 28 Signs;
  - 8 Controls;
- at least 85% accumulated practice accuracy in each section.

Using unique exposure prevents a learner from appearing ready simply by repeating a small number of questions.

Readiness remains a training indicator, not a guarantee or official prediction.

## 9. DIGITAL CONFIDENCE BOUNDARY

The app prepares learners for:
- touchscreen / computer-style answering;
- selecting an answer;
- changing a selection before continuing in this practice app;
- moving question by question;
- randomised question and answer order;
- completing a 64-question digital practice session;
- reviewing mistakes after completion.

The app does NOT claim verified official behaviour for:
- exact test duration;
- official Back / Next logic;
- official skip behaviour;
- official review-screen behaviour;
- official answer-change rules;
- official timer;
- exact official section order or mixing.

## 10. TECHNICAL STATIC QA

- app.js syntax: PASS
- i18n.js syntax: PASS
- missing i18n keys: 0
- completion question files missing from offline cache: 0
- Practice no-repeat logic present: PASS
- answer randomisation present: PASS
- Study position persistence present: PASS
- 64-question mock capacity Code 1: PASS
- 64-question mock capacity Code 2: PASS
- mistake review present: PASS
- unique-coverage readiness present: PASS

Offline cache:
`mzansi-learner-driver-content-completion-qa1`

## 11. LANGUAGE STATUS

English:
**SOURCE-MASTER / CONTENT QA PASS**

Afrikaans:
**LANGUAGE_QA_PENDING**

Xhosa:
**LANGUAGE_QA_PENDING**

Do not describe Afrikaans or Xhosa as human-approved until competent language reviewers complete the language gate.

## 12. DEPLOYMENT LOCK

Production main remains:
`3b0ae9074684d3ca0e7ee4bbdca136078f8933bd`

PR #36 remains:
- OPEN
- DRAFT
- DO NOT MERGE
- DO NOT DEPLOY

Netlify deployments for this completion build:
**0**

## 13. RESULT

**ENGLISH SOURCE-MASTER QUALITY GATE — PASS**

The held build is now ready for the remaining pre-release language-review gate and later one-time consolidated phone acceptance when explicitly authorised.
