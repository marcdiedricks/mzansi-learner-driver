# PRACTICE NO-REPEAT CYCLE — QA

Status: READY FOR PHONE ACCEPTANCE

## Problem observed on phone
Practice used random selection with only immediate-repeat prevention. A learner could see the same small subset repeatedly and fail to encounter newly added content.

## Fix
Practice now uses a shuffled queue per active pathway + Practice section.

- Every eligible question is shown once before the queue refills.
- No question repeats within a cycle.
- Changing Practice section resets the queue.
- Changing Code 1 / Code 2 resets the queue.
- Progress scoring/storage is unchanged.
- Mock logic is unchanged.
- Code 1 and Code 2 eligibility is unchanged.

## Expected phone behaviour
Code 2 → Practise → Controls:
- 11 Controls items available.
- all 11 appear before any one repeats.
- the six new control topics must therefore appear during that first cycle.

## Offline
Service-worker cache bumped to code2-controls-r2.
