# CODE 2 LIGHT VEHICLE CONTROLS EXPANSION — INTERNAL QA

Status: READY FOR PHONE ACCEPTANCE

Frozen predecessor:
`4907bf05a07afa14a05cb32991d35f0e1b1384fd`

## Focus
Complete the basic NaTIS light-motor-vehicle control identification coverage without changing Code 1.

## Added
- controls-013 — centre rear-view mirror
- controls-014 — window wiper
- controls-015 — left/right rear-view mirrors
- controls-016 — gear lever
- controls-017 — parking brake
- controls-018 — horn

## Source
All six concepts are grounded in SRC-008:
NaTIS / Department of Transport — Vehicle Components and Controls, light motor vehicle identification of controls.

Question wording and explanations are original.

## Counts after expansion
- Total bank: 40
- Code 1 eligible: 26 (unchanged)
- Code 2 eligible: 30
  - Rules: 9
  - Signs: 10
  - Controls: 11

## Governance
- English: source-master meaning, CONTENT_QA
- Afrikaans: provisional, LANGUAGE_QA_PENDING
- Xhosa: provisional, LANGUAGE_QA_PENDING
- Deferred AF/XH human language gate remains in force.

## Regression controls
- Code 1 files unchanged
- Code 1 eligibility unchanged
- pathway storage/progress keys unchanged
- mock engine unchanged
- Practice section focus unchanged
- service-worker asset list unchanged; cache version bumped only

## Phone acceptance target
1. Code 2 → Practise → Controls.
2. Confirm new controls appear.
3. Confirm Code 1 still serves motorcycle controls only.
4. Final offline check after deployment.
