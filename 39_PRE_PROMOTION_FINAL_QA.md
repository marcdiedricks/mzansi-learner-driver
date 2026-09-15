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

## MULTILINGUAL STATIC GATE — CLOSED

The 157-item Knowledge Layer now contains:
- English: **157 / 157**
- Afrikaans draft: **157 / 157**
- isiXhosa draft: **157 / 157**
- Afrikaans status: **157 / 157 LANGUAGE_QA_PENDING**
- isiXhosa status: **157 / 157 LANGUAGE_QA_PENDING**
- Numeric value mismatches EN vs AF/XH: **0**

The static multilingual release blocker is therefore closed.

Human language approval remains a separate post-static QA requirement. The app must not describe Afrikaans or isiXhosa as human-approved until competent reviewers sign them off.

The branch is now:

### **READY FOR CONTROLLED MULTILINGUAL PHONE ACCEPTANCE**

## DIRECT RELEASE SEQUENCE

1. English source master — FROZEN.
2. Afrikaans and isiXhosa draft translations — COMPLETE.
3. `LANGUAGE_QA_PENDING` status — COMPLETE.
4. Static translation completeness and numeric consistency — PASS.
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

**DO NOT MERGE TO PRODUCTION YET.**

Static QA is complete. The only technical step before promotion is one controlled phone acceptance of the held branch. A draft pull request / Deploy Preview may be used for that test without merging production.

No more broad NaTIS research is required.


## CONTROLLED PHONE-ACCEPTANCE PREVIEW

Draft PR: **#39**  
Head commit: `876b91f9b4b1701a10b9fd8e370e192163592f97`  
Netlify Deploy Preview: **READY**  
Deploy ID: `6aa923f293243a0008786a37`  
Preview URL: `https://deploy-preview-39--mzansi-learner-driver.netlify.app`

Production remains unchanged. This preview exists only for final phone acceptance before any merge.
