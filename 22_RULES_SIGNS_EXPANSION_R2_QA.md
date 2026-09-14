# RULES + SIGNS EXPANSION R2 — INTERNAL QA

Status: READY FOR PHONE ACCEPTANCE

Frozen predecessor:
`d36da7cdb8c8338ef852aff0fc4f21d8aaff11ff`

## Added Rules
- rules-016 — no parking within 9 m before a pedestrian crossing in an urban area
- rules-017 — no parking within 1.5 m on either side of a fire hydrant
- rules-018 — uncontrolled traffic circle: yield to traffic approaching from the right unless otherwise controlled

## Added Signs
- signs-014 — Speed Limit R201
- signs-015 — Parking Prohibited R216
- signs-016 — Stopping Prohibited R217

## Counts
- Total bank: 52
- Code 1 eligible: 38
  - Rules: 15
  - Signs: 16
  - Controls: 7
- Code 2 eligible: 42
  - Rules: 15
  - Signs: 16
  - Controls: 11

## Governance
- English: CONTENT_QA
- Afrikaans: LANGUAGE_QA_PENDING
- Xhosa: LANGUAGE_QA_PENDING

## Regression protections
- network-first refresh / offline fallback retained
- no-repeat Practice cycle retained
- pathway/progress separation retained
- Mock unchanged
- controls packs unchanged
- accessibility and speech unchanged

## Phone acceptance
1. Reopen installed app online once.
2. Practise → Rules: confirm one of rules-016/017/018 appears within first 15.
3. Practise → Signs: confirm one of signs-014/015/016 appears within first 16.
4. final offline Rules + Signs regression.
