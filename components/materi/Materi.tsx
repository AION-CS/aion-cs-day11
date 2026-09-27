"use client";

import { CARDS_A } from "@/components/materi/CardsA";
import { CARDS_B } from "@/components/materi/CardsB";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { SECTIONS } from "@/data/materialIndex";
import type { RefKey } from "@/data/references";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["zaltman2003", "damasio1994", "kahneman2011", "green2000", "escalas2004", "rackham1988", "dixonadamson2011", "provost2013", "kaplan1992", "ries2011", "kohavi2020", "cialdini2006", "hubbard2014"];
const REFS_B: RefKey[] = ["dixonadamson2011", "cialdini2006", "green2000", "escalas2004", "kaplan1992", "ries2011", "kohavi2020", "courtney1997", "klein2007"];

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
      </header>
      {children}
    </section>
  );
}
const NOTE = () => tt("Check every source before you teach from it: page numbers and editions differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Seitenzahlen und Auflagen unterscheiden sich.");

export function MateriA() {
  const s = SECTIONS[1][0];
  return (
    <Block id={s.id} title={tt(`Materi A · ${s.minutes} minutes, facilitator-led`, `Materi A · ${s.minutes} Minuten, moderiert`)} intro={tt("Emotional sales psychology: emotions in the purchase decision, feature, benefit and story, customer types, what a story is worth, and how to measure and test it fairly", "Emotionale Verkaufspsychologie: Emotionen in der Kaufentscheidung, Feature, Nutzen und Story, Kundentypen, was eine Story wert ist, und wie man sie misst und fair testet")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Seven cards, Level 1 and Level 2 in one run: knowledge first (emotional triggers, feature, benefit and story, the four customer types, what a customer story is worth), then application (KPIs for sales communication, fair tests and authenticity, choosing measures). Every diagram uses Havel Software, another company, so the task is never answered for you.", "Sieben Karten, Level 1 und Level 2 in einem Durchgang: zuerst Wissen (emotionale Trigger, Feature, Nutzen und Story, die vier Kundentypen, was eine Kunden-Story wert ist), dann Anwendung (KPIs für Vertriebskommunikation, faire Tests und Authentizität, Maßnahmen wählen). Jedes Diagramm nutzt Havel Software, ein anderes Unternehmen, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      {CARDS_A.map((C, i) => (
        <C key={i} />
      ))}
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  const s = SECTIONS[2][0];
  return (
    <Block id={s.id} title={tt(`Materi B · ${s.minutes} minutes, facilitator-led`, `Materi B · ${s.minutes} Minuten, moderiert`)} intro={tt("An emotional sales strategy: the vision, the central storytelling approaches, the KPI system, testing approaches per customer type with a view to credibility, and a communication decision under unclear customer reactions", "Eine emotionale Vertriebsstrategie: das Zielbild, die zentralen Storytelling-Ansätze, das KPI-System, Ansätze pro Kundentyp testen mit Blick auf Glaubwürdigkeit, und eine Kommunikationsentscheidung bei unklaren Kundenreaktionen")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards for Level 3. You stop improving single conversations and start designing how the whole sales team communicates. Each card ends in rules the task uses; each diagram uses Neisse Systems, another company.", "Fünf Karten für Level 3. Sie verbessern keine einzelnen Gespräche mehr, sondern gestalten, wie das ganze Vertriebsteam kommuniziert. Jede Karte endet mit Regeln, die die Aufgabe nutzt; jedes Diagramm nutzt Neisse Systems, ein anderes Unternehmen.")}
      </p>
      {CARDS_B.map((C, i) => (
        <C key={i} />
      ))}
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
