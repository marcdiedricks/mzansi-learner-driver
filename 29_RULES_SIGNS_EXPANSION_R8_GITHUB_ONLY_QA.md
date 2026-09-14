# RULES + SIGNS EXPANSION R8 — INTERNAL QA

Status: GITHUB-ONLY — DO NOT DEPLOY

Parent held batch:
R6 + R7 consolidated branch `build-rules-signs-expansion-r6-github-only`

## Added Rules
- rules-034 — reverse only when safe
- rules-035 — maintain complete control and full view ahead
- rules-036 — no stopping on right-hand side facing oncoming traffic

## Added Signs
- signs-032 — Railway crossing warning W403/W404
- signs-033 — T-junction warning W409/TW409
- signs-034 — Traffic signals out of order TW412

## Sources
- SRC-006 — official NaTIS Rules of the Road §§6.48–6.49
- SRC-007 — official NaTIS Road Traffic Signs warning signs

## Governance
- English: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING

## Cost-control lock
- Do not merge to main.
- Do not trigger Netlify.
- Consolidate R8 only into the held R6 + R7 branch.

## Regression scope
No Practice, Mock, progress, pathway, accessibility, Read Aloud or service-worker logic changed.
