# BUILD 0.1B PHONE ACCEPTANCE TEST

**Status:** READY FOR PHONE TEST — NOT YET FROZEN

## Purpose
Prove that the minimum PWA shell works reliably before adding the real question bank.

## Test sequence

1. Open the hosted build once while connected.
2. Confirm the home screen shows six choices:
   - Learn
   - Practise
   - Mock Test
   - My Weak Areas
   - Am I Ready?
   - First Computer Test?
3. Open **First Computer Test?**
4. Complete all three orientation steps.
5. Complete at least three practice questions.
6. Complete the short mock test.
7. Close the app/browser.
8. Reopen and confirm progress is still present.
9. Turn OFF both Wi-Fi and mobile data.
10. Reopen the PWA.
11. Repeat orientation or practice.
12. Close and reopen while still offline.
13. Confirm the app still loads and progress remains.

## PASS
0.1B passes only if:
- the shell loads offline;
- orientation works offline;
- sample practice works offline;
- mock test works offline;
- local progress survives close/reopen;
- small-screen navigation remains clear;
- no account, cloud or AI service is needed.

## FAIL
Any loss of core function without internet is a failure. Fix before adding more content.

## Deployment rule
Do not deploy repeatedly for cosmetic changes. Batch fixes and deploy only when a real phone/offline verification is needed.