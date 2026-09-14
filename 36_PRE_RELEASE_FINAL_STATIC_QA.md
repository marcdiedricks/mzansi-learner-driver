# PRE-RELEASE GITHUB QA STATUS

Project: **Mzansi Learner Driver — CLLT Prep**  
Date: **14 September 2026**  
Held branch: `build-rules-signs-expansion-r6-github-only`  
Pull Request: **#36 — OPEN / DRAFT / DO NOT MERGE**  
Production main baseline: `3b0ae9074684d3ca0e7ee4bbdca136078f8933bd`  
Netlify: **DO NOT DEPLOY**

## Overall status

**GITHUB COMPLETION BUILD READY FOR CONSOLIDATED PHONE ACCEPTANCE**

This status means the held GitHub build has completed the requested automated/static pre-release QA. It does **not** mean Afrikaans or Xhosa has been human-approved, and it does **not** claim the app reproduces every operational detail of the official CLLT.

## 1. Question-bank completion

- Total repository bank: **186 unique questions**
- Duplicate IDs: **0**
- Exact duplicate English question stems: **0**
- Schema/data errors: **0**
- Blank learner-facing question/option/explanation fields: **0**
- Correct-answer indexes outside the permitted range: **0**
- English source-master: **CONTENT QA PASS**

### Code 1 — Motorcycle eligibility

- Rules: **57**
- Signs / Signals / Markings: **86**
- Controls: **16**
- Eligible total: **159**

### Code 2 — Light Motor Vehicle eligibility

- Rules: **60**
- Signs / Signals / Markings: **86**
- Controls: **16**
- Eligible total: **162**

Both pathways have enough eligible content for a 64-question practice session using **28 Rules + 28 Signs + 8 Controls**.

## 2. Speed-limit regression lock

The three corrected general speed-limit items remain locked and aligned in English, Afrikaans and Xhosa:

- Urban public road: **60 km/h**
- Non-freeway road outside an urban area: **100 km/h**
- Freeway: **120 km/h**

No regression detected.

## 3. Afrikaans / Xhosa automated consistency pre-QA

Full bank checked: **186 questions**

Results:

- Afrikaans language object present on every question: **PASS**
- Xhosa language object present on every question: **PASS**
- Three aligned answer options per language: **PASS**
- Shared correct-answer index valid: **PASS**
- Numeric values across questions, options and explanations: **0 mismatches**
- Exact untranslated English question/explanation fields: **0**
- Afrikaans status on all items: **LANGUAGE_QA_PENDING**
- Xhosa status on all items: **LANGUAGE_QA_PENDING**

### Interface-language correction completed during this pass

A real pre-release defect was found: six learner-facing learning-support interface keys existed only in English and therefore fell back to English in Afrikaans and Xhosa.

The missing keys were:

- Road-Use Application title + description
- Digital Test Confidence title + description
- Offline Repetition title + description

They were added on the held branch.

Final interface key counts:

- English: **162 / 162**
- Afrikaans: **162 / 162**
- Xhosa: **162 / 162**
- Missing learner-facing translation keys: **0**

**Important:** this remains machine/static consistency pre-QA only. Competent human Afrikaans and Xhosa review is still mandatory before either language can be described as formally approved.

## 4. Source / coverage control

Primary learner-manual coverage remains centred on:

- `SRC-006` Rules of the Road
- `SRC-007` Road Traffic Signs / Signals / Markings
- `SRC-008` Vehicle Controls / Components

The bank also contains two source-verified learner-law/support items:

- `SRC-001`: Western Cape learner-motorcycle passenger rule
- `SRC-011`: National Road Traffic Regulations protective-helmet rule

Heavy/commercial-only Code 3 content is not included in Code 1 / Code 2 eligibility.

## 5. Learn / Practise / Mock / Readiness logic QA

### Learn

- Uses the active Code 1 / Code 2 eligible bank: **PASS**
- Rules / Signs / Controls study focus: **PASS**
- Correct key point shown with explanation: **PASS**
- Study position stored locally by pathway + section: **PASS**
- Unique study exposure stored locally: **PASS**

### Practise

- All / Rules / Signs / Controls focus: **PASS**
- No-repeat queue before cycling: **PASS**
- Answer-position randomisation: **PASS**
- Immediate teaching feedback: **PASS**
- Explanation after answering: **PASS**
- Unique-question exposure tracking: **PASS**
- Code 1 / Code 2 progress separation: **PASS**

### 64-question CLLT-style practice

- Composition: **28 Rules + 28 Signs + 8 Controls**
- Whole-session question randomisation: **PASS**
- Answer-position randomisation: **PASS**
- Learner can change a selected answer before Next: **PASS**
- Correctness not revealed immediately: **PASS**
- Score shown after completion: **PASS**
- Section results: **PASS**
- Mistake review includes learner answer, correct answer and explanation: **PASS**
- Training targets remain **22/28 Rules, 23/28 Signs, 6/8 Controls**

These are learner-training indicators only.

### Readiness

Readiness logic remains:

- digital orientation completed;
- at least **28 unique Rules**;
- at least **28 unique Signs**;
- at least **8 unique Controls**;
- at least **85% accumulated practice accuracy in each section**.

Static logic check: **PASS**

This remains a learner-training indicator, not an official pass prediction.

## 6. Offline / low-data QA

Question packs loaded by `app.js`: **7**

Question packs cached by `sw.js`: **7**

Missing question packs from service-worker cache: **0**

All explicitly cached application assets checked on the held branch: **present**

Cache version: `mzansi-learner-driver-content-completion-qa1`

Core learning remains local-first and no login/authentication is required for the core learner workflow.

## 7. Static technical QA

- `app.js` syntax: **PASS**
- `i18n.js` syntax: **PASS**
- `sw.js` syntax: **PASS**
- App expected-bank guard: **186**
- Missing interface translation keys: **0**
- Code 1 eligibility capacity: **PASS**
- Code 2 eligibility capacity: **PASS**
- Offline question-pack parity: **PASS**
- Duplicate IDs: **0**
- Exact duplicate English stems: **0**

## 8. Release control

- Production `main` must remain frozen at `3b0ae9074684d3ca0e7ee4bbdca136078f8933bd`.
- PR #36 must remain **OPEN**.
- PR #36 must remain **DRAFT**.
- **DO NOT MERGE TO MAIN.**
- **DO NOT DEPLOY TO NETLIFY.**
- No production deployment is authorised by this QA status.

## 9. Remaining gates

1. Competent human Afrikaans review.
2. Competent human Xhosa review.
3. One consolidated real-phone acceptance deployment only after explicit approval.
4. Production merge/deployment only after that acceptance result is satisfactory.

GitHub static completion is therefore finished and held for the next authorised acceptance step.
