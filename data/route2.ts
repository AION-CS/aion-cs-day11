import { bi, t } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. SalesTech's Chief Sales Officer builds an emotional sales strategy for products that need
 * explaining, against strong competition, with a limited budget, different customer types and time pressure, and makes a communication
 * decision despite unclear customer reactions. Every figure is a Case assumption (the plan gives the role, the situation and the
 * constraints, not numbers). (Identifiers keep the names of the file this was built from: a "source" is a storytelling approach, a
 * "component" is a KPI candidate, a "situation" is a tested approach, `complete` is the share of an approach's claims backed by a real,
 * approved customer case; the owner ids cdo/datalead/cslead/saleslead/it now mean CSO/Sales Operations/Marketing/Field Sales/Customer
 * Success.)
 */
export const R2_BUDGET = 130000;
export const R2_MONTHS = 4;
export type Bucket = 1 | 2 | 3;

/* ------------------------------------------------------------------ 3.1 · target vision of an emotional sales strategy */

export type PrincipleId = "defs" | "rules" | "owners" | "review" | "hoard" | "blackbox";
export const PRINCIPLE_IDS: PrincipleId[] = ["defs", "rules", "owners", "review", "hoard", "blackbox"];
export const PRINCIPLES = bi({
  defs: { id: "defs" as PrincipleId, name: t("Sell the benefit in the customer's words, not the technology", "Den Nutzen in den Worten des Kunden verkaufen, nicht die Technologie"), means: t("Every conversation starts from what changes for this customer; features follow as proof.", "Jedes Gespräch beginnt bei dem, was sich für diesen Kunden ändert; Features folgen als Beleg.") },
  rules: { id: "rules" as PrincipleId, name: t("Every storytelling approach has a version for each customer type", "Jeder Storytelling-Ansatz hat eine Version für jeden Kundentyp"), means: t("The same story is told differently to a security-, innovation-, price- or relationship-oriented customer.", "Dieselbe Story wird einem sicherheits-, innovations-, preis- oder beziehungsorientierten Kunden verschieden erzählt.") },
  owners: { id: "owners" as PrincipleId, name: t("Every approach has an owner and a KPI", "Jeder Ansatz hat einen Owner und einen KPI"), means: t("Someone answers for each approach and sees whether it moves deals.", "Jemand steht für jeden Ansatz ein und sieht, ob er Abschlüsse bewegt.") },
  review: { id: "review" as PrincipleId, name: t("A monthly review decides on every approach by the same KPIs", "Ein monatliches Review entscheidet über jeden Ansatz nach denselben KPIs"), means: t("Every month: which approach to roll out, which to keep testing, which to stop, and what customers said.", "Jeden Monat: welcher Ansatz ausgerollt, welcher weiter getestet, welcher gestoppt wird, und was Kunden gesagt haben.") },
  hoard: { id: "hoard" as PrincipleId, name: t("Push every customer with the same urgency: act now or lose out", "Jeden Kunden mit derselben Dringlichkeit drängen: jetzt handeln oder verlieren"), means: t("One script with deadlines and scarcity for every customer.", "Ein Skript mit Fristen und Knappheit für jeden Kunden.") },
  blackbox: { id: "blackbox" as PrincipleId, name: t("Promise whatever the customer wants to hear", "Versprechen, was der Kunde hören will"), means: t("The story adapts to every wish; the product details are sorted out after signing.", "Die Story passt sich jedem Wunsch an; die Produktdetails klärt man nach der Unterschrift.") },
});
/** An emotional sales strategy needs both: the benefit in the customer's words (so they understand it) and a version per customer type (so it fits). */
export const PRINCIPLE_MUST: PrincipleId[] = ["defs", "rules"];
export const PRINCIPLE_TRAP: PrincipleId[] = ["hoard", "blackbox"];

/* ------------------------------------------------------------------ 3.2 · central storytelling approaches */

export type SourceId = "pricing" | "quote" | "chat" | "onboarding" | "social" | "renewal" | "blog" | "careers";
export const SOURCE_IDS: SourceId[] = ["pricing", "quote", "chat", "onboarding", "social", "renewal", "blog", "careers"];
export type Use = "core" | "later" | "leave";
export const USE_LABEL = bi({ core: t("Central: use now", "Zentral: jetzt einsetzen"), later: t("Central: collect proof first", "Zentral: zuerst Belege sammeln"), leave: t("Not central", "Nicht zentral") });
/** `decision` is the customer decision the approach supports (null when none); `complete` is the share of its claims backed by a real, approved customer case. */
export type Source = { id: SourceId; name: string; decision: string | null; complete: number; cost: number };
export const SOURCES: Source[] = bi([
  { id: "pricing" as SourceId, name: t("Story: the tax firm that has not lost an hour since switching", "Story: die Steuerkanzlei, die seit dem Wechsel keine Stunde verloren hat"), decision: t("Switch provider, or stay", "Den Anbieter wechseln, oder bleiben"), complete: 90, cost: 6000 },
  { id: "quote" as SourceId, name: t("Story: the hospital that passed its audit in the first month", "Story: das Krankenhaus, das im ersten Monat sein Audit bestand"), decision: t("Choose the safer offer", "Das sicherere Angebot wählen"), complete: 85, cost: 8000 },
  { id: "chat" as SourceId, name: t("Benefit message: one screen instead of chasing e-mails", "Nutzenbotschaft: ein Bildschirm statt E-Mails hinterherzulaufen"), decision: t("Understand why it is worth the price", "Verstehen, warum es den Preis wert ist"), complete: 88, cost: 4000 },
  { id: "onboarding" as SourceId, name: t("Story: the start-up that went live in two weeks", "Story: das Start-up, das in zwei Wochen live ging"), decision: t("Buy now, to be first", "Jetzt kaufen, um vorn zu sein"), complete: 50, cost: 7000 },
  { id: "social" as SourceId, name: t("Story: the family firm whose owner knows our support team by name", "Story: die Familienfirma, deren Inhaber unser Supportteam beim Namen kennt"), decision: t("Trust us for the long term", "Uns langfristig vertrauen"), complete: 60, cost: 6000 },
  { id: "renewal" as SourceId, name: t("ROI story: the logistics group that saved €200,000", "ROI-Story: die Logistikgruppe, die 200.000 € sparte"), decision: t("Justify the price internally", "Den Preis intern rechtfertigen"), complete: 40, cost: 9000 },
  { id: "blog" as SourceId, name: t("The founder's story of how SalesTech began", "Die Geschichte des Gründers, wie SalesTech begann"), decision: null, complete: 100, cost: 5000 },
  { id: "careers" as SourceId, name: t("Our awards and rankings", "Unsere Auszeichnungen und Rankings"), decision: null, complete: 95, cost: 3000 },
]);
export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, Source>;
export const QUALITY_BAR = 80;
/** The rule of Materi B2: no customer decision behind the approach → not central; a decision and ≥ 80% of its claims backed by a real case → use now; a decision but less backed → collect proof first. */
export const useOf = (s: Source): Use => (!s.decision ? "leave" : s.complete >= QUALITY_BAR ? "core" : "later");

/* ------------------------------------------------------------------ 3.3 · a KPI system for management */

export type CompId = "conv" | "cv" | "engage" | "nps" | "churn" | "emails" | "followers" | "stories";
export const COMP_IDS: CompId[] = ["conv", "cv", "engage", "nps", "churn", "emails", "followers", "stories"];
export type Criterion = "explain" | "timely" | "reach" | "scale";
export const CRIT_IDS: Criterion[] = ["explain", "timely", "reach", "scale"];
export const CRITERIA = bi([
  { id: "explain" as Criterion, name: t("Link to value", "Verbindung zum Wert"), test: t("Does it move with deals, revenue or customers kept?", "Bewegt er sich mit Abschlüssen, Umsatz oder gehaltenen Kunden?"), low: t("It counts our activity or reach.", "Er zählt unsere Aktivität oder Reichweite."), high: t("It is, or leads directly to, deals or customers kept.", "Er ist Abschlüsse oder gehaltene Kunden, oder führt direkt dazu.") },
  { id: "timely" as Criterion, name: t("Early", "Früh"), test: t("How early does it show a change, before the deal is lost?", "Wie früh zeigt er eine Veränderung, bevor der Abschluss verloren ist?"), low: t("After the customer has left, or twice a year.", "Nachdem der Kunde gegangen ist, oder zweimal im Jahr."), high: t("Every week or faster.", "Jede Woche oder schneller.") },
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("Does it cover every customer and every offer?", "Deckt er jeden Kunden und jedes Angebot ab?"), low: t("Some customers only.", "Nur einige Kunden."), high: t("Every customer.", "Jeden Kunden.") },
  { id: "scale" as Criterion, name: t("Measured automatically", "Automatisch gemessen"), test: t("Is it counted by the systems, without anyone collecting it?", "Wird er von den Systemen gezählt, ohne dass jemand ihn sammelt?"), low: t("Someone collects it by hand each time.", "Jemand sammelt ihn jedes Mal von Hand."), high: t("The systems count it by themselves.", "Die Systeme zählen ihn selbst.") },
]);
export type Cadence = "weekly" | "monthly" | "after" | "halfyear";
export type CostShape = "one-off" | "per customer" | "per analysis";
export type Comp = { id: CompId; name: string; what: string; explains: boolean; cadence: Cadence; coversAll: boolean; costShape: CostShape; model: Record<Criterion, Bucket>; note: string };
export const CADENCE_LABEL = bi({ weekly: t("every week", "jede Woche"), monthly: t("monthly", "monatlich"), after: t("after the customer has left", "nachdem der Kunde gegangen ist"), halfyear: t("twice a year", "zweimal im Jahr") });
export const COST_SHAPE_LABEL = bi({ "one-off": t("counted by the systems", "von den Systemen gezählt"), "per customer": t("by a survey", "über eine Befragung"), "per analysis": t("collected by hand", "von Hand gesammelt") });
export const LINK_LABEL = bi({ yes: t("linked to value", "mit dem Wert verbunden"), no: t("not linked to value", "nicht mit dem Wert verbunden") });
export const COMPS: Comp[] = bi([
  { id: "conv" as CompId, name: t("Close rate of offers", "Abschlussquote der Angebote"), what: t("Deals ÷ offers, per customer type.", "Abschlüsse ÷ Angebote, pro Kundentyp."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The result the brief is about, counted every week by the CRM.", "Das Ergebnis, um das es im Auftrag geht, jede Woche vom CRM gezählt.") },
  { id: "cv" as CompId, name: t("Offers with a customer story matched to the customer type", "Angebote mit einer zum Kundentyp passenden Kunden-Story"), what: t("Share of offers whose story fits the customer's type, from a CRM field.", "Anteil der Angebote, deren Story zum Typ des Kunden passt, aus einem CRM-Feld."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The driver the brief names (customers don't understand the benefit): it moves the week the team changes its pitch, and last year's data link it to deals.", "Der Treiber, den der Auftrag nennt (Kunden verstehen den Nutzen nicht): Er bewegt sich in der Woche, in der das Team seinen Pitch ändert, und die Daten des letzten Jahres verbinden ihn mit Abschlüssen.") },
  { id: "engage" as CompId, name: t("Customers who can repeat the benefit", "Kunden, die den Nutzen wiedergeben können"), what: t("Share of customers who state the main benefit in the follow-up call, recorded in the CRM.", "Anteil der Kunden, die im Nachgespräch den Hauptnutzen nennen, im CRM erfasst."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The earliest sign that the benefit landed, a week after the first meeting.", "Das früheste Zeichen, dass der Nutzen angekommen ist, eine Woche nach dem Erstgespräch.") },
  { id: "nps" as CompId, name: t("Satisfaction score from a survey", "Zufriedenheitswert aus einer Befragung"), what: t("How satisfied customers say they are with the sales process; about 20% answer.", "Wie zufrieden Kunden nach eigener Aussage mit dem Vertriebsprozess sind; etwa 20 % antworten."), explains: true, cadence: "halfyear" as Cadence, coversAll: false, costShape: "per customer" as CostShape, model: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value, but twice a year is too slow to steer four months by.", "Mit dem Wert verbunden, aber zweimal im Jahr ist zu langsam, um vier Monate danach zu steuern.") },
  { id: "churn" as CompId, name: t("Lost deals per quarter", "Verlorene Abschlüsse pro Quartal"), what: t("Offers the customer turned down in the quarter.", "Angebote, die der Kunde im Quartal abgelehnt hat."), explains: true, cadence: "after" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 1, reach: 3, scale: 3 }, note: t("Counts the loss exactly, after the customer has decided.", "Zählt den Verlust genau, nachdem der Kunde entschieden hat.") },
  { id: "emails" as CompId, name: t("Slides in the pitch deck", "Folien im Pitch-Deck"), what: t("Number of slides in the standard presentation.", "Zahl der Folien in der Standardpräsentation."), explains: false, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("It grew from 30 to 42 while the close rate fell: more information is not more understanding.", "Sie stieg von 30 auf 42, während die Abschlussquote fiel: mehr Information ist nicht mehr Verständnis.") },
  { id: "followers" as CompId, name: t("Likes on customer stories in social media", "Likes für Kunden-Storys in Social Media"), what: t("Likes on the story posts on SalesTech's company pages.", "Likes für die Story-Posts auf den Unternehmensseiten von SalesTech."), explains: false, cadence: "weekly" as Cadence, coversAll: false, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 2, scale: 3 }, note: t("Reach among whoever follows, not the decisions of buyers.", "Reichweite bei denen, die folgen, nicht die Entscheidungen von Käufern.") },
  { id: "stories" as CompId, name: t("Sales managers' monthly win stories", "Monatliche Erfolgsgeschichten der Vertriebsleitungen"), what: t("Each month, sales managers report the deals they won with a story.", "Jeden Monat berichten Vertriebsleitungen die Abschlüsse, die sie mit einer Story gewonnen haben."), explains: false, cadence: "monthly" as Cadence, coversAll: false, costShape: "per analysis" as CostShape, model: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Vivid, but it counts the wins someone chose to tell, without the losses and without a comparison.", "Anschaulich, aber sie zählt die Erfolge, die jemand erzählen wollte, ohne die Verluste und ohne Vergleich.") },
]);
export const COMP_BY_ID = Object.fromEntries(COMPS.map((c) => [c.id, c])) as Record<CompId, Comp>;
export const COMP_CHOOSE = 3;
export const MODEL_COMPS: CompId[] = ["conv", "cv", "engage"];
export const MODEL_GREATEST: CompId = "cv";
export function maxRating(id: CompId, c: Criterion): Bucket {
  const x = COMP_BY_ID[id];
  if (c === "explain") return x.explains ? 3 : 1;
  if (c === "timely") return x.cadence === "weekly" ? 3 : x.cadence === "monthly" ? 2 : 1;
  if (c === "reach") return x.coversAll ? 3 : 2;
  return x.costShape === "one-off" ? 3 : x.costShape === "per customer" ? 2 : 1;
}
export const isEarly = (id: CompId) => COMP_BY_ID[id].cadence === "weekly" || COMP_BY_ID[id].cadence === "monthly";

/* ------------------------------------------------------------------ 3.4 · the optimisation loop: roll out, keep testing, stop */

export type SitId = "reco" | "renewal" | "botname" | "subject" | "price" | "winback";
export const SIT_IDS: SitId[] = ["reco", "renewal", "botname", "subject", "price", "winback"];
export type Action = "intervene" | "watch" | "none";
export const ACTION_LABEL = bi({ intervene: t("Roll out", "Ausrollen"), watch: t("Keep testing", "Weiter testen"), none: t("Stop", "Stoppen") });
export type LogicOwner = "csm" | "sales" | "data" | "nobody";
export const LOGIC_OWNERS: LogicOwner[] = ["csm", "sales", "data", "nobody"];
export const LOGIC_OWNER_LABEL = bi({ csm: t("Marketing", "Marketing"), sales: t("Sales", "Vertrieb"), data: t("Sales operations", "Sales Operations"), nobody: t("No one (stopped)", "Niemand (gestoppt)") });
export type Situation = { id: SitId; signal: string; lift: number; cases: number; revenue: number; note: string };
export const SITUATIONS: Situation[] = bi([
  { id: "reco" as SitId, signal: t("An industry story as the opening of the first meeting", "Eine Branchen-Story als Einstieg ins Erstgespräch"), lift: 42, cases: 160, revenue: 190000, note: t("No complaints; second meetings up.", "Keine Beschwerden; mehr zweite Gespräche.") },
  { id: "renewal" as SitId, signal: t("An ROI story for price-oriented customers", "Eine ROI-Story für preisorientierte Kunden"), lift: 26, cases: 45, revenue: 80000, note: t("Few price-oriented customers in the test weeks.", "In den Testwochen wenige preisorientierte Kunden.") },
  { id: "botname" as SitId, signal: t("A countdown to the end of the offer", "Ein Countdown bis zum Ende des Angebots"), lift: 2, cases: 500, revenue: 8000, note: t("Many offers, almost no difference.", "Viele Angebote, fast kein Unterschied.") },
  { id: "subject" as SitId, signal: t("Video testimonials on the offer page", "Video-Testimonials auf der Angebotsseite"), lift: 5, cases: 280, revenue: 25000, note: t("A small, steady difference.", "Ein kleiner, stabiler Unterschied.") },
  { id: "price" as SitId, signal: t("An urgency script: “only this week”", "Ein Dringlichkeits-Skript: „nur diese Woche“"), lift: -7, cases: 150, revenue: -30000, note: t("Five complaints about pressure.", "Fünf Beschwerden über Druck.") },
  { id: "winback" as SitId, signal: t("The story library in every offer document", "Die Story-Bibliothek in jedem Angebotsdokument"), lift: 31, cases: 130, revenue: 140000, note: t("Guardrail: no complaints that a story was exaggerated.", "Guardrail: keine Beschwerden, dass eine Story übertrieben war.") },
]);
export const SIT_BY_ID = Object.fromEntries(SITUATIONS.map((s) => [s.id, s])) as Record<SitId, Situation>;
export const LIFT_ACT = 10;
export const LIFT_WATCH = 3;
export const CASES_MIN = 100;
export const actionOf = (s: Situation): Action => (s.lift >= LIFT_ACT && s.cases >= CASES_MIN ? "intervene" : s.lift >= LIFT_WATCH ? "watch" : "none");
export const OWNER_ACCEPT_LOGIC: Record<SitId, LogicOwner[]> = { reco: ["sales"], renewal: ["data"], botname: ["nobody"], subject: ["data"], price: ["nobody"], winback: ["csm"] };
export type LogicRow = { action: Action | null; owner: LogicOwner | null };

/* ------------------------------------------------------------------ 3.5 · prioritised implementation architecture */

export type ArchId = "foundation" | "chat" | "personal" | "routing" | "training" | "tracking" | "suite" | "relaunch";
export const ARCH_IDS: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking", "suite", "relaunch"];
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; blackBox: boolean };
export const ARCH: ArchItem[] = bi([
  { id: "foundation" as ArchId, name: t("Story library and benefit messages, approved by the customers", "Story-Bibliothek und Nutzenbotschaften, von den Kunden freigegeben"), what: t("Six real customer stories and one benefit message per product, each approved by the customer it names, with the KPIs to measure them.", "Sechs echte Kunden-Storys und eine Nutzenbotschaft pro Produkt, jede vom genannten Kunden freigegeben, mit den KPIs, um sie zu messen."), cost: 30000, weeks: 6, blackBox: false },
  { id: "chat" as ArchId, name: t("Conversation guides per customer type", "Gesprächsleitfäden pro Kundentyp"), what: t("For each type: the questions, the benefit to lead with, the proof to bring and the words to avoid.", "Für jeden Typ: die Fragen, der Nutzen zum Einstieg, der mitzubringende Beleg und die zu meidenden Worte."), cost: 20000, weeks: 4, blackBox: false },
  { id: "personal" as ArchId, name: t("Storytelling training with role plays", "Storytelling-Training mit Rollenspielen"), what: t("Two days for every salesperson: features into benefits, a story in two minutes, practice with each type.", "Zwei Tage für jeden Vertriebsmitarbeiter: Features in Nutzen, eine Story in zwei Minuten, Übung mit jedem Typ."), cost: 30000, weeks: 6, blackBox: false },
  { id: "routing" as ArchId, name: t("Reference customer programme", "Referenzkundenprogramm"), what: t("Twelve existing customers who agree to take a call from a prospect of their industry.", "Zwölf Bestandskunden, die zusagen, einen Anruf eines Interessenten ihrer Branche anzunehmen."), cost: 15000, weeks: 4, blackBox: false },
  { id: "training" as ArchId, name: t("Story field in the CRM and a monthly review", "Story-Feld im CRM und ein monatliches Review"), what: t("Which story each offer used, and a monthly meeting that decides on each approach by the KPIs.", "Welche Story jedes Angebot nutzte, und ein monatliches Treffen, das nach den KPIs über jeden Ansatz entscheidet."), cost: 10000, weeks: 2, blackBox: false },
  { id: "tracking" as ArchId, name: t("Proof pack for security-oriented customers", "Beleg-Paket für sicherheitsorientierte Kunden"), what: t("Case figures, certificates and a small pilot offer, so a cautious customer can check before committing.", "Fallzahlen, Zertifikate und ein kleines Pilotangebot, damit ein vorsichtiger Kunde prüfen kann, bevor er sich festlegt."), cost: 15000, weeks: 4, blackBox: false },
  { id: "suite" as ArchId, name: t("AI pitch generator that writes every offer", "KI-Pitch-Generator, der jedes Angebot schreibt"), what: t("A vendor tool writes the story and the offer for each prospect by itself; its sources and claims are not shown.", "Ein Anbieter-Werkzeug schreibt Story und Angebot für jeden Interessenten selbst; seine Quellen und Behauptungen werden nicht gezeigt."), cost: 50000, weeks: 10, blackBox: true },
  { id: "relaunch" as ArchId, name: t("Image campaign with a celebrity testimonial", "Imagekampagne mit prominentem Testimonial"), what: t("A known sports presenter recommends SalesTech in video and print.", "Ein bekannter Sportmoderator empfiehlt SalesTech in Video und Print."), cost: 60000, weeks: 12, blackBox: false },
]);
export const ARCH_BY_ID = Object.fromEntries(ARCH.map((a) => [a.id, a])) as Record<ArchId, ArchItem>;
export const BASELINE_ITEM: ArchId = "foundation";

export type OwnerId = "cdo" | "datalead" | "cslead" | "saleslead" | "it";
export const OWNER_IDS: OwnerId[] = ["cdo", "datalead", "cslead", "saleslead", "it"];
export const OWNERS = bi({
  cdo: { name: t("Chief Sales Officer (you)", "Chief Sales Officer (Sie)"), profile: t("Decides across teams and answers to the board. Should hold few items.", "Entscheidet über Teams hinweg und berichtet an den Vorstand. Sollte wenige Punkte halten.") },
  datalead: { name: t("Head of Sales Operations", "Leitung Sales Operations"), profile: t("Owns the CRM, the KPIs and their definitions, and the monthly review.", "Verantwortet das CRM, die KPIs und ihre Definitionen und das monatliche Review.") },
  cslead: { name: t("Head of Marketing", "Marketingleitung"), profile: t("Owns the stories, the benefit messages and all sales material.", "Verantwortet die Storys, die Nutzenbotschaften und alles Vertriebsmaterial.") },
  saleslead: { name: t("Head of Field Sales", "Leitung Außendienst"), profile: t("Leads the salespeople in their meetings and decides how they prepare and pitch.", "Führt die Vertriebsleute in ihren Gesprächen und entscheidet, wie sie sich vorbereiten und pitchen.") },
  it: { name: t("Head of Customer Success", "Leitung Customer Success"), profile: t("Owns the relationship with existing customers, including references.", "Verantwortet die Beziehung zu Bestandskunden, einschließlich Referenzen.") },
});
export const OWNER_ACCEPT: Record<ArchId, OwnerId[]> = {
  foundation: ["cslead", "cdo"],
  chat: ["saleslead", "cslead"],
  personal: ["saleslead"],
  routing: ["it"],
  training: ["datalead"],
  tracking: ["cslead", "saleslead"],
  suite: ["cslead", "cdo"],
  relaunch: ["cslead"],
};
export const MODEL_ARCH: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking"];
export const MODEL_START: Partial<Record<ArchId, number>> = { foundation: 1, chat: 1, training: 1, tracking: 1, personal: 2, routing: 2 };
export const MODEL_TRIGGER = bi({
  foundation: t("If fewer than four of the six stories are approved by their customers by the end of month 1, the training uses only the approved ones and the others wait.", "Sind bis Ende Monat 1 weniger als vier der sechs Storys von ihren Kunden freigegeben, nutzt das Training nur die freigegebenen, und die anderen warten."),
  chat: t("If fewer than 60% of offers use the guide of the customer's type by month 2, the Head of Field Sales reviews five offers with each team.", "Nutzen bis Monat 2 weniger als 60 % der Angebote den Leitfaden des Kundentyps, prüft die Leitung Außendienst mit jedem Team fünf Angebote."),
  personal: t("If fewer than half of the customers can repeat the benefit in the follow-up call by month 3, the role plays are repeated with the worst-scoring pitches.", "Können bis Monat 3 weniger als die Hälfte der Kunden im Nachgespräch den Nutzen wiedergeben, werden die Rollenspiele mit den schwächsten Pitches wiederholt."),
  routing: t("If fewer than eight reference customers have agreed by month 2, existing customers are asked with a thank-you offer.", "Haben bis Monat 2 weniger als acht Referenzkunden zugesagt, werden Bestandskunden mit einem Dankeschön-Angebot gefragt."),
  training: t("If the story field is empty for more than 20% of offers in any month, the review names the missing offers and their owners.", "Ist das Story-Feld in einem Monat bei mehr als 20 % der Angebote leer, nennt das Review die fehlenden Angebote und ihre Owner."),
  tracking: t("If more than 2 customers per month say a story or a figure sounded exaggerated, the claim is checked and removed until it is backed.", "Sagen mehr als 2 Kunden pro Monat, eine Story oder Zahl klinge übertrieben, wird die Behauptung geprüft und entfernt, bis sie belegt ist."),
});

/* ------------------------------------------------------------------ 3.6 · a decision under time pressure and uncertain data */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS = bi([
  { id: "commit" as DecisionId, label: t("Switch every conversation to the new story pitch at once", "Jedes Gespräch sofort auf den neuen Story-Pitch umstellen"), detail: t("From month 1, every salesperson uses the stories with every customer, and the old presentation is withdrawn.", "Ab Monat 1 nutzt jeder Vertriebsmitarbeiter die Storys bei jedem Kunden, und die alte Präsentation wird zurückgezogen."), why: t("Fast and bold, and it defends only if every customer type reacts to the stories the same way.", "Schnell und mutig, und nur vertretbar, wenn jeder Kundentyp gleich auf die Storys reagiert."), rejected: t("Nobody knows yet how each customer type reacts; if a story misfires with security-oriented customers, it misfires in every meeting at once, and nothing is measured before the switch.", "Niemand weiß schon, wie jeder Kundentyp reagiert; geht eine Story bei sicherheitsorientierten Kunden daneben, dann in jedem Gespräch gleichzeitig, und vor der Umstellung wird nichts gemessen.") },
  { id: "stage" as DecisionId, label: t("Decide now, pilot with two customer types, with a tripwire", "Jetzt entscheiden, mit zwei Kundentypen pilotieren, mit Tripwire"), detail: t("Start in month 1 with the approved stories and the guides for security- and relationship-oriented customers; add the other two types in month 2; scale only if the tripwire is met.", "In Monat 1 mit den freigegebenen Storys und den Leitfäden für sicherheits- und beziehungsorientierte Kunden starten; in Monat 2 die beiden anderen Typen ergänzen; nur skalieren, wenn der Tripwire erreicht ist."), why: t("It changes real conversations within weeks, learns how each type reacts, and keeps credibility safe before the approach reaches every customer.", "Es ändert echte Gespräche innerhalb von Wochen, lernt, wie jeder Typ reagiert, und sichert die Glaubwürdigkeit, bevor der Ansatz jeden Kunden erreicht."), rejected: t("", "") },
  { id: "wait" as DecisionId, label: t("Wait for a customer survey on what convinces them", "Auf eine Kundenbefragung warten, was sie überzeugt"), detail: t("Spend the four months on a survey before any conversation changes.", "Die vier Monate mit einer Befragung verbringen, bevor sich irgendein Gespräch ändert."), why: t("", ""), rejected: t("The brief asks for a decision despite unclear customer reactions. Customers rarely say what convinces them; they show it in how they decide, which only real conversations reveal.", "Der Auftrag verlangt eine Entscheidung trotz unklarer Kundenreaktionen. Kunden sagen selten, was sie überzeugt; sie zeigen es darin, wie sie entscheiden, und das zeigen nur echte Gespräche.") },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "conv" | "engage" | "cv" | "dashboards" | "emails";
export const KPIS = bi([
  { id: "conv" as KpiId, label: t("Close rate of offers", "Abschlussquote der Angebote"), unit: "%", baseline: 12, better: "up" as const, behaviour: true },
  { id: "engage" as KpiId, label: t("Customers who can repeat the benefit", "Kunden, die den Nutzen wiedergeben können"), unit: "%", baseline: 35, better: "up" as const, behaviour: true },
  { id: "cv" as KpiId, label: t("Offers with a matched customer story", "Angebote mit passender Kunden-Story"), unit: "%", baseline: 10, better: "up" as const, behaviour: false },
  { id: "dashboards" as KpiId, label: t("Slides in the pitch deck", "Folien im Pitch-Deck"), unit: t("slides", "Folien"), baseline: 42, better: "up" as const, behaviour: false },
  { id: "emails" as KpiId, label: t("Sales calls per week", "Vertriebsanrufe pro Woche"), unit: t("calls", "Anrufe"), baseline: 300, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
export const MODEL_TRIPWIRE = { kpi: "conv" as KpiId, threshold: 15, month: 4 };
export const R2_BASELINE_NOTE = bi({ v: t("Baselines are Case assumptions from SalesTech's CRM and follow-up calls of the last twelve months.", "Die Ausgangswerte sind Fallannahmen aus dem CRM und den Nachgesprächen von SalesTech der letzten zwölf Monate.") });
export const BOARD_CHALLENGE = bi({
  v: t(
    "It is month 2. The story pilot runs with security- and relationship-oriented customers. Second meetings rose from 30% to 45%, but the close rate only rose from 12% to 13%, and two customers said a story sounded exaggerated. The Head of Field Sales wants to drop the stories and go back to the feature presentation; marketing wants to buy the AI pitch generator to produce more stories faster. The board asks what you do.",
    "Es ist Monat 2. Der Story-Pilot läuft mit sicherheits- und beziehungsorientierten Kunden. Zweite Gespräche stiegen von 30 % auf 45 %, aber die Abschlussquote stieg nur von 12 % auf 13 %, und zwei Kunden sagten, eine Story klinge übertrieben. Die Leitung Außendienst will die Storys aufgeben und zur Feature-Präsentation zurück; das Marketing will den KI-Pitch-Generator kaufen, um schneller mehr Storys zu produzieren. Der Vorstand fragt, was Sie tun.",
  ),
});
