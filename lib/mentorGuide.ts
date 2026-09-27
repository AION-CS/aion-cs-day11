import { FORECAST, PILOT } from "@/data/forecast";
import type { FigureId } from "@/data/forecast";
import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_ARCH, MODEL_GREATEST, MODEL_TRIGGER, OWNERS, OWNER_ACCEPT, PRINCIPLES, R2_BUDGET } from "@/data/route2";
import type { ArchId, PrincipleId } from "@/data/route2";
import { euro } from "@/lib/lang";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const n3 = (v: number) => (Math.round(v * 1000) / 1000).toLocaleString("en-US");
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

export function figureGuide(id: FigureId): MentorGuide {
  const v = PILOT.variant;
  const c = PILOT.control;
  if (id === "F1")
    return {
      title: "1.2 · F1 Close rate with benefit and story",
      answer: n(FORECAST.f1),
      steps: [
        { label: "Deals ÷ offers", calc: `${v.orders} ÷ ${v.sent}`, result: n(v.orders / v.sent) },
        { label: "× 100", calc: `${n(v.orders / v.sent)} × 100`, result: `${n(FORECAST.f1)}%` },
      ],
      why: "Both numbers come from the rows with benefit and story: of 200 offers, 44 became deals.",
      pitfalls: [`Share left as a fraction (0.22 instead of 22): ${n(v.orders / v.sent)}.`, `Technical rows used: ${n(FORECAST.controlRate)}.`, `All deals over all offers: ${n(((v.orders + c.orders) / (v.sent + c.sent)) * 100)}.`],
    };
  if (id === "F2")
    return {
      title: "1.2 · F2 Lift",
      answer: n(FORECAST.f2),
      steps: [
        { label: "Technical close rate", calc: `${c.orders} ÷ ${c.sent} × 100`, result: `${n(FORECAST.controlRate)}%` },
        { label: "Lift = F1 ÷ that rate", calc: `${n(FORECAST.f1)} ÷ ${n(FORECAST.controlRate)}`, result: n(FORECAST.f2) },
      ],
      why: "Offers with the benefit and a story closed 2.2 times as often as technical ones.",
      pitfalls: [`Subtracted instead of divided (22 − 10): ${n(FORECAST.f1 - FORECAST.controlRate)}.`, `Divided the deals (44 ÷ 50): ${n(44 / 50)} — the groups are not the same size, so the counts must become rates first.`, `Divided the offers (500 ÷ 200): 2.5.`],
    };
  const diff = (FORECAST.f1 - FORECAST.controlRate) / 100;
  return {
    title: "1.2 · F3 Extra revenue a year",
    answer: n(FORECAST.f3),
    steps: [
      { label: "Difference between the two rates, as a share of one", calc: `(${n(FORECAST.f1)} − ${n(FORECAST.controlRate)}) ÷ 100`, result: n3(diff) },
      { label: "Extra deals a year", calc: `${n(PILOT.yearly)} × ${n3(diff)}`, result: n(PILOT.yearly * diff) },
      { label: "× average deal value", calc: `${n(PILOT.yearly * diff)} × ${n(PILOT.order)}`, result: euro(FORECAST.f3) },
    ],
    why: "Only the deals the story adds on top of technical offers are extra: 108 more deals a year at €5,000 each.",
    pitfalls: [`All deals at the story rate counted as extra (900 × 0.22 × 5,000): ${n(PILOT.yearly * 0.22 * PILOT.order)}.`, `Difference not turned into a share (900 × 12 × 5,000): ${n(PILOT.yearly * 12 * PILOT.order)}.`, `Last year's 200 story offers used instead of a year's 900: ${n(200 * diff * PILOT.order)}.`],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What a customer story means",
    answer: L1().meaning ?? "",
    lookFor: ["At least one of the learner's own figures (22%, 2.2 times, €540,000, or 10%).", "What to change first: open every offer with the benefit and a matching story.", "Said as an estimate: salespeople may have told stories mainly to warm prospects."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“Stories make €540,000”: the figures are not a fair test yet."],
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
    title: "2.2 · Your three KPIs",
    answer: L1().misread ?? "",
    lookFor: ["At least one outcome KPI (close rate, revenue from new customers, renewals).", "At least one driver KPI (offers with a story, second meetings, customers who can repeat the benefit).", "For each: where the number comes from and a target; a guardrail (promises the product cannot keep) as the third is a strong answer."],
    pitfalls: ["Slides, calls or brochures as a KPI: vanity metrics, they count SalesTech's activity.", "Only outcomes: the team has nothing it can move this month."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
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
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}.`,
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

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
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
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to value together).", "The problem of the brief it answers (customers don't understand the benefit)."],
    pitfalls: ["Slides in the pitch deck as greatest “because it is counted and complete”: it is not linked to value."],
  };
}

export function triggerGuide(id: ArchId): MentorGuide {
  const model = MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER];
  return {
    title: `3.5 · ${ARCH_BY_ID[id].name}`,
    answer: model ?? "A metric, a number, a date and an action for this item.",
    why: `Owner that defends: ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}.`,
    lookFor: ["A metric about the item's effect.", "A number and a month.", "An action the owner can take alone."],
  };
}

export function postponedGuide(): MentorGuide {
  const cost = MODEL_ARCH.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  return {
    title: "3.5 · What is left out, and the pickup point",
    answer: `${R2().postponed} · ${R2().pickup}`,
    steps: [
      { label: "Model funded items", calc: MODEL_ARCH.map((id) => n(ARCH_BY_ID[id].cost)).join(" + "), result: euro(cost) },
      { label: "Left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: "With the AI pitch generator added", calc: `${n(cost)} + ${n(ARCH_BY_ID.suite.cost)}`, result: euro(cost + ARCH_BY_ID.suite.cost) },
    ],
    lookFor: ["The item named, with its cost.", "Why this one (budget, a black box, known but not understood).", "A pickup point with a number and a date."],
  };
}

export function assumptionGuide(i: number): MentorGuide {
  return {
    title: `3.6 · Assumption ${i + 1}`,
    answer: (R2().assumptions ?? [])[i] ?? "",
    lookFor: ["What is assumed about the data, the customers or the teams.", "The sign that would show it is wrong, with a number or a date."],
  };
}

export function challengeGuide(): MentorGuide {
  return {
    title: "3.6 · The board's challenge",
    answer: R2().challenge ?? "",
    why: "The stories work where they were built: second meetings rose from 30% to 45%. Two months and 12% to 13% are too little to judge deals. Fix the two stories that sounded exaggerated by adding proof; do not go back to features or buy a generator of unchecked claims.",
    lookFor: ["What is checked first (which stories were called exaggerated; is 12 to 13% based on enough decisions).", "What is kept (the stories, the guides, the tripwire date).", "One change (for example: every story carries its proof before it is told again)."],
    pitfalls: ["Going back to features: the problem the case started with returns.", "Buying the AI generator: more unchecked claims, the opposite of credibility."],
  };
}
