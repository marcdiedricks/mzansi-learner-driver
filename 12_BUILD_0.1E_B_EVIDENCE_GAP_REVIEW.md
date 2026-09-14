# BUILD 0.1E-B — EVIDENCE & GAP REVIEW

Status: REVIEW COMPLETE — NO PRODUCTION CONTENT CHANGES YET

Base frozen build: BUILD 0.1E-A
Frozen baseline commit: `686d440d476e794fb7061dc7d5e5ad1f8478ea42`

## Executive decision

**PASS — PROCEED WITH A CONTROLLED 4-ITEM MOTORCYCLE CONTROLS EXPANSION**

Do not add new Rules or Signs in the first 0.1E-B implementation.

Reason:
- Code 1 already has 9 eligible Rules and 10 eligible Signs.
- The thin area is Motorcycle Controls, currently only 3 eligible items.
- The official NaTIS controls manual provides direct support for several additional controls.
- Expanding Controls improves section balance without adding speculative motorcycle law or riding-technique content.

## Evidence table

| Area | Official evidence | Current coverage | Gap | Decision |
|---|---|---:|---:|---|
| Motorcycle Rules | NaTIS Rules manual + Western Cape learner guidance | 9 eligible total; 3 motorcycle-specific | No urgent gap for pilot | KEEP |
| Motorcycle Signs | NaTIS signs architecture | 10 shared eligible | Sufficient for pilot | KEEP |
| Motorcycle Controls | NaTIS Vehicle Components and Controls manual | 3 motorcycle-specific | Thin | ADD 4 |
| Code 1 category context | SA Government + Western Cape Government | Verified | No content gap | KEEP |
| Afrikaans language QA | Current Code 1-specific bank | 6 items pending | Human QA required | REVIEW ALL 6 + NEW 4 |
| isiXhosa language QA | Current Code 1-specific bank | 6 items pending | Human QA required, especially technical terms | REVIEW ALL 6 + NEW 4 |

## Approved new content — first implementation target

### 1. Clutch
**Evidence:** NaTIS motorcycle controls identify the clutch and sample material asks which control disengages the engine from the gearbox.

**Proposed learning objective:** recognise the clutch and its basic function.

**Do not overcomplicate:** no advanced clutch-control technique.

### 2. Gear lever
**Evidence:** NaTIS motorcycle controls identify the gear lever and sample material directly asks which lever/control is used to change gears.

**Proposed learning objective:** identify the control used to change gears.

### 3. Indicator switch
**Evidence:** NaTIS motorcycle controls identify the indicator light switch and sample material links it to signalling a rider's intention to turn.

**Proposed learning objective:** identify the control used to signal an intended turn.

### 4. Mirrors
**Evidence:** NaTIS motorcycle controls identify left/right mirrors and sample material asks which control/component is used to monitor traffic to the rear.

**Proposed learning objective:** identify mirrors as the component used to check traffic behind.

## Reserve items — NOT in first implementation

### Handlebars
Officially supported, but lower priority because steering is intuitive and the current control bank benefits more from clutch/gears/signalling/rear observation.

### Combined front + rear braking
Officially supported, but this introduces combination logic and potentially more complex distractors. Reserve for later content expansion.

### Sharp-turn control combinations
Official sample material exists, but this is too complex for the current novice pilot and risks shifting into riding technique rather than basic control recognition.

## Existing Code 1-specific content review

Current motorcycle-specific items:
- rules-005 — headlamp
- rules-011 — learner passenger restriction
- rules-012 — protective helmet
- controls-006 — front brake
- controls-007 — rear brake
- controls-008 — throttle

### Source status
All six have an authoritative source path.

### Governance improvement
For the protective-helmet item, prefer the NaTIS learner manual section on motorcycle protective helmets as the learner-facing source locator, while retaining the underlying regulation as the legal authority.

## Language-QA findings

### Afrikaans
Functional phone testing passed.

Current wording appears internally consistent enough for structured review, but **must not be auto-approved**.

Terms requiring consistency check across all motorcycle items:
- motorfiets
- voorrem / agterrem
- voorremhendel
- koppelaar / koppelaarhendel
- versnellerhandvatsel
- rigtingwyser-skakelaar
- spieël / truspieël
- rathefboom / rathefboom terminology

Decision:
**AF remains LANGUAGE_QA_PENDING until human review.**

### isiXhosa
Functional phone testing passed.

The current bank contains technical code-switching / borrowed terms such as:
- ibrake
- ilever
- ithrottle
- iswitshi

This may be perfectly understandable to real learners, but we must not assume that it is the best or most consistent learner wording.

Key QA question:
**Should the pilot deliberately use familiar borrowed technical terms, formal isiXhosa equivalents, or a consistent hybrid?**

Decision:
**XH remains LANGUAGE_QA_PENDING until a competent isiXhosa reviewer checks learner comprehension and terminology consistency.**

Do not replace these terms automatically with machine-generated alternatives.

## Proposed Code 1 counts after 0.1E-B implementation

Current:
- Rules: 9
- Signs: 10
- Controls: 3
- Total: 22

After approved 4-item Controls expansion:
- Rules: 9
- Signs: 10
- Controls: 7
- Total: 26

This is a better-balanced pilot without inflating the bank.

## Duplicate / ambiguity risk review

### Low-risk additions
- clutch
- gear lever
- indicator switch
- mirrors

Each tests a distinct control/function.

### Avoid in this phase
- multiple questions that all ask variations of "what makes the motorcycle go faster?"
- repeated front/rear brake recognition questions
- advanced control-combination questions
- near-duplicate indicator/signalling questions

## Language-QA scope after expansion

Human language QA should cover all 10 Code 1-specific items:
- existing 6
- new 4

Each item must be reviewed for:
1. meaning preserved from English source-master,
2. one unambiguously correct answer,
3. natural learner-facing wording,
4. technical terminology consistency,
5. explanation clarity.

## Build recommendation

Proceed to a small implementation containing only:
- 4 new Motorcycle Controls items,
- source-register updates,
- language-QA tracker entries,
- no new Rules,
- no new Signs,
- no visual redesign,
- no mock-size change.

The 3-question Code 1 pilot Mock remains unchanged in structure:
Rules → Signs → Motorcycle Controls.

## Evidence-gate conclusion

**PASS — BUILD MAY PROCEED WITH 4 NEW CONTROLS ONLY**

Do not expand beyond these four items without a new evidence decision.
