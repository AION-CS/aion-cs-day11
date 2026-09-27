import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2, and the worked example of Materi A4: what a customer story is worth. SalesTech's offers last year, split by how
 * they were presented: as technical details, or with the benefit and a customer story (Case assumption). The method is
 *
 *   close rate                   = deals ÷ offers × 100
 *   lift (how many times)        = close rate with a story ÷ close rate technical
 *   extra revenue a year         = offers a year × (rate with story − technical rate, as a share of one) × average deal value
 *
 * (Identifiers keep the names of the file this was built from: `control` = technical offers, `variant` = offers with benefit and story,
 * `sent` = offers, `orders` = deals, `order` = average deal value.) Results are rounded to two decimals.
 */
export const PILOT = {
  control: { sent: 500, orders: 50 },
  variant: { sent: 200, orders: 44 },
  yearly: 900,
  order: 5000,
};

const r2 = (x: number) => Math.round(x * 100) / 100;
export const rateOf = (orders: number, sent: number) => r2((orders / sent) * 100);
export const liftOf = (a: number, b: number) => r2(a / b);
export const extraOf = (yearly: number, variantRate: number, controlRate: number, order: number) => r2(yearly * ((variantRate - controlRate) / 100) * order);

export const FORECAST = {
  f1: rateOf(PILOT.variant.orders, PILOT.variant.sent),
  controlRate: rateOf(PILOT.control.orders, PILOT.control.sent),
  get f2() {
    return liftOf(this.f1, this.controlRate);
  },
  get f3() {
    return extraOf(PILOT.yearly, this.f1, this.controlRate, PILOT.order);
  },
};

export type FigureId = "F1" | "F2" | "F3";
export const FIGURE_IDS: FigureId[] = ["F1", "F2", "F3"];

export const FIGURES = bi({
  F1: {
    id: "F1" as FigureId,
    label: t("F1 · Close rate of offers with benefit and a customer story, %", "F1 · Abschlussquote der Angebote mit Nutzen und Kunden-Story, %"),
    question: t("Of the offers presented with the benefit and a customer story, what share became a deal?", "Welcher Anteil der Angebote, die mit Nutzen und einer Kunden-Story präsentiert wurden, wurde zu einem Abschluss?"),
    unit: "%",
    example: "12.5",
    answer: FORECAST.f1,
    formula: t("Close rate = deals ÷ offers × 100. Use the two rows of the offers presented with the benefit and a customer story.", "Abschlussquote = Abschlüsse ÷ Angebote × 100. Nutzen Sie die zwei Zeilen der Angebote mit Nutzen und Kunden-Story."),
    taughtIn: "A4" as const,
    clue: t("Did you divide the deals by the offers of the same group, and multiply by 100?", "Haben Sie die Abschlüsse durch die Angebote derselben Gruppe geteilt und mit 100 multipliziert?"),
    sources: [
      { label: t("Last year · with benefit and story · offers", "Letztes Jahr · mit Nutzen und Story · Angebote"), value: "200", target: "fc-var-sent" },
      { label: t("Last year · with benefit and story · deals", "Letztes Jahr · mit Nutzen und Story · Abschlüsse"), value: "44", target: "fc-var-orders" },
    ],
  },
  F2: {
    id: "F2" as FigureId,
    label: t("F2 · Lift: how many times the technical close rate", "F2 · Lift: wie viel Mal die technische Abschlussquote"),
    question: t("How many times higher is the close rate of offers with the benefit and a story than that of offers presented technically?", "Wie viel Mal höher ist die Abschlussquote der Angebote mit Nutzen und Story als die der technisch präsentierten Angebote?"),
    unit: "×",
    example: "1.5",
    answer: FORECAST.f2,
    formula: t("Lift = close rate with benefit and story ÷ close rate technical. Work out the technical rate from its rows first.", "Lift = Abschlussquote mit Nutzen und Story ÷ technische Abschlussquote. Berechnen Sie die technische Quote zuerst aus ihren Zeilen."),
    taughtIn: "A4" as const,
    clue: t("You need two rates from two pairs of rows. Is the second one worked out from the technical rows, the same way as F1?", "Sie brauchen zwei Quoten aus zwei Zeilenpaaren. Ist die zweite aus den technischen Zeilen berechnet, genauso wie F1?"),
    sources: [
      { label: t("Your F1 (close rate with benefit and story)", "Ihr F1 (Abschlussquote mit Nutzen und Story)"), value: "F1", target: "fig-F1" },
      { label: t("Last year · technical presentation · offers", "Letztes Jahr · technische Präsentation · Angebote"), value: "500", target: "fc-ctl-sent" },
      { label: t("Last year · technical presentation · deals", "Letztes Jahr · technische Präsentation · Abschlüsse"), value: "50", target: "fc-ctl-orders" },
    ],
  },
  F3: {
    id: "F3" as FigureId,
    label: t("F3 · Extra revenue a year, €", "F3 · Zusätzlicher Umsatz pro Jahr, €"),
    question: t("If every offer next year were presented with the benefit and a customer story and customers behaved as last year, how much extra revenue would it bring in a year?", "Wenn jedes Angebot im nächsten Jahr mit Nutzen und Kunden-Story präsentiert würde und Kunden sich wie im letzten Jahr verhielten: Wie viel zusätzlichen Umsatz brächte das in einem Jahr?"),
    unit: "€",
    example: "12500",
    answer: FORECAST.f3,
    formula: t("Extra revenue = offers a year × (close rate with benefit and story − technical close rate, as a share of one) × average deal value.", "Zusätzlicher Umsatz = Angebote pro Jahr × (Abschlussquote mit Nutzen und Story − technische Abschlussquote, als Anteil von eins) × durchschnittlicher Auftragswert."),
    taughtIn: "A4" as const,
    clue: t("Only the difference between the two rates is extra, and it has to be a share of one (1 point = 0.01) before you multiply.", "Nur der Unterschied zwischen den beiden Quoten ist zusätzlich, und er muss ein Anteil von eins sein (1 Punkt = 0,01), bevor Sie multiplizieren."),
    sources: [
      { label: t("Next year · offers a year", "Nächstes Jahr · Angebote pro Jahr"), value: "900", target: "fc-yearly" },
      { label: t("Your F1 (close rate with benefit and story)", "Ihr F1 (Abschlussquote mit Nutzen und Story)"), value: "F1", target: "fig-F1" },
      { label: t("Last year · technical presentation · offers and deals (its rate)", "Letztes Jahr · technische Präsentation · Angebote und Abschlüsse (ihre Quote)"), value: "50 ÷ 500", target: "fc-ctl-orders" },
      { label: t("All deals · average deal value", "Alle Aufträge · durchschnittlicher Auftragswert"), value: t("€5,000", "5.000 €"), target: "fc-order" },
    ],
  },
});

/** The worked example of Materi A4: a different company (Havel Software), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 300, orders: 24 }, variant: { sent: 150, orders: 30 }, yearly: 600, order: 3000 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight customers and their types */

/**
 * Eight of SalesTech's current prospects, from the sales team's notes (Case assumption). (The type keeps the name "customer" of the
 * file it was built from: `volume` = deal size in €, `leave` = share of their questions that are about details and risks, `decision` =
 * they compare several offers, `known` = what they talk about most: none = terms (price, guarantees, contract), campaign = what is new,
 * customer = the people and the relationship.) The rule of Materi A3: security-oriented = 50% or more detail and risk questions AND
 * compares offers; relationship-oriented = talks most about the people.
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Known = "none" | "campaign" | "customer";
export type Customer = { id: CustId; name: string; volume: number; leave: number; decision: boolean; known: Known };
export const KNOWN_LABEL = bi({ none: t("Terms: price, guarantees, contract", "Konditionen: Preis, Garantien, Vertrag"), campaign: t("What is new and what comes next", "Was neu ist und was als Nächstes kommt"), customer: t("People: who they work with and how it feels", "Menschen: mit wem sie arbeiten und wie es sich anfühlt") });
export const DECISION_LABEL = bi({ yes: t("Yes", "Ja"), no: t("No", "Nein") });
export const LEAVE_MIN = 50;
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("Municipal utility, head of IT", "Stadtwerke, IT-Leitung"), volume: 120000, leave: 72, decision: true, known: "none" as Known },
  { id: "c2" as CustId, name: t("Hospital IT department", "IT-Abteilung eines Krankenhauses"), volume: 90000, leave: 65, decision: true, known: "none" as Known },
  { id: "c3" as CustId, name: t("Software start-up, CTO", "Software-Start-up, CTO"), volume: 30000, leave: 55, decision: false, known: "campaign" as Known },
  { id: "c4" as CustId, name: t("Family-owned engineering firm, owner", "Familiengeführtes Maschinenbauunternehmen, Inhaber"), volume: 60000, leave: 20, decision: false, known: "customer" as Known },
  { id: "c5" as CustId, name: t("Law firm, customer for eight years", "Kanzlei, seit acht Jahren Kunde"), volume: 40000, leave: 15, decision: false, known: "customer" as Known },
  { id: "c6" as CustId, name: t("Wholesaler, purchasing", "Großhändler, Einkauf"), volume: 50000, leave: 25, decision: true, known: "none" as Known },
  { id: "c7" as CustId, name: t("Logistics group, procurement", "Logistikgruppe, Beschaffung"), volume: 80000, leave: 45, decision: true, known: "none" as Known },
  { id: "c8" as CustId, name: t("Marketing agency, managing director", "Marketingagentur, Geschäftsführerin"), volume: 20000, leave: 30, decision: false, known: "campaign" as Known },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = LEAVE_MIN;
/** Security-oriented: 50% or more detail and risk questions, and compares several offers (Materi A3). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** Relationship-oriented: talks most about the people and how it feels (Materi A3). */
export const CHURN_TRUTH: CustId[] = ["c4", "c5"];
export const PICK_WHY = bi({
  c1: t("72% of the questions are about details and risks, and they compare several offers: security-oriented. They need proof, references and a safe first step.", "72 % der Fragen betreffen Details und Risiken, und sie vergleichen mehrere Angebote: sicherheitsorientiert. Sie brauchen Belege, Referenzen und einen sicheren ersten Schritt."),
  c2: t("65% detail and risk questions, and a comparison of offers: security-oriented, like the customer in the plan's scenario.", "65 % Detail- und Risikofragen und ein Angebotsvergleich: sicherheitsorientiert, wie der Kunde im Szenario des Plans."),
  c3: t("Many detailed questions (55%), but about new technology, and no comparison of offers: innovation-driven. Detail alone does not make a customer security-oriented.", "Viele Detailfragen (55 %), aber zu neuer Technologie, und kein Angebotsvergleich: innovationsgetrieben. Detail allein macht einen Kunden nicht sicherheitsorientiert."),
  c4: t("Talks most about the people and how it feels, few detail questions: relationship-oriented. Trust in a person decides here.", "Spricht vor allem über die Menschen und wie es sich anfühlt, wenige Detailfragen: beziehungsorientiert. Hier entscheidet Vertrauen in eine Person."),
  c5: t("A long-standing customer who talks about the people: relationship-oriented. A story from a firm like theirs, told by someone they know, works best.", "Ein langjähriger Kunde, der über die Menschen spricht: beziehungsorientiert. Eine Story von einer Firma wie ihrer, erzählt von jemandem, den sie kennen, wirkt am besten."),
  c6: t("Compares offers and talks about terms, but few risk questions: price-oriented. Show the value against the price, not more technical detail.", "Vergleicht Angebote und spricht über Konditionen, aber wenige Risikofragen: preisorientiert. Zeigen Sie den Wert gegenüber dem Preis, nicht mehr technische Details."),
  c7: t("Compares offers and 45% detail questions: close, but below half. Most questions are about price and terms: price-oriented rather than security-oriented.", "Vergleicht Angebote und 45 % Detailfragen: knapp, aber unter der Hälfte. Die meisten Fragen betreffen Preis und Konditionen: eher preis- als sicherheitsorientiert."),
  c8: t("Talks about what is new and does not compare: innovation-driven. Show what others are not yet doing.", "Spricht über Neues und vergleicht nicht: innovationsgetrieben. Zeigen Sie, was andere noch nicht tun."),
});

/* ------------------------------------------------------------------ Block 1.3b · three improvements for conversation A */

/** Three ways to improve conversation A; each improvement uses a different one. (The type keeps its earlier name, "basis".) */
export type Basis = "respond" | "personal" | "learn";
export const BASES = bi([
  { id: "respond" as Basis, label: t("Say the benefit", "Den Nutzen sagen"), short: t("Benefit", "Nutzen") },
  { id: "personal" as Basis, label: t("Tell a customer story", "Eine Kunden-Story erzählen"), short: t("Story", "Story") },
  { id: "learn" as Basis, label: t("Speak to the emotion (trust, security, status, belonging)", "Die Emotion ansprechen (Vertrauen, Sicherheit, Status, Zugehörigkeit)"), short: t("Emotion", "Emotion") },
]);
export const BASIS_LABEL = bi({ respond: t("Say the benefit", "Den Nutzen sagen"), personal: t("Tell a customer story", "Eine Kunden-Story erzählen"), learn: t("Speak to the emotion", "Die Emotion ansprechen") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[What the salesperson says instead] at [which moment of conversation A], so [what the customer understands or feels].", "[Was die Vertriebsperson stattdessen sagt] an [welcher Stelle von Gespräch A], sodass [was der Kunde versteht oder fühlt].") });
/** True when the sentence says what the change gives. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(so|therefore|which means|because|means|so that|thus|hence|daher|deshalb|weil|das heißt|bedeutet|sodass|damit|also)\b/i.test(s);
