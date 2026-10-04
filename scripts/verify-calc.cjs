/**
 * Re-derives every figure and every rule the day rests on, from the same data files the site uses, and compares them with the
 * results briefed in the README. Run: npm run verify:calc. A failed line prints FAIL and the process exits with code 1.
 *
 * The data files are TypeScript with "@/" imports, so a tiny loader transpiles them on the fly (no test framework, no extra dependency).
 */
const path = require("path");
const fs = require("fs");
const Module = require("module");
const ts = require(path.join(process.cwd(), "node_modules", "typescript"));

const root = process.cwd();
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) {
    const base = path.join(root, request.slice(2));
    for (const ext of [".ts", ".tsx", "/index.ts"]) if (fs.existsSync(base + ext)) return base + ext;
  }
  return origResolve.call(this, request, ...rest);
};
for (const ext of [".ts", ".tsx"])
  require.extensions[ext] = function (module, filename) {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    });
    module._compile(out.outputText, filename);
  };

let failed = 0;
const ok = (name, cond, detail = "") => {
  console.log(`${cond ? "ok  " : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
  if (!cond) failed++;
};
const eq = (name, a, b) => ok(name, JSON.stringify(a) === JSON.stringify(b), `got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`);

const lang = require("@/lib/lang");
const fc = require("@/data/forecast");
const ld = require("@/data/ladder");
const pt = require("@/data/patterns");
const meas = require("@/data/measures");
const r2 = require("@/data/route2");
const key = require("@/data/mentorKey");
const checks = require("@/lib/checks");
const missing = require("@/lib/missing");
const progress = require("@/lib/progress");
const store = require("@/store/useStore");
const mg = require("@/lib/mentorGuide");

const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
/** The source text of one exported function (up to the next export) of a file. */
const fnText = (file, name) => {
  const src = read(file);
  const i = src.indexOf(`export function ${name}(`);
  if (i < 0) return "";
  const ends = [src.indexOf("\n/* ----", i + 10), src.indexOf("\nexport ", i + 10)].filter((x) => x > 0);
  return src.slice(i, ends.length ? Math.min(...ends) : src.length);
};


// --- Block 1.2 --------------------------------------------------------------------
eq("F1 close rate with benefit and story", fc.FORECAST.f1, 22);
eq("technical close rate", fc.FORECAST.controlRate, 10);
eq("F2 lift", fc.FORECAST.f2, 2.2);
eq("Havel worked example", [fc.MOSEL_RESULT.rate, fc.MOSEL_RESULT.other, fc.MOSEL_RESULT.lift, fc.MOSEL_RESULT.extra], [20, 8, 2.5, 216000]);
ok("worked example uses other numbers than the task", fc.MOSEL.order !== fc.PILOT.order && fc.MOSEL.yearly !== fc.PILOT.yearly && fc.MOSEL_RESULT.rate !== fc.FORECAST.f1);

ok("sentence check accepts the printed personalised rate", checks.citesForecastFigure(`It reached ${fc.FORECAST.f1}% of requests.`));
ok("sentence check accepts the printed rate in German writing", checks.citesForecastFigure(`Es erreichte ${String(fc.FORECAST.f1).replace(".", ",")} % der Anfragen.`));
ok("sentence check accepts the printed lift as a multiple", checks.citesForecastFigure(`It did ${fc.FORECAST.f2} times as well.`));
ok("sentence check accepts a printed count", checks.citesForecastFigure(`Only ${fc.PILOT.control.orders} cases stand behind it.`));
ok("sentence check rejects a sentence with no figure", !checks.citesForecastFigure("This seems to work for us."));

// --- Block 1.1 / 1.3 ----------------------------------------------------------------
const lvl = ld.LINES.reduce((o, r) => ({ ...o, [r.truth]: (o[r.truth] || 0) + 1 }), {});
eq("sentences: three per kind", lvl, { respond: 3, personal: 3, learn: 3 });
const respondRule = fc.CUSTOMERS.filter((c) => c.decision && c.leave >= fc.LEAVE_MIN).map((c) => c.id);
eq("security-oriented = compares offers, 50%+ detail questions", [...respondRule].sort(), [...fc.VALUABLE_TRUTH].sort());
const personalRule = fc.CUSTOMERS.filter((c) => c.known === "customer").map((c) => c.id);
eq("relationship-oriented = talks about the people", [...personalRule].sort(), [...fc.CHURN_TRUTH].sort());
ok("the detail-asking CTO who does not compare is not security-oriented", !fc.VALUABLE_TRUTH.includes("c3") && !fc.CHURN_TRUTH.includes("c3"));
ok("the comparing buyer with 45% detail questions is not security-oriented", !fc.VALUABLE_TRUTH.includes("c7"));
ok("advantage check needs a consequence word", fc.hasSoWhat("Start with the audit story, so the customer sees it is safe.") && !fc.hasSoWhat("Start with the audit story and the certificates."));

// --- Block 2.1 / 2.2 / 2.3 ------------------------------------------------------------
eq("metrics per kind", pt.TRUTH_COUNTS, { outcome: 3, driver: 3, guardrail: 3, vanity: 3 });
eq("moved with value per kind", pt.TRUTH_LEFT, { outcome: 3, driver: 2, guardrail: 1, vanity: 0 });
eq("model link per kind", pt.PATTERN_IDS.map((x) => pt.riskOf(pt.TRUTH_LEFT[x], pt.TRUTH_COUNTS[x])), ["high", "high", "mid", "low"]);
eq("real uncertainties", pt.UNCERTAINTIES.filter((w) => w.real).map((w) => w.id), ["sample", "cause", "missing", "shift"]);
ok("every kind has its own use", new Set(Object.values(pt.MEASURE_TRUTH)).size === 4);
ok("the bonus fits no kind", !Object.values(pt.MEASURE_TRUTH).includes("bonus"));
ok("each A/B part has exactly one fair option", pt.AB_PARTS.every((k) => pt.AB[k].options.filter((o) => o.right).length === 1));
eq("model A/B card flags nothing", checks.abFlagsOf({ ...pt.AB_MODEL, hyp: "If we open with an industry story, then the close rate rises, because customers see the benefit.", rule: "Roll out at 10% uplift." }), []);
eq("A/B card flags a wrong part", checks.abFlagsOf({ ...pt.AB_MODEL, control: "lastyear", hyp: "", rule: "" }), ["control"]);
eq("A/B card flags a rule without a number", checks.abFlagsOf({ ...pt.AB_MODEL, hyp: "", rule: "Roll out if it wins." }), ["rule"]);

// --- Block 2.4 --------------------------------------------------------------------
const scores = Object.fromEntries(meas.MEASURES.map((m) => [m.id, meas.modelScore(m.id)]));
eq("model scores", scores, { stories: 27, types: 18, training: 18, references: 12, aipitch: 4, brochure: 1, discount: 4, video: 2, fair: 4 });
eq("model three cost", meas.MODEL_COST, 75000);
ok("model three fit the budget", meas.MODEL_COST <= meas.BUDGET);
eq("model three are the three highest scores", [...meas.MEASURES].sort((a, b) => meas.modelScore(b.id) - meas.modelScore(a.id)).slice(0, 3).map((m) => m.id).sort(), [...meas.MODEL_MEASURES].sort());
ok("the model three answer all three problems", meas.PROBLEM_IDS.every((p) => meas.MODEL_MEASURES.some((id) => meas.MEASURE_BY_ID[id].targets.includes(p))));
ok("the feature brochure answers no problem of the brief", meas.MEASURE_BY_ID.brochure.targets.length === 0);

// --- Route 2 --------------------------------------------------------------------
eq("storytelling approach decisions by the rule", r2.SOURCES.map((s) => r2.useOf(s)), ["core", "core", "core", "later", "later", "later", "leave", "leave"]);
eq("test decisions by the rule", r2.SITUATIONS.map((s) => r2.actionOf(s)), ["intervene", "watch", "none", "watch", "none", "intervene"]);
for (const c of r2.COMPS) for (const k of r2.CRIT_IDS) ok(`model rating within the printed limit (${c.id}.${k})`, c.model[k] <= r2.maxRating(c.id, k));
ok("model KPIs all show a change early", checks.earlyCount(r2.MODEL_COMPS) === r2.MODEL_COMPS.length);
const pnl = require("@/data/route2Panel");
const rpl = require("@/lib/r2Panel");
const modelCost = pnl.MODEL_ARCH.reduce((x, id) => x + r2.ARCH_BY_ID[id].cost, 0);
eq("model architecture cost", modelCost, 120000);
ok("model architecture inside the budget", modelCost <= r2.R2_BUDGET);
ok("adding the AI pitch generator breaks the budget", modelCost + r2.ARCH_BY_ID.suite.cost > r2.R2_BUDGET);
eq("the model plan keeps the AI pitch generator and the image campaign out", r2.ARCH_IDS.filter((id) => pnl.MODEL_TIER[id] === "not"), ["suite", "relaunch"]);


// --- Measures: category, scene, who (CLAUDE.md #45, #46) ---------------------------------------
const AREAS = Object.keys(meas.MEASURE_AREA_LABEL);
for (const l of ["en", "de"]) {
  lang.setCurrentLang(l);
  for (const m of meas.MEASURES) ok(`[${l}] measure ${m.id} has a scene, a who-does-what line and a category`, m.scene.length > 30 && m.who.length > 30 && AREAS.includes(m.area));
  ok(`[${l}] the area note and labels are written`, meas.AREA_NOTE.v.length > 40 && AREAS.every((a) => meas.MEASURE_AREA_LABEL[a].length > 2));
}
lang.setCurrentLang("en");

// --- Key phrases are real substrings, in both languages ---------------------------------
for (const l of ["en", "de"]) {
  lang.setCurrentLang(l);
  for (const r of ld.LINES) ok(`[${l}] key phrase of idea ${r.id} is in its text`, r.text.includes(ld.LINE_KEY[r.id]));
  for (const r of pt.RECORDS) ok(`[${l}] key phrase of metric ${r.id} is in its text`, r.text.includes(pt.REC_KEY[r.id]));
}
lang.setCurrentLang("en");

// --- Core never reads Optional (CLAUDE.md #40) -------------------------------------------
const OPT = /Block (1\.2|1\.4|2\.2|2\.3)\b/;
for (const [file, fn] of [["components/task1/Part1.tsx", "Block11"], ["components/task1/Part1.tsx", "Block13"], ["components/task1/Part2.tsx", "Block21"], ["components/task1/Part2.tsx", "Block24"]])
  ok(`${fn} (Core) names no Optional block`, !OPT.test(fnText(file, fn)));
for (const c of ["CardA1", "CardA2", "CardA3", "CardA5", "CardA7"]) ok(`${c} (Core) names no Optional block`, !OPT.test(fnText("components/materi/CardsA.tsx", c)));
ok("Block 2.4 does not read the pilot figures", !/fig\.|FORECAST|PILOT/.test(fnText("components/task1/Part2.tsx", "Block24")));
const optIds = ["b12", "b14", "b22", "b23", "b31", "b32", "b33", "b34"];
eq("Optional blocks", [...progress.OPTIONAL_BLOCKS].sort(), [...optIds].sort());
eq("Optional material cards", require("@/data/materialIndex").MATERIALS.filter((m) => m.optional && m.block === "A").map((m) => m.id), ["A4", "A6"]);

// --- Old-shape blob (CLAUDE.md #9): version 1 fields are dropped, new ones filled ----------
{
  const old = { ...store.emptyL1(), fig: { F1: "4.8" }, parts: { x: "1" }, chosen: ["reco"] };
  delete old.reasons;
  const merged = store.mergeDefaults(store.emptyL1(), old);
  ok("an old blob gets the new reasons field", typeof merged.reasons === "object" && merged.reasons !== null);
  ok("an old blob keeps what it had", merged.chosen.length === 1 && merged.chosen[0] === "reco");
}

// --- Core-only fill: the four Core blocks alone make a complete, exportable file -----------
{
  lang.setCurrentLang("en");
  const full = { ...store.emptyL1(), ...key.KEY_L1() };
  const coreOnly = { ...full, meaning: "", reflect: { interpret: "", causation: "", decider: "" }, unc: [], rows: store.emptyL1().rows, ab: pt.emptyAb() };
  const p = { participant: { name: "Core Only" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, l1: coreOnly, r2: { ...store.emptyR2() } };
  eq("Core-only fill leaves the Route 1 missing list empty", missing.l1Missing(p).map((m) => m.label), []);
  const tb = progress.taskBlocks(p);
  eq("Core blocks complete after a Core-only fill", [tb.b11, tb.b13, tb.b21, tb.b24], [true, true, true, true]);
  eq("Optional blocks are not complete after a Core-only fill", [tb.b12, tb.b14, tb.b22, tb.b23], [false, false, false, false]);
  const cards = require("@/data/materialIndex").MATERIALS.filter((m) => m.block === "A" && !m.optional);
  const readAll = Object.fromEntries(cards.map((m) => [m.id, true]));
  const done = progress.dossierProgress({ ...p, ui: { ...p.ui, sectionsRead: readAll } }, 1);
  eq("Route 1 ring: Core cards + four Core blocks", [done.done, done.total], [cards.length + 4, cards.length + 4]);
  // a Core answer that differs from the model still exports (CLAUDE.md #38): the three dearest measures, over budget, with a reason each
  const dear = [...meas.MEASURES].sort((a, b) => b.cost - a.cost).slice(0, 3).map((m) => m.id);
  ok("the three dearest measures are over the budget", checks.totalCost(dear) > meas.BUDGET);
  const over = { ...coreOnly, chosen: dear, aims: Object.fromEntries(dear.map((id) => [id, []])), exp: Object.fromEntries(dear.map((id) => [id, 1])), fea: Object.fromEntries(dear.map((id) => [id, 2])), eff: Object.fromEntries(dear.map((id) => [id, 1])), reasons: Object.fromEntries(dear.map((id) => [id, "x".repeat(40)])), order: dear };
  const po = { ...p, l1: over };
  ok("an over-budget, against-the-model choice with reasons leaves nothing missing", missing.l1Missing(po).length === 0);
  ok("without a reason a measure is a named missing item", missing.l1Missing({ ...p, l1: { ...coreOnly, reasons: {} } }).some((m) => m.label.startsWith("Block 2.4:") && /why/.test(m.label)));
}

// --- Worked answers: every reason has a mentor guide and an example (CLAUDE.md #23, #45) ---
for (const id of meas.MODEL_MEASURES) {
  const g = mg.reasonGuide(id);
  ok(`reason guide of ${id} has an answer, a worked example and look-fors`, g.answer.length > 30 && g.example.length > 60 && g.lookFor.length >= 2);
}
ok("the KPI guide carries a worked example on another company", mg.misreadGuide().example.length > 100);
ok("the why guide carries a worked example on another company", mg.whyGuide().example.length > 100);

// --- Route 2 (CLAUDE.md #47): the panel's figures, the tests, the categories, Core independence, Core-only fill ----------------
{
  const T = (tier) => ({ tier });
  const MODEL = pnl.MODEL_TIER;
  const testOf = (plan, id) => plan.tests.find((x) => x.id === id);
  const ALL = Object.fromEntries(r2.ARCH_IDS.map((id) => [id, "now"]));

  // what Step A prints in Core equals what the Optional list prints (CLAUDE.md #40)
  eq("printed share of the ready tool's data equals the Optional list's", pnl.PANEL.chat.data, r2.SOURCES.find((x) => x.id === "chat").complete);
  eq("printed share of the gated tool's data equals the Optional list's", pnl.PANEL.personal.data, r2.SOURCES.find((x) => x.id === "social").complete);

  // the model plan, recomputed by hand: 30+20+30+15+10+15 = 120,000; measured items 30+20+30+15 = 95,000 (79%); weaker backing: the guides drop to 73%, so 30+30+15 = 75,000 (63%) and the guides' 20,000 is at risk (17%)
  const m0 = rpl.planOf(T(MODEL), 0);
  const m1 = rpl.planOf(T(MODEL), 1);
  eq("model plan: every test holds with the brief's figures", [m0.holding, m0.applicable], [4, 4]);
  eq("model plan: only the data test opens when the figures are 15 points weaker", m1.tests.map((x) => x.holds), [true, true, false, true]);
  eq("model bars: money, Measurable and Risk (brief, then weaker)", [m0.bars.spent, m0.bars.meas, m0.bars.risk, m1.bars.meas, m1.bars.risk], [120000, 79, 0, 63, 17]);
  eq("model plan: months in use (start + weeks ÷ 4, rounded up)", pnl.MODEL_ARCH.map((id) => rpl.inUseOf(T(MODEL), id)), [3, 2, 4, 2, 2, 2]);
  eq("the Measurable and Risk ranges", [rpl.rangeOf(T(MODEL)).meas, rpl.rangeOf(T(MODEL)).risk], [[79, 63], [0, 17]]);

  // time and data rules
  const base = { foundation: "now", routing: "now" };
  ok("the gated tool Now starts in month 1 on figures below the bar: the data test opens", !testOf(rpl.planOf(T({ ...base, personal: "now" }), 0), "data").holds);
  eq("the gated tool After data starts when the preparing item is in use", [rpl.startOf(T({ ...base, personal: "later" }), "personal"), rpl.inUseOf(T({ ...base, personal: "later" }), "personal")], [2, 4]);
  ok("the gated tool After data: the data and budget tests hold", testOf(rpl.planOf(T({ ...base, personal: "later" }), 0), "data").holds && testOf(rpl.planOf(T({ ...base, personal: "later" }), 0), "budget").holds);
  ok("After data without the preparing item never starts", rpl.planOf(T({ foundation: "now", personal: "later" }), 0).items.personal.never);
  ok("the base after a tool opens the first test", !testOf(rpl.planOf(T({ foundation: "later", routing: "now", chat: "now" }), 0), "measure").holds);
  ok("a tool without the base opens the first test", !testOf(rpl.planOf(T({ chat: "now" }), 0), "measure").holds);
  ok("the black box opens the purpose test", !testOf(rpl.planOf(T({ ...base, suite: "now" }), 0), "purpose").holds);
  ok("the item that names no KPI opens the purpose test", !testOf(rpl.planOf(T({ ...base, relaunch: "now" }), 0), "purpose").holds);
  eq("black box and last item: month in use, and whether the budget test opens", [rpl.inUseOf(T({ suite: "now" }), "suite"), rpl.inUseOf(T({ relaunch: "now" }), "relaunch"), !testOf(rpl.planOf(T({ suite: "now" }), 0), "budget").holds, !testOf(rpl.planOf(T({ ...base, relaunch: "now" }), 0), "budget").holds], [5, 5, true, true]);
  ok("going over the budget opens the budget test and is never a missing item", !testOf(rpl.planOf(T(ALL), 0), "budget").holds);
  eq("with everything Now these items are late", Object.values(rpl.planOf(T(ALL), 0).items).filter((v) => v.late).map((v) => v.id), ["suite", "relaunch"]);

  // the three internal categories (never shown to the learner)
  eq("category of the model plan", rpl.categoryOf(T(MODEL), 0).cat, 1);
  eq("category: nothing built", rpl.categoryOf(T({}), 0).cat, 3);
  eq("category: tools without the base", rpl.categoryOf(T({ chat: "now", suite: "now" }), 0).cat, 3);
  eq("category: a base, but the tool starts before it", rpl.categoryOf(T({ foundation: "later", routing: "now", chat: "now" }), 0).cat, 2);
  eq("category: the base alone is safe", rpl.categoryOf(T({ foundation: "now" }), 0).cat, 1);
  eq("category: enablers only, no base", rpl.categoryOf(T({ training: "now" }), 0).cat, 2);
  eq("category: model plus the black box is fair", rpl.categoryOf(T({ ...MODEL, suite: "now" }), 0).cat, 2);

  // the changes the reading names
  eq("the model plan needs no change", rpl.changesFor(T(MODEL), 0).changes.length, 0);
  const sOnly = rpl.changesFor(T({ suite: "now" }), 0);
  eq("a black-box-only plan: build the base, drop the black box", sOnly.changes.map((c) => `${c.id}:${c.to}`), ["foundation:now", "suite:not"]);
  ok("after those changes every test holds and the category is 1", sOnly.after.holding === sOnly.after.applicable && rpl.categoryOf(T({ foundation: "now" }), 0).cat === 1);
  const nothing = rpl.changesFor(T({}), 0);
  eq("an empty plan: the base and one ready tool", nothing.changes.map((c) => `${c.id}:${c.to}`), ["foundation:now", "chat:now"]);
  const everything = rpl.changesFor(T(ALL), 0);
  eq("everything Now: drop the black box and the unnamed item, the gated tool After data", everything.changes.map((c) => `${c.id}:${c.to}`), ["suite:not", "relaunch:not", "personal:later"]);
  ok("a plan with everything Now is brought inside the budget, each item changed once", everything.after.bars.over === 0 && new Set(everything.changes.map((c) => c.id)).size === everything.changes.length);
  const tiersOf = (ch, start) => { const o = { ...start }; for (const c of ch.changes) o[c.id] = c.to; return o; };
  eq("applying the changes of an empty plan gives category 1", rpl.categoryOf(T(tiersOf(nothing, {})), 0).cat, 1);
  eq("applying the changes of the everything-Now plan gives category 1", rpl.categoryOf(T(tiersOf(everything, ALL)), 0).cat, 1);

  // Step B: categories (mentor only) and the plain hint when Step B and Step A disagree
  const dr = (decision, tier) => rpl.decisionReading({ tier, decision }, 0);
  eq("decision categories: stage, wait, commit (with and without a base)", [dr("stage", MODEL).cat, dr("wait", MODEL).cat, dr("commit", MODEL).cat, dr("commit", {}).cat], [1, 2, 2, 3]);
  ok("no decision, no reading", rpl.decisionReading({ tier: MODEL, decision: null }, 0) === null);
  ok("waiting while Step A builds gets a plain hint", !!rpl.decisionHint({ tier: MODEL, decision: "wait" }));
  ok("committing while Step A holds items back gets a plain hint", !!rpl.decisionHint({ tier: MODEL, decision: "commit" }));
  ok("staging with the model plan gets no hint", rpl.decisionHint({ tier: MODEL, decision: "stage" }) === null);

  // texts in both languages, and the learner never reads the category
  for (const l of ["en", "de"]) {
    lang.setCurrentLang(l);
    for (const tier of [MODEL, {}, { chat: "now", suite: "now" }, { ...base, personal: "now" }, ALL]) {
      const plan = rpl.planOf(T(tier), 1);
      const rd = rpl.readingOf(T(tier), 1);
      const fix = rpl.changesFor(T(tier), 1);
      const learnerText = [rpl.standingOf(T(tier), 1), ...rd.gives, ...rd.costs, ...fix.changes.map((c) => c.text), ...plan.tests.flatMap((x) => [x.name, x.rule, ...x.open.flatMap((o) => [o.fact, o.plain, o.rule, ...o.ways.map((w) => w.text)])]), ...Object.values(plan.items).flatMap((v) => v.notes)].join(" | ");
      ok(`[${l}] the reading, the changes and the tests are written`, rd.gives.length > 0 && rpl.standingOf(T(tier), 1).length > 40 && plan.tests.every((x) => x.name.length > 8 && x.rule.length > 30));
      ok(`[${l}] the learner text never names a category`, !/categor|Kategorie|clearly wrong|eindeutig falsch/i.test(learnerText));
    }
    for (const id of ["stage", "wait", "commit"]) {
      const d = dr(id, MODEL);
      ok(`[${l}] the reading of the decision “${id}” is written and ends in a change`, d.text.length > 40 && d.change.length > 30 && !/categor|Kategorie/i.test(d.text + d.change));
    }
  }
  lang.setCurrentLang("en");

  // Core never reads Optional (3.1 to 3.4, cards B1 to B4)
  const OPT2 = /Block 3\.[1-4]\b|Materi B[1-4]\b/;
  for (const f of ["components/task2/StepA.tsx", "components/task2/StepB.tsx", "components/task2/Panel.tsx", "components/task2/Kits.tsx", "components/task2/MentorCategory.tsx", "lib/r2Panel.ts", "data/route2Panel.ts"]) ok(`${f} (Core) names no Optional block or card`, !OPT2.test(read(f)));
  const t2 = read("components/task2/Task2.tsx");
  ok("the Route 2 case brief names no Optional block", !OPT2.test(t2.slice(t2.indexOf("function CaseBrief"), t2.indexOf("export function Task2"))));
  ok("Route 2 Optional blocks are 3.1 to 3.4", ["b31", "b32", "b33", "b34"].every((b) => progress.OPTIONAL_BLOCKS.includes(b)) && !progress.OPTIONAL_BLOCKS.includes("b35") && !progress.OPTIONAL_BLOCKS.includes("b36"));
  eq("Optional material cards of Materi B", require("@/data/materialIndex").MATERIALS.filter((m) => m.optional && m.block === "B").map((m) => m.id), ["B1", "B2", "B3", "B4"]);

  // every item card prints its scene, and the panel facts exist in both languages
  for (const l of ["en", "de"]) {
    lang.setCurrentLang(l);
    for (const id of r2.ARCH_IDS) {
      ok(`[${l}] item ${id} prints a scene and its panel facts`, require("@/data/route2Extra").ARCH_EXTRA[id].scene.length > 60 && pnl.PANEL[id].short.length > 3 && pnl.PANEL[id].moves.length > 15);
    }
  }
  lang.setCurrentLang("en");

  // worked examples differ from the model text (CLAUDE.md #23)
  for (const g of [mg.greatestGuide(), mg.visionGuide(), mg.giveUpGuide(), mg.decisionWhyGuide(), mg.watchGuide()]) ok(`example of "${g.title}" exists and differs from the answer`, !!g.example && g.example.length > 60 && g.example !== g.answer);
  const ag = mg.architectureGuide();
  ok("the mentor's worked answer for Step A ends in the panel's own numbers", ag.steps.some((x) => x.result === "79%") && ag.steps.some((x) => x.result === "63%") && ag.steps.some((x) => x.result === "0% · 17%") && ag.steps[0].result === lang.euro(120000));
  eq("the answer key of Step A has one option per item", require("@/lib/answerKey").architectureKey().options.length, r2.ARCH_IDS.length);

  for (const l of ["en", "de"]) {
    lang.setCurrentLang(l);
    const k = key.KEY_R2();
    // Core-only: Step A and Step B alone make a complete memo; the Optional blocks 3.1 to 3.4 stay empty
    const coreR2 = { ...store.emptyR2(), tier: k.tier, vision: k.vision, giveUp: k.giveUp, decision: k.decision, decisionWhy: k.decisionWhy, watch: k.watch };
    const pc = { participant: { name: "Core Only" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: l }, l1: store.emptyL1(), r2: coreR2 };
    eq(`[${l}] Core-only fill leaves the Route 2 missing list empty`, missing.r2Missing(pc).map((m) => m.label), []);
    ok(`[${l}] doing nothing is a named missing item, not a wrong answer`, missing.r2Missing({ ...pc, r2: { ...coreR2, tier: {} } }).some((m) => m.label.startsWith(lang.tt("Step A", "Schritt A")) && /Now|Jetzt/.test(m.label)));
    ok(`[${l}] without a vision, a reason or a watch sentence they are named missing items`, ["vision", "giveUp", "decisionWhy", "watch"].every((f) => missing.r2Missing({ ...pc, r2: { ...coreR2, [f]: "" } }).length === 1));
    // a plan and a decision that differ from the model, over the budget, with the reasons, still exports (CLAUDE.md #38)
    const over = { ...coreR2, tier: ALL, decision: "commit" };
    ok(`[${l}] everything Now, over the budget, with the fields filled leaves nothing missing`, missing.r2Missing({ ...pc, r2: over }).length === 0);
    const memoOver = require("@/lib/exportDoc").memoBody({ ...pc, r2: over });
    ok(`[${l}] the memo prints the amount over the budget as a fact`, memoOver.includes(lang.euro(rpl.planOf(T(ALL), 0).bars.over)));
    ok(`[${l}] the memo never prints a category or a verdict`, !/categor|Kategorie|clearly wrong/i.test(memoOver) && !/✓|✗|✔|✘/.test(memoOver));
    ok(`[${l}] an unanswered Optional block is marked in the memo`, require("@/lib/exportDoc").memoBody(pc).includes(lang.tt("Optional block, not answered.", "Optionaler Block, nicht beantwortet.")));
  }
  lang.setCurrentLang("en");

  // an old-shape blob (version 2: alloc, start, owner, trigger, assumptions, tripwire) loads into the new shape (CLAUDE.md #9)
  {
    const oldR2 = { ...store.emptyR2(), alloc: { foundation: true, chat: true, suite: false }, start: { foundation: 1 }, owner: { foundation: "datalead" }, trigger: { foundation: "x" }, postponed: "p", pickup: "q", assumptions: ["a", "b", "c"], tripKpi: "conv", tripThreshold: "9", tripMonth: 4, tripAction: "adjust", challenge: "c", decision: "stage" };
    delete oldR2.tier; delete oldR2.vision; delete oldR2.giveUp; delete oldR2.decisionWhy; delete oldR2.watch;
    const migrated = store.migratePersisted({ participant: { name: "Old" }, ui: {}, l1: store.emptyL1(), r2: oldR2 }, 2);
    eq("an old blob: funded items become Now, the removed fields are gone", [migrated.r2.tier, "alloc" in migrated.r2, "tripKpi" in migrated.r2, migrated.r2.decision], [{ foundation: "now", chat: "now" }, false, false, "stage"]);
    const merged = store.mergeDefaults({ r2: store.emptyR2() }, migrated);
    eq("an old blob gets the new fields from the defaults", [merged.r2.vision, merged.r2.giveUp, merged.r2.decisionWhy, merged.r2.watch, merged.r2.decision], ["", "", "", "", "stage"]);
  }
}

// --- the mentor fill, in both languages --------------------------------------------
for (const l of ["en", "de"]) {
  lang.setCurrentLang(l);
  const l1 = { ...store.emptyL1(), ...key.KEY_L1(),  };
  const rr = { ...store.emptyR2(), ...key.KEY_R2() };
  const p = { participant: { name: "Mentor Check" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: l }, l1, r2: rr };
  eq(`[${l}] mentor fill leaves Route 1 missing list empty`, missing.l1Missing(p).map((m) => m.label), []);
  eq(`[${l}] mentor fill leaves Route 2 missing list empty`, missing.r2Missing(p).map((m) => m.label), []);
  const tb = progress.taskBlocks(p);
  eq(`[${l}] every task block complete after the fill`, Object.values(tb).every(Boolean), true);
  eq(`[${l}] model sort all hold`, checks.sortHolds(l1.sort), { holds: 9, placed: 9 });
  eq(`[${l}] model picks all hold`, checks.pickHolds(l1), { holds: 4, total: 4 });
  eq(`[${l}] model insights pass the floor`, checks.insightFlags(l1), []);
  ok(`[${l}] model sentence cites a figure`, checks.citesForecastFigure(l1.meaning));
  eq(`[${l}] model tags all hold`, checks.tagHolds(l1.tags), { holds: 12, placed: 12 });
  eq(`[${l}] model uncertainties all real`, checks.uncHolds(l1.unc), { holds: 4, chosen: 4 });
  eq(`[${l}] model A/B card flags nothing`, checks.abFlagsOf(l1.ab), []);
  const rc = checks.rowChecks(l1);
  eq(`[${l}] model kind rows hold`, [rc.holds, rc.total, rc.flags], [12, 12, []]);
  for (const id of l1.chosen) ok(`[${l}] model problems and measurability hold (${id})`, checks.aimsHold(id, l1.aims[id]) && checks.expHolds(id, l1.exp[id]));
  eq(`[${l}] model order has no inversion`, checks.orderInversions(l1), []);
  eq(`[${l}] model principles hold`, checks.principlesHold(rr), { defs: true, rules: true });
  eq(`[${l}] model sources hold`, checks.sourceHolds(rr), { holds: 8, total: 8 });
  eq(`[${l}] model ratings flag nothing`, checks.ratingFlags(rr), []);
  eq(`[${l}] model decision logic holds`, checks.logicHolds(rr), { holds: 12, total: 12 });
}
lang.setCurrentLang("en");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
