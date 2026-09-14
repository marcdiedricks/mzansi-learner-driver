# RULES + SIGNS EXPANSION R5 — INTERNAL QA

Status: GITHUB-ONLY BATCH — DO NOT DEPLOY

Parent held batch:
R3 + R4 consolidated branch `build-rules-signs-expansion-r3-github-only`

## Added Rules
- rules-025 — hooter only when necessary for safety
- rules-026 — immediate right of way to emergency vehicle using siren and warning lights
- rules-027 — Code 2/3 light motor vehicle braking equipment

## Added Signs
- signs-023 — Yield R2
- signs-024 — Left turn prohibited R211
- signs-025 — Right turn prohibited R212

## Sources
- SRC-006 — official NaTIS Rules of the Road §§6.14.2, 6.15, 6.16
- SRC-007 — official NaTIS Road Traffic Signs §3.1 / regulatory prohibition signs

## Projected consolidated bank after R3 + R4 + R5
- Total repository bank: 70
- Code 1 eligible: 55
- Code 2 eligible: 60

## Governance
- English: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING

## Cost-control lock
- Do not merge to main.
- Do not trigger Netlify.
- Consolidate R5 only into the held R3 + R4 branch.
- Production remains on frozen R2 until one larger acceptance batch justifies a deployment.

## Regression scope
No Practice, Mock, progress, pathway, accessibility, Read Aloud or service-worker logic changed.
