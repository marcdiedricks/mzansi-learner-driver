# RULES + SIGNS EXPANSION R4 — INTERNAL QA

Status: GITHUB-ONLY BATCH — DO NOT DEPLOY

Parent held batch:
R3 branch `build-rules-signs-expansion-r3-github-only`

## Added Rules
- rules-022 — mobile phone / communication device must not be held while driving or riding
- rules-023 — yield to pedestrian at pedestrian crossing; slow or stop if needed
- rules-024 — do not pass a vehicle stopped at a pedestrian crossing

## Added Signs
- signs-020 — Keep left R103
- signs-021 — Proceed straight only R107
- signs-022 — Turn left R108

## Sources
- SRC-006 — official NaTIS Rules of the Road §§6.52–6.53
- SRC-007 — official NaTIS Road Traffic Signs §3.2

## Projected consolidated bank after R3 + R4
- Total repository bank: 64
- Code 1 eligible: 50
  - Rules: 21
  - Signs: 22
  - Controls: 7
- Code 2 eligible: 54
  - Rules: 21
  - Signs: 22
  - Controls: 11

IMPORTANT:
The repository bank reaching 64 items does NOT mean the app is now an exact 64-question official CLLT simulator. Vehicle-path eligibility, official section composition, operational ordering and other official test details remain separate governance questions.

## Governance
- English: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING

## Cost-control lock
- Do not merge to main.
- Do not trigger Netlify.
- R4 is to be consolidated into the held R3 branch only.
- Production remains on the tested R2 frozen baseline until a larger acceptance batch justifies one deployment.

## Regression scope
No Practice, Mock, progress, pathway, accessibility, Read Aloud or service-worker logic changed.
