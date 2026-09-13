# 00_CLLT_MASTER_SOURCE_CONTROL.md

## MZANSI LEARNER DRIVER — CLLT PREP
### BUILD 0.1A — MASTER SOURCE CONTROL & PRODUCT DOCTRINE

**Status:** FROZEN BASELINE — unresolved items remain explicitly marked  
**Version:** 0.1A  
**Date:** 13 September 2026  
**Primary launch context:** Western Cape, South Africa  
**Product form:** Offline-first Progressive Web App (PWA)  
**Working family:** Mzansi offline-first learning / access tools  

---

# 1. PURPOSE OF THIS DOCUMENT

This document is the controlling source, scope, content, architecture and quality standard for the first build of **Mzansi Learner Driver — CLLT Prep**.

No feature, question, mock-test behaviour, legal claim, pass rule, language claim, vehicle-class claim, or user-flow decision may be treated as final unless it is consistent with this document or this document is formally updated.

The purpose of Build 0.1A is to prevent three failures:

1. building from assumptions rather than authoritative sources;
2. reproducing the old paper-test mindset in a new digital app; and
3. creating a data-heavy product that excludes the people it is intended to serve.

This document must be reviewed and frozen before Build 0.1B begins.

---

# 2. PRODUCT MISSION

**Mission**

Prepare prospective South African learner drivers, especially people in marginalised, low-income, low-bandwidth and underserved communities, for both:

1. the **knowledge requirements** of the learner’s licence test; and
2. the **digital interaction requirements** of the Computerised Learner’s Licence Testing (CLLT) environment.

The product is not intended to reproduce confidential official test questions. It is intended to build genuine understanding, practice competence and digital-test readiness.

---

# 3. GOLDEN BUILD DOCTRINE — NON-NEGOTIABLE

Every future build decision must pass these rules.

## 3.1 Offline first
After the first successful load/install, all essential learning, practice, mock testing, explanations and local progress must work without internet access.

## 3.2 Low bandwidth
The app must minimise first-load and update data. No essential feature may depend on streamed video, cloud APIs, external fonts, analytics scripts or live web calls.

## 3.3 Marginalised and underserved communities first
The default design target is not a high-end phone user with permanent broadband. It is a learner who may have limited data, intermittent electricity/connectivity, limited digital confidence and little money for repeated test attempts or commercial preparation.

## 3.4 Ordinary and older Android phones first
The app must be usable on small screens, modest RAM, slower processors and older Android/Chromium-class devices. Browser use must remain possible even if installation is unavailable.

## 3.5 No account required for core use
No email address, social login or cloud account may be required to learn, practise or complete mock tests.

## 3.6 Local-first progress
Core progress is stored on the device. Cloud sync is optional future scope, never a dependency.

## 3.7 No AI dependency
Core learning and assessment must remain fully functional with no AI service, API key or internet connection.

## 3.8 Plain language
Questions and explanations must favour clear, short, direct language without reducing legal accuracy.

## 3.9 Multilingual by architecture
The data model must support multiple languages from the beginning, even if the first verified content pack is English.

## 3.10 Accessibility by default
The app must not rely on audio alone, colour alone, gesture precision or high digital literacy.

## 3.11 No unnecessary deployment
Work should be batched and tested locally/repository-first. Netlify or other hosted deployments should occur only when useful for real verification.

## 3.12 Build small → test → verify → freeze
No redesign for novelty. Add the smallest useful layer, test it, verify it, then freeze it before moving forward.

---

# 4. THE PROBLEM WE ARE SOLVING

The Western Cape launched CLLT on 26 May 2025. The system replaces the traditional manual booklet format with a computerised environment using touch-screen terminals, fingerprint verification, NaTIS connectivity, randomised questions and electronically processed results.

The Western Cape Provincial Parliament recorded a **17% CLLT pass rate for the 2025/26 financial year**, while the overall provincial learner-licence pass rate was 63% during the transition period. The Department specifically noted that the computerised system randomises questions and answer options and requires applicants to demonstrate actual knowledge rather than familiarity with memorised sequences.

This creates two separate readiness problems:

### A. Knowledge readiness
- Rules of the road
- Road traffic signs
- Road markings
- Vehicle controls

### B. Digital-test readiness
- Reading one question at a time on screen
- Selecting an answer
- Understanding selected and unselected states
- Moving through a computerised assessment
- Coping with randomised question and answer order
- Maintaining concentration in a digital test environment
- Understanding time and progress indicators if present in the official system

The PWA must address both.

---

# 5. SOURCE AUTHORITY RULE

When sources disagree, use this hierarchy:

**Tier 1 — Law / gazetted regulation**
- National Road Traffic Act
- National Road Traffic Regulations
- Government Gazette notices and prescribed testing requirements

**Tier 2 — National transport authority**
- National Department of Transport
- RTMC
- NaTIS / eNaTIS official material

**Tier 3 — Provincial / municipal authority**
- Western Cape Mobility Department
- Western Cape Government official service pages
- City of Cape Town official transport/licensing pages

**Tier 4 — Parliamentary oversight records**
- Western Cape Provincial Parliament written questions and replies

**Tier 5 — Secondary reporting**
- Reputable media or specialist explanatory sources

Tier 5 may identify an issue, but may not override Tiers 1–4.

If two authoritative sources conflict, the item is marked **NEEDS CONFIRMATION** and is not hard-coded into the app until resolved.

---

# 6. VERIFIED FACT REGISTER

Status keys:

- **VERIFIED** — supported by current authoritative source(s)
- **LEGAL BASELINE** — supported by law/gazette but operational CLLT implementation should still be checked
- **PROVISIONAL** — reasonable working rule, not yet verified against current CLLT operation
- **NEEDS CONFIRMATION** — conflicting or insufficient authoritative evidence

| ID | Fact | Status |
|---|---|---|
| VF-01 | CLLT became operational in the Western Cape on 26 May 2025. | VERIFIED |
| VF-02 | CLLT replaces the traditional manual booklet-based learner test with a digital testing environment. | VERIFIED |
| VF-03 | CLLT uses touch-screen / computer terminals. | VERIFIED |
| VF-04 | CLLT terminals connect to NaTIS. | VERIFIED |
| VF-05 | Fingerprint verification forms part of the CLLT environment. | VERIFIED |
| VF-06 | Test questions are randomised. | VERIFIED |
| VF-07 | Western Cape parliamentary evidence states that answer options are also randomised. | VERIFIED |
| VF-08 | Results are electronically processed. | VERIFIED |
| VF-09 | The official study domains include rules of the road, road traffic signs/markings and vehicle controls. | VERIFIED |
| VF-10 | The 2025/26 CLLT pass rate reported to the Western Cape Provincial Parliament was 17%. | VERIFIED |
| VF-11 | The learner’s licence is valid for 24 months / 2 years. | VERIFIED |
| VF-12 | The national learner-licence categories are Code 1 (motorcycle), Code 2 (light vehicle) and Code 3 (heavy vehicle). | VERIFIED |
| VF-13 | National government currently states Code 2 applicants may apply from age 17. | VERIFIED |
| VF-14 | The current Western Cape learner-licence service page says all learner tests are conducted through CLLT. | VERIFIED AS CURRENT SERVICE-PAGE STATEMENT |
| VF-15 | A June 2026 parliamentary reply stated 66 DLTCs were using CLLT and four were still pending. | VERIFIED HISTORICAL SNAPSHOT |
| VF-16 | CLLT includes on-screen multilingual instructions intended to improve accessibility, including for hearing-impaired applicants. | VERIFIED |
| VF-17 | A 2006 Gazette prescribes minimum marks of 22/28 for rules, 23/28 for signs and 6/8 for vehicle controls. | LEGAL BASELINE |

---

# 7. IMPORTANT SOURCE CONFLICTS

## 7.1 Learner category naming and minimum age
The national Department of Transport and South African Government describe learner licences as:

- **Code 1** — motorcycle
- **Code 2** — light motor vehicle, minimum age 17
- **Code 3** — heavy motor vehicle, minimum age 18

The current Western Cape learner service page instead presents driving-licence-style categories such as A1, A, B, EB, C1, C, EC1 and EC and lists Code B at minimum age 18.

**Control decision:**  
For learner-test preparation, Build 0.1B must use the national learner categories **Code 1 / Code 2 / Code 3** as the primary learner-facing selection unless Western Cape Mobility confirms a different CLLT configuration.

The app must not use the Western Cape page’s Code B age statement to block a 17-year-old learner from Code 2 preparation.

**Status:** NEEDS CONFIRMATION for final wording in the app’s eligibility/help section.

## 7.2 Number of questions: 64 vs 68
Government Gazette No. 28446 prescribes pass thresholds based on:

- 28 rules questions
- 28 road-sign questions
- 8 controls questions

This implies **64 scored items**.

Commercial K53 products commonly advertise a 68-question structure.

**Control decision:**  
Do not hard-code “68 questions”.  
Do not market the app as an exact CLLT replica until the current CLLT item count is confirmed by RTMC / Western Cape Mobility.

For early mock testing we may use section-based practice aligned to the legal threshold structure, clearly labelled **practice simulation**, not **official CLLT replica**.

## 7.3 Province-wide rollout status
A current Western Cape service page says all learner tests use CLLT. A June 2026 parliamentary response stated 66 DLTCs were active and four were still pending.

**Control decision:**  
Describe CLLT as the Western Cape’s current learner-testing system, but do not state a precise “all centres” count in learner-facing content unless the rollout figure is refreshed.

---

# 8. TEST SPECIFICATION — WHAT MAY BE FROZEN NOW

## 8.1 Content domains
These may be frozen:

1. Rules of the road
2. Road traffic signs
3. Road markings
4. Vehicle controls

Road markings should be taught as part of the road-sign / road-traffic-sign domain unless the source item requires separate tagging.

## 8.2 Legal pass thresholds
Legal baseline:

- Rules: **22 / 28**
- Road traffic signs: **23 / 28**
- Vehicle controls: **6 / 8**

These values are allowed in the internal readiness engine as the current legal baseline, but the public mock screen should say **“practice target aligned to published learner-test thresholds”** until current CLLT scoring is operationally confirmed.

## 8.3 CLLT behaviour that is verified
The following behaviour may influence our simulator:

- digital / touchscreen environment
- randomised questions
- randomised answer options
- electronic result processing
- identity verification exists in the official environment, but must NOT be reproduced in the preparation PWA

---

# 9. TEST SPECIFICATION — DO NOT FREEZE YET

The following require direct verification before an “Exact CLLT Simulation” mode may be released:

1. Current total number of scored questions
2. Official test duration
3. Whether sections appear separately or are mixed
4. Exact section order
5. Whether a learner may skip a question
6. Whether a learner may return to earlier questions
7. Whether an answer may be changed
8. Whether unanswered questions are flagged
9. Whether a review screen exists
10. Exact Next / Back / Submit controls
11. Progress-bar or question-number behaviour
12. Timer display behaviour
13. Warning behaviour near the end of the test
14. Image sizing and presentation
15. Exact language choices available at Western Cape CLLT terminals
16. Accessibility options in production terminals
17. Whether the same interface is used for Codes 1, 2 and 3
18. Whether vehicle-control sections vary by vehicle category and how
19. Exact current pass/fail calculation inside CLLT
20. Whether there are non-scored orientation/example questions

Until verified, use the label:

**CLLT-STYLE PRACTICE**

Do not use:

**OFFICIAL CLLT SIMULATOR**

---

# 10. TARGET LEARNER PRIORITY

Build and test in this order of need:

### Priority 1
Learner using an ordinary or older Android phone with limited prepaid data.

### Priority 2
Learner who has never completed a computerised exam.

### Priority 3
Learner studying in a second or third language.

### Priority 4
Learner with weak access to paid driving-school preparation.

### Priority 5
Learner in rural, township, informal-settlement or other underserved communities.

### Priority 6
Learner who needs visual accessibility and cannot rely on audio instructions.

The app must remain equally usable by any other learner.

---

# 11. VERSION 0.1 PRODUCT SCOPE

## Included
- First-time digital test orientation
- Rules learning
- Signs and markings learning
- Vehicle-controls learning
- Topic drills
- Randomised practice
- Section-based mock tests
- Weak-area tracking
- Readiness status
- Offline progress
- Reset/export-ready local architecture
- English source-master content
- Architecture for Afrikaans and isiXhosa packs
- Accessible tap targets and simple navigation
- PWA installability
- Offline-ready indicator

## Not included in 0.1
- Live exam booking
- DLTC appointment integration
- Cloud login
- Social login
- Paid subscription
- AI tutor
- Chatbot
- Streaming video
- Mandatory audio
- GPS
- Advertising
- Public leaderboards
- Driving-school CRM
- Instructor marketplace
- Official government branding
- Fingerprint or biometric capture
- Copies of confidential CLLT questions
- “Guaranteed pass” claims

---

# 12. FIRST APP INFORMATION ARCHITECTURE

The learner-facing home screen should initially contain only:

1. **Learn**
2. **Practise**
3. **Mock Test**
4. **My Weak Areas**
5. **Am I Ready?**
6. **First Computer Test?**

No dashboard should be added unless evidence shows it helps the target learner.

---

# 13. “FIRST COMPUTER TEST?” MODE

This is a required differentiator, not an optional extra.

The learner is introduced to the mechanics of digital assessment without testing driving knowledge.

Example sequence:

1. “Tap this button.”
2. “Choose one answer.”
3. “Change your answer.”
4. “Tap Next.”
5. “Complete these 3 example questions.”
6. “You are ready to practise.”

This mode must:
- work offline;
- contain no trick questions;
- use neutral, non-driving examples at first;
- build confidence without infantilising the learner;
- take less than 3 minutes in the first version.

---

# 14. LEARNING MODEL

Each topic follows:

**Learn → Example → Practise → Explain → Repeat weak area → Retest**

A wrong answer must not merely show “Incorrect”.

It should show:
- the correct answer;
- a short explanation;
- the rule/topic involved;
- a direct option to practise another question from the same weak area.

---

# 15. READINESS ENGINE

The readiness engine is diagnostic, not predictive.

Initial structure:

- Rules readiness
- Signs/markings readiness
- Vehicle-controls readiness
- Digital-test readiness
- Overall readiness

Example:

> Rules: READY  
> Signs: PRACTISE MORE  
> Controls: READY  
> Computer Test: READY  
> Overall: NOT READY YET  
> Recommended next step: Signs Drill

## Readiness rule
A learner is never marked “Ready” merely because the overall percentage is high if one legally required section is below its threshold.

## Early internal target
Use the published legal threshold structure as the minimum section baseline and add a safety margin for “Ready” classification.

**Provisional readiness margin:**  
Require at least 85% in each section across more than one recent attempt before showing **READY**.

This 85% value is a product-training target, not an official pass mark.

Status: PROVISIONAL — validate during pilot testing.

---

# 16. QUESTION BANK DOCTRINE

## 16.1 No confidential exam-bank copying
No question may be copied from leaked, recalled, photographed, confidential or unauthorised CLLT test material.

## 16.2 Original question writing
Questions must be written from:
- official road rules;
- official road-sign standards;
- official learner-driver study material;
- official vehicle-control material;
- applicable legislation.

## 16.3 Every question must have a source
Each question record must contain a source ID or source citation reference.

## 16.4 One unambiguous best answer
Avoid wording where two options may reasonably be correct.

## 16.5 Test understanding, not trivia
Prefer application and recognition over obscure phrasing.

## 16.6 Randomisation
Question order and answer-option order may be randomised where doing so does not distort meaning.

## 16.7 Explanation required
Every scored practice item must include an explanation.

## 16.8 Safety/legal review gate
Any item that teaches a legal requirement, sign meaning or safety rule must be source-verified before public release.

---

# 17. QUESTION DATA SCHEMA

Minimum item record:

```json
{
  "id": "rules-001",
  "section": "rules",
  "topic": "speed-and-following",
  "vehicle_group": ["code2", "code3"],
  "difficulty": "basic",
  "language": {
    "en": {
      "question": "",
      "options": ["", "", ""],
      "explanation": ""
    }
  },
  "correct_index": 0,
  "image_ref": null,
  "source_id": "SRC-001",
  "verification_status": "draft",
  "version": "0.1"
}
```

Future language packs must preserve the same item ID and concept even when wording differs.

---

# 18. CONTENT RELEASE WORKFLOW

Every question passes these states:

**DRAFT → SOURCE VERIFIED → CONTENT QA → LANGUAGE QA → RELEASED**

For the first English pack, LANGUAGE QA means plain-language review.

For translated packs, LANGUAGE QA requires a competent speaker/reviewer and must not rely on raw machine translation alone.

---

# 19. LANGUAGE STRATEGY

## Phase 1
English source master.

## Phase 2
Afrikaans and isiXhosa.

## Phase 3
Additional South African languages based on usage, verified translation capacity and community need.

Rules:
- no language pack is released solely from machine translation;
- legal meaning must remain stable across languages;
- wording should be natural, not literal where literal translation becomes confusing;
- sign names and legal terms should follow official usage where available;
- language selection must work fully offline once the pack is installed;
- the number of languages available in official CLLT must not be hard-coded until verified.

---

# 20. ACCESSIBILITY STANDARD

Required for 0.1:

- large tap targets;
- readable text at small-screen widths;
- high contrast;
- no information conveyed by colour alone;
- clear selected-answer state;
- no essential audio;
- no timed animations required to proceed;
- no drag-and-drop requirement;
- simple Back / Next navigation;
- portrait-first layout;
- zoom-resilient interface where feasible;
- understandable error messages;
- visual completion/progress cues.

Potential later feature:
- device text-to-speech in **study mode only**, never as an assumed feature of the official test.

---

# 21. OFFLINE TECHNICAL ARCHITECTURE

Core architecture:

```text
PWA
│
├── Local HTML / CSS / JavaScript app shell
├── Service Worker
├── Versioned local content packs
│   ├── rules
│   ├── signs
│   └── controls
├── Local sign/diagram assets
├── IndexedDB
│   ├── progress
│   ├── attempts
│   ├── weak areas
│   └── settings
└── Offline fallback / update manager
```

## Required technical rules
- no external CDN for essential runtime assets;
- no externally hosted font required;
- no remote database required;
- no API call required for core use;
- cached content version must remain usable if update fails;
- updates must not erase learner progress;
- content packs must be versioned independently from the app shell where practical;
- service-worker updates must be testable and recoverable;
- the user must be able to reset local progress manually.

---

# 22. LOW-DATA PERFORMANCE BUDGET

These are engineering targets, not legal requirements.

### First-install core target
**≤ 6 MB preferred**

### First-install hard ceiling
**≤ 10 MB before optional language/content packs**

### Strategy
- use SVG or compact locally generated sign assets where appropriate;
- compress raster images;
- avoid video in core;
- avoid large libraries;
- avoid duplicated assets;
- lazy-load non-core optional packs;
- cache once, reuse offline.

Any feature that materially breaks this budget needs a documented reason.

---

# 23. DEVICE TEST STANDARD

Before a build may be frozen, test at minimum:

- small portrait viewport around 360 px wide;
- slow network simulation;
- complete offline mode;
- refresh while offline;
- close and reopen while offline;
- service-worker update;
- low storage condition where practical;
- progress persistence;
- no connection during a mock test;
- interrupted connection during first load/update;
- back-button behaviour on Android;
- browser mode without installation;
- installed PWA mode.

Where possible, test on a modest/older Android device rather than only desktop emulation.

---

# 24. PRIVACY / POPIA MINIMUM

Version 0.1 should collect as little personal data as possible.

Do not require:
- name;
- ID number;
- exact date of birth;
- phone number;
- email address;
- location;
- contacts;
- biometric data.

Local progress may use an anonymous local learner profile.

No advertising trackers or third-party behavioural analytics in core 0.1.

If analytics is introduced later, it must be privacy-conscious, optional where appropriate, and justified by a concrete learning need.

---

# 25. COPYRIGHT & CONTENT CONTROL

## Allowed
- original explanations based on official law and guidance;
- original practice questions;
- original diagrams and road-sign artwork created from authoritative definitions;
- links/references to official study material;
- short factual extracts where legally appropriate.

## Not allowed without permission
- copying whole commercial K53 books;
- copying proprietary app questions;
- copying leaked CLLT questions;
- reproducing confidential test-bank material;
- assuming that an official government PDF is automatically public-domain content;
- copying an entire official manual into the PWA merely because it is downloadable.

Where practical, teach the same rule in our own words and keep the official source reference.

---

# 26. SOURCE REGISTER — 0.1A

### SRC-001 — Western Cape Government: Learner’s licence
Purpose: current Western Cape application, fees, preparation domains, CLLT statement, validity.
https://www.westerncape.gov.za/service/learners-licence

### SRC-002 — Western Cape Mobility: CLLT launch
Purpose: launch date, CLLT architecture, touchscreen, NaTIS, fingerprint, randomisation, accessibility.
https://www.westerncape.gov.za/mobility/article/western-cape-launches-innovative-computerised-learners-licence-testing-system

### SRC-003 — Western Cape Provincial Parliament: Question 12, 5 June 2026
Purpose: CLLT rollout count, 17% pass rate, randomised questions/options, public-library support.
https://www.wcpp.gov.za/?q=node/21054

### SRC-004 — National Department of Transport: Apply for a learner’s licence
Purpose: national learner categories, minimum ages, validity, booking requirements, study domains.
https://www.transport.gov.za/?page_id=1176

### SRC-005 — South African Government: Apply for a learner’s licence
Purpose: national confirmation of Code 1 / 2 / 3 categories and age requirements.
https://www.gov.za/services/driving-licence/apply-learners-licence

### SRC-006 — Government Gazette No. 28446, Notice R.93, 7 April 2006
Purpose: prescribed learner-test pass thresholds and DLTC requirements.
https://www.gov.za/sites/default/files/gcis_document/201409/28446b.pdf

### SRC-007 — City of Cape Town: CLLT rollout
Purpose: metro rollout, digital screens, implementation at City DLTCs.
https://www.capetown.gov.za/Media-and-news/City%20drives%20Computerised%20Learner%27s%20Licence%20Test%20rollout

### SRC-008 — Western Cape Mobility: decline in licensing fraud
Purpose: CLLT integrity rationale, rollout context and accessibility/reliability claims.
https://www.westerncape.gov.za/mobility/article/western-cape-mobility-department-welcomes-decline-licensing-fraud

### SRC-009 — NaTIS official learner-driver study material
Purpose: primary content source for Rules of the Road, Road Traffic Signs and Vehicle Controls.
Root site:
https://www.natis.gov.za/

Referenced official paths:
- /index.php/downloads/learner-driver-manual/rules-of-the-road
- /index.php/downloads/learner-driver-manual/road-traffic-signs
- /index.php/downloads/learner-driver-manual/vehicle-controls

Note: automated retrieval may be blocked; access manually or through a browser for source capture.

---

# 27. OPEN VERIFICATION REGISTER

| ID | Question | Priority | Blocks 0.1B? | Blocks exact simulator? |
|---|---|---:|---|---|
| OV-01 | Exact current CLLT scored question count | High | No | Yes |
| OV-02 | Exact test duration | High | No | Yes |
| OV-03 | Back / Next / Review behaviour | High | No | Yes |
| OV-04 | Can answers be changed? | High | No | Yes |
| OV-05 | Can questions be skipped? | Medium | No | Yes |
| OV-06 | Section order / mixing | High | No | Yes |
| OV-07 | Exact current language options | Medium | No | Yes |
| OV-08 | Accessibility functions on production terminals | Medium | No | Yes |
| OV-09 | Exact Code 1/2/3 controls variation | High | Partly | Yes |
| OV-10 | Current operational confirmation of 22/28, 23/28, 6/8 inside CLLT | High | No | Yes |
| OV-11 | Resolve Western Cape Code B age wording vs national Code 2 age 17 | High | No | No |
| OV-12 | Current rollout status of the four previously pending DLTCs | Low | No | No |

---

# 28. VALIDATION / PILOT PRINCIPLE

Do not evaluate the PWA only with experienced smartphone users.

Pilot testing should deliberately include:
- first-time learner applicants;
- low-data users;
- learners who normally use prepaid mobile data;
- users with lower digital confidence;
- Afrikaans and isiXhosa speakers once those packs exist;
- at least some users on older or modest Android devices.

We are testing **access + understanding + digital readiness**, not just whether the code works.

---

# 29. SUCCESS METRICS FOR THE FIRST PILOT

Do not use downloads as the main success measure.

Measure:

1. Can the learner install/open the app with little help?
2. Can the learner use it offline after first load?
3. Can the learner finish “First Computer Test?” unaided?
4. Can the learner identify where they are weak?
5. Does section performance improve after targeted drills?
6. Can the learner resume after closing the app?
7. Does an update preserve progress?
8. Does the learner understand that this is preparation, not the official test?
9. Does the app remain usable on low-end hardware and limited data?
10. Does the learner report greater confidence with the digital-test format?

---

# 30. DESIGN RED LINES

Do not add in Version 0.1 unless this control document is changed:

- AI chat
- cloud database
- account system
- paid gateway
- advertising
- social feed
- leaderboard
- streaming video
- gamification that rewards speed over understanding
- “guaranteed pass” language
- fake official branding
- official-looking government seals
- biometric functions
- unnecessary animation
- complex dashboard
- mandatory online sync

---

# 31. BUILD 0.1B — AUTHORISED NEXT BUILD AFTER FREEZE

Once 0.1A is frozen, 0.1B should build only the smallest offline shell:

### 0.1B scope
- app name / simple identity;
- six-button home screen;
- installable manifest;
- service worker;
- offline fallback;
- one tiny sample content pack;
- one “First Computer Test?” walkthrough;
- one short practice set;
- local progress proof;
- offline test.

### 0.1B acceptance test
A user must be able to:

1. open the app online once;
2. load/install it;
3. switch off mobile data and Wi-Fi;
4. reopen the app;
5. complete the digital-orientation exercise;
6. answer sample questions;
7. close the app;
8. reopen it offline;
9. see retained progress.

If that fails, 0.1B does not pass.

No full question bank should be loaded before this architecture is verified.

---

# 32. FREEZE GATE FOR 0.1A

Build 0.1A may be frozen when the project owner accepts the following:

- [ ] Mission is correct
- [ ] Golden doctrine is correct
- [ ] Source hierarchy is accepted
- [ ] Verified facts are separated from assumptions
- [ ] Source conflicts are recorded
- [ ] Legal baseline is recorded
- [ ] Exact simulator claims are prohibited until verified
- [ ] Version 0.1 scope is sufficiently small
- [ ] Offline architecture is accepted
- [ ] Low-data budget is accepted
- [ ] Privacy rule is accepted
- [ ] Copyright rule is accepted
- [ ] Language sequence is accepted
- [ ] Question-writing doctrine is accepted
- [ ] First Computer Test mode is accepted
- [ ] Readiness engine principle is accepted
- [ ] Build 0.1B scope is accepted

**Freeze status:** FROZEN BASELINE

---

# 33. CONTROL DECISION

The app is not being built as another K53 question bank.

It is being built as an **offline-first CLLT readiness system** for learners who may have the least access to data, devices, formal preparation and digital-test experience.

That identity controls the project.

---

# 34. NEXT ACTION

**Review and freeze Build 0.1A.**

After freeze:

**BUILD 0.1B — OFFLINE PWA SHELL + DIGITAL TEST ORIENTATION PROOF**

No full-scale content build, AI layer, cloud system or unnecessary deployment before 0.1B passes its offline acceptance test.