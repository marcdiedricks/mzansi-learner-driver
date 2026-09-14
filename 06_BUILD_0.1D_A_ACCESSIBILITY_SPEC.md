# BUILD 0.1D-A — ACCESSIBILITY FOUNDATION SPECIFICATION

Status: SPECIFICATION ONLY — NO CODE YET

Base frozen build: BUILD 0.1C-R1
Frozen baseline commit: `674814ae694bc78dae9fa7831505fa16d85d5ab7`

## Purpose

Improve accessibility for learners who may have low vision, reading difficulty, limited digital confidence, or use older / lower-cost Android phones, without disturbing the proven offline-first core.

This phase must remove real learner barriers. It must not add complexity for its own sake.

## Scope — ONLY these four changes

### 1. High Contrast
Add a simple two-state setting:
- Normal
- High Contrast

Requirements:
- Text, controls, question cards and feedback must remain clearly readable.
- Correct / incorrect answer states must not rely on colour alone.
- High Contrast must work in EN / AF / XH.
- Choice must be saved locally and restored after relaunch.
- Choice must work fully offline.

### 2. Larger Text
Add a simple two-state setting:
- Normal Text
- Larger Text

Requirements:
- Increase learner-facing text without breaking cards, buttons, questions or answer choices.
- No horizontal scrolling caused by the larger-text setting.
- Important actions must remain visible and easy to tap.
- Choice must be saved locally and restored after relaunch.
- Choice must work fully offline.

### 3. Accessibility Semantics
Improve the existing shell without redesigning it:
- Clear accessible names for interactive controls.
- Language selector clearly identified.
- Connection status understandable to assistive technology.
- Question answer choices grouped meaningfully.
- Feedback status identifiable beyond colour.
- Do not introduce heavy accessibility libraries.

### 4. Touch Targets
Verify and correct only where needed:
- Important buttons and answer choices must remain finger-friendly on ordinary Android phones.
- Avoid adding extra controls to the main learning journey.
- Settings must remain simple enough for a first-time smartphone learner.

## Explicitly OUT OF SCOPE

Do NOT build any of the following in 0.1D-A:
- Read-aloud / Web Speech
- Code 1 motorcycle pathway
- Code 3 pathway
- 64-question full mock
- Timed exam mode
- Road-sign flashcards
- DLTC checklist
- Dark mode
- New cloud services
- Login or account system
- AI API dependency
- New analytics / tracking

These are separate future phases and must not leak into this build.

## Settings UX rule

Accessibility settings should be easy to find but must not clutter the home screen.

Proposed minimal pattern:
- One small “Accessibility” control near the language selector or in a compact settings panel.
- Inside it, only:
  - High Contrast: Off / On
  - Larger Text: Off / On

No nested menus.

## Non-negotiable regression gates

The following frozen 0.1C-R1 behaviours must remain unchanged:

- EN / AF / XH still selectable.
- Selected language persists locally.
- Existing progress survives the upgrade.
- Code 2 filtering still excludes motorcycle-only content.
- Practice still works.
- 3-question mock remains Rules → Signs → Controls.
- PWA remains installable.
- Dedicated home-screen icon remains.
- Installed app relaunches fully offline.
- Practice, mock, languages and progress continue to work offline.
- No cloud, login or AI dependency.

## Acceptance test sequence — real Android phone

This phase may not be frozen until Marc verifies it on his phone.

### A. Baseline upgrade
1. Open upgraded app online once.
2. Confirm existing progress is still present.
3. Confirm EN / AF / XH still work.

### B. High Contrast
1. Turn High Contrast ON.
2. Check home screen, Practice and Mock.
3. Answer one correct and one incorrect question.
4. Confirm states are understandable without relying only on colour.
5. Close and reopen app.
6. Confirm High Contrast remains selected.

### C. Larger Text
1. Turn Larger Text ON.
2. Check home screen, Practice and Mock.
3. Confirm no horizontal scrolling or clipped controls.
4. Close and reopen app.
5. Confirm Larger Text remains selected.

### D. Combined settings
1. Turn High Contrast and Larger Text ON together.
2. Check EN, AF and XH.
3. Confirm layouts remain usable.

### E. Offline relaunch
1. While online, allow upgraded app to load once.
2. Close installed app.
3. Turn Wi-Fi OFF and mobile data OFF.
4. Relaunch from the installed Mzansi Learner icon.
5. Confirm both accessibility settings remain applied.
6. Open Practice.
7. Start Mock Test.
8. Switch language once.
9. Confirm saved progress remains.

## Freeze rule

BUILD 0.1D-A may be marked PASS + FROZEN only after the real-phone tests above pass.

If any test fails:
FIX → RETEST → VERIFY → FREEZE.

Do not redesign the frozen product while fixing an accessibility defect.
