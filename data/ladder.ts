import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1. Nine sentences from SalesTech's two recorded sales conversations (A: technical details, B: benefit and story).
 * The learner tags each with what it is (Materi A1–A2): a feature, a benefit or a story. (The identifiers keep the names of the sort
 * board this file was built from: a "line" is one sentence, a "level tag" is its kind; the ids respond/personal/learn now mean
 * feature/benefit/story.) `truth` is never shown outside the mentor answer key.
 */
export type LevelTag = "respond" | "personal" | "learn";
export const LEVEL_TAGS = bi([
  { id: "respond" as LevelTag, label: t("Feature", "Feature"), hint: t("It describes the product: what it is, has or does, in technical terms.", "Es beschreibt das Produkt: was es ist, hat oder tut, in technischen Begriffen.") },
  { id: "personal" as LevelTag, label: t("Benefit", "Nutzen"), hint: t("It says what changes for this customer: time, money, risk, effort, in their own words.", "Es sagt, was sich für diesen Kunden ändert: Zeit, Geld, Risiko, Aufwand, in seinen eigenen Worten.") },
  { id: "learn" as LevelTag, label: t("Story", "Story"), hint: t("It shows a real customer with a problem, what was done and how it turned out: someone the listener can picture.", "Es zeigt einen echten Kunden mit einem Problem, was getan wurde und wie es ausging: jemanden, den sich der Zuhörer vorstellen kann.") },
]);
export const LEVEL_LABEL = bi({ respond: t("Feature", "Feature"), personal: t("Benefit", "Nutzen"), learn: t("Story", "Story") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Conversation A", "Gespräch A"),
    text: t("“Our platform runs on Kubernetes with automatic failover across three availability zones.”", "„Unsere Plattform läuft auf Kubernetes mit automatischem Failover über drei Verfügbarkeitszonen.“"),
    truth: "respond" as LevelTag,
    clue: t("Who is the subject of the sentence: the product or the customer?", "Wer ist das Subjekt des Satzes: das Produkt oder der Kunde?"),
    why: t("It describes how the product is built, in technical terms; nothing says what changes for the customer.", "Es beschreibt, wie das Produkt gebaut ist, in technischen Begriffen; nichts sagt, was sich für den Kunden ändert."),
    rejected: { personal: t("Failover could lead to a benefit, but the sentence never says what the customer gets from it.", "Failover könnte zu einem Nutzen führen, aber der Satz sagt nie, was der Kunde davon hat.") },
  },
  {
    id: "l2" as LineId,
    source: t("Conversation A", "Gespräch A"),
    text: t("“The dashboard has 42 configurable widgets and an open REST API.”", "„Das Dashboard hat 42 konfigurierbare Widgets und eine offene REST-API.“"),
    truth: "respond" as LevelTag,
    clue: t("Does the sentence say what anyone at the customer's firm does differently?", "Sagt der Satz, was jemand beim Kunden anders macht?"),
    why: t("A list of what the product has: a feature.", "Eine Liste dessen, was das Produkt hat: ein Feature."),
    rejected: { learn: t("A number is not a story: there is no customer, no problem and no outcome.", "Eine Zahl ist keine Story: Es gibt keinen Kunden, kein Problem und kein Ergebnis.") },
  },
  {
    id: "l3" as LineId,
    source: t("Conversation A", "Gespräch A"),
    text: t("“Version 5.2 adds single sign-on via SAML 2.0.”", "„Version 5.2 bringt Single Sign-on über SAML 2.0.“"),
    truth: "respond" as LevelTag,
    clue: t("Would a finance manager know what this means for their day?", "Wüsste eine Finanzleiterin, was das für ihren Tag bedeutet?"),
    why: t("A technical feature named by its standard; the benefit is left to the listener to work out.", "Ein technisches Feature, benannt nach seinem Standard; den Nutzen muss sich der Zuhörer selbst erschließen."),
    rejected: { personal: t("The benefit (log in once) is hidden behind the technical name; the sentence does not say it.", "Der Nutzen (einmal anmelden) steckt hinter dem technischen Namen; der Satz sagt ihn nicht.") },
  },
  {
    id: "l4" as LineId,
    source: t("Conversation B", "Gespräch B"),
    text: t("“If one data centre fails, your accounting keeps working and nobody in your team notices.”", "„Fällt ein Rechenzentrum aus, arbeitet Ihre Buchhaltung weiter, und niemand in Ihrem Team merkt etwas.“"),
    truth: "personal" as LevelTag,
    clue: t("What changes for the customer, and is there a real customer in it?", "Was ändert sich für den Kunden, und kommt ein echter Kunde darin vor?"),
    why: t("The same failover as sentence 1, said as what changes for this customer: a benefit.", "Dasselbe Failover wie in Satz 1, gesagt als das, was sich für diesen Kunden ändert: ein Nutzen."),
    rejected: { learn: t("It speaks to the listener about their own firm; no other customer's case is told.", "Es spricht den Zuhörer über seine eigene Firma an; der Fall keines anderen Kunden wird erzählt.") },
  },
  {
    id: "l5" as LineId,
    source: t("Conversation B", "Gespräch B"),
    text: t("“Your office managers see all open tickets on one screen and no longer chase e-mails.”", "„Ihre Office-Managerinnen sehen alle offenen Tickets auf einem Bildschirm und laufen keinen E-Mails mehr hinterher.“"),
    truth: "personal" as LevelTag,
    clue: t("Is the subject the dashboard or the customer's people?", "Ist das Subjekt das Dashboard oder die Leute des Kunden?"),
    why: t("It turns the dashboard into what the customer's staff gain: less chasing. A benefit.", "Es macht aus dem Dashboard, was die Mitarbeitenden des Kunden gewinnen: weniger Hinterherlaufen. Ein Nutzen."),
    rejected: { respond: t("The product is behind it, but the sentence is about the customer's day, not the widgets.", "Das Produkt steht dahinter, aber der Satz handelt vom Tag des Kunden, nicht von den Widgets.") },
  },
  {
    id: "l6" as LineId,
    source: t("Conversation B", "Gespräch B"),
    text: t("“Your staff log in once in the morning and have all their tools, without forgetting passwords.”", "„Ihre Mitarbeitenden melden sich morgens einmal an und haben alle Werkzeuge, ohne Passwörter zu vergessen.“"),
    truth: "personal" as LevelTag,
    clue: t("Is this sentence 3 again? What is different about it?", "Ist das wieder Satz 3? Was ist anders daran?"),
    why: t("Single sign-on, said as what the staff gain: a benefit.", "Single Sign-on, gesagt als das, was die Mitarbeitenden gewinnen: ein Nutzen."),
    rejected: { respond: t("No technical name is used; it describes the customer's morning.", "Kein technischer Name wird genutzt; es beschreibt den Morgen des Kunden.") },
  },
  {
    id: "l7" as LineId,
    source: t("Conversation B", "Gespräch B"),
    text: t("“A tax firm in Kassel with 40 staff lost a day of work in a server outage last year. Since the switch they have not lost an hour, and the partner sleeps better at quarter-end.”", "„Eine Steuerkanzlei in Kassel mit 40 Mitarbeitenden verlor letztes Jahr bei einem Serverausfall einen Arbeitstag. Seit dem Wechsel haben sie keine Stunde verloren, und der Partner schläft zum Quartalsende besser.“"),
    truth: "learn" as LevelTag,
    clue: t("Is there a real customer, a problem, what was done and what changed?", "Gibt es einen echten Kunden, ein Problem, was getan wurde, und ein Ergebnis?"),
    why: t("A real customer, a problem, the solution and the outcome, with a feeling (sleeping better): a story.", "Ein echter Kunde, ein Problem, die Lösung und das Ergebnis, mit einem Gefühl (besser schlafen): eine Story."),
    rejected: { personal: t("It carries a benefit, but through another customer's case: that is what makes it a story.", "Es trägt einen Nutzen, aber über den Fall eines anderen Kunden: Das macht es zur Story.") },
  },
  {
    id: "l8" as LineId,
    source: t("Conversation B", "Gespräch B"),
    text: t("“Mrs Berger, the office manager of a logistics firm in Bremen, told us she now leaves at five, because the tickets no longer land in her inbox.”", "„Frau Berger, Office-Managerin einer Logistikfirma in Bremen, erzählte uns, dass sie jetzt um fünf geht, weil die Tickets nicht mehr in ihrem Postfach landen.“"),
    truth: "learn" as LevelTag,
    clue: t("Can the listener picture a person?", "Kann sich der Zuhörer eine Person vorstellen?"),
    why: t("A named person, her problem and what changed: a story that makes sentence 5 felt.", "Eine benannte Person, ihr Problem und was sich änderte: eine Story, die Satz 5 spürbar macht."),
    rejected: { personal: t("Sentence 5 says the benefit; this one shows it happened to someone.", "Satz 5 sagt den Nutzen; dieser zeigt, dass er jemandem passiert ist.") },
  },
  {
    id: "l9" as LineId,
    source: t("Conversation B", "Gespräch B"),
    text: t("“A dental group with six practices was worried about the move. We started with one practice, and after two weeks the other five asked to go next.”", "„Eine Zahnarztgruppe mit sechs Praxen hatte Sorge vor dem Umstieg. Wir begannen mit einer Praxis, und nach zwei Wochen wollten die anderen fünf als Nächste.“"),
    truth: "learn" as LevelTag,
    clue: t("Which emotion does it answer, and through whose experience?", "Welche Emotion beantwortet es, und durch wessen Erfahrung?"),
    why: t("A real customer's worry, what was done and the outcome: a story that answers the fear of change.", "Die Sorge eines echten Kunden, was getan wurde und das Ergebnis: eine Story, die die Angst vor Veränderung beantwortet."),
    rejected: { respond: t("Nothing about the product's parts; it is about people and what happened to them.", "Nichts über Teile des Produkts; es geht um Menschen und was ihnen passiert ist.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A1–A2 for each kind, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Feature", "Feature"), test: t("Is the product the subject: what it is, has or does, often with a technical name or a number?", "Ist das Produkt das Subjekt: was es ist, hat oder tut, oft mit technischem Namen oder einer Zahl?") },
  { name: t("Benefit", "Nutzen"), test: t("Is the customer the subject: what changes for them (time, money, risk, effort), in words they would use?", "Ist der Kunde das Subjekt: was sich für ihn ändert (Zeit, Geld, Risiko, Aufwand), in Worten, die er nutzen würde?") },
  { name: t("Story", "Story"), test: t("Is there a real customer the listener can picture, with a problem, what was done and what changed?", "Gibt es einen echten Kunden, den sich der Zuhörer vorstellen kann, mit einem Problem, was getan wurde, und einem Ergebnis?") },
  { name: t("Feature or benefit?", "Feature oder Nutzen?"), test: t("Ask “so what does the customer get from it?”. If the sentence already answers that, it is a benefit; if the listener has to work it out, it is a feature.", "Fragen Sie „Und was hat der Kunde davon?“. Beantwortet der Satz das schon, ist es ein Nutzen; muss der Zuhörer es sich erschließen, ist es ein Feature.") },
  { name: t("Benefit or story?", "Nutzen oder Story?"), test: t("A benefit says what will change for this customer. A story shows it already happened to another real customer, with a person, a problem and what changed.", "Ein Nutzen sagt, was sich für diesen Kunden ändern wird. Eine Story zeigt, dass es einem anderen echten Kunden schon passiert ist, mit einer Person, einem Problem und einem Ergebnis.") },
]);

/** The decisive phrase inside each sentence's own text, for "Highlight the key words" (never which kind it points to). */
export const LINE_KEY: Record<string, string> = bi({
  l1: t("automatic failover across three availability zones", "automatischem Failover über drei Verfügbarkeitszonen"),
  l2: t("42 configurable widgets and an open REST API", "42 konfigurierbare Widgets und eine offene REST-API"),
  l3: t("single sign-on via SAML 2.0", "Single Sign-on über SAML 2.0"),
  l4: t("your accounting keeps working and nobody in your team notices", "arbeitet Ihre Buchhaltung weiter, und niemand in Ihrem Team merkt etwas"),
  l5: t("no longer chase e-mails", "keinen E-Mails mehr hinterher"),
  l6: t("without forgetting passwords", "ohne Passwörter zu vergessen"),
  l7: t("lost a day of work in a server outage last year", "verlor letztes Jahr bei einem Serverausfall einen Arbeitstag"),
  l8: t("she now leaves at five", "dass sie jetzt um fünf geht"),
  l9: t("after two weeks the other five asked to go next", "nach zwei Wochen wollten die anderen fünf als Nächste"),
});
