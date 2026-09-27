# Retention Lab · Day 11

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 6 (1 day).**
*Purposefully applying emotional sales psychology and storytelling in sales.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32.

The case company is **SalesTech Solutions GmbH** (the plan's case study): *customers don't understand the benefit, offers appear
interchangeable, low close rate*, €90,000 and three months. The plan's Level 1 scenarios (two sales conversations, A focused on
technical details and B on benefit and story; a customer who asks many detail questions, is risk-averse and compares offers) are
SalesTech's evidence file. Route 2 puts the learner in the Chief Sales Officer's chair: products that need explaining, strong
competition, customers who don't understand the benefit, a limited budget (€130,000 over four months, Case assumption), different
customer types, time pressure, and a communication decision despite unclear customer reactions.

This repo was bootstrapped from `day10` (chrome, primitives, store pattern, tokens, the language machinery) and its content was
replaced. Nothing of OmniTech remains in the visible content; several data identifiers keep earlier names (e.g. `CUSTOMERS` holds the
eight prospects, `PILOT` the offers presented technically and with benefit and story, the tag ids `respond/personal/learn` mean
feature/benefit/story, a "source" in `route2.ts` is a storytelling approach), and each file's header comment says what they hold now.

> **Before you push:** this folder has a fresh local `git init` and no remote. Create the `aion-cs-day11` repository and set the
> remote first (`../CLAUDE.md` #17). Nothing was committed or pushed.

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 why emotions dominate purchase decisions: trust, security, status, belonging, A2 storytelling in sales: feature, benefit, story, A3 emotional customer types: security, innovation, price, relationship, A4 what a customer story is worth: close rate, lift and extra revenue, A5 KPIs for sales communication: outcome, driver, guardrail, vanity, A6 testing a story fairly, and authenticity versus manipulation, A7 prioritising approaches: effect × comprehensibility × persuasiveness). **Task 1, Storytelling Analysis**: *Part 1 · Understand the emotional effect:* 1.1 sort nine sentences of conversations A and B into feature, benefit or story and name a weak moment of A, 1.2 what a customer story is worth (F1–F3 and a sentence), 1.3 two security-oriented and two relationship-oriented prospects, three improvements for conversation A, 1.4 coaching reflection. *Part 2 · Make it measurable and choose:* 2.1 tag twelve sales metrics by kind, 2.2 link to value, meaning and use per kind, uncertainties, your three KPIs, 2.3 design a fair A/B test of a story opening, 2.4 choose, score and order three of nine measures. | `1-{name}-day11-l1l2-storytelling-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 the target vision of an emotional sales strategy, B2 central storytelling approaches: the decision first, then the proof, B3 a KPI system for sales communication: four tests, B4 testing approaches per customer type: roll out, keep testing or stop, B5 a communication decision under unclear customer reactions, and the measures architecture). **Task 2, Sales Strategy Memo**, assembling beside the questions: 3.1 three principles, 3.2 use now / collect proof first / not central for eight storytelling approaches, 3.3 three KPIs rated on four tests and the greatest lever, 3.4 roll out / keep testing / stop and who acts for six tested approaches, 3.5 the measures architecture (fund, sequence, own, trigger), 3.6 the communication decision, three assumptions, the tripwire and the board's challenge. | `2-{name}-day11-l3-sales-strategy-memo.html` |

Minutes: Materi A 60 + Task 1 65, Materi B 60 + Task 2 50. All in `lib/routes.ts`.

## German version (CLAUDE.md #32)

Same machinery as Days 5–10: `lib/lang.ts`, `lib/i18n.tsx`, `ui.lang` in the persisted store. Common terms stay English in German
sentences (Storytelling, Story, Feature, Pitch, Trigger, KPI, Guardrail, Uplift, Lift, Owner, Tripwire, Sales Operations, Chief Sales
Officer…); explanations are German, formal "Sie". Where German practitioners use the German word, the German word is used and the
glossary entry says so (Nutzen, Kundentyp, Interessent, Referenzkunde, Abschlussquote, Glaubwürdigkeit, Dringlichkeit, Rollenspiel).
Mentor tools stay English; file names and the deliverable names stay English.

## Stack

Next.js 14 App Router · TypeScript strict · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d11-v1`, version 1, `skipHydration` +
`StoreHydrator`, deep `mergeDefaults`) · static export. No animation, drag-and-drop, PDF or chart library.

```bash
npm install
npm run dev          # http://localhost:3000 (the parent launch config uses port 3011)
npm run typecheck
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (124 checks)
npm run build        # writes the static site to out/  (stop `npm run dev` first)
```

## What is in the data

- `ladder.ts`: nine sentences from conversations A and B (3 feature, 3 benefit, 3 story) with tests, pair tests, clue, reason and
  rejected kinds.
- `forecast.ts`: last year's offers (Case assumption). Close rate = deals ÷ offers × 100; lift = rate with benefit and story ÷ technical
  rate; extra revenue = offers a year × (rate with story − technical rate, as a share) × average deal value. 44 ÷ 200 = **F1 22%**;
  technical 50 ÷ 500 = 10%; 22 ÷ 10 = **F2 2.2**; 900 × 0.12 × €5,000 = **F3 €540,000**. Worked example of A4 (Havel Software): 20%,
  8%, 2.5, €216,000. Also the eight prospects of 1.3 (security-oriented = compares offers **and** 50% or more detail and risk questions:
  the municipal utility and the hospital; relationship-oriented = talks most about the people: the family firm and the law firm; traps:
  the start-up CTO asks 55% detail questions but does not compare (innovation-driven), the logistics buyer compares but asks 45%).
- `patterns.ts`: four kinds of metric with tests and pair tests; twelve sales metrics (3 each; moved with value: outcome 3, driver 2,
  guardrail 1, vanity 0); the link rule; meaning and use per kind; seven uncertainties (four real); the A/B test card (four parts, one
  fair option each, plus hypothesis and decision rule).
- `measures.ts`: nine measures with cost, weeks and what the customer hears. Comprehensibility follows from it (a customer story in the
  customer's words 3, the benefit only 2, features, specifications or price 1). Story library (27), conversation guides per customer
  type (18), storytelling training (18): €75,000. The feature brochure answers no problem of the brief.
- `route2.ts`: six principles, eight storytelling approaches (rule: does it help a buying decision? are ≥ 80% of its claims backed by a
  real, approved customer case?), eight KPI candidates with printed facts and limits, six tested approaches (rule: uplift ≥ 10% and ≥
  100 decisions → roll out; uplift ≥ 3% → keep testing; else stop; the urgency script is stopped by its complaints), eight measures
  (model €120,000 of €130,000; the AI pitch generator is a black box and breaks the budget; the celebrity campaign speaks to status for
  everyone), owners, triggers, three decisions, KPIs and the board's month-2 challenge.

## Mentor bar

The first element on every page. Enter `muchson123` once and every model answer of Routes 1 and 2 fills in (plus a participant name if
empty and every calculator part), so each export downloads straight away. The same unlock shows the answer keys (1.1, 1.3 picks, 2.1,
2.2 rows and uncertainties, 2.3 test card, 2.4 measures and order, 3.1–3.6) and a worked answer for every other question (F1–F3 as
step tables with pitfalls, every free text with what to look for). Client-side convenience gate, not security; a reload locks it.

## Notes on deviations from the brief and the shared rules

1. **Two routes (CLAUDE.md #30).** The plan's Level 1 Task 1 (two sales conversations: differences, which convinces and why, which
   emotions, three improvements for A), Level 1 Task 2 (a customer who asks many detail questions, is risk-averse and compares: type,
   needs, a suitable approach, risks of the wrong approach) and the Level 2 case study (SalesTech: analyse the sales communication,
   identify emotional weaknesses, develop two storytelling approaches, adapt them to customer types, prioritise) run on one company.
   Mapping: differences and emotions 1.1 (feature / benefit / story, and a weak moment of A); which convinces and why 1.2 (in figures)
   and 1.4; three improvements 1.3c; customer type 1.3a–b; emotional weaknesses 1.1 and 2.1; storytelling approaches adapted to
   customer types and prioritised 2.4 (the story library and the guides per customer type are the two approaches; the order and its
   reason are the prioritisation). The coaching focus and reflection are Block 1.4.
2. **Level 1 Task 2's needs, suitable approach and risks of the wrong approach** are taught in Materi A3 (rules and the table per type)
   and asked for in the reflection of Block 1.4 ("where is the argument too technical"); there is no separate field for them.
3. **The Level 3 transfer project** has five items plus the decision. 1 → 3.1; 2 → 3.2; 3 (communication strategies per customer type)
   and 4 (risk analysis: wrong approach, lack of credibility) → 3.4, where each approach is tested per customer type and guardrails on
   pressure and exaggeration stop a winner, together with 3.2's backing rule and the credibility trigger in 3.5; 5 → 3.5; the additional
   requirement → 3.6. Block 3.3 (a KPI system for sales communication) is added so the strategy can be steered; the task's "What you
   build" list names the blocks as they are.
4. **The evaluation "Effect × Comprehensibility × Persuasiveness"** from the plan is the score of Block 2.4. Comprehensibility is derived
   from what the customer hears (printed per measure), so it can be checked; effect and persuasiveness are judged.
5. **Task 1 is 65 minutes** (the A/B test card is its own block, as on Days 8 to 10).
6. **The four emotional customer types** (security-, innovation-, price-, relationship-oriented) are a practitioner model, labelled as
   such in A3; the plan names the security-oriented profile only.
7. **Every figure beyond the brief is a Case assumption**: the conversations, the offer figures, the prospects, the metrics, the costs
   and weeks, the Route 2 budget (€130,000 over four months), the backing shares, the uplifts, the KPI baselines and the board's
   challenge. The brief gives €90,000 and three months.
8. **German by the user's standing request (#32)**; English stays the default.
9. **Not built as a Friday capstone (#29)**: the request did not name Day 11 as a Friday.
10. **The plausible-range band in A6** is a standard normal approximation, shown only to make the effect of sample size visible; no task
    asks for it.
11. **Sources to re-check before teaching:** citations are given by their usual details; page ranges and editions differ between
    printings. The offer, close-rate and uplift figures are illustrations, not research findings.

## Coverage: where each task block is taught

| Block | Taught in | Help while answering |
|---|---|---|
| 1.1 Feature, benefit or story | A1, A2 (tests, pair tests, worked sort) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 1.2 What a customer story is worth | A4 (the four steps on Havel) | Show where the numbers are · Show the formula + calculator · per-part clues |
| 1.3 Customer types, three improvements | A3 (compares × detail share × what they talk about), A1, A2 | Check (picks as a count, improvements floor) + clue |
| 1.4 Coaching reflection | A1, A2, A3, A6 | Worked answers for the mentor |
| 2.1 Tag the metrics | A5 (four kinds, pair tests, KPI tree) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 2.2 Link, meaning, use; KPIs | A5, A6 (link rule, uses, uncertainties) | Your tally · Check per row with clues · Check my choices |
| 2.3 A fair A/B test | A6 (test card, sample size) | Check per part with clue · hypothesis and rule floors |
| 2.4 Measures, scores, order | A7, A3 (matching problems, comprehensibility rule, budget) | Show the test questions · budget bar · problem coverage · Check · order check |
| 3.1 Principles | B1 | Check (benefit in the customer's words and a version per type) + clue |
| 3.2 Storytelling approaches | B2 (decision first, 80% backed rule) | Show the test questions · Check (count) + clue |
| 3.3 KPI system | B3 (four tests, limits from printed facts) | Show the test questions · Check (limits, early count) |
| 3.4 Approaches: roll out, keep testing, stop | B4 (uplift and decisions rule, guardrails, owners) | Show the test questions · Check (count) + clue |
| 3.5 Measures architecture | B5 (stories first, budget, no black box; owner and trigger tests) | Show the owner test · budget bar · plan sentences · Check (three rules) |
| 3.6 Communication decision | B5 (decision rules, tripwire, premortem) | Baselines printed · Check (wait, activity metric, threshold) |
