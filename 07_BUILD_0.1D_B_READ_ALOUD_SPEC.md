# BUILD 0.1D-B — READ-ALOUD ACCESSIBILITY SPECIFICATION

Status: SPECIFICATION ONLY — NO CODE YET

Base frozen build: BUILD 0.1D-A
Frozen baseline commit: `eadb87618628632cdb9a94fe1d0d703c4ec86702`

## Purpose

Add optional read-aloud support for learners who may have:
- low literacy
- dyslexia or other reading difficulties
- reduced vision
- limited confidence reading dense test text

The feature is a learning-accessibility aid only.

It must NOT be presented as a reproduction of the official Oral Learner's Licence test.

## Non-negotiable principle

SPEECH IS OPTIONAL.

The PWA must continue to work completely when:
- the device has no speech synthesis support
- no suitable language voice is installed
- the learner is offline
- the learner chooses not to use read-aloud
- the speech engine fails

No question, answer, score, language, progress or navigation function may depend on speech.

## Technical approach

Use the browser / device Speech Synthesis API where available.

No:
- cloud text-to-speech API
- microphone
- speech recognition
- login
- paid service
- downloaded audio pack in this phase

Speech synthesis must not create a network dependency in the core app.

## Scope — ONLY these changes

### 1. Read Question button
Add one small but finger-friendly control on Practice and Mock question cards:

- icon + text, e.g. "Read aloud"
- learner taps it deliberately
- no automatic speaking when a question opens

When activated, read:
1. the question
2. Answer A
3. Answer B
4. Answer C

Do not read the correct answer before the learner answers.

### 2. Read Feedback button
After an answer is submitted, allow the learner to hear:
- Correct / Not quite
- the explanation

This must be a separate learner action.

### 3. Stop control
While speech is playing:
- the same control must allow the learner to stop speech
- opening another question or leaving the screen must stop current speech

Avoid overlapping speech.

### 4. Language-aware voice selection
Attempt to choose a voice matching the selected app language:
- English: prefer South African English if available, otherwise an English voice
- Afrikaans: prefer Afrikaans voice if available
- isiXhosa: prefer isiXhosa / Xhosa voice if available

If a suitable voice is not available:
- do not silently read in the wrong language
- show a simple non-blocking message that read-aloud is not available for that language on this phone
- the learner continues normally with text

### 5. Accessibility semantics
Read-aloud controls must have clear accessible names.
Speech status must be understandable to assistive technology where practical.

## Offline rule

Read-aloud availability may vary by phone because some speech voices are installed locally and some may rely on device services.

Therefore:

- The app shell, questions, answers, explanations, progress and all accessibility settings MUST remain fully offline.
- Read-aloud is PASS if it works where a compatible local voice is available.
- Read-aloud being unavailable offline must NOT make the app fail.
- The UI must explain unavailable speech simply and without blaming the learner.

## Data / privacy rule

Read-aloud must:
- not record the learner
- not request microphone permission
- not upload learner speech
- not send question text to a new third-party API introduced by this build
- not add analytics or tracking

## Settings UX

Do NOT add a complex speech settings page.

In 0.1D-B:
- keep High Contrast and Larger Text exactly as they are
- Read-Aloud is invoked directly from the question / feedback area
- no voice picker
- no speed slider
- no pitch control

Those would be future enhancements only if real learners demonstrate a need.

## Multilingual requirement

The control labels and messages must be available in:
- EN
- AF
- XH

Question speech must follow the language currently selected in the app.

Switching language must stop any current speech immediately.

## Explicitly OUT OF SCOPE

Do NOT add:
- Code 1 motorcycle pathway
- Code 3 pathway
- 64-question full mock
- timed exam mode
- road-sign flashcards
- DLTC checklist
- dark mode
- speech recognition
- microphone input
- voice commands
- cloud TTS
- AI tutor
- audio downloads
- 11-language expansion

## Regression gates from frozen 0.1D-A

Must remain unchanged:
- EN / AF / XH
- High Contrast
- Larger Text
- High Contrast + Larger Text
- persisted accessibility settings
- Code 2 filtering
- Practice
- 3-question Mock
- colour-independent correct / incorrect feedback
- local progress
- installable PWA + dedicated icon
- installed-app offline relaunch
- no cloud / login / AI dependency

## Real-phone acceptance sequence

### A. Baseline
1. Open upgraded installed app online once.
2. Confirm previous progress remains.
3. Confirm High Contrast and Larger Text settings remain intact.
4. Confirm EN / AF / XH still work.

### B. English Practice speech
1. Open Practice in English.
2. Tap Read aloud.
3. Confirm question + A/B/C are spoken in a usable English voice.
4. Stop speech mid-way.
5. Start again and confirm it does not overlap.
6. Submit an answer.
7. Tap Read feedback.
8. Confirm feedback/explanation is spoken.

### C. Navigation safety
1. Start speech.
2. Leave the question screen.
3. Confirm speech stops.
4. Start speech on another question.
5. Confirm only one speech stream plays.

### D. Afrikaans and isiXhosa
For each:
1. Select the language.
2. Open Practice.
3. Tap Read aloud.
4. If a suitable voice exists, verify understandable speech.
5. If not, verify a simple "not available on this phone" message appears and the app remains fully usable.

### E. Mock regression
1. Start the 3-question Mock.
2. Confirm Read aloud is available.
3. Confirm normal answer / Next / Finish flow still works.

### F. High Contrast + Larger Text
1. Turn both accessibility settings ON.
2. Verify Read aloud controls remain visible and finger-friendly.
3. Confirm no clipping or sideways scrolling.

### G. Final offline block
1. Close app.
2. Turn Wi-Fi OFF and mobile data OFF.
3. Relaunch from installed Mzansi Learner icon.
4. Confirm app opens normally.
5. Confirm Practice, Mock, EN/AF/XH, progress, High Contrast and Larger Text still work.
6. Test Read aloud:
   - if local device voice works offline, record PASS for local speech
   - if speech is unavailable offline, confirm the app gives the graceful unavailable state and everything else still works
7. Close and relaunch once more while offline.

## Freeze rule

BUILD 0.1D-B may be marked PASS + FROZEN only after the real-phone acceptance sequence passes.

The core app must never be failed solely because the phone has no local speech voice. The failure condition is if adding speech breaks, blocks, or destabilises the existing offline learning experience.
