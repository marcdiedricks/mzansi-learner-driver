# RULES + SIGNS EXPANSION R7 — INTERNAL QA

Status: GITHUB-ONLY — DO NOT DEPLOY

Parent held batch:
R6 branch `build-rules-signs-expansion-r6-github-only`

## Added Rules
- rules-031 — stopping on a freeway
- rules-032 — allow merging from an on-ramp
- rules-033 — cross or enter a public road only when safe

## Added Signs
- signs-029 — Pedestrians prohibited R218/TR218
- signs-030 — Pedal cycles prohibited R219/TR219
- signs-031 — Motorcycles prohibited R222/TR222

## Sources
- SRC-006 — official NaTIS Rules of the Road §§6.56, 6.59
- SRC-007 — official NaTIS Road Traffic Signs regulatory prohibition signs

## Governance
- English: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING

## Cost-control lock
- Do not merge to main.
- Do not trigger Netlify.
- Consolidate R7 only into the held R6 branch.

## Regression scope
No Practice, Mock, progress, pathway, accessibility, Read Aloud or service-worker logic changed.
