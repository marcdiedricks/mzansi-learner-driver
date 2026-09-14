# BUILD 0.1C — VERIFIED LEARNER CONTENT SOURCE REGISTER

**Project:** Mzansi Learner Driver — CLLT Prep  
**Project ID:** NKI-EDU-002  
**Build:** 0.1C  
**Status:** FOUNDATION IN PROGRESS — NOT YET MERGED / NOT YET DEPLOYED  
**Control baseline:** 00_CLLT_MASTER_SOURCE_CONTROL.md  
**Frozen predecessor:** Build 0.1B PASS + FROZEN  

---

## 1. PURPOSE

Build 0.1C creates the source-controlled content foundation for the learner-facing knowledge layer.

No public question may be released unless:
1. the concept is traceable to an authoritative source;
2. the question is original wording;
3. the answer is unambiguous;
4. the explanation is source-aligned;
5. the item passes the release gate.

This build does **not** reproduce confidential or copied CLLT questions.

---

## 2. GOLDEN DOCTRINE

The content system must preserve the project rules:

- Offline-first
- Low-data
- Low-cost
- Ordinary / older Android phones first
- Marginalised and underserved communities first
- Plain language
- No core AI dependency
- No login required for core use
- Local-first progress
- No mandatory video or audio
- Build small → test → verify → freeze

---

## 3. AUTHORITY HIERARCHY

Use sources in this order:

1. **National law / gazetted regulations**
2. **National Department of Transport / RTMC / NaTIS**
3. **Western Cape Government / Western Cape Mobility**
4. **City of Cape Town / official municipalities**
5. Secondary explanatory sources only to identify issues, never to override authoritative material

If authoritative sources conflict, mark the item **NEEDS CONFIRMATION** and do not release it.

---

## 4. CONTENT DOMAINS — LOCKED

The learner knowledge layer is structured into:

### R — Rules of the Road
National road rules and safe/legal road-use principles.

### S — Road Traffic Signs, Signals and Markings
Regulatory, warning, guidance and information signs; road markings; traffic signals.

### C — Vehicle Controls
Controls relevant to the learner's vehicle group.

---

## 5. AUTHORITATIVE SOURCE REGISTER

### SRC-001 — Western Cape Government: Learner's licence
**Authority:** Provincial government  
**Purpose:** Current Western Cape learner-licence service, CLLT statement, preparation domains, fees, validity and official links to study material.  
**URL:** https://www.westerncape.gov.za/service/learners-licence  
**Status:** VERIFIED CURRENT SERVICE SOURCE

### SRC-002 — Western Cape Mobility / South African Government: CLLT launch
**Authority:** Provincial / national government publication  
**Purpose:** CLLT operating context, touchscreen environment, NaTIS connectivity, fingerprint verification, electronic processing and official study-guide direction.  
**URL:** https://www.gov.za/news/media-statements/western-cape-mobility-computerised-learners%E2%80%99-licence-testing-system%C2%A0-28-may  
**Status:** VERIFIED

### SRC-003 — City of Cape Town: CLLT rollout
**Authority:** Local government  
**Purpose:** Touchscreen use, multilingual system, hearing-impaired support and demonstration/familiarisation function before the official test.  
**URL:** https://www.capetown.gov.za/Media-and-news/City%20drives%20Computerised%20Learner%27s%20Licence%20Test%20rollout  
**Status:** VERIFIED

### SRC-004 — South African Government: Apply for a learner's licence
**Authority:** National government  
**Purpose:** National learner-licence requirements and official preparation domains.  
**URL:** https://www.gov.za/services/driving-licence/apply-learners-licence  
**Status:** VERIFIED

### SRC-005 — Department of Transport: Apply for a learner's licence
**Authority:** National Department of Transport  
**Purpose:** National learner-licence application and preparation requirements.  
**URL:** https://www.transport.gov.za/?page_id=1176  
**Status:** VERIFIED

### SRC-006 — NaTIS / Department of Transport: Rules of the Road
**Authority:** National learner-driver manual  
**Document:** South African Learner Driver Manual — Rules of the Road, Version 1.00, June 2012  
**URL:** https://www.natis.gov.za/images/learners/1_Rules_of_the_Road_v100_Jun_2012.pdf  
**Status:** PRIMARY CONTENT SOURCE  
**Copyright control:** Use as authoritative reference. Do not copy/distribute the whole manual in the app. Write original teaching text and questions.

### SRC-007 — NaTIS / Department of Transport: Road Traffic Signs
**Authority:** National learner-driver manual  
**Document:** South African Learner Driver Manual — Road Traffic Signs, Version 1.00, June 2012  
**URL:** https://test.natis.gov.za/images/learners/2_Manual_on_Road_Traffic_Signs_v100_Jun_2012.pdf  
**Status:** PRIMARY CONTENT SOURCE  
**Copyright control:** Use as authoritative reference. Do not reproduce the whole manual.

### SRC-008 — NaTIS / Department of Transport: Vehicle Components and Controls
**Authority:** National learner-driver manual  
**Document:** SA Learner Driver Manual — Vehicle Components and Controls, Version 1.00, June 2012  
**URL:** https://www.natis.gov.za/images/learners/3_Vehicle_Controls_Manual_v100_Jun_2012.pdf  
**Status:** PRIMARY CONTENT SOURCE — FINAL VERSION LOCATED  
**Control note:** Use as the authoritative reference for component/control identification. Write original learner-facing questions and explanations.

### SRC-009 — Government Gazette No. 28446 / Notice R.93 (7 April 2006)
**Authority:** Gazetted legal baseline  
**Purpose:** Published learner-test section thresholds: 22/28 Rules, 23/28 Road Traffic Signs, 6/8 Vehicle Controls.  
**URL:** https://www.gov.za/sites/default/files/gcis_document/201409/28446b.pdf  
**Status:** LEGAL BASELINE

### SRC-010 — Drakenstein Municipality learner preparation notice
**Authority:** Official municipality  
**Purpose:** Current local-government confirmation that the computerised learner test uses 64 questions across rules, signs and vehicle controls.  
**URL:** https://www.drakenstein.gov.za/sites/dw/SitePages/News.aspx?AEID=1203  
**Status:** SUPPORTING OPERATIONAL CONFIRMATION  
**Control note:** This strengthens the 64-question working assumption but does not replace RTMC / national operational confirmation.

---

## 6. CURRENT TEST-STRUCTURE CONTROL

### Allowed working baseline
- Rules threshold: 22 / 28
- Signs threshold: 23 / 28
- Controls threshold: 6 / 8
- Total implied scored items: 64

### Current evidence level
The 64-item structure is supported by the gazetted section denominators and a current official municipal CLLT preparation notice.

### Do not claim yet
Do not label the PWA an **exact official CLLT simulator** until RTMC / Western Cape Mobility directly confirms:
- current test duration;
- exact navigation behaviour;
- skip/back/review behaviour;
- answer-change rules;
- exact language list in current production;
- any non-scored orientation items;
- exact per-vehicle control variation.

Use **CLLT-STYLE PRACTICE**.

---

## 7. QUESTION SOURCE RULE

Every question must include:

- unique question ID;
- section;
- topic;
- vehicle group;
- difficulty;
- source ID;
- source locator / rule reference where practical;
- verification status;
- original English question text;
- options;
- correct answer;
- explanation;
- content version;
- translation status.

No item may be released with source ID "unknown".

---

## 8. RELEASE STATES

**DRAFT**  
Question exists but has not been source-checked.

**SOURCE_VERIFIED**  
The concept and correct answer have been checked against an authoritative source.

**CONTENT_QA**  
Plain language, one-best-answer logic, distractor quality and explanation checked.

**LANGUAGE_QA**  
Required for translated packs; competent human review completed.

**RELEASED**  
Approved for learner-facing use.

---

## 9. 0.1C FIRST CONTENT TARGET

Do not build hundreds of questions.

First controlled content target:

- 10 Rules items
- 10 Signs/Markings items
- 5 Vehicle Controls items

Total: **25 verified pilot items**

Purpose:
- prove the source-traceability workflow;
- prove topic tagging;
- prove offline content packaging;
- test explanations with real learners;
- identify ambiguity before scaling.

Only after the 25-item pack passes QA should the bank expand.

---

## 10. OPEN VERIFICATION ITEMS

- OV-01: Direct RTMC / WC Mobility confirmation of current 64-question production structure
- OV-02: Official CLLT duration
- OV-03: Back / Next / Review behaviour
- OV-04: Answer-change behaviour
- OV-05: Skip behaviour
- OV-06: Section ordering / mixing
- OV-07: Current production language options
- OV-08: Production accessibility functions
- OV-09: Code 1 / 2 / 3 vehicle-control variation
- OV-10: Confirm production scoring implementation against legal thresholds
- OV-11: Resolve learner-category / age wording differences between national and Western Cape service pages

---

## 11. BUILD 0.1C FREEZE CONDITION

0.1C may be frozen when:

- source register is complete enough for pilot content;
- question schema is locked;
- 25 pilot questions are source-verified;
- no question uses copied confidential CLLT wording;
- every item has an explanation;
- no immediate-repeat logic is added until the content pack is stable;
- pilot pack loads fully offline;
- translations are not released before human QA;
- content remains within low-data budget.

**Current status:** FOUNDATION ONLY — NOT FROZEN


---

## 12. BUILD 0.1E-A SOURCE SUPPLEMENT — CODE 1 MOTORCYCLE

### SRC-011 — National Road Traffic Regulations: Protective helmets
**Authority:** National road-traffic regulations / South African Government  
**Purpose:** Motorcycle protective-helmet requirement for riders/passengers on public roads.  
**URL:** https://www.gov.za/sites/default/files/gcis_document/201409/gg31242nn753pg106-125.pdf  
**Status:** VERIFIED FOR CODE 1 PILOT  
**Control note:** Use the ordinary helmet requirement in plain language. Do not build obscure regulatory exceptions into the first pilot question.

### Existing sources reused for Code 1
- **SRC-001:** Western Cape Government learner's licence service — used for the learner-motorcyclist passenger restriction and current learner-category context.
- **SRC-006:** NaTIS Rules of the Road — existing motorcycle headlamp item.
- **SRC-007:** NaTIS Road Traffic Signs — vehicle-neutral signs shared across pathways.
- **SRC-008:** NaTIS Vehicle Components and Controls — motorcycle front brake, rear brake and throttle.

### 0.1E-A evidence boundary
The first Code 1 pilot is limited to:
- motorcycle headlamp;
- learner passenger restriction;
- protective helmet;
- front brake;
- rear brake;
- throttle;
- vehicle-neutral shared Rules and Signs already source-controlled.

No other motorcycle topic is released in 0.1E-A without a new source-verification step.


---

## 13. BUILD 0.1E-B SOURCE SUPPLEMENT — MOTORCYCLE CONTROLS EXPANSION

**Authority reused:** SRC-008 — NaTIS / Department of Transport, Vehicle Components and Controls.

### Approved 0.1E-B additions
- controls-009 — clutch
- controls-010 — gear lever
- controls-011 — indicator switch
- controls-012 — rear-view mirrors

### Evidence boundary
These four additions are based on controls/components explicitly identified in the NaTIS motorcycle controls material and its control-function examples.

No new Rules or Signs are added in 0.1E-B.

Reserved for later evidence review:
- handlebars / steering;
- combined braking;
- advanced control combinations / riding technique.

### Translation control
English is the source-master meaning.
Afrikaans and isiXhosa learner text is present for functional testing but remains LANGUAGE_QA_PENDING until competent human review.
