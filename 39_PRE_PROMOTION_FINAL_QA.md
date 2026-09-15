# MZANSI LEARNER DRIVER — PRE-PROMOTION FINAL QA

Branch: `natis-knowledge-completeness-audit-r1`  
Purpose: one focused technical release check after the NaTIS knowledge-base audit closeout.  
Production: **UNCHANGED / NOT DEPLOYED**

## FINAL STATIC QA

| Check | Result |
|---|---|
| app.js syntax | PASS |
| sw.js syntax | PASS |
| i18n.js syntax | PASS |
| Dedicated knowledge items | 157 |
| Missing English title/key point/explanation | 0 |
| Duplicate knowledge IDs | 0 |
| Signs knowledge visual coverage | 86 / 86 |
| Controls knowledge visual coverage | 14 / 14 |
| Unique mapped visual assets | 78 |
| Mapped visual assets missing from offline cache | 0 |
| Rules knowledge pack loaded | PASS |
| Signs knowledge pack loaded | PASS |
| Controls knowledge pack loaded | PASS |
| Sign visual map loaded | PASS |
| Control visual map loaded | PASS |
| Learner-progress reset retained | PASS |
| Offline audit cache | `mzansi-learner-driver-natis-audit-r10` |

## RELEASE BLOCKER FOUND

The new 157-item Knowledge Layer currently contains:
- English: **157 / 157**
- Afrikaans: **0 / 157**
- isiXhosa: **0 / 157**

The app currently falls back to English when the selected language has no Knowledge Layer translation.

Therefore the branch is:

### **TECHNICALLY READY FOR ENGLISH PHONE ACCEPTANCE**
but
### **NOT READY FOR MULTILINGUAL PRODUCTION PROMOTION**

This is not a reason to reopen the NaTIS knowledge audit. It is a separate translation-release gate.

## DIRECT RELEASE SEQUENCE

1. Freeze the audited English source master.
2. Add Afrikaans and isiXhosa draft translations for all 157 Knowledge Layer items.
3. Mark those translations `LANGUAGE_QA_PENDING`.
4. Run static translation completeness check: 157/157 AF and 157/157 XH.
5. Do one phone acceptance on the held build:
   - Code 1 and Code 2
   - English / Afrikaans / isiXhosa
   - Study visual rendering
   - Practice
   - 64-question Mock launch
   - Reset progress
   - offline reopen
6. If phone acceptance passes, promote once to production.
7. Human Afrikaans / isiXhosa review remains mandatory before describing those languages as human-approved.
8. Begin learner-outcome pilot only after the promoted build is accepted.

## RELEASE DECISION

**DO NOT DEPLOY YET.**

Reason: deploying now would introduce English fallback into the new knowledge cards for Afrikaans and isiXhosa learners.

No more broad NaTIS research is required. The only current workstream is translation completion, then one phone test, then one promotion decision.
