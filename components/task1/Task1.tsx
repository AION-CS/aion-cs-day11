"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { TASK1_MINUTES } from "@/lib/routes";

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: SalesTech Solutions GmbH", "Der Fall: SalesTech Solutions GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · ca. 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("SalesTech Solutions GmbH sells IT solutions that need explaining to the Mittelstand: a platform for IT operations, security and collaboration. The products are good, but customers don't understand the benefit, offers look interchangeable next to the competitors', and too few offers close. The sales team recorded two conversations with the same kind of customer: in conversation A the salesperson explained the technical details, in conversation B the benefit and a customer story.", "SalesTech Solutions GmbH verkauft dem Mittelstand erklärungsbedürftige IT-Lösungen: eine Plattform für IT-Betrieb, Sicherheit und Zusammenarbeit. Die Produkte sind gut, aber Kunden verstehen den Nutzen nicht, Angebote wirken neben denen der Wettbewerber austauschbar, und zu wenige Angebote schließen ab. Das Vertriebsteam hat zwei Gespräche mit derselben Art Kunde aufgezeichnet: In Gespräch A erklärte der Vertriebsmitarbeiter die technischen Details, in Gespräch B den Nutzen und eine Kunden-Story.")}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine sentences from conversations A and B (Block 1.1).", "Neun Sätze aus den Gesprächen A und B (Block 1.1).")}</li>
            <li>{tt("Last year's offers, presented technically or with benefit and story, and eight prospects (Blocks 1.2 and 1.3).", "Die Angebote des letzten Jahres, technisch oder mit Nutzen und Story präsentiert, und acht Interessenten (Blöcke 1.2 und 1.3).")}</li>
            <li>{tt("Twelve metrics SalesTech's sales team reports today (Block 2.1).", "Zwölf Kennzahlen, die das Vertriebsteam von SalesTech heute berichtet (Block 2.1).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months`, `${MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The cost, the weeks and what the customer hears from every measure are printed in Block 2.4.", "Kosten, Wochen und was der Kunde durch jede Maßnahme hört, stehen in Block 2.4.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · about ${TASK1_MINUTES} min`, `So läuft die Aufgabe · ca. ${TASK1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Compare the two conversations, put a euro figure on a customer story, recognise customer types, and write three improvements for conversation A (Level 1).", "Die beiden Gespräche vergleichen, einer Kunden-Story einen Euro-Wert geben, Kundentypen erkennen und drei Verbesserungen für Gespräch A schreiben (Level 1).")}</li>
            <li>{tt("Define KPIs for sales communication and design a fair A/B test (Level 2).", "KPIs für Vertriebskommunikation festlegen und einen fairen A/B-Test entwerfen (Level 2).")}</li>
            <li>{tt("Choose three storytelling measures and defend the order.", "Drei Storytelling-Maßnahmen wählen und die Reihenfolge begründen.")}</li>
          </ol>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief says: two sales conversations, A focused on technical details and B on benefit and story; a customer who asks many detail questions, is risk-averse and compares offers; customers don't understand the benefit, offers appear interchangeable and the close rate is low; €90,000 and three months. Everything else is made up for this exercise: the sentences, the offer figures, the prospects, the metrics, the rates and the costs.", "Der Auftrag sagt: zwei Vertriebsgespräche, A mit Fokus auf technischen Details, B auf Nutzen und Story; ein Kunde, der viele Detailfragen stellt, risikoscheu ist und Angebote vergleicht; Kunden verstehen den Nutzen nicht, Angebote wirken austauschbar, und die Abschlussquote ist niedrig; 90.000 € und drei Monate. Alles andere ist für diese Übung erfunden: die Sätze, die Angebotszahlen, die Interessenten, die Kennzahlen, die Quoten und die Kosten.")}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-storytelling-file");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · about ${TASK1_MINUTES} minutes`, `Task 1 · ca. ${TASK1_MINUTES} Minuten`)}</p>
        <h2 id="task1-h">{tt("Storytelling Analysis: benefit, story, customer type", "Storytelling Analysis: Nutzen, Story, Kundentyp")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand the emotional effect", "Die emotionale Wirkung verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <Block12 />
      <Block13 />
      <Block14 />
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <Block22 />
      <Block23 />
      <Block24 />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your Storytelling Analysis File", "Vorschau Ihrer Storytelling Analysis File")}
        exportLabel={tt("Export the Storytelling Analysis File", "Storytelling Analysis File exportieren")}
        docTitle="Storytelling Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
    </section>
  );
}
