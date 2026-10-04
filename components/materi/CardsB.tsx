"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchExample, CompProfile, DataStages, LiftCases, SourceGrid } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR, R2_MONTHS } from "@/data/route2";
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
      <ShowMore id="B1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Dixon and Adamson (2011) found that the salespeople who win complex deals teach the customer something about their own business, tailor it to each person in the buying group and take control of the conversation, rather than simply building a relationship. Cialdini (2006) shows that the principles of persuasion work reliably, and that using them without real proof destroys the trust they depend on.",
            "Dixon und Adamson (2011) fanden, dass die Vertriebsleute, die komplexe Abschlüsse gewinnen, dem Kunden etwas über sein eigenes Geschäft beibringen, es auf jede Person der Einkaufsgruppe zuschneiden und das Gespräch führen, statt nur eine Beziehung aufzubauen. Cialdini (2006) zeigt, dass die Prinzipien der Überzeugung verlässlich wirken, und dass sie ohne echten Beleg das Vertrauen zerstören, auf dem sie beruhen.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Green and Brock (2000) showed that people absorbed in a story accept its conclusions more readily, which is exactly why a story must be true: the listener checks less while listening and more afterwards. Escalas (2004) found that stories work when the listener can connect them to their own situation, so the approach must speak to a decision the customer actually faces.",
            "Green und Brock (2000) zeigten, dass Menschen, die in eine Story eintauchen, ihre Schlüsse bereitwilliger annehmen, und genau darum muss eine Story wahr sein: Der Zuhörer prüft beim Zuhören weniger und danach mehr. Escalas (2004) fand, dass Storys wirken, wenn der Zuhörer sie mit seiner eigenen Lage verbinden kann, also muss der Ansatz eine Entscheidung ansprechen, vor der der Kunde tatsächlich steht.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) showed that managers steer better by a few linked measures, results and the drivers behind them, than by many unrelated ones. Ries (2011) warns against vanity metrics, numbers that rise whatever you do. In sales communication they are everywhere: presentations held, slides produced, likes on a story post.",
            "Kaplan und Norton (1992) zeigten, dass Führungskräfte besser nach wenigen verbundenen Kennzahlen steuern, Ergebnissen und den Treibern dahinter, als nach vielen unverbundenen. Ries (2011) warnt vor Vanity Metrics, Zahlen, die steigen, egal was man tut. In der Vertriebskommunikation sind sie überall: gehaltene Präsentationen, erstellte Folien, Likes für einen Story-Post.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) describe how firms that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Cialdini (2006) explains why urgency and scarcity work in the short run, and why customers who notice they were pushed stop trusting the seller.",
            "Kohavi, Tang und Xu (2020) beschreiben, wie Firmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Cialdini (2006) erklärt, warum Dringlichkeit und Knappheit kurzfristig wirken, und warum Kunden, die merken, dass sie gedrängt wurden, dem Verkäufer nicht mehr trauen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of decisions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Entscheidungen ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases />
      </Diagram>
      <ShowMore id="B4" part="table" label={tt("Show the table: a worked decision on other tests (Case assumption)", "Tabelle zeigen: Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}>
        <DataTable
          head={[tt("Neisse test", "Test bei Neisse"), tt("Uplift", "Uplift"), tt("Decisions", "Entscheidungen"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
          rows={[
            [tt("A customer story told in the follow-up call", "Eine Kunden-Story im Nachgespräch"), "+34%", "140", tt("Roll out", "Ausrollen"), tt("Sales", "Vertrieb")],
            [tt("A pilot offer for security-oriented customers", "Ein Pilotangebot für sicherheitsorientierte Kunden"), "+30%", "35", tt("Keep testing", "Weiter testen"), tt("Sales operations", "Sales Operations")],
            [tt("A free gift with every signed offer", "Ein Geschenk zu jedem unterschriebenen Angebot"), "+1%", "600", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
          ]}
          caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt(`An architecture is built in order: the base first (the approved stories and the KPIs), then the people and the proof, then the claims, then the story tools on backed claims, and the rest held back. Four tests tell you whether it holds, and with four months the time test matters. Decide now, pilot in stages, and say what you will watch and when you would stop.`, `Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (die freigegebenen Storys und die KPIs), dann die Menschen und der Beleg, dann die Aussagen, dann die Story-Tools auf belegten Aussagen, und der Rest wird zurückgehalten. Vier Tests sagen Ihnen, ob sie hält, und bei vier Monaten zählt der Zeittest. Entscheiden Sie jetzt, pilotieren Sie in Stufen, und sagen Sie, was Sie beobachten und wann Sie aufhören würden.`)}
      reasoning={[
        tt(`Build in this order. The base first: the approved story library and KPIs, so every conversation draws on stories the customers approved. Then the people and the proof: the reference programme so customers confirm the stories on a call, the story field in the CRM with a monthly review, and the proof pack for cautious customers. Then check the claims a story tool tells. Then the story tools that move a named KPI, on claims that are backed. Hold back the rest.`, `Bauen Sie in dieser Reihenfolge. Zuerst die Basis: freigegebene Story-Bibliothek und KPIs, damit jedes Gespräch auf Storys zurückgreift, die die Kunden freigegeben haben. Dann die Menschen und der Beleg: das Referenzkundenprogramm, damit Kunden die Storys in einem Gespräch bestätigen, das Story-Feld im CRM mit einem monatlichen Review und das Beleg-Paket für vorsichtige Kunden. Dann die Aussagen prüfen, die ein Story-Tool erzählt. Dann die Story-Tools, die einen benannten KPI bewegen, auf Aussagen, die belegt sind. Den Rest halten Sie zurück.`),
        tt(`Four tests check an architecture. The stories come first: the library and KPIs start no later than the first story tool. Every funded item has a purpose: it moves a named KPI or makes one measurable; a tool that writes stories by itself without showing its sources, and an image campaign that names no KPI, do neither. Claims backed: a story tool starts on claims of which at least ${QUALITY_BAR}% are backed by a real, approved customer case. It fits: inside the budget and in use by month ${R2_MONTHS}.`, `Vier Tests prüfen eine Architektur. Die Storys kommen zuerst: Bibliothek und KPIs starten nicht später als das erste Story-Tool. Jeder finanzierte Punkt hat einen Zweck: Er bewegt einen benannten KPI oder macht einen messbar; ein Werkzeug, das Storys selbst schreibt, ohne seine Quellen zu zeigen, und eine Imagekampagne, die keinen KPI nennt, tun keines von beidem. Aussagen belegt: Ein Story-Tool startet auf Aussagen, von denen mindestens ${QUALITY_BAR} % durch einen echten, freigegebenen Kundenfall belegt sind. Es passt: innerhalb des Budgets und bis Monat ${R2_MONTHS} im Einsatz.`),
        tt(`Time: an item is in use in the month = start + weeks ÷ 4, rounded up. A Now item starts in month 1; an After the proof is ready item starts in the month the reference programme is in use, so the programme has to be Now itself: a customer who confirms the story on a call is what backs the claim. With ${R2_MONTHS} months, an item of 14 or 16 weeks is in use only in month 5.`, `Zeit: Ein Punkt ist im Monat = Start + Wochen ÷ 4, aufgerundet, im Einsatz. Ein Jetzt-Punkt startet in Monat 1; ein Punkt „Wenn der Beleg bereit ist“ startet in dem Monat, in dem das Referenzkundenprogramm im Einsatz ist, das Programm muss also selbst auf Jetzt stehen: Ein Kunde, der die Story in einem Gespräch bestätigt, belegt die Aussage. Bei ${R2_MONTHS} Monaten ist ein Punkt mit 14 oder 16 Wochen erst in Monat 5 im Einsatz.`),
        tt(`Three bars show where the money sits: Budget (the money against the limit), Measurable (the share on items that are measured, whose claims are backed and that are in use within the ${R2_MONTHS} months) and Risk (the share on a black box, on claims below ${QUALITY_BAR}% backed or on an item in use only after the ${R2_MONTHS} months). Measurable and Risk are ranges, because the backing may be weaker than the brief says: a plan that holds at both ends is the safer one.`, `Drei Balken zeigen, wo das Geld liegt: Budget (das Geld gegen die Grenze), Messbar (der Anteil auf Punkten, die gemessen werden, deren Aussagen belegt sind und die innerhalb der ${R2_MONTHS} Monate im Einsatz sind) und Risiko (der Anteil auf einer Black Box, auf Aussagen unter ${QUALITY_BAR} % belegt oder auf einem Punkt, der erst nach den ${R2_MONTHS} Monaten im Einsatz ist). Messbar und Risiko sind Spannen, weil der Beleg schwächer sein kann, als der Auftrag sagt: Ein Plan, der an beiden Enden hält, ist der sicherere.`),
        tt(`Waiting for a customer survey is also a decision: customers rarely say what convinces them, they show it in real conversations, and every month of waiting the offers keep looking interchangeable. The brief asks for a decision despite unclear customer reactions.`, `Auf eine Kundenbefragung zu warten ist auch eine Entscheidung: Kunden sagen selten, was sie überzeugt, sie zeigen es in echten Gesprächen, und in jedem Monat des Wartens wirken die Angebote weiter austauschbar. Der Auftrag verlangt eine Entscheidung trotz unklarer Kundenreaktionen.`),
        tt(`Switching every conversation at once feels decisive, but a story that misfires with one customer type misfires in every meeting, and nothing is measured before the switch. Piloting with two types changes real conversations within weeks and learns how each type reacts.`, `Jedes Gespräch auf einmal umzustellen fühlt sich entschlossen an, aber geht eine Story bei einem Kundentyp daneben, dann in jedem Gespräch, und vor der Umstellung wird nichts gemessen. Mit zwei Typen zu pilotieren ändert innerhalb von Wochen echte Gespräche und zeigt, wie jeder Typ reagiert.`),
        tt(`Fund inside the budget, and fund nothing nobody at the company can check: a tool that writes stories by itself without showing its sources cannot be kept credible. A celebrity testimonial adds a famous face but no customer's own story.`, `Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand prüfen kann: Ein Werkzeug, das Storys selbst schreibt, ohne seine Quellen zu zeigen, lässt sich nicht glaubwürdig halten. Ein prominentes Testimonial bringt ein bekanntes Gesicht, aber keine eigene Story eines Kunden.`),
        tt(`What you will watch is one figure about customers (the close rate of offers, the share of customers who can repeat the benefit), not your own output (slides, calls, stories produced), the month it can first be read, and what you do if it falls short: stop, pause or change one thing.`, `Was Sie beobachten, ist eine Zahl über Kunden (die Abschlussquote der Angebote, der Anteil der Kunden, die den Nutzen wiedergeben können), nicht Ihr eigener Output (Folien, Anrufe, produzierte Storys), der Monat, in dem sie sich zuerst lesen lässt, und was Sie tun, wenn sie zu kurz greift: stoppen, pausieren oder eine Sache ändern.`),
        tt(`Every plan gives something and costs something. Say what it gives (measured, backed, inside the budget and the months) and what it leaves open (an item not now, claims below 80% backed if the backing is weaker, budget left unspent). A plan that differs from this order can still be argued: say why.`, `Jeder Plan gibt etwas und kostet etwas. Sagen Sie, was er gibt (gemessen, belegt, innerhalb von Budget und Monaten) und was er offen lässt (ein Punkt, der jetzt nicht kommt, Aussagen unter 80 % belegt, wenn der Beleg schwächer ist, ungenutztes Budget). Ein Plan, der von dieser Reihenfolge abweicht, lässt sich trotzdem vertreten: Sagen Sie, warum.`),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt(`A story guide and its base · a worked example on Neisse Systems`, `Ein Story-Leitfaden und seine Basis · ein Beispiel mit Neisse Systems`)} caption={tt(`Change when the approved stories start and how well the claims are backed, and watch the links.`, `Ändern Sie, wann die freigegebenen Storys starten und wie gut die Aussagen belegt sind, und beobachten Sie die Verbindungen.`)}>
        <ArchExample />
      </Diagram>
      <ShowMore id="B5" part="calc" label={tt("Show the worked numbers on another company (Case assumption)", "Die Rechenwege an einem anderen Unternehmen zeigen (Fallannahme)")}>
        <DataTable
          head={[tt("Rule", "Regel"), tt("Neisse's figures", "Zahlen von Neisse"), tt("Result", "Ergebnis")]}
          rows={[
            [tt(`Month in use: starts in month 1, needs 6 weeks`, `Monat im Einsatz: startet in Monat 1, braucht 6 Wochen`), "1 + 6 ÷ 4 = 1 + 2", tt(`month 3`, `Monat 3`)],
            [tt(`After the proof is ready: the reference programme is in use in month 2, the item needs 8 weeks`, `Wenn der Beleg bereit ist: Das Referenzkundenprogramm ist in Monat 2 im Einsatz, der Punkt braucht 8 Wochen`), "2 + 8 ÷ 4 = 2 + 2", tt(`starts month 2, in use month 4`, `Start Monat 2, im Einsatz Monat 4`)],
            [tt(`Time: a tool of 14 weeks that starts in month 1, in a plan of 4 months`, `Zeit: ein Werkzeug mit 14 Wochen, das in Monat 1 startet, in einem Plan von 4 Monaten`), "1 + 14 ÷ 4 = 1 + 4", tt(`month 5: too late`, `Monat 5: zu spät`)],
            [tt(`Claims backed: the guide's claims are 90% backed, the bar is 80%`, `Aussagen belegt: Die Aussagen des Leitfadens sind zu 90 % belegt, die Grenze ist 80 %`), "90 ≥ 80", tt(`ready`, `bereit`)],
            [tt(`The same guide when the backing is 15 points weaker`, `Derselbe Leitfaden, wenn der Beleg 15 Punkte schwächer ist`), "90 − 15 = 75 < 80", tt(`not ready`, `nicht bereit`)],
            [tt(`Money: three funded items against Neisse's €100,000`, `Geld: drei finanzierte Punkte gegen Neisses 100.000 €`), "30,000 + 25,000 + 15,000", tt(`€70,000, €30,000 left`, `70.000 €, 30.000 € übrig`)],
          ]}
          caption={tt(`Neisse's numbers (Case assumption). The panel in the task does this for you and says what it means.`, `Zahlen von Neisse (Fallannahme). Das Panel in der Aufgabe macht das für Sie und sagt, was es bedeutet.`)}
        />
      </ShowMore>
      <ShowMore id="B5" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt(`Stage it: the no-regret items first (the approved stories, the story field in the CRM), the story tools that need more backing when the reference programme is in use.`, `Stufenweise: die No-regret-Punkte zuerst (die freigegebenen Storys, das Story-Feld im CRM), die Story-Tools, die mehr Beleg brauchen, wenn das Referenzkundenprogramm im Einsatz ist.`),
            tt(`Premortem: imagine the strategy failed after four months, and write down why. Those reasons are what you watch.`, `Premortem: Stellen Sie sich vor, die Strategie sei nach vier Monaten gescheitert, und schreiben Sie auf, warum. Diese Gründe beobachten Sie.`),
          ]}
        />
      </ShowMore>
      <ShowMore id="B5" part="extra" label={tt("Show: Unclear reactions are not a reason to bet everything, or nothing", "Zeigen: Unklare Reaktionen sind kein Grund, alles oder nichts zu setzen")}>
        <Callout label={tt("Unclear reactions are not a reason to bet everything, or nothing", "Unklare Reaktionen sind kein Grund, alles oder nichts zu setzen")} tone="signal">
          <p>{tt(`Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: no-regret moves now, options that can be scaled later, and big bets only when the evidence is in. Klein (2007) adds the premortem, a short exercise that makes a team name the risks it would otherwise keep to itself.`, `Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: No-regret-Schritte jetzt, Optionen, die sich später ausweiten lassen, und große Wetten erst, wenn die Evidenz da ist. Klein (2007) ergänzt das Premortem, eine kurze Übung, die ein Team die Risiken nennen lässt, die es sonst für sich behielte.`)}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
