"use client";

import { Block31, Block32, Block33, Block34, Block35, Block36 } from "@/components/task2/Blocks";
import { MemoPanel } from "@/components/task2/MemoPanel";
import { ExportBar } from "@/components/ui/ExportBar";
import { Callout } from "@/components/ui/MaterialCard";
import { MEASURE_BY_ID } from "@/data/measures";
import { PATTERNS, PATTERN_IDS, RISK_LABEL } from "@/data/patterns";
import { R2_BUDGET, R2_MONTHS } from "@/data/route2";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { memoBody } from "@/lib/exportDoc";
import { r2Missing } from "@/lib/missing";
import { TASK2_MINUTES } from "@/lib/routes";
import { exportName } from "@/lib/slug";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/** The situation of Route 2, stated once, directly above the task, with a soft pointer to the learner's own Route 1 answers. */
function CaseBrief() {
  const hydrated = useHydrated();
  const p = usePersisted();
  const jump = useJumpTo();
  const risks = PATTERN_IDS.filter((x) => p.l1.rows[x].risk).map((x) => `${PATTERNS[x].label} (${RISK_LABEL[p.l1.rows[x].risk!]})`);
  const chosen = p.l1.chosen.map((id) => MEASURE_BY_ID[id].name);
  const has = hydrated && (risks.length > 0 || chosen.length > 0);
  return (
    <section id="task-2" aria-labelledby="task2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="task2-h">{tt("The situation: you are the Chief Sales Officer", "Die Lage: Sie sind Chief Sales Officer")}</h2>
        <span className="smallcaps">{tt("Read once · about 4 min", "Einmal lesen · ca. 4 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("SalesTech has seen that offers with the benefit and a customer story close more than twice as often. You now answer for how the whole sales team communicates. The products need explaining, the competition is strong and customers don't understand the benefit. The budget is limited, the customers are of different types and time is short. The board wants an emotional sales strategy, and a communication decision now, although nobody knows how customers will react.", "SalesTech hat gesehen, dass Angebote mit Nutzen und Kunden-Story mehr als doppelt so oft abschließen. Sie verantworten jetzt, wie das ganze Vertriebsteam kommuniziert. Die Produkte sind erklärungsbedürftig, der Wettbewerb ist stark, und Kunden verstehen den Nutzen nicht. Das Budget ist begrenzt, die Kunden sind verschiedene Typen, und die Zeit ist knapp. Der Vorstand will eine emotionale Vertriebsstrategie und jetzt eine Kommunikationsentscheidung, obwohl niemand weiß, wie Kunden reagieren werden.")}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(R2_BUDGET)}</strong> {tt("(Case assumption)", "(Fallannahme)")}
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${R2_MONTHS} months`, `${R2_MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The storytelling approaches are in Block 3.2, the KPI candidates in Block 3.3, the tested approaches in Block 3.4, the measures and costs in Block 3.5, the baselines in Block 3.6.", "Die Storytelling-Ansätze stehen in Block 3.2, die KPI-Kandidaten in Block 3.3, die getesteten Ansätze in Block 3.4, die Maßnahmen und Kosten in Block 3.5, die Ausgangswerte in Block 3.6.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption md:col-span-2">
          <p className="smallcaps">{tt(`What you build · about ${TASK2_MINUTES} min`, `Was Sie bauen · ca. ${TASK2_MINUTES} Min.`)}</p>
          <ol className="mt-1 grid list-decimal gap-x-6 pl-4 text-ink sm:grid-cols-2">
            <li>{tt("The target vision of an emotional sales strategy", "Das Zielbild einer emotionalen Vertriebsstrategie")}</li>
            <li>{tt("The definition of central storytelling approaches", "Die Bestimmung zentraler Storytelling-Ansätze")}</li>
            <li>{tt("A KPI system that shows whether the strategy works", "Ein KPI-System, das zeigt, ob die Strategie wirkt")}</li>
            <li>{tt("Communication strategies per customer type, tested, with the risk analysis (the wrong approach, a lack of credibility)", "Kommunikationsstrategien pro Kundentyp, getestet, mit der Risikoanalyse (der falsche Ansatz, fehlende Glaubwürdigkeit)")}</li>
            <li>{tt("A measures architecture for implementation", "Eine Maßnahmenarchitektur für die Umsetzung")}</li>
            <li>{tt("A communication decision despite unclear customer reactions", "Eine Kommunikationsentscheidung trotz unklarer Kundenreaktionen")}</li>
          </ol>
        </div>
      </div>
      <div role="note" className="rounded-lg border border-gold bg-accentSoft p-3 text-caption text-ink" id="task1-quote">
        <p className="smallcaps text-accent">{tt("Where Route 1 left off · your own answers", "Wo Route 1 aufgehört hat · Ihre eigenen Antworten")}</p>
        {has ? (
          <p className="mt-1">
            {tt("Link to customer value per kind of metric: ", "Verbindung zum Kundenwert pro Art von Kennzahl: ")}
            <strong>{risks.join(", ") || tt("none yet", "noch keines")}</strong>. {tt("Measures you chose: ", "Von Ihnen gewählte Maßnahmen: ")}
            <strong>{chosen.join(", ") || tt("none yet", "noch keine")}</strong>.
          </p>
        ) : (
          <p className="mt-1">{tt("You have not answered Route 1 yet. That is fine: nothing here is blocked, and this box fills in when you do.", "Sie haben Route 1 noch nicht beantwortet. Das ist in Ordnung: Hier ist nichts gesperrt, und dieses Feld füllt sich, sobald Sie es tun.")}</p>
        )}
        <button type="button" onClick={() => jump("block-2-2", "/route-1/")} className="btn-ghost btn-sm mt-2">
          {tt("Go to Block 2.2 in Route 1", "Zu Block 2.2 in Route 1")}
        </button>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief gives the role (Chief Sales Officer or sales manager) and the situation: products that need explaining, strong competition, customers who don't understand the benefit, a limited budget, different customer types and time pressure, and a communication decision despite unclear customer reactions. The budget, the approaches, the uplifts, the costs and the baselines are made up for this exercise.", "Der Auftrag nennt die Rolle (Chief Sales Officer oder Vertriebsleitung) und die Lage: erklärungsbedürftige Produkte, starker Wettbewerb, Kunden, die den Nutzen nicht verstehen, ein begrenztes Budget, verschiedene Kundentypen und Zeitdruck, und eine Kommunikationsentscheidung trotz unklarer Kundenreaktionen. Budget, Ansätze, Uplifts, Kosten und Ausgangswerte sind für diese Übung erfunden.")}
        </p>
      </Callout>
    </section>
  );
}

export function Task2() {
  const p = usePersisted();
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, "l3-sales-strategy-memo");
  return (
    <div className="space-y-6">
      <CaseBrief />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <div className="min-w-0 space-y-6 pb-14 lg:pb-0">
          <Block31 />
          <Block32 />
          <Block33 />
          <Block34 />
          <Block35 />
          <Block36 />
          <ExportBar
            id="export-l3"
            previewTitle={tt("Preview of your memo", "Vorschau Ihres Memos")}
            exportLabel={tt("Export the Sales Strategy Memo", "Sales Strategy Memo exportieren")}
            docTitle="Sales Strategy Memo"
            filename={filename}
            missing={missing}
            buildBody={() => memoBody(p)}
            showPreview={false}
          />
        </div>
        <MemoPanel />
      </div>
    </div>
  );
}
