"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { AutomationGrid, DelayCost, FairTest, KpiTree, MomentProfile, PilotExample, ScoreExample } from "@/components/materi/diagramsA";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { LEVEL_TESTS } from "@/data/ladder";
import { PATTERNS, PATTERN_IDS, PATTERN_PAIR_TESTS, RISK_RULE } from "@/data/patterns";
import { EXPLAIN_RULE } from "@/data/measures";
import { MOSEL, MOSEL_RESULT } from "@/data/forecast";
import { euro, num, pct, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all. */
const p = "text-body text-ink";

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("B2B buyers like to think they decide on facts, but the decision starts with a feeling: do I trust these people, is this safe for me, will it make me look good, do firms like mine use it? Facts come in to check and justify the feeling. A pitch that only gives facts leaves the decision to chance.", "B2B-Käufer denken gern, sie entscheiden nach Fakten, aber die Entscheidung beginnt mit einem Gefühl: Vertraue ich diesen Leuten, ist das sicher für mich, stehe ich damit gut da, nutzen Firmen wie meine das? Fakten kommen dazu, um das Gefühl zu prüfen und zu begründen. Ein Pitch, der nur Fakten gibt, überlässt die Entscheidung dem Zufall.")}
      reasoning={[
        tt("Emotions dominate purchase decisions because the first judgement is fast and intuitive; slow reasoning mostly checks it afterwards. A customer who does not feel safe finds reasons not to buy, however good the facts.", "Emotionen dominieren Kaufentscheidungen, weil das erste Urteil schnell und intuitiv ist; langsames Abwägen prüft es meist erst danach. Ein Kunde, der sich nicht sicher fühlt, findet Gründe, nicht zu kaufen, egal wie gut die Fakten sind."),
        tt("Four emotional triggers matter most in B2B sales: trust (in the people), security (nothing goes wrong, for the firm and for me), status (being seen as ahead) and belonging (firms like mine choose this).", "Vier emotionale Trigger zählen im B2B-Vertrieb am meisten: Vertrauen (in die Menschen), Sicherheit (nichts geht schief, für die Firma und für mich), Status (als vorn gesehen werden) und Zugehörigkeit (Firmen wie meine wählen das)."),
        tt("To name the emotion a sentence addresses, ask what the customer would feel on hearing it: safer, proud, part of a group, sure of the person? A feature list addresses none of them.", "Um die Emotion zu benennen, die ein Satz anspricht, fragen Sie, was der Kunde beim Hören fühlen würde: sicherer, stolz, Teil einer Gruppe, sicher bei der Person? Eine Feature-Liste spricht keine davon an."),
        tt("Information is what the product is; emotion is what it means to the customer. Both are needed: emotion opens the decision, information backs it up.", "Information ist, was das Produkt ist; Emotion ist, was es für den Kunden bedeutet. Beides ist nötig: Emotion öffnet die Entscheidung, Information stützt sie."),
      ]}
      sources={["zaltman2003", "damasio1994", "kahneman2011"]}
    >
      <p className={p}>
        {tt(
          "Zaltman (2003) argues that most of what drives a purchase happens below conscious reasoning. Damasio (1994) showed that people whose emotional signals are damaged struggle to make even simple decisions: emotion is not the opposite of a good decision, it is part of it. Kahneman (2011) describes the fast, intuitive judgement that comes first and the slow reasoning that often only checks it.",
          "Zaltman (2003) argumentiert, dass das meiste, was einen Kauf antreibt, unterhalb des bewussten Abwägens geschieht. Damasio (1994) zeigte, dass Menschen, deren emotionale Signale gestört sind, sich schon mit einfachen Entscheidungen schwertun: Emotion ist nicht das Gegenteil einer guten Entscheidung, sie ist ein Teil davon. Kahneman (2011) beschreibt das schnelle, intuitive Urteil, das zuerst kommt, und das langsame Abwägen, das es oft nur prüft.",
        )}
      </p>
      <Diagram label={tt("What decided the purchase · a worked example on Havel Software", "Was den Kauf entschied · ein Beispiel mit Havel Software")} caption={tt("Choose a bar or a button and read what the trigger means and how a salesperson speaks to it.", "Wählen Sie einen Balken oder eine Schaltfläche und lesen Sie, was der Trigger bedeutet und wie ein Vertriebsmitarbeiter ihn anspricht.")}>
        <DelayCost />
      </Diagram>
      <DataTable
        head={[tt("Trigger", "Trigger"), tt("The customer's question", "Die Frage des Kunden"), tt("A sentence that speaks to it", "Ein Satz, der ihn anspricht")]}
        rows={[
          [tt("Trust", "Vertrauen"), tt("Will these people be there when it goes wrong?", "Sind diese Leute da, wenn es schiefgeht?"), tt("“You will have one named contact, and here is her mobile number.”", "„Sie haben eine benannte Ansprechpartnerin, und hier ist ihre Mobilnummer.“")],
          [tt("Security", "Sicherheit"), tt("Will this put my firm or my job at risk?", "Bringt das meine Firma oder meinen Job in Gefahr?"), tt("“We start with one department; if it does not work, you stop without cost.”", "„Wir beginnen mit einer Abteilung; wenn es nicht funktioniert, hören Sie ohne Kosten auf.“")],
          [tt("Status", "Status"), tt("Will this make me look good?", "Stehe ich damit gut da?"), tt("“Three of the five largest firms in your region already work this way.”", "„Drei der fünf größten Firmen Ihrer Region arbeiten schon so.“")],
          [tt("Belonging", "Zugehörigkeit"), tt("Do firms like mine choose this?", "Wählen Firmen wie meine das?"), tt("“A tax firm of your size in Kassel switched last year; here is what changed for them.”", "„Eine Steuerkanzlei Ihrer Größe in Kassel wechselte letztes Jahr; das hat sich für sie geändert.“")],
        ]}
        caption={tt("The four emotional triggers in B2B sales", "Die vier emotionalen Trigger im B2B-Vertrieb")}
      />
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("The same fact can be said three ways. As a feature it describes the product; as a benefit it says what changes for the customer; as a story it shows it happening to a real customer. A good story has a structure: problem → solution → benefit. Stories work more strongly than arguments because the listener pictures them and argues against them less.", "Dieselbe Tatsache lässt sich auf drei Arten sagen. Als Feature beschreibt sie das Produkt; als Nutzen sagt sie, was sich für den Kunden ändert; als Story zeigt sie es bei einem echten Kunden. Eine gute Story hat eine Struktur: Problem → Lösung → Nutzen. Storys wirken stärker als Argumente, weil der Zuhörer sie sich vorstellt und ihnen weniger widerspricht.")}
      reasoning={[
        ...LEVEL_TESTS.map((x) => `${x.name}: ${x.test}`),
        tt("A story in sales has three parts: the problem (a real customer, a real situation, often a worry), the solution (what was done, briefly) and the benefit (what changed, ideally with a number or a feeling).", "Eine Story im Vertrieb hat drei Teile: das Problem (ein echter Kunde, eine echte Lage, oft eine Sorge), die Lösung (was getan wurde, kurz) und den Nutzen (was sich änderte, idealerweise mit einer Zahl oder einem Gefühl)."),
        tt("Stories work more strongly than facts because the listener pictures the case, remembers it and argues against it less. Facts are still needed: they prove that the story is true and typical.", "Storys wirken stärker als Fakten, weil sich der Zuhörer den Fall vorstellt, ihn erinnert und weniger widerspricht. Fakten braucht es trotzdem: Sie belegen, dass die Story wahr und typisch ist."),
        tt("Comparing two conversations: look for the subject of the sentences (product or customer), whether a real customer appears, and which emotion is addressed. A conversation that never leaves the product addresses no emotion.", "Zwei Gespräche vergleichen: Achten Sie auf das Subjekt der Sätze (Produkt oder Kunde), ob ein echter Kunde vorkommt und welche Emotion angesprochen wird. Ein Gespräch, das das Produkt nie verlässt, spricht keine Emotion an."),
        tt("To improve a technical conversation, keep the facts and change the order: start with the customer's problem, say the benefit, tell a story of a similar customer, and use the feature as proof.", "Um ein technisches Gespräch zu verbessern, behalten Sie die Fakten und ändern die Reihenfolge: mit dem Problem des Kunden beginnen, den Nutzen sagen, eine Story eines ähnlichen Kunden erzählen und das Feature als Beleg nutzen."),
      ]}
      sources={["green2000", "escalas2004", "rackham1988"]}
    >
      <p className={p}>
        {tt(
          "Green and Brock (2000) found that people absorbed in a story are persuaded more by it and look for fewer counter-arguments. Escalas (2004) showed that stories link a product to the listener's own experience. Rackham (1988), studying thousands of sales calls, found that in large sales features persuade little, while benefits that answer a need the customer has stated persuade most.",
          "Green und Brock (2000) fanden, dass Menschen, die in eine Story eintauchen, stärker von ihr überzeugt werden und weniger Gegenargumente suchen. Escalas (2004) zeigte, dass Storys ein Produkt mit der eigenen Erfahrung des Zuhörers verbinden. Rackham (1988) stellte bei der Untersuchung Tausender Vertriebsgespräche fest, dass Features im großen Vertrieb wenig überzeugen, während Nutzen, die ein vom Kunden genanntes Bedürfnis beantworten, am meisten überzeugen.",
        )}
      </p>
      <Diagram label={tt("One fact, three ways · a worked example on Havel Software", "Eine Tatsache, drei Arten · ein Beispiel mit Havel Software")} caption={tt("Choose a fact and a way of saying it and compare the three versions; then try the worked sort below.", "Wählen Sie eine Tatsache und eine Art, sie zu sagen, und vergleichen Sie die drei Versionen; probieren Sie dann die Beispielsortierung darunter.")}>
        <MomentProfile />
      </Diagram>
      <Callout label={tt("A story must be true", "Eine Story muss wahr sein")} tone="rust">
        <p>{tt("Use only real customer cases, with the customer's approval, and figures you can show. A made-up or exaggerated story wins a meeting and loses the customer the day they check it.", "Nutzen Sie nur echte Kundenfälle, mit Freigabe des Kunden, und Zahlen, die Sie zeigen können. Eine erfundene oder übertriebene Story gewinnt ein Gespräch und verliert den Kunden an dem Tag, an dem er sie prüft.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Customers do not all hear the same pitch the same way. Four emotional customer types help a salesperson adapt: security-oriented (avoid risk), innovation-driven (be first), price-oriented (get the best value) and relationship-oriented (trust the people). The type shows in what customers ask and how they compare.", "Kunden hören nicht alle denselben Pitch gleich. Vier emotionale Kundentypen helfen einem Vertriebsmitarbeiter, sich anzupassen: sicherheitsorientiert (Risiko vermeiden), innovationsgetrieben (vorn sein), preisorientiert (den besten Wert bekommen) und beziehungsorientiert (den Menschen vertrauen). Der Typ zeigt sich darin, was Kunden fragen und wie sie vergleichen.")}
      reasoning={[
        tt("Security-oriented: 50% or more of the questions are about details and risks, and the customer compares several offers. Needs: proof, references, guarantees and a safe first step. Wrong approach: pressure, big promises, “be the first”.", "Sicherheitsorientiert: 50 % oder mehr der Fragen betreffen Details und Risiken, und der Kunde vergleicht mehrere Angebote. Braucht: Belege, Referenzen, Garantien und einen sicheren ersten Schritt. Falscher Ansatz: Druck, große Versprechen, „seien Sie der Erste“."),
        tt("Innovation-driven: asks about what is new and what comes next, often in detail, but does not compare much. Needs: what others are not yet doing, a vision. Wrong approach: “everyone already uses it”.", "Innovationsgetrieben: fragt nach Neuem und was als Nächstes kommt, oft im Detail, vergleicht aber wenig. Braucht: was andere noch nicht tun, eine Vision. Falscher Ansatz: „alle nutzen es schon“."),
        tt("Price-oriented: compares offers and talks about terms, with few risk questions. Needs: the value against the price, in money. Wrong approach: more technical detail, or a discount that makes the offer look like any other.", "Preisorientiert: vergleicht Angebote und spricht über Konditionen, mit wenigen Risikofragen. Braucht: den Wert gegenüber dem Preis, in Geld. Falscher Ansatz: mehr technische Details, oder ein Rabatt, der das Angebot wie jedes andere aussehen lässt."),
        tt("Relationship-oriented: talks about the people, how it feels and who they will work with. Needs: a person to trust and a story from a firm like theirs. Wrong approach: a cold, document-only process.", "Beziehungsorientiert: spricht über die Menschen, wie es sich anfühlt und mit wem er arbeiten wird. Braucht: eine Person, der er vertraut, und eine Story von einer Firma wie seiner. Falscher Ansatz: ein kühler Prozess nur mit Dokumenten."),
        tt("Many detailed questions alone do not make a customer security-oriented: an innovation-driven CTO asks in detail too, about what is new. Look at both signs: the kind of question and whether they compare.", "Viele Detailfragen allein machen einen Kunden nicht sicherheitsorientiert: Ein innovationsgetriebener CTO fragt auch im Detail, nach Neuem. Achten Sie auf beide Zeichen: die Art der Frage und ob verglichen wird."),
        tt("The four types are a practitioner model to guide a conversation, not a label for a person: listen, then adapt; a buying group often holds more than one type.", "Die vier Typen sind ein Praxismodell, um ein Gespräch zu leiten, kein Etikett für eine Person: zuhören, dann anpassen; eine Einkaufsgruppe enthält oft mehr als einen Typ."),
      ]}
      sources={["rackham1988", "dixonadamson2011"]}
    >
      <p className={p}>
        {tt(
          "Rackham (1988) showed that the best salespeople ask more questions and let the customer name their needs before they present anything. Dixon and Adamson (2011) found that in complex sales the message has to be tailored to each person in the buying group. The four types below are a practitioner model used in sales training to make that tailoring practical.",
          "Rackham (1988) zeigte, dass die besten Vertriebsleute mehr Fragen stellen und den Kunden seine Bedürfnisse nennen lassen, bevor sie etwas präsentieren. Dixon und Adamson (2011) fanden, dass im komplexen Vertrieb die Botschaft auf jede Person der Einkaufsgruppe zugeschnitten sein muss. Die vier Typen unten sind ein Praxismodell aus Vertriebstrainings, um dieses Zuschneiden praktisch zu machen.",
        )}
      </p>
      <Diagram label={tt("Four emotional customer types · a worked example on Havel Software", "Vier emotionale Kundentypen · ein Beispiel mit Havel Software")} caption={tt("Choose a prospect on the grid or in the list and read their type and why.", "Wählen Sie einen Interessenten im Raster oder in der Liste und lesen Sie seinen Typ und warum.")}>
        <AutomationGrid />
      </Diagram>
      <DataTable
        head={[tt("Type", "Typ"), tt("What they need", "Was er braucht"), tt("The risk of the wrong approach", "Das Risiko des falschen Ansatzes")]}
        rows={[
          [tt("Security-oriented", "Sicherheitsorientiert"), tt("Proof, references, a safe first step", "Belege, Referenzen, ein sicherer erster Schritt"), tt("Pressure or big promises make them walk away or stall", "Druck oder große Versprechen lassen ihn gehen oder zögern")],
          [tt("Innovation-driven", "Innovationsgetrieben"), tt("What is new, what others are not yet doing", "Was neu ist, was andere noch nicht tun"), tt("“Everyone uses it” makes the offer sound dull", "„Alle nutzen es“ lässt das Angebot langweilig klingen")],
          [tt("Price-oriented", "Preisorientiert"), tt("The value against the price, in money", "Der Wert gegenüber dem Preis, in Geld"), tt("More features or a discount turn the talk into haggling", "Mehr Features oder ein Rabatt machen das Gespräch zum Feilschen")],
          [tt("Relationship-oriented", "Beziehungsorientiert"), tt("A person to trust, a story from a firm like theirs", "Eine Person, der er vertraut, eine Story von einer Firma wie seiner"), tt("A cold, document-only process feels like being a number", "Ein kühler Prozess nur mit Dokumenten fühlt sich an wie eine Nummer zu sein")],
        ]}
        caption={tt("The four types, their needs and the risk of the wrong approach (practitioner model)", "Die vier Typen, ihre Bedürfnisse und das Risiko des falschen Ansatzes (Praxismodell)")}
      />
    </MaterialCard>
  );
}

export function CardA4() {
  const r = MOSEL_RESULT;
  return (
    <MaterialCard
      id="A4"
      scan={tt("To put a euro figure on a customer story, compare how often offers closed when they were presented technically and when they carried the benefit and a story. Three figures read it: the close rate of each group, the lift, and the extra revenue a year.", "Um einer Kunden-Story einen Euro-Wert zu geben, vergleichen Sie, wie oft Angebote abschlossen, wenn sie technisch präsentiert wurden, und wenn sie Nutzen und Story enthielten. Drei Werte lesen es: die Abschlussquote jeder Gruppe, der Lift und der zusätzliche Umsatz pro Jahr.")}
      reasoning={[
        tt("Close rate = deals ÷ offers × 100. Take both numbers from the same group's rows.", "Abschlussquote = Abschlüsse ÷ Angebote × 100. Nehmen Sie beide Zahlen aus den Zeilen derselben Gruppe."),
        tt("Lift = close rate with benefit and story ÷ technical close rate. Work out the technical rate from its own rows first; the groups are not the same size, so compare rates, never counts.", "Lift = Abschlussquote mit Nutzen und Story ÷ technische Abschlussquote. Berechnen Sie die technische Quote zuerst aus ihren eigenen Zeilen; die Gruppen sind nicht gleich groß, also vergleichen Sie Quoten, nie Zahlen."),
        tt("Extra revenue a year = offers a year × (rate with story − technical rate, as a share of one) × average deal value. Only the difference counts: technical offers would have closed their share anyway. One point is 0.01.", "Zusätzlicher Umsatz pro Jahr = Angebote pro Jahr × (Quote mit Story − technische Quote, als Anteil von eins) × durchschnittlicher Auftragswert. Nur der Unterschied zählt: Technische Angebote hätten ihren Anteil ohnehin abgeschlossen. Ein Punkt ist 0,01."),
        tt("Use the offers of a whole year, not the offers of one group.", "Nehmen Sie die Angebote eines ganzen Jahres, nicht die einer Gruppe."),
        tt("These figures compare offers where salespeople chose to tell a story or not, so they are not yet a fair test: say them as an estimate, and test fairly before you promise the full amount (Materi A6).", "Diese Werte vergleichen Angebote, bei denen Vertriebsleute eine Story erzählen wollten oder nicht, sind also noch kein fairer Test: Sagen Sie sie als Schätzung, und testen Sie fair, bevor Sie den ganzen Betrag versprechen (Materi A6)."),
        tt("A sentence about a customer story quotes at least one figure, says what to change first, and how sure it can be.", "Ein Satz über eine Kunden-Story nennt mindestens einen Wert, sagt, was zuerst zu ändern ist, und wie sicher man sein kann."),
      ]}
      sources={["provost2013"]}
    >
      <p className={p}>
        {tt(
          "Provost and Fawcett (2013) name rates, lift and expected value as the basic tools for reading any comparison: compare two groups, and put a value on the difference. Applied to sales communication, the groups are offers presented two ways. The worked example uses Havel Software's numbers; the steps are the same for any company.",
          "Provost und Fawcett (2013) nennen Raten, Lift und Erwartungswert als Grundwerkzeuge, um jeden Vergleich zu lesen: zwei Gruppen vergleichen und dem Unterschied einen Wert geben. Auf Vertriebskommunikation angewandt, sind die Gruppen Angebote, die auf zwei Arten präsentiert wurden. Das Beispiel nutzt die Zahlen von Havel Software; die Schritte sind für jedes Unternehmen gleich.",
        )}
      </p>
      <Diagram label={tt("What a customer story is worth · worked example on Havel Software (Case assumption)", "Was eine Kunden-Story wert ist · Beispiel mit Havel Software (Fallannahme)")} caption={tt("Move the slider to change how many offers Havel makes in a year.", "Bewegen Sie den Regler, um zu ändern, wie viele Angebote Havel pro Jahr macht.")}>
        <PilotExample />
      </Diagram>
      <DataTable
        head={[tt("Step", "Schritt"), tt("Calculation · Havel Software", "Rechnung · Havel Software"), tt("Result", "Ergebnis")]}
        rows={[
          [tt("1 · Close rate with benefit and story", "1 · Abschlussquote mit Nutzen und Story"), `${MOSEL.variant.orders} ÷ ${num(MOSEL.variant.sent)} × 100`, pct(r.rate)],
          [tt("2 · Technical close rate", "2 · Technische Abschlussquote"), `${MOSEL.control.orders} ÷ ${num(MOSEL.control.sent)} × 100`, pct(r.other)],
          [tt("3 · Lift", "3 · Lift"), `${num(r.rate)} ÷ ${num(r.other)}`, tt(`${num(r.lift)} times`, `${num(r.lift)}-mal`)],
          [tt("4 · Extra revenue a year", "4 · Zusätzlicher Umsatz pro Jahr"), `${num(MOSEL.yearly)} × ${num((r.rate - r.other) / 100)} × ${euro(MOSEL.order)}`, euro(r.extra)],
        ]}
        caption={tt("The four steps, on other numbers than the task", "Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}
      />
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Sales teams count a lot: calls, slides, brochures. Few of these numbers steer. An outcome KPI is the result (deals, revenue, customers kept); a driver KPI comes before it (offers with a story, second meetings); a guardrail must not get worse (promises the product cannot keep); a vanity metric counts activity (calls, slides).", "Vertriebsteams zählen viel: Anrufe, Folien, Broschüren. Wenige dieser Zahlen steuern. Ein Outcome-KPI ist das Ergebnis (Abschlüsse, Umsatz, gehaltene Kunden); ein Treiber-KPI kommt davor (Angebote mit Story, zweite Gespräche); eine Guardrail darf nicht schlechter werden (Versprechen, die das Produkt nicht halten kann); eine Vanity Metric zählt Aktivität (Anrufe, Folien).")}
      reasoning={[
        ...PATTERN_IDS.map((x) => `${PATTERNS[x].label}: ${PATTERNS[x].test}`),
        ...PATTERN_PAIR_TESTS.map((x) => `${x.pair} ${x.test}`),
        tt("Tag what a metric measures, not how it behaved last year: a driver that did not move with value is still a driver. Offers with a story count as a driver although the salespeople produce them: they change what the customer hears before the deal.", "Ordnen Sie zu, was eine Kennzahl misst, nicht wie sie sich letztes Jahr verhielt: Ein Treiber, der sich nicht mit dem Wert bewegte, ist trotzdem ein Treiber. Angebote mit Story zählen als Treiber, obwohl die Vertriebsleute sie erstellen: Sie ändern, was der Kunde vor dem Abschluss hört."),
        RISK_RULE.v,
        tt("How to use each kind: outcome → the target on the management dashboard; driver → the sales team leads, reviewed weekly; guardrail → a limit that stops an approach; vanity → stop reporting it as success. A bonus on a number rewards reporting it, not moving it.", "Wie man jede Art nutzt: Outcome → das Ziel im Management-Dashboard; Treiber → die Vertriebsteamleitungen, wöchentlich geprüft; Guardrail → eine Grenze, die einen Ansatz stoppt; Vanity → nicht mehr als Erfolg berichten. Ein Bonus auf eine Zahl belohnt, dass sie berichtet wird, nicht dass sie bewegt wird."),
        tt("For an emotional pitch, a credibility guardrail is essential: count the promises the product cannot keep and the stories that are not backed.", "Für einen emotionalen Pitch ist eine Guardrail für Glaubwürdigkeit unverzichtbar: Zählen Sie die Versprechen, die das Produkt nicht halten kann, und die Storys, die nicht belegt sind."),
        tt("A good set of three KPIs has at least one outcome and one driver, each with where the number comes from and a target; a guardrail is a strong third.", "Ein gutes Set aus drei KPIs hat mindestens ein Outcome und einen Treiber, jeder mit Quelle der Zahl und einem Ziel; eine Guardrail ist ein starker dritter."),
      ]}
      sources={["kaplan1992", "ries2011"]}
    >
      <p className={p}>
        {tt(
          "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Ries (2011) called the numbers that go up whatever you do “vanity metrics”. In sales, calls made and slides produced are the classic ones: they rise with effort and say nothing about whether customers understood.",
          "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Ries (2011) nannte die Zahlen, die steigen, egal was man tut, „Vanity Metrics“. Im Vertrieb sind geführte Anrufe und erstellte Folien die klassischen: Sie steigen mit dem Aufwand und sagen nichts darüber, ob Kunden verstanden haben.",
        )}
      </p>
      <Diagram label={tt("A KPI tree for sales communication · a worked example on Havel Software", "Ein KPI-Baum für Vertriebskommunikation · ein Beispiel mit Havel Software")} caption={tt("Choose a metric to read its kind, then show whether each moved with customer value last year.", "Wählen Sie eine Kennzahl, um ihre Art zu lesen, und zeigen Sie dann, ob sich jede letztes Jahr mit dem Kundenwert bewegte.")}>
        <KpiTree />
      </Diagram>
      <DataTable
        head={[tt("Kind", "Art"), tt("What it is", "Was es ist"), tt("Where it sits", "Wo es steht")]}
        rows={PATTERN_IDS.map((x) => [PATTERNS[x].label, PATTERNS[x].means, PATTERNS[x].shape])}
        caption={tt("The four kinds of metric", "Die vier Arten von Kennzahlen")}
      />
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt("Whether a story really sells more is tested, not believed: one change, a random split of opportunities in the same weeks, judged by the close rate, with a size fixed before the start. And every emotional approach passes a second test: is it authentic, or does it manipulate?", "Ob eine Story wirklich mehr verkauft, wird getestet, nicht geglaubt: eine Änderung, eine zufällige Aufteilung der Opportunities in denselben Wochen, an der Abschlussquote gemessen, mit einer vor dem Start festgelegten Größe. Und jeder emotionale Ansatz besteht einen zweiten Test: Ist er authentisch, oder manipuliert er?")}
      reasoning={[
        tt("One change: if the variant differs in two things and wins, nobody knows which one did it.", "Eine Änderung: Unterscheidet sich die Variante in zwei Dingen und gewinnt, weiß niemand, welches es war."),
        tt("A random split in the same weeks: comparing with last quarter, new prospects with existing customers, or prospects a salesperson chose lets something other than the story explain the difference.", "Eine zufällige Aufteilung in denselben Wochen: Der Vergleich mit dem Vorquartal, von neuen Interessenten mit Bestandskunden oder mit Interessenten, die ein Vertriebsmitarbeiter ausgewählt hat, lässt etwas anderes als die Story den Unterschied erklären."),
        tt("The KPI that decides is the result the problem is about (for a low close rate: deals per offer), not how interesting the meeting felt and not how long it lasted.", "Der KPI, der entscheidet, ist das Ergebnis, um das es beim Problem geht (bei niedriger Abschlussquote: Abschlüsse pro Angebot), nicht wie interessant sich das Gespräch anfühlte und nicht wie lange es dauerte."),
        tt("Fix the size before you start: about 100 decisions (won or lost) per group and at least one full sales cycle. Stopping when the story group is ahead picks a lucky moment.", "Legen Sie die Größe vor dem Start fest: etwa 100 Entscheidungen (gewonnen oder verloren) pro Gruppe und mindestens ein voller Verkaufszyklus. Zu stoppen, wenn die Story-Gruppe vorn liegt, wählt einen glücklichen Moment."),
        tt("Write the hypothesis (“if we …, then … rises, because …”) and the decision rule (roll out, keep testing, stop, and which guardrail must hold) before the test starts.", "Schreiben Sie die Hypothese („wenn wir …, dann steigt …, weil …“) und die Entscheidungsregel (ausrollen, weiter testen, stoppen, und welche Guardrail halten muss) vor dem Teststart auf."),
        tt("Authentic or manipulative? Authentic uses true stories, real risks and real proof, and leaves the decision to the customer. Manipulative invents urgency or scarcity, exaggerates, or plays on fears that are not real. The test: would you be comfortable if the customer knew exactly what you did and why?", "Authentisch oder manipulativ? Authentisch nutzt wahre Storys, echte Risiken und echte Belege und überlässt die Entscheidung dem Kunden. Manipulativ erfindet Dringlichkeit oder Knappheit, übertreibt oder spielt mit Ängsten, die nicht echt sind. Der Test: Wären Sie entspannt, wenn der Kunde genau wüsste, was Sie taten und warum?"),
        tt("Real uncertainties: a small base, stories told mainly to warm prospects (not a fair split), offers where nobody noted how they were presented, and a new product or a competitor's price cut. “The more emotional, the better”, “a good story works the same for every type” and “once the story is good, facts no longer matter” are mistakes, not uncertainties.", "Echte Unsicherheiten: eine kleine Basis, Storys vor allem warmen Interessenten erzählt (keine faire Aufteilung), Angebote, bei denen niemand notierte, wie sie präsentiert wurden, und ein neues Produkt oder eine Preissenkung eines Wettbewerbers. „Je emotionaler, desto besser“, „eine gute Story wirkt bei jedem Typ gleich“ und „ist die Story gut, zählen Fakten nicht mehr“ sind Fehler, keine Unsicherheiten."),
      ]}
      sources={["kohavi2020", "cialdini2006"]}
    >
      <p className={p}>
        {tt(
          "Kohavi, Tang and Xu (2020) collected what makes controlled experiments trustworthy: a random split, one change at a time, a size fixed in advance, guardrail metrics, and no peeking to stop early. Cialdini (2006) describes the principles that make people say yes, such as social proof, authority and scarcity, and shows how easily they are misused when the proof or the scarcity is not real.",
          "Kohavi, Tang und Xu (2020) haben gesammelt, was kontrollierte Experimente vertrauenswürdig macht: eine zufällige Aufteilung, eine Änderung auf einmal, eine vorab festgelegte Größe, Guardrail-Kennzahlen und kein vorzeitiges Hinschauen, um früh zu stoppen. Cialdini (2006) beschreibt die Prinzipien, die Menschen Ja sagen lassen, etwa sozialen Beweis, Autorität und Knappheit, und zeigt, wie leicht sie missbraucht werden, wenn der Beweis oder die Knappheit nicht echt ist.",
        )}
      </p>
      <Diagram label={tt("A fair test of a story, and how sure it is · a worked example on Havel Software", "Ein fairer Test einer Story, und wie sicher er ist · ein Beispiel mit Havel Software")} caption={tt("Switch between the four ways of running the test, then move the slider to change how many deals each group has.", "Wechseln Sie zwischen den vier Arten, den Test durchzuführen, und bewegen Sie dann den Regler, um zu ändern, wie viele Abschlüsse jede Gruppe hat.")}>
        <FairTest />
      </Diagram>
      <DataTable
        head={[tt("What the salesperson does", "Was der Vertriebsmitarbeiter tut"), tt("Authentic or manipulative?", "Authentisch oder manipulativ?"), tt("Why", "Warum")]}
        rows={[
          [tt("Tells a real, approved customer story", "Erzählt eine echte, freigegebene Kunden-Story"), tt("Authentic", "Authentisch"), tt("It is true and the customer can check it.", "Sie ist wahr, und der Kunde kann sie prüfen.")],
          [tt("Says “only three licences left at this price” when there is no limit", "Sagt „nur noch drei Lizenzen zu diesem Preis“, obwohl es keine Grenze gibt"), tt("Manipulative", "Manipulativ"), tt("The scarcity is invented to rush the decision.", "Die Knappheit ist erfunden, um die Entscheidung zu beschleunigen.")],
          [tt("Names a real risk the customer has and how others avoided it", "Nennt ein echtes Risiko des Kunden und wie andere es vermieden"), tt("Authentic", "Authentisch"), tt("It speaks to security with a true case.", "Es spricht Sicherheit mit einem wahren Fall an.")],
          [tt("Describes a data loss that never happened to scare the customer", "Beschreibt einen Datenverlust, der nie passiert ist, um den Kunden zu erschrecken"), tt("Manipulative", "Manipulativ"), tt("It plays on a fear with a made-up story.", "Es spielt mit einer Angst durch eine erfundene Story.")],
        ]}
        caption={tt("Authenticity versus manipulation (Case assumption)", "Authentizität gegen Manipulation (Fallannahme)")}
      />
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt("Choose measures by the plan's three tests, each Low (1) to High (3), multiplied: effect (how much it changes the result), comprehensibility (how easily the customer understands the benefit) and persuasiveness (how credibly it convinces). Then check the budget and which problems you answer.", "Wählen Sie Maßnahmen nach den drei Tests des Plans, jeweils Niedrig (1) bis Hoch (3), multipliziert: Wirkung (wie stark sie das Ergebnis ändert), Verständlichkeit (wie leicht der Kunde den Nutzen versteht) und Überzeugungskraft (wie glaubwürdig sie überzeugt). Prüfen Sie dann das Budget und welche Probleme Sie beantworten.")}
      reasoning={[
        EXPLAIN_RULE.v,
        tt("Effect: 3 if it changes what the customer hears in most offers and moves deals directly, 2 if it helps but depends on people using it or reaches few customers, 1 if it answers none of the problems.", "Wirkung: 3, wenn sie ändert, was der Kunde in den meisten Angeboten hört, und Abschlüsse direkt bewegt, 2, wenn sie hilft, aber davon abhängt, dass Menschen sie nutzen, oder wenige Kunden erreicht, 1, wenn sie keines der Probleme beantwortet."),
        tt("Persuasiveness: 3 if it is credible and speaks to an emotion (a true story, a real reference), 2 if it convinces some customers or only for a moment, 1 if it can backfire (generic or unchecked claims, pressure).", "Überzeugungskraft: 3, wenn sie glaubwürdig ist und eine Emotion anspricht (eine wahre Story, eine echte Referenz), 2, wenn sie manche Kunden oder nur kurz überzeugt, 1, wenn sie nach hinten losgehen kann (allgemeine oder ungeprüfte Behauptungen, Druck)."),
        tt("Match each measure to the problems it really answers: making the benefit clear in the customer's words or through a story answers “customers don't understand the benefit”; making the offer fit the customer and stand out answers “offers appear interchangeable”; changing the conversation itself answers “low close rate”. A brochure of features or a video of features answers none of these.", "Ordnen Sie jede Maßnahme den Problemen zu, die sie wirklich beantwortet: den Nutzen in den Worten des Kunden oder über eine Story klar machen beantwortet „Kunden verstehen den Nutzen nicht“; das Angebot passend und unterscheidbar machen beantwortet „Angebote wirken austauschbar“; das Gespräch selbst ändern beantwortet „niedrige Abschlussquote“. Eine Broschüre oder ein Video voller Features beantwortet keines davon."),
        tt("Stay inside the budget. If the plan is over, leave out the lowest score; do not trim every measure a little.", "Bleiben Sie im Budget. Liegt der Plan darüber, lassen Sie den niedrigsten Wert weg, statt jede Maßnahme ein bisschen zu kürzen."),
        tt("Order by score and by dependency: what the others build on (the stories) goes first; what spreads it (training) comes when there is something to spread.", "Ordnen Sie nach Wert und nach Abhängigkeit: Worauf die anderen aufbauen (die Storys), kommt zuerst; was es verbreitet (Training), kommt, wenn es etwas zu verbreiten gibt."),
      ]}
      sources={["hubbard2014", "dixonadamson2011"]}
    >
      <p className={p}>
        {tt(
          "Hubbard (2014) advises measuring what would change a decision. Dixon and Adamson (2011) add that in complex sales what persuades is a message that teaches the customer something about their own business and fits each person in the room. The plan names the evaluation for this day: effect × comprehensibility × persuasiveness.",
          "Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde. Dixon und Adamson (2011) ergänzen, dass im komplexen Vertrieb eine Botschaft überzeugt, die dem Kunden etwas über sein eigenes Geschäft beibringt und zu jeder Person im Raum passt. Der Plan nennt die Bewertung für diesen Tag: Wirkung × Verständlichkeit × Überzeugungskraft.",
        )}
      </p>
      <Diagram label={tt("Three measures of Havel Software, scored", "Drei Maßnahmen von Havel Software, bewertet")} caption={tt("Choose a measure to read its three scores and why each one is what it is.", "Wählen Sie eine Maßnahme, um ihre drei Werte zu lesen und warum jeder so ist.")}>
        <ScoreExample />
      </Diagram>
      <Bul
        items={[
          tt("Comprehensibility is read from what the customer hears, never guessed.", "Die Verständlichkeit wird aus dem gelesen, was der Kunde hört, nie geschätzt."),
          tt("A measure that impresses but leaves the benefit to the customer scores low.", "Eine Maßnahme, die beeindruckt, aber den Nutzen dem Kunden überlässt, punktet niedrig."),
        ]}
      />
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
