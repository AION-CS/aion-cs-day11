"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchExample, CompProfile, DataStages, LiftCases, SourceGrid } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR } from "@/data/route2";
import { tt } from "@/lib/lang";

/** Materi B: the five cards of Route 2 (Level 3). 60 minutes in all. */
const p = "text-body text-ink";

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("An emotional sales strategy is not a few good storytellers in the team. It is a benefit message in the customer's words for every product, a version of each story for every customer type, an owner and a KPI for every approach, and a monthly review. It is built around how customers decide, and it stays credible.", "Eine emotionale Vertriebsstrategie sind nicht ein paar gute Erzähler im Team. Sie ist eine Nutzenbotschaft in den Worten des Kunden für jedes Produkt, eine Version jeder Story für jeden Kundentyp, ein Owner und ein KPI für jeden Ansatz und ein monatliches Review. Sie ist darum gebaut, wie Kunden entscheiden, und sie bleibt glaubwürdig.")}
      reasoning={[
        tt("The benefit in the customer's words comes first: if the customer does not understand what changes for them, no story and no feature list can close the deal.", "Der Nutzen in den Worten des Kunden kommt zuerst: Versteht der Kunde nicht, was sich für ihn ändert, kann keine Story und keine Feature-Liste den Abschluss bringen."),
        tt("A version of each approach per customer type is what turns single good pitches into a strategy: the same story reassures a security-oriented customer with proof and wins a relationship-oriented one with the people in it.", "Eine Version jedes Ansatzes pro Kundentyp macht aus einzelnen guten Pitches eine Strategie: Dieselbe Story beruhigt einen sicherheitsorientierten Kunden mit Belegen und gewinnt einen beziehungsorientierten mit den Menschen darin."),
        tt("An owner and a KPI per approach and a monthly review by the same KPIs keep the strategy honest; both are good additions to the two foundations.", "Ein Owner und ein KPI pro Ansatz und ein monatliches Review nach denselben KPIs halten die Strategie ehrlich; beides sind gute Ergänzungen zu den zwei Fundamenten."),
        tt("Pushing every customer with the same urgency is the manipulation trap: it may win a meeting, but security-oriented customers walk away and the others stop trusting what they hear.", "Jeden Kunden mit derselben Dringlichkeit zu drängen ist die Manipulationsfalle: Es gewinnt vielleicht ein Gespräch, aber sicherheitsorientierte Kunden gehen, und die anderen trauen dem Gehörten nicht mehr."),
        tt("Promising whatever the customer wants to hear is not a vision: the credibility is lost the day the product does not keep the promise, and with it the reference and the renewal.", "Zu versprechen, was der Kunde hören will, ist kein Zielbild: Die Glaubwürdigkeit ist an dem Tag verloren, an dem das Produkt das Versprechen nicht hält, und mit ihr die Referenz und die Verlängerung."),
      ]}
      sources={["dixonadamson2011", "cialdini2006"]}
    >
      <p className={p}>
        {tt(
          "Dixon and Adamson (2011) found that the salespeople who win complex deals teach the customer something about their own business, tailor it to each person in the buying group and take control of the conversation, rather than simply building a relationship. Cialdini (2006) shows that the principles of persuasion work reliably, and that using them without real proof destroys the trust they depend on.",
          "Dixon und Adamson (2011) fanden, dass die Vertriebsleute, die komplexe Abschlüsse gewinnen, dem Kunden etwas über sein eigenes Geschäft beibringen, es auf jede Person der Einkaufsgruppe zuschneiden und das Gespräch führen, statt nur eine Beziehung aufzubauen. Cialdini (2006) zeigt, dass die Prinzipien der Überzeugung verlässlich wirken, und dass sie ohne echten Beleg das Vertrauen zerstören, auf dem sie beruhen.",
        )}
      </p>
      <Diagram label={tt("Four stages towards an emotional sales strategy · a worked example on Neisse Systems", "Vier Stufen zu einer emotionalen Vertriebsstrategie · ein Beispiel mit Neisse Systems")} caption={tt("Click a stage and read what changes for the company at that stage.", "Klicken Sie eine Stufe an und lesen Sie, was sich auf dieser Stufe für das Unternehmen ändert.")}>
        <DataStages />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Not every story deserves a place in the strategy. An approach is central when it helps the customer make a buying decision (switch, choose the safer offer, justify the price, trust for the long term); it is ready to use when enough of its claims are backed by a real, approved customer case. How nice the story is, is not the test.", "Nicht jede Story verdient einen Platz in der Strategie. Ein Ansatz ist zentral, wenn er dem Kunden bei einer Kaufentscheidung hilft (wechseln, das sicherere Angebot wählen, den Preis rechtfertigen, langfristig vertrauen); er ist bereit zum Einsatz, wenn genug seiner Aussagen durch einen echten, freigegebenen Kundenfall belegt sind. Wie schön die Story ist, ist nicht der Test.")}
      reasoning={[
        tt("The approach helps no buying decision of the customer (it is about us: our founder, our awards, our fair stand) → not central, however true or well told.", "Der Ansatz hilft dem Kunden bei keiner Kaufentscheidung (er handelt von uns: unser Gründer, unsere Auszeichnungen, unser Messestand) → nicht zentral, egal wie wahr oder gut erzählt."),
        tt(`It helps a decision and at least ${QUALITY_BAR}% of its claims are backed by a real, approved case → central: use it now, in a version for each customer type.`, `Er hilft bei einer Entscheidung, und mindestens ${QUALITY_BAR} % seiner Aussagen sind durch einen echten, freigegebenen Fall belegt → zentral: jetzt einsetzen, in einer Version für jeden Kundentyp.`),
        tt(`It helps a decision but less than ${QUALITY_BAR}% is backed → central, but collect proof first: telling it now risks a claim the customer cannot check.`, `Er hilft bei einer Entscheidung, aber weniger als ${QUALITY_BAR} % sind belegt → zentral, aber zuerst Belege sammeln: Ihn jetzt zu erzählen riskiert eine Behauptung, die der Kunde nicht prüfen kann.`),
        tt("Cost and how impressive a story sounds are not the test: a modest story with a real, checkable customer is central; a big ROI claim nobody can show is not ready.", "Kosten und wie beeindruckend eine Story klingt, sind nicht der Test: Eine bescheidene Story mit einem echten, prüfbaren Kunden ist zentral; eine große ROI-Behauptung, die niemand zeigen kann, ist nicht bereit."),
        tt("Lack of credibility is the main risk of an emotional pitch: one exaggerated story found out costs more trust than ten good ones build.", "Fehlende Glaubwürdigkeit ist das Hauptrisiko eines emotionalen Pitches: Eine übertriebene Story, die auffliegt, kostet mehr Vertrauen, als zehn gute aufbauen."),
      ]}
      sources={["green2000", "escalas2004"]}
    >
      <p className={p}>
        {tt(
          "Green and Brock (2000) showed that people absorbed in a story accept its conclusions more readily, which is exactly why a story must be true: the listener checks less while listening and more afterwards. Escalas (2004) found that stories work when the listener can connect them to their own situation, so the approach must speak to a decision the customer actually faces.",
          "Green und Brock (2000) zeigten, dass Menschen, die in eine Story eintauchen, ihre Schlüsse bereitwilliger annehmen, und genau darum muss eine Story wahr sein: Der Zuhörer prüft beim Zuhören weniger und danach mehr. Escalas (2004) fand, dass Storys wirken, wenn der Zuhörer sie mit seiner eigenen Lage verbinden kann, also muss der Ansatz eine Entscheidung ansprechen, vor der der Kunde tatsächlich steht.",
        )}
      </p>
      <Diagram label={tt("Neisse Systems' storytelling approaches, sorted by customer decision and backing", "Storytelling-Ansätze von Neisse Systems, nach Kundenentscheidung und Beleg sortiert")} caption={tt("Click an approach to read where it goes and why.", "Klicken Sie einen Ansatz an, um zu lesen, wohin er gehört und warum.")}>
        <SourceGrid />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("A KPI system for sales communication needs a few KPIs that pass four tests: linked to value, early, covering every customer and every offer, and measured automatically. Rate each candidate, capped by its printed facts. Counting activity (slides, calls, likes) tells you the team is busy, not that customers understood.", "Ein KPI-System für Vertriebskommunikation braucht wenige KPIs, die vier Tests bestehen: mit dem Wert verbunden, früh, jeden Kunden und jedes Angebot abdeckend und automatisch gemessen. Bewerten Sie jeden Kandidaten, gedeckelt durch seine gedruckten Fakten. Aktivität zu zählen (Folien, Anrufe, Likes) sagt Ihnen, dass das Team beschäftigt ist, nicht dass Kunden verstanden haben.")}
      reasoning={[
        ...CRITERIA.map((c) => `${c.name}: ${c.test} ${tt("Low", "Niedrig")}: ${c.low} ${tt("High", "Hoch")}: ${c.high}`),
        tt("The printed facts cap the ratings: not linked to value → link Low; after the customer has left or twice a year → early Low, monthly → at most Mid; only some customers → reach at most Mid; by a survey → measured automatically at most Mid, collected by hand → Low.", "Die gedruckten Fakten deckeln die Bewertungen: nicht mit dem Wert verbunden → Verbindung Niedrig; nachdem der Kunde gegangen ist oder zweimal im Jahr → früh Niedrig, monatlich → höchstens Mittel; nur einige Kunden → Reichweite höchstens Mittel; über eine Befragung → automatisch gemessen höchstens Mittel, von Hand gesammelt → Niedrig."),
        tt("A management system needs most of its KPIs to show a change within days or weeks; a number that counts the lost deals afterwards is for learning, not for steering.", "Ein Managementsystem braucht die meisten KPIs so, dass sie eine Veränderung innerhalb von Tagen oder Wochen zeigen; eine Zahl, die die verlorenen Abschlüsse hinterher zählt, dient dem Lernen, nicht dem Steuern."),
        tt("The KPI with the greatest leverage is usually the driver the problem names, if it is also linked to value and automatic: every approach can be steered by it within weeks.", "Der KPI mit der größten Hebelwirkung ist meist der Treiber, den das Problem nennt, wenn er zugleich mit dem Wert verbunden und automatisch ist: Jeder Ansatz lässt sich innerhalb von Wochen daran steuern."),
        tt("Measure per customer type where you can: a close rate that rises for relationship-oriented customers and falls for security-oriented ones averages out to “no change”, and the strategy learns nothing.", "Messen Sie, wo möglich, pro Kundentyp: Eine Abschlussquote, die bei beziehungsorientierten Kunden steigt und bei sicherheitsorientierten fällt, ergibt im Schnitt „keine Veränderung“, und die Strategie lernt nichts."),
      ]}
      sources={["kaplan1992", "ries2011"]}
    >
      <p className={p}>
        {tt(
          "Kaplan and Norton (1992) showed that managers steer better by a few linked measures, results and the drivers behind them, than by many unrelated ones. Ries (2011) warns against vanity metrics, numbers that rise whatever you do. In sales communication they are everywhere: presentations held, slides produced, likes on a story post.",
          "Kaplan und Norton (1992) zeigten, dass Führungskräfte besser nach wenigen verbundenen Kennzahlen steuern, Ergebnissen und den Treibern dahinter, als nach vielen unverbundenen. Ries (2011) warnt vor Vanity Metrics, Zahlen, die steigen, egal was man tut. In der Vertriebskommunikation sind sie überall: gehaltene Präsentationen, erstellte Folien, Likes für einen Story-Post.",
        )}
      </p>
      <Diagram label={tt("Four KPI candidates of Neisse Systems on four tests", "Vier KPI-Kandidaten von Neisse Systems nach vier Tests")} caption={tt("Choose a candidate and compare its profile with the printed facts under it.", "Wählen Sie einen Kandidaten und vergleichen Sie sein Profil mit den gedruckten Fakten darunter.")}>
        <CompProfile />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB4() {
  return (
    <MaterialCard
      id="B4"
      scan={tt("Communication strategies per customer type are chosen by testing them: every test ends in a decision, roll out, keep testing or stop, and who acts. Two numbers decide it: the uplift in the close rate over the control group, and how many decisions (won or lost) it rests on. An approach that costs credibility is stopped, however well it closes.", "Kommunikationsstrategien pro Kundentyp werden ausgewählt, indem man sie testet: Jeder Test endet in einer Entscheidung, ausrollen, weiter testen oder stoppen, und wer handelt. Zwei Zahlen entscheiden: der Uplift der Abschlussquote gegenüber der Kontrollgruppe und auf wie vielen Entscheidungen (gewonnen oder verloren) er beruht. Ein Ansatz, der Glaubwürdigkeit kostet, wird gestoppt, so gut er auch abschließt.")}
      reasoning={[
        tt(`Roll out when the uplift is ${LIFT_ACT}% or more and each group has at least ${CASES_MIN} decisions: the gain is clear and proven.`, `Ausrollen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt und jede Gruppe mindestens ${CASES_MIN} Entscheidungen hat: Der Gewinn ist klar und belegt.`),
        tt(`Keep testing when the uplift is ${LIFT_ACT}% or more but on fewer than ${CASES_MIN} decisions, or when it is between ${LIFT_WATCH}% and ${LIFT_ACT}%.`, `Weiter testen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt, aber auf weniger als ${CASES_MIN} Entscheidungen beruht, oder wenn er zwischen ${LIFT_WATCH} % und ${LIFT_ACT} % liegt.`),
        tt(`Stop when the uplift is below ${LIFT_WATCH}% or negative. Many decisions do not rescue a tiny uplift: they prove it is tiny.`, `Stoppen, wenn der Uplift unter ${LIFT_WATCH} % liegt oder negativ ist. Viele Entscheidungen retten keinen winzigen Uplift: Sie belegen, dass er winzig ist.`),
        tt("A guardrail can stop a winner: if customers complain about pressure, or say a story sounded exaggerated, the approach is not rolled out until the cause is fixed. This is the risk analysis of an emotional pitch: the wrong approach for a type, and a lack of credibility.", "Eine Guardrail kann einen Gewinner stoppen: Beschweren sich Kunden über Druck oder sagen, eine Story klinge übertrieben, wird der Ansatz nicht ausgerollt, bis die Ursache behoben ist. Das ist die Risikoanalyse eines emotionalen Pitches: der falsche Ansatz für einen Typ und fehlende Glaubwürdigkeit."),
        tt("Test per customer type: an approach that wins with price-oriented customers (an ROI story) may leave relationship-oriented ones cold, so a test that mixes them hides both effects.", "Testen Sie pro Kundentyp: Ein Ansatz, der bei preisorientierten Kunden gewinnt (eine ROI-Story), lässt beziehungsorientierte vielleicht kalt, also verbirgt ein Test, der sie mischt, beide Effekte."),
        tt("Who acts follows from where the approach lives: one used in the conversation goes to sales (field sales), one in the offer documents or the sales material goes to marketing; keep testing belongs to sales operations; a stopped test has no owner.", "Wer handelt, folgt daraus, wo der Ansatz lebt: Einer, der im Gespräch genutzt wird, geht an den Vertrieb (Außendienst), einer in den Angebotsdokumenten oder im Vertriebsmaterial an das Marketing; Weitertesten gehört Sales Operations; ein gestoppter Test hat keinen Owner."),
      ]}
      sources={["kohavi2020", "cialdini2006"]}
    >
      <p className={p}>
        {tt(
          "Kohavi, Tang and Xu (2020) describe how firms that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Cialdini (2006) explains why urgency and scarcity work in the short run, and why customers who notice they were pushed stop trusting the seller.",
          "Kohavi, Tang und Xu (2020) beschreiben, wie Firmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Cialdini (2006) erklärt, warum Dringlichkeit und Knappheit kurzfristig wirken, und warum Kunden, die merken, dass sie gedrängt wurden, dem Verkäufer nicht mehr trauen.",
        )}
      </p>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of decisions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Entscheidungen ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases />
      </Diagram>
      <DataTable
        head={[tt("Neisse test", "Test bei Neisse"), tt("Uplift", "Uplift"), tt("Decisions", "Entscheidungen"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
        rows={[
          [tt("A customer story told in the follow-up call", "Eine Kunden-Story im Nachgespräch"), "+34%", "140", tt("Roll out", "Ausrollen"), tt("Sales", "Vertrieb")],
          [tt("A pilot offer for security-oriented customers", "Ein Pilotangebot für sicherheitsorientierte Kunden"), "+30%", "35", tt("Keep testing", "Weiter testen"), tt("Sales operations", "Sales Operations")],
          [tt("A free gift with every signed offer", "Ein Geschenk zu jedem unterschriebenen Angebot"), "+1%", "600", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
        ]}
        caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
      />
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt("A communication decision under unclear customer reactions is made in stages: change the conversations now where the approach is backed and the customer type is clear, measure from the first day, and agree on the result that makes you change course. The measures architecture gives every funded item a start, one owner and a trigger.", "Eine Kommunikationsentscheidung bei unklaren Kundenreaktionen fällt in Stufen: die Gespräche jetzt dort ändern, wo der Ansatz belegt und der Kundentyp klar ist, ab dem ersten Tag messen und das Ergebnis vereinbaren, bei dem Sie den Kurs ändern. Die Maßnahmenarchitektur gibt jedem finanzierten Punkt einen Start, einen Owner und einen Trigger.")}
      reasoning={[
        tt("Waiting for a survey of what convinces customers is also a decision: customers rarely say what convinces them, they show it in how they decide, and every month of waiting the offers keep looking interchangeable. The brief asks for a decision despite unclear customer reactions.", "Auf eine Befragung zu warten, was Kunden überzeugt, ist auch eine Entscheidung: Kunden sagen selten, was sie überzeugt, sie zeigen es darin, wie sie entscheiden, und in jedem Monat des Wartens wirken die Angebote weiter austauschbar. Der Auftrag verlangt eine Entscheidung trotz unklarer Kundenreaktionen."),
        tt("Switching every conversation at once feels decisive, but if a story misfires with one customer type it misfires in every meeting, and nothing is measured before the switch. Staging changes real conversations within weeks and learns how each type reacts.", "Jedes Gespräch auf einmal umzustellen fühlt sich entschlossen an, aber geht eine Story bei einem Kundentyp daneben, dann in jedem Gespräch, und vor der Umstellung wird nichts gemessen. Stufenweise ändern sich echte Gespräche innerhalb von Wochen, und man lernt, wie jeder Typ reagiert."),
        tt("The stories first: the approved story library starts no later than the first other item, because the guides and the training tell these stories and the KPIs measure them.", "Die Storys zuerst: Die freigegebene Story-Bibliothek startet nicht später als der erste andere Punkt, weil die Leitfäden und das Training diese Storys erzählen und die KPIs sie messen."),
        tt("Fund inside the budget, and fund nothing nobody at the company can check: a tool that writes stories by itself without showing its sources cannot be kept credible.", "Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand prüfen kann: Ein Werkzeug, das Storys selbst schreibt, ohne seine Quellen zu zeigen, lässt sich nicht glaubwürdig halten."),
        tt("Owner test: who can change the item without asking anyone else? Trigger test: a metric, a number, a date and an action.", "Owner-Test: Wer kann den Punkt ändern, ohne jemanden zu fragen? Trigger-Test: eine Kennzahl, eine Zahl, ein Datum und eine Aktion."),
        tt("A tripwire measures how customers behave (the close rate, customers who can repeat the benefit), not your own output (slides, calls, stories produced), and its threshold is better than today.", "Ein Tripwire misst, wie Kunden sich verhalten (die Abschlussquote, Kunden, die den Nutzen wiedergeben können), nicht Ihren eigenen Output (Folien, Anrufe, produzierte Storys), und sein Schwellenwert ist besser als heute."),
        tt("When meetings improve and deals lag, check whether the close rate moved where the change was made, whether the base is large enough and whether a guardrail was hit, before you change the plan; do not stop what works, and do not buy what cannot be checked.", "Wenn die Gespräche besser werden und die Abschlüsse hinterherhinken, prüfen Sie, ob sich die Abschlussquote dort bewegte, wo die Änderung gemacht wurde, ob die Basis groß genug ist und ob eine Guardrail verletzt wurde, bevor Sie den Plan ändern; stoppen Sie nicht, was wirkt, und kaufen Sie nichts, was sich nicht prüfen lässt."),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt("Three funded items over four months · a worked example on Neisse Systems", "Drei finanzierte Punkte über vier Monate · ein Beispiel mit Neisse Systems")} caption={tt("Click a row to read its owner, its trigger and why it starts when it does.", "Klicken Sie eine Zeile an, um Owner, Trigger und den Grund für den Start zu lesen.")}>
        <ArchExample />
      </Diagram>
      <Bul
        items={[
          tt("Stage it: the no-regret items (the approved stories, the story field in the CRM) first, the training and the approaches for the other customer types when there is something to spread.", "Stufenweise: die No-regret-Punkte (die freigegebenen Storys, das Story-Feld im CRM) zuerst, das Training und die Ansätze für die anderen Kundentypen, wenn es etwas zu verbreiten gibt."),
          tt("Premortem: imagine the strategy failed after four months, and write down why. Those reasons are your assumptions to watch.", "Premortem: Stellen Sie sich vor, die Strategie sei nach vier Monaten gescheitert, und schreiben Sie auf, warum. Diese Gründe sind die Annahmen, die Sie beobachten."),
          tt("What does not fit gets a pickup point: the number and the date at which you look at it again.", "Was nicht passt, bekommt einen Pickup Point: die Zahl und das Datum, zu dem Sie es wieder ansehen."),
        ]}
      />
      <Callout label={tt("Unclear reactions are not a reason to bet everything, or nothing", "Unklare Reaktionen sind kein Grund, alles oder nichts zu setzen")} tone="signal">
        <p>{tt("Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: no-regret moves now, options that can be scaled later, and big bets only when the evidence is in. Klein (2007) adds the premortem, a short exercise that makes a team name the risks it would otherwise keep to itself.", "Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: No-regret-Schritte jetzt, Optionen, die sich später ausweiten lassen, und große Wetten erst, wenn die Evidenz da ist. Klein (2007) ergänzt das Premortem, eine kurze Übung, die ein Team die Risiken nennen lässt, die es sonst für sich behielte.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
