import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { BASIS_LABEL, CUST_BY_ID, PILOT, FORECAST } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, OUTCOME_LABEL, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, UNC_BY_ID } from "@/data/patterns";
import { BUDGET, MEASURE_BY_ID, MONTHS, PROBLEM_LABEL, MEASURE_AREA_LABEL } from "@/data/measures";
import { ACTION_LABEL, ARCH, ARCH_BY_ID, COMP_BY_ID, CRITERIA, CRIT_IDS, DECISIONS, LOGIC_OWNER_LABEL, PRINCIPLES, R2_BUDGET, R2_MONTHS, SITUATIONS, SOURCES, USE_LABEL } from "@/data/route2";
import { PANEL, TIER_LABEL, WEAK_POINTS } from "@/data/route2Panel";
import { coverage, measureScore, tallyOf, totalCost } from "@/lib/checks";
import { planOf, rangeOf } from "@/lib/r2Panel";
import { euro, getLang, num, pct, tt } from "@/lib/lang";
import { parseAmount } from "@/lib/parseAmount";
import { COURSE } from "@/lib/routes";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * Each exported document is built here as a self-contained HTML string (inline CSS + inline SVG), in the active language. The
 * on-screen "Preview of your ..." renders this same body, so what the participant reads is what they download. It never prints
 * answer keys, ticks, crosses or scores (a measure's effect × measurability × scalability is the learner's own priority
 * score, not a mark).
 */

export const DOC_CSS = `
.doc{font-family:Georgia,Cambria,"Times New Roman",serif;color:#1F2328;background:#FFFEFA;line-height:1.5;font-size:14px}
.doc *{box-sizing:border-box}
.doc h1{font-size:22px;margin:0 0 4px;font-weight:600}
.doc h2{font-size:15px;margin:22px 0 8px;padding-bottom:4px;border-bottom:1px solid #D8D1BF;font-weight:600;letter-spacing:.01em}
.doc h3{font-size:13.5px;margin:14px 0 4px;font-weight:600}
.doc .meta{display:grid;grid-template-columns:auto 1fr;gap:2px 14px;margin:12px 0 4px;font-family:system-ui,sans-serif;font-size:12.5px}
.doc .meta dt{color:#59606A}.doc .meta dd{margin:0}
.doc .kicker{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8A5A0B}
.doc table{width:100%;border-collapse:collapse;font-size:12.5px;font-family:system-ui,sans-serif}
.doc th{text-align:left;font-weight:600;color:#59606A;border-bottom:1px solid #59606A;padding:4px 8px 4px 0;font-size:11px;letter-spacing:.04em;text-transform:uppercase}
.doc td{border-bottom:1px solid #ECE6D6;padding:6px 8px 6px 0;vertical-align:top}
.doc td.num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.doc td.id{font-weight:700}
.doc table{table-layout:auto}.doc td,.doc th{overflow-wrap:anywhere}
.doc blockquote{margin:6px 0;padding:6px 12px;border-left:3px solid #D99A2B;background:#FBF0D6}
.doc .muted{color:#59606A}
.doc .foot{margin-top:26px;padding-top:8px;border-top:1px solid #59606A;font-family:system-ui,sans-serif;font-size:12px;color:#59606A}
.doc .legend{font-family:system-ui,sans-serif;font-size:11.5px;color:#59606A;margin:4px 0 0}
.doc svg{display:block;margin:8px 0}
@media print{.doc{font-size:12px}.doc h2{break-after:avoid}.doc table,.doc svg,.doc blockquote{break-inside:avoid}}
`;

const dateLabel = () => new Date().toLocaleDateString(getLang() === "de" ? "de-DE" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

function header(title: string, level: string, p: Persisted): string {
  return `
<div class="kicker">${esc(COURSE.course)} · ${esc(COURSE.company)}</div>
<h1>${esc(title)}</h1>
<dl class="meta">
  <dt>${esc(tt("Course", "Kurs"))}</dt><dd>${esc(COURSE.course)} · ${esc(tt(`Day ${COURSE.day}`, `Tag ${COURSE.day}`))}</dd>
  <dt>${esc(tt("Position", "Einordnung"))}</dt><dd>${esc(level)}</dd>
  <dt>${esc(tt("Participant", "Teilnehmer/in"))}</dt><dd>${esc(p.participant.name.trim() || "—")}</dd>
  <dt>${esc(tt("Date", "Datum"))}</dt><dd>${esc(dateLabel())}</dd>
</dl>`;
}

const para = (s: string) => `<blockquote>${esc(s.trim()) || "—"}</blockquote>`;
const cell = (s: string) => esc(s.trim()) || "—";

export function wrapDocument(title: string, body: string): string {
  return `<!doctype html>
<html lang="${getLang()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>body{margin:0;background:#F3EFE4}.sheet{max-width:820px;margin:0 auto;padding:36px 40px;background:#FFFEFA}@media print{body{background:#fff}.sheet{padding:0;max-width:none}@page{margin:16mm}}${DOC_CSS}</style>
</head><body><div class="sheet"><div class="doc">${body}</div></div></body></html>`;
}

export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".html") ? filename : `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Opens the same document in a new window and prints it (no PDF library). Falls back to a hidden frame if pop-ups are blocked. */
export function printDocument(title: string, html: string) {
  const win = window.open("", "_blank");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.document.title = title;
    win.focus();
    window.setTimeout(() => win.print(), 250);
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
  document.body.appendChild(iframe);
  const w = iframe.contentWindow;
  if (!w) return iframe.remove();
  w.document.open();
  w.document.write(html);
  w.document.close();
  window.setTimeout(() => {
    w.focus();
    w.print();
    window.setTimeout(() => iframe.remove(), 1000);
  }, 250);
}

/* ------------------------------------------------------------------ Route 1 · the Storytelling Analysis File */

/** Bars of the learner's own tally: metrics per kind and how many moved with customer value, as an inline SVG. */
function tallySvg(p: Persisted): string {
  const t = tallyOf(p.l1.tags);
  const W = 560;
  const rowH = 28;
  const rows = PATTERN_IDS.map((s, i) => {
    const y = 8 + i * rowH;
    const w = (t.count[s] / 6) * 300;
    const wl = (t.left[s] / 6) * 300;
    return `<text x="0" y="${y + 13}" font-size="11.5" fill="#1F2328" font-family="system-ui,sans-serif">${esc(PATTERNS[s].label)}</text>
<rect x="140" y="${y}" width="${Math.max(w, 1.5).toFixed(1)}" height="16" fill="#8B9098" stroke="#1F2328"/>
<rect x="140" y="${y}" width="${wl.toFixed(1)}" height="16" fill="#2F5D62" stroke="#1F2328"/>
<text x="${(146 + w).toFixed(1)}" y="${y + 13}" font-size="11.5" fill="#1F2328" font-family="system-ui,sans-serif">${esc(tt(`${t.count[s]} · ${t.left[s]} moved with value`, `${t.count[s]} · ${t.left[s]} mit dem Wert bewegt`))}</text>`;
  }).join("\n");
  const H = 8 + PATTERN_IDS.length * rowH;
  const title = tt("Metrics per kind, as you tagged them; the dark part moved with customer value", "Kennzahlen pro Art, wie Sie sie zugeordnet haben; der dunkle Teil bewegte sich mit dem Kundenwert");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${rows}</svg>`;
}

export function analysisBody(p: Persisted): string {
  const { l1 } = p;
  const sortRows = LINES.map((r, i) => `<tr><td class="id">${i + 1}</td><td>${esc(r.text)}</td><td>${l1.sort[r.id] ? esc(LEVEL_LABEL[l1.sort[r.id]!]) : "—"}</td></tr>`).join("");
  const sortNote = l1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${l1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${l1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const pilotTable = `<table><thead><tr><th>${esc(tt("Offers by how they were presented (Case assumption)", "Angebote nach Art der Präsentation (Fallannahme)"))}</th><th class="num">${esc(tt("Offers", "Angebote"))}</th><th class="num">${esc(tt("Deals", "Abschlüsse"))}</th><th class="num">${esc(tt("Close rate", "Abschlussquote"))}</th></tr></thead><tbody>
<tr><td class="id">${esc(tt("Technical presentation", "Technische Präsentation"))}</td><td class="num">${num(PILOT.control.sent)}</td><td class="num">${PILOT.control.orders}</td><td class="num">${num(FORECAST.controlRate, { minimumFractionDigits: 1 })} %</td></tr>
<tr><td class="id">${esc(tt("With benefit and customer story", "Mit Nutzen und Kunden-Story"))}</td><td class="num">${num(PILOT.variant.sent)}</td><td class="num">${PILOT.variant.orders}</td><td class="num">${num(FORECAST.f1, { minimumFractionDigits: 1 })} %</td></tr></tbody></table>
<p class="legend">${esc(tt(`The rates are printed by the app; offers with a story closed ${num(FORECAST.f2)} times as often.`, `Die Quoten druckt die App; Angebote mit Story schlossen ${num(FORECAST.f2)}-mal so oft ab.`))}</p>`;
  const optNote = tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt.");
  const optTag = tt(" · Optional", " · Optional");
  const has12 = l1.meaning.trim() !== "";
  const has13 = l1.valuable.length > 0 || l1.churners.length > 0 || l1.insights.some((x) => x.text.trim() !== "");
  const has21 = RECORDS.some((r) => !!l1.tags[r.id]) || l1.misread.trim() !== "";
  const has14 = Object.values(l1.reflect).some((v) => v.trim() !== "");
  const has22 = l1.unc.length > 0 || PATTERN_IDS.some((x) => l1.rows[x].risk || l1.rows[x].meaning || l1.rows[x].measure);
  const has23 = l1.ab.hyp.trim() !== "" || l1.ab.rule.trim() !== "" || AB_PARTS.some((k) => !!l1.ab[k]);
  const optEmpty = `<p class="muted">${esc(optNote)}</p>`;
  const names = (ids: string[]) => esc(ids.map((c) => CUST_BY_ID[c as keyof typeof CUST_BY_ID].name).join(", ") || "—");
  const insights = l1.insights.map((a, i) => `<h3>${esc(tt(`Improvement ${i + 1}`, `Verbesserung ${i + 1}`))} · ${a.basis ? esc(BASIS_LABEL[a.basis]) : "—"}</h3>${para(a.text)}`).join("");
  const tagRows = RECORDS.map((o) => `<tr><td class="id">${esc(o.code)}</td><td>${esc(o.text)}</td><td>${esc(OUTCOME_LABEL[o.outcome])}</td><td>${l1.tags[o.id] ? esc(PATTERNS[l1.tags[o.id]!].label) : "—"}</td></tr>`).join("");
  const tagNote = l1.tagReasoning ? `<p class="legend">${esc(tt(`The reasoning for the tags was opened after ${l1.tagChecks} checks.`, `Die Begründung zur Zuordnung wurde nach ${l1.tagChecks} Prüfungen geöffnet.`))}</p>` : "";
  const meaningLabel = (id: string | null) => MEANINGS.find((m) => m.id === id)?.label ?? "—";
  const measureLabel = (id: string | null) => PMEASURES.find((m) => m.id === id)?.label ?? "—";
  const rowRows = PATTERN_IDS.map((x) => {
    const r = l1.rows[x];
    return `<tr><td class="id">${esc(PATTERNS[x].label)}</td><td>${r.risk ? esc(RISK_LABEL[r.risk]) : "—"}</td><td>${esc(meaningLabel(r.meaning))}</td><td>${esc(measureLabel(r.measure))}</td></tr>`;
  }).join("");
  const uncList = l1.unc.length ? `<ul>${l1.unc.map((w) => `<li>${esc(UNC_BY_ID[w].label)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;
  const abRows = AB_PARTS.map((k) => `<tr><td class="id">${esc(AB[k].label)}</td><td>${esc(AB[k].options.find((o) => o.id === l1.ab[k])?.label ?? "—")}</td></tr>`).join("");
  const chosen = l1.chosen;
  const measureRows = chosen
    .map((id) => {
      const m = MEASURE_BY_ID[id];
      const aims = l1.aims[id];
      return `<tr><td class="id">${esc(m.name)}<br><span class="muted">${esc(MEASURE_AREA_LABEL[m.area])}</span></td><td>${aims === undefined ? "—" : aims.length ? esc(aims.map((a) => PROBLEM_LABEL[a]).join(", ")) : esc(tt("none of the three", "keines der drei"))}</td><td class="num">${l1.eff[id] || "—"} × ${l1.exp[id] || "—"} × ${l1.fea[id] || "—"} = ${measureScore(l1, id) || "—"}</td><td class="num">${esc(euro(m.cost))}</td></tr>`;
    })
    .join("");
  const cov = coverage(l1);
  const notServed = cov.filter((c) => !c.covered).map((c) => PROBLEM_LABEL[c.pattern]).join(", ");
  const covLine = chosen.length
    ? tt(`Problems of the brief at least one chosen measure answers: ${cov.filter((c) => c.covered).length} of 3${notServed ? ` (not answered: ${notServed})` : ""}.`, `Probleme des Auftrags, die mindestens eine gewählte Maßnahme beantwortet: ${cov.filter((c) => c.covered).length} von 3${notServed ? ` (nicht beantwortet: ${notServed})` : ""}.`)
    : "";
  const cost = totalCost(chosen);
  const order = l1.order.filter((id) => chosen.includes(id));

  return `${header("Storytelling Analysis File", tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), p)}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`SalesTech Solutions GmbH sells IT solutions that need explaining to the Mittelstand: customers don\'t understand the benefit, offers appear interchangeable and the close rate is low. Budget ${euro(BUDGET)}, time ${MONTHS} months. Evidence in the file: nine sentences from two sales conversations, last year\'s offers presented technically and with benefit and story, eight prospects and twelve metrics.`, `SalesTech Solutions GmbH verkauft dem Mittelstand erklärungsbedürftige IT-Lösungen: Kunden verstehen den Nutzen nicht, Angebote wirken austauschbar, und die Abschlussquote ist niedrig. Budget ${euro(BUDGET)}, Zeit ${MONTHS} Monate. Evidenz in der Datei: neun Sätze aus zwei Vertriebsgesprächen, die Angebote des letzten Jahres technisch und mit Nutzen und Story präsentiert, acht Interessenten und zwölf Kennzahlen.`))}</p>

<h2>${esc(tt("Part 1 · Understand the emotional effect", "Teil 1 · Die emotionale Wirkung verstehen"))}</h2>
<h3>${esc(tt("1.1 · Conversations A and B: feature, benefit or story", "1.1 · Gespräche A und B: Feature, Nutzen oder Story"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Sentence", "Satz"))}</th><th>${esc(tt("Your kind", "Ihre Art"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("A weak moment of conversation A", "Eine schwache Stelle von Gespräch A"))}</h3>${para(l1.extraInsight)}
<h3>${esc(tt("1.2 · What a customer story is worth", "1.2 · Was eine Kunden-Story wert ist"))}${esc(optTag)}</h3>
${has12 ? `${pilotTable}${para(l1.meaning)}` : optEmpty}
<h3>${esc(tt("1.3 · Customer types, and three improvements for conversation A", "1.3 · Kundentypen, und drei Verbesserungen für Gespräch A"))}${esc(optTag)}</h3>
${
  has13
    ? `<p><strong>${esc(tt("Security-oriented:", "Sicherheitsorientiert:"))}</strong> ${names(l1.valuable)}</p>
<p><strong>${esc(tt("Relationship-oriented:", "Beziehungsorientiert:"))}</strong> ${names(l1.churners)}</p>
${insights}`
    : optEmpty
}
<h2>${esc(tt("1.4 · Coaching reflection", "1.4 · Coaching-Reflexion"))}${esc(optTag)}</h2>
${
  has14
    ? `<h3>${esc(tt("Why do stories work more strongly than arguments?", "Warum wirken Storys stärker als Argumente?"))}</h3>${para(l1.reflect.interpret)}
<h3>${esc(tt("Where is the argument too technical?", "Wo ist die Argumentation zu technisch?"))}</h3>${para(l1.reflect.causation)}
<h3>${esc(tt("How would a top sales manager communicate?", "Wie würde eine Top-Vertriebsleiterin kommunizieren?"))}</h3>${para(l1.reflect.decider)}`
    : optEmpty
}

<h2>${esc(tt("Part 2 · Make it measurable and choose", "Teil 2 · Messbar machen und auswählen"))}</h2>
<h3>${esc(tt("2.1 · The twelve metrics, as you tagged them", "2.1 · Die zwölf Kennzahlen, wie Sie sie zugeordnet haben"))}${esc(optTag)}</h3>
${
  has21
    ? `<table><thead><tr><th>${esc(tt("Metric", "Kennzahl"))}</th><th>${esc(tt("What it counts", "Was sie zählt"))}</th><th>${esc(tt("Last year", "Letztes Jahr"))}</th><th>${esc(tt("Kind", "Art"))}</th></tr></thead><tbody>${tagRows}</tbody></table>${tagNote}
${tallySvg(p)}
<h3>${esc(tt("My three KPIs", "Meine drei KPIs"))}</h3>${para(l1.misread)}`
    : optEmpty
}
<h2>${esc(tt("2.2 · What each kind of metric is worth", "2.2 · Was jede Art von Kennzahl wert ist"))}${esc(optTag)}</h2>
${
  has22
    ? `<table><thead><tr><th>${esc(tt("Kind", "Art"))}</th><th>${esc(tt("Link to value", "Verbindung zum Wert"))}</th><th>${esc(tt("What it tells management", "Was es dem Management sagt"))}</th><th>${esc(tt("How to use it", "Wie man sie nutzt"))}</th></tr></thead><tbody>${rowRows}</tbody></table>
<h3>${esc(tt("Uncertainties in the story figures", "Unsicherheiten der Story-Werte"))}</h3>${uncList}`
    : optEmpty
}
<h2>${esc(tt("2.3 · A fair A/B test", "2.3 · Ein fairer A/B-Test"))}${esc(optTag)}</h2>
${
  has23
    ? `<h3>${esc(tt("Hypothesis", "Hypothese"))}</h3>${para(l1.ab.hyp)}
<table><tbody>${abRows}</tbody></table>
<h3>${esc(tt("Decision rule", "Entscheidungsregel"))}</h3>${para(l1.ab.rule)}`
    : optEmpty
}
<h2>${esc(tt("2.4 · Three measures, scored and ordered", "2.4 · Drei Maßnahmen, bewertet und geordnet"))}</h2>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("Answers", "Beantwortet"))}</th><th class="num">${esc(tt("Effect × Comprehensibility × Persuasiveness", "Wirkung × Verständlichkeit × Überzeugungskraft"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
${chosen.length ? `<h3>${esc(tt("Why these effect and persuasiveness scores", "Warum diese Werte für Wirkung und Überzeugungskraft"))}</h3><ul>${chosen.map((id) => `<li><strong>${esc(MEASURE_BY_ID[id].name)}</strong>: ${cell(l1.reasons[id] ?? "")}</li>`).join("")}</ul>` : ""}
<p class="legend">${esc(tt(`Total cost ${euro(cost)} of the ${euro(BUDGET)} budget${cost > BUDGET ? ` (${euro(cost - BUDGET)} over)` : ""}.`, `Gesamtkosten ${euro(cost)} vom Budget von ${euro(BUDGET)}${cost > BUDGET ? ` (${euro(cost - BUDGET)} darüber)` : ""}.`))} ${esc(covLine)}</p>
<h3>${esc(tt("Priority order", "Reihenfolge"))}</h3>
<ol>${order.map((id) => `<li>${esc(MEASURE_BY_ID[id].name)}</li>`).join("") || "<li>—</li>"}</ol>
${para(l1.why)}

<div class="foot">${esc(tt(`Checks requested: ${l1.checks}`, `Angeforderte Prüfungen: ${l1.checks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the Omnichannel Strategy Memo */

/** The Level 3 memo. The on-screen live preview and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { l1, r2 } = p;
  const name = p.participant.name.trim();
  const situation =
    l1.chosen.length
      ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(l1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", "))}.</blockquote>`
      : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const principleRows = r2.principles.map((c) => `<tr><td class="id">${esc(PRINCIPLES[c].name)}</td><td>${cell(r2.principleText[c] ?? "")}</td></tr>`).join("");
  const sourceRows = SOURCES.map((s) => `<tr><td class="id">${esc(s.name)}</td><td>${esc(s.decision ?? "—")}</td><td class="num">${pct(s.complete)}</td><td>${r2.sources[s.id] ? esc(USE_LABEL[r2.sources[s.id]]) : "—"}</td></tr>`).join("");
  const B = ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
  const compRows = r2.comps
    .map((id) => `<tr><td class="id">${esc(COMP_BY_ID[id].name)}${r2.greatest === id ? ` <span class="muted">(${esc(tt("greatest leverage", "größte Hebelwirkung"))})</span>` : ""}</td>${CRIT_IDS.map((c) => `<td>${esc(B[r2.rate[`${id}.${c}`] || 0])}</td>`).join("")}</tr>`)
    .join("");
  const logicRows = SITUATIONS.map((s) => {
    const r = r2.logic[s.id];
    return `<tr><td class="id">${esc(s.signal)}</td><td class="num">${s.lift > 0 ? "+" : s.lift < 0 ? "−" : ""}${esc(pct(Math.abs(s.lift)))} · ${s.cases}</td><td>${r?.action ? esc(ACTION_LABEL[r.action]) : "—"}</td><td>${r?.owner ? esc(LOGIC_OWNER_LABEL[r.owner]) : "—"}</td></tr>`;
  }).join("");

  // The architecture (Step A) as facts, in both data scenarios; never a grade (CLAUDE.md #47).
  const brief = planOf(r2, 0);
  const weak = planOf(r2, 1);
  const rng = rangeOf(r2);
  const pc = (n: number | null) => (n === null ? "—" : `${n}${tt("%", " %")}`);
  const archRows = ARCH.map((a) => {
    const v = brief.items[a.id];
    const funded = v.tier !== "not";
    return `<tr><td class="id">${esc(PANEL[a.id].short)}</td><td>${esc(TIER_LABEL[v.tier])}</td><td class="num">${funded ? esc(euro(a.cost)) : "—"}</td><td class="num">${funded && !v.never ? esc(tt(`month ${v.start} to ${v.inUse}`, `Monat ${v.start} bis ${v.inUse}`)) : "—"}</td><td>${funded && v.notes.length ? esc(v.notes.join("; ")) : "—"}</td></tr>`;
  }).join("");
  const testRows = brief.tests
    .map((x, i) => (x.applies ? `<tr><td class="id">${esc(x.name)}</td><td>${esc(x.holds ? tt("holds", "stimmt") : tt("open", "offen"))}</td><td>${esc(weak.tests[i].holds ? tt("holds", "stimmt") : tt("open", "offen"))}</td></tr>` : ""))
    .join("");
  const b = brief.bars;
  const barFacts = `<ul>
<li><strong>${esc(tt("Budget:", "Budget:"))}</strong> ${esc(tt(`${euro(b.spent)} of ${euro(R2_BUDGET)}`, `${euro(b.spent)} von ${euro(R2_BUDGET)}`))}${b.over > 0 ? esc(tt(`, ${euro(b.over)} over the budget (a decision the reasons in this memo defend)`, `, ${euro(b.over)} über dem Budget (eine Entscheidung, die die Begründungen in diesem Memo stützen)`)) : esc(tt(`, ${euro(b.left)} left`, `, ${euro(b.left)} übrig`))}.</li>
<li><strong>${esc(tt("Measurable:", "Messbar:"))}</strong> ${esc(tt(`${pc(rng.meas[0])} of the money sits on items that are measured, whose claims are backed and that are in use within the ${R2_MONTHS} months; ${pc(rng.meas[1])} if the backing is ${WEAK_POINTS} points weaker.`, `${pc(rng.meas[0])} des Geldes liegen auf Punkten, die gemessen werden, deren Aussagen belegt sind und die innerhalb der ${R2_MONTHS} Monate im Einsatz sind; ${pc(rng.meas[1])}, wenn der Beleg ${WEAK_POINTS} Punkte schwächer ist.`))}</li>
<li><strong>${esc(tt("Risk:", "Risiko:"))}</strong> ${esc(tt(`${pc(rng.risk[0])} of the money rests on a black box, on claims below 80% backed when the item starts or on an item in use only after the ${R2_MONTHS} months; ${pc(rng.risk[1])} if the backing is ${WEAK_POINTS} points weaker.`, `${pc(rng.risk[0])} des Geldes beruhen auf einer Black Box, auf Aussagen unter 80 % belegt, wenn der Punkt startet, oder auf einem Punkt, der erst nach den ${R2_MONTHS} Monaten im Einsatz ist; ${pc(rng.risk[1])}, wenn der Beleg ${WEAK_POINTS} Punkte schwächer ist.`))}</li>
</ul>`;
  const d = DECISIONS.find((x) => x.id === r2.decision);
  const optNone = `<p class="muted">${esc(tt("Optional block, not answered.", "Optionaler Block, nicht beantwortet."))}</p>`;
  const answered = (list: unknown[]) => list.length > 0;

  return `${header("Sales Strategy Memo", tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), p)}
<p class="muted">${esc(tt(`To: the board · From: ${name || "Chief Sales Officer"}, SalesTech Solutions GmbH · Budget ${euro(R2_BUDGET)} over ${R2_MONTHS} months.`, `An: den Vorstand · Von: ${name || "Chief Sales Officer"}, SalesTech Solutions GmbH · Budget ${euro(R2_BUDGET)} über ${R2_MONTHS} Monate.`))}</p>
<h2>${esc(tt("1 · Situation", "1 · Lage"))}</h2>
<p>${esc(tt("Products that need explaining, strong competition and customers who do not understand the benefit; a limited budget, different customer types and time pressure. The board asks for an emotional sales strategy and a communication decision despite unclear customer reactions.", "Erklärungsbedürftige Produkte, starker Wettbewerb und Kunden, die den Nutzen nicht verstehen; ein begrenztes Budget, verschiedene Kundentypen und Zeitdruck. Der Vorstand verlangt eine emotionale Vertriebsstrategie und eine Kommunikationsentscheidung trotz unklarer Kundenreaktionen."))}</p>
${situation}
<h2>${esc(tt("2 · Target vision of the emotional sales strategy", "2 · Zielbild der emotionalen Vertriebsstrategie"))}</h2>
${para(r2.vision)}
<h2>${esc(tt("3 · The prioritised implementation architecture", "3 · Die priorisierte Umsetzungsarchitektur"))}</h2>
<table><thead><tr><th>${esc(tt("Item", "Punkt"))}</th><th>${esc(tt("When", "Wann"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Start to in use", "Start bis Einsatz"))}</th><th>${esc(tt("What the panel noted (backing as the brief says)", "Was das Panel vermerkte (Beleg wie im Auftrag)"))}</th></tr></thead><tbody>${archRows}</tbody></table>
${barFacts}
${testRows ? `<table><thead><tr><th>${esc(tt("Test", "Test"))}</th><th>${esc(tt("Backing as the brief says", "Beleg wie im Auftrag"))}</th><th>${esc(tt(`Backing ${WEAK_POINTS} points weaker`, `Beleg ${WEAK_POINTS} Punkte schwächer`))}</th></tr></thead><tbody>${testRows}</tbody></table>` : ""}
<h3>${esc(tt("What my plan gives me, and what I give up", "Was mein Plan mir gibt, und worauf ich verzichte"))}</h3>${para(r2.giveUp)}
<h2>${esc(tt("4 · The communication decision", "4 · Die Kommunikationsentscheidung"))}</h2>
<p><strong>${d ? esc(d.label) : "—"}</strong>${d ? ` — ${esc(d.detail)}` : ""}</p>
<h3>${esc(tt("Why", "Warum"))}</h3>${para(r2.decisionWhy)}
<h3>${esc(tt("What I will watch, and when I would stop", "Was ich beobachte, und wann ich aufhören würde"))}</h3>${para(r2.watch)}
<h2>${esc(tt("5 · Go deeper (optional blocks)", "5 · Vertiefen (optionale Blöcke)"))}</h2>
<h3>${esc(tt("Principles of the target vision", "Prinzipien des Zielbilds"))}</h3>
${answered(r2.principles) ? `<table><thead><tr><th>${esc(tt("Principle", "Prinzip"))}</th><th>${esc(tt("What it means at SalesTech", "Was es bei SalesTech bedeutet"))}</th></tr></thead><tbody>${principleRows}</tbody></table>` : optNone}
<h3>${esc(tt("Central storytelling approaches", "Zentrale Storytelling-Ansätze"))}</h3>
${answered(Object.keys(r2.sources)) ? `<table><thead><tr><th>${esc(tt("Approach", "Ansatz"))}</th><th>${esc(tt("Customer decision", "Entscheidung des Kunden"))}</th><th class="num">${esc(tt("Claims backed", "Belegte Aussagen"))}</th><th>${esc(tt("Decision", "Entscheidung"))}</th></tr></thead><tbody>${sourceRows}</tbody></table>` : optNone}
<h3>${esc(tt("The KPI system for sales communication", "Das KPI-System für Vertriebskommunikation"))}</h3>
${answered(r2.comps) ? `<table><thead><tr><th>${esc(tt("KPI", "KPI"))}</th>${CRITERIA.map((c) => `<th>${esc(c.name)}</th>`).join("")}</tr></thead><tbody>${compRows}</tbody></table>${para(r2.greatestWhy)}` : optNone}
<h3>${esc(tt("Approaches per customer type, tested: roll out, keep testing or stop", "Ansätze pro Kundentyp, getestet: ausrollen, weiter testen oder stoppen"))}</h3>
${answered(Object.values(r2.logic).filter((r) => !!r?.action)) ? `<table><thead><tr><th>${esc(tt("Test", "Test"))}</th><th class="num">${esc(tt("Uplift · decisions", "Uplift · Entscheidungen"))}</th><th>${esc(tt("What happens", "Was passiert"))}</th><th>${esc(tt("Who acts", "Wer handelt"))}</th></tr></thead><tbody>${logicRows}</tbody></table>` : optNone}

<div class="foot">${esc(tt(`Checks requested: ${r2.checks}`, `Angeforderte Prüfungen: ${r2.checks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

export { ARCH_BY_ID };
