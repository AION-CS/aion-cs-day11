import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number; optional?: boolean };

/**
 * `optional: true` marks a card that no Core task block draws on (lib/progress.ts OPTIONAL_BLOCKS): collapsed by default via OptionalSection,
 * never removed (CLAUDE.md #35). A card a Core block needs stays Core even if an Optional block also cites it. Route 1 Optional cards: A4, A6.
 *
 * Day 11: Materi A (Route 1, Levels 1 and 2) seven cards, 60 minutes; Materi B (Route 2, Level 3) five cards, 60 minutes. */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Why emotions dominate purchase decisions: trust, security, status, belonging", "Warum Emotionen Kaufentscheidungen dominieren: Vertrauen, Sicherheit, Status, Zugehörigkeit"), minutes: 8 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Storytelling in sales: feature, benefit, story", "Storytelling im Vertrieb: Feature, Nutzen, Story"), minutes: 9 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Emotional customer types: security, innovation, price, relationship", "Emotionale Kundentypen: Sicherheit, Innovation, Preis, Beziehung"), minutes: 9 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("What a customer story is worth: close rate, lift and extra revenue", "Was eine Kunden-Story wert ist: Abschlussquote, Lift und zusätzlicher Umsatz"), minutes: 9, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("KPIs for sales communication: outcome, driver, guardrail and vanity metrics", "KPIs für Vertriebskommunikation: Outcome, Treiber, Guardrail und Vanity Metrics"), minutes: 8 },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("Testing a story fairly, and authenticity versus manipulation", "Eine Story fair testen, und Authentizität gegen Manipulation"), minutes: 9, optional: true },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("Prioritising approaches: effect, comprehensibility, persuasiveness", "Ansätze priorisieren: Wirkung, Verständlichkeit, Überzeugungskraft"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("An emotional sales strategy: the target vision", "Eine emotionale Vertriebsstrategie: das Zielbild"), minutes: 12, optional: true },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Central storytelling approaches: the decision first, then the proof", "Zentrale Storytelling-Ansätze: zuerst die Entscheidung, dann der Beleg"), minutes: 12, optional: true },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A KPI system for sales communication: four tests", "Ein KPI-System für Vertriebskommunikation: vier Tests"), minutes: 12, optional: true },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("Testing approaches per customer type: roll out, keep testing or stop", "Ansätze pro Kundentyp testen: ausrollen, weiter testen oder stoppen"), minutes: 12, optional: true },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("A communication decision under unclear customer reactions, and the measures", "Eine Kommunikationsentscheidung bei unklaren Kundenreaktionen, und die Maßnahmen"), minutes: 12 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · benefit, story, customer type", "Level 1 + 2 · Nutzen, Story, Kundentyp"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("Storytelling Analysis · one case", "Storytelling Analysis · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · emotional sales strategy", "Level 3 · emotionale Vertriebsstrategie"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Sales Strategy Memo · CSO", "Sales Strategy Memo · CSO"), minutes: TASK2_MINUTES },
  ],
});
