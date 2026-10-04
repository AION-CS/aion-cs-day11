"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { FORECAST, PILOT } from "@/data/forecast";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { BLOCK_MINUTES, TASK1_MINUTES } from "@/lib/routes";

const CORE_MIN = BLOCK_MINUTES["1.1"] + BLOCK_MINUTES["1.3"] + BLOCK_MINUTES["2.1"] + BLOCK_MINUTES["2.4"];

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
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `One first sign: last year ${num(PILOT.control.sent)} offers were presented technically and closed at ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })}%, while ${num(PILOT.variant.sent)} offers presented with benefit and a customer story closed at ${num(FORECAST.f1, { maximumFractionDigits: 1 })}%, ${num(FORECAST.f2)} times as often. Salespeople chose which offers got a story, so it is a hint, not proof.`,
            `Ein erstes Zeichen: Im letzten Jahr wurden ${num(PILOT.control.sent)} Angebote technisch präsentiert und schlossen mit ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} % ab, während ${num(PILOT.variant.sent)} Angebote mit Nutzen und Kunden-Story mit ${num(FORECAST.f1, { maximumFractionDigits: 1 })} % abschlossen, ${num(FORECAST.f2)}-mal so oft. Die Vertriebsleute wählten, welche Angebote eine Story bekamen, also ist es ein Hinweis, kein Beweis.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine sentences from conversations A and B (Block 1.1).", "Neun Sätze aus den Gesprächen A und B (Block 1.1).")}</li>
            <li>{tt("Eight prospects (Block 1.3); last year's offers, presented technically or with benefit and story (optional Block 1.2).", "Acht Interessenten (Block 1.3); die Angebote des letzten Jahres, technisch oder mit Nutzen und Story präsentiert (optionaler Block 1.2).")}</li>
            <li>{tt("Twelve metrics SalesTech's sales team reports today (Block 2.1) and nine measures it could fund (Block 2.4).", "Zwölf Kennzahlen, die das Vertriebsteam von SalesTech heute berichtet (Block 2.1), und neun Maßnahmen, die es finanzieren könnte (Block 2.4).")}</li>
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
          <p className="smallcaps">{tt(`How the task runs · four core blocks, about ${CORE_MIN} min`, `So läuft die Aufgabe · vier Kernblöcke, ca. ${CORE_MIN} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort nine sentences into feature, benefit or story, and name a weak moment of conversation A (Level 1).", "Block 1.1: neun Sätze in Feature, Nutzen oder Story sortieren und einen schwachen Moment aus Gespräch A nennen (Level 1).")}</li>
            <li>{tt("Block 1.3: recognise the security-oriented and the relationship-oriented prospects, and write three improvements for conversation A (Level 1).", "Block 1.3: die sicherheitsorientierten und die beziehungsorientierten Interessenten erkennen und drei Verbesserungen für Gespräch A schreiben (Level 1).")}</li>
            <li>{tt("Block 2.1: tag twelve sales metrics by kind and name your three KPIs (Level 2).", "Block 2.1: zwölf Vertriebskennzahlen nach Art zuordnen und Ihre drei KPIs nennen (Level 2).")}</li>
            <li>{tt("Block 2.4: choose three of nine measures, score them and defend the order (Level 2).", "Block 2.4: drei von neun Maßnahmen wählen, bewerten und die Reihenfolge begründen (Level 2).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Four more blocks (about ${TASK1_MINUTES - CORE_MIN} min) are optional and folded.`, `Vier weitere Blöcke (ca. ${TASK1_MINUTES - CORE_MIN} Min.) sind optional und eingeklappt.`)}</p>
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
        <p className="smallcaps text-accent">{tt(`Task 1 · four core blocks, optional blocks folded`, `Task 1 · vier Kernblöcke, optionale Blöcke eingeklappt`)}</p>
        <h2 id="task1-h">{tt("Storytelling Analysis: benefit, story, customer type", "Storytelling Analysis: Nutzen, Story, Kundentyp")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand the emotional effect", "Die emotionale Wirkung verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Read the offer figures: two close rates side by side", "Block 1.2 · Die Angebotswerte lesen: zwei Abschlussquoten nebeneinander")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one comparison without being fooled by it (salespeople chose which offers got a story); the choices of Block 2.4 do not need it.", "Übt, einen Vergleich zu lesen, ohne sich täuschen zu lassen (die Vertriebsleute wählten, welche Angebote eine Story bekamen); die Entscheidungen in Block 2.4 brauchen es nicht.")}
      >
        <Block12 />
      </OptionalSection>
      <Block13 />
      <OptionalSection
        id="block-1-4"
        title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.4"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the Storytelling Analysis File itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den die Storytelling Analysis File selbst braucht.")}
      >
        <Block14 />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · What each kind of metric is worth, and the uncertainties", "Block 2.2 · Was jede Art von Kennzahl wert ist, und die Unsicherheiten")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Reads what each kind of metric tells management, from your tags in Block 2.1, and what can mislead a measurement; Block 2.4 can be answered without it.", "Liest, was jede Art von Kennzahl dem Management sagt, aus Ihren Zuordnungen in Block 2.1, und was eine Messung in die Irre führen kann; Block 2.4 lässt sich auch ohne es beantworten.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Design a fair A/B test", "Block 2.3 · Einen fairen A/B-Test entwerfen")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("Applies the fair-test rules of Materi A6 to a story opening; the measures of Block 2.4 are chosen and scored without it.", "Wendet die Regeln eines fairen Tests aus Materi A6 auf einen Story-Einstieg an; die Maßnahmen in Block 2.4 werden auch ohne ihn gewählt und bewertet.")}
      >
        <Block23 />
      </OptionalSection>
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
