import { bi, t } from "@/lib/lang";

/**
 * Day 11 route registry: Customer Retention & Buying Behaviour in B2B IT Sales, Module 6 (one day): purposefully applying emotional
 * sales psychology and storytelling in sales. From Day 3 on, a day has TWO routes (CLAUDE.md #30): Route 1 merges Level 1 and
 * Level 2 on one case, Route 2 is Level 3.
 */
export const COURSE = bi({
  title: t("Emotional Sales Psychology and Storytelling in Sales", "Emotionale Verkaufspsychologie und Storytelling im Vertrieb"),
  site: t("Retention Lab · Day 11", "Retention Lab · Tag 11"),
  module: t("Module 6, one day", "Modul 6, ein Tag"),
  course: t("Customer Retention & Buying Behaviour in B2B IT Sales", "Customer Retention & Kaufverhalten im B2B-IT-Vertrieb"),
  day: 11,
  company: "SalesTech Solutions GmbH",
});

export type RouteNo = 1 | 2;

export const BLOCK_MINUTES = { "1.1": 6, "1.2": 5, "1.3": 9, "1.4": 5, "2.1": 11, "2.2": 6, "2.3": 8, "2.4": 14, "3.1": 5, "3.2": 8, "3.3": 10, "3.4": 8, "3.5": 10, "3.6": 9 } as const;
const sum = (keys: (keyof typeof BLOCK_MINUTES)[]) => keys.reduce((s, k) => s + BLOCK_MINUTES[k], 0);
export const TASK1_MINUTES = sum(["1.1", "1.2", "1.3", "1.4", "2.1", "2.2", "2.3", "2.4"]);
export const TASK2_MINUTES = sum(["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"]);

export type RouteInfo = { n: RouteNo; href: string; short: string; title: string; level: string; blurb: string; plan: { label: string; minutes: number }[]; built: boolean };

export const ROUTES: RouteInfo[] = bi([
  {
    n: 1 as RouteNo,
    href: "/route-1/",
    short: t("Storytelling", "Storytelling"),
    title: t("Route 1 · Benefit, story, customer type", "Route 1 · Nutzen, Story, Kundentyp"),
    level: t("Levels 1 + 2 · Knowledge and application", "Level 1 + 2 · Wissen und Anwendung"),
    blurb: t(
      "One case, two levels: SalesTech Solutions sells good products, but customers don't understand the benefit, offers look interchangeable and too few close. You learn why emotions dominate purchase decisions, how a story works (problem → solution → benefit), how to recognise four emotional customer types, and how to measure and test sales communication. Then two core blocks: you sort nine sentences from two sales conversations, and choose three measures inside €90,000 and three months. Six optional blocks go further: recognising customer types with three improvements, tagging twelve metrics and naming three KPIs, a read of the offer figures, a coaching reflection, what each kind of metric is worth and a fair test. Material first, then one task that ends in a Storytelling Analysis File.",
      "Ein Fall, zwei Level: SalesTech Solutions verkauft gute Produkte, aber Kunden verstehen den Nutzen nicht, Angebote wirken austauschbar, und zu wenige schließen ab. Sie lernen, warum Emotionen Kaufentscheidungen dominieren, wie eine Story wirkt (Problem → Lösung → Nutzen), wie man vier emotionale Kundentypen erkennt und wie man Vertriebskommunikation misst und testet. Dann zwei Kernblöcke: Sie sortieren neun Sätze aus zwei Vertriebsgesprächen und wählen drei Maßnahmen innerhalb von 90.000 € und drei Monaten. Sechs optionale Blöcke gehen weiter: Kundentypen erkennen, mit drei Verbesserungen, zwölf Kennzahlen zuordnen und drei KPIs nennen, eine Lektüre der Angebotswerte, eine Coaching-Reflexion, was jede Art von Kennzahl wert ist, und einen fairen Test. Erst das Material, dann eine Aufgabe, die mit einer Storytelling Analysis File endet.",
    ),
    plan: [
      { label: t("Materi A · seven cards, Levels 1 and 2", "Materi A · sieben Karten, Level 1 und 2"), minutes: 60 },
      { label: t("Task 1 · Storytelling Analysis, one task", "Task 1 · Storytelling Analysis, eine Aufgabe"), minutes: TASK1_MINUTES },
    ],
    built: true,
  },
  {
    n: 2 as RouteNo,
    href: "/route-2/",
    short: t("Decide", "Entscheiden"),
    title: t("Route 2 · Management decision", "Route 2 · Managemententscheidung"),
    level: t("Level 3 · Management decision", "Level 3 · Managemententscheidung"),
    blurb: t(
      "You are now SalesTech's Chief Sales Officer. The products need explaining, the competition is strong and customers don't understand the benefit. You set the target vision of an emotional sales strategy and build its architecture on a live panel that shows what your choices do: each of eight items is set to Now, After the proof is ready or Not now, and the diagram, three bars and four tests redraw at once. Then you make a communication decision although nobody knows how customers will react and say what you will watch and when you would stop. Four optional blocks go deeper. Material first, then one task that ends in a Sales Strategy Memo that assembles below your answers.",
      "Sie sind jetzt Chief Sales Officer von SalesTech. Die Produkte sind erklärungsbedürftig, der Wettbewerb ist stark, und Kunden verstehen den Nutzen nicht. Sie legen das Zielbild einer emotionalen Vertriebsstrategie fest und bauen ihre Architektur an einem Live-Panel, das zeigt, was Ihre Entscheidungen bewirken: Jeder von acht Punkten steht auf Jetzt, Wenn der Beleg bereit ist oder Jetzt nicht, und Diagramm, drei Balken und vier Tests zeichnen sich sofort neu. Dann treffen Sie eine Kommunikationsentscheidung, obwohl niemand weiß, wie Kunden reagieren werden, und sagen, was Sie beobachten und wann Sie aufhören würden. Vier optionale Blöcke vertiefen. Erst das Material, dann eine Aufgabe, die in einem Sales Strategy Memo endet, das sich unter Ihren Antworten zusammensetzt.",
    ),
    plan: [
      { label: t("Materi B · five cards, Level 3", "Materi B · fünf Karten, Level 3"), minutes: 60 },
      { label: t("Task 2 · Sales Strategy Memo", "Task 2 · Sales Strategy Memo"), minutes: TASK2_MINUTES },
    ],
    built: true,
  },
]);
