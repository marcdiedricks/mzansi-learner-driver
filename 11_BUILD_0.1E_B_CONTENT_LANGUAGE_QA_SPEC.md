# BUILD 0.1E-B — CODE 1 CONTENT & LANGUAGE QA EXPANSION

Status: SPECIFICATION ONLY — NO CODE YET

Base frozen build: BUILD 0.1E-A
Frozen baseline commit: `686d440d476e794fb7061dc7d5e5ad1f8478ea42`

## Purpose

Strengthen the Motorcycle / Code 1 content bank and complete a disciplined Afrikaans / isiXhosa language-QA process before any larger mock-test expansion.

This phase is NOT about increasing question count for its own sake.

It is about:
- better Code 1 coverage,
- cleaner source traceability,
- stronger multilingual wording,
- less repetition,
- more realistic practice variation,
- preserving the proven offline-first architecture.

## Non-negotiable rule

NO QUESTION IS RELEASED JUST BECAUSE IT SOUNDS CORRECT.

Every new or revised item must pass:

DRAFT
→ SOURCE_VERIFIED
→ CONTENT_QA
→ LANGUAGE_QA
→ RELEASED

English remains the source-master meaning.

Afrikaans and isiXhosa must preserve the exact learning meaning without awkward literal translation.

## Current frozen Code 1 baseline

Code 1 currently has:
- Rules: 9 eligible
- Signs: 10 eligible
- Controls: 3 eligible
- Total: 22 eligible

Motorcycle-specific items currently include:
- headlamp
- learner passenger restriction
- protective helmet
- front brake
- rear brake
- throttle

The current pilot is functionally proven on-phone and offline.

## Scope — ONLY these workstreams

### 1. Language QA of existing Code 1-specific items

Review all existing Motorcycle / Code 1-specific EN / AF / XH text.

For every item verify:
- question meaning
- option meaning
- explanation meaning
- plain-language clarity
- terminology consistency
- no accidental change in legal or technical meaning
- no unnatural literal translation
- no ambiguous answer created by translation

Track each language independently.

Allowed statuses:
- LANGUAGE_QA_PENDING
- LANGUAGE_QA_REVIEWED
- LANGUAGE_QA_APPROVED
- LANGUAGE_QA_REVISE

Do not mark AF or XH RELEASED until approved.

### 2. Build a Language QA Tracker

Create a structured tracker covering:
- question ID
- section
- English source-master
- Afrikaans review status
- isiXhosa review status
- issue found
- proposed correction
- reviewer note
- final approval status

The tracker is a governance artifact, not a learner-facing screen.

### 3. Controlled Code 1 content expansion

Expand only where authoritative source coverage already exists or can be verified cleanly.

Priority content areas:

#### Motorcycle Controls
Potentially expand from the verified NaTIS control set:
- clutch
- gear lever
- handlebars
- mirrors
- indicator switch

Only add items that improve real learner coverage.

#### Motorcycle Rules
Potential verified expansion areas:
- motorcycle learner passenger restriction
- protective helmet
- headlamp
- other clearly sourced motorcycle-specific operating rules

Do not invent advanced riding technique questions.

#### Shared Rules and Signs
Existing vehicle-neutral content may remain shared.
Do not duplicate shared questions merely to increase Code 1 totals.

### 4. Minimum useful expansion target

Do NOT force an arbitrary large bank.

Recommended first target:
- add approximately 4–6 source-verified motorcycle-specific items
- prioritise Controls because Code 1 currently has only 3 Controls
- maintain balance across Rules / Signs / Controls

Final count depends on evidence quality, not a quota.

### 5. Duplicate / ambiguity QA

Before release, test the whole Code 1 bank for:
- duplicate questions
- near-duplicate questions
- repeated answer patterns
- weak distractors
- ambiguous wording
- two answers that could both appear correct
- inconsistent terminology between EN / AF / XH
- questions that accidentally depend on vehicle type not reflected in eligibility

### 6. Plain-language QA

Each item should be understandable to a learner with limited formal education.

Prefer:
- short sentences
- one concept per question
- familiar words
- no unnecessary legal jargon

Where legal meaning requires a technical term:
- keep the correct term
- explain it simply

### 7. Translation architecture

Keep:
- EN = source-master
- AF = translated learner text
- XH = translated learner text

Do NOT independently author AF / XH versions that drift from English source meaning.

Any English content revision automatically reopens AF / XH language QA.

### 8. Accessibility regression

All revised or new items must continue to work with:
- High Contrast
- Larger Text
- colour-independent feedback
- Read Aloud
- Read Feedback
- graceful speech fallback
- long translated text wrapping

No horizontal scrolling.

### 9. Offline regression

No new network dependency.

The expanded bank and all language text must remain cached for installed-app offline use.

### 10. Progress protection

Do not change:
- Code 1 progress keys
- Code 2 progress keys
- migration logic
- pathway persistence

Content updates must not reset progress.

## Explicitly OUT OF SCOPE

Do NOT add in 0.1E-B:
- full 64-question mock
- timed mock
- Code 3
- road-sign flashcard system
- DLTC checklist
- 11-language rollout
- account/login
- cloud sync
- AI tutor
- booking integration
- major visual redesign

## Pre-code evidence review

Before implementation, produce:

| Area | Source | Existing coverage | Gap | Proposed item count | Status |
|---|---|---:|---:|---:|---|
| Motorcycle Rules | Official source | current | verify | small | REVIEW |
| Motorcycle Controls | NaTIS | current | verify | small | REVIEW |
| Shared Signs | NaTIS | sufficient for pilot | none / minor | 0 | KEEP |
| Shared Rules | NaTIS | sufficient for pilot | none / minor | 0 | KEEP |
| Afrikaans language QA | Current bank | pending | all Code 1-specific | n/a | REVIEW |
| isiXhosa language QA | Current bank | pending | all Code 1-specific | n/a | REVIEW |

No production content changes until this evidence + gap review is accepted.

## Acceptance sequence after implementation

### A. Content integrity
- all IDs unique
- all source locators present
- no unsupported item
- no duplicate/near-duplicate item
- correct indexes valid

### B. Language QA
- every Code 1-specific AF item has a QA status
- every Code 1-specific XH item has a QA status
- no approved translation changes source meaning
- long translations fit phone layout

### C. Code 1 Practice
- new items appear in Practice
- old verified items remain available
- no Code 2-only control appears

### D. Code 1 Mock
- 3-question pilot still uses Rules → Signs → Motorcycle Controls
- new Controls can appear
- scoring remains unchanged

### E. Code 2 regression
- Code 2 bank unaffected
- no motorcycle-only leakage
- existing Code 2 progress retained

### F. Multilingual / accessibility
- EN / AF / XH
- High Contrast
- Larger Text
- Read Aloud / fallback
- no clipping / horizontal scrolling

### G. Offline relaunch
- installed icon launch offline
- Code 1 Practice loads
- Code 1 Mock starts
- Code 2 still works
- pathway progress remains separate
- languages switch offline

## Freeze rule

BUILD 0.1E-B may be marked PASS + FROZEN only after:
1. evidence-gap review is approved,
2. content QA passes,
3. language QA status is explicit for every Code 1-specific item,
4. phone tests pass,
5. final offline relaunch passes.

If any item fails:
FIX → RETEST → VERIFY → FREEZE.
