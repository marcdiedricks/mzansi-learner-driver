# BUILD 0.1E-A — INTERNAL CONTENT + ARCHITECTURE QA

Status: INTERNAL CHECK PASS — REAL-PHONE TEST STILL REQUIRED

## Question-bank integrity
- Total pilot items: 30
- Unique IDs: 30

### Code 1 eligible
- Rules: 9
- Signs: 10
- Controls: 3
- Total: 22

Code 1-specific items:
- rules-005 — motorcycle headlamp
- rules-011 — learner passenger restriction
- rules-012 — protective helmet
- controls-006 — front brake
- controls-007 — rear brake
- controls-008 — throttle

### Code 2 eligible
- Rules: 9
- Signs: 10
- Controls: 5
- Total: 24

Regression check:
- No Code 1-specific item is eligible for Code 2.
- No Code 2-specific control is eligible for Code 1.

## Pathway architecture
- Motorcycle / Code 1 and Light Motor Vehicle / Code 2 selector present.
- Selection stored locally.
- Existing progress migration targets Code 2.
- Code 1 and Code 2 Practice statistics use separate keys.
- Code 1 and Code 2 Mock history use separate keys.
- Weak Areas and Readiness read the selected pathway only.

## Multilingual
All 30 items contain EN / AF / XH text.
New AF / XH motorcycle translations remain LANGUAGE_QA_PENDING, consistent with current pilot governance.

## Accessibility / offline regression
- High Contrast retained.
- Larger Text retained.
- Read-Aloud controls retained.
- Graceful speech-unavailable fallback retained.
- Motorcycle pack added to service-worker cache.
- No cloud, login, AI or microphone dependency introduced.

## Phone test still required
The build must NOT be frozen until:
- Code 2 progress migration is visibly confirmed on Marc's phone;
- Code 1 pathway selection persists;
- Code 1 Practice shows motorcycle-specific content;
- Code 1 Mock uses Rules → Signs → Motorcycle Controls;
- Code 2 excludes motorcycle-only items;
- pathway progress remains separate;
- EN / AF / XH and accessibility still work;
- installed-app offline relaunch passes.
