# CONTENT COMPLETION MASTER PLAN — GITHUB ONLY

Project: Mzansi Learner Driver — CLLT Prep
Status: ACTIVE COMPLETION BUILD — DO NOT DEPLOY
Production baseline: 3b0ae9074684d3ca0e7ee4bbdca136078f8933bd
Held branch baseline includes R6 + R7 + R8.

## 1. BUILD METHOD CHANGE

Stop creating small numbered content batches.

From this point:
- work on one held CONTENT COMPLETION branch;
- source-map the official NaTIS learner material;
- fill coverage gaps in meaningful groups;
- run internal schema, duplicate, eligibility and source QA in GitHub;
- do not merge to main until completion criteria are met;
- do not trigger Netlify until the consolidated completion build is ready for real-phone acceptance.

## 2. COMPLETION STANDARD

The official published legal baseline uses:
- Rules: 28 items
- Signs: 28 items
- Controls: 8 items

The app's internal completion floor is deliberately larger so learners can practise more than one possible set without immediate repetition.

Minimum eligible practice-bank floor PER PATHWAY:
- Rules: 56
- Signs / signals / markings: 56
- Controls: 16
- Total eligible practice pool: 128

These are INTERNAL PRACTICE-BANK TARGETS.
They are not claims about the confidential or exact official CLLT bank.

## 3. RULES COVERAGE MAP

Coverage must include, where applicable:
- roadworthiness / lamps / brakes / hooter
- vehicle control and driver view
- signals and signalling
- speed limits
- following distance
- overtaking / being overtaken
- turning left / right
- intersections / right of way / circles
- road position / lane discipline
- stopping and parking restrictions
- pedestrian crossings
- emergency vehicles
- mobile-phone use
- freeway entry, merging, stopping and lane use
- entering / crossing public roads
- reversing
- railway-crossing behaviour
- towing / loads / passengers where relevant
- vehicle-specific motorcycle rules
- other high-frequency learner-manual duties not yet represented

## 4. SIGNS / SIGNALS / MARKINGS COVERAGE MAP

Coverage must span the official NaTIS sign system, not only a few regulatory signs.

Required groups:
- signs in general / temporary-sign logic
- regulatory control signs
- command signs
- prohibition signs
- reservation signs
- comprehensive signs
- selective restriction signs
- de-restriction signs
- warning signs
  - junction / road-layout warnings
  - pedestrian / cyclist / children warnings
  - railway warnings
  - surface / obstruction / hazard warnings
  - temporary warnings
- guidance signs
- information signs
- road markings
  - stop / yield / pedestrian crossings
  - lane and direction markings
  - no-overtaking / barrier-line logic
  - other core regulatory markings
- traffic signals
  - red / amber / green
  - arrows where covered
  - pedestrian signals where covered
  - signals out of order

## 5. CONTROLS COVERAGE MAP

### Code 2
Complete the official light-motor-vehicle controls/functions beyond the current bank, including where source-supported:
- steering
- brake
- accelerator
- clutch / manual transmission
- gear lever
- parking brake
- mirrors
- indicator
- wipers
- horn
- lights / beam controls
- ignition / starting controls
- instrument / warning controls
- other core source-listed controls until >=16 eligible items

### Code 1
Complete motorcycle controls/functions beyond the current bank, including where source-supported:
- front brake
- rear brake
- throttle
- clutch
- gear lever
- indicators
- mirrors
- steering / handlebars
- horn
- lighting controls
- ignition / engine controls
- other core source-listed controls until >=16 eligible items

## 6. CONTENT GOVERNANCE

Every item must:
- use original learner-facing wording;
- cite SRC-006, SRC-007, SRC-008 or another approved source;
- have a specific locator where practical;
- have one unambiguous best answer;
- have a plain-language explanation;
- retain English as source-master;
- keep Afrikaans and Xhosa LANGUAGE_QA_PENDING until human approval;
- avoid copied, leaked, recalled or confidential CLLT questions.

## 7. COMPLETION GATES BEFORE MAIN / NETLIFY

Do not merge/deploy until:
- Rules floor met for Code 1 and Code 2;
- Signs/markings/signals floor met for Code 1 and Code 2;
- Controls floor met for Code 1 and Code 2;
- no duplicate IDs;
- no duplicate/near-duplicate concepts without a deliberate reason;
- no broken vehicle-path eligibility;
- all English items at CONTENT_QA;
- app expected-count check matches repository bank;
- Practice no-repeat cycle still compatible with larger bank;
- Mock logic reviewed for eventual expansion;
- offline asset footprint remains acceptable.

## 8. DEPLOYMENT LOCK

NETLIFY DEPLOYMENTS: ZERO until completion gates above are met.

No production merge for partial content work.
No deploy for documentation, content additions or internal QA.
Use one consolidated production deployment only when the completion build is ready for phone acceptance.
