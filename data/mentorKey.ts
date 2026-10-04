import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_COMPS, MODEL_GREATEST, OWNER_ACCEPT_LOGIC, R2_BUDGET, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER } from "@/data/route2Panel";
import type { Criterion, LogicRow, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["stories", "types", "training"];

/** The model reason for the two judged scores of each model measure (CLAUDE.md #45): effect, scalability, and a printed fact. */
const MEASURE_REASON: Record<string, () => string> = {
  stories: () =>
    tt(
      "Effect 3: a real firm like the prospect's makes the benefit felt and makes the offer different from the next one. Persuasiveness 3: the customers approved the six cases, so a buyer can believe them, and the card says 6 weeks.",
      "Wirkung 3: Eine echte Firma wie die des Interessenten macht den Nutzen spürbar und unterscheidet das Angebot vom nächsten. Überzeugungskraft 3: Die Kunden haben die sechs Fälle freigegeben, also kann ein Käufer ihnen glauben, und die Karte nennt 6 Wochen.",
    ),
  types: () =>
    tt(
      "Effect 3: each customer hears what matters to their type, which makes an offer stand out and close. Persuasiveness 3: the guide leads with the proof that type trusts, and the card says 4 weeks.",
      "Wirkung 3: Jeder Kunde hört, was seinem Typ wichtig ist, und das hebt ein Angebot heraus und bringt es zum Abschluss. Überzeugungskraft 3: Der Leitfaden beginnt mit dem Beleg, dem dieser Typ vertraut, und die Karte nennt 4 Wochen.",
    ),
  training: () =>
    tt(
      "Effect 2: it changes every meeting, but its effect depends on each salesperson using it. Persuasiveness 3: role plays let each person practise telling a believable story, and the card says 6 weeks.",
      "Wirkung 2: Es ändert jedes Gespräch, aber seine Wirkung hängt davon ab, ob jeder Vertriebsmitarbeiter es nutzt. Überzeugungskraft 3: Rollenspiele lassen jeden üben, eine glaubwürdige Story zu erzählen, und die Karte nennt 6 Wochen.",
    ),
};

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "In conversation A the salesperson answers the question about security with the list of certificates, so the customer hears ISO numbers instead of hearing that their data stayed safe for a hospital like theirs during last year's attacks.",
      "In Gespräch A beantwortet der Vertriebsmitarbeiter die Frage nach Sicherheit mit der Liste der Zertifikate, sodass der Kunde ISO-Nummern hört, statt zu hören, dass die Daten eines Krankenhauses wie seinem bei den Angriffen im letzten Jahr sicher blieben.",
    ),
    meaning: tt(
      `Offers presented with benefit and a customer story closed at ${FORECAST.f1}% against ${FORECAST.controlRate}%, ${FORECAST.f2} times as often, so SalesTech should test a story opening fairly before every offer starts with one, because salespeople may have told stories only in the offers they expected to win.`,
      `Mit Nutzen und Kunden-Story präsentierte Angebote schlossen zu ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} % ab, ${num(FORECAST.f2)}-mal so oft, also sollte SalesTech einen Story-Einstieg fair testen, bevor jedes Angebot mit einer Story beginnt, weil die Vertriebsleute Storys vielleicht nur bei den Angeboten erzählten, bei denen sie mit einem Abschluss rechneten.`,
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
      "1) Close rate of offers (outcome), from the CRM, aim: up, above today's rate. 2) Share of first meetings that lead to a second meeting (driver), from the CRM, aim: up. 3) Customers who say they were promised something the product cannot do (guardrail), from the follow-up call, aim: stay under a limit.",
      "1) Abschlussquote der Angebote (Outcome), aus dem CRM, Ziel: hoch, über der heutigen Quote. 2) Anteil der Erstgespräche, die zu einem zweiten Gespräch führen (Treiber), aus dem CRM, Ziel: hoch. 3) Kunden, die sagen, ihnen sei etwas versprochen worden, das das Produkt nicht kann (Guardrail), aus dem Nachgespräch, Ziel: unter einer Grenze bleiben.",
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
    reasons: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_REASON[id]()])) as Record<string, string>,
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
    tier: { ...MODEL_TIER },
    vision: tt(
      "SalesTech sells every product through the customer's own benefit: every conversation starts from a story the customer approved, and the company steers by three KPIs. Every new tool has to move one of them before it grows, so stories and results grow together.",
      "SalesTech verkauft jedes Produkt über den eigenen Nutzen des Kunden: Jedes Gespräch beginnt bei einer Story, die der Kunde freigegeben hat, und das Unternehmen steuert über drei KPIs. Jedes neue Werkzeug muss einen davon bewegen, bevor es wächst, sodass Storys und Ergebnisse gemeinsam wachsen.",
    ),
    giveUp: tt(
      `The plan gives me an approved story library with the KPIs, a reference programme so customers confirm the stories on a call, the story field in the CRM with a monthly review, a proof pack for cautious customers and the conversation guides on claims that are well backed. The training starts once the reference programme is in use. It costs me the AI pitch generator and the image campaign, which name no KPI and arrive only in month 5. ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} stay unspent. If the backing turns out weaker, the guides rest on claims below 80% backed, so I watch them first.`,
      `Der Plan gibt mir eine freigegebene Story-Bibliothek mit den KPIs, ein Referenzkundenprogramm, damit Kunden die Storys in einem Gespräch bestätigen, das Story-Feld im CRM mit einem monatlichen Review, ein Beleg-Paket für vorsichtige Kunden und die Gesprächsleitfäden auf gut belegten Aussagen. Das Training startet, sobald das Referenzkundenprogramm im Einsatz ist. Er kostet mich den KI-Pitch-Generator und die Imagekampagne, die keinen KPI nennen und erst in Monat 5 ankommen. ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} bleiben ungenutzt. Fällt der Beleg schwächer aus, beruhen die Leitfäden auf Aussagen unter 80 % belegt, also beobachte ich sie zuerst.`,
    ),
    decision: "stage",
    decisionWhy: tt(
      "It is the decision the brief asks for despite unclear customer reactions: change real conversations within weeks where the claims are backed, with the guides for the security- and relationship-oriented types, and measure from the first week through the KPIs. The training waits until customers confirm the stories, and the pitch generator and the image campaign stay out because neither names a KPI and both arrive after the four months.",
      "Es ist die Entscheidung, die der Auftrag trotz unklarer Kundenreaktionen verlangt: innerhalb von Wochen echte Gespräche ändern, dort wo die Aussagen belegt sind, mit den Leitfäden für die sicherheits- und beziehungsorientierten Typen, und ab der ersten Woche über die KPIs messen. Das Training wartet, bis Kunden die Storys bestätigen, und Pitch-Generator und Imagekampagne bleiben draußen, weil keiner einen KPI nennt und beide nach den vier Monaten ankommen.",
    ),
    watch: tt(
      "I watch the share of customers who can repeat the benefit: today it is 35%, and if it is not clearly above that by month 3 on enough meetings, I stop adding story tools and rewrite the guides with the salespeople. I also watch the claims behind the guides: if they stay below 80% backed, I pause the guides until more customers have approved their stories.",
      "Ich beobachte den Anteil der Kunden, die den Nutzen wiedergeben können: Heute liegt er bei 35 %, und liegt er bis Monat 3 bei genug Gesprächen nicht deutlich darüber, höre ich auf, Story-Tools hinzuzufügen, und schreibe die Leitfäden mit den Vertriebsmitarbeitenden neu. Ich beobachte auch die Aussagen hinter den Leitfäden: Bleiben sie unter 80 % belegt, pausiere ich die Leitfäden, bis mehr Kunden ihre Storys freigegeben haben.",
    ),
  };
}
