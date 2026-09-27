import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { CHURN_TRUTH, CUSTOMERS, CUST_BY_ID, KNOWN_LABEL, PICK_WHY, VALUABLE_TRUTH } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, MEANING_TRUTH, MEASURE_TRUTH, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, TRUTH_COUNTS, TRUTH_LEFT, UNCERTAINTIES, riskOf } from "@/data/patterns";
import { BUDGET, JOINS_LABEL, MEASURES, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import {
  ACTION_LABEL,
  ARCH_BY_ID,
  COMPS,
  COMP_BY_ID,
  CRIT_IDS,
  DECISIONS,
  KPIS,
  LOGIC_OWNER_LABEL,
  MODEL_ARCH,
  MODEL_COMPS,
  MODEL_DECISION,
  MODEL_GREATEST,
  MODEL_TRIPWIRE,
  OWNERS,
  OWNER_ACCEPT,
  OWNER_ACCEPT_LOGIC,
  PRINCIPLES,
  PRINCIPLE_IDS,
  PRINCIPLE_MUST,
  R2_BUDGET,
  SITUATIONS,
  SOURCES,
  USE_LABEL,
  actionOf,
  maxRating,
  useOf,
} from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { MODEL_ORDER } from "@/data/mentorKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner. Mentor tools stay in English (CLAUDE.md #32); the option labels they quote follow the
 * site's language.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

const B = ["—", "Low", "Mid", "High"];

/* ------------------------------------------------------------------ Route 1 */

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Feature, benefit or story",
    expected: LINES.map((r, i) => `${i + 1} → ${LEVEL_LABEL[r.truth]}`).join(" · "),
    options: LINES.flatMap((r, i) => [
      { label: `Idea ${i + 1} → ${LEVEL_LABEL[r.truth]}`, expected: true, why: r.why },
      ...(Object.entries(r.rejected) as [keyof typeof LEVEL_LABEL, string][]).map(([tag, why]) => ({ label: `Idea ${i + 1} → ${LEVEL_LABEL[tag]}`, expected: false, why })),
    ]),
    teachingNote:
      "Three of each; A is all features, B is benefits and stories. The traps are sentences 4 to 6, which carry the same facts as 1 to 3 but with the customer as subject (benefit), and sentence 7, which contains a benefit but through another customer's case (story). Ask “who is the subject?”, then “is there a real customer the listener can picture?”.",
  };
}

export function pickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.3a/b · Security-oriented and relationship-oriented customers",
    expected: `Security-oriented: ${VALUABLE_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")} · Relationship-oriented: ${CHURN_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")}`,
    options: CUSTOMERS.map((c) => ({
      label: `${c.name} · €${c.volume} · ${c.leave}% detail and risk questions · compares offers: ${c.decision ? "yes" : "no"} · talks about: ${KNOWN_LABEL[c.known]}`,
      expected: VALUABLE_TRUTH.includes(c.id) || CHURN_TRUTH.includes(c.id),
      why: `${VALUABLE_TRUTH.includes(c.id) ? "Security-oriented. " : CHURN_TRUTH.includes(c.id) ? "Relationship-oriented. " : "Neither list. "}${PICK_WHY[c.id]}`,
    })),
    teachingNote: "The traps are the software start-up (55% detailed questions, but about new technology and without comparing offers: innovation-driven) and the logistics group (compares offers, but 45% detail questions, mostly about price: price-oriented). The check reports only how many of the four picks hold. Ask the plan's scenario question: many detail questions, risk-averse, compares offers.",
  };
}

export function tagKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Kind of metric",
    expected: RECORDS.map((o) => `${o.code} → ${PATTERNS[o.truth].label}`).join(" · "),
    options: RECORDS.flatMap((o) => [
      { label: `${o.code} → ${PATTERNS[o.truth].label}`, expected: true, why: o.why },
      ...(Object.entries(o.rejected) as [keyof typeof PATTERNS, string][]).map(([s, why]) => ({ label: `${o.code} → ${PATTERNS[s].label}`, expected: false, why })),
    ]),
    teachingNote: `${PATTERN_IDS.map((p) => `${TRUTH_COUNTS[p]} ${PATTERNS[p].label} (${TRUTH_LEFT[p]} moved with value)`).join(", ")}. M-06 (customers who can repeat the benefit) is the trap: it did not move with value last year, but it is still a driver; tag what a metric measures, not how it behaved. M-04 (offers with a story) is a driver even though it counts what salespeople do: it changes what the customer hears before the deal. M-10 (slides) is vanity: more information is not more understanding.`,
  };
}

export function rowKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Link, meaning and use per kind",
    expected: PATTERN_IDS.map((p) => `${PATTERNS[p].label}: ${RISK_LABEL[riskOf(TRUTH_LEFT[p], TRUTH_COUNTS[p])!]} · ${MEANINGS.find((m) => m.id === MEANING_TRUTH[p])!.label} · ${PMEASURES.find((m) => m.id === MEASURE_TRUTH[p])!.label}`).join(" | "),
    options: PATTERN_IDS.flatMap((p) =>
      PMEASURES.map((m) => ({
        label: `${PATTERNS[p].label} → ${m.label}`,
        expected: m.id === MEASURE_TRUTH[p],
        why:
          m.id === MEASURE_TRUTH[p]
            ? `${PATTERNS[p].means} This use fits exactly that.`
            : m.id === "bonus"
              ? "A bonus on a number rewards reporting it, not moving it, and invites gaming; it fits no kind."
              : "This use fits a different kind; read what this kind tells management.",
      })),
    ),
    teachingNote: "The link is checked against the learner's own tally from 2.1, not against the reference, so a learner who mis-tagged one metric is not punished twice. With the reference tags, outcome and driver are Strong (3 and 2 of 3 moved), guardrail Partial (1 of 3), vanity None.",
  };
}

export function uncKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Uncertainties in the story figures",
    expected: UNCERTAINTIES.filter((w) => w.real).map((w) => w.label).join(" · "),
    options: UNCERTAINTIES.map((w) => ({ label: w.label, expected: w.real, why: w.why })),
    teachingNote: "Any two of the four real uncertainties complete the block. The most important is “salespeople may have told stories mainly to the warmer prospects”: the story figures are not a fair test, which is why Block 2.3 asks for one. The three false ones are common beliefs about emotional selling; each is contradicted in the material.",
  };
}

export function abKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · A fair A/B test",
    expected: AB_PARTS.map((k) => `${AB[k].label}: ${AB[k].options.find((o) => o.right)!.label}`).join(" | "),
    options: AB_PARTS.flatMap((k) =>
      AB[k].options.map((o) => ({
        label: `${AB[k].label} → ${o.label}`,
        expected: o.right,
        why: o.right
          ? k === "change"
            ? "One change only, so a difference can be put down to it."
            : k === "control"
              ? "Chance decides who is in which group, and both groups live through the same weeks."
              : k === "kpi"
                ? "The problem is a low close rate; the test is judged by deals per offer, not by how interesting the meeting felt."
                : "The size is fixed before the start, so nobody stops at a lucky moment; a full sales cycle includes customers who need longer to decide."
          : o.clue,
      })),
    ),
    teachingNote: "The check flags a wrong option per part (three options each, so naming the part does not hand over the answer), a hypothesis without “if … because …” and a rule without a number. The hypothesis and the rule are judged: look for one change, one KPI, a reason, and a rule written before the test that includes a guardrail.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const rows = [...MEASURES].sort((a, b) => modelScore(b.id) - modelScore(a.id));
  return {
    title: "Block 2.4 · The three measures",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)!.name).join(", ")} · ${euro(MODEL_COST)} of ${euro(BUDGET)}`,
    options: rows.map((m) => ({
      label: `${m.name} · ${m.model.effect} × ${explainBucket(m.evidence)} × ${m.model.feasibility} = ${modelScore(m.id)} · ${euro(m.cost)} · ${m.weeks} weeks · the customer hears ${JOINS_LABEL[m.joins]} · answers ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none"}`,
      expected: MODEL_MEASURES.includes(m.id),
      why: `${m.verdict} ${m.model.note}`,
    })),
    teachingNote: `Score = Effect × Comprehensibility × Persuasiveness. The checks look only at the problems named (a subset of the real ones, or “none” for the AI pitch tool, the brochure, the video and the fair stand) and at comprehensibility, which follows from what the customer hears. Effect and persuasiveness are judged; the model values are here. The model three cost ${euro(MODEL_COST)}. The reference calls score 12: very credible, but for few prospects. The discount scores 4: it answers the close rate with price and makes offers even more interchangeable.`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The order",
    expected: MODEL_ORDER.map((id) => MEASURES.find((m) => m.id === id)!.name).join(" → "),
    options: MODEL_ORDER.map((id, i) => ({
      label: `${i + 1}. ${MEASURES.find((m) => m.id === id)!.name} (${modelScore(id)})`,
      expected: true,
      why: i === 0 ? "Highest score (27): it is what the customer hears in every offer, and the guides and the training use it." : i === 1 ? "Makes the same stories fit four customer types; ready in four weeks." : "Puts stories and guides into every conversation; ready after six weeks.",
    })),
    teachingNote: "The guides and the training both score 18, so either order between them defends; the model puts the guides second because they are ready in four weeks and the training uses them.",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Principles of the emotional sales strategy",
    expected: `${PRINCIPLES[PRINCIPLE_MUST[0]].name} and ${PRINCIPLES[PRINCIPLE_MUST[1]].name}, plus a third that is not “push everyone with urgency” or “promise what the customer wants to hear”`,
    options: PRINCIPLE_IDS.map((c) => ({
      label: PRINCIPLES[c].name,
      expected: PRINCIPLE_MUST.includes(c) || c === "owners" || c === "review",
      why:
        c === "defs"
          ? "Required: the benefit in the customer's words is the answer to “customers don't understand the benefit”."
          : c === "rules"
            ? "Required: a version per customer type is what makes SalesTech different from competitors who pitch the same to everyone."
            : c === "owners"
              ? "A good third: a KPI without someone who can move it stays a number on a screen."
              : c === "review"
                ? "A good third: a monthly review by the same KPIs is how the strategy learns what works per type."
                : c === "hoard"
                  ? "Rejected: urgency for everyone is pressure, not emotion; security-oriented customers turn away from it (Materi A3, A6)."
                  : "Rejected: a promise the product cannot keep destroys credibility the moment the customer checks it; this is manipulation, not storytelling (Materi A6).",
    })),
    teachingNote: "The check only asks for the benefit in the customer's words and the version per type. The third is judged; owners and the monthly review both defend.",
  };
}

export function sourceKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Central storytelling approaches",
    expected: SOURCES.map((s) => `${s.name}: ${USE_LABEL[useOf(s)]}`).join(" · "),
    options: SOURCES.map((s) => ({
      label: `${s.name} → ${USE_LABEL[useOf(s)]}`,
      expected: true,
      why: !s.decision ? `It supports no customer decision, so not central, however well backed (${s.complete}%).` : s.complete >= 80 ? `It supports a customer decision (“${s.decision}”) and ${s.complete}% of its claims are backed by a real case: use now.` : `It supports a customer decision (“${s.decision}”), but only ${s.complete}% of its claims are backed: collect proof first.`,
    })),
    teachingNote: "The founder's story is the trap: fully true, but it helps no customer decide. The ROI story is the other: it answers the price question, but only 40% of its claims are backed, so it needs proof before it is told.",
  };
}

export function compKey(): AnswerKeyBlock {
  return {
    title: "Block 3.3 · KPIs and ratings",
    expected: `${MODEL_COMPS.map((id) => COMP_BY_ID[id].name).join(", ")}; greatest leverage: ${COMP_BY_ID[MODEL_GREATEST].name}`,
    options: COMPS.map((l) => ({
      label: `${l.name}: ${CRIT_IDS.map((c) => `${c} ${B[l.model[c]]} (max ${B[maxRating(l.id, c)]})`).join(", ")}`,
      expected: MODEL_COMPS.includes(l.id),
      why: l.note,
    })),
    teachingNote: "The check flags only a rating above what the printed facts allow and counts how many chosen KPIs show a change early. The share of offers with a matched story is the model's greatest lever: High on all four and the problem the brief names. A learner who picks the close rate defends it as the result; ask which number the team can move this month.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · Approaches tested: roll out, keep testing or stop",
    expected: SITUATIONS.map((s) => `${s.signal}: ${ACTION_LABEL[actionOf(s)]} · ${OWNER_ACCEPT_LOGIC[s.id].map((o) => LOGIC_OWNER_LABEL[o]).join(" or ")}`).join(" | "),
    options: SITUATIONS.map((s) => ({
      label: `${s.signal} (uplift ${s.lift}%, ${s.cases} decisions)`,
      expected: true,
      why:
        actionOf(s) === "intervene"
          ? `Uplift ${s.lift}% on ${s.cases} decisions: clear and proven, guardrail intact. ${s.id === "winback" ? "The offer documents are marketing material, so marketing rolls it out." : "The opening is used by salespeople in meetings, so sales rolls it out."}`
          : actionOf(s) === "watch"
            ? s.lift >= 10
              ? `Uplift ${s.lift}% looks strong, but ${s.cases} decisions are too few: keep testing; sales operations runs it on.`
              : `Uplift ${s.lift}%: a small difference. Keep testing a stronger variant; sales operations runs it.`
            : `Uplift ${s.lift}%: no real gain${s.lift < 0 ? ", and complaints" : ""}. Stop, so no owner.`,
    })),
    teachingNote: "The ROI story is the trap: +26% tempts learners to roll out, but forty-five decisions can be chance. The countdown is the second: five hundred decisions prove there is almost no difference. The urgency script is stopped: worse, and complaints about pressure.",
  };
}

export function ownerKey(funded: ArchId[]): AnswerKeyBlock {
  const ids = funded.length ? funded : MODEL_ARCH;
  return {
    title: "Block 3.5 · Owners, sequence and funding",
    expected: `Model: ${MODEL_ARCH.map((id) => `${ARCH_BY_ID[id].name} (${OWNERS[OWNER_ACCEPT[id][0]].name})`).join(", ")} · ${euro(MODEL_ARCH.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0))}`,
    options: ids.map((id) => ({
      label: `${ARCH_BY_ID[id].name} → ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}`,
      expected: true,
      why:
        id === "foundation"
          ? "Head of Marketing (or the CSO). It starts first: the guides, the training and the proof pack are built from its stories."
          : id === "suite"
            ? "A black box: nobody at SalesTech can check the claims it writes. Funding it breaks the third rule; the check flags it."
            : id === "relaunch"
              ? "It makes SalesTech known, not understood, and €60,000 would push the plan over."
              : `The owner who can change it without asking anyone: ${OWNERS[OWNER_ACCEPT[id][0]].profile}`,
    })),
    teachingNote: `The check tests three rules: the story library starts no later than the first other item, total within ${euro(R2_BUDGET)}, nothing funded is a black box. Owners are not checked by the app; use this key. Leaving out the reference programme instead of the proof pack defends if the learner argues that the proof pack already carries references.`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.6 · The communication decision",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id !== "wait", why: d.id === MODEL_DECISION ? d.why : d.id === "commit" ? `${d.why} ${d.rejected}` : d.rejected })),
    teachingNote: "“Switch everything” and “Pilot with two types” are both decisions, with different reasoning; the check outlines only “Wait”, because the brief asks for a decision despite unclear customer reactions. Push a learner who switches everything on what happens if one type reacts badly.",
  };
}

export function tripKey(): AnswerKeyBlock {
  const k = KPIS.find((x) => x.id === MODEL_TRIPWIRE.kpi)!;
  return {
    title: "Block 3.6 · The tripwire",
    expected: `${k.label} ≥ ${MODEL_TRIPWIRE.threshold}% by month ${MODEL_TRIPWIRE.month}, else adjust one rule`,
    options: KPIS.map((x) => ({ label: `${x.label} (baseline ${x.baseline}${x.unit === "%" ? "%" : ` ${x.unit}`})`, expected: x.behaviour, why: x.behaviour ? "How customers behave: the result the system is meant to move." : "Counts SalesTech's own output, not how customers responded." })),
    teachingNote: "Any customer metric with a threshold better than its baseline defends. Offers with a matched story is the tempting one: it counts what salespeople do, a good trigger for the guides in 3.5, and the wrong tripwire for whether customers buy. Slides and calls count our own output.",
  };
}
