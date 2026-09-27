import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { COMP_BY_ID, MODEL_ARCH, MODEL_COMPS, MODEL_GREATEST, MODEL_START, MODEL_TRIGGER, MODEL_TRIPWIRE, OWNER_ACCEPT, OWNER_ACCEPT_LOGIC, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import type { Criterion, LogicRow, OwnerId, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["stories", "types", "training"];

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "In conversation A the salesperson answers the question about security with the list of certificates, so the customer hears ISO numbers instead of hearing that their data stayed safe for a hospital like theirs during last year's attacks.",
      "In Gespräch A beantwortet der Vertriebsmitarbeiter die Frage nach Sicherheit mit der Liste der Zertifikate, sodass der Kunde ISO-Nummern hört, statt zu hören, dass die Daten eines Krankenhauses wie seinem bei den Angriffen im letzten Jahr sicher blieben.",
    ),
    fig: { F1: String(FORECAST.f1), F2: String(FORECAST.f2), F3: String(FORECAST.f3) },
    meaning: tt(
      `Offers presented with the benefit and a customer story closed at ${FORECAST.f1}% against ${FORECAST.controlRate}%, ${FORECAST.f2} times as often. Across ${num(PILOT.yearly)} offers a year that is about ${euro(FORECAST.f3)}, so SalesTech should open every offer with the benefit and a matching story, and test it fairly, because salespeople may have told stories mainly to the warmer prospects.`,
      `Angebote mit Nutzen und Kunden-Story schlossen zu ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} % ab, ${num(FORECAST.f2)}-mal so oft. Bei ${num(PILOT.yearly)} Angeboten pro Jahr sind das etwa ${euro(FORECAST.f3)}, also sollte SalesTech jedes Angebot mit dem Nutzen und einer passenden Story eröffnen und das fair testen, weil Vertriebsleute Storys vielleicht vor allem den wärmeren Interessenten erzählten.`,
    ),
    valuable: [...VALUABLE_TRUTH],
    churners: [...CHURN_TRUTH],
    insights: [
      { basis: "respond" as Basis, text: tt("Instead of “automatic failover across three zones”, the salesperson says at the start: if one data centre fails, your accounting keeps working, so the customer hears at once what changes for them.", "Statt „automatisches Failover über drei Zonen“ sagt der Vertriebsmitarbeiter gleich zu Beginn: Fällt ein Rechenzentrum aus, arbeitet Ihre Buchhaltung weiter, sodass der Kunde sofort hört, was sich für ihn ändert.") },
      { basis: "personal" as Basis, text: tt("After the price, the salesperson tells how a tax firm of the same size has not lost an hour since switching, so the customer can picture a firm like theirs succeeding.", "Nach dem Preis erzählt der Vertriebsmitarbeiter, wie eine Steuerkanzlei gleicher Größe seit dem Wechsel keine Stunde verloren hat, sodass sich der Kunde eine Firma wie seine beim Gelingen vorstellen kann.") },
      { basis: "learn" as Basis, text: tt("When the customer asks about the move, the salesperson names the worry and offers to start with one department first, so the customer feels safe instead of pushed.", "Fragt der Kunde nach dem Umstieg, benennt der Vertriebsmitarbeiter die Sorge und bietet an, mit einer Abteilung zu beginnen, sodass sich der Kunde sicher statt gedrängt fühlt.") },
    ],
    reflect: {
      interpret: tt("Stories work more strongly than arguments because the customer pictures a firm like theirs and argues against it less. Information tells what the product is; emotion tells whether it is safe, and people decide on the second and check with the first.", "Storys wirken stärker als Argumente, weil sich der Kunde eine Firma wie seine vorstellt und weniger widerspricht. Information sagt, was das Produkt ist; Emotion sagt, ob es sicher ist, und Menschen entscheiden nach dem Zweiten und prüfen mit dem Ersten."),
      causation: tt("Conversation A is too technical at the start and at every question: it answers with features where the customer asked about risk. I would adapt it to the type: proof and a safe first step for a security-oriented customer, value against price for a price-oriented one.", "Gespräch A ist zu Beginn und bei jeder Frage zu technisch: Es antwortet mit Features, wo der Kunde nach Risiko fragte. Ich würde es an den Typ anpassen: Belege und ein sicherer erster Schritt für einen sicherheitsorientierten Kunden, Wert gegenüber Preis für einen preisorientierten."),
      decider: tt("A top sales manager opens with the customer's problem, tells a true story of a customer like them, gives the proof the type needs, and never promises what the product cannot keep: authentic, not manipulative.", "Eine Top-Vertriebsleiterin beginnt mit dem Problem des Kunden, erzählt eine wahre Story eines ähnlichen Kunden, liefert den Beleg, den der Typ braucht, und verspricht nie, was das Produkt nicht halten kann: authentisch, nicht manipulativ."),
    },
    tags: Object.fromEntries(RECORDS.map((r) => [r.id, r.truth])) as Record<RecId, PatternId>,
    unc: ["sample", "cause", "missing", "shift"] as UncId[],
    rows: Object.fromEntries(PATTERN_IDS.map((x) => [x, { risk: riskOf(TRUTH_LEFT[x], TRUTH_COUNTS[x]), meaning: MEANING_TRUTH[x], measure: MEASURE_TRUTH[x] }])) as Record<PatternId, PatternRow>,
    misread: tt(
      "1) Close rate of offers (outcome), from the CRM, target 15% by month 3 against 12% today. 2) Share of offers with a customer story from the same industry (driver), from a CRM field, target 60% by month 2. 3) Customers who say they were promised something the product cannot do (guardrail), from the follow-up calls, must stay below 2 per 100 deals.",
      "1) Abschlussquote der Angebote (Outcome), aus dem CRM, Ziel 15 % bis Monat 3 gegenüber 12 % heute. 2) Anteil der Angebote mit einer Kunden-Story aus derselben Branche (Treiber), aus einem CRM-Feld, Ziel 60 % bis Monat 2. 3) Kunden, die sagen, ihnen sei etwas versprochen worden, das das Produkt nicht kann (Guardrail), aus den Nachgesprächen, muss unter 2 pro 100 Abschlüsse bleiben.",
    ),
    ab: {
      ...AB_MODEL,
      hyp: tt("If the first meeting opens with a customer story from the same industry instead of the feature list, then more offers close, because the customer understands the benefit through a firm like theirs.", "Wenn das Erstgespräch mit einer Kunden-Story aus derselben Branche statt der Feature-Liste beginnt, dann schließen mehr Angebote ab, weil der Kunde den Nutzen an einer Firma wie seiner versteht."),
      rule: tt("Roll out if the close rate is at least 10% higher than the control group with 100 decisions per group and no more than 2 customers per 100 say a story was exaggerated; keep testing if 3 to 10% higher; stop if less than 3% higher.", "Ausrollen, wenn die Abschlussquote bei 100 Entscheidungen pro Gruppe mindestens 10 % über der Kontrollgruppe liegt und höchstens 2 von 100 Kunden sagen, eine Story sei übertrieben; weiter testen bei 3 bis 10 % darüber; stoppen bei weniger als 3 % darüber."),
    },
    chosen: [...MODEL_MEASURES],
    aims: Object.fromEntries(MODEL_MEASURES.map((id) => [id, [...MEASURE_BY_ID[id].targets]])) as Record<string, ProblemId[]>,
    exp: Object.fromEntries(MODEL_MEASURES.map((id) => [id, explainBucket(MEASURE_BY_ID[id].evidence)])) as Record<string, Score>,
    fea: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.feasibility])) as Record<string, Score>,
    eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])) as Record<string, Score>,
    order: [...MODEL_ORDER],
    why: tt(
      "The story library goes first: it scores 27, it is what the customer hears in every offer, and the guides and the training use it. The guides per customer type come second, because they make the same stories fit four kinds of customer, where offers with a story closed 2.2 times as often. The training comes third, from week 6, to put both into every conversation. The three cost €75,000 of the €90,000; the brochure, the video and the fair stand are left out because the customer would hear features again, and the discount because it teaches customers to compare on price.",
      "Die Story-Bibliothek kommt zuerst: Sie erzielt 27, sie ist, was der Kunde in jedem Angebot hört, und Leitfäden und Training nutzen sie. Die Leitfäden pro Kundentyp kommen als Zweites, weil sie dieselben Storys zu vier Arten von Kunden passen lassen, wo Angebote mit Story 2,2-mal so oft abschlossen. Das Training kommt als Drittes, ab Woche 6, um beides in jedes Gespräch zu bringen. Die drei kosten 75.000 € von 90.000 €; Broschüre, Video und Messestand bleiben draußen, weil der Kunde wieder Features hören würde, und der Rabatt, weil er Kunden lehrt, über den Preis zu vergleichen.",
    ),
  };
}

export function KEY_R2(): Partial<R2State> {
  const rate: Record<string, Score> = {};
  for (const id of MODEL_COMPS) for (const c of ["explain", "timely", "reach", "scale"] as Criterion[]) rate[`${id}.${c}`] = COMP_BY_ID[id].model[c];
  const logic: Record<string, LogicRow> = {};
  for (const s of SITUATIONS) logic[s.id] = { action: actionOf(s), owner: OWNER_ACCEPT_LOGIC[s.id][0] };
  return {
    principles: ["defs", "rules", "review"],
    principleText: {
      defs: tt("Every conversation starts from what changes for the customer, and the features follow as proof; this answers “customers don't understand the benefit”.", "Jedes Gespräch beginnt bei dem, was sich für den Kunden ändert, und die Features folgen als Beleg; das beantwortet „Kunden verstehen den Nutzen nicht“."),
      rules: tt("Each story has a version for the security-, innovation-, price- and relationship-oriented customer, so SalesTech sounds different from competitors who pitch the same features to everyone; this answers the strong competition.", "Jede Story hat eine Version für den sicherheits-, innovations-, preis- und beziehungsorientierten Kunden, sodass SalesTech anders klingt als Wettbewerber, die allen dieselben Features vorstellen; das beantwortet den starken Wettbewerb."),
      review: tt("Every month the same KPIs decide which approach is rolled out, tested further or stopped, so the strategy learns what works per customer type instead of relying on opinions.", "Jeden Monat entscheiden dieselben KPIs, welcher Ansatz ausgerollt, weiter getestet oder gestoppt wird, sodass die Strategie lernt, was pro Kundentyp wirkt, statt sich auf Meinungen zu verlassen."),
    },
    sources: Object.fromEntries(SOURCES.map((s) => [s.id, useOf(s)])) as Record<string, Use>,
    comps: [...MODEL_COMPS],
    rate,
    greatest: MODEL_GREATEST,
    greatestWhy: tt(
      "The share of offers with a customer story matched to the customer type is the driver the brief names (customers don't understand the benefit). It is linked to deals, moves the week the team changes its pitch, covers every offer and is counted in the CRM, so every approach can be steered by it within weeks.",
      "Der Anteil der Angebote mit einer zum Kundentyp passenden Kunden-Story ist der Treiber, den der Auftrag nennt (Kunden verstehen den Nutzen nicht). Er ist mit Abschlüssen verbunden, bewegt sich in der Woche, in der das Team seinen Pitch ändert, deckt jedes Angebot ab und wird im CRM gezählt, sodass sich jeder Ansatz innerhalb von Wochen daran steuern lässt.",
    ),
    logic,
    alloc: Object.fromEntries(MODEL_ARCH.map((id) => [id, true])),
    start: { ...MODEL_START } as Record<string, number>,
    owner: Object.fromEntries(MODEL_ARCH.map((id) => [id, OWNER_ACCEPT[id][0]])) as Record<string, OwnerId>,
    trigger: Object.fromEntries(MODEL_ARCH.map((id) => [id, MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER]])) as Record<string, string>,
    postponed: tt(
      "The AI pitch generator (€50,000) is left out: the six funded items cost €120,000 of the €130,000, the generator would push the plan €40,000 over, and nobody at SalesTech could check the claims it writes, which risks exactly the lack of credibility we must avoid. The image campaign (€60,000) makes SalesTech known, not understood.",
      "Der KI-Pitch-Generator (50.000 €) bleibt draußen: Die sechs finanzierten Punkte kosten 120.000 € von 130.000 €, der Generator brächte den Plan 40.000 € über das Budget, und niemand bei SalesTech könnte die Behauptungen prüfen, die er schreibt; das riskiert genau die fehlende Glaubwürdigkeit, die wir vermeiden müssen. Die Imagekampagne (60.000 €) macht SalesTech bekannt, nicht verstanden.",
    ),
    pickup: tt(
      "If the close rate reaches 15% by month 4, we look again at an AI tool that drafts stories from approved cases only, for the next half-year.",
      "Erreicht die Abschlussquote bis Monat 4 15 %, prüfen wir für das nächste Halbjahr erneut ein KI-Werkzeug, das Storys nur aus freigegebenen Fällen entwirft.",
    ),
    decision: "stage",
    assumptions: [
      tt("The story itself raises the close rate, not only the choice of warm prospects. This is wrong if a random-split test shows less than 1.2 times the close rate for the story opening on 100 decisions per group by month 3.", "Die Story selbst erhöht die Abschlussquote, nicht nur die Auswahl warmer Interessenten. Das ist falsch, wenn ein Test mit zufälliger Aufteilung bis Monat 3 bei 100 Entscheidungen pro Gruppe weniger als das 1,2-Fache der Abschlussquote für den Story-Einstieg zeigt."),
      tt("Security-oriented customers accept a story if it comes with proof. This is wrong if more than 2 customers per month say a story sounded exaggerated.", "Sicherheitsorientierte Kunden akzeptieren eine Story, wenn sie mit Beleg kommt. Das ist falsch, wenn mehr als 2 Kunden pro Monat sagen, eine Story klinge übertrieben."),
      tt("The salespeople will use the guides. This is wrong if fewer than 60% of offers use the guide of the customer's type by month 2.", "Die Vertriebsleute werden die Leitfäden nutzen. Das ist falsch, wenn bis Monat 2 weniger als 60 % der Angebote den Leitfaden des Kundentyps nutzen."),
    ],
    tripKpi: MODEL_TRIPWIRE.kpi,
    tripThreshold: String(MODEL_TRIPWIRE.threshold),
    tripMonth: MODEL_TRIPWIRE.month,
    tripAction: "adjust",
    challenge: tt(
      "I keep the stories and fix the ones that sounded exaggerated. The stories work where they were built: second meetings rose from 30% to 45%, the earliest sign. 12% to 13% after two months rests on too few decisions to judge; the tripwire of 15% in month 4 decides. First I check which two stories were called exaggerated and whether they had the proof the customer type needs. The one change: every story carries its proof (the figure, the reference call) before it is told again. Going back to features brings back the problem we started with; an AI generator would produce more unchecked claims, the opposite of credibility.",
      "Ich behalte die Storys und korrigiere die, die übertrieben klangen. Die Storys wirken, wo sie aufgebaut wurden: Zweite Gespräche stiegen von 30 % auf 45 %, das früheste Zeichen. 12 % zu 13 % nach zwei Monaten beruhen auf zu wenigen Entscheidungen für ein Urteil; der Tripwire von 15 % in Monat 4 entscheidet. Zuerst prüfe ich, welche zwei Storys als übertrieben galten und ob sie den Beleg hatten, den der Kundentyp braucht. Die eine Änderung: Jede Story trägt ihren Beleg (die Zahl, das Referenzgespräch), bevor sie wieder erzählt wird. Zurück zu Features bringt das Problem zurück, mit dem wir begannen; ein KI-Generator würde mehr ungeprüfte Behauptungen erzeugen, das Gegenteil von Glaubwürdigkeit.",
    ),
  };
}
