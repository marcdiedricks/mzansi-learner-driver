# BUILD 0.1E-B — INTERNAL CONTENT QA

Status: INTERNAL CHECK PASS — REAL-PHONE TEST REQUIRED

## Bank integrity
- Total questions: 34
- Unique IDs: 34

### Code 1 eligible
- Rules: 9
- Signs: 10
- Controls: 7
- Total: 26

### Code 2 eligible
- Rules: 9
- Signs: 10
- Controls: 5
- Total: 24

## New 0.1E-B controls
- controls-009 — clutch
- controls-010 — gear lever
- controls-011 — indicator switch
- controls-012 — mirrors

All four:
- Code 1 only
- source ID SRC-008
- source verified
- English content at CONTENT_QA
- AF / XH text present
- AF / XH status LANGUAGE_QA_PENDING
- correct index valid
- three distinct options
- original learner-facing wording

## Leakage check
- Code 1-specific items in Code 2: NONE
- Code 2-only items in Code 1: NONE

## Duplicate / ambiguity check
Automated near-duplicate scan flagged only:
- controls-006 front brake
- controls-007 rear brake

This is an intentional existing pair testing different controls and is not a content duplicate.

No new 0.1E-B item triggered the near-duplicate threshold.

## Technical regression
- app.js syntax PASS
- expected pilot count updated 30 → 34
- service-worker cache bumped to v0.1e-b-01
- motorcycle pack remains cached
- pathway/progress architecture untouched
- mock structure untouched
- accessibility architecture untouched

## Language governance
Functional translations do not equal language approval.

All 10 Code 1-specific AF/XH items must retain explicit QA status.
No translated item is marked RELEASED by this build.

## Phone test required before freeze
1. Existing Code 1 and Code 2 progress preserved.
2. New clutch / gear lever / indicator switch / mirrors appear in Code 1 Practice.
3. New Motorcycle Controls can appear in Code 1 Mock.
4. Code 2 remains free of motorcycle-only content.
5. EN / AF / XH layouts remain usable.
6. High Contrast + Larger Text remain stable.
7. Read-Aloud / fallback remains stable.
8. Installed-app offline relaunch passes.
