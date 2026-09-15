# MZANSI LEARNER DRIVER — FINAL NaTIS KNOWLEDGE BASE AUDIT CLOSEOUT

Audit branch: `natis-knowledge-completeness-audit-r1`  
Audit status: **CLOSED**  
Production: **UNCHANGED / NOT DEPLOYED**  
Purpose: Final, non-repeating closeout of the official learner knowledge-base completeness audit.

## 1. FINAL VERDICT

### A. Published official learner-study scope — PASS

For the **English source master**, the app now accounts for the published learner-study scope currently pointed to by the Western Cape Government and South African Government:

1. Rules of the Road
2. Road Traffic Signs / Road Markings / Signals
3. Vehicle Controls / Components

The held audit branch contains:
- Existing source-controlled question bank: **186**
- Dedicated knowledge-layer items: **157**
  - Rules: **57**
  - Signs / Markings / Signals: **86**
  - Controls / Components: **14**
- Total Study-source items available to the architecture: **343**
- Duplicate dedicated knowledge IDs: **0**
- Dedicated knowledge items missing source locator: **0**
- Dedicated knowledge items missing English title/key point/explanation: **0**
- Signs knowledge visual mapping: **86 / 86**
- Controls knowledge visual mapping: **14 / 14**
- Offline cache includes all knowledge packs and mapped visual assets used by those packs.

**Conclusion:** the earlier statement “all material subject families are represented” has now been upgraded to a source-controlled English knowledge-layer crosswalk that accounts for the published Code 1 / Code 2 learner-study scope.

### B. Exact current-law certification — NOT FULLY CLOSED

The official NaTIS learner manual itself states that it is a learner guide and not a precise legal interpretation, and directs readers to the National Road Traffic Act and Regulations for precise law.

This audit therefore distinguishes:
- **current service facts** verified against current government pages;
- **current Act principles** where checked;
- **manual study values** that remain learner-manual sourced.

The following must not be described as independently legally certified unless separately checked against the currently operative regulations:
- older numeric equipment dimensions;
- older vehicle/load dimensions and exceptions;
- older time/distance thresholds;
- any provision whose legal text may have been amended since the 2012 manual.

This does **not** reopen the knowledge-base completeness audit. It is a separate legal-maintenance gate.

### C. Printed Western Cape learner-pack equivalence — NOT INDEPENDENTLY VERIFIED

Western Cape Government currently:
- directs learners to the same three NaTIS study areas; and
- states that printed learner manuals are distributed through selected public libraries.

The exact cover/version/page sequence of a currently distributed physical pack has not been independently inspected in this audit.

**Disposition:** external-evidence item only. If an actual current printed pack is supplied later, compare its version/contents once against this source register. Do not reopen the full audit unless that pack contains material not present in the published NaTIS source set.

### D. Visual fidelity — CONTENT COVERED, RELEASE QA STILL REQUIRED

The dedicated Signs knowledge layer has a mapped visual for **86 / 86** items and the Controls knowledge layer for **14 / 14** items.

However, the visuals created during remediation are **original learner schematics**, not scans/copies of Department manual artwork.

Therefore:
- visual learning availability: **PASS**
- independent pixel/design fidelity to every official sign diagram: **NOT CERTIFIED**
- direct image mapping in the pre-existing 86-question sign Practice bank is not treated as the completeness metric; the dedicated sign Knowledge Layer is the canonical visual-teaching layer.

Before a public “official-sign visual replica” claim, perform a separate visual-fidelity QA. Until then use the wording **source-mapped learner visuals**.

### E. Afrikaans / isiXhosa — HUMAN QA PENDING

The English source master is the audited control source.

Afrikaans and isiXhosa learner content remains **LANGUAGE_QA_PENDING** until competent human reviewers approve the full final source-master translation set.

This does not reopen the English knowledge-base audit.

## 2. RULES OF THE ROAD CLOSEOUT

The final crosswalk accounts for the published Code 1 / Code 2 Rules sections through a combination of:
- existing 186-bank questions;
- dedicated Rules knowledge cards; and
- explicit out-of-scope classification.

### Sections explicitly classified rather than omitted

- §6.29 particular-class speed provisions: retain only where applicable to Code 1 / Code 2; heavy/special-class provisions are outside the Code 1 / Code 2 knowledge gate.
- §6.44 compulsory yellow reflective material: the published manual makes the compulsory requirement a heavy-goods provision above the stated GVM threshold; this is outside the ordinary Code 1 / Code 2 gate.
- §6.66 heavy-vehicle fuel/wiring/battery material: outside the Code 1 / Code 2 gate.

### Existing-source coverage that may not carry the exact section number in its locator

- §6.18 protective helmet: covered by `rules-012` from the National Road Traffic Regulations source.
- §6.41 driving signals: covered by `rules-028`.
- reckless/negligent and inconsiderate driving: covered by dedicated current-Act knowledge items.

**Rules content verdict: PASS for published Code 1 / Code 2 learner-study scope.**

## 3. ROAD SIGNS / MARKINGS / SIGNALS CLOSEOUT

The final source-master knowledge layer accounts for the major published sign system:
- sign groups and interpretation;
- control signs;
- command signs;
- prohibition signs;
- reservation signs;
- comprehensive signs;
- selective restriction signs;
- combination signs;
- de-restriction;
- warning signs;
- guidance and route-marker families;
- tourism/service and diagrammatic guidance;
- information signs;
- regulatory markings;
- warning markings;
- guidance markings;
- traffic lights and arrow variants;
- railway signals;
- lane-control signals;
- pedestrian signals;
- traffic-officer / flag signal concepts.

Route/destination/tourism signs are treated correctly as **families with variable text/symbol content**, rather than pretending that one destination name is the curriculum.

**Signs / markings / signals content verdict: PASS for published learner-study scope.**

## 4. CONTROLS / COMPONENTS CLOSEOUT

### Code 1 motorcycle
The final held source master accounts for:
- the nine main controls already covered;
- additional visual components such as seat, engine, speedometer, ignition, starter, wheels, silencer, headlamp and suspension/component recognition;
- theory-level control grouping for stopping/slowing, changing gear, steering and signalling.

### Code 2 light motor vehicle
The final held source master accounts for:
- the eleven main controls;
- manual versus automatic distinction;
- mirror awareness;
- parking-brake variants;
- theory-level control grouping.

Practical driving/riding manoeuvres remain outside the PWA's theory scope and belong in supervised practical training.

**Controls / components content verdict: PASS for Code 1 and Code 2 learner theory.**

## 5. CURRENT OFFICIAL SERVICE ALIGNMENT

Current national government information confirms:
- learner Code 1 for motorcycles;
- learner Code 2 for vehicles up to 3 500 kg GVM;
- learner licence validity of 24 months;
- study requirement covering road signs, vehicle controls and road rules.

Current Western Cape Government information confirms:
- preparation requires rules of the road, road markings/signs and vehicle controls;
- it directs learners to NaTIS material for those areas;
- printed learner manuals are made available through selected libraries.

The PWA's Code 1 / Code 2 split and three-domain architecture therefore remain aligned with the current public learner-service structure.

## 6. AUDIT CLOSEOUT MATRIX

| Gate | Final status | Reopen full audit? |
|---|---|---|
| English published NaTIS knowledge completeness | **PASS** | No |
| Code 1 motorcycle theory scope | **PASS** | No |
| Code 2 light-vehicle theory scope | **PASS** | No |
| Rules source coverage | **PASS** | No |
| Signs/markings/signals source coverage | **PASS** | No |
| Controls/components source coverage | **PASS** | No |
| Dedicated sign knowledge visual availability | **PASS — 86/86** | No |
| Dedicated controls visual availability | **PASS — 14/14** | No |
| Offline knowledge-pack caching | **PASS** | No |
| Static app/service-worker syntax | **PASS** | No |
| Exact current-law certification of every older numeric/manual rule | **SEPARATE LEGAL QA GATE** | No; only affected item |
| Exact physical printed-pack edition equivalence | **EXTERNAL EVIDENCE NOT VERIFIED** | Only if a different pack is supplied |
| Exact official artwork fidelity of learner schematics | **SEPARATE VISUAL QA GATE** | No; visual layer only |
| Afrikaans human language approval | **PENDING HUMAN QA** | No; translation layer only |
| isiXhosa human language approval | **PENDING HUMAN QA** | No; translation layer only |

## 7. CLAIMS NOW ALLOWED

Allowed:
> “Mzansi Learner Driver's English source master has been systematically mapped against the published official NaTIS learner-study scope for Code 1 motorcycles and Code 2 light motor vehicles, covering Rules of the Road, Road Signs/Markings/Signals and Vehicle Controls/Components.”

Allowed:
> “The app uses original source-mapped learning content and does not reproduce confidential CLLT questions.”

Not yet allowed:
> “Every rule in the app has been independently certified against the current operative Regulations.”

Not yet allowed:
> “The printed Western Cape learner pack is page-for-page identical to the digital source set.”

Not yet allowed:
> “Afrikaans and isiXhosa have been human-approved.”

Not yet allowed:
> “The app has been proven to improve official CLLT pass rates.”

## 8. RELEASE DECISION

### Knowledge-base audit: **CLOSED — PASS (ENGLISH PUBLISHED SOURCE SCOPE)**

Do **not** reopen this audit by repeatedly researching the same published learner scope.

From this point:
1. Freeze the English knowledge inventory.
2. Handle any new legal amendment as a targeted legal-maintenance change.
3. Handle any supplied physical manual as a one-time version-difference check.
4. Complete human Afrikaans / isiXhosa QA as a translation gate.
5. Complete one controlled phone acceptance of the held branch before any promotion to production.
6. Only after promotion begin the learner-outcome pilot.

Production remains unchanged until an explicit promotion decision is made.
