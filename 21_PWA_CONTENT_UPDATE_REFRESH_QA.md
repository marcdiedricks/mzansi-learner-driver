# PWA CONTENT UPDATE REFRESH — QA

Status: TARGETED CACHE DEFECT REPAIR

## Phone evidence
After Rules + Signs R1 deployed, the installed Android PWA continued to serve the previous Rules bank. Because Practice uses a no-repeat cycle, failure to encounter any of the three new Rules items proved the updated question pack had not reached the active app session.

## Root cause
The service worker used a cache-first fetch strategy. A previously installed PWA could therefore continue receiving older cached app/content resources after a new production deployment.

## Repair
For same-origin GET requests:
- online: fetch newest resource from network and refresh cache;
- offline: fall back to cached resource;
- offline-first capability remains intact;
- no progress/database changes;
- no question/content changes;
- no pathway/mock/accessibility changes.

Cache bumped to rules-signs-r2.

## Acceptance
1. Reopen installed PWA online after deploy.
2. Code 2 or Code 1 → Practise → Rules.
3. Within the first 12 Rules items, one of rules-013/014/015 must appear.
4. Final offline regression after content verification.
