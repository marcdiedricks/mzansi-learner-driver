# BUILD 0.1C-R1 — MULTILINGUAL + INSTALL + OFFLINE RELAUNCH ACCEPTANCE

Status: NOT YET FROZEN

This build may not be marked PASS until every gate below passes on a real Android phone.

## Gate A — Multilingual shell
- EN, AF and XH are visible and selectable.
- Switching language changes the learner-facing shell immediately.
- The selected language is stored locally.
- Closing and reopening the app retains the selected language.

## Gate B — Multilingual pilot content
- Practice questions render in EN, AF and XH.
- Answer options and explanations change with the selected language.
- Mock questions render in the selected language.
- English remains the source-master meaning.
- Afrikaans and isiXhosa are active pilot translations with LANGUAGE_QA_PENDING status until human language QA.

## Gate C — Phone installation
- Android browser offers installation / Add to Home screen.
- Installed app is named Mzansi Learner Driver / Mzansi Learner.
- A dedicated Mzansi Learner Driver icon appears on the phone home screen.
- App opens in standalone PWA mode rather than requiring the ChatGPT link.

## Gate D — OFFLINE RELAUNCH — REQUIRED
This gate is mandatory and must not be substituted with an already-open browser-tab test.

1. While online, open the current deployed app once and allow the service worker/content to load.
2. Install the PWA to the Android home screen.
3. Close the installed app.
4. Turn Wi-Fi OFF and mobile data OFF.
5. Tap the installed Mzansi Learner Driver home-screen icon.
6. PASS only if the app relaunches normally while fully offline.
7. Confirm the badge shows Offline ready.
8. Open Practise and load a Code 2 question offline.
9. Complete one practice question and view feedback offline.
10. Open Mock Test and start the 3-question Rules → Signs → Controls mock offline.
11. Return home and confirm saved progress persists.
12. Change or confirm language and verify multilingual content remains available offline.

## Gate E — No regression
- Code 2 filter still excludes motorcycle-only content.
- Existing IndexedDB progress is not erased by the upgrade.
- 25 source-controlled pilot questions remain present.
- Code 2 eligible set remains 24: Rules 9, Signs 10, Controls 5.
- No cloud, login or AI API dependency is introduced.

## Freeze rule
BUILD 0.1C-R1 can be frozen only after Marc completes the real-phone installation and offline-relaunch test above.
