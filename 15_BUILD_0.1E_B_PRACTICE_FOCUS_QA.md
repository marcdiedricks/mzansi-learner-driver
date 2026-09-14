# BUILD 0.1E-B — PRACTICE SECTION FOCUS CORRECTIVE QA

Status: INTERNAL PASS — PHONE RETEST REQUIRED

## Problem found during phone acceptance
The four new Motorcycle Controls were present and eligible, but Practice selected randomly from all 26 Code 1 questions. This made the new Controls difficult to deliberately reach and was poor topic-mastery UX.

## Minimal correction
Added Practice focus:
- All
- Rules
- Signs
- Controls

The selected focus filters the existing eligible question pool only. No question data, scoring or progress model is changed.

## Verified pools
### Code 1
- All: 26
- Rules: 9
- Signs: 10
- Controls: 7

Code 1 Controls:
- controls-006 front brake
- controls-007 rear brake
- controls-008 throttle
- controls-009 clutch
- controls-010 gear lever
- controls-011 indicator switch
- controls-012 mirrors

### Code 2
- Controls: 5
- no motorcycle-specific leakage

## Regression checks
- app.js syntax PASS
- i18n.js syntax PASS
- EN / AF / XH focus labels present
- High Contrast styling present
- Larger Text responsive layout present
- pathway-specific Practice progress keys preserved
- Mock structure preserved
- service-worker cache bumped to v0.1e-b-02

## Phone retest
After deployment:
1. Open installed app online once.
2. Motorcycle / Code 1 → Practice.
3. Confirm focus buttons visible.
4. Tap Controls.
5. Confirm only motorcycle Controls appear.
6. Verify clutch, gear lever, indicator switch and mirrors can be reached directly.
7. Spot-check All returns mixed Rules/Signs/Controls.
8. Final offline relaunch after acceptance.
