"use client";

import { useId, useState } from "react";
import { Insight, Toggles } from "@/components/materi/kit";
import { LEVEL_LABEL } from "@/data/ladder";
import type { LevelTag } from "@/data/ladder";
import { MOSEL, MOSEL_RESULT, extraOf } from "@/data/forecast";
import { PATTERNS } from "@/data/patterns";
import type { PatternId } from "@/data/patterns";
import { JOINS_LABEL, bandOf, explainBucket } from "@/data/measures";
import type { Joins } from "@/data/measures";
import { bi, euro, num, pct, t, tt } from "@/lib/lang";

/**
 * The interactive diagrams of Materi A (Route 1). Every one uses the worked-example company Havel Software (a Potsdam software firm,
 * Case assumption), never SalesTech, so the answer to a task block is never printed. Every control is followed by an always-visible
 * "What this shows" (CLAUDE.md #20). (Export names are kept from the file this was built from.)
 */
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", rust: "#A4472A", rustSoft: "#F6E3DB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6" };

/* ------------------------------------------------------------------ A1 · what decides a purchase: the four emotional triggers */

type Band = "trust" | "security" | "status" | "belonging" | "features";
const BANDS: Band[] = ["trust", "security", "status", "belonging", "features"];
const BAND = bi({
  trust: { label: t("Trust in the people", "Vertrauen in die Menschen"), rate: 34 as number, reading: t("Trust: “Do I believe these people will be there when something goes wrong?” The strongest reason Havel's customers gave. A salesperson earns it with honesty and a named contact, not with a feature list.", "Vertrauen: „Glaube ich, dass diese Leute da sind, wenn etwas schiefgeht?“ Der stärkste Grund, den die Kunden von Havel nannten. Ein Vertriebsmitarbeiter gewinnt es mit Ehrlichkeit und einer benannten Ansprechperson, nicht mit einer Feature-Liste.") },
  security: { label: t("Security: nothing goes wrong", "Sicherheit: nichts geht schief"), rate: 28 as number, reading: t("Security: “Will this put my job or my firm at risk?” Answered with proof, references and a safe first step, not with enthusiasm.", "Sicherheit: „Bringt das meinen Job oder meine Firma in Gefahr?“ Beantwortet mit Belegen, Referenzen und einem sicheren ersten Schritt, nicht mit Begeisterung.") },
  status: { label: t("Status: being seen as ahead", "Status: als vorn gesehen werden"), rate: 12 as number, reading: t("Status: “Will this make me look good to my boss or my peers?” Answered by showing what leading firms like theirs already do.", "Status: „Stehe ich damit vor meinem Chef oder Kollegen gut da?“ Beantwortet, indem man zeigt, was führende Firmen wie ihre schon tun.") },
  belonging: { label: t("Belonging: firms like mine use it", "Zugehörigkeit: Firmen wie meine nutzen es"), rate: 11 as number, reading: t("Belonging: “Do firms like mine choose this?” Answered by a customer story from their own industry and region.", "Zugehörigkeit: „Wählen Firmen wie meine das?“ Beantwortet durch eine Kunden-Story aus ihrer eigenen Branche und Region.") },
  features: { label: t("The technical features", "Die technischen Features"), rate: 15 as number, reading: t("Features came last: only 15% said the features decided it. Features are needed as proof, but they rarely carry the decision on their own.", "Features kamen zuletzt: Nur 15 % sagten, die Features hätten entschieden. Features braucht man als Beleg, aber sie tragen die Entscheidung selten allein.") },
});

export function DelayCost() {
  const uid = useId().replace(/:/g, "");
  const [band, setBand] = useState<Band>("trust");
  const b = BAND[band];
  const W = (r: number) => (r / 34) * 300;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 230" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Havel Software: what its customers said decided their purchase", "Havel Software: was nach Aussage der Kunden ihren Kauf entschied")}</title>
        <desc id={`${uid}-d`}>{BANDS.map((k) => `${BAND[k].label}: ${BAND[k].rate}%`).join(", ")}</desc>
        {BANDS.map((k, i) => {
          const y = 12 + i * 42;
          const on = k === band;
          const r = BAND[k].rate;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={BAND[k].label} onClick={() => setBand(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setBand(k)}>
              <text x="0" y={y + 19} fontSize="12" fontWeight={on ? 700 : 400} fill={C.ink}>{BAND[k].label}</text>
              <rect className="hit-shape" x="215" y={y} width={W(r)} height="28" fill={on ? C.gold : k === "features" ? C.grey : C.data} stroke={C.ink} />
              <text x={221 + W(r)} y={y + 19} fontSize="12.5" fontWeight="700" fill={C.ink}>{pct(r)}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<Band> label={tt("What decided the purchase", "Was den Kauf entschied")} value={band} onChange={setBand} options={BANDS.map((k) => ({ id: k, label: BAND[k].label }))} />
      <Insight>{b.reading}</Insight>
      <p className="text-caption text-ash">{tt("Illustration on Havel Software's customer interviews (Case assumption): 120 customers asked what decided their purchase. Dark bars are the four emotional triggers, the grey bar the features.", "Illustration mit den Kundeninterviews von Havel Software (Fallannahme): 120 Kunden wurden gefragt, was ihren Kauf entschied. Dunkle Balken sind die vier emotionalen Trigger, der graue Balken die Features.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A2 · one fact, three ways: feature, benefit, story */

type Depth = "none" | "fit" | "much";
const PRINCIPLE_IDS: LevelTag[] = ["respond", "personal", "learn"];
const DEPTHS: Depth[] = ["none", "fit", "much"];
const D_LABEL = bi({ none: t("Automatic backup", "Automatisches Backup"), fit: t("Reporting", "Reporting"), much: t("Updates", "Updates") });
const SHOWN = bi({
  respond: {
    none: t("“Incremental backups every 15 minutes, stored in two ISO 27001 data centres.”", "„Inkrementelle Backups alle 15 Minuten, gespeichert in zwei ISO-27001-Rechenzentren.“"),
    fit: t("“38 standard reports, export to Excel and PDF, scheduling included.”", "„38 Standardberichte, Export nach Excel und PDF, Zeitplanung inklusive.“"),
    much: t("“Monthly releases with automatic zero-downtime deployment.”", "„Monatliche Releases mit automatischem Deployment ohne Ausfallzeit.“"),
  },
  personal: {
    none: t("“If a laptop is stolen or a file deleted, you lose at most a quarter of an hour of work.”", "„Wird ein Laptop gestohlen oder eine Datei gelöscht, verlieren Sie höchstens eine Viertelstunde Arbeit.“"),
    fit: t("“Your month-end report is ready on the first of the month, without anyone building it by hand.”", "„Ihr Monatsbericht liegt am Ersten des Monats vor, ohne dass ihn jemand von Hand baut.“"),
    much: t("“Your team always works on the newest version and never has to stop for an update.”", "„Ihr Team arbeitet immer mit der neuesten Version und muss nie für ein Update anhalten.“"),
  },
  learn: {
    none: t("“An architect's office in Cottbus had a laptop stolen the night before a competition deadline. By nine the next morning the plans were back, and they handed in on time.”", "„Einem Architekturbüro in Cottbus wurde in der Nacht vor einer Wettbewerbsfrist ein Laptop gestohlen. Um neun am nächsten Morgen waren die Pläne zurück, und sie gaben pünktlich ab.“"),
    fit: t("“The finance lead of a Brandenburg dairy used to spend two days on the month-end report. Now she spends the first morning of the month talking about the numbers instead of building them.”", "„Die Finanzleiterin einer Brandenburger Molkerei brauchte früher zwei Tage für den Monatsbericht. Jetzt verbringt sie den ersten Morgen des Monats damit, über die Zahlen zu sprechen, statt sie zu bauen.“"),
    much: t("“A pharmacy group feared updates after an outage with its old supplier. After a year with us, their IT lead told us he no longer notices when an update happens.”", "„Eine Apothekengruppe fürchtete Updates nach einem Ausfall beim alten Anbieter. Nach einem Jahr bei uns sagte ihr IT-Leiter, er merke nicht mehr, wann ein Update passiert.“"),
  },
});
const READ = bi({
  respond: t("A feature describes the product. It is true and often impressive, but the customer has to work out alone what it means for them, and most do not.", "Ein Feature beschreibt das Produkt. Es ist wahr und oft beeindruckend, aber der Kunde muss allein herausfinden, was es für ihn bedeutet, und die meisten tun es nicht."),
  personal: t("A benefit says what changes for the customer: time, money, risk, effort. The same fact, now in the customer's words.", "Ein Nutzen sagt, was sich für den Kunden ändert: Zeit, Geld, Risiko, Aufwand. Dieselbe Tatsache, jetzt in den Worten des Kunden."),
  learn: t("A story shows the benefit happening to a real customer: a person, a problem, what was done and how it ended. The listener pictures it, remembers it and argues against it less.", "Eine Story zeigt den Nutzen bei einem echten Kunden: eine Person, ein Problem, was getan wurde, und wie es ausging. Der Zuhörer stellt es sich vor, erinnert sich und widerspricht weniger."),
});

const M_IDEAS = bi([
  { id: "a", text: t("“The tool supports role-based access with 12 permission levels.”", "„Das Werkzeug unterstützt rollenbasierte Zugriffe mit 12 Berechtigungsstufen.“"), tag: "respond" as LevelTag, why: t("The product is the subject, with a technical term and a number: a feature.", "Das Produkt ist das Subjekt, mit einem Fachbegriff und einer Zahl: ein Feature.") },
  { id: "b", text: t("“Your trainees only see what they need, so nobody can delete a client file by mistake.”", "„Ihre Auszubildenden sehen nur, was sie brauchen, sodass niemand aus Versehen eine Mandantenakte löscht.“"), tag: "personal" as LevelTag, why: t("The same access rights, said as what changes for the customer: a benefit.", "Dieselben Zugriffsrechte, gesagt als das, was sich für den Kunden ändert: ein Nutzen.") },
  { id: "c", text: t("“A tax office in Frankfurt (Oder) had a trainee delete a year of records. Since the switch, that has not happened once, and the partner stopped checking backups at night.”", "„In einer Steuerkanzlei in Frankfurt (Oder) löschte ein Auszubildender ein Jahr Unterlagen. Seit dem Wechsel ist das kein einziges Mal passiert, und der Partner hat aufgehört, nachts Backups zu prüfen.“"), tag: "learn" as LevelTag, why: t("A real customer, a problem, what changed and a feeling: a story.", "Ein echter Kunde, ein Problem, was sich änderte, und ein Gefühl: eine Story.") },
]);

export function MomentProfile() {
  const [v, setV] = useState<LevelTag>("personal");
  const [d, setD] = useState<Depth>("none");
  const [open, setOpen] = useState<string[]>([]);
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-3" role="img" aria-label={tt("One fact said three ways", "Eine Tatsache auf drei Arten gesagt")}>
        {PRINCIPLE_IDS.map((x) => (
          <div key={x} className={`rounded-md border px-3 py-2 text-caption ${x === v ? "border-accent bg-accentSoft" : "border-line bg-paper"} ${x === "respond" && x === v ? "border-dashed" : ""}`}>
            <p className="smallcaps">{LEVEL_LABEL[x]}</p>
            <p className="mt-1 text-ink">{SHOWN[x][d]}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<Depth> label={tt("Havel fact", "Tatsache bei Havel")} value={d} onChange={setD} options={DEPTHS.map((x) => ({ id: x, label: D_LABEL[x] }))} />
        <Toggles<LevelTag> label={tt("Way of saying it", "Art, es zu sagen")} value={v} onChange={setV} options={PRINCIPLE_IDS.map((x) => ({ id: x, label: LEVEL_LABEL[x] }))} />
      </div>
      <Insight>{`${D_LABEL[d]} · ${LEVEL_LABEL[v]}: ${READ[v]}`}</Insight>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("A worked sort: three sentences at Havel Software", "Eine Beispielsortierung: drei Sätze bei Havel Software")}</p>
        <ul className="space-y-1.5">
          {M_IDEAS.map((x) => {
            const on = open.includes(x.id);
            return (
              <li key={x.id} className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
                <p className="text-ink">{x.text}</p>
                <button type="button" aria-expanded={on} onClick={() => setOpen((o) => (on ? o.filter((y) => y !== x.id) : [...o, x.id]))} className="btn-ghost btn-sm mt-1">
                  {on ? tt("Hide", "Verbergen") : tt("Show the kind and why", "Art und Grund zeigen")}
                </button>
                {on && (
                  <p className="mt-1 text-ink">
                    <strong>{LEVEL_LABEL[x.tag]}.</strong> {x.why}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-caption text-ash">{tt("Illustration on Havel Software (Case assumption). A dashed frame marks the feature version: true, but it leaves the benefit to the customer.", "Illustration mit Havel Software (Fallannahme). Ein gestrichelter Rahmen markiert die Feature-Version: wahr, aber sie überlässt den Nutzen dem Kunden.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A3 · emotional customer types */

type Verdict = "respond" | "personal" | "neither";
type NPage = { id: string; name: string; leave: number; decision: boolean; known: 0 | 1 | 2; verdict: Verdict; why: string };
const N_PAGES: NPage[] = bi([
  { id: "n1", name: t("Insurance broker, head of IT", "Versicherungsmakler, IT-Leitung"), leave: 70, decision: true, known: 0 as const, verdict: "respond" as Verdict, why: t("70% of the questions are about details and risks, and they compare offers: security-oriented. Bring proof, references and a small first step.", "70 % der Fragen betreffen Details und Risiken, und sie vergleichen Angebote: sicherheitsorientiert. Bringen Sie Belege, Referenzen und einen kleinen ersten Schritt.") },
  { id: "n2", name: t("City administration", "Stadtverwaltung"), leave: 60, decision: true, known: 0 as const, verdict: "respond" as Verdict, why: t("60% detail and risk questions and a formal comparison of offers: security-oriented.", "60 % Detail- und Risikofragen und ein förmlicher Angebotsvergleich: sicherheitsorientiert.") },
  { id: "n3", name: t("Craft business, owner", "Handwerksbetrieb, Inhaber"), leave: 15, decision: false, known: 2 as const, verdict: "personal" as Verdict, why: t("Talks about the people and asks who will look after him: relationship-oriented. A story told by someone he trusts works best.", "Spricht über die Menschen und fragt, wer sich um ihn kümmert: beziehungsorientiert. Eine Story von jemandem, dem er vertraut, wirkt am besten.") },
  { id: "n4", name: t("Architecture firm, partner", "Architekturbüro, Partnerin"), leave: 25, decision: false, known: 2 as const, verdict: "personal" as Verdict, why: t("Wants to know who she will be working with: relationship-oriented.", "Will wissen, mit wem sie arbeiten wird: beziehungsorientiert.") },
  { id: "n5", name: t("Online retailer, CTO", "Onlinehändler, CTO"), leave: 60, decision: false, known: 1 as const, verdict: "neither" as Verdict, why: t("Many detailed questions, but about what is new, and no comparison: innovation-driven, not security-oriented. Show what others are not doing yet.", "Viele Detailfragen, aber über Neues, und kein Vergleich: innovationsgetrieben, nicht sicherheitsorientiert. Zeigen Sie, was andere noch nicht tun.") },
  { id: "n6", name: t("Car dealer group, purchasing", "Autohausgruppe, Einkauf"), leave: 30, decision: true, known: 0 as const, verdict: "neither" as Verdict, why: t("Compares offers and talks about terms, but few risk questions: price-oriented. Show the value against the price.", "Vergleicht Angebote und spricht über Konditionen, aber wenige Risikofragen: preisorientiert. Zeigen Sie den Wert gegenüber dem Preis.") },
]);
const VERDICT_LABEL = bi({ respond: t("Security-oriented", "Sicherheitsorientiert"), personal: t("Relationship-oriented", "Beziehungsorientiert"), neither: t("Another type (innovation or price)", "Ein anderer Typ (Innovation oder Preis)") });
const VERDICT_GLYPH: Record<Verdict, string> = { respond: "●", personal: "◐", neither: "○" };

export function AutomationGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState<string>("n1");
  const s = N_PAGES.find((x) => x.id === sel)!;
  const X = (l: number) => 60 + (l / 100) * 440;
  const Y = (k: number) => 250 - k * 85;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 300" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Havel Software's prospects by the share of detail and risk questions and what they talk about", "Interessenten von Havel Software nach dem Anteil an Detail- und Risikofragen und dem, worüber sie sprechen")}</title>
        <desc id={`${uid}-d`}>{`${s.name}: ${VERDICT_LABEL[s.verdict]}.`}</desc>
        <defs>
          <pattern id={`${uid}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" opacity="0.5" />
          </pattern>
        </defs>
        <rect x={X(0)} y="30" width={X(100) - X(0)} height="90" fill={C.tealSoft} opacity="0.7" />
        <rect x={X(50)} y="205" width={X(100) - X(50)} height="80" fill={`url(#${uid}-hatch)`} stroke={C.amber} />
        <rect x={X(0)} y="205" width={X(50) - X(0)} height="80" fill={C.mist} />
        <text x={X(75)} y="222" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.amber}>{tt("compares + 50% risk questions: security", "vergleicht + 50 % Risikofragen: Sicherheit")}</text>
        <text x={X(50)} y="46" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.teal}>{tt("talks about the people: relationship", "spricht über die Menschen: Beziehung")}</text>
        <line x1={X(50)} y1="205" x2={X(50)} y2="285" stroke={C.ash} strokeDasharray="4 3" />
        {[0, 25, 50, 75, 100].map((l) => (
          <text key={l} x={X(l)} y="298" textAnchor="middle" fontSize="11" fill={C.ash}>{pct(l)}</text>
        ))}
        {[tt("terms", "Konditionen"), tt("what is new", "Neues"), tt("people", "Menschen")].map((l, k) => (
          <text key={k} x="54" y={Y(k) + 4} textAnchor="end" fontSize="11" fill={C.ash}>{l}</text>
        ))}
        <text x="4" y="20" fontSize="11" fill={C.ash}>{tt("talks most about", "spricht vor allem über")}</text>
        {N_PAGES.map((x, i) => {
          const on = x.id === sel;
          const cx = X(x.leave);
          const cy = Y(x.known) + (x.known === 0 ? 10 : 0);
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              {x.decision ? <rect className="hit-shape" x={cx - (on ? 14 : 11)} y={cy - (on ? 14 : 11)} width={on ? 28 : 22} height={on ? 28 : 22} rx="3" fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" /> : <circle className="hit-shape" cx={cx} cy={cy} r={on ? 14 : 11} fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" />}
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={on ? C.ink : C.paper}>{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div role="group" aria-label={tt("Prospects", "Interessenten")} className="flex flex-wrap gap-2">
        {N_PAGES.map((x, i) => (
          <button key={x.id} type="button" aria-pressed={x.id === sel} onClick={() => setSel(x.id)} className={`btn btn-sm min-h-[40px] border ${x.id === sel ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash"}`}>
            {`${i + 1} · ${x.name}`}
          </button>
        ))}
      </div>
      <Insight>{`${s.name} · ${tt(`${s.leave}% detail and risk questions`, `${s.leave} % Detail- und Risikofragen`)} · ${s.decision ? tt("compares offers", "vergleicht Angebote") : tt("does not compare", "vergleicht nicht")} · ${VERDICT_GLYPH[s.verdict]} ${VERDICT_LABEL[s.verdict]}. ${s.why}`}</Insight>
      <p className="text-caption text-ash">{tt("Illustration on Havel Software (Case assumption). Squares compare several offers, circles do not. Hatched = security-oriented; teal = relationship-oriented; the rest are innovation- or price-oriented.", "Illustration mit Havel Software (Fallannahme). Quadrate vergleichen mehrere Angebote, Kreise nicht. Schraffiert = sicherheitsorientiert; teal = beziehungsorientiert; der Rest ist innovations- oder preisorientiert.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A4 · what a customer story is worth (Havel Software) */

export function PilotExample() {
  const uid = useId().replace(/:/g, "");
  const [yearly, setYearly] = useState(MOSEL.yearly);
  const r = MOSEL_RESULT;
  const extra = extraOf(yearly, r.rate, r.other, MOSEL.order);
  const W = (p: number) => (p / 25) * 300;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Havel Software: offers with benefit and story against technical offers", "Havel Software: Angebote mit Nutzen und Story gegen technische Angebote")}</title>
        <desc id={`${uid}-d`}>{tt(`With story ${r.rate}%, technical ${r.other}%, lift ${r.lift}.`, `Mit Story ${num(r.rate)} %, technisch ${num(r.other)} %, Lift ${num(r.lift)}.`)}</desc>
        <text x="0" y="36" fontSize="12" fill={C.ink}>{tt("With benefit and story", "Mit Nutzen und Story")}</text>
        <rect x="170" y="20" width={W(r.rate)} height="26" fill={C.data} stroke={C.ink} />
        <text x={176 + W(r.rate)} y="38" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.rate)} (${MOSEL.variant.orders} ${tt("of", "von")} ${num(MOSEL.variant.sent)})`}</text>
        <text x="0" y="86" fontSize="12" fill={C.ink}>{tt("Technical", "Technisch")}</text>
        <rect x="170" y="70" width={W(r.other)} height="26" fill={C.grey} stroke={C.ink} />
        <text x={176 + W(r.other)} y="88" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.other)} (${MOSEL.control.orders} ${tt("of", "von")} ${num(MOSEL.control.sent)})`}</text>
        <text x="170" y="128" fontSize="13" fontWeight="700" fill={C.amber}>{tt(`Lift = ${r.rate} ÷ ${r.other} = ${num(r.lift)} times as often`, `Lift = ${num(r.rate)} ÷ ${num(r.other)} = ${num(r.lift)}-mal so oft`)}</text>
      </svg>
      <div className="space-y-1.5">
        <label htmlFor={`${uid}-y`} className="smallcaps block">
          {tt(`Havel's offers a year: ${num(yearly)}`, `Angebote von Havel pro Jahr: ${num(yearly)}`)}
        </label>
        <input id={`${uid}-y`} type="range" min={200} max={3000} step={100} value={yearly} onChange={(e) => setYearly(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
      </div>
      <Insight>
        {tt(
          `${num(yearly)} offers × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} extra a year if every offer carried the benefit and a story. Only the difference counts: technical offers would have closed ${pct(r.other)} anyway. ${yearly === MOSEL.yearly ? "At 600 offers the example gives €216,000." : `More offers use the same lift more often: ${yearly > MOSEL.yearly ? "more" : "less"} extra revenue.`}`,
          `${num(yearly)} Angebote × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} zusätzlich pro Jahr, wenn jedes Angebot Nutzen und Story enthielte. Nur der Unterschied zählt: Technische Angebote hätten ohnehin ${pct(r.other)} abgeschlossen. ${yearly === MOSEL.yearly ? "Bei 600 Angeboten ergibt das Beispiel 216.000 €." : `Mehr Angebote nutzen denselben Lift öfter: ${yearly > MOSEL.yearly ? "mehr" : "weniger"} zusätzlicher Umsatz.`}`,
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A5 · a sales communication KPI tree (Havel Software) */

type MMetric = { id: string; name: string; kind: PatternId; moved: boolean; why: string };
const M_METRICS: MMetric[] = bi([
  { id: "rev", name: t("Revenue from new customers", "Umsatz mit Neukunden"), kind: "outcome" as PatternId, moved: true, why: t("Money: the result Havel is paid for. It moves last.", "Geld: das Ergebnis, für das Havel bezahlt wird. Es bewegt sich zuletzt.") },
  { id: "renew", name: t("Close rate of offers", "Abschlussquote der Angebote"), kind: "outcome" as PatternId, moved: true, why: t("Deals won: a result.", "Gewonnene Abschlüsse: ein Ergebnis.") },
  { id: "hist", name: t("Offers with a customer story", "Angebote mit Kunden-Story"), kind: "driver" as PatternId, moved: true, why: t("It comes before the deal and the sales team can raise it this month.", "Es kommt vor dem Abschluss, und das Vertriebsteam kann es diesen Monat steigern.") },
  { id: "multi", name: t("Customers who can repeat the benefit", "Kunden, die den Nutzen wiedergeben können"), kind: "driver" as PatternId, moved: false, why: t("Understanding comes before the deal; it did not move with value last year, which is a finding, not another kind.", "Verständnis kommt vor dem Abschluss; es bewegte sich letztes Jahr nicht mit dem Wert, das ist ein Befund, keine andere Art.") },
  { id: "repeat", name: t("Promises the product cannot keep", "Versprechen, die das Produkt nicht halten kann"), kind: "guardrail" as PatternId, moved: true, why: t("It must not rise while Havel makes its pitch more emotional.", "Sie dürfen nicht steigen, während Havel seinen Pitch emotionaler macht.") },
  { id: "channels", name: t("Slides in the deck", "Folien im Deck"), kind: "vanity" as PatternId, moved: false, why: t("It counts what Havel produced, not what customers understood.", "Es zählt, was Havel produziert hat, nicht was Kunden verstanden haben.") },
]);
const KIND_POS: Record<PatternId, { x: number; y: number }> = { outcome: { x: 150, y: 30 }, driver: { x: 150, y: 150 }, guardrail: { x: 420, y: 90 }, vanity: { x: 420, y: 230 } };
const KIND_DE: Record<PatternId, string> = { outcome: "ein Outcome-KPI", driver: "ein Treiber-KPI", guardrail: "eine Guardrail", vanity: "eine Vanity Metric" };

export function KpiTree() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("hist");
  const [past, setPast] = useState(false);
  const m = M_METRICS.find((x) => x.id === sel)!;
  const boxes = M_METRICS.map((x) => {
    const same = M_METRICS.filter((y) => y.kind === x.kind);
    const k = same.indexOf(x);
    const base = KIND_POS[x.kind];
    const w = same.length > 1 ? 130 : 140;
    return { x, bx: base.x - (same.length > 1 ? 140 : 70) + k * 150, by: base.y, w };
  });
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 300" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Havel Software's sales communication metrics as a KPI tree", "Die Kennzahlen der Vertriebskommunikation von Havel Software als KPI-Baum")}</title>
        <desc id={`${uid}-d`}>{`${m.name}: ${PATTERNS[m.kind].label}.`}</desc>
        <line x1="75" y1="78" x2="75" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="225" y1="78" x2="225" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="75" y1="114" x2="225" y2="114" stroke={C.ink} strokeWidth="1.6" />
        <rect x="340" y="80" width="190" height="72" rx="6" fill="none" stroke={C.amber} strokeDasharray="6 4" />
        <rect x="340" y="222" width="190" height="66" rx="6" fill="none" stroke={C.grey} strokeDasharray="3 4" />
        <text x="435" y="76" textAnchor="middle" fontSize="10.5" fill={C.amber}>{tt("guardrail: must not get worse", "Guardrail: darf nicht schlechter werden")}</text>
        <text x="435" y="218" textAnchor="middle" fontSize="10.5" fill={C.ash}>{tt("outside the tree: decides nothing", "außerhalb des Baums: entscheidet nichts")}</text>
        {boxes.map(({ x, bx, by, w }) => {
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              <rect className="hit-shape" x={bx} y={by} width={w} height="48" rx="6" fill={on ? C.soft : x.kind === "vanity" ? C.mist : C.paper} stroke={on ? C.amber : C.ink} strokeWidth={on ? 2.4 : 1.2} />
              <foreignObject x={bx + 4} y={by + 4} width={w - 8} height="40">
                <div style={{ fontSize: 11.5, lineHeight: 1.2, color: C.ink, textAlign: "center", fontFamily: "system-ui,sans-serif" }}>{x.name}</div>
              </foreignObject>
              {past && (
                <text x={bx + w - 6} y={by + 60} textAnchor="end" fontSize="10.5" fontWeight="700" fill={x.moved ? C.teal : C.ash}>{x.moved ? tt("● moved with value", "● mit dem Wert bewegt") : tt("○ did not move", "○ nicht bewegt")}</text>
              )}
            </g>
          );
        })}
        <text x="8" y="22" fontSize="10.5" fill={C.ash}>{tt("outcome", "Outcome")}</text>
        <text x="8" y="142" fontSize="10.5" fill={C.ash}>{tt("drivers", "Treiber")}</text>
      </svg>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<string> label={tt("Metric", "Kennzahl")} value={sel} onChange={setSel} options={M_METRICS.map((x) => ({ id: x.id, label: x.name }))} />
        <Toggles<string> label={tt("Last year", "Letztes Jahr")} value={past ? "on" : null} onChange={() => setPast((v) => !v)} options={[{ id: "on", label: past ? tt("Hide last year", "Letztes Jahr verbergen") : tt("Show whether it moved with value last year", "Zeigen, ob es sich letztes Jahr mit dem Wert bewegte") }]} />
      </div>
      <Insight>
        {past
          ? tt(
              `${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Last year it ${m.moved ? "moved" : "did not move"} with customer value. Both outcomes moved, one of two drivers, the guardrail moved, the vanity metric did not: the closer to the top of the tree, the stronger the link.`,
              `${m.name} ist ${KIND_DE[m.kind]}: ${m.why} Letztes Jahr ${m.moved ? "bewegte es sich" : "bewegte es sich nicht"} mit dem Kundenwert. Beide Outcomes bewegten sich, einer von zwei Treibern, die Guardrail bewegte sich, die Vanity Metric nicht: Je näher an der Spitze des Baums, desto stärker die Verbindung.`,
            )
          : tt(`${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Switch on “last year” to see which kinds move with customer value.`, `${m.name} ist ${KIND_DE[m.kind]}. ${m.why} Schalten Sie „letztes Jahr“ ein, um zu sehen, welche Arten sich mit dem Kundenwert bewegen.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A6 · a fair test of a story, and authenticity */

type Flaw = "none" | "two" | "time" | "peek";
const FLAWS = bi({
  none: { label: t("Fair test", "Fairer Test"), a: t("Feature opening · random half of new opportunities · weeks 1–8", "Feature-Einstieg · zufällige Hälfte der neuen Opportunities · Wochen 1–8"), b: t("Story opening · other half · weeks 1–8", "Story-Einstieg · andere Hälfte · Wochen 1–8"), reading: t("One change, a random split, the same weeks, a size fixed in advance: a difference between the groups can be put down to the story.", "Eine Änderung, eine zufällige Aufteilung, dieselben Wochen, eine vorab festgelegte Größe: Ein Unterschied zwischen den Gruppen lässt sich der Story zuschreiben.") },
  two: { label: t("Three changes at once", "Drei Änderungen auf einmal"), a: t("The old pitch · random half", "Der alte Pitch · zufällige Hälfte"), b: t("Story, lower price and a shorter offer · other half", "Story, niedrigerer Preis und kürzeres Angebot · andere Hälfte"), reading: t("The variant differs in three things. If it wins, nobody can say whether the story, the price or the length did it.", "Die Variante unterscheidet sich in drei Dingen. Gewinnt sie, kann niemand sagen, ob Story, Preis oder Länge es waren.") },
  time: { label: t("Compared with last quarter", "Mit dem Vorquartal verglichen"), a: t("Feature opening · all prospects · first quarter", "Feature-Einstieg · alle Interessenten · erstes Quartal"), b: t("Story opening · all prospects · second quarter", "Story-Einstieg · alle Interessenten · zweites Quartal"), reading: t("The groups are different quarters. A trade fair, a price change or budgets released in spring can explain the difference.", "Die Gruppen sind verschiedene Quartale. Eine Messe, eine Preisänderung oder im Frühjahr freigegebene Budgets können den Unterschied erklären.") },
  peek: { label: t("Salespeople choose who hears the story", "Vertriebsleute wählen, wer die Story hört"), a: t("Feature opening · prospects the salesperson finds cold", "Feature-Einstieg · Interessenten, die der Vertrieb kühl findet"), b: t("Story opening · prospects the salesperson finds warm", "Story-Einstieg · Interessenten, die der Vertrieb warm findet"), reading: t("The warm prospects would have bought more often anyway. The story gets the credit for the salesperson's good instinct.", "Die warmen Interessenten hätten ohnehin öfter gekauft. Die Story bekommt das Verdienst für das gute Gespür des Vertriebs.") },
});
const FLAW_IDS: Flaw[] = ["none", "two", "time", "peek"];
const rangeOf = (ctl: number, ratio: number) => {
  const se = Math.sqrt(1 / (ctl * ratio) + 1 / ctl);
  const r2 = (x: number) => Math.round(x * 100) / 100;
  return { lo: r2(Math.exp(Math.log(ratio) - 1.96 * se)), hi: r2(Math.exp(Math.log(ratio) + 1.96 * se)) };
};

export function FairTest() {
  const uid = useId().replace(/:/g, "");
  const [flaw, setFlaw] = useState<Flaw>("none");
  const [conv, setConv] = useState(30);
  const f = FLAWS[flaw];
  const ratio = 1.5;
  const { lo, hi } = rangeOf(conv, ratio);
  const X = (r: number) => 40 + ((r - 0.5) / 2.5) * 480;
  const zero = X(1);
  const proven = lo > 1;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
            <p className="smallcaps">{tt("Group A", "Gruppe A")}</p>
            <p className="text-ink">{f.a}</p>
          </div>
          <div className={`rounded-md border px-3 py-2 text-caption ${flaw === "none" ? "border-line bg-paper" : "border-dashed border-accent bg-accentSoft"}`}>
            <p className="smallcaps">{tt("Group B", "Gruppe B")}</p>
            <p className="text-ink">{f.b}</p>
          </div>
        </div>
        <Toggles<Flaw> label={tt("How Havel runs the test", "Wie Havel den Test durchführt")} value={flaw} onChange={setFlaw} options={FLAW_IDS.map((k) => ({ id: k, label: FLAWS[k].label }))} />
        <Insight>{f.reading}</Insight>
      </div>
      <div className="space-y-2">
        <svg viewBox="0 0 560 120" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
          <title id={`${uid}-t`}>{tt("How sure the test is: the range of uplifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Uplifts, mit denen das Ergebnis vereinbar ist")}</title>
          <desc id={`${uid}-d`}>{tt(`With ${conv} deals in the feature group, the uplift lies between ${num(lo)} and ${num(hi)} times.`, `Mit ${conv} Abschlüssen in der Feature-Gruppe liegt der Uplift zwischen dem ${num(lo)}- und dem ${num(hi)}-Fachen.`)}</desc>
          <line x1="40" y1="60" x2="520" y2="60" stroke={C.ash} />
          {[0.5, 1, 1.5, 2, 2.5, 3].map((v) => (
            <g key={v}>
              <line x1={X(v)} y1="55" x2={X(v)} y2="65" stroke={C.ash} />
              <text x={X(v)} y="84" textAnchor="middle" fontSize="11" fill={C.ash}>{`${num(v)}×`}</text>
            </g>
          ))}
          <line x1={zero} y1="20" x2={zero} y2="70" stroke={C.rust} strokeDasharray="4 3" />
          <text x={zero + 4} y="22" fontSize="10.5" fill={C.rust}>{tt("1× = no difference", "1× = kein Unterschied")}</text>
          <defs>
            <pattern id={`${uid}-h`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" />
            </pattern>
          </defs>
          <rect x={X(Math.max(lo, 0.5))} y="48" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5)))} height="24" fill={proven ? C.tealSoft : `url(#${uid}-h)`} stroke={proven ? C.teal : C.amber} />
          <circle cx={X(ratio)} cy="60" r="6" fill={C.data} stroke={C.ink} />
          <text x="40" y="110" fontSize="11.5" fill={C.ink}>{tt(`measured: 1.5× · plausible range ${num(lo)}× to ${num(hi)}×`, `gemessen: 1,5× · plausible Spanne ${num(lo)}× bis ${num(hi)}×`)}</text>
        </svg>
        <label htmlFor={`${uid}-c`} className="smallcaps block">
          {tt(`Deals in the feature group: ${conv} (the story group has 1.5 times as many)`, `Abschlüsse in der Feature-Gruppe: ${conv} (die Story-Gruppe hat 1,5-mal so viele)`)}
        </label>
        <input id={`${uid}-c`} type="range" min={10} max={300} step={10} value={conv} onChange={(e) => setConv(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
        <Insight>
          {proven
            ? tt(`With ${conv} deals per group, even the low end of the range (${num(lo)}×) is above “no difference”: the uplift is real, though its size is still uncertain (up to ${num(hi)}×). Around 100 per group is where a 1.5× result becomes solid.`, `Mit ${conv} Abschlüssen pro Gruppe liegt selbst das untere Ende der Spanne (${num(lo)}×) über „kein Unterschied“: Der Uplift ist echt, auch wenn seine Größe noch unsicher ist (bis ${num(hi)}×). Um 100 pro Gruppe wird ein Ergebnis von 1,5× belastbar.`)
            : tt(`With ${conv} deals per group, the same 1.5× could be anything from ${num(lo)}× to ${num(hi)}×, and the range still includes “no difference” (hatched). Promising, not proven: keep the test running, however good the dashboard looks.`, `Mit ${conv} Abschlüssen pro Gruppe könnte dasselbe 1,5× alles zwischen ${num(lo)}× und ${num(hi)}× sein, und die Spanne schließt „kein Unterschied“ noch ein (schraffiert). Vielversprechend, nicht bewiesen: Lassen Sie den Test weiterlaufen, egal wie gut das Dashboard aussieht.`)}
        </Insight>
      </div>
      <p className="text-caption text-ash">{tt("Illustration on Havel Software (Case assumption). The range is a standard approximation, shown so the effect of the sample size is visible; the task never asks you to compute it.", "Illustration mit Havel Software (Fallannahme). Die Spanne ist eine übliche Näherung, gezeigt, damit die Wirkung der Stichprobengröße sichtbar wird; die Aufgabe verlangt nie, sie zu berechnen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A7 · scoring: Havel's three measures */

type WM = { id: string; name: string; cost: number; joins: Joins; fea: 1 | 2 | 3; eff: 1 | 2 | 3; note: string };
const M_MEASURES: WM[] = bi([
  { id: "profile", name: t("Three customer stories for the main industries", "Drei Kunden-Storys für die Hauptbranchen"), cost: 18000, joins: "all" as Joins, fea: 3 as const, eff: 3 as const, note: t("The customer hears a real firm like theirs succeed: easy to understand, moving, and credible because the customers approved it.", "Der Kunde hört, wie eine echte Firma wie seine Erfolg hat: leicht zu verstehen, bewegend und glaubwürdig, weil die Kunden es freigegeben haben.") },
  { id: "bot", name: t("A free extra month for fast signers", "Ein Gratismonat für schnelle Unterzeichner"), cost: 20000, joins: "none" as Joins, fea: 2 as const, eff: 2 as const, note: t("It may speed up a few deals, but the customer hears a price, not a benefit, and learns to wait for the next offer.", "Es beschleunigt vielleicht ein paar Abschlüsse, aber der Kunde hört einen Preis, keinen Nutzen, und lernt, auf das nächste Angebot zu warten.") },
  { id: "am", name: t("A glossy brochure of every feature", "Eine Hochglanzbroschüre aller Features"), cost: 12000, joins: "none" as Joins, fea: 2 as const, eff: 1 as const, note: t("Beautiful and complete, but the customer still has to translate every feature into a benefit.", "Schön und vollständig, aber der Kunde muss jedes Feature weiter selbst in einen Nutzen übersetzen.") },
]);

export function ScoreExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("profile");
  const m = M_MEASURES.find((x) => x.id === sel)!;
  const e = explainBucket(bandOf(m.joins));
  const score = e * m.eff * m.fea;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 130" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Havel's three measures scored: effect × comprehensibility × persuasiveness", "Havels drei Maßnahmen bewertet: Wirkung × Verständlichkeit × Überzeugungskraft")}</title>
        <desc id={`${uid}-d`}>{M_MEASURES.map((x) => `${x.name}: ${explainBucket(bandOf(x.joins)) * x.eff * x.fea}`).join("; ")}</desc>
        {M_MEASURES.map((x, i) => {
          const s = explainBucket(bandOf(x.joins)) * x.eff * x.fea;
          const y = 12 + i * 38;
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && setSel(x.id)}>
              <text x="0" y={y + 17} fontSize="12" fontWeight={on ? 700 : 400} fill={C.ink}>{x.name}</text>
              <rect className="hit-shape" x="300" y={y} width={(s / 27) * 220} height="24" fill={on ? C.gold : C.data} stroke={C.ink} />
              <text x={306 + (s / 27) * 220} y={y + 17} fontSize="12.5" fontWeight="700" fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Measure", "Maßnahme")} value={sel} onChange={setSel} options={M_MEASURES.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
        {tt(
          `${m.name} (${euro(m.cost)}, the customer hears ${JOINS_LABEL[m.joins]}): effect ${m.eff} × comprehensibility ${e} × persuasiveness ${m.fea} = ${score}. ${m.note}`,
          `${m.name} (${euro(m.cost)}, der Kunde hört ${JOINS_LABEL[m.joins]}): Wirkung ${m.eff} × Verständlichkeit ${e} × Überzeugungskraft ${m.fea} = ${score}. ${m.note}`,
        )}
      </Insight>
    </div>
  );
}
