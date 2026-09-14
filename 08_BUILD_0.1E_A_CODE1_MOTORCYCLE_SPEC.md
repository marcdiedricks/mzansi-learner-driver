# BUILD 0.1E-A — CODE 1 MOTORCYCLE PATHWAY SPECIFICATION

Status: SPECIFICATION ONLY — NO CODE YET

Base frozen build: BUILD 0.1D-B
Frozen baseline commit: `f2e3f55c959c410309c7418888a3c1a795ff5032`

## Purpose

Introduce a proper Motorcycle learner pathway without contaminating the frozen Code 2 Light Vehicle experience.

The earlier pilot exposed a real product defect risk: a motorcycle-only question appeared inside the Code 2 mock because vehicle class was not treated as a first-class learning pathway.

0.1E-A fixes the architecture before content expansion.

The new pathway must be:
- South African
- evidence-controlled
- offline-first
- multilingual
- novice-friendly
- usable on ordinary Android phones
- clearly separated from Code 2

## Product principle

A learner must never receive a vehicle-specific question that does not belong to the learner pathway they selected.

Vehicle pathway becomes a core filter, not a cosmetic label.

## Pathways in this phase

### Pathway 1 — Motorcycle
Working learner-facing label:
- Motorcycle / Code 1

Terminology must remain subject to source verification because official material may also use licence categories such as A1 / A.

### Pathway 2 — Light Motor Vehicle
Working learner-facing label:
- Light Motor Vehicle / Code 2

The existing tested Code 2 pathway remains the protected baseline.

## Terminology verification gate

Before coding the learner-facing selector, verify the official current Western Cape / national wording for:
- Code 1
- A1
- A
- Code 2
- B
- EB

Do not assume these terms are perfectly interchangeable.

The final learner-facing wording must be understandable to ordinary users while preserving official meaning.

## Scope — ONLY these changes

### 1. Vehicle pathway selector

Add a simple learner choice:
- Motorcycle / Code 1
- Light Motor Vehicle / Code 2

Requirements:
- one clear selection screen or compact control
- no complex settings menu
- selected pathway stored locally
- selected pathway restored after relaunch
- selected pathway works offline
- learner can change pathway deliberately
- pathway change must never erase progress from the other pathway

### 2. Separate local progress by pathway

Practice and mock progress must no longer be treated as one combined pool.

Store separately at minimum:
- Code 1 practice statistics
- Code 1 mock history
- Code 2 practice statistics
- Code 2 mock history

Existing Code 2 progress must be preserved during migration.

No destructive reset.

### 3. Question eligibility architecture

Every question must remain explicitly classified by vehicle applicability.

Allowed patterns:
- common to all relevant pathways
- Code 1 only
- Code 2 only

A question may never appear in a pathway unless its vehicle applicability allows it.

The eligibility filter must be applied consistently to:
- Practice
- Mock
- Weak Areas
- Readiness

### 4. Shared vs vehicle-specific content rule

#### May be shared when officially applicable
- general road rules
- road signs
- road markings
- signals

#### Must be vehicle-specific where appropriate
- motorcycle controls
- motorcycle operating rules
- motorcycle-specific safety behaviour
- light-vehicle controls
- vehicle-specific operating rules

Do not duplicate shared questions merely to create separate files unless duplication is necessary for source or translation control.

### 5. Minimum usable Code 1 pilot

Code 1 must NOT be released as an empty pathway or “coming soon” shell.

Before activation, the Code 1 pilot must contain enough source-verified material to support:
- at least one eligible Rules question
- at least one eligible Signs question
- at least one eligible Motorcycle Controls question
- a 3-question pilot mock using Rules → Signs → Controls
- normal Practice mode

The actual minimum content-bank size must be agreed after source review.

No arbitrary question target should be invented merely to fill the app.

### 6. Motorcycle Controls source gate

Do not write motorcycle control questions from memory.

Motorcycle control items must be derived from authoritative source material and recorded with:
- source ID
- source locator
- vehicle group
- verification status
- EN source-master text
- AF / XH translation status
- version

Examples of controls that may require verification include:
- throttle / accelerator control
- front brake
- rear brake
- clutch
- gear selector
- steering / handlebars
- indicators
- horn
- lighting controls

This list is a research checklist only, NOT approved content.

### 7. Motorcycle-specific Rules source gate

Verify motorcycle-specific rules before creating questions.

Potential research topics include:
- headlamp use
- protective equipment / helmet rules
- lane behaviour
- carrying passengers
- overtaking / positioning
- vehicle-specific restrictions
- visibility and signalling

These are research topics only until verified against authoritative sources.

### 8. Existing 3-question pilot mock

In 0.1E-A implementation, retain the existing short pilot structure:
- 1 Rules
- 1 Signs
- 1 Controls

For Motorcycle, Controls must be motorcycle-eligible.
For Light Motor Vehicle, Controls must remain Code 2 eligible.

Do NOT build the full 64-question mock in this phase.

### 9. Multilingual requirement

Any Code 1 learner-facing feature must work in:
- English
- Afrikaans
- isiXhosa

English remains the source-master meaning.

Afrikaans and isiXhosa content must follow the existing translation QA discipline.

Do not activate a motorcycle question in a language where the required text is missing.

### 10. Accessibility requirement

Code 1 must inherit all frozen accessibility behaviour:
- High Contrast
- Larger Text
- colour-independent feedback
- optional Read-Aloud controls
- graceful speech-unavailable fallback

No separate accessibility implementation for Motorcycle.

## Content governance

Keep the existing release pipeline:

DRAFT
→ SOURCE_VERIFIED
→ CONTENT_QA
→ LANGUAGE_QA
→ RELEASED

No AI-generated question enters RELEASED merely because it sounds plausible.

Every released Motorcycle question must have traceable source evidence.

## Offline architecture

No new online dependency.

The pathway selector, questions, progress and mock must work after the installed PWA has loaded once.

Required:
- service-worker caching
- IndexedDB / existing local storage pattern
- no login
- no cloud database
- no AI API

## Privacy

Vehicle-pathway selection and progress stay on the device.

Do not collect:
- identity numbers
- licence booking details
- location
- phone number
- email
- biometric information

## Explicitly OUT OF SCOPE

Do NOT add in 0.1E-A:
- Code 3 / heavy vehicle pathway
- full 64-question mock
- timed official simulator
- road-sign flashcards
- DLTC checklist
- 11-language expansion
- dark mode
- cloud sync
- account/login
- AI tutor
- booking integration
- official-test branding or claim of exact simulation

## Regression gates from frozen 0.1D-B

The following must remain unchanged:
- installed PWA + icon
- offline relaunch
- EN / AF / XH
- High Contrast
- Larger Text
- optional Read-Aloud layer
- graceful speech fallback
- Code 2 Practice
- Code 2 3-question Mock
- colour-independent feedback
- existing Code 2 progress
- no cloud / login / AI dependency

## Required pre-code evidence review

Before implementation begins, produce a short verified evidence table covering:

| Topic | Source | Status | Build use |
|---|---|---|---|
| Code 1 / A1 / A terminology | Official source | Verify | Selector wording |
| Motorcycle learner eligibility / category | Official source | Verify | Pathway guidance |
| Motorcycle controls | Official source | Verify | Controls questions |
| Motorcycle-specific road rules | Official source | Verify | Rules questions |
| Shared road signs | Official source | Existing / verify | Shared bank |
| Current CLLT section structure | Official source | Existing verified | Mock architecture |

No code until this evidence review is accepted.

## Real-phone acceptance sequence after implementation

### A. Upgrade safety
1. Open upgraded app online once.
2. Confirm existing Code 2 progress remains.
3. Confirm High Contrast, Larger Text and language preference remain.

### B. Pathway selector
1. Select Motorcycle / Code 1.
2. Confirm selection persists after closing and reopening.
3. Change to Light Motor Vehicle / Code 2.
4. Confirm selection persists independently of language.

### C. Code 1 Practice
1. Open Practice.
2. Confirm only common or Code 1-eligible content appears.
3. Confirm at least one motorcycle-specific Rules item.
4. Confirm at least one motorcycle-specific Controls item.
5. Confirm no Code 2-only Controls item appears.

### D. Code 1 Mock
1. Start 3-question mock.
2. Confirm sequence Rules → Signs → Motorcycle Controls.
3. Confirm scoring and Next / Finish work normally.

### E. Code 2 regression
1. Switch to Code 2.
2. Open Practice.
3. Start Mock.
4. Confirm motorcycle-only items do NOT appear.
5. Confirm existing Code 2 progress remains intact.

### F. Progress separation
1. Complete Code 1 practice.
2. Switch to Code 2.
3. Confirm Code 2 statistics were not altered by Code 1 work.
4. Return to Code 1 and confirm Code 1 statistics remain.

### G. Multilingual + accessibility
1. Test Code 1 in EN.
2. Test AF.
3. Test XH.
4. Turn High Contrast + Larger Text ON.
5. Confirm no clipping or sideways scrolling.
6. Confirm Read-Aloud control / graceful fallback still works.

### H. Offline relaunch
1. Close app.
2. Turn Wi-Fi OFF and mobile data OFF.
3. Relaunch from installed icon.
4. Confirm selected pathway is retained.
5. Confirm Code 1 Practice works.
6. Confirm Code 1 Mock starts.
7. Switch to Code 2 and confirm Code 2 works.
8. Switch language once.
9. Confirm both pathway progress records remain.
10. Close and relaunch once more while offline.

## Freeze rule

BUILD 0.1E-A may be marked PASS + FROZEN only after:
1. terminology and source evidence are verified,
2. the Code 1 pilot contains real verified content,
3. Code 2 remains unaffected,
4. pathway-specific progress is proven,
5. the installed-app offline relaunch passes.

If any gate fails:
FIX → RETEST → VERIFY → FREEZE.

Do not redesign the frozen product while fixing a pathway defect.
