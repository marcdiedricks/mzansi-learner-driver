# RULES + SIGNS EXPANSION R3 — INTERNAL QA

Status: GITHUB-ONLY BATCH — DO NOT DEPLOY YET

Frozen production predecessor:
`97c661e637a98f1782d8ad534366dba46bb03e83`

## Added Rules
- rules-019 — freeway lane discipline: keep left, overtake right
- rules-020 — being overtaken: keep safely left and do not accelerate
- rules-021 — do not overtake into possible oncoming traffic near a crest/curve with restricted view

## Added Signs
- signs-017 — No U-turn R213
- signs-018 — Proceed left only R105
- signs-019 — Turn right R109

## Sources
- SRC-006 — official NaTIS Rules of the Road
- SRC-007 — official NaTIS Road Traffic Signs

## Bank if this batch is eventually merged
- Total: 58
- Code 1 eligible: 44
  - Rules: 18
  - Signs: 19
  - Controls: 7
- Code 2 eligible: 48
  - Rules: 18
  - Signs: 19
  - Controls: 11

## Governance
- English source-master meaning: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING

## Cost-control lock
DO NOT MERGE THIS PR TO MAIN YET.
DO NOT TRIGGER NETLIFY FOR THIS BATCH.
Hold R3 in GitHub and combine it with the next meaningful batch before one consolidated production acceptance deployment.

## Regression assumptions
No Practice, Mock, progress, accessibility, pathway or service-worker logic changed in R3.
Only question-bank content and the expected bank count changed.
