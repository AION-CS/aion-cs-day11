import { ARCH_IDS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Route 2 control panel reads (CLAUDE.md #47). Every figure is a Case assumption and is printed on the item cards and in "the
 * numbers today", so a Core block never reads an Optional one (#40): `data` is the share of the claims a story tool tells that are backed by a real,
 * approved customer case, the same figure the approach list of the “Go deeper” part prints for the approach it also names (a check in
 * `npm run verify:calc` keeps them equal). Nothing here asks the learner to calculate (#44): the panel computes it and says what it means.
 * (Identifiers keep the names of the file this was built from: `chat` is the conversation guides, `personal` the storytelling training, `routing` the
 * reference customer programme, `training` the story field in the CRM and the monthly review, `tracking` the proof pack, `suite` the AI pitch generator,
 * `relaunch` the image campaign.)
 */
export type Tier = "now" | "later" | "not";
export const TIER_IDS: Tier[] = ["now", "later", "not"];
export const TIER_LABEL = bi({ now: t("Now", "Jetzt"), later: t("After the proof is ready", "Wenn der Beleg bereit ist"), not: t("Not now", "Jetzt nicht") });

/** The "weaker backing" scenario: every backing figure is this many points lower (the plan's “unclear customer reactions”: fewer stories get approved). */
export const WEAK_POINTS = 15;
/** A story tool starts on claims that are at least this backed (the rule of Materi B5; the same bar as the “Go deeper” part's). */
export const READY_BAR = 80;

/** Where an item sits in the architecture diagram. */
export type Layer = "suite" | "site" | "engine" | "people" | "base";

export type PanelFacts = {
  layer: Layer;
  /** Short name for the diagram. */
  short: string;
  /** What the item does for the system, in one phrase after "Moves". */
  moves: string;
  /** It moves a named KPI of customers (a rate customers' behaviour changes). */
  named: boolean;
  /** It makes the other items measurable or usable (the story library and KPIs, the reference programme, the CRM story field, the proof pack). */
  enabler: boolean;
  /** Its effect can be measured once it is in place (a named KPI, or the measurement system itself). */
  measured: boolean;
  /** Share of the claims it tells that are backed by a real, approved customer case today (percent), or null when it needs no claims to start. */
  data: number | null;
  /** The reference programme backs the claims this item tells: it is ready when the programme is in use before the item starts. */
  cleaned: boolean;
  blackBox: boolean;
};

export const PANEL: Record<ArchId, PanelFacts> = bi({
  foundation: { layer: "base" as Layer, short: t("Approved story library and benefit messages", "Freigegebene Story-Bibliothek und Nutzenbotschaften"), moves: t("no KPI by itself: every conversation draws on stories the customers approved, and every KPI is defined once", "keinen KPI selbst: Jedes Gespräch greift auf Storys zurück, die die Kunden freigegeben haben, und jeder KPI wird einmal definiert"), named: false, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  chat: { layer: "engine" as Layer, short: t("Conversation guides per customer type", "Gesprächsleitfäden pro Kundentyp"), moves: t("the share of customers who can repeat the benefit", "den Anteil der Kunden, die den Nutzen wiedergeben können"), named: true, enabler: false, measured: true, data: 88, cleaned: false, blackBox: false },
  personal: { layer: "engine" as Layer, short: t("Storytelling training with role plays", "Storytelling-Training mit Rollenspielen"), moves: t("the close rate of offers", "die Abschlussquote der Angebote"), named: true, enabler: false, measured: true, data: 60, cleaned: true, blackBox: false },
  routing: { layer: "people" as Layer, short: t("Reference customer programme", "Referenzkundenprogramm"), moves: t("the close rate of offers to prospects who take a reference call", "die Abschlussquote der Angebote an Interessenten, die ein Referenzgespräch führen"), named: true, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  training: { layer: "people" as Layer, short: t("Story field in the CRM and a monthly review", "Story-Feld im CRM und ein monatliches Review"), moves: t("no KPI by itself: every offer records which story it used, and the review decides by the KPIs", "keinen KPI selbst: Jedes Angebot hält fest, welche Story es nutzte, und das Review entscheidet nach den KPIs"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  tracking: { layer: "people" as Layer, short: t("Proof pack for security-oriented customers", "Beleg-Paket für sicherheitsorientierte Kunden"), moves: t("no KPI by itself: a cautious customer can check figures, certificates and a small pilot before committing", "keinen KPI selbst: Ein vorsichtiger Kunde kann Zahlen, Zertifikate und ein kleines Pilotangebot prüfen, bevor er sich festlegt"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  suite: { layer: "suite" as Layer, short: t("AI pitch generator that writes every offer", "KI-Pitch-Generator, der jedes Angebot schreibt"), moves: t("no KPI it reports: its sources and claims are not shown", "keinen KPI, den er berichtet: Seine Quellen und Aussagen werden nicht gezeigt"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: true },
  relaunch: { layer: "site" as Layer, short: t("Image campaign with a celebrity testimonial", "Imagekampagne mit prominentem Testimonial"), moves: t("no KPI it names: a sports presenter recommends SalesTech, with no customer's own story behind it", "keinen KPI, den sie nennt: Ein Sportmoderator empfiehlt SalesTech, ohne die eigene Story eines Kunden dahinter"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: false },
});

/** The story tools that carry claims to customers: the conversation guides and the storytelling training. */
export const ENGINE_IDS: ArchId[] = ["chat", "personal"];
/** The item the "After the proof is ready" tier waits for (a reference customer who confirms the story on a call backs the claim), and the one that makes everything else measurable. */
export const CLEAN_ID: ArchId = "routing";
export const KPI_SYSTEM_ID: ArchId = "foundation";

/**
 * The model plan (CLAUDE.md #47): the six items that fit the budget; the storytelling training waits for the reference programme to back its claims;
 * the AI pitch generator and the image campaign stay out (both are in use only in month 5, after the 4 months, and neither names a KPI or can be checked).
 */
export const MODEL_TIER: Record<ArchId, Tier> = { foundation: "now", chat: "now", personal: "later", routing: "now", training: "now", tracking: "now", suite: "not", relaunch: "not" };
export const MODEL_ARCH: ArchId[] = ARCH_IDS.filter((id) => MODEL_TIER[id] !== "not");
