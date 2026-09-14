# R3 + R4 + R5 — CONSOLIDATED PRODUCTION ACCEPTANCE

Status: READY FOR ONE CONSOLIDATED DEPLOYMENT

Production predecessor:
`97c661e637a98f1782d8ad534366dba46bb03e83`

Held consolidated content:
- R3: 3 Rules + 3 Signs
- R4: 3 Rules + 3 Signs
- R5: 3 Rules + 3 Signs

## Verified bank
- Total unique questions: 70
- Duplicate IDs: 0
- Code 1 eligible: 55
  - Rules: 23
  - Signs: 25
  - Controls: 7
- Code 2 eligible: 60
  - Rules: 24
  - Signs: 25
  - Controls: 11

## Release preparation
- App expects 70 total repository questions.
- Service-worker cache bumped once for the consolidated release.
- Network-first online refresh / offline fallback retained.
- No Practice, Mock, progress, pathway, accessibility or Read Aloud logic changed.

## Governance
- English: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING
- This is not claimed as an exact official 64-question CLLT simulator.

## Cost-control
This release is the planned single Netlify deployment for the combined R3 + R4 + R5 acceptance batch.

## Phone acceptance
1. Reopen installed app online once.
2. Practise → Rules: confirm one new R3/R4/R5 Rules item appears.
3. Practise → Signs: confirm one new R3/R4/R5 Signs item appears.
4. Confirm Code 1 and Code 2 Controls still remain separated.
5. Final offline Rules + Signs regression.
