import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2 (Optional, read-only: the rates are PRINTED, no figure is asked for, CLAUDE.md #44) and the worked example of Materi A4: what a customer story is worth. SalesTech's offers last year, split by how
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
