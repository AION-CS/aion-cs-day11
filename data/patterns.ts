import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1–2.3. Four kinds of metric (Materi A5) and twelve metrics SalesTech's sales team reports today, each with whether it moved
 * together with customer value last year; the A/B test card of Block 2.3 (Materi A6). (Identifiers keep the names of the file this was
 * built from: a "pattern" is a kind of metric, a "record" is one metric, and the outcome "left" means "moved with customer value".)
 * Every figure is a Case assumption. `truth` is never printed outside the mentor answer key. Counts are 3/3/3/3.
 */
export type PatternId = "outcome" | "driver" | "guardrail" | "vanity";
export const PATTERN_IDS: PatternId[] = ["outcome", "driver", "guardrail", "vanity"];

export const PATTERNS = bi({
  outcome: {
    id: "outcome" as PatternId,
    label: t("Outcome KPI", "Outcome-KPI"),
    means: t("The result the business is paid for: closed deals, revenue, customers kept. It moves last.", "Das Ergebnis, für das das Unternehmen bezahlt wird: Abschlüsse, Umsatz, gehaltene Kunden. Es bewegt sich zuletzt."),
    shape: t("the top of the tree", "die Spitze des Baums"),
    test: t("Is it money, deals or customers won or kept?", "Ist es Geld, Abschlüsse oder gewonnene oder gehaltene Kunden?"),
  },
  driver: {
    id: "driver" as PatternId,
    label: t("Driver KPI", "Treiber-KPI"),
    means: t("Something that comes before the result and that a team can move this month: how many offers carry a customer story, how many first meetings lead to a second, how many customers can repeat the benefit.", "Etwas, das vor dem Ergebnis kommt und das ein Team diesen Monat bewegen kann: wie viele Angebote eine Kunden-Story enthalten, wie viele Erstgespräche zu einem zweiten führen, wie viele Kunden den Nutzen wiedergeben können."),
    shape: t("a branch under the top", "ein Ast unter der Spitze"),
    test: t("Does it come before the deal or the renewal, and can a team change it this month?", "Kommt es vor dem Abschluss oder der Verlängerung, und kann ein Team es diesen Monat ändern?"),
  },
  guardrail: {
    id: "guardrail" as PatternId,
    label: t("Guardrail", "Guardrail (Leitplanke)"),
    means: t("Something that must not get worse while you make the pitch more emotional: promises the product cannot keep, complaints about pressure, stories that are not backed by a real case.", "Etwas, das nicht schlechter werden darf, während Sie den Pitch emotionaler machen: Versprechen, die das Produkt nicht halten kann, Beschwerden über Druck, Storys, die kein echter Fall belegt."),
    shape: t("a fence beside the tree", "ein Zaun neben dem Baum"),
    test: t("Would you stop an approach if this got worse, even while deals rise?", "Würden Sie einen Ansatz stoppen, wenn das schlechter wird, auch wenn die Abschlüsse steigen?"),
  },
  vanity: {
    id: "vanity" as PatternId,
    label: t("Vanity metric", "Vanity Metric"),
    means: t("Counts our own activity or reach: slides produced, calls made, brochures sent. Looks like progress, decides nothing.", "Zählt unsere eigene Aktivität oder Reichweite: erstellte Folien, geführte Anrufe, versandte Broschüren. Sieht nach Fortschritt aus, entscheidet nichts."),
    shape: t("outside the tree", "außerhalb des Baums"),
    test: t("Does it count what we did or how many passed by, rather than what customers did?", "Zählt es, was wir taten oder wie viele vorbeikamen, statt was Kunden taten?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Outcome or driver?", "Outcome oder Treiber?"), test: t("Ask whether it is the result itself (money, deals, customers kept) or something that leads to it. The result moves last; the driver moves first.", "Fragen Sie, ob es das Ergebnis selbst ist (Geld, Abschlüsse, gehaltene Kunden) oder etwas, das dazu führt. Das Ergebnis bewegt sich zuletzt; der Treiber zuerst.") },
  { pair: t("Driver or vanity?", "Treiber oder Vanity?"), test: t("Calls made and slides produced rise without anyone buying. A driver is closer to the deal: a customer story in the offer, a second meeting agreed.", "Geführte Anrufe und erstellte Folien steigen, ohne dass jemand kauft. Ein Treiber ist näher am Abschluss: eine Kunden-Story im Angebot, ein vereinbartes zweites Gespräch.") },
  { pair: t("Guardrail or driver?", "Guardrail oder Treiber?"), test: t("A driver is pushed; a guardrail is only watched so that it does not get worse. You would never set a target to raise complaints about pressure.", "Ein Treiber wird vorangetrieben; eine Guardrail wird nur beobachtet, damit sie nicht schlechter wird. Niemand setzt ein Ziel, Beschwerden über Druck zu erhöhen.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = moved with customer value last year; "stayed" = did not move with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not move with customer value", "Bewegte sich nicht mit dem Kundenwert"), left: t("Moved with customer value", "Bewegte sich mit dem Kundenwert") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "M-01", outcome: "left" as const, text: t("Close rate of offers: deals ÷ offers.", "Abschlussquote der Angebote: Abschlüsse ÷ Angebote."), truth: "outcome" as PatternId, clue: t("Does it count deals, or something that comes before a deal?", "Zählt es Abschlüsse, oder etwas, das vor einem Abschluss kommt?"), why: t("It counts deals, the result SalesTech is paid for: an outcome KPI.", "Es zählt Abschlüsse, das Ergebnis, für das SalesTech bezahlt wird: ein Outcome-KPI."), rejected: { driver: t("An offer comes before a deal; this one counts the deal itself.", "Ein Angebot kommt vor einem Abschluss; diese zählt den Abschluss selbst.") } },
  { id: "p02" as RecId, code: "M-02", outcome: "left" as const, text: t("Revenue from new customers per quarter.", "Umsatz mit Neukunden pro Quartal."), truth: "outcome" as PatternId, clue: t("Is this money, or a behaviour that may lead to money?", "Ist das Geld, oder ein Verhalten, das zu Geld führen kann?"), why: t("Revenue is money: an outcome KPI, and it moves last.", "Umsatz ist Geld: ein Outcome-KPI, und er bewegt sich zuletzt."), rejected: { driver: t("Nobody can raise revenue this month directly; it follows the drivers.", "Niemand kann den Umsatz diesen Monat direkt erhöhen; er folgt den Treibern.") } },
  { id: "p03" as RecId, code: "M-03", outcome: "left" as const, text: t("Share of new customers who renew after the first year.", "Anteil der Neukunden, die nach dem ersten Jahr verlängern."), truth: "outcome" as PatternId, clue: t("Customers kept: result or step on the way?", "Gehaltene Kunden: Ergebnis oder Schritt auf dem Weg?"), why: t("Customers kept are a result: an outcome KPI. A promise that was kept shows here.", "Gehaltene Kunden sind ein Ergebnis: ein Outcome-KPI. Ein gehaltenes Versprechen zeigt sich hier."), rejected: { guardrail: t("Renewals are pushed up, not only watched.", "Verlängerungen werden nach oben getrieben, nicht nur beobachtet.") } },
  { id: "p04" as RecId, code: "M-04", outcome: "left" as const, text: t("Share of offers that include a customer story from the same industry.", "Anteil der Angebote mit einer Kunden-Story aus derselben Branche."), truth: "driver" as PatternId, clue: t("Does it come before the deal, and can a team move it this month?", "Kommt es vor dem Abschluss, und kann ein Team es diesen Monat bewegen?"), why: t("A story in the offer comes before the deal and the sales team can raise it at once: a driver KPI.", "Eine Story im Angebot kommt vor dem Abschluss, und das Vertriebsteam kann sie sofort steigern: ein Treiber-KPI."), rejected: { vanity: t("It is not activity for its own sake; it changes what the customer hears.", "Es ist keine Aktivität um ihrer selbst willen; es ändert, was der Kunde hört.") } },
  { id: "p05" as RecId, code: "M-05", outcome: "left" as const, text: t("Share of first meetings that lead to a second meeting.", "Anteil der Erstgespräche, die zu einem zweiten Gespräch führen."), truth: "driver" as PatternId, clue: t("A customer's step on the way to a deal. Is it the deal?", "Ein Schritt des Kunden auf dem Weg zum Abschluss. Ist es der Abschluss?"), why: t("The customer agrees to meet again before any deal, and the pitch can change it: a driver KPI.", "Der Kunde willigt vor jedem Abschluss in ein weiteres Treffen ein, und der Pitch kann das ändern: ein Treiber-KPI."), rejected: { outcome: t("A second meeting is not yet a deal.", "Ein zweites Gespräch ist noch kein Abschluss.") } },
  { id: "p06" as RecId, code: "M-06", outcome: "stayed" as const, text: t("Share of customers who can repeat the main benefit in the follow-up call.", "Anteil der Kunden, die im Nachgespräch den Hauptnutzen wiedergeben können."), truth: "driver" as PatternId, clue: t("Tag what it measures, not whether it moved. Whose understanding is it?", "Ordnen Sie zu, was es misst, nicht ob es sich bewegte. Wessen Verständnis ist es?"), why: t("Understanding the benefit comes before the deal and the pitch can change it: a driver KPI. It did not move with value last year, which is a finding, not another kind.", "Den Nutzen zu verstehen kommt vor dem Abschluss, und der Pitch kann das ändern: ein Treiber-KPI. Es bewegte sich letztes Jahr nicht mit dem Wert; das ist ein Befund, keine andere Art."), rejected: { vanity: t("Customers understand, not SalesTech; that makes it more than activity.", "Kunden verstehen, nicht SalesTech; das macht es zu mehr als Aktivität.") } },
  { id: "p07" as RecId, code: "M-07", outcome: "left" as const, text: t("Customers who say they were promised something the product cannot do, per 100 deals.", "Kunden, die sagen, ihnen sei etwas versprochen worden, das das Produkt nicht kann, pro 100 Abschlüsse."), truth: "guardrail" as PatternId, clue: t("Would anyone set a target to raise it, or only watch that it does not rise?", "Würde jemand ein Ziel setzen, es zu erhöhen, oder nur darauf achten, dass es nicht steigt?"), why: t("An emotional pitch must not promise too much: a guardrail for credibility.", "Ein emotionaler Pitch darf nicht zu viel versprechen: eine Guardrail für Glaubwürdigkeit."), rejected: { driver: t("Nobody pushes broken promises up; you watch them as a limit.", "Niemand treibt gebrochene Versprechen nach oben; man beobachtet sie als Grenze.") } },
  { id: "p08" as RecId, code: "M-08", outcome: "stayed" as const, text: t("Complaints about pushy sales calls per 1,000 contacts.", "Beschwerden über aufdringliche Vertriebsanrufe pro 1.000 Kontakte."), truth: "guardrail" as PatternId, clue: t("If this rose while deals rose, would you stop?", "Würden Sie stoppen, wenn das stiege, während die Abschlüsse steigen?"), why: t("A limit on pressure: emotion that turns into pushing costs trust. A guardrail.", "Eine Grenze für Druck: Emotion, die zu Drängen wird, kostet Vertrauen. Eine Guardrail."), rejected: { outcome: t("It is not the result SalesTech is paid for; it is what must not get worse.", "Es ist nicht das Ergebnis, für das SalesTech bezahlt wird; es ist, was nicht schlechter werden darf.") } },
  { id: "p09" as RecId, code: "M-09", outcome: "stayed" as const, text: t("Share of stories in offers that are not backed by a real, approved customer case.", "Anteil der Storys in Angeboten, die kein echter, freigegebener Kundenfall belegt."), truth: "guardrail" as PatternId, clue: t("Is this a result, something you push, or a limit you watch?", "Ist das ein Ergebnis, etwas, das Sie vorantreiben, oder eine Grenze, die Sie beobachten?"), why: t("A made-up story breaks trust the moment a customer checks it: a guardrail on authenticity.", "Eine erfundene Story bricht das Vertrauen in dem Moment, in dem ein Kunde sie prüft: eine Guardrail für Authentizität."), rejected: { vanity: t("It says something about credibility, not about SalesTech's activity.", "Es sagt etwas über Glaubwürdigkeit, nicht über die Aktivität von SalesTech.") } },
  { id: "p10" as RecId, code: "M-10", outcome: "stayed" as const, text: t("Slides in the standard presentation.", "Folien in der Standardpräsentation."), truth: "vanity" as PatternId, clue: t("More slides. Did any customer understand more?", "Mehr Folien. Hat irgendein Kunde mehr verstanden?"), why: t("It counts what SalesTech produced, not what customers understood: a vanity metric.", "Es zählt, was SalesTech produziert hat, nicht was Kunden verstanden haben: eine Vanity Metric."), rejected: { driver: t("Slides are made by SalesTech; a driver is something the customer does.", "Folien macht SalesTech; ein Treiber ist etwas, das der Kunde tut.") } },
  { id: "p11" as RecId, code: "M-11", outcome: "stayed" as const, text: t("Sales calls made per week.", "Geführte Vertriebsanrufe pro Woche."), truth: "vanity" as PatternId, clue: t("Who acted: customers, or SalesTech?", "Wer hat gehandelt: Kunden oder SalesTech?"), why: t("It counts SalesTech's own activity: a vanity metric. What the calls achieved (M-05) is what counts.", "Es zählt die eigene Aktivität von SalesTech: eine Vanity Metric. Was die Anrufe erreichten (M-05), zählt."), rejected: { driver: t("Calling is what SalesTech does; a driver is closer to what customers do.", "Anrufen ist, was SalesTech tut; ein Treiber ist näher an dem, was Kunden tun.") } },
  { id: "p12" as RecId, code: "M-12", outcome: "stayed" as const, text: t("Brochures sent per month.", "Versandte Broschüren pro Monat."), truth: "vanity" as PatternId, clue: t("Does sending something count what customers did with it?", "Zählt das Versenden, was Kunden damit taten?"), why: t("It counts what was sent: a vanity metric.", "Es zählt, was versandt wurde: eine Vanity Metric."), rejected: { guardrail: t("Nobody would stop a measure because more brochures went out; it is only activity.", "Niemand würde eine Maßnahme stoppen, weil mehr Broschüren verschickt wurden; es ist nur Aktivität.") } },
]);
export const REC_IDS: RecId[] = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12"];
export const REC_BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r])) as Record<RecId, Record_>;

const zero = () => ({ outcome: 0, driver: 0, guardrail: 0, vanity: 0 }) as Record<PatternId, number>;
export const TRUTH_COUNTS: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + 1 }), zero());
export const TRUTH_LEFT: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + (x.outcome === "left" ? 1 : 0) }), zero());

/* ------------------------------------------------------------------ Block 2.2 · link to value, what each kind tells management, how to use it */

export type Risk = "high" | "mid" | "low";
export const RISK_LABEL = bi({ high: t("Strong", "Stark"), mid: t("Partial", "Teilweise"), low: t("None", "Keine") });
export const RISK_GLYPH: Record<Risk, string> = { high: "●", mid: "◐", low: "○" };
export const riskOf = (moved: number, count: number): Risk | null => (count === 0 ? null : moved / count >= 0.5 ? "high" : moved > 0 ? "mid" : "low");
export const RISK_RULE = bi({ v: t("Link to customer value from last year: half or more of the kind's metrics moved with customer value = Strong; some did = Partial; none did = None.", "Verbindung zum Kundenwert aus dem letzten Jahr: Die Hälfte oder mehr der Kennzahlen dieser Art bewegte sich mit dem Kundenwert = Stark; einige = Teilweise; keine = Keine.") });

export type MeaningId = "result" | "early" | "limit" | "activity";
export const MEANINGS = bi([
  { id: "result" as MeaningId, label: t("The result we are paid for; it moves last", "Das Ergebnis, für das wir bezahlt werden; es bewegt sich zuletzt") },
  { id: "early" as MeaningId, label: t("An early signal a team can move this month", "Ein frühes Signal, das ein Team diesen Monat bewegen kann") },
  { id: "limit" as MeaningId, label: t("A limit: it must not get worse while we make the pitch more emotional", "Eine Grenze: Sie darf nicht schlechter werden, während wir den Pitch emotionaler machen") },
  { id: "activity" as MeaningId, label: t("Our own activity or reach; it says nothing about customers", "Unsere eigene Aktivität oder Reichweite; sie sagt nichts über Kunden") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { outcome: "result", driver: "early", guardrail: "limit", vanity: "activity" };

export type PMeasureId = "target" | "weekly" | "stop" | "drop" | "bonus";
export const PMEASURES = bi([
  { id: "target" as PMeasureId, label: t("Set the target on the management dashboard and judge every measure by it", "Das Ziel im Management-Dashboard setzen und jede Maßnahme daran messen") },
  { id: "weekly" as PMeasureId, label: t("Give it to the sales team leads and review it every week", "Es den Vertriebsteamleitungen geben und jede Woche prüfen") },
  { id: "stop" as PMeasureId, label: t("Set a limit that stops a test or a rollout when it is crossed", "Eine Grenze setzen, die einen Test oder Rollout stoppt, wenn sie überschritten wird") },
  { id: "drop" as PMeasureId, label: t("Stop reporting it as success", "Aufhören, es als Erfolg zu berichten") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { outcome: "target", driver: "weekly", guardrail: "stop", vanity: "drop" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("44 deals with a story is a small base; another year would confirm the lift", "44 Abschlüsse mit Story sind eine kleine Basis; ein weiteres Jahr würde den Lift bestätigen"), real: true, why: t("With fewer than about 100 deals per group, a few deals more or less move the lift a lot (Materi A6).", "Bei weniger als etwa 100 Abschlüssen pro Gruppe verschieben ein paar Abschlüsse mehr oder weniger den Lift stark (Materi A6).") },
  { id: "cause" as UncId, label: t("Salespeople may have told stories mainly to the warmer prospects, so the story may not be the whole cause", "Vertriebsleute haben Storys vielleicht vor allem den wärmeren Interessenten erzählt, also ist die Story vielleicht nicht die ganze Ursache"), real: true, why: t("If the promising prospects got the story, part of the lift is the prospect, not the story. Only a fair test (a random split) shows how much the story adds.", "Bekamen die vielversprechenden Interessenten die Story, ist ein Teil des Lifts der Interessent, nicht die Story. Nur ein fairer Test (eine zufällige Aufteilung) zeigt, wie viel die Story bringt.") },
  { id: "missing" as UncId, label: t("Offers where nobody noted how they were presented are not counted at all", "Angebote, bei denen niemand notiert hat, wie sie präsentiert wurden, werden gar nicht gezählt"), real: true, why: t("What is not recorded cannot be counted; the real figures may differ in either direction.", "Was nicht erfasst wird, kann nicht gezählt werden; die echten Zahlen können in beide Richtungen abweichen.") },
  { id: "shift" as UncId, label: t("A new product or a competitor's price cut can change how customers decide next year", "Ein neues Produkt oder eine Preissenkung eines Wettbewerbers kann ändern, wie Kunden im nächsten Jahr entscheiden"), real: true, why: t("A forecast assumes the past repeats; a changed market changes what convinces.", "Eine Prognose nimmt an, dass sich die Vergangenheit wiederholt; ein veränderter Markt ändert, was überzeugt.") },
  { id: "objective" as UncId, label: t("The more emotional the pitch, the better it sells", "Je emotionaler der Pitch, desto besser verkauft er"), real: false, why: t("Emotion without substance feels like pressure; security-oriented customers turn away from it (Materi A3, A6).", "Emotion ohne Substanz fühlt sich wie Druck an; sicherheitsorientierte Kunden wenden sich davon ab (Materi A3, A6).") },
  { id: "highsafe" as UncId, label: t("A good story works the same for every customer type", "Eine gute Story wirkt bei jedem Kundentyp gleich"), real: false, why: t("A security-oriented customer needs a story about risk avoided; an innovation-driven one needs a story about being first (Materi A3).", "Ein sicherheitsorientierter Kunde braucht eine Story über vermiedenes Risiko; ein innovationsgetriebener eine Story übers Vorne-Sein (Materi A3).") },
  { id: "moredata" as UncId, label: t("Once the story is good, the facts no longer matter", "Ist die Story gut, zählen die Fakten nicht mehr"), real: false, why: t("A story opens the door; facts and proof keep it open. A story the facts do not back destroys trust.", "Eine Story öffnet die Tür; Fakten und Belege halten sie offen. Eine Story, die die Fakten nicht stützen, zerstört Vertrauen.") },
]);
export const UNC_BY_ID = Object.fromEntries(UNCERTAINTIES.map((w) => [w.id, w])) as Record<UncId, (typeof UNCERTAINTIES)[number]>;

/* ------------------------------------------------------------------ Block 2.3 · an A/B test design */

export type AbPart = "change" | "control" | "kpi" | "size";
export const AB_PARTS: AbPart[] = ["change", "control", "kpi", "size"];
export type AbOption = { id: string; label: string; right: boolean; clue: string };
export const AB = bi({
  change: {
    label: t("What changes in the variant", "Was sich in der Variante ändert"),
    help: t("The one thing the test compares.", "Das eine, was der Test vergleicht."),
    options: [
      { id: "one", label: t("Only the opening: a customer story from the same industry instead of the feature list", "Nur der Einstieg: eine Kunden-Story aus derselben Branche statt der Feature-Liste"), right: true, clue: t("", "") },
      { id: "three", label: t("The story, a new price and a shorter offer, all at once", "Story, neuer Preis und kürzeres Angebot, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("The story for new prospects, the feature list for existing customers", "Die Story für neue Interessenten, die Feature-Liste für Bestandskunden"), right: false, clue: t("Are new prospects and existing customers the same people in the same situation?", "Sind neue Interessenten und Bestandskunden dieselben Menschen in derselben Lage?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Whose offers keep the feature list, to compare against.", "Wessen Angebote die Feature-Liste behalten, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the new opportunities, in the same weeks", "Eine zufällige Hälfte der neuen Opportunities, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last quarter's offers, before the stories existed", "Die Angebote des letzten Quartals, bevor es die Storys gab"), right: false, clue: t("Are these the same prospects, at the same time, under the same conditions?", "Sind das dieselben Interessenten, zur selben Zeit, unter denselben Bedingungen?") },
      { id: "nonopen", label: t("Offers where the salesperson chose not to tell the story", "Angebote, bei denen der Vertriebsmitarbeiter die Story nicht erzählen wollte"), right: false, clue: t("Who chose to be in this group: chance, or the salespeople themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Vertriebsleute selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Close rate: deals ÷ offers, within 60 days", "Abschlussquote: Abschlüsse ÷ Angebote, innerhalb von 60 Tagen"), right: true, clue: t("", "") },
      { id: "opens", label: t("Customers who said the presentation was interesting", "Kunden, die sagten, die Präsentation sei interessant gewesen"), right: false, clue: t("The problem in the brief is a low close rate. Does “interesting” tell you whether more customers bought?", "Das Problem im Auftrag ist eine niedrige Abschlussquote. Sagt „interessant“, ob mehr Kunden gekauft haben?") },
      { id: "sent", label: t("Length of the meeting", "Länge des Gesprächs"), right: false, clue: t("Which kind of metric counts how long SalesTech talked rather than whether customers moved towards a deal?", "Welche Art von Kennzahl zählt, wie lange SalesTech geredet hat, statt ob Kunden sich einem Abschluss näherten?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 decisions (won or lost), and at least one full sales cycle", "Vorab festgelegt: bis jede Gruppe etwa 100 Entscheidungen (gewonnen oder verloren) hat, und mindestens ein voller Verkaufszyklus"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the story group is ahead", "Stoppen, sobald die Story-Gruppe vorn liegt"), right: false, clue: t("A close rate swings with every deal. What happens if you stop at a lucky moment?", "Eine Abschlussquote schwankt mit jedem Abschluss. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("One week of meetings, for a fast answer", "Eine Woche Gespräche, für eine schnelle Antwort"), right: false, clue: t("How many customers decide within a week of the first meeting?", "Wie viele Kunden entscheiden innerhalb einer Woche nach dem Erstgespräch?") },
    ],
  },
});
export type AbState = { change: string | null; control: string | null; kpi: string | null; size: string | null; hyp: string; rule: string };
export const emptyAb = (): AbState => ({ change: null, control: null, kpi: null, size: null, hyp: "", rule: "" });
export const AB_MODEL = { change: "one", control: "random", kpi: "conv", size: "fixed" };
/** A hypothesis states a change, an expected effect and a reason. A floor, not a judge: it needs "if … because". */
export const hasHypothesis = (s: string) => /\b(if|wenn|falls)\b/i.test(s) && /\b(because|since|as|weil|da|denn)\b/i.test(s);
/** A decision rule names a number to decide by. */
export const hasRuleNumber = (s: string) => /\d/.test(s);
