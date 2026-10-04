import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, MODEL_GREATEST, PRINCIPLES, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { PrincipleId } from "@/data/route2";
import { MODEL_TIER, PANEL, READY_BAR } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { inUseOf, monthsOf, planOf, rangeOf } from "@/lib/r2Panel";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · A weak moment of your own",
    answer: L1().extraInsight ?? "",
    why: "A weak moment names where conversation A loses the customer, what the salesperson says there, and what the customer would need to hear instead.",
    lookFor: ["A concrete moment in conversation A (the opening, a question, the price).", "What is said today: a feature, a number, a technical name.", "What the customer would understand or feel instead (“so …”)."],
    pitfalls: ["“Be more emotional”: ask which moment, and what exactly would be said.", "A new feature to mention: ask what the customer gets from it."],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What a customer story means",
    answer: L1().meaning ?? "",
    lookFor: ["At least one printed figure (10%, 22%, 2.2 times, or the 50 and 44 deals).", "What to do next: test a story opening fairly before telling every offer to start with a story.", "Said as an estimate: salespeople may have told stories only in the offers they expected to win."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“Stories more than double our close rate”: salespeople chose which offers got a story, so it is a hint, not proof."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Improvement ${i + 1} for conversation A`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three concrete improvements for conversation A, each using a different approach (benefit, story, emotion), each saying what the customer understands or feels. The app checks only that each names an approach, is long enough and says what follows.",
    lookFor: ["A concrete moment of conversation A and what is said instead.", "The approach it uses (benefit, story, emotion).", "What the customer understands or feels (“so …”)."],
    pitfalls: ["A goal instead of a sentence (“be more convincing”): ask what exactly would be said, when.", "Two improvements with the same approach."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · Why stories work more strongly than arguments" : k === "causation" ? "1.4 · Where the argument is too technical" : "1.4 · How a top sales manager communicates",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["The listener pictures a case like theirs and argues against it less.", "Information versus emotion: people decide on the second and check with the first."]
        : k === "causation"
          ? ["A concrete moment where conversation A is too technical.", "How it would be adapted to the customer type."]
          : ["Problem first, a true story, the proof the type needs.", "Authentic, not manipulative: no promise the product cannot keep."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.1 · Your three KPIs",
    answer: L1().misread ?? "",
    example: tt("Company A (a software reseller) steers its sales conversations by three KPIs. Close rate of offers, from the CRM, aim: up. It is the result sales is paid for, so it is the outcome. Share of first meetings that lead to a second one, from the CRM, aim: up. Prospects do it before they sign and the team can move it this month, so it is the driver. Customers who say they were promised something the product cannot do, from the follow-up call, aim: stay under a limit. If it rises we stop, so it is the guardrail. Choose yours from SalesTech's twelve metrics.", "Unternehmen A (ein Software-Reseller) steuert seine Verkaufsgespräche mit drei KPIs. Abschlussquote der Angebote, aus dem CRM, Ziel: hoch. Es ist das Ergebnis, für das der Vertrieb bezahlt wird, also der Outcome. Anteil der Erstgespräche, die zu einem zweiten führen, aus dem CRM, Ziel: hoch. Interessenten tun es, bevor sie unterschreiben, und das Team kann es in diesem Monat bewegen, also der Treiber. Kunden, die sagen, ihnen sei etwas versprochen worden, das das Produkt nicht kann, aus dem Nachgespräch, Ziel: unter einer Grenze bleiben. Steigt er, stoppen wir, also die Guardrail. Wählen Sie Ihre aus den zwölf Kennzahlen von SalesTech."),
    lookFor: ["At least one outcome KPI (close rate, revenue from new customers, renewals).", "At least one driver KPI (offers with a story, second meetings, customers who can repeat the benefit).", "For each: where the number comes from and a target; a guardrail (promises the product cannot keep) as the third is a strong answer."],
    pitfalls: ["Slides, calls or brochures as a KPI: vanity metrics, they count SalesTech's activity.", "Only outcomes: the team has nothing it can move this month."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    example: tt("Company A tests a story opening. Hypothesis: if every offer to a bakery chain opens with a one-paragraph story of another bakery chain instead of a feature list, then the close rate rises, because the buyer sees a firm like theirs. Rule, written before the start: roll out if the close rate is at least 8% above the control group with 80 deals per group and complaints stay under 2%; keep testing between 3% and 8%; stop below 3%. Write yours for SalesTech's test card.", "Unternehmen A testet einen Story-Einstieg. Hypothese: Wenn jedes Angebot an eine Bäckereikette mit einem Absatz über eine andere Bäckereikette statt mit einer Feature-Liste beginnt, dann steigt die Abschlussquote, weil der Käufer eine Firma wie seine sieht. Regel, vor dem Start geschrieben: ausrollen, wenn die Abschlussquote bei 80 Abschlüssen pro Gruppe mindestens 8 % über der Kontrollgruppe liegt und die Beschwerden unter 2 % bleiben; weiter testen zwischen 3 % und 8 %; stoppen unter 3 %. Schreiben Sie Ihre für die Testkarte von SalesTech."),
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (stories called exaggerated, complaints about pressure)."],
    pitfalls: ["“The story will convince”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${m.model.effect} × ${e} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Comprehensibility from what the customer hears (A7)", calc: `the customer hears ${JOINS_LABEL[m.joins]} → a story: 3 · the benefit: 2 · features or price: 1`, result: String(e) },
      { label: "Score = Effect × Comprehensibility × Persuasiveness", calc: `${m.model.effect} × ${e} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}. A different, well-reasoned effect or scalability score is acceptable: only the score that follows a printed rule is checked.`,
    pitfalls:
      id === "aipitch"
        ? ["Persuasiveness 3 “because it is personal”: generic claims and invented details are not credible: 1."]
        : id === "discount"
          ? ["Answering “offers appear interchangeable”: a discount makes the price the difference, which makes offers more interchangeable."]
          : id === "brochure" || id === "video"
            ? ["Comprehensibility 2 or 3 “because it is nicely made”: the customer still hears features: 1."]
            : undefined,
  };
}

/** The reason a learner gives for a measure's two judged scores (CLAUDE.md #45). The mentor's answer is the measure's own model note. */
export function reasonGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  return {
    title: `2.4 · Why ${m.name} gets its effect and persuasiveness scores`,
    answer: `Effect ${m.model.effect}, persuasiveness ${m.model.feasibility}: ${m.model.note}`,
    example: tt("Company A's “a reference call with a customer of the same industry”: effect 3, because the buyer hears from someone like them before deciding; persuasiveness 3, because it is a real customer speaking, not the seller. Give your own reason for each score, with a fact printed on the card.", "Der „Referenzanruf bei einem Kunden derselben Branche“ von Unternehmen A: Wirkung 3, weil der Käufer vor der Entscheidung von jemandem hört, der ihm gleicht; Überzeugungskraft 3, weil ein echter Kunde spricht, nicht der Verkäufer. Geben Sie für jeden Wert Ihren eigenen Grund an, mit einer auf der Karte gedruckten Tatsache."),
    why: "Effect and persuasiveness are judgements; a different score with a clear reason is as good as the model. The reason should name what changes for the buyer (effect) and why a buyer would believe it (persuasiveness).",
    lookFor: ["Effect: what the buyer hears or does differently because of the measure.", "Persuasiveness: why a buyer would believe it: a real case, a named customer, a proof.", "A fact from the card, not only “it is good”."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
    example: tt("Company A puts its customer-story library first: it scores 18 and it answers the problem that buyers do not understand the benefit. The conversation guides come second and start alongside it. Together they cost €45,000 of the €60,000. The feature brochure stays out: it scores 4 and tells buyers only what the product can do. Make the same three statements about your own measures.", "Unternehmen A setzt seine Bibliothek aus Kunden-Storys an die erste Stelle: Sie erzielt 18 und beantwortet das Problem, dass Käufer den Nutzen nicht verstehen. Die Gesprächsleitfäden kommen zweite und starten gleichzeitig. Zusammen kosten sie 45.000 € von 60.000 €. Die Feature-Broschüre bleibt draußen: Sie erzielt 4 und sagt Käufern nur, was das Produkt kann. Machen Sie dieselben drei Aussagen über Ihre eigenen Maßnahmen."),
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the lift from 1.2).", "The cost against €90,000.", "What was left out, said as a decision (features again, price instead of benefit, or no problem answered)."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name}`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for SalesTech's salespeople or customers.", "Which problem of the brief it answers (products that need explaining, strong competition, benefit not understood)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask how a security-oriented customer reacts to pressure, or what happens when a promise is checked."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    example: tt("Company A picks “close rate per customer type” as its greatest-leverage KPI: it is linked to revenue and counted every week for every customer by the systems, so every approach can be judged within weeks, and it answers the problem that customers do not understand the benefit. Name your own KPI, the tests it passes best and the problem of the brief it answers.", "Unternehmen A wählt „Abschlussquote pro Kundentyp“ als KPI mit der größten Hebelwirkung: Er ist mit dem Umsatz verbunden und wird jede Woche für jeden Kunden von den Systemen gezählt, sodass sich jeder Ansatz innerhalb von Wochen beurteilen lässt, und er beantwortet das Problem, dass Kunden den Nutzen nicht verstehen. Nennen Sie Ihren eigenen KPI, die Tests, die er am besten besteht, und das Problem des Auftrags, das er beantwortet."),
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to value together).", "The problem of the brief it answers (customers don't understand the benefit)."],
    pitfalls: ["Slides in the pitch deck as greatest “because it is counted and complete”: it is not linked to value."],
  };
}

const ids = (m: Record<string, Tier>, f: (t: Tier) => boolean) => ARCH_IDS.filter((id) => f(m[id] ?? "not"));

export function architectureGuide(): MentorGuide {
  const model = MODEL_TIER;
  const funded = ids(model, (t) => t !== "not");
  const mr2 = { tier: model };
  const plan = planOf(mr2, 0);
  const weak = planOf(mr2, 1);
  const r = rangeOf(mr2);
  const cost = funded.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const meas = (p: typeof plan) => funded.filter((id) => PANEL[id].measured && p.items[id].measOk && p.items[id].dataOk && !p.items[id].late && !PANEL[id].blackBox);
  const sum = (list: (keyof typeof ARCH_BY_ID)[]) => list.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredIds = meas(plan);
  const measuredWeakIds = meas(weak);
  const riskWeak = funded.filter((id) => PANEL[id].blackBox || !weak.items[id].dataOk || weak.items[id].late);
  const plus = (list: string[]) => list.join(" + ");
  const sp = planOf({ tier: { ...model, suite: "now" as const } }, 0);
  const rl = planOf({ tier: { ...model, relaunch: "now" as const } }, 0);
  const pn = planOf({ tier: { ...model, personal: "now" as const } }, 0);
  return {
    title: "Step A · The architecture and what the panel shows for it",
    answer: `Now: ${ids(model, (t) => t === "now").map((id) => PANEL[id].short).join(", ")}. After the proof is ready: ${ids(model, (t) => t === "later").map((id) => PANEL[id].short).join(", ")}. Not now: ${ids(model, (t) => t === "not").map((id) => PANEL[id].short).join(", ")}.`,
    steps: [
      { label: "Funded items (every Now and After the proof item)", calc: plus(funded.map((id) => n(ARCH_BY_ID[id].cost))), result: euro(cost) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: `Month in use = start + weeks ÷ 4, rounded up (Now starts in month 1; After the proof starts when the reference programme is in use, month ${1 + monthsOf("routing")})`, calc: funded.map((id) => `${PANEL[id].short}: ${plan.items[id].start} + ${ARCH_BY_ID[id].weeks} ÷ 4 → ${inUseOf(mr2, id)}`).join(" · "), result: `all by month ${Math.max(...funded.map((id) => inUseOf(mr2, id)!))} of ${R2_MONTHS}` },
      { label: "Measurable, brief's figures: money on measured items with claims backed and in use in time ÷ funded money", calc: `(${plus(measuredIds.map((id) => n(ARCH_BY_ID[id].cost)))}) ÷ ${n(cost)} = ${n(sum(measuredIds))} ÷ ${n(cost)}`, result: `${r.meas[0]}%` },
      { label: `Measurable, backing 15 points weaker (the guides drop to ${(PANEL.chat.data ?? 0) - 15}%)`, calc: `${n(sum(measuredWeakIds))} ÷ ${n(cost)}`, result: `${r.meas[1]}%` },
      { label: "Risk: money on a black box, on claims below 80% backed or in use after the months ÷ funded money", calc: `0 ÷ ${n(cost)} (brief) · ${n(sum(riskWeak))} ÷ ${n(cost)} (weaker)`, result: `${r.risk[0]}% · ${r.risk[1]}%` },
    ],
    why: `The model set holds all four tests with the brief's figures (${plan.holding} of ${plan.applicable}) and opens the backing test when the backing is 15 points weaker (${weak.holding} of ${weak.applicable}). That open test is the reason Step B asks what the learner watches. The numbers on screen are computed from one data file, so this table equals the panel.`,
    lookFor: ["At least one item Now (the task asks for an architecture).", "The story library and KPIs are in place no later than any story tool.", "Nothing the learner cannot explain or measure is funded without a reason, and nothing arrives after the four months without one."],
    pitfalls: [
      `Adding the AI pitch generator: ${euro(sp.bars.spent)} funded, ${euro(sp.bars.over)} over the budget, Risk ${sp.bars.risk}% (a black box, in use only in month ${sp.items.suite.inUse}), and ${sp.holding} of ${sp.applicable} tests hold.`,
      `Adding the image campaign: ${euro(rl.bars.spent)} funded, ${euro(rl.bars.over)} over the budget; it names no KPI, has no customer's own story behind it and is in use only in month ${rl.items.relaunch.inUse}, so ${rl.holding} of ${rl.applicable} tests hold.`,
      `Setting the storytelling training to Now beside the model set: it starts in month 1 on claims ${PANEL.personal.data}% backed, below ${READY_BAR}%, so the backing test opens (${pn.holding} of ${pn.applicable} hold); After the proof with the reference programme Now starts it in month ${1 + monthsOf("routing")}.`,
      "Leaving the story library out: every story tool loses its link to the approved stories and the KPIs, so the Measurable bar falls to nothing.",
    ],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "Step A · The target vision",
    answer: R2().vision ?? "",
    example: tt(
      "Company A will sell through what changes for the customer: every conversation starts from a story a customer approved, and it steers by two KPIs. Every new tool has to move one of them before it grows. Write your own target vision for SalesTech.",
      "Unternehmen A wird über das verkaufen, was sich für den Kunden ändert: Jedes Gespräch beginnt bei einer Story, die ein Kunde freigegeben hat, und es steuert über zwei KPIs. Jedes neue Werkzeug muss einen davon bewegen, bevor es wächst. Schreiben Sie Ihr eigenes Zielbild für SalesTech.",
    ),
    why: "The plan asks for a target vision of an emotional sales strategy. It is the one place the learner says, in two sentences, what the whole architecture is for, before the items.",
    lookFor: ["What the strategy does for the company and its customers (benefit in the customer's words, backed by real stories).", "Steering by a few KPIs, not by single tools.", "Two sentences, in the learner's own words."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "Step A · What the plan gives, and what the learner gives up",
    answer: R2().giveUp ?? "",
    example: tt(
      "Company A's plan gives it an approved story library, a guide per customer type and a few customers who confirm the stories on a call. It gives up a celebrity campaign, which names no KPI, and €15,000 stay unspent. If fewer stories are approved than expected, the guides rest on claims below 80% backed, so they are watched first. Write yours about your own plan: what it gives, what it costs or leaves open.",
      "Der Plan von Unternehmen A gibt ihm eine freigegebene Story-Bibliothek, einen Leitfaden pro Kundentyp und einige Kunden, die die Storys in einem Gespräch bestätigen. Es verzichtet auf eine Promi-Kampagne, die keinen KPI nennt, und 15.000 € bleiben ungenutzt. Werden weniger Storys freigegeben als erwartet, beruhen die Leitfäden auf Aussagen unter 80 % belegt, also werden sie zuerst beobachtet. Schreiben Sie Ihre über Ihren eigenen Plan: was er gibt, was er kostet oder offen lässt.",
    ),
    why: "Every plan gives something and costs something. Writing it first, before the system's reading is opened, is what makes the learner think about the trade-off instead of reading it off.",
    lookFor: ["One thing the plan gives (measured, backed, in budget, in time).", "One thing it costs or leaves open (an item not now, claims below 80% backed, an item after the four months, budget unspent).", "A link to the two scenarios if the learner saw them."],
  };
}

export function decisionWhyGuide(): MentorGuide {
  return {
    title: "Step B · Why this decision",
    answer: R2().decisionWhy ?? "",
    example: tt(
      "Company A decides now but pilots with two customer types: the approved stories and the guides start first, so real conversations change within weeks and are measured from the first week, and the big campaign waits because nobody could say what it changes for customers. Write your reason for your own decision.",
      "Unternehmen A entscheidet jetzt, pilotiert aber mit zwei Kundentypen: Die freigegebenen Storys und die Leitfäden starten zuerst, sodass sich echte Gespräche innerhalb von Wochen ändern und ab der ersten Woche gemessen werden, und die große Kampagne wartet, weil niemand sagen könnte, was sie für Kunden ändert. Schreiben Sie Ihre Begründung für Ihre eigene Entscheidung.",
    ),
    why: "A decision part has no single right answer (CLAUDE.md #38): what counts is a clear reason, and that it fits the learner's own Step A. If the decision and Step A disagree, the panel hints and the reason should explain it.",
    lookFor: ["Names the decision and one rule from Materi B5 it rests on.", "Fits the learner's own Step A, or says why it does not.", "Says how the unclear customer reactions are handled (change real conversations where the claims are backed, measure from week one)."],
  };
}

export function watchGuide(): MentorGuide {
  const refMonth = inUseOf({ tier: MODEL_TIER }, "routing") ?? 0;
  return {
    title: "Step B · What the learner watches, and when they would stop",
    answer: R2().watch ?? "",
    example: tt(
      "Company A watches the share of customers who can repeat the benefit: today it is 30%, and if it is not clearly above that by month 3 on enough meetings, it stops adding tools and rewrites its guides. It also watches the claims behind the guides: if they stay below 80% backed, it pauses them. Write yours with the figure from your own plan.",
      "Unternehmen A beobachtet den Anteil der Kunden, die den Nutzen wiedergeben können: Heute liegt er bei 30 %, und liegt er bis Monat 3 bei genug Gesprächen nicht deutlich darüber, hört es auf, Werkzeuge hinzuzufügen, und schreibt seine Leitfäden neu. Es beobachtet auch die Aussagen hinter den Leitfäden: Bleiben sie unter 80 % belegt, pausiert es sie. Schreiben Sie Ihre mit der Zahl aus Ihrem eigenen Plan.",
    ),
    why: `A figure about customers (the close rate of offers or the share who can repeat the benefit), not the company's own output (slides, calls, stories produced), a month in which it can first be read (the reference programme is in use from month ${refMonth} in the model, so month ${refMonth + 1}), and an action. The numbers are the ones printed in “the numbers today”: 35% can repeat the benefit today with an aim of 65%; the backing bar is ${READY_BAR}%.`,
    lookFor: ["A customer figure, with today's value.", "A month by which it can be read.", "What the learner does if it falls short (stop, pause, change one thing)."],
    pitfalls: ["Slides, calls or stories produced as the figure: that counts the company's own output.", "No month: a sign nobody can act on."],
  };
}
