# PRE-RELEASE TAKEOVER READINESS

Project: Mzansi Learner Driver — CLLT Prep
Status: **TAKEOVER READY — GITHUB QA PASS**
Branch: `build-rules-signs-expansion-r6-github-only`
Production main: `3b0ae9074684d3ca0e7ee4bbdca136078f8933bd`
PR: #36 DRAFT
Netlify deployment during completion build: **0**

## 1. PURPOSE

This record is the single handover point for the completed GitHub-only learner-preparation build.

The PWA is designed to help prospective Code 1 and Code 2 learner drivers:
- study the official learner domains broadly;
- practise repeatedly offline;
- understand explanations, not only memorise answers;
- build touchscreen / digital-test confidence;
- identify weak areas;
- complete a 64-question CLLT-style practice session;
- prepare in English, Afrikaans and Xhosa architecture.

The project supports learner readiness and may support improved pass rates, but does not claim causal pass-rate improvement before pilot evidence exists.

## 2. QUESTION BANK

Repository bank: **186 unique questions**

Code 1:
- Rules: 57
- Signs / Signals / Markings: 86
- Controls: 16
- Eligible total: 159

Code 2:
- Rules: 60
- Signs / Signals / Markings: 86
- Controls: 16
- Eligible total: 162

## 3. LEARNER WORKFLOW

### Learn
- systematic offline study mode;
- Rules / Signs / Controls focus;
- key answer + explanation;
- local progress;
- saved study position per pathway and section.

### Practise
- no-repeat cycle before reuse;
- answer options randomised;
- immediate feedback;
- explanation after each answer;
- local unique-question exposure;
- pathway-separated progress.

### 64-question CLLT-style practice
- 28 Rules;
- 28 Signs / Signals / Markings;
- 8 Controls;
- randomly ordered;
- answer choice may be changed before Next;
- no immediate correctness reveal;
- result at the end;
- section scores;
- mistake review with selected answer, correct answer and explanation.

Published section practice targets are used only as training indicators:
- Rules 22/28
- Signs 23/28
- Controls 6/8

### Readiness
Requires:
- digital orientation;
- unique exposure to at least 28 Rules, 28 Signs and 8 Controls;
- at least 85% accumulated Practice accuracy in each section.

Readiness is not an official-result prediction.

## 4. VERIFIED SPEED-LIMIT BASELINE

- Urban public road: **60 km/h**
- Non-freeway public road outside an urban area: **100 km/h**
- Freeway: **120 km/h**

## 5. STATIC QA RESULTS

- app.js syntax: PASS
- i18n.js syntax: PASS
- Duplicate IDs: 0
- Exact duplicate English question stems: 0
- Schema errors: 0
- Missing i18n keys: 0
- Missing offline question packs: 0
- Numeric EN↔AF/Xhosa mismatches: 0
- Exact untranslated EN question/explanation fields detected: 0
- Translation-status violations: 0

## 6. LANGUAGE STATUS

English:
**SOURCE-MASTER / CONTENT QA PASS**

Afrikaans:
**FUNCTIONAL CONSISTENCY PRE-QA PASS — HUMAN LANGUAGE QA STILL REQUIRED**

Xhosa:
**FUNCTIONAL CONSISTENCY PRE-QA PASS — HUMAN LANGUAGE QA STILL REQUIRED**

This automated/pre-release consistency pass does NOT replace competent human language review.
Afrikaans and Xhosa remain formally:
**LANGUAGE_QA_PENDING**

## 7. OFFLINE / LOW-DATA CONTROL

- completion question files included in service-worker cache;
- local IndexedDB progress retained;
- no login required for core learning;
- no cloud or AI dependency for core practice;
- Code 1 / Code 2 separation retained;
- ordinary Android / low-data design retained.

Current held cache:
`mzansi-learner-driver-content-completion-qa1`

## 8. OFFICIAL-SIMULATOR BOUNDARY

The PWA does not claim verified official behaviour for:
- exact test duration;
- official Back / Next logic;
- official skip behaviour;
- official review screen;
- official answer-change rules;
- official timer;
- exact official section order or mixing.

The 64-question mode is explicitly CLLT-style learner practice.

## 9. PRODUCTION / DEPLOYMENT CONTROL

Production main is unchanged.

PR #36 remains:
- OPEN
- DRAFT
- DO NOT MERGE YET

Netlify:
**DO NOT DEPLOY UNTIL ONE CONSOLIDATED PHONE-ACCEPTANCE RUN IS AUTHORISED.**

When authorised, use one merge/deploy only, then test:
1. Study mode
2. Practice
3. 64-question Mock
4. Code 1 / Code 2 separation
5. EN / AF / Xhosa functional rendering
6. final offline relaunch
7. freeze the exact tested commit

## 10. TAKEOVER DECISION

**READY FOR IMMEDIATE CONTROLLED TAKEOVER INTO ONE CONSOLIDATED PHONE-ACCEPTANCE DEPLOYMENT WHEN AUTHORISED.**
