# AFRIKAANS + XHOSA — FULL-BANK PRE-QA REPORT

Project: Mzansi Learner Driver — CLLT Prep  
Status: **MACHINE / STRUCTURAL PRE-QA PASS — HUMAN LANGUAGE QA STILL REQUIRED**  
Bank reviewed: **186 questions**

## 1. WHAT THIS PASS CONFIRMS

Across the full 186-question bank:

- Afrikaans object present on every question: PASS
- Xhosa object present on every question: PASS
- Three answer options present per language: PASS
- Correct-answer index aligned across EN / AF / Xhosa: PASS
- Explanation present per language: PASS
- Legal numbers / speeds / distances / percentages consistent with English source-master: PASS
- Numeric mismatches found: **0**
- AF translation status on all items: **LANGUAGE_QA_PENDING**
- Xhosa translation status on all items: **LANGUAGE_QA_PENDING**

This confirms structural consistency only.

It does **not** constitute human language approval.

## 2. HUMAN REVIEW MUST STILL CONFIRM

For every learner-facing item, a competent Afrikaans / Xhosa reviewer must confirm:

- natural learner-friendly wording;
- legal meaning preserved;
- technical terms understandable in South African learner-driver context;
- correct answer remains clearly best;
- wrong options remain plausible but unambiguous;
- explanations remain accurate;
- borrowed / code-switched technical words are acceptable;
- terminology is consistent across Rules, Signs, Signals, Markings and Controls.

## 3. HIGH-RISK TERMINOLOGY FAMILIES

Human review should prioritise:

- speed-limit language;
- following distance;
- overtaking;
- stopping / parking restrictions;
- traffic circles and right of way;
- pedestrian-crossing terminology;
- freeway terminology;
- towing terminology;
- accident duties;
- load security;
- tyre / tread language;
- motorcycle helmet and learner-passenger rule;
- front / rear brake;
- clutch;
- throttle;
- gear lever;
- indicators;
- mirrors;
- traffic signals / lane-control signals;
- road-marking terminology;
- reservation / selective-restriction / de-restriction terminology;
- traffic-officer and flag signals.

## 4. CURRENT PRODUCT RULE

English = **SOURCE-MASTER / CONTENT QA PASS**

Afrikaans = **LANGUAGE_QA_PENDING**

Xhosa = **LANGUAGE_QA_PENDING**

Successful phone rendering, speech playback, offline use or functional testing must never be treated as language approval.

## 5. RELEASE RULE

The app may continue through internal build and English testing.

Before Afrikaans or Xhosa is labelled approved / released:
1. competent human review must be completed;
2. corrections must be applied consistently;
3. a final language regression must confirm layout, meaning and answer alignment;
4. only then may the relevant language status move from LANGUAGE_QA_PENDING.

## 6. COST CONTROL

This review was completed in GitHub only.

Netlify deployment triggered: **NO**
