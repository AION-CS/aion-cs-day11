"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { Insight, Story, ThePoint, Toggles, useStory } from "@/components/materi/kit";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { bi, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses the worked-example company Neisse Systems (a Görlitz software provider,
 * Case assumption), never SalesTech. Every control is followed by an always-visible "What this shows" (CLAUDE.md #20), every picture opens with "The point" and carries a three-step "Walk me through it" story that
 * drives the real controls (CLAUDE.md #36); a manual button leaves the story.
 */
/** "In plain words:" leads every reading of a control (CLAUDE.md #36). */
const plain = () => tt("In plain words: ", "In einfachen Worten: ");
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
  const [st, setStRaw] = useState<Stage>("dash");
  const story = useStory([
    {
      title: tt("Tested and reviewed monthly", "Getestet und monatlich geprüft"),
      say: tt(`Neisse Systems is an example company, not your case. Each story is recorded in the CRM, and every month the same KPIs decide which approach is rolled out, tested further or stopped.`, `Neisse Systems ist ein Beispielunternehmen, nicht Ihr Fall. Jede Story wird im CRM erfasst, und jeden Monat entscheiden dieselben KPIs, welcher Ansatz ausgerollt, weiter getestet oder gestoppt wird.`),
      look: tt("the last, tallest bar", "der letzte, höchste Balken"),
      apply: () => {
        setStRaw("forecast");
      },
    },
    {
      title: tt("Features for everyone", "Features für alle"),
      say: tt(`Before that, every salesperson showed the same 40 slides of features to every customer, whatever they asked. Customers heard what the product has, not what it does for them.`, `Davor zeigte jeder Vertriebsmitarbeiter jedem Kunden dieselben 40 Folien mit Features, egal was er fragte. Kunden hörten, was das Produkt hat, nicht was es für sie tut.`),
      look: tt("the first, shortest bar", "der erste, niedrigste Balken"),
      apply: () => {
        setStRaw("report");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The jump from features to a strategy is the benefit message: what changes for the customer, in the customer's words. Try the four stages.`, `Der Sprung von Features zu einer Strategie ist die Nutzenbotschaft: was sich für den Kunden ändert, in den Worten des Kunden. Probieren Sie die vier Stufen.`),
      look: tt("the second bar", "der zweite Balken"),
      apply: () => {
        setStRaw("dash");
      },
    },
  ]);
  const setSt = (v: Stage) => {
    story.leave();
    setStRaw(v);
  };
  const idx = STAGES.indexOf(st);
  const s = STAGE_TEXT[st];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("An emotional sales strategy is not a longer deck. It is one benefit message in the customer's words, a story for each customer type, and a monthly look at which approach works.", "Eine emotionale Vertriebsstrategie ist kein längeres Deck. Sie ist eine Nutzenbotschaft in den Worten des Kunden, eine Story für jeden Kundentyp und ein monatlicher Blick darauf, welcher Ansatz wirkt.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four stages towards an emotional sales strategy", "Vier Stufen zu einer emotionalen Vertriebsstrategie")}</title>
        <desc id={`${uid}-d`}>{tt(`Stage shown: ${s.name}.`, `Gezeigte Stufe: ${s.name}.`)}</desc>
        {STAGES.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={STAGE_TEXT[k].name} onClick={() => setSt(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSt(k)}>
              {k === st && story.step !== null && <rect x={x - 4} y={150 - h - 4} width="136" height={h + 8} rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
      <Insight>{plain()}{s.reading}</Insight>
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
  const [sel, setSelRaw] = useState("voice");
  const story = useStory([
    {
      title: tt("Select now", "Jetzt auswählen"),
      say: tt(`Neisse Systems is an example company, not your case. The dental practice story names a KPI it should move, and ${I_SRC[0].complete}% of its data is ready: select now, and test it against a control group.`, `Neisse Systems ist ein Beispielunternehmen, nicht Ihr Fall. Die Story der Zahnarztpraxis nennt einen KPI, den sie bewegen soll, und ${I_SRC[0].complete} % ihrer Daten sind bereit: jetzt auswählen und gegen eine Kontrollgruppe testen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setSelRaw("upsell");
      },
    },
    {
      title: tt("Data first", "Erst die Daten"),
      say: tt(`The ROI story of the plumber would move a KPI too, but only ${I_SRC[2].complete}% of its data is ready. Built on now, it would learn the gaps. Fix the data first.`, `Die ROI-Story des Installateurs würde auch einen KPI bewegen, aber nur ${I_SRC[2].complete} % ihrer Daten sind bereit. Jetzt darauf gebaut, würde sie die Lücken lernen. Erst die Daten verbessern.`),
      look: tt("the dot in the amber area", "der Punkt im bernsteinfarbenen Feld"),
      apply: () => {
        setSelRaw("voice");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The ISO certificate history has ${I_SRC[4].complete}% of its data ready, but it moves no KPI of the system. However complete, not now. Try the other items.`, `Die ISO-Zertifikatsgeschichte hat ${I_SRC[4].complete} % seiner Daten bereit, bewegt aber keinen KPI des Systems. Egal wie vollständig: jetzt nicht. Probieren Sie die anderen Punkte.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setSelRaw("images");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const s = I_SRC.find((x) => x.id === sel)!;
  const u = useOfI(s);
  const POS: Record<string, { cx: number; cy: number }> = { upsell: { cx: 300, cy: 58 }, winback: { cx: 300, cy: 88 }, voice: { cx: 90, cy: 72 }, sentiment: { cx: 90, cy: 138 }, images: { cx: 300, cy: 138 } };
  const pos = (x: ISrc, _i: number) => POS[x.id];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Start from the KPI, not from the tool. An item that names a KPI and has its data ready is selected now; with data not ready it waits; with no KPI it is not now, however good it sounds.", "Gehen Sie vom KPI aus, nicht vom Werkzeug. Ein Punkt, der einen KPI nennt und dessen Daten bereit sind, wird jetzt gewählt; mit nicht bereiten Daten wartet er; ohne KPI ist er jetzt nicht dran, egal wie gut er klingt.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
              {on && story.step !== null && <circle cx={p.cx} cy={p.cy} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 11 : 8} fill={on ? C.gold : C.paper} stroke={C.ink} strokeWidth="1.6" />
              <text x={p.cx + 14} y={p.cy + 4} fontSize="11.5" fontWeight={on ? 800 : 500} fill={C.ink}>{x.name}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Approach", "Ansatz")} value={sel} onChange={setSel} options={I_SRC.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>{plain()}
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
  const [sel, setSelRaw] = useState("views");
  const story = useStory([
    {
      title: tt("A KPI that passes", "Ein KPI, der besteht"),
      say: tt(`Neisse Systems is an example company, not your case. The close rate per customer type is linked to value, counted every week for every customer by the systems: High on all four, 12 of 12.`, `Neisse Systems ist ein Beispielunternehmen, nicht Ihr Fall. Die Abschlussquote pro Kundentyp ist mit dem Wert verbunden und wird jede Woche für jeden Kunden von den Systemen gezählt: Hoch auf allen vier, 12 von 12.`),
      look: tt("all four rows filled to High", "alle vier Zeilen bis Hoch gefüllt"),
      apply: () => {
        setSelRaw("upgrade");
      },
    },
    {
      title: tt("A number that does not", "Eine Zahl, die nicht besteht"),
      say: tt(`Presentations held is automatic and exact, but it rose while the close rate stood still: giving a presentation is not winning a customer. The link to value stays Low, whatever the rest.`, `Gehaltene Präsentationen ist automatisch und genau, stieg aber, während die Abschlussquote stillstand: Eine Präsentation zu halten heißt nicht, einen Kunden zu gewinnen. Die Verbindung zum Wert bleibt Niedrig, egal wie der Rest ist.`),
      look: tt("the first row, Link to value", "die erste Zeile, Verbindung zum Wert"),
      apply: () => {
        setSelRaw("views");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The yearly survey score is linked to value but arrives once a year, so it is Low on early: a number for learning, not for steering. Try the other candidates.`, `Der jährliche Befragungswert ist mit dem Wert verbunden, kommt aber einmal im Jahr und ist daher bei „früh“ Niedrig: eine Zahl zum Lernen, nicht zum Steuern. Probieren Sie die anderen Kandidaten.`),
      look: tt("the second row, Early", "die zweite Zeile, Früh"),
      apply: () => {
        setSelRaw("survey");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const c = I_COMPS.find((x) => x.id === sel)!;
  const total = I_CRITS.reduce((s, k) => s + c.r[k], 0);
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A KPI worth steering by is linked to value, shows a change early, covers every customer and is counted by the systems. The printed facts cap each rating.", "Ein KPI, nach dem es sich zu steuern lohnt, ist mit dem Wert verbunden, zeigt früh eine Veränderung, deckt jeden Kunden ab und wird von den Systemen gezählt. Die gedruckten Fakten deckeln jede Bewertung.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("One KPI candidate of Neisse Systems on four tests", "Ein KPI-Kandidat von Neisse Systems nach vier Tests")}</title>
        <desc id={`${uid}-d`}>{I_CRITS.map((k) => `${I_CRIT_NAME[k]} ${c.r[k]}`).join(", ")}</desc>
        {I_CRITS.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k];
          return (
            <g key={k}>
              {((story.step === 1 && k === "explain") || (story.step === 2 && k === "timely")) && <rect x="-4" y={y - 3} width="556" height="32" rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
      <Insight>{plain()}
        {tt(`${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`, `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop: uplift and decisions */

export function LiftCases() {
  const uid = useId().replace(/:/g, "");
  const [lift, setLiftRaw] = useState(20);
  const [cases, setCasesRaw] = useState(40);
  const story = useStory([
    {
      title: tt("Roll out", "Ausrollen"),
      say: tt(`Neisse Systems is an example company, not your case. A test of a story opening shows +30% on 200 decisions per group: clear and proven. Roll out.`, `Neisse Systems ist ein Beispielunternehmen, nicht Ihr Fall. Ein Test einer Story als Einstieg zeigt +30 % bei 200 Entscheidungen pro Gruppe: klar und belegt. Ausrollen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(200);
      },
    },
    {
      title: tt("Keep testing", "Weiter testen"),
      say: tt(`Another test also shows +30%, but on only 40 decisions per group, fewer than ${CASES_MIN}. Too few to trust it: keep testing.`, `Ein anderer Test zeigt auch +30 %, aber nur bei 40 Entscheidungen pro Gruppe, weniger als ${CASES_MIN}. Zu wenig, um ihm zu trauen: weiter testen.`),
      look: tt("the dot in the left amber strip", "der Punkt im linken bernsteinfarbenen Streifen"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(40);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`A third test shows +2% on 300 decisions. Many decisions do not rescue a tiny uplift: they prove it is tiny. Stop. Move the two sliders to try your own.`, `Ein dritter Test zeigt +2 % bei 300 Entscheidungen. Viele Entscheidungen retten keinen winzigen Uplift: Sie beweisen, dass er winzig ist. Stoppen. Bewegen Sie die beiden Regler, um eigene Werte zu probieren.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setLiftRaw(2);
        setCasesRaw(300);
      },
    },
  ]);
  const setLift = (v: number) => {
    story.leave();
    setLiftRaw(v);
  };
  const setCases = (v: number) => {
    story.leave();
    setCasesRaw(v);
  };
  const act = lift >= LIFT_ACT && cases >= CASES_MIN ? "intervene" : lift >= LIFT_WATCH ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Every test ends in a decision. A clear uplift on enough decisions: roll out. A strong uplift on too few, or a small one: keep testing. No real uplift: stop.", "Jeder Test endet in einer Entscheidung. Ein klarer Uplift bei genug Entscheidungen: ausrollen. Ein starker Uplift bei zu wenigen oder ein kleiner: weiter testen. Kein echter Uplift: stoppen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
        {story.step !== null && <circle cx={X(cases)} cy={Y(lift)} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
      <Insight>{plain()}
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

/* ------------------------------------------------------------------ B5 · how an architecture is built: Neisse's story guide and its base */

/**
 * The worked example of Materi B5 on the example company Neisse Systems (a Görlitz software provider) (Case assumption): a small version of the Route 2 panel. Two controls set the same
 * two facts the panel reads: does the story library start before the guide, and are its claims or data backed. The links in the picture break the way the
 * panel's do, and "What this shows" says what the break means.
 */
export function ArchExample() {
  const [measFirst, setMeasFirstRaw] = useState(true);
  const [ready, setReadyRaw] = useState(true);
  const story = useStory([
    {
      title: tt("The base first", "Die Basis zuerst"),
      say: tt("Neisse Systems is an example company, not your case. It approves its stories and KPIs first, so its guide tells only stories a customer approved and is measured from its first week.", "Neisse Systems ist ein Beispielunternehmen, nicht Ihr Fall. Es gibt zuerst seine Storys und KPIs frei, damit sein Leitfaden nur Storys erzählt, die ein Kunde freigegeben hat, und ab der ersten Woche gemessen wird."),
      look: tt("the solid teal link between the guide and the base", "die durchgezogene teal Verbindung zwischen Leitfaden und Basis"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The tool before the base", "Das Werkzeug vor der Basis"),
      say: tt("Now the guide starts first. It has no approved story to tell and nothing measures it, so nobody can say whether it helps. Its link is dashed.", "Jetzt startet der Leitfaden zuerst. Er hat keine freigegebene Story zum Erzählen, und nichts misst ihn, also kann niemand sagen, ob er hilft. Seine Verbindung ist gestrichelt."),
      look: tt("the dashed amber link and the note on the guide", "die gestrichelte amberfarbene Verbindung und der Vermerk am Leitfaden"),
      apply: () => {
        setMeasFirstRaw(false);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Approved first, but with claims only 75% backed, the guide would teach salespeople to overclaim. Base first, then a story tool on backed claims. Try the two buttons.", "Zuerst freigegeben, aber mit nur zu 75 % belegten Aussagen würde der Leitfaden Vertriebsmitarbeitenden beibringen, zu übertreiben. Zuerst die Basis, dann ein Story-Tool auf belegten Aussagen. Probieren Sie die beiden Schaltflächen."),
      look: tt("the backing note under the guide", "den Belegvermerk unter dem Leitfaden"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(false);
      },
    },
  ]);
  const setMeasFirst = (v: boolean) => {
    story.leave();
    setMeasFirstRaw(v);
  };
  const setReady = (v: boolean) => {
    story.leave();
    setReadyRaw(v);
  };
  const dataPct = ready ? 90 : 75;
  const dataOk = dataPct >= 80;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("An architecture is built in order: the base first (the approved stories and the KPIs), then the proof, then the story tools. Where a link in that chain is missing, the tool above it cannot be trusted.", "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (die freigegebenen Storys und die KPIs), dann der Beleg, dann die Story-Tools. Wo ein Glied dieser Kette fehlt, lässt sich dem Werkzeug darüber nicht trauen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div role="group" aria-label={tt("Neisse's story guide and its base", "Der Story-Leitfaden von Neisse und seine Basis")} className="mx-auto max-w-xl">
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("What customers meet: the first call", "Was Kunden erleben: das Erstgespräch")}</div>
        <div className="my-1 flex h-7 items-center justify-center" aria-hidden />
        <div className={clsx("rounded-lg border p-2 text-caption leading-snug", "border-signal bg-signalSoft")}>
          <p className="font-semibold text-ink">{tt("Conversation guide for security-oriented customers", "Gesprächsleitfaden für sicherheitsorientierte Kunden")}</p>
          <p className="text-ash">{tt(measFirst ? "Starts in month 1" : "Starts in month 1, before the base", measFirst ? "Startet in Monat 1" : "Startet in Monat 1, vor der Basis")}</p>
          {!measFirst && <p className="text-accent">{tt("no approved story to tell and nothing measures it yet", "noch keine freigegebene Story zum Erzählen, und nichts misst ihn")}</p>}
          {!dataOk && <p className="text-accent">{tt(`its claims are ${dataPct}% backed, below 80%, when it starts`, `seine Aussagen sind zu ${dataPct} % belegt, unter 80 %, wenn er startet`)}</p>}
        </div>
        <div className={clsx("flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal", measFirst ? "text-ash" : "text-accent")}>
          <span aria-hidden className={clsx("block h-full w-0 border-l-[3px]", measFirst ? "border-solid border-signal" : "border-dashed border-gold")} />
          <span>{measFirst ? tt("tells approved stories", "erzählt freigegebene Storys") : tt("no approved story to tell", "keine freigegebene Story zum Erzählen")}</span>
        </div>
        <div className="rounded-lg border border-signal bg-signalSoft p-2 text-caption leading-snug">
          <p className="font-semibold text-ink">{tt("Approved story library and KPIs", "Freigegebene Story-Bibliothek und KPIs")}</p>
          <p className="text-ash">{measFirst ? tt("Starts in month 1", "Startet in Monat 1") : tt("Starts in month 3, after the guide", "Startet in Monat 3, nach dem Leitfaden")}</p>
        </div>
        <div className="flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal text-ash">
          <span aria-hidden className="block h-full w-0 border-l-[3px] border-solid border-signal" />
          <span>{tt("real customer cases flow up", "Echte Kundenfälle fließen nach oben")}</span>
        </div>
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt(`Where the proof lives: customer cases and the CRM, ${dataPct}% of what the guide tells is backed`, `Wo der Beleg liegt: Kundenfälle und CRM, ${dataPct} % dessen, was der Leitfaden erzählt, sind belegt`)}</div>
      </div>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Two things to change", "Zwei Dinge zum Ändern")}</p>
        <Toggles<string> label={tt("The approved stories start", "Die freigegebenen Storys starten")} value={measFirst ? "first" : "after"} onChange={(v) => setMeasFirst(v === "first")} options={[{ id: "first", label: tt("Before the guide", "Vor dem Leitfaden") }, { id: "after", label: tt("After the guide", "Nach dem Leitfaden") }]} />
        <Toggles<string> label={tt("Claims behind the guide", "Aussagen hinter dem Leitfaden")} value={ready ? "ready" : "weak"} onChange={(v) => setReady(v === "ready")} options={[{ id: "ready", label: tt("90% backed", "90 % belegt") }, { id: "weak", label: tt("75% backed", "75 % belegt") }]} />
      </div>
      <Insight>{plain()}
        {measFirst && dataOk
          ? tt("The base exists before the tool and the tool runs on claims that are backed. Neisse can say whether the guide helps, and it does not teach overclaiming. This is what a plan that holds looks like.", "Die Basis steht vor dem Werkzeug, und das Werkzeug läuft auf belegten Aussagen. Neisse kann sagen, ob der Leitfaden hilft, und er bringt kein Übertreiben bei. So sieht ein Plan aus, der hält.")
          : !measFirst
            ? tt("The guide starts before any story is approved. Its link to the base is dashed: Neisse would pay for a tool and never know whether it works. The fix is the order: the approved stories and KPIs first.", "Der Leitfaden startet, bevor eine Story freigegeben ist. Seine Verbindung zur Basis ist gestrichelt: Neisse würde für ein Werkzeug zahlen und nie wissen, ob es wirkt. Die Lösung ist die Reihenfolge: zuerst freigegebene Storys und KPIs.")
            : tt("It tells approved stories, but its claims are only 75% backed, below the 80% a story tool should start on. It would teach overclaiming. The fix is to back the claims first, or to hold the tool back until they are.", "Er erzählt freigegebene Storys, aber seine Aussagen sind nur zu 75 % belegt, unter den 80 %, auf denen ein Story-Tool starten sollte. Er würde Übertreiben beibringen. Die Lösung ist, zuerst die Aussagen zu belegen oder das Werkzeug zurückzuhalten, bis sie es sind.")}
      </Insight>
    </div>
  );
}
