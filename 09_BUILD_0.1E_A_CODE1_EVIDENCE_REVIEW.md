# BUILD 0.1E-A — CODE 1 MOTORCYCLE EVIDENCE REVIEW

Status: EVIDENCE REVIEW COMPLETE — NO APP CODE YET

Base frozen build: BUILD 0.1D-B
Frozen baseline commit: `f2e3f55c959c410309c7418888a3c1a795ff5032`

## Decision summary

The evidence gate is sufficiently satisfied to move to a small Code 1 implementation phase, subject to the terminology rule below.

Recommended learner-facing pathway label:

**Motorcycle / Code 1**

Do not split the learner pathway into A1 and A in 0.1E-A.

A1 / A may be explained later as motorcycle driving-licence categories, but the learner-test pathway should remain one Motorcycle / Code 1 pathway unless authoritative test evidence proves separate learner-test question banks are required.

## Evidence table

| Topic | Authoritative source | Verified finding | Status | Build use |
|---|---|---|---|---|
| Learner category | South African Government learner's licence service | Code 1 covers motorcycle with/without sidecar, motor tricycle or quadrucycle | VERIFIED | Use Motorcycle / Code 1 pathway |
| Motorcycle size / age distinction | South African Government + Western Cape Government | Up to 125 cc: learner eligibility from age 16; above 125 cc: from age 18 | VERIFIED | Guidance only; do not create separate content bank solely from this |
| A1 / A terminology | Western Cape Government learner service + national driving-licence service | WCG uses A1 for <=125cc and A for >125cc; national learner service still uses Code 1 | VERIFIED TERMINOLOGY DIFFERENCE | Keep learner-facing selector Motorcycle / Code 1; do not treat Code 1 = A1 only |
| Test knowledge domains | Western Cape Government | Rules of road, road signs/markings, controls of a vehicle | VERIFIED | Preserve Rules → Signs → Controls architecture |
| Prescribed section thresholds | Government Gazette 28446 | Rules 22/28; Signs 23/28; Controls 6/8 | VERIFIED | Retain future category logic; full 64-question mock remains out of scope |
| Motorcycle learner supervision | Western Cape Government | Licensed-driver accompaniment rule does not apply in the normal way to a motorcycle | VERIFIED | Guidance only; avoid overcomplicating pilot questions |
| Learner motorcycle passenger | Western Cape Government | Learner driver may not carry another person on a motorcycle | VERIFIED | Approved Code 1 Rules topic |
| Motorcycle headlamp | National road-traffic regulation evidence | Motorcycle headlamp must be on while operated on public road | VERIFIED | Existing motorcycle headlamp item can be retained for Code 1 after source locator update |
| Protective helmet | National Road Traffic Regulations / gov.za evidence | Motorcycle driver/passenger must wear a suitable protective helmet properly fitted/fastened, subject to limited regulatory exceptions | VERIFIED | Approved Code 1 Rules topic; phrase simply and avoid obscure exceptions in pilot |
| Motorcycle controls | Official NaTIS Vehicle Controls Manual | Identifies gear lever, clutch, mirrors, front brake, throttle, indicator switch, rear brake (foot-operated), handlebars, fuel tank | VERIFIED | Approved source for motorcycle Controls items |
| Shared signs | Western Cape Government + NaTIS study architecture | Road signs/markings are a core learner-test domain, not inherently Code-2-only | VERIFIED WITH ITEM FILTERING | Existing sign questions may be shared when their meaning is vehicle-neutral |
| Shared general rules | NaTIS / general learner study architecture | Many road rules apply across vehicle classes | VERIFIED WITH ITEM FILTERING | Share only items explicitly marked common/all |
| Lane-positioning / carrying passengers generally / advanced motorcycle techniques | Not sufficiently established in this focused review | Do not infer test wording | NOT YET VERIFIED | Exclude from 0.1E-A pilot until sourced |

## Terminology rule

There is a genuine terminology difference across current official pages:

- National learner's-licence guidance uses **Code 1 / Code 2 / Code 3**.
- Western Cape learner guidance also presents vehicle categories as **A1 / A / B / EB ...**.
- National driving-licence guidance uses **A1 / A / B ...** for driving-licence categories.

For this PWA:

### Use
**Motorcycle / Code 1**

### Do not use as the primary learner-path selector
- A1 only
- A only
- A1 / A as though they are separate learner-test content banks

Reason:
The current evidence establishes engine-size / age distinctions, but does not establish that the learner knowledge test must be split into two different motorcycle content pathways.

## Approved first Code 1 pilot content

To avoid an empty pathway while also avoiding overbuilding, the first implementation should activate Code 1 only when the following motorcycle-specific items are source-controlled and QA-ready:

### Rules — minimum 3 motorcycle-specific items
1. Motorcycle headlamp use
2. Learner motorcycle may not carry another person
3. Protective helmet requirement

### Controls — minimum 3 motorcycle-specific items
1. Front brake
2. Rear brake
3. Throttle

### Shared content
- Existing vehicle-neutral Rules may be reused only when marked `all`.
- Existing vehicle-neutral Signs may be reused when marked `all`.
- Code 2-only Controls must never appear in Code 1.

This gives a deliberately small but real pilot rather than a placeholder.

## Motorcycle Controls source map

Official NaTIS control identification provides the following verified control vocabulary:

1. Gear lever
2. Clutch
3. Left and right rear-view mirrors
4. Front brake
5. Throttle
6. Indicator light switch
7. Rear brake (foot-operated)
8. Handlebars
9. Fuel tank

0.1E-A should initially use only a small subset.
Do not generate nine questions merely because nine controls are listed.

## Existing content impact

### Existing motorcycle item
The current question bank already contains a motorcycle headlamp question that was deliberately excluded from Code 2.

Recommendation:
- retain it
- update/confirm its authoritative source locator
- make it eligible for Code 1 only
- do not duplicate it

### Existing Code 2
No current Code 2 item needs to be rewritten merely to add Code 1.
Only eligibility and progress architecture should change.

## Progress migration rule

Existing local practice/mock history belongs to the proven Code 2 pilot.

When pathway-specific storage is introduced:

- migrate existing practice stats to Code 2
- migrate existing mock history to Code 2
- initialise Code 1 progress separately
- never reset existing learner progress

## What remains deliberately unresolved

The following are NOT blockers for the small Code 1 pilot:

- whether operational CLLT screens label motorcycle learners as Code 1, A1/A, or another presentation
- whether A1 and A receive any different learner-test question subset
- exact operational test duration/navigation behaviour
- Code 3 pathway
- full 64-question simulation

Do not invent answers to these.

## Evidence-gate conclusion

**PASS — WITH CONTROLLED TERMINOLOGY**

The project has enough authoritative evidence to proceed to a minimal implementation specification for:

- Motorcycle / Code 1 selector
- pathway persistence
- separate Code 1 / Code 2 progress
- verified Code 1 Rules + Controls pilot content
- shared vehicle-neutral Signs
- 3-question Code 1 pilot Mock

No implementation should expand beyond this evidence boundary without a new verification step.
