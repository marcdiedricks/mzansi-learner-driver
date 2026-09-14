# RULES + SIGNS EXPANSION R6 — INTERNAL QA

Status: GITHUB-ONLY — DO NOT DEPLOY

Frozen production predecessor:
`3b0ae9074684d3ca0e7ee4bbdca136078f8933bd`

## Added Rules
- rules-028 — give a clear signal before changing direction, reducing speed or stopping
- rules-029 — left-turn positioning
- rules-030 — right-turn yielding to oncoming traffic

## Added Signs
- signs-026 — One-Way Roadway R4
- signs-027 — Pedestrian Priority R5
- signs-028 — Yield to Oncoming Traffic R6

## Sources
- SRC-006 — official NaTIS Rules of the Road
- SRC-007 — official NaTIS Road Traffic Signs

## Governance
- English: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING

## Cost-control lock
- Do not merge to main.
- Do not trigger Netlify.
- Hold R6 for consolidation with a later batch.

## Regression scope
No Practice, Mock, progress, pathway, accessibility, Read Aloud or service-worker logic changed.
Only question-bank content and the expected repository-bank count changed.
