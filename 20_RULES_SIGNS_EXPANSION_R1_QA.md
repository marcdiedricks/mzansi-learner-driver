# RULES + SIGNS EXPANSION R1 — INTERNAL QA

Status: READY FOR PHONE ACCEPTANCE

Frozen predecessor:
`c94ffec96fb31b166161b225afc408633c733579`

## Added Rules
- rules-013 — 2-second following distance for Code 1 / Code 2
- rules-014 — increase following distance in adverse conditions
- rules-015 — no parking within 5 m of an intersection in an urban area

## Added Signs
- signs-011 — No Entry R3
- signs-012 — Yield at traffic circle R2.2
- signs-013 — Children warning W308/TW308

## Sources
- SRC-006 — official NaTIS Rules of the Road
- SRC-007 — official NaTIS Road Traffic Signs

All learner-facing question wording is original.

## Counts
- Total bank: 46
- Code 1 eligible: 32
  - Rules: 12
  - Signs: 13
  - Controls: 7
- Code 2 eligible: 36
  - Rules: 12
  - Signs: 13
  - Controls: 11

## Governance
- English source-master meaning: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING
- Deferred human language gate remains active.

## Regression controls
- Practice no-repeat cycle unchanged
- Code 1 / Code 2 progress separation unchanged
- Mock engine unchanged
- accessibility and read-aloud unchanged
- controls packs unchanged
- offline asset list unchanged; cache version bumped only

## First phone acceptance
1. Reopen installed app online once.
2. Practise → Rules and confirm one new Rules item appears within first 12-item cycle.
3. Practise → Signs and confirm one new Signs item appears within first 13-item cycle.
