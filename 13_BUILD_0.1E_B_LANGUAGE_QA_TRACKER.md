# BUILD 0.1E-B — CODE 1 LANGUAGE QA TRACKER

Status: WORKING QA TRACKER

## Rules

| ID | Topic | AF Status | XH Status | QA risk / note |
|---|---|---|---|---|
| rules-005 | Motorcycle headlamp | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Check consistent terms for headlamp / public road / all times |
| rules-011 | Learner passenger restriction | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Check learner-licence wording and passenger terminology |
| rules-012 | Protective helmet | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Check protective-helmet wording and fastening language |

## Existing Controls

| ID | Topic | AF Status | XH Status | QA risk / note |
|---|---|---|---|---|
| controls-006 | Front brake | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | XH currently uses borrowed terms such as ibrake / ilever |
| controls-007 | Rear brake | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Check foot-operated wording; avoid implying a hand lever |
| controls-008 | Throttle | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | AF terminology consistency; XH currently uses ithrottle |

## Proposed New Controls

| Proposed ID | Topic | AF Status | XH Status | QA risk / note |
|---|---|---|---|---|
| controls-009 | Clutch | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Decide consistent AF clutch term; XH technical term requires human review |
| controls-010 | Gear lever | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Check rathefboom / learner-friendly AF term; XH requires human review |
| controls-011 | Indicator switch | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Keep signalling meaning clear; align with current indicator terminology |
| controls-012 | Mirrors | LANGUAGE_QA_PENDING | LANGUAGE_QA_PENDING | Distinguish mirror/component from abstract “rear-view” wording |

## Approval rule

No AF or XH Code 1-specific item moves to LANGUAGE_QA_APPROVED until a competent human reviewer confirms:
- source meaning preserved,
- learner wording is natural,
- technical terms are understandable,
- distractors remain unambiguous,
- explanation remains accurate.

## Important

Phone screenshots prove layout and functional delivery only.

They do **not** prove linguistic quality.

Do not infer language approval from successful rendering.


## 0.1E-B implementation note

Provisional Afrikaans and isiXhosa learner text has now been added for controls-009 to controls-012 so the full multilingual UI can be phone-tested.

This does **not** constitute language approval.

All 10 Code 1-specific items remain subject to competent human AF/XH review before any translation is marked LANGUAGE_QA_APPROVED or RELEASED.
