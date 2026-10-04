import { ARCH_BY_ID, ARCH_IDS, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { CLEAN_ID, ENGINE_IDS, KPI_SYSTEM_ID, PANEL, READY_BAR, WEAK_POINTS } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";

/**
 * The logic of the Route 2 control panel (CLAUDE.md #47): one place that turns the learner's choices (when each item happens) into what the
 * diagram, the three bars, the tests, the reading of the plan, the export and the mentor's worked answer all say. Nothing here is a verdict:
 * every line is a fact about the plan and, where something is open, the rule and two ways to act. The learner calculates nothing (#44).
 *
 * Time is derived, not asked for: *Now* items start in month 1; *After the proof is ready* items start in the month the reference programme is in use (so
 * the programme must itself be Now: a customer who confirms the story on a call is what backs the claim); an item is in use in month =
 * start + weeks ÷ 4, rounded up (the rule Materi B5 teaches). With four months the time test catches the AI pitch generator (14 weeks) and the
 * image campaign (16 weeks): both are in use only in month 5.
 */
export type Scn = 0 | 1;
type HasTier = { tier: Record<string, Tier> };

const NEVER = R2_MONTHS + 1;

export const tierOf = (r2: HasTier, id: ArchId): Tier => r2.tier[id] ?? "not";
export const isFunded = (r2: HasTier, id: ArchId) => tierOf(r2, id) !== "not";
export const fundedIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => isFunded(r2, id));
export const nowIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => tierOf(r2, id) === "now");
export const monthsOf = (id: ArchId) => Math.ceil(ARCH_BY_ID[id].weeks / 4);
const readyOf = (id: ArchId, scn: Scn) => (PANEL[id].data === null ? null : PANEL[id].data! - scn * WEAK_POINTS);

/** The month an item starts: 1 for Now, the month the reference programme is in use for After the proof (the programme must be Now), null when not funded. */
export function startOf(r2: HasTier, id: ArchId): number | null {
  const tier = tierOf(r2, id);
  if (tier === "not") return null;
  if (tier === "now") return 1;
  return tierOf(r2, CLEAN_ID) === "now" ? 1 + monthsOf(CLEAN_ID) : NEVER;
}
export function inUseOf(r2: HasTier, id: ArchId): number | null {
  const s = startOf(r2, id);
  return s === null ? null : s + monthsOf(id);
}

/** The stories come first: the story library and KPIs start no later than the item. */
export function measOk(r2: HasTier, id: ArchId): boolean {
  if (id === KPI_SYSTEM_ID) return true;
  const s = startOf(r2, id);
  if (s === null) return false;
  const f = startOf(r2, KPI_SYSTEM_ID);
  return f !== null && f <= s;
}

/** The claims an item tells are at least READY_BAR percent backed when it starts (the reference programme backs the claims of the items it prepares). */
export function dataOk(r2: HasTier, id: ArchId, scn: Scn): boolean {
  const v = readyOf(id, scn);
  if (v === null || v >= READY_BAR) return true;
  if (PANEL[id].cleaned && tierOf(r2, CLEAN_ID) === "now") {
    const s = startOf(r2, id);
    const q = inUseOf(r2, CLEAN_ID);
    if (s !== null && q !== null && q <= s) return true;
  }
  return false;
}

export type ItemView = { id: ArchId; tier: Tier; start: number | null; inUse: number | null; measOk: boolean; dataOk: boolean; late: boolean; never: boolean; notes: string[] };
export type Bars = { spent: number; over: number; left: number; meas: number | null; risk: number | null };
export type TestId = "measure" | "purpose" | "data" | "budget";
export type OpenDetail = { fact: string; rule: string; ways: string[] };
export type TestView = { id: TestId; name: string; rule: string; applies: boolean; holds: boolean; open: OpenDetail[] };
export type PlanView = { items: Record<ArchId, ItemView>; funded: ArchId[]; nowCount: number; bars: Bars; tests: TestView[]; holding: number; applicable: number };

const nm = (id: ArchId) => PANEL[id].short;

function itemView(r2: HasTier, id: ArchId, scn: Scn): ItemView {
  const tier = tierOf(r2, id);
  const start = startOf(r2, id);
  const inUse = inUseOf(r2, id);
  const funded = tier !== "not";
  const never = funded && start === NEVER;
  const m = measOk(r2, id);
  const d = dataOk(r2, id, scn);
  const late = funded && !never && inUse !== null && inUse > R2_MONTHS;
  const notes: string[] = [];
  if (funded) {
    if (never) notes.push(tt("never starts: the reference programme it waits for is not planned", "startet nie: Das Referenzkundenprogramm, auf das es wartet, ist nicht eingeplant"));
    if (!m && !never) notes.push(tt("starts before the story library and KPIs are in place", "startet, bevor Story-Bibliothek und KPIs stehen"));
    if (!d && !never) notes.push(tt(`the claims it tells are ${readyOf(id, scn)}% backed, below ${READY_BAR}%, when it starts`, `die Aussagen, die es erzählt, sind zu ${readyOf(id, scn)} % belegt, unter ${READY_BAR} %, wenn es startet`));
    if (PANEL[id].blackBox) notes.push(tt("black box: nobody can check its sources", "Black Box: Niemand kann seine Quellen prüfen"));
    if (late) notes.push(tt(`in use only in month ${inUse}, after the ${R2_MONTHS} months`, `erst in Monat ${inUse} im Einsatz, nach den ${R2_MONTHS} Monaten`));
  }
  return { id, tier, start, inUse, measOk: m, dataOk: d, late, never, notes };
}

/**
 * Measurable: the share of the funded money on items that are measured, whose claims are backed, that are in use inside the plan and are not a black box.
 * Risk: the share on a black box, on claims below the bar or on an item that is in use only after the plan's months.
 */
function barsOf(r2: HasTier, scn: Scn): Bars {
  const f = fundedIds(r2);
  const spent = f.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  let meas = 0;
  let risk = 0;
  for (const id of f) {
    const c = ARCH_BY_ID[id].cost;
    const v = itemView(r2, id, scn);
    if (PANEL[id].measured && v.measOk && v.dataOk && !v.late && !v.never && !PANEL[id].blackBox) meas += c;
    if (PANEL[id].blackBox || !v.dataOk || v.late) risk += c;
  }
  return { spent, over: Math.max(0, spent - R2_BUDGET), left: R2_BUDGET - spent, meas: spent ? Math.round((meas / spent) * 100) : null, risk: spent ? Math.round((risk / spent) * 100) : null };
}

/** The Measurable and Risk bars are ranges across the two backing scenarios: [as the brief says, weaker backing]. */
export function rangeOf(r2: HasTier): { meas: [number | null, number | null]; risk: [number | null, number | null] } {
  const a = barsOf(r2, 0);
  const w = barsOf(r2, 1);
  return { meas: [a.meas, w.meas], risk: [a.risk, w.risk] };
}

/* ------------------------------------------------------------------ the four tests */

const TEST_NAME: Record<TestId, () => string> = {
  measure: () => tt("The stories come first", "Die Storys kommen zuerst"),
  purpose: () => tt("Every funded item has a purpose", "Jeder finanzierte Punkt hat einen Zweck"),
  data: () => tt("Claims are backed when a story tool starts", "Die Aussagen sind belegt, wenn ein Story-Tool startet"),
  budget: () => tt(`It fits the budget and the ${R2_MONTHS} months`, `Es passt ins Budget und in die ${R2_MONTHS} Monate`),
};
const TEST_RULE: Record<TestId, () => string> = {
  measure: () => tt("The approved story library and KPIs start no later than the first story tool, so every guide and role play draws on stories the customers approved and is measured by the same KPIs from its first week.", "Freigegebene Story-Bibliothek und KPIs starten nicht später als das erste Story-Tool, damit jeder Leitfaden und jedes Rollenspiel auf Storys zurückgreift, die die Kunden freigegeben haben, und ab der ersten Woche nach denselben KPIs gemessen wird."),
  purpose: () => tt("A funded item moves a named KPI or makes one measurable. A tool that writes stories by itself without showing its sources, and an image campaign that names no KPI, do neither: nobody can check what they change for customers.", "Ein finanzierter Punkt bewegt einen benannten KPI oder macht einen messbar. Ein Werkzeug, das Storys selbst schreibt, ohne seine Quellen zu zeigen, und eine Imagekampagne, die keinen KPI nennt, tun keines von beidem: Niemand kann prüfen, was sie für Kunden ändern."),
  data: () => tt(`A story tool starts on claims of which at least ${READY_BAR}% are backed by a real, approved customer case. Claims that are not backed teach salespeople to overclaim.`, `Ein Story-Tool startet auf Aussagen, von denen mindestens ${READY_BAR} % durch einen echten, freigegebenen Kundenfall belegt sind. Aussagen, die nicht belegt sind, bringen Vertriebsmitarbeitenden bei, zu übertreiben.`),
  budget: () => tt(`The funded items stay inside ${euro(R2_BUDGET)} and are all in use by month ${R2_MONTHS}.`, `Die finanzierten Punkte bleiben innerhalb von ${euro(R2_BUDGET)} und sind alle bis Monat ${R2_MONTHS} im Einsatz.`),
};
export const TEST_IDS: TestId[] = ["measure", "purpose", "data", "budget"];

function testsOf(r2: HasTier, scn: Scn, items: Record<ArchId, ItemView>, bars: Bars): TestView[] {
  const f = fundedIds(r2);
  const engines = ENGINE_IDS.filter((id) => isFunded(r2, id));
  const view = (id: TestId, applies: boolean, open: OpenDetail[]): TestView => ({ id, name: TEST_NAME[id](), rule: TEST_RULE[id](), applies, holds: applies && open.length === 0, open });

  // 1 · the stories come first
  const mOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never || v.measOk) continue;
    const f0 = startOf(r2, KPI_SYSTEM_ID);
    const part = f0 === null ? tt("the story library and KPIs are not funded", "Story-Bibliothek und KPIs sind nicht finanziert") : tt(`the story library and KPIs start in month ${f0}`, `Story-Bibliothek und KPIs starten in Monat ${f0}`);
    mOpen.push({
      fact: tt(`${nm(id)}: starts in month ${v.start}, but ${part}.`, `${nm(id)}: startet in Monat ${v.start}, aber ${part}.`),
      rule: TEST_RULE.measure(),
      ways: [
        tt("Set the story library and KPIs to Now: they start in month 1, before any story tool.", "Setzen Sie Story-Bibliothek und KPIs auf „Jetzt“: Sie starten in Monat 1, vor jedem Story-Tool."),
        tt(`Or set ${nm(id)} to Not now until they are in place.`, `Oder setzen Sie ${nm(id)} auf „Jetzt nicht“, bis sie stehen.`),
      ],
    });
  }

  // 2 · every funded item has a purpose
  const pOpen: OpenDetail[] = f
    .filter((id) => !PANEL[id].named && !PANEL[id].enabler)
    .map((id) => ({
      fact: PANEL[id].blackBox
        ? tt(`${nm(id)} names no KPI it moves, and its sources and claims are not shown.`, `${nm(id)} nennt keinen KPI, den es bewegt, und seine Quellen und Aussagen werden nicht gezeigt.`)
        : tt(`${nm(id)} names no KPI it moves: nothing says whether a celebrity's recommendation raises the close rate.`, `${nm(id)} nennt keinen KPI, den es bewegt: Nichts sagt, ob die Empfehlung eines Prominenten die Abschlussquote hebt.`),
      rule: TEST_RULE.purpose(),
      ways: [
        tt(`Set it to Not now and use the ${euro(ARCH_BY_ID[id].cost)} on an item that moves a named KPI.`, `Setzen Sie es auf „Jetzt nicht“ und nutzen Sie die ${euro(ARCH_BY_ID[id].cost)} für einen Punkt, der einen benannten KPI bewegt.`),
        tt("Or keep it, and say in your reasons how SalesTech will check its claims and measure its effect.", "Oder behalten Sie es, und sagen Sie in Ihren Begründungen, wie SalesTech seine Aussagen prüfen und seine Wirkung messen wird."),
      ],
    }));

  // 3 · claims backed when a story tool starts
  const dOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never) {
      dOpen.push({
        fact: tt(`${nm(id)}: waits for the proof, but the reference programme it waits for is not set to Now, so it never starts.`, `${nm(id)}: wartet auf den Beleg, aber das Referenzkundenprogramm, auf das es wartet, steht nicht auf „Jetzt“, also startet es nie.`),
        rule: TEST_RULE.data(),
        ways: [tt("Set the reference programme to Now.", "Setzen Sie das Referenzkundenprogramm auf „Jetzt“."), tt(`Or set ${nm(id)} to Not now.`, `Oder setzen Sie ${nm(id)} auf „Jetzt nicht“.`)],
      });
      continue;
    }
    if (v.dataOk) continue;
    const val = readyOf(id, scn);
    if (PANEL[id].cleaned) {
      dOpen.push({
        fact: tt(`${nm(id)}: starts in month ${v.start} on claims ${val}% backed, below ${READY_BAR}%. The reference programme is ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `in use only in month ${inUseOf(r2, CLEAN_ID)}` : "not set to Now"}.`, `${nm(id)}: startet in Monat ${v.start} auf Aussagen, die zu ${val} % belegt sind, unter ${READY_BAR} %. Das Referenzkundenprogramm ist ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `erst in Monat ${inUseOf(r2, CLEAN_ID)} im Einsatz` : "nicht auf „Jetzt“ gesetzt"}.`),
        rule: TEST_RULE.data(),
        ways: [
          tt(`Set the reference programme to Now and ${nm(id)} to After the proof is ready: it then starts in month ${1 + monthsOf(CLEAN_ID)}, when the programme is in use.`, `Setzen Sie das Referenzkundenprogramm auf „Jetzt“ und ${nm(id)} auf „Wenn der Beleg bereit ist“: Es startet dann in Monat ${1 + monthsOf(CLEAN_ID)}, wenn das Programm im Einsatz ist.`),
          tt(`Or set ${nm(id)} to Not now.`, `Oder setzen Sie ${nm(id)} auf „Jetzt nicht“.`),
        ],
      });
    } else {
      dOpen.push({
        fact: tt(`${nm(id)}: starts on claims ${val}% backed, below ${READY_BAR}%. The reference programme does not back these claims.`, `${nm(id)}: startet auf Aussagen, die zu ${val} % belegt sind, unter ${READY_BAR} %. Das Referenzkundenprogramm belegt diese Aussagen nicht.`),
        rule: TEST_RULE.data(),
        ways: [
          tt(`Set ${nm(id)} to Not now until more claims are backed.`, `Setzen Sie ${nm(id)} auf „Jetzt nicht“, bis mehr Aussagen belegt sind.`),
          tt(`Or keep it, and say in your reasons what you will do if the claims stay below ${READY_BAR}% backed.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was Sie tun, wenn die Aussagen unter ${READY_BAR} % belegt bleiben.`),
        ],
      });
    }
  }

  // 4 · budget and the four months
  const bOpen: OpenDetail[] = [];
  if (bars.over > 0)
    bOpen.push({
      fact: tt(`The funded items cost ${euro(bars.spent)}, which is ${euro(bars.over)} over the ${euro(R2_BUDGET)} budget.`, `Die finanzierten Punkte kosten ${euro(bars.spent)}, das sind ${euro(bars.over)} über dem Budget von ${euro(R2_BUDGET)}.`),
      rule: TEST_RULE.budget(),
      ways: [
        tt("Set the item with the weakest case to Not now (every card prints its cost).", "Setzen Sie den Punkt mit der schwächsten Begründung auf „Jetzt nicht“ (jede Karte druckt ihre Kosten)."),
        tt("Or keep the total, and say in your reasons why it is worth going over.", "Oder behalten Sie die Summe, und sagen Sie in Ihren Begründungen, warum es sich lohnt, darüber zu liegen."),
      ],
    });
  for (const id of f) {
    const v = items[id];
    if (!v.late) continue;
    bOpen.push({
      fact: tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months (${monthsOf(id)} months to build, starting in month ${v.start}).`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten (${monthsOf(id)} Monate Aufbau, Start in Monat ${v.start}).`),
      rule: TEST_RULE.budget(),
      ways: [
        v.tier === "later" ? tt(`Set ${nm(id)} to Now: it then starts in month 1.`, `Setzen Sie ${nm(id)} auf „Jetzt“: Es startet dann in Monat 1.`) : tt(`Set ${nm(id)} to Not now.`, `Setzen Sie ${nm(id)} auf „Jetzt nicht“.`),
        tt(`Or keep it, and say in your reasons what the plan does without it before month ${R2_MONTHS + 1}.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was der Plan ohne es vor Monat ${R2_MONTHS + 1} tut.`),
      ],
    });
  }

  const any = f.length > 0;
  return [view("measure", engines.length > 0, mOpen), view("purpose", any, pOpen), view("data", engines.length > 0, dOpen), view("budget", any, bOpen)];
}

/** Everything the panel shows for one backing scenario. */
export function planOf(r2: HasTier, scn: Scn): PlanView {
  const items = Object.fromEntries(ARCH_IDS.map((id) => [id, itemView(r2, id, scn)])) as Record<ArchId, ItemView>;
  const bars = barsOf(r2, scn);
  const tests = testsOf(r2, scn, items, bars);
  const applicable = tests.filter((x) => x.applies).length;
  return { items, funded: fundedIds(r2), nowCount: nowIds(r2).length, bars, tests, holding: tests.filter((x) => x.holds).length, applicable };
}

/* ------------------------------------------------------------------ the reading of the plan */

export type Reading = { gives: string[]; costs: string[] };

/** What the plan gives, and what it costs or leaves open: two lists of facts, never a grade (CLAUDE.md #47). */
export function readingOf(r2: HasTier, scn: Scn): Reading {
  const plan = planOf(r2, scn);
  const gives: string[] = [];
  const costs: string[] = [];
  for (const id of ARCH_IDS) {
    const v = plan.items[id];
    const p = PANEL[id];
    const cost = ARCH_BY_ID[id].cost;
    if (v.tier === "not") {
      if (p.blackBox) gives.push(tt(`${nm(id)} not bought: ${euro(cost)} is not spent on a tool whose sources nobody can check.`, `${nm(id)} nicht gekauft: ${euro(cost)} werden nicht für ein Werkzeug ausgegeben, dessen Quellen niemand prüfen kann.`));
      else if (id === "relaunch") gives.push(tt(`${nm(id)} not now: ${euro(cost)} and 16 weeks are not spent on a celebrity testimonial that names no KPI.`, `${nm(id)} jetzt nicht: ${euro(cost)} und 16 Wochen werden nicht für ein prominentes Testimonial ausgegeben, das keinen KPI nennt.`));
      else if (p.named) costs.push(tt(`${nm(id)} not now: does not move ${p.moves}.`, `${nm(id)} jetzt nicht: bewegt ${p.moves} nicht.`));
      else if (id === KPI_SYSTEM_ID) costs.push(tt("Story library and KPIs not funded: salespeople keep telling stories nobody approved, and each person counts results their own way.", "Story-Bibliothek und KPIs nicht finanziert: Vertriebsmitarbeitende erzählen weiter Storys, die niemand freigegeben hat, und jede Person zählt Ergebnisse auf ihre Weise."));
      else if (id === "training") costs.push(tt("CRM story field and review not now: nobody can see which story each offer used, and no meeting decides by the KPIs.", "Story-Feld im CRM und Review jetzt nicht: Niemand sieht, welche Story jedes Angebot nutzte, und kein Treffen entscheidet nach den KPIs."));
      else if (id === "tracking") costs.push(tt("Proof pack not now: a security-oriented customer has nothing to check before committing.", "Beleg-Paket jetzt nicht: Ein sicherheitsorientierter Kunde hat nichts zum Prüfen, bevor er sich festlegt."));
      continue;
    }
    if (v.never) {
      costs.push(tt(`${nm(id)}: waits for a reference programme that is not planned, so it never starts.`, `${nm(id)}: wartet auf ein Referenzkundenprogramm, das nicht eingeplant ist, und startet daher nie.`));
      continue;
    }
    if (p.blackBox) {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on stories whose sources nobody can see or check.`, `${nm(id)}: ${euro(cost)} für Storys, deren Quellen niemand sehen oder prüfen kann.`));
    } else if (id === "relaunch") {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on a testimonial that names no KPI and has no customer's own story behind it, so nobody can show whether it helped.`, `${nm(id)}: ${euro(cost)} für ein Testimonial, das keinen KPI nennt und keine eigene Story eines Kunden hinter sich hat, sodass niemand zeigen kann, ob es geholfen hat.`));
    } else if (id === KPI_SYSTEM_ID) {
      gives.push(tt("Story library and KPIs: every conversation draws on stories the customers approved, and every KPI is defined once.", "Story-Bibliothek und KPIs: Jedes Gespräch greift auf Storys zurück, die die Kunden freigegeben haben, und jeder KPI ist einmal definiert."));
    } else if (id === "training") {
      gives.push(tt("CRM story field and review: every offer records which story it used, and a monthly meeting decides by the KPIs.", "Story-Feld im CRM und Review: Jedes Angebot hält fest, welche Story es nutzte, und ein monatliches Treffen entscheidet nach den KPIs."));
    } else if (id === "tracking") {
      gives.push(tt("Proof pack: a cautious customer can check case figures, certificates and a small pilot before committing.", "Beleg-Paket: Ein vorsichtiger Kunde kann Fallzahlen, Zertifikate und ein kleines Pilotangebot prüfen, bevor er sich festlegt."));
    } else if (id === CLEAN_ID) {
      gives.push(cleanGives(r2));
    } else {
      const ready = readyOf(id, scn);
      if (v.measOk && v.dataOk)
        gives.push(tt(`${nm(id)}: moves ${p.moves}, is measured, and the claims it tells are backed${ready !== null ? ` (${ready}%)` : ""}${v.tier === "later" ? `; it starts in month ${v.start}, when the reference programme is in use` : ""}.`, `${nm(id)}: bewegt ${p.moves}, wird gemessen, und die Aussagen, die es erzählt, sind belegt${ready !== null ? ` (${ready} %)` : ""}${v.tier === "later" ? `; startet in Monat ${v.start}, wenn das Referenzkundenprogramm im Einsatz ist` : ""}.`));
      if (!v.measOk) costs.push(tt(`${nm(id)}: nothing measures it when it starts, so its effect on ${p.moves} cannot be shown.`, `${nm(id)}: Nichts misst es, wenn es startet, seine Wirkung auf ${p.moves} lässt sich also nicht zeigen.`));
      if (!v.dataOk) costs.push(tt(`${nm(id)}: the claims it tells are ${ready}% backed, below ${READY_BAR}%, when it starts.`, `${nm(id)}: Die Aussagen, die es erzählt, sind zu ${ready} % belegt, unter ${READY_BAR} %, wenn es startet.`));
    }
    if (v.late) costs.push(tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months.`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten.`));
  }
  const b = plan.bars;
  if (plan.funded.length === 0) costs.unshift(tt("Nothing is built: the three problems in the brief stay as they are.", "Nichts wird gebaut: Die drei Probleme des Auftrags bleiben, wie sie sind."));
  else if (b.over > 0) costs.push(tt(`${euro(b.over)} over the budget. Keep it only with a reason.`, `${euro(b.over)} über dem Budget. Behalten Sie es nur mit einer Begründung.`));
  else if (b.left > 0) costs.push(tt(`${euro(b.left)} of the budget stays unspent. Say what it is for, or why you hold it back.`, `${euro(b.left)} des Budgets bleiben ungenutzt. Sagen Sie, wofür es gedacht ist oder warum Sie es zurückhalten.`));
  if (plan.funded.length > 0) {
    const top = plan.funded.filter((id) => !PANEL[id].blackBox).reduce((a, id) => (ARCH_BY_ID[id].cost > ARCH_BY_ID[a].cost ? id : a), plan.funded[0]);
    if (b.spent > 0 && ARCH_BY_ID[top].cost / b.spent >= 0.35 && !PANEL[top].blackBox) costs.push(tt(`${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)}% of the money rides on one item: ${nm(top)}.`, `${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)} % des Geldes hängen an einem Punkt: ${nm(top)}.`));
  }
  if (gives.length === 0) gives.push(tt("Nothing yet. Set at least one item to Now.", "Noch nichts. Setzen Sie mindestens einen Punkt auf „Jetzt“."));
  return { gives, costs };
}

/** What the reference programme gives, depending on whether the storytelling training is part of the plan. */
function cleanGives(r2: HasTier): string {
  return isFunded(r2, "personal")
    ? tt("Reference programme: twelve customers confirm the stories on a call, so the claims the training teaches are backed before it starts.", "Referenzkundenprogramm: Zwölf Kunden bestätigen die Storys in einem Gespräch, sodass die Aussagen, die das Training lehrt, belegt sind, bevor es startet.")
    : tt("Reference programme: a prospect can hear a real customer confirm the story; a later training would not teach claims that are not backed.", "Referenzkundenprogramm: Ein Interessent kann einen echten Kunden die Story bestätigen hören; ein späteres Training würde keine unbelegten Aussagen lehren.");
}

/* ------------------------------------------------------------------ Step B: the decision against Step A */

/** One plain hint when the Step B decision and the Step A plan point in different directions; null when they agree. */
export function decisionHint(r2: HasTier & { decision: string | null }): string | null {
  const n = nowIds(r2).length;
  if (r2.decision === "wait" && n > 0) return tt("Step B says wait for a customer survey, while Step A builds " + n + (n === 1 ? " item" : " items") + " now. Say in your reason how the two fit together.", "Schritt B sagt, auf eine Kundenbefragung zu warten, während Schritt A jetzt " + n + (n === 1 ? " Punkt" : " Punkte") + " baut. Sagen Sie in Ihrer Begründung, wie beides zusammenpasst.");
  if (r2.decision === "commit" && ENGINE_IDS.some((id) => tierOf(r2, id) !== "now")) return tt("Step B says switch every conversation at once, while Step A does not start both the guides and the training now. Say in your reason which of the two you stand behind.", "Schritt B sagt, jedes Gespräch sofort umzustellen, während Schritt A Leitfäden und Training nicht beide jetzt startet. Sagen Sie in Ihrer Begründung, zu welchem von beiden Sie stehen.");
  if (r2.decision === "stage" && tierOf(r2, "suite") === "now") return tt("Step B says pilot in stages, while Step A starts the AI pitch generator now, for every offer at once. Say in your reason how that is staged.", "Schritt B sagt, in Stufen zu pilotieren, während Schritt A den KI-Pitch-Generator jetzt für jedes Angebot auf einmal startet. Sagen Sie in Ihrer Begründung, wie das gestuft ist.");
  return null;
}

/* ------------------------------------------------------------------ three internal categories (CLAUDE.md #47) */

/**
 * 1 · safe: the stories are approved and measured before the story tools and every applicable test holds (there can be several such plans).
 * 2 · fair: a base exists but a fundamental is missing or a better approach is available.
 * 3 · clearly wrong: story tools are bought without the base (guides, training or the AI pitch generator with no story library and KPIs), or nothing is built.
 * Used only to choose what the reading says and for the mentor's understanding; the learner never sees it and it is never exported.
 */
export type Category = 1 | 2 | 3;
const TOOL_IDS: ArchId[] = ["chat", "personal", "suite"];

export function categoryOf(r2: HasTier, scn: Scn = 0): { cat: Category; why: string } {
  const f = fundedIds(r2);
  if (f.length === 0) return { cat: 3, why: "Nothing is built: the task asks for an architecture." };
  const tools = f.filter((id) => TOOL_IDS.includes(id));
  const base = isFunded(r2, KPI_SYSTEM_ID);
  if (tools.length > 0 && !base) return { cat: 3, why: `${tools.map((id) => PANEL[id].short).join(", ")} funded with no story library and KPIs: tools are bought before the stories are approved.` };
  const plan = planOf(r2, scn);
  const open = plan.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  if (!base) return { cat: 2, why: "No story library and KPIs yet, so no story is approved and nothing can be measured; no tool is bought without it." };
  if (open.length === 0) return { cat: 1, why: "The story library and KPIs are funded and every applicable test holds." };
  return { cat: 2, why: `The story library and KPIs are funded, but these tests are open: ${open.join("; ")}.` };
}

export type Change = { id: ArchId; to: Tier; text: string };

const CUT_ORDER: ArchId[] = ["suite", "relaunch", "training", "tracking", "routing", "personal", "chat"];

/** The changes that put the plan on the safe side, as information: which item to which tier and why, and what the plan looks like after them. */
export function changesFor(r2: HasTier, scn: Scn): { changes: Change[]; after: PlanView } {
  const t: Record<string, Tier> = { ...r2.tier };
  const cur = (id: ArchId): Tier => t[id] ?? "not";
  const changes: Change[] = [];
  const set = (id: ArchId, to: Tier, text: string) => {
    if (cur(id) === to) return;
    t[id] = to;
    changes.push({ id, to, text });
  };
  const any = () => ARCH_IDS.some((id) => cur(id) !== "not");
  const baseText = tt("Set the story library and KPIs to Now: the stories come first, and they start in month 1, no later than any story tool.", "Setzen Sie Story-Bibliothek und KPIs auf „Jetzt“: Die Storys kommen zuerst, und sie starten in Monat 1, nicht später als jedes Story-Tool.");

  if (!any()) {
    set(KPI_SYSTEM_ID, "now", baseText);
    set("chat", "now", tt(`Add the conversation guides, set to Now: their claims are ${PANEL.chat.data}% backed, and they move the share of customers who can repeat the benefit, a named KPI.`, `Fügen Sie die Gesprächsleitfäden hinzu, auf „Jetzt“: Ihre Aussagen sind zu ${PANEL.chat.data} % belegt, und sie bewegen den Anteil der Kunden, die den Nutzen wiedergeben können, einen benannten KPI.`));
  }
  if (any() && cur(KPI_SYSTEM_ID) !== "now") set(KPI_SYSTEM_ID, "now", baseText);
  if (cur("suite") !== "not") set("suite", "not", tt("Set the AI pitch generator to Not now: it names no KPI it moves and nobody can check its sources, and at 14 weeks it is in use only in month 5.", "Setzen Sie den KI-Pitch-Generator auf „Jetzt nicht“: Er nennt keinen KPI, den er bewegt, niemand kann seine Quellen prüfen, und mit 14 Wochen ist er erst in Monat 5 im Einsatz."));
  if (cur("relaunch") !== "not") set("relaunch", "not", tt("Set the image campaign to Not now: it names no KPI it moves, and at 16 weeks it is in use only in month 5, after the 4 months.", "Setzen Sie die Imagekampagne auf „Jetzt nicht“: Sie nennt keinen KPI, den sie bewegt, und mit 16 Wochen ist sie erst in Monat 5 im Einsatz, nach den 4 Monaten."));
  const spent = () => ARCH_IDS.filter((id) => cur(id) !== "not").reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const cut = () => {
    for (const id of CUT_ORDER) {
      if (spent() <= R2_BUDGET) return;
      if (cur(id) === "not") continue;
      set(id, "not", tt(`Set ${PANEL[id].short} to Not now: the plan is ${euro(spent() - R2_BUDGET)} over the budget and this is the item with the weakest case.`, `Setzen Sie ${PANEL[id].short} auf „Jetzt nicht“: Der Plan liegt ${euro(spent() - R2_BUDGET)} über dem Budget, und dies ist der Punkt mit der schwächsten Begründung.`));
    }
  };
  cut();
  for (const id of ENGINE_IDS.filter((x) => PANEL[x].cleaned)) {
    if (cur(id) === "not") continue;
    if (cur(CLEAN_ID) !== "now") set(CLEAN_ID, "now", tt("Set the reference programme to Now: customers who confirm the stories on a call then back the claims the training teaches.", "Setzen Sie das Referenzkundenprogramm auf „Jetzt“: Kunden, die die Storys in einem Gespräch bestätigen, belegen dann die Aussagen, die das Training lehrt."));
    if (!dataOk({ tier: t }, id, scn)) set(id, "later", tt(`Set ${PANEL[id].short} to After the proof is ready: its claims are ${PANEL[id].data}% backed, so it starts in month ${1 + monthsOf(CLEAN_ID)}, when the reference programme is in use.`, `Setzen Sie ${PANEL[id].short} auf „Wenn der Beleg bereit ist“: Seine Aussagen sind zu ${PANEL[id].data} % belegt, also startet es in Monat ${1 + monthsOf(CLEAN_ID)}, wenn das Referenzkundenprogramm im Einsatz ist.`));
    cut();
  }
  return { changes, after: planOf({ tier: t }, scn) };
}

/* ------------------------------------------------------------------ how the system reads the plan (wording by category) */

/** One paragraph on how the plan stands, worded by category; it never names the category. */
export function standingOf(r2: HasTier, scn: Scn): string {
  const { cat } = categoryOf(r2, scn);
  const f = fundedIds(r2);
  const tools = f.filter((id) => TOOL_IDS.includes(id));
  const brief = planOf(r2, 0);
  const weak = planOf(r2, 1);
  if (cat === 3) {
    return f.length === 0
      ? tt("Nothing is built, so the three problems in the brief stay as they are. The task asks for an architecture. Below are the changes that put the base first.", "Nichts wird gebaut, also bleiben die drei Probleme des Auftrags, wie sie sind. Die Aufgabe verlangt eine Architektur. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.")
      : tt(`${tools.map((id) => PANEL[id].short).join(", ")} ${tools.length === 1 ? "is" : "are"} funded, but there is no story library and KPIs. Without them the tool tells stories nobody approved, nothing can say whether it works, and it teaches claims that are not backed. Below are the changes that put the base first.`, `${tools.map((id) => PANEL[id].short).join(", ")} ${tools.length === 1 ? "ist" : "sind"} finanziert, aber es gibt keine Story-Bibliothek und keine KPIs. Ohne sie erzählt das Werkzeug Storys, die niemand freigegeben hat, nichts kann sagen, ob es wirkt, und es lehrt Aussagen, die nicht belegt sind. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.`);
  }
  if (cat === 2) {
    const open = brief.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
    return open.length
      ? tt(`The base is there, but ${open.length} of ${brief.applicable} tests are open with the brief's figures: ${open.join("; ")}. Each is explained in the panel; below are the changes that make the plan hold.`, `Die Basis ist da, aber ${open.length} von ${brief.applicable} Tests sind bei den Zahlen des Auftrags offen: ${open.join("; ")}. Jeder ist im Panel erklärt; unten stehen die Änderungen, mit denen der Plan hält.`)
      : tt("There is no story library and KPIs yet, so no story is approved and nothing can be measured. Below are the changes that put the base first.", "Es gibt noch keine Story-Bibliothek und keine KPIs, also ist keine Story freigegeben, und nichts lässt sich messen. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.");
  }
  const watch = weak.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  return tt(
    `The stories come before the story tools and every test holds with the brief's figures: the story library and KPIs start no later than the first story tool, every funded item has a purpose, the story tools start on claims that are backed, and the plan fits the budget and the ${R2_MONTHS} months. Other plans can hold too.${watch.length ? ` With the backing ${WEAK_POINTS} points weaker, ${watch.length === 1 ? "this test opens" : "these tests open"}: ${watch.join("; ")}. That is what the sentence “what you will watch” in Step B is for.` : ""}`,
    `Die Storys kommen vor den Story-Tools, und jeder Test stimmt bei den Zahlen des Auftrags: Story-Bibliothek und KPIs starten nicht später als das erste Story-Tool, jeder finanzierte Punkt hat einen Zweck, die Story-Tools starten auf belegten Aussagen, und der Plan passt ins Budget und in die ${R2_MONTHS} Monate. Auch andere Pläne können halten.${watch.length ? ` Bei um ${WEAK_POINTS} Punkte schwächerem Beleg ${watch.length === 1 ? "öffnet sich dieser Test" : "öffnen sich diese Tests"}: ${watch.join("; ")}. Dafür ist der Satz „Was Sie beobachten“ in Schritt B da.` : ""}`,
  );
}

export type DecisionReading = { cat: Category; why: string; text: string; change: string };

/** How the system reads the Step B decision against the Step A plan; null until a decision is chosen. The category is for the mentor only. */
export function decisionReading(r2: HasTier & { decision: string | null }, scn: Scn): DecisionReading | null {
  if (!r2.decision) return null;
  const plan = categoryOf(r2, scn);
  const base = isFunded(r2, KPI_SYSTEM_ID);
  const firstMoves = euro(ARCH_BY_ID[KPI_SYSTEM_ID].cost + ARCH_BY_ID.chat.cost + ARCH_BY_ID[CLEAN_ID].cost);
  if (r2.decision === "stage") {
    const clause =
      plan.cat === 1
        ? tt(" Your Step A is that staged plan.", " Ihr Schritt A ist dieser gestufte Plan.")
        : plan.cat === 2
          ? tt(" Step A still has open tests, so the staging is not complete yet: see what to change under Step A.", " Schritt A hat noch offene Tests, die Stufung ist also noch nicht vollständig: Siehe, was Sie unter Schritt A ändern können.")
          : tt(" Step A buys story tools before the stories are approved, so the staging is not real yet: put the base first (see Step A).", " Schritt A kauft Story-Tools, bevor die Storys freigegeben sind, die Stufung ist also noch nicht echt: Setzen Sie die Basis an die erste Stelle (siehe Schritt A).");
    return {
      cat: 1,
      why: "Staging is the decision the brief asks for: decide now, change the conversations where the claims are backed, measure before scaling.",
      text: tt("Deciding now and piloting in stages is what the brief asks for: it changes real conversations within weeks where the claims are backed and the customer type is clear, and it learns how each type reacts before it scales.", "Jetzt zu entscheiden und stufenweise zu pilotieren ist, was der Auftrag verlangt: Es ändert innerhalb von Wochen echte Gespräche, dort wo die Aussagen belegt sind und der Kundentyp klar ist, und es lernt, wie jeder Typ reagiert, bevor es skaliert.") + clause,
      change: plan.cat === 1 ? tt("Nothing to change in the decision. What is left is the sentence on what you will watch.", "An der Entscheidung ist nichts zu ändern. Es bleibt der Satz dazu, was Sie beobachten.") : tt("Keep the decision and apply the changes from the reading under Step A.", "Behalten Sie die Entscheidung und setzen Sie die Änderungen aus dem Lesen unter Schritt A um."),
    };
  }
  if (r2.decision === "commit")
    return {
      cat: base ? 2 : 3,
      why: base ? "Every conversation is switched at once although a base is funded." : "Every conversation is switched with no approved stories: pitch without a base.",
      text: tt(`Switching every conversation at once puts all four customer types on the new pitch from month 1, although part of the claims are not backed yet: a story that misfires with one type misfires in every meeting, and nothing is measured before the switch.`, `Jedes Gespräch sofort umzustellen setzt alle vier Kundentypen ab Monat 1 auf den neuen Pitch, obwohl ein Teil der Aussagen noch nicht belegt ist: Geht eine Story bei einem Typ daneben, dann in jedem Gespräch, und vor der Umstellung wird nichts gemessen.`),
      change: tt(`Choose “Decide now, pilot with two customer types, and watch one figure”: set the story library and KPIs, the conversation guides and the reference programme to Now (together ${firstMoves}), then add the training once the proof is ready.`, `Wählen Sie „Jetzt entscheiden, mit zwei Kundentypen pilotieren, und eine Zahl beobachten“: Setzen Sie Story-Bibliothek und KPIs, die Gesprächsleitfäden und das Referenzkundenprogramm auf „Jetzt“ (zusammen ${firstMoves}), und fügen Sie dann das Training hinzu, sobald der Beleg bereit ist.`),
    };
  return {
    cat: 2,
    why: "Waiting keeps every offer interchangeable and tests nothing; the brief asks for a decision despite unclear customer reactions.",
    text: tt(`Waiting for a customer survey keeps the offers looking interchangeable for the ${R2_MONTHS} months, while customers show what convinces them in real conversations.`, `Auf eine Kundenbefragung zu warten lässt die Angebote für die ${R2_MONTHS} Monate austauschbar wirken, obwohl Kunden in echten Gesprächen zeigen, was sie überzeugt.`),
    change: tt(`Choose “Decide now, pilot with two customer types, and watch one figure”: the first moves are the story library and KPIs, the conversation guides and the reference programme in month 1 (together ${firstMoves}). They change real conversations instead of waiting for a survey.`, `Wählen Sie „Jetzt entscheiden, mit zwei Kundentypen pilotieren, und eine Zahl beobachten“: Die ersten Schritte sind Story-Bibliothek und KPIs, die Gesprächsleitfäden und das Referenzkundenprogramm in Monat 1 (zusammen ${firstMoves}). Sie ändern echte Gespräche, statt auf eine Befragung zu warten.`),
  };
}
