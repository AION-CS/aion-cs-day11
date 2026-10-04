import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4. Nine measures SalesTech could fund inside €90,000 and three months (the plan's framework). Costs and weeks are
 * Case assumptions. What each measure does is written without naming the problem it answers, so the learner has to match them
 * (Materi A7). The score is the plan's own evaluation: Effect × Comprehensibility × Persuasiveness. Comprehensibility follows from what the
 * customer hears (printed on each measure), so it is checkable; effect and persuasiveness are the learner's judgement. (Field names keep
 * the earlier ones: `exp` = Comprehensibility, `fea` = Persuasiveness, `eff` = Effect; `joins` is what the customer hears (all = a
 * customer story, one = the benefit in the customer's words, none = features, specifications or a price); `evidence` is its band;
 * `targets` are the problems a measure answers. The problem ids bounce/interaction/coordination now mean benefit not understood /
 * offers interchangeable / low close rate.)
 */
export type MeasureId = "stories" | "types" | "training" | "references" | "aipitch" | "brochure" | "discount" | "video" | "fair";
export const BUDGET = 90000;
export const MONTHS = 3;
export type Bucket = 1 | 2 | 3;

/**
 * The category printed after the weeks (CLAUDE.md #45): what kind of thing a measure is, taken from the storytelling theory of Materi A1 to A3 (a customer story, a message that fits the customer type, the skill of the team, proof from a real customer), or whether it only pushes features, a price or volume. A fact about the measure taken from those cards' own tests, never a
 * score and never the problem it answers (that stays the learner's job).
 */
export type MeasureArea = "story" | "types" | "skill" | "proof" | "tool" | "push";
export const MEASURE_AREA_LABEL = bi({
  story: t("A customer story", "Eine Kunden-Story"),
  types: t("Fit to the customer type", "Passend zum Kundentyp"),
  skill: t("Skill of the team", "Können des Teams"),
  proof: t("Proof from a real customer", "Beleg von einem echten Kunden"),
  tool: t("A generated message", "Eine erzeugte Nachricht"),
  push: t("Pushing: features, price or volume", "Drücken: Features, Preis oder Menge"),
});
export const AREA_NOTE = bi({
  v: t(
    "The brief names three problems: customers who do not understand the benefit, offers that look interchangeable and a low close rate. They call for explaining the benefit in a real customer's words or story, for fitting the message to the customer type, and for proof from real customers. A measure that only pushes features, a price or volume explains nothing new, and a tool that writes a pitch from a profile has no real case behind it.",
    "Der Auftrag nennt drei Probleme: Kunden, die den Nutzen nicht verstehen, Angebote, die austauschbar wirken, und eine niedrige Abschlussquote. Sie verlangen, den Nutzen in den Worten oder der Geschichte eines echten Kunden zu erklären, die Botschaft dem Kundentyp anzupassen und Belege von echten Kunden zu liefern. Eine Maßnahme, die nur Features, einen Preis oder Menge drückt, erklärt nichts Neues, und ein Werkzeug, das aus einem Profil einen Pitch schreibt, hat keinen echten Fall dahinter.",
  ),
});

export type ProblemId = "bounce" | "interaction" | "coordination";
export const PROBLEM_IDS: ProblemId[] = ["bounce", "interaction", "coordination"];
export const PROBLEM_LABEL = bi({
  bounce: t("Customers don't understand the benefit", "Kunden verstehen den Nutzen nicht"),
  interaction: t("Offers appear interchangeable", "Angebote wirken austauschbar"),
  coordination: t("Low close rate", "Niedrige Abschlussquote"),
});

export type Joins = "all" | "one" | "none";
export type Evidence = "fast" | "mid" | "slow";
export const bandOf = (j: Joins): Evidence => (j === "all" ? "fast" : j === "one" ? "mid" : "slow");
export const JOINS_LABEL = bi({
  all: t("a customer story", "eine Kunden-Story"),
  one: t("the benefit in the customer's words", "den Nutzen in den Worten des Kunden"),
  none: t("features, specifications or a price", "Features, Spezifikationen oder einen Preis"),
});
export const EVIDENCE_LABEL = bi({
  fast: t("the customer hears a customer story", "der Kunde hört eine Kunden-Story"),
  mid: t("the customer hears the benefit in their own words", "der Kunde hört den Nutzen in seinen eigenen Worten"),
  slow: t("the customer hears features, specifications or a price", "der Kunde hört Features, Spezifikationen oder einen Preis"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "fast" ? 3 : e === "mid" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Comprehensibility follows from what the customer hears, printed on each measure: a customer story scores 3, the benefit in the customer's words scores 2, features, specifications or a price score 1. A customer who has to translate a feature into a benefit on their own often does not.",
    "Die Verständlichkeit folgt aus dem, was der Kunde hört, gedruckt bei jeder Maßnahme: eine Kunden-Story ergibt 3, der Nutzen in den Worten des Kunden ergibt 2, Features, Spezifikationen oder ein Preis ergeben 1. Ein Kunde, der ein Feature selbst in einen Nutzen übersetzen muss, tut es oft nicht.",
  ),
});

export type Measure = {
  id: MeasureId;
  name: string;
  what: string;
  /** One concrete scene from SalesTech's day, and who does what (CLAUDE.md #46). */
  scene: string;
  who: string;
  area: MeasureArea;
  basis: string;
  joins: Joins;
  evidence: Evidence;
  cost: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

export const MEASURES: Measure[] = [];
const RAW = bi([
  {
    id: "stories" as MeasureId,
    name: t("A library of six customer stories", "Eine Bibliothek aus sechs Kunden-Storys"),
    what: t("Six real, approved customer cases, each told as problem → solution → benefit, one per main industry, for offers and meetings.", "Sechs echte, freigegebene Kundenfälle, jeder erzählt als Problem → Lösung → Nutzen, einer pro Hauptbranche, für Angebote und Gespräche."),
    scene: t("A prospect from a Kassel tax firm gets an offer that opens with a short story of another tax firm: what went wrong, what changed, and what the partner says now.", "Ein Interessent einer Kasseler Steuerkanzlei bekommt ein Angebot, das mit einer kurzen Story einer anderen Steuerkanzlei beginnt: was schiefging, was sich änderte und was der Partner heute sagt."),
    who: t("Marketing and sales write six cases with the customers' approval; every salesperson uses the one that fits the prospect's industry.", "Marketing und Vertrieb schreiben sechs Fälle mit Zustimmung der Kunden; jeder Vertriebsmitarbeiter nutzt den, der zur Branche des Interessenten passt."),
    area: "story" as MeasureArea,
    basis: t("The customer hears a customer story; ready after 6 weeks.", "Der Kunde hört eine Kunden-Story; fertig nach 6 Wochen."),
    joins: "all" as Joins,
    cost: 25000,
    weeks: 6,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("A real firm like theirs makes the benefit felt and makes SalesTech's offer different from the next one.", "Eine echte Firma wie ihre macht den Nutzen spürbar und unterscheidet das Angebot von SalesTech vom nächsten.") },
    verdict: t("A model measure: it answers the two problems the customer feels.", "Eine Modellmaßnahme: Sie beantwortet die beiden Probleme, die der Kunde spürt."),
  },
  {
    id: "types" as MeasureId,
    name: t("Conversation guides per customer type", "Gesprächsleitfäden pro Kundentyp"),
    what: t("For each of the four customer types: the questions to ask, the benefit to lead with, the proof to bring and the words to avoid.", "Für jeden der vier Kundentypen: die Fragen, die man stellt, der Nutzen, mit dem man beginnt, der Beleg, den man mitbringt, und die Worte, die man meidet."),
    scene: t("Before a call with a cost-conscious prospect the salesperson reads the one-page guide: ask about running costs first, bring a price comparison, never open with innovation.", "Vor einem Gespräch mit einem kostenbewussten Interessenten liest der Vertriebsmitarbeiter den einseitigen Leitfaden: zuerst nach den laufenden Kosten fragen, einen Preisvergleich mitbringen, nie mit Innovation beginnen."),
    who: t("Sales leadership writes four guides once; each salesperson picks the guide that fits the prospect's type.", "Die Vertriebsleitung schreibt vier Leitfäden einmal; jeder Vertriebsmitarbeiter wählt den Leitfaden, der zum Typ des Interessenten passt."),
    area: "types" as MeasureArea,
    basis: t("The customer hears the benefit in their own words; ready after 4 weeks.", "Der Kunde hört den Nutzen in seinen eigenen Worten; fertig nach 4 Wochen."),
    joins: "one" as Joins,
    cost: 20000,
    weeks: 4,
    targets: ["interaction", "coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("Each customer hears what matters to their type, which is what makes an offer stand out and close; it gives the benefit, not a story, so comprehensibility 2.", "Jeder Kunde hört, was seinem Typ wichtig ist, und das hebt ein Angebot heraus und bringt es zum Abschluss; es gibt den Nutzen, keine Story, daher Verständlichkeit 2.") },
    verdict: t("A model measure: it makes the same offer fit four different customers.", "Eine Modellmaßnahme: Sie lässt dasselbe Angebot zu vier verschiedenen Kunden passen."),
  },
  {
    id: "training" as MeasureId,
    name: t("Storytelling training with role plays", "Storytelling-Training mit Rollenspielen"),
    what: t("Two days for the whole sales team: turning features into benefits, telling a customer story in two minutes, and practising with each customer type.", "Zwei Tage für das ganze Vertriebsteam: Features in Nutzen übersetzen, eine Kunden-Story in zwei Minuten erzählen und mit jedem Kundentyp üben."),
    scene: t("In a role play two salespeople practise telling a two-minute customer story to a risk-averse buyer, and a colleague says which sentence still sounded like a feature.", "In einem Rollenspiel üben zwei Vertriebsmitarbeiter, einem risikoscheuen Käufer eine zweiminütige Kunden-Story zu erzählen, und ein Kollege sagt, welcher Satz noch wie ein Feature klang."),
    who: t("A trainer runs two days for the whole sales team; afterwards each salesperson uses it in their own meetings.", "Ein Trainer führt zwei Tage für das ganze Vertriebsteam durch; danach nutzt jeder Vertriebsmitarbeiter es in den eigenen Gesprächen."),
    area: "skill" as MeasureArea,
    basis: t("The customer hears a customer story; ready after 6 weeks.", "Der Kunde hört eine Kunden-Story; fertig nach 6 Wochen."),
    joins: "all" as Joins,
    cost: 30000,
    weeks: 6,
    targets: ["bounce", "coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It changes every meeting, but its effect depends on each salesperson using it, so effect 2.", "Es ändert jedes Gespräch, aber seine Wirkung hängt davon ab, ob jeder Vertriebsmitarbeiter es nutzt, daher Wirkung 2.") },
    verdict: t("A model measure: it puts the stories and guides into every conversation.", "Eine Modellmaßnahme: Sie bringt Storys und Leitfäden in jedes Gespräch."),
  },
  {
    id: "references" as MeasureId,
    name: t("Reference calls with existing customers", "Referenzgespräche mit Bestandskunden"),
    what: t("Prospects can call an existing customer of their industry before they decide.", "Interessenten können vor der Entscheidung einen Bestandskunden ihrer Branche anrufen."),
    scene: t("Before deciding, a dental group calls another dental group that already switched and asks what changed in daily work.", "Vor der Entscheidung ruft eine Zahnarztgruppe eine andere Zahnarztgruppe an, die schon gewechselt hat, und fragt, was sich im Arbeitsalltag änderte."),
    who: t("Account managers ask satisfied customers for permission; sales arranges the call.", "Account Manager fragen zufriedene Kunden um Erlaubnis; der Vertrieb vermittelt das Gespräch."),
    area: "proof" as MeasureArea,
    basis: t("The customer hears a customer story; ready after 2 weeks.", "Der Kunde hört eine Kunden-Story; fertig nach 2 Wochen."),
    joins: "all" as Joins,
    cost: 10000,
    weeks: 2,
    targets: ["interaction"] as ProblemId[],
    model: { feasibility: 2, effect: 2, note: t("Very credible, but only for the few prospects who take the call, and reference customers cannot be asked often.", "Sehr glaubwürdig, aber nur für die wenigen Interessenten, die anrufen, und Referenzkunden kann man nicht oft fragen.") },
    verdict: t("Not in the model three: 12 points. A strong add-on for security-oriented customers.", "Nicht unter den drei Modellmaßnahmen: 12 Punkte. Eine starke Ergänzung für sicherheitsorientierte Kunden."),
  },
  {
    id: "aipitch" as MeasureId,
    name: t("An AI tool that writes a pitch for every prospect", "Ein KI-Werkzeug, das für jeden Interessenten einen Pitch schreibt"),
    what: t("A tool writes a personal pitch from the prospect's website and social media profile.", "Ein Werkzeug schreibt aus Website und Social-Media-Profil des Interessenten einen persönlichen Pitch."),
    scene: t("The tool reads a prospect's website and writes a friendly pitch that mentions its latest blog post; nobody at SalesTech has checked whether the claims are true.", "Das Werkzeug liest die Website eines Interessenten und schreibt einen freundlichen Pitch, der den neuesten Blogbeitrag erwähnt; niemand bei SalesTech hat geprüft, ob die Aussagen stimmen."),
    who: t("A vendor supplies the tool; salespeople send what it writes.", "Ein Anbieter liefert das Werkzeug; Vertriebsmitarbeiter senden, was es schreibt."),
    area: "tool" as MeasureArea,
    basis: t("The customer hears the benefit in their own words; ready after 8 weeks.", "Der Kunde hört den Nutzen in seinen eigenen Worten; fertig nach 8 Wochen."),
    joins: "one" as Joins,
    cost: 40000,
    weeks: 8,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("Fast and personal-sounding, but generic claims and invented details cost credibility the moment the customer checks them.", "Schnell und persönlich klingend, aber allgemeine Behauptungen und erfundene Details kosten Glaubwürdigkeit, sobald der Kunde sie prüft.") },
    verdict: t("Rejected: 4 points. Persuasive on paper, not credible in a meeting.", "Verworfen: 4 Punkte. Überzeugend auf dem Papier, nicht glaubwürdig im Gespräch."),
  },
  {
    id: "brochure" as MeasureId,
    name: t("A new brochure with all technical specifications", "Eine neue Broschüre mit allen technischen Spezifikationen"),
    what: t("A 24-page brochure listing every feature, interface and certificate.", "Eine 24-seitige Broschüre mit jedem Feature, jeder Schnittstelle und jedem Zertifikat."),
    scene: t("A prospect receives a 24-page brochure of interfaces and certificates and has to work out alone what it means for the business.", "Ein Interessent erhält eine 24-seitige Broschüre mit Schnittstellen und Zertifikaten und muss allein herausfinden, was sie für das Geschäft bedeutet."),
    who: t("Marketing writes and prints it; the customer reads it alone.", "Das Marketing schreibt und druckt sie; der Kunde liest sie allein."),
    area: "push" as MeasureArea,
    basis: t("The customer hears features, specifications or a price; ready after 4 weeks.", "Der Kunde hört Features, Spezifikationen oder einen Preis; fertig nach 4 Wochen."),
    joins: "none" as Joins,
    cost: 15000,
    weeks: 4,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 1, note: t("More of conversation A in print: the benefit is still left to the customer.", "Mehr von Gespräch A in gedruckter Form: Den Nutzen muss sich der Kunde weiter selbst erschließen.") },
    verdict: t("Rejected: 1 point.", "Verworfen: 1 Punkt."),
  },
  {
    id: "discount" as MeasureId,
    name: t("10% discount for decisions within two weeks", "10 % Rabatt für Entscheidungen innerhalb von zwei Wochen"),
    what: t("Every offer carries a 10% discount if the customer signs within two weeks.", "Jedes Angebot enthält 10 % Rabatt, wenn der Kunde innerhalb von zwei Wochen unterschreibt."),
    scene: t("Every offer shows “10% off if you sign within two weeks”, also for customers who would have signed anyway.", "Jedes Angebot zeigt „10 % Rabatt bei Unterschrift innerhalb von zwei Wochen“, auch für Kunden, die ohnehin unterschrieben hätten."),
    who: t("Sales adds the line; finance pays the discount on every deal that uses it.", "Der Vertrieb fügt die Zeile hinzu; die Finanzabteilung zahlt den Rabatt bei jedem Abschluss, der ihn nutzt."),
    area: "push" as MeasureArea,
    basis: t("The customer hears features, specifications or a price; ready after 1 week.", "Der Kunde hört Features, Spezifikationen oder einen Preis; fertig nach 1 Woche."),
    joins: "none" as Joins,
    cost: 30000,
    weeks: 1,
    targets: ["coordination"] as ProblemId[],
    model: { feasibility: 2, effect: 2, note: t("It may speed up a few deals, but it teaches customers to compare on price, which makes offers look even more interchangeable.", "Es beschleunigt vielleicht ein paar Abschlüsse, lehrt Kunden aber, über den Preis zu vergleichen, und macht Angebote noch austauschbarer.") },
    verdict: t("Rejected: 4 points. It answers the close rate with price, not with benefit.", "Verworfen: 4 Punkte. Es beantwortet die Abschlussquote mit dem Preis, nicht mit dem Nutzen."),
  },
  {
    id: "video" as MeasureId,
    name: t("An animated video of the product features", "Ein animiertes Video der Produkt-Features"),
    what: t("A three-minute animation showing the platform's features.", "Eine dreiminütige Animation, die die Features der Plattform zeigt."),
    scene: t("A three-minute animation shows the platform's features one after another; a viewer sees what it can do, not what it does for them.", "Eine dreiminütige Animation zeigt die Features der Plattform nacheinander; ein Zuschauer sieht, was sie kann, nicht was sie für ihn tut."),
    who: t("An agency produces it; marketing posts it.", "Eine Agentur produziert sie; das Marketing stellt sie ein."),
    area: "push" as MeasureArea,
    basis: t("The customer hears features, specifications or a price; ready after 8 weeks.", "Der Kunde hört Features, Spezifikationen oder einen Preis; fertig nach 8 Wochen."),
    joins: "none" as Joins,
    cost: 35000,
    weeks: 8,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("Nicely made, but it shows the product, not what changes for the customer.", "Schön gemacht, aber es zeigt das Produkt, nicht was sich für den Kunden ändert.") },
    verdict: t("Rejected: 2 points.", "Verworfen: 2 Punkte."),
  },
  {
    id: "fair" as MeasureId,
    name: t("A trade fair stand with live product demos", "Ein Messestand mit Live-Produktdemos"),
    what: t("A stand at the regional IT fair with demos of every module.", "Ein Stand auf der regionalen IT-Messe mit Demos jedes Moduls."),
    scene: t("At the regional IT fair visitors queue at the stand to see each module demonstrated; most leave with a brochure.", "Auf der regionalen IT-Messe stehen Besucher am Stand an, um jedes Modul vorgeführt zu bekommen; die meisten gehen mit einer Broschüre."),
    who: t("Marketing books and builds the stand; sales staff run the demos for two days.", "Das Marketing bucht und baut den Stand; Vertriebsmitarbeiter führen zwei Tage lang die Demos vor."),
    area: "push" as MeasureArea,
    basis: t("The customer hears features, specifications or a price; ready after 10 weeks.", "Der Kunde hört Features, Spezifikationen oder einen Preis; fertig nach 10 Wochen."),
    joins: "none" as Joins,
    cost: 45000,
    weeks: 10,
    targets: [] as ProblemId[],
    model: { feasibility: 2, effect: 2, note: t("It brings contacts, but the demos repeat conversation A to more people, and half the budget goes on one event.", "Es bringt Kontakte, aber die Demos wiederholen Gespräch A vor mehr Menschen, und das halbe Budget geht in eine Veranstaltung.") },
    verdict: t("Rejected: 4 points.", "Verworfen: 4 Punkte."),
  },
]);
for (const m of RAW) MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins) }) as Measure);

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["stories", "types", "training"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
