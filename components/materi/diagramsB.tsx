"use client";

import { useId, useState } from "react";
import { Insight, Toggles } from "@/components/materi/kit";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { bi, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses the worked-example company Neisse Systems (a Görlitz software provider,
 * Case assumption), never SalesTech. Every control is followed by an always-visible "What this shows" (CLAUDE.md #20).
 */
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6", rust: "#A4472A" };

/* ------------------------------------------------------------------ B1 · four stages towards an emotional sales strategy */

type Stage = "report" | "dash" | "rules" | "forecast";
const STAGES: Stage[] = ["report", "dash", "rules", "forecast"];
const STAGE_TEXT = bi({
  report: { name: t("Features for everyone", "Features für alle"), spree: t("Every salesperson shows the same 40 slides of features to every customer, whatever they ask.", "Jeder Vertriebsmitarbeiter zeigt jedem Kunden dieselben 40 Folien mit Features, egal was er fragt."), reading: t("The customer has to work out the benefit alone; most offers look like the competitors'.", "Der Kunde muss den Nutzen allein herausfinden; die meisten Angebote sehen aus wie die der Wettbewerber.") },
  dash: { name: t("Benefit first", "Nutzen zuerst"), spree: t("Every product has one benefit message in the customer's words; features follow as proof.", "Jedes Produkt hat eine Nutzenbotschaft in den Worten des Kunden; Features folgen als Beleg."), reading: t("Customers now hear what changes for them; the pitch is still the same for every type of customer.", "Kunden hören jetzt, was sich für sie ändert; der Pitch ist noch für jeden Kundentyp gleich.") },
  rules: { name: t("Stories per customer type", "Storys pro Kundentyp"), spree: t("“Security-oriented: the audit story and a pilot. Relationship-oriented: the family-firm story and a call with a reference.”", "„Sicherheitsorientiert: die Audit-Story und ein Pilot. Beziehungsorientiert: die Story der Familienfirma und ein Anruf bei einer Referenz.“"), reading: t("The story fits the person in front of the salesperson. This is where emotional selling becomes a strategy, not a talent.", "Die Story passt zu der Person vor dem Vertriebsmitarbeiter. Hier wird emotionales Verkaufen zur Strategie, nicht zum Talent.") },
  forecast: { name: t("Tested and reviewed monthly", "Getestet und monatlich geprüft"), spree: t("Each story is recorded in the CRM; every month the same KPIs decide which approach is rolled out, tested further or stopped.", "Jede Story wird im CRM erfasst; jeden Monat entscheiden dieselben KPIs, welcher Ansatz ausgerollt, weiter getestet oder gestoppt wird."), reading: t("The team learns which story works for which type, and drops what sounded exaggerated.", "Das Team lernt, welche Story bei welchem Typ wirkt, und lässt fallen, was übertrieben klang.") },
});

export function DataStages() {
  const uid = useId().replace(/:/g, "");
  const [st, setSt] = useState<Stage>("dash");
  const idx = STAGES.indexOf(st);
  const s = STAGE_TEXT[st];
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four stages towards an emotional sales strategy", "Vier Stufen zu einer emotionalen Vertriebsstrategie")}</title>
        <desc id={`${uid}-d`}>{tt(`Stage shown: ${s.name}.`, `Gezeigte Stufe: ${s.name}.`)}</desc>
        {STAGES.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={STAGE_TEXT[k].name} onClick={() => setSt(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSt(k)}>
              <rect className="hit-shape" x={x} y={150 - h} width="128" height={h} fill={k === st ? C.gold : on ? C.data : C.paper} stroke={C.ink} strokeWidth="1.4" />
              <text x={x + 64} y={166} textAnchor="middle" fontSize="11" fill={C.ash}>{`${i + 1}`}</text>
            </g>
          );
        })}
        <text x="10" y="18" fontSize="11.5" fill={C.ash}>{tt("from features for everyone → benefit first → stories per type → tested monthly", "von Features für alle → Nutzen zuerst → Storys pro Typ → monatlich getestet")}</text>
      </svg>
      <Toggles<Stage> label={tt("Stage", "Stufe")} value={st} onChange={setSt} options={STAGES.map((k, i) => ({ id: k, label: `${i + 1} · ${STAGE_TEXT[k].name}` }))} />
      <p className="rounded-md border border-line bg-paper px-3 py-2 text-caption text-ink">
        <span className="smallcaps mr-1.5">Neisse Systems</span>
        {s.spree}
      </p>
      <Insight>{s.reading}</Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · central storytelling approaches */

type ISrc = { id: string; name: string; decision: boolean; complete: number };
const I_SRC: ISrc[] = bi([
  { id: "upsell", name: t("Story: the dental practice", "Story: die Zahnarztpraxis"), decision: true, complete: 92 },
  { id: "winback", name: t("Benefit: invoices on day one", "Nutzen: Rechnungen ab Tag eins"), decision: true, complete: 86 },
  { id: "voice", name: t("ROI story: the plumber", "ROI-Story: der Installateur"), decision: true, complete: 45 },
  { id: "sentiment", name: t("Our trade fair highlights", "Unsere Messe-Highlights"), decision: false, complete: 75 },
  { id: "images", name: t("Our ISO certificate history", "Unsere ISO-Zertifikatsgeschichte"), decision: false, complete: 100 },
]);
const useOfI = (s: ISrc) => (!s.decision ? "leave" : s.complete >= 80 ? "core" : "later");
export function SourceGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("voice");
  const s = I_SRC.find((x) => x.id === sel)!;
  const u = useOfI(s);
  const POS: Record<string, { cx: number; cy: number }> = { upsell: { cx: 300, cy: 58 }, winback: { cx: 300, cy: 88 }, voice: { cx: 90, cy: 72 }, sentiment: { cx: 90, cy: 138 }, images: { cx: 300, cy: 138 } };
  const pos = (x: ISrc, _i: number) => POS[x.id];
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 210" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Neisse Systems' storytelling approaches by customer decision and backing", "Storytelling-Ansätze von Neisse Systems nach Kundenentscheidung und Beleg")}</title>
        <desc id={`${uid}-d`}>{I_SRC.map((x) => `${x.name}: ${useOfI(x)}`).join(", ")}</desc>
        <rect x="60" y="20" width="220" height="90" fill={C.soft} stroke={C.line} />
        <rect x="280" y="20" width="240" height="90" fill={C.tealSoft} stroke={C.line} />
        <rect x="60" y="110" width="460" height="80" fill={C.mist} stroke={C.line} />
        <text x="170" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.amber}>{tt("Central: collect proof first", "Zentral: zuerst Belege sammeln")}</text>
        <text x="400" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.teal}>{tt("Central: use now", "Zentral: jetzt einsetzen")}</text>
        <text x="290" y="182" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("Not central: no customer decision", "Nicht zentral: keine Kundenentscheidung")}</text>
        <text x="30" y="70" textAnchor="middle" fontSize="11" fill={C.ash} transform="rotate(-90 30 70)">{tt("customer decides", "Kunde entscheidet")}</text>
        <text x="170" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("< 80% backed", "< 80 % belegt")}</text>
        <text x="400" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("≥ 80% backed", "≥ 80 % belegt")}</text>
        {I_SRC.map((x, i) => {
          const p = pos(x, i);
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 11 : 8} fill={on ? C.gold : C.paper} stroke={C.ink} strokeWidth="1.6" />
              <text x={p.cx + 14} y={p.cy + 4} fontSize="11.5" fontWeight={on ? 800 : 500} fill={C.ink}>{x.name}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Approach", "Ansatz")} value={sel} onChange={setSel} options={I_SRC.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
        {u === "core"
          ? tt(`${s.name}: it helps the customer make a buying decision, and ${s.complete}% of its claims are backed by a real, approved customer case. Central: use it now, in a version for each customer type.`, `${s.name}: Er hilft dem Kunden bei einer Kaufentscheidung, und ${s.complete} % seiner Aussagen sind durch einen echten, freigegebenen Kundenfall belegt. Zentral: jetzt einsetzen, in einer Version für jeden Kundentyp.`)
          : u === "later"
            ? tt(`${s.name}: it helps a buying decision, but only ${s.complete}% of its claims are backed. Telling it now risks a claim the customer cannot check. Collect proof first.`, `${s.name}: Er hilft bei einer Kaufentscheidung, aber nur ${s.complete} % seiner Aussagen sind belegt. Ihn jetzt zu erzählen riskiert eine Behauptung, die der Kunde nicht prüfen kann. Zuerst Belege sammeln.`)
            : tt(`${s.name}: ${s.complete}% backed, but it helps no buying decision of the customer; it is about Neisse, not about the customer. Not central, however true.`, `${s.name}: ${s.complete} % belegt, aber er hilft dem Kunden bei keiner Kaufentscheidung; er handelt von Neisse, nicht vom Kunden. Nicht zentral, egal wie wahr.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B3 · four tests for a management KPI */

type ICrit = "explain" | "timely" | "reach" | "scale";
const I_CRITS: ICrit[] = ["explain", "timely", "reach", "scale"];
const I_CRIT_NAME = bi({ explain: t("Link to value", "Verbindung zum Wert"), timely: t("Early", "Früh"), reach: t("Reach", "Reichweite"), scale: t("Measured automatically", "Automatisch gemessen") });
const I_COMPS = bi([
  { id: "upgrade", name: t("Close rate per customer type", "Abschlussquote pro Kundentyp"), facts: t("linked to value · every week · every customer · counted by the systems", "mit dem Wert verbunden · jede Woche · jeder Kunde · von den Systemen gezählt"), r: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("High on all four: it is the result, it moves the week the pitch changes, it covers every offer and the CRM counts it.", "Hoch auf allen vier: Es ist das Ergebnis, bewegt sich in der Woche, in der sich der Pitch ändert, deckt jedes Angebot ab, und das CRM zählt es.") },
  { id: "survey", name: t("Yearly customer survey", "Jährliche Kundenbefragung"), facts: t("linked to value · yearly · those who answer · by a survey", "mit dem Wert verbunden · jährlich · wer antwortet · über eine Befragung"), r: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value, but once a year is too late to steer a four-month plan.", "Mit dem Wert verbunden, aber einmal im Jahr ist zu spät, um einen Viermonatsplan zu steuern.") },
  { id: "views", name: t("Presentations held", "Gehaltene Präsentationen"), facts: t("not linked to value · every week · every customer · counted by the systems", "nicht mit dem Wert verbunden · jede Woche · jeder Kunde · von den Systemen gezählt"), r: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Easy to count, and it rose while deals stayed flat: holding more presentations is not being understood.", "Leicht zu zählen, und sie stieg, während die Abschlüsse gleich blieben: mehr Präsentationen halten heißt nicht, verstanden zu werden.") },
  { id: "wins", name: t("Salespeople's favourite success stories", "Lieblings-Erfolgsgeschichten der Vertriebsleute"), facts: t("not linked to value · monthly · cases someone picks · collected by hand", "nicht mit dem Wert verbunden · monatlich · von jemandem ausgewählte Fälle · von Hand gesammelt"), r: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Vivid, but chosen by the teller, so the lost deals never appear.", "Anschaulich, aber vom Erzähler ausgewählt, also tauchen die verlorenen Abschlüsse nie auf.") },
]);
export function CompProfile() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("views");
  const c = I_COMPS.find((x) => x.id === sel)!;
  const total = I_CRITS.reduce((s, k) => s + c.r[k], 0);
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("One KPI candidate of Neisse Systems on four tests", "Ein KPI-Kandidat von Neisse Systems nach vier Tests")}</title>
        <desc id={`${uid}-d`}>{I_CRITS.map((k) => `${I_CRIT_NAME[k]} ${c.r[k]}`).join(", ")}</desc>
        {I_CRITS.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k];
          return (
            <g key={k}>
              <text x="0" y={y + 18} fontSize="12" fill={C.ink}>{I_CRIT_NAME[k]}</text>
              {[1, 2, 3].map((b) => (
                <rect key={b} x={160 + (b - 1) * 110} y={y} width="104" height="26" fill={b <= v ? (v === 1 ? C.grey : C.data) : C.paper} stroke={C.ink} strokeDasharray={b <= v ? undefined : "4 3"} />
              ))}
              <text x="500" y={y + 18} fontSize="12.5" fontWeight="700" fill={C.ink}>{["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][v]}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("KPI candidate", "KPI-Kandidat")} value={sel} onChange={setSel} options={I_COMPS.map((x) => ({ id: x.id, label: x.name }))} />
      <p className="text-caption text-ash">
        <span className="font-semibold text-ink">{tt("Printed facts: ", "Gedruckte Fakten: ")}</span>
        {c.facts}
      </p>
      <Insight>
        {tt(`${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`, `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop: uplift and decisions */

export function LiftCases() {
  const uid = useId().replace(/:/g, "");
  const [lift, setLift] = useState(20);
  const [cases, setCases] = useState(40);
  const act = lift >= LIFT_ACT && cases >= CASES_MIN ? "intervene" : lift >= LIFT_WATCH ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 200" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Roll out, keep testing or stop, by uplift and decisions per group", "Ausrollen, weiter testen oder stoppen, nach Uplift und Entscheidungen pro Gruppe")}</title>
        <desc id={`${uid}-d`}>{tt(`Uplift ${lift}%, ${cases} decisions: ${act}.`, `Uplift ${lift} %, ${cases} Entscheidungen: ${act}.`)}</desc>
        <rect x={X(CASES_MIN)} y={Y(60)} width={X(300) - X(CASES_MIN)} height={Y(LIFT_ACT) - Y(60)} fill={C.tealSoft} />
        <rect x={X(0)} y={Y(60)} width={X(CASES_MIN) - X(0)} height={Y(LIFT_ACT) - Y(60)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_ACT)} width={X(300) - X(0)} height={Y(LIFT_WATCH) - Y(LIFT_ACT)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_WATCH)} width={X(300) - X(0)} height={Y(-10) - Y(LIFT_WATCH)} fill={C.mist} />
        <text x={X(200)} y={Y(45)} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.teal}>{tt("roll out", "ausrollen")}</text>
        <text x={X(50)} y={Y(45)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(6)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(-4)} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("stop", "stoppen")}</text>
        <line x1={X(0)} y1={Y(0)} x2={X(300)} y2={Y(0)} stroke={C.rust} strokeDasharray="4 3" />
        <line x1={X(0)} y1={Y(-10)} x2={X(0)} y2={Y(60)} stroke={C.ash} />
        <text x={X(150)} y="196" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("decisions (won or lost) in the smaller group →", "Entscheidungen (gewonnen oder verloren) in der kleineren Gruppe →")}</text>
        <text x="16" y={Y(25)} textAnchor="middle" fontSize="11" fill={C.ash} transform={`rotate(-90 16 ${Y(25)})`}>{tt("uplift % →", "Uplift % →")}</text>
        <circle cx={X(cases)} cy={Y(lift)} r="9" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-lift`} className="smallcaps block">{tt(`Uplift over the control group: ${lift > 0 ? "+" : ""}${lift}%`, `Uplift gegenüber der Kontrollgruppe: ${lift > 0 ? "+" : ""}${lift} %`)}</label>
          <input id={`${uid}-lift`} type="range" min={-10} max={60} step={1} value={lift} onChange={(e) => setLift(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
        <div>
          <label htmlFor={`${uid}-cases`} className="smallcaps block">{tt(`Decisions per group: ${cases}`, `Entscheidungen pro Gruppe: ${cases}`)}</label>
          <input id={`${uid}-cases`} type="range" min={10} max={300} step={10} value={cases} onChange={(e) => setCases(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
      </div>
      <Insight>
        {act === "intervene"
          ? tt(`An uplift of ${lift}% on ${cases} decisions per group: clear and proven. Roll out, and hand it to the team that leads those conversations.`, `Ein Uplift von ${lift} % bei ${cases} Entscheidungen pro Gruppe: klar und belegt. Ausrollen, und dem Team übergeben, das diese Gespräche führt.`)
          : act === "watch"
            ? lift >= LIFT_ACT
              ? tt(`An uplift of ${lift}% looks strong, but ${cases} decisions are too few to trust it (fewer than ${CASES_MIN}). Keep testing; sales operations runs it until the size is reached.`, `Ein Uplift von ${lift} % sieht stark aus, aber ${cases} Entscheidungen sind zu wenig, um ihm zu trauen (weniger als ${CASES_MIN}). Weiter testen; Sales Operations lässt ihn laufen, bis die Größe erreicht ist.`)
              : tt(`An uplift of ${lift}%: a small difference. Not worth a rollout yet; keep testing a stronger variant.`, `Ein Uplift von ${lift} %: ein kleiner Unterschied. Noch keinen Rollout wert; eine stärkere Variante weiter testen.`)
            : tt(`An uplift of ${lift}%: the variant does about as well as the control, or worse. Stop; running it on costs money and attention for nothing.`, `Ein Uplift von ${lift} %: Die Variante schneidet etwa so gut ab wie die Kontrolle, oder schlechter. Stoppen; sie weiterlaufen zu lassen kostet Geld und Aufmerksamkeit für nichts.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B5 · Neisse's measures architecture over four months */

const I_ARCH = bi([
  { id: "base", name: t("Approved story library", "Freigegebene Story-Bibliothek"), start: 1, owner: t("Head of Marketing", "Marketingleitung"), trigger: t("If fewer than three of the five stories are approved by their customers by the end of month 1, the training starts with the approved ones only.", "Sind bis Ende Monat 1 weniger als drei der fünf Storys von ihren Kunden freigegeben, startet das Training nur mit den freigegebenen."), why: t("Starts first: the guides and the training tell these stories, so they must exist and be true.", "Startet zuerst: Die Leitfäden und das Training erzählen diese Storys, also müssen sie existieren und wahr sein.") },
  { id: "score", name: t("Story field in the CRM", "Story-Feld im CRM"), start: 1, owner: t("Head of Sales Operations", "Leitung Sales Operations"), trigger: t("If the field is empty for more than 20% of offers in month 2, the monthly review names the missing offers.", "Ist das Feld in Monat 2 bei mehr als 20 % der Angebote leer, nennt das monatliche Review die fehlenden Angebote."), why: t("Starts in the same month: it needs only the CRM, and without it nobody can tell which story won.", "Startet im selben Monat: Es braucht nur das CRM, und ohne es kann niemand sagen, welche Story gewonnen hat.") },
  { id: "calls", name: t("Storytelling training", "Storytelling-Training"), start: 2, owner: t("Head of Field Sales", "Leitung Außendienst"), trigger: t("If fewer than half of the customers can repeat the benefit in the follow-up call by month 3, the role plays are repeated.", "Können bis Monat 3 weniger als die Hälfte der Kunden im Nachgespräch den Nutzen wiedergeben, werden die Rollenspiele wiederholt."), why: t("Starts once there are approved stories to practise with.", "Startet, sobald es freigegebene Storys zum Üben gibt.") },
]);
export function ArchExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("base");
  const r = I_ARCH.find((x) => x.id === sel)!;
  const X = (m: number) => 250 + (m - 1) * 76;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Neisse's three funded items by start month", "Die drei finanzierten Punkte von Neisse nach Startmonat")}</title>
        <desc id={`${uid}-d`}>{I_ARCH.map((a) => `${a.name}: ${a.start}`).join(". ")}</desc>
        {[1, 2, 3, 4].map((m) => (
          <text key={m} x={X(m) + 37} y="14" textAnchor="middle" fontSize="11.5" fill={C.ash}>{`M${m}`}</text>
        ))}
        {I_ARCH.map((a, i) => {
          const y = 24 + i * 44;
          const on = a.id === sel;
          return (
            <g key={a.id} className="hit" role="button" tabIndex={0} aria-label={a.name} onClick={() => setSel(a.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(a.id)}>
              <text x="4" y={y + 22} fontSize="12" fontWeight={on ? 800 : 600} fill={C.ink}>{a.name.length > 36 ? `${a.name.slice(0, 35)}…` : a.name}</text>
              {[1, 2, 3, 4].map((m) => (
                <rect key={m} className={m === a.start ? "hit-shape" : undefined} x={X(m) + 2} y={y + 6} width="72" height="24" rx="3" fill={m === a.start ? C.data : m > a.start ? C.tealSoft : C.paper} stroke={on && m === a.start ? C.amber : C.line} strokeWidth={on && m === a.start ? 2.5 : 1} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Read one item", "Einen Punkt lesen")}</p>
        <Toggles<string> label={tt("Item", "Punkt")} value={sel} onChange={setSel} options={I_ARCH.map((a) => ({ id: a.id, label: a.name }))} />
      </div>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{r.name}</p>
        <p className="mt-1">
          <span className="font-semibold text-ink">Owner. </span>
          {r.owner}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-ink">Trigger. </span>
          <Gloss>{r.trigger}</Gloss>
        </p>
        <p className="mt-1 text-ash">{r.why}</p>
      </div>
      <Insight>
        {tt("The story library starts first, together with the story field in the CRM, because the training tells these stories and the field measures which one wins. The training waits for approved stories. Each item has one owner who can change it alone and a trigger with a number, a date and an action. Neisse left out a celebrity campaign on purpose: it would have been ready only after twelve weeks, and it speaks to status for everyone instead of the customer's own situation.", "Die Story-Bibliothek startet zuerst, zusammen mit dem Story-Feld im CRM, weil das Training diese Storys erzählt und das Feld misst, welche gewinnt. Das Training wartet auf freigegebene Storys. Jeder Punkt hat einen Owner, der ihn allein ändern kann, und einen Trigger mit Zahl, Datum und Aktion. Neisse hat eine Kampagne mit einem Prominenten bewusst weggelassen: Sie wäre erst nach zwölf Wochen fertig gewesen, und sie spricht Status für alle an statt die eigene Lage des Kunden.")}
      </Insight>
    </div>
  );
}
