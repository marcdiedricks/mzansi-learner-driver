# BUILD 0.1C — PILOT CONTENT QA REPORT

**Project:** Mzansi Learner Driver — CLLT Prep  
**Project ID:** NKI-EDU-002  
**Build:** 0.1C  
**Status:** INTERNAL CONTENT QA PASSED — PHONE/OFFLINE PILOT STILL REQUIRED

## Pilot pack

- Rules: 10 items
- Signs / markings: 10 items
- Vehicle controls: 5 items
- Total: 25 items

## Checks completed

- 25 unique question IDs
- correct section counts
- all items have authoritative source IDs
- all source records marked source_verified
- all questions use original wording
- each item has one intended best answer
- each item has three answer options
- each correct_index is valid
- no duplicate answer options inside an item
- every item includes a plain-language explanation
- vehicle-group scope recorded
- Afrikaans and isiXhosa remain NOT STARTED
- no confidential / recalled / copied CLLT questions used

## Source set

- SRC-006 — NaTIS / Department of Transport, Rules of the Road
- SRC-007 — NaTIS / Department of Transport, Road Traffic Signs
- SRC-008 — NaTIS / Department of Transport, Vehicle Components and Controls

## Current release state

All 25 pilot items are now:

**CONTENT_QA**

They are **not RELEASED**.

## What still blocks release

1. app integration check on branch
2. service-worker cache check
3. real Android phone test
4. complete offline load of all three question packs
5. local progress test with the new pack
6. learner-facing ambiguity check
7. no-repeat practice behaviour check
8. mock test selection check
9. English plain-language pilot review
10. Afrikaans / isiXhosa human language QA before those languages are released

## Control decision

Do not scale to hundreds of questions yet.

First prove that this 25-item source-controlled pack works reliably offline on a real phone and that learners understand the wording.

**Next:** wire the 25-item pack into the 0.1C app branch and prepare one controlled deploy for phone acceptance.
