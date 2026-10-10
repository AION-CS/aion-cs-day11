# Retention Lab · Day 11

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 6 (1 day).**
*Purposefully applying emotional sales psychology and storytelling in sales.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32 and, since the retrofit of 2026-10-03, #33 to #46 (see “Retrofit” below). Route 2 follows #47 since 2026-10-04 (see “Route 2 redesign” below).

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
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 the target vision of an emotional sales strategy, B2 central storytelling approaches: the decision first, then the proof, B3 a KPI system for sales communication: four tests, B4 testing approaches per customer type: roll out, keep testing or stop, B5 a communication decision under unclear customer reactions, and the measures architecture). **Task 2, Sales Strategy Memo**, one decision frame (#47): a live control panel, **Step A** (Block 3.5, the architecture: each of eight items Now / After the proof is ready / Not now, a two-sentence vision, what the plan gives and what it costs) and **Step B** (Block 3.6, the communication decision despite unclear customer reactions, why, what you will watch and when you would stop), then four folded Optional blocks, “Go deeper”: 3.1 principles, 3.2 central storytelling approaches, 3.3 KPIs rated on four tests, 3.4 approaches per customer type, tested. The memo assembles below the answers. | `2-{name}-day11-l3-sales-strategy-memo.html` |

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
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (295 checks)
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
| 3.5 Step A · Architecture | B5 (the order: story library and KPIs, people and proof, claims, story tools; four tests; the time test) | The live panel (diagram, three bars, four tests on request, “what to change” reading) · numbers today printed in the brief |
| 3.6 Step B · Communication decision | B5 (decide now, pilot in stages, watch one figure, say when you stop) | The decision's reading and plain hint · the watch sentence's clue kit |

## Retrofit of 2026-10-03 (the user's request: bring Days 8 to 12 up to the current rules, Route 1 first, decide without asking)

Applied from `../CLAUDE.md`: #33 to #46. Route 1 was done first, Route 2 second. Nothing was committed or pushed.

**Core and Optional (#35, #40, #44).** Route 1 has **two Core blocks, one per level** (1.1 for Level 1 and 2.4 for Level 2; 20 min of the 64) and six Optional blocks, folded and never removed
(1.2, 1.3, 1.4, 2.1, 2.2, 2.3). Route 2 has **two Core blocks** (3.5, 3.6; 19 min of the 50) and
four Optional blocks (3.1, 3.2, 3.3, 3.4). Core cards: A2 (the tests of block 1.1), A7 (block 2.4) and B5 (Route 2); Optional cards: A1, A3, A4, A5, A6, B1, B2, B3, B4. The ring, the page map
and both missing lists count Core only; an unanswered Optional block is marked as such in the exported file.

**Update 2026-10-10 (Route 1 narrowed to one Core block and one Core card per level).** Core is now Block 1.1 with card A2 (Level 1) and Block 2.4 with card A7 (Level 2); Blocks 1.3 and 2.1 and cards A1, A3 and A5 are folded Optional items (one click opens them, nothing is removed or gated). Block 1.1 now cites card A2 only, which carries the test questions it needs, so no Core block reads an Optional card (#40). The ring, the page map and the missing lists count the two Core blocks and two Core cards; `npm run verify:calc` checks it, including a Core-only fill that leaves the missing list empty. Route 2 is unchanged.

**What changed in Route 1.** Block 1.2 is read-only (the two close rates are printed, nothing is calculated, #44) and Optional; the three KPIs moved into Block 2.1;
Block 2.4 names a category for every measure, asks for a reason for each judged score, and shows the budget as a hint (#45, #38). Every measure and every
contact situation prints a scene and who does what (#46). Every interactive picture opens with “The point” and a three-step story (#36); long text sits behind
“＋ Show …” (#37); every free-text field has a clue kit and an example answer (#42, #23); two live rust notices (#34); the page map shows Core / Optional (#28).

**What changed in Route 2 (superseded on 2026-10-04 by the redesign below).** The live memo moved to the bottom with “Hide the memo” (#39); Blocks 3.1 to 3.4 became folded Optional blocks; the trigger, pickup, assumption and tripwire kits of this first pass were replaced by the panel.

**Shared mechanics.** `cs-d11-v1` persists at version 3 with a pure `migratePersisted` and a deep merge (#9); `npm run verify:calc` runs 310 checks (figures and rules, the panel's bars, tests and categories, the mentor fill and a
Core-only fill in both languages, #40 scans of the Core blocks, old version-2 blob).

### Notes on deviations (retrofit)

R1. **No video was embedded (#33).** None was searched and verified in this pass; a card without a video is not a defect (#33). The video slot stays empty (`data/videos.ts`).
R2. **No calculators (#44).** The plan names no calculation beyond the printed rates, the budget and the score formula, so the former F1–F3 calculators and “Show the formula” helps
    of Block 1.2 were removed; wherever older text above mentions them, it is superseded.
R3. **Route 1 has two Core blocks (one per level) and two Core cards (A2, A7); Route 2 keeps its two Core blocks (Step A, Step B) and one Core card (B5)** (user decision of 2026-10-10: the one-per-level idea of #48 applied to Route 1 only, so learners have time for other tasks; Route 2 stays as built). Nothing is removed: Blocks 1.3 and 2.1 and cards A1, A3 and A5 are now folded Optional items, and the exported file marks an unanswered Optional block as such.
R4. **Model answers use only printed numbers.** The mentor's KPI answer uses aims such as “up” or “stay under a limit”; the panel's bars and the memo's figures are computed from the printed costs, weeks, backing figures and the budget, so each number can be found on the screen.
R5. **The Word documents (#31) were not rebuilt** in this pass and are out of date for Day 11: Core / Optional marks, “The point”, the shown numbers and the new case-brief table are missing. Rebuild them from the reviewed Markdown in `../materi-task-docx/_source/` when wanted.
R6. **German and English** are written by hand next to each other for every new text (#32); the glossary got “cost of waiting” and “halfway between today and the aim”.
R7. **Plan mapping (#44).** The plan's numbered task items and the Level 3 requirements are mapped in note 1 above; Core is drawn from them: Route 1's Core blocks answer the Task 1 items (the first tagging and the situations or opportunities) and the case study's KPI and measures items; Route 2's Core blocks are the implementation requirement (3.5) and the additional decision requirement (3.6).

### Dependency checklist (#40)

✓ = reads only Core blocks, Core cards and the case brief. An Optional item may read a Core answer; nothing reads an Optional item back.

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| **Route 1** | | | |
| 1.1 Feature, benefit or story? | **Core** | the brief, the block's own printed items, cards A1, A2, A3 | ✓ |
| 1.2 Read the offer figures: two close rates side by side | Optional | the brief, the block's own printed items, cards A4 | self-contained |
| 1.3 Customer types, and three improvements for conversation A | **Core** | the brief, the block's own printed items, cards A3 | ✓ |
| 1.4 Coaching reflection: from Level 1 to Level 2 | Optional | the brief, the block's own printed items, cards A1, A2, A3 | self-contained |
| 2.1 Tag SalesTech's twelve metrics by kind, and name your three KPIs | **Core** | the brief, the block's own printed items, cards A5 | ✓ |
| 2.2 What each kind of metric is worth, and the uncertainties in measuring | Optional | the brief, the block's own printed items, cards A5, A6 | self-contained |
| 2.3 Design a fair A/B test | Optional | the brief, the block's own printed items, cards A6 | self-contained |
| 2.4 Choose three measures, score them, put them in order | **Core** | the brief, the block's own printed items, cards A7 | ✓ |
| **Route 2** | | | |
| Case brief and “Where Route 1 left off” | — | Route 1 Core Block 2.4 (measures chosen), “the numbers today” | ✓ |
| Control panel (diagram, bars, tests) | Core | printed item facts, “the numbers today”, card B5 | ✓ |
| 3.1 The target vision of an emotional sales strategy | Optional | its own printed items, cards B1 | self-contained |
| 3.2 Definition of central storytelling approaches | Optional | its own printed items, cards B2 | self-contained |
| 3.3 A KPI system for sales communication | Optional | its own printed items, cards B3 | self-contained |
| 3.4 Approaches per customer type, tested: roll out, keep testing or stop | Optional | its own printed items, cards B4 | self-contained |
| 3.5 Step A: the prioritised implementation architecture | **Core** | the panel, printed item cards, “the numbers today”, card B5 | ✓ |
| 3.6 Step B: a communication decision despite unclear customer reactions | **Core** | own plan from Step A (quoted in the block), the panel's readings, “the numbers today”, card B5 | ✓ |
| **Cards** | | | |
| A2, A7, B5 | Core | the case (A2 carries the tests of block 1.1; A7 the rules of block 2.4) | ✓ |
| A1, A3, A4, A5, A6, B1, B2, B3, B4 | Optional | — | no Core block cites them |

## Route 2 redesign (CLAUDE.md #47, applied 2026-10-04; reference: `../day8/ROUTE2-REDESIGN.md`)

The user asked for Day 11 to get the same treatment as Days 9 and 10. Route 2 is one decision frame with a live control panel; only the form is reused, the items and rules are Day 11's.

```
Materi B (five cards, 60 min; B5 rewritten: how an architecture is built)
Case brief + “the numbers today” (cost, weeks, claims backed, the KPI each item moves)
Control panel · eight item cards · diagram with links that can break · three bars · four tests on request · a reading in plain words
Step A  (Core, 3.5)   each item Now / After the proof is ready / Not now · vision (two sentences) · what my plan gives and what I give up
Step B  (Core, 3.6)   decide now, pilot with two customer types / wait for a survey / switch every conversation · why · what I will watch and when I would stop
Go deeper (Optional, folded): 3.1 · 3.2 · 3.3 · 3.4   (self-contained, never read by the frame)
Memo (bottom, full width, Hide) → Export
```

**Plan mapping (#44).** Day 11's Level 3 transfer project asks for: the target vision (Step A's vision box), the central storytelling approaches (the item cards and the diagram's layers; the full
exercise is Optional 3.2), a KPI system (the approved story library and KPIs as the base, the **Measurable** bar, and Step B's watch sentence), the selection of approaches per customer type (the tiers, with
the backing test) and a measures architecture (Step A), and the additional requirement, a communication decision despite unclear customer reactions (Step B and the backing switch “15 points weaker”). The
plan asks for no calculation beyond the printed budget, so the learner derives no number: the bars are computed and shown.

**The panel.** Eight items: the approved story library and benefit messages with the KPIs (the base), the conversation guides per customer type and the storytelling training with role plays (the story tools),
the reference customer programme, the story field in the CRM with a monthly review, the proof pack for security-oriented customers, the AI pitch generator (a black box) and an image campaign with a celebrity
testimonial (it names no KPI). A solid teal link works; a dashed amber link says in words why it does not (a tool with no approved story to tell, claims not confirmed by a customer, a generator with no link to the
approved stories, a campaign with no customer story behind it). Three bars: **Budget** (€130,000, four months), **Measurable** (money on items that are measured, whose claims are backed and that are in use
within four months) and **Risk** (money on a black box, on claims below 80% backed when the item starts, or on an item in use only after the four months), the last two as ranges across the two backing scenarios.
**Time** is derived: month in use = start month + weeks ÷ 4, rounded up; After the proof is ready starts in the month the reference programme is in use. Four tests, hidden until asked: the stories come first;
every funded item has a purpose; claims are backed when a story tool starts; it fits the budget and the four months. Each open test gives the fact, the rule and two ways to act, never a question.

**Categories (mentor only).** The reading's wording follows three internal categories (1 safe, 2 fair, 3 clearly wrong). Only the unlocked mentor sees them (`MentorCategory`); they are never exported, never printed and
never block (#38). The model set (story library and KPIs, guides, reference programme, CRM field and proof pack Now; training After the proof; pitch generator and campaign Not now) reads as holding all four tests;
anything else reads what to change to get there.

**What was removed from the first pass.** Start months, owners, triggers, the pickup point, three assumptions, the tripwire and the board's challenge (the plan names none of them), the three-method numbers kit
(`lib/r2Numbers.ts`) and `SentenceKit`. B5's worked example is now a small panel on another company (Neisse Systems).

**Missing (#34, #38).** Only an empty field, a too-short reason, or no item Now. Labels start “Step A:” / “Step B:”. Going over the budget, a story tool on thin backing or a decision that disagrees with Step A is a
reading and a plain hint, never a missing item; the memo prints the choice, the amount over the budget and the reasons as plain facts.

### Notes on deviations (redesign)

P1. **The “data” of the panel is the backing of claims.** The plan's day is about stories, not data: “After the proof is ready” waits for the reference programme (4 weeks, in use month 2), because a customer who
    confirms a story on a call is what backs the claim. The guides (claims 88% backed) can start in month 1; the training (60%) starts in month 2 and is in use in month 4.
P2. **Two weeks were changed in the Case assumptions**: the AI pitch generator now takes 14 weeks (was 10) and the image campaign 16 weeks (was 12), so that both are in use only in month 5, after the four months, as the
    time test needs. Every figure is a Case assumption.
P3. **Item identifiers keep earlier names** (`chat` is the conversation guides, `personal` the storytelling training, `routing` the reference programme, `training` the CRM story field and review, `tracking` the proof pack,
    `suite` the AI pitch generator, `relaunch` the image campaign); `data/route2Panel.ts` says so. The tier label and the scenario switch are worded for the day (“After the proof is ready”, “Backing of the claims”).
P4. **Persist version 3.** The funded items of a version-2 blob become “now”; the removed fields are dropped; a deep merge fills the new ones. Tested in `verify:calc` and in the browser from an old-shape blob.
P5. **Word documents** (#31) for Route 2 are stale (they describe the old 3.5 and 3.6) and were not rebuilt.
P6. **Verified:** `tsc`, `verify:calc`, a production build in a scratch copy served as a static export: clean `localStorage`, the panel with the model set (€120,000; 79% / 63% Measurable; 0% / 17% Risk; 4 of 4 tests,
    3 of 4 with weaker backing), mentor fill, memo, DE, 390 px (no horizontal scroll), old blob, no console errors.
