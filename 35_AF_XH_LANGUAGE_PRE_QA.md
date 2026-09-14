# AFRIKAANS + XHOSA LANGUAGE PRE-QA

Project: Mzansi Learner Driver — CLLT Prep  
Status: **MACHINE / STRUCTURAL PRE-QA PASS — HUMAN LANGUAGE QA STILL REQUIRED**  
Branch: `build-rules-signs-expansion-r6-github-only`

## PURPOSE

Take the multilingual bank as far as possible before competent human Afrikaans and Xhosa review, without falsely describing automated review as language approval.

## BANK CHECKED

186 questions across:
- Rules
- Signs / Signals / Markings
- Code 1 Controls
- Code 2 Controls

## STRUCTURAL RESULTS

- Afrikaans language objects present: PASS
- Xhosa language objects present: PASS
- Three answer options per language: PASS
- Explanation present per language: PASS
- Correct-answer index alignment retained: PASS
- Afrikaans status remains LANGUAGE_QA_PENDING: PASS
- Xhosa status remains LANGUAGE_QA_PENDING: PASS

## LEGAL / NUMERICAL CONSISTENCY

A full numeric consistency audit compared English against Afrikaans and Xhosa across questions, answer options and explanations.

Checked items include, where present:
- speeds;
- distances;
- times;
- percentages;
- tyre depths;
- question counts;
- legal thresholds.

Numeric mismatches:
**0**

The corrected general speed limits are aligned in all three language objects:
- urban: 60 km/h
- outside urban / non-freeway: 100 km/h
- freeway: 120 km/h

## TERMINOLOGY CONTROL

Existing terminology work remains the working vocabulary baseline.

Important rule:
- structural consistency does NOT equal language approval;
- borrowed / code-switched technical terminology, especially in Xhosa, must still be reviewed by a competent human language reviewer;
- no Afrikaans or Xhosa item may be labelled RELEASED or human-approved before that review.

## RESULT

**MULTILINGUAL STRUCTURAL PRE-QA — PASS**

Remaining gate:
**HUMAN AFRIKAANS + XHOSA LANGUAGE QA**

This gate may be completed independently of Netlify and should not cause a deployment.

## DEPLOYMENT STATUS

Production main: unchanged  
Netlify deployment for this work: 0  
PR #36: open draft / held
