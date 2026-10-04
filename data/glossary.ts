import { getLang } from "@/lib/lang";

/**
 * Plain-language glossary (CLAUDE.md #19), in English and German (#32). Every technical term, abbreviation or German word that the
 * material or a task uses is an entry here. In the text it becomes a dotted link; a click opens the explanation. Written for someone
 * who is NOT an expert: short sentences, everyday words, one example where it helps.
 *
 * `match` lists every English written form; `de.match` every form the German text uses (the English term itself, with the German
 * plural or genitive forms, and German words). The German `title` keeps the English term where German practitioners use it. An
 * all-capitals match ("CRM") is matched exactly, so ordinary words never turn into links.
 */
export type GlossDe = { title?: string; match: string[]; plain: string; example?: string };
export type GlossEntry = {
  id: string;
  title: string;
  match: string[];
  exactCase?: boolean;
  plain: string;
  example?: string;
  from?: string;
  de?: GlossDe;
};

export const GLOSSARY: GlossEntry[] = [
  {
    id: "ai",
    title: "AI (artificial intelligence)",
    match: ["AI", "AI-based"],
    plain: "Software that learns patterns from data and uses them to predict or choose: which offer fits, what a text should say. Useful when its results can be measured; risky when nobody can say what it does.",
    from: "Davenport et al. 2020",
    de: { title: "KI (künstliche Intelligenz)", match: ["KI", "KI-gestützt", "KI-gestützte", "KI-gestützten", "KI-gestütztes"], plain: "Software, die Muster aus Daten lernt und damit vorhersagt oder auswählt: welches Angebot passt, was ein Text sagen soll. Nützlich, wenn man ihre Ergebnisse messen kann; riskant, wenn niemand sagen kann, was sie tut." },
  },
  // --- measuring success ---------------------------------------------------------------

  {
    id: "kpi",
    title: "KPI — key performance indicator",
    match: ["KPI", "KPIs"],
    plain: "One number that shows whether something is working. A good KPI measures what customers do (buy, use, stay), not your own activity.",
    from: "Kaplan & Norton 1992",
    de: { match: ["KPI", "KPIs", "KPI-System", "KPI-Kandidat", "KPI-Kandidaten"], plain: "Eine Zahl, die zeigt, ob etwas funktioniert. Ein guter KPI misst, was Kunden tun (kaufen, nutzen, bleiben), nicht Ihre eigene Aktivität." },
  },
  {
    id: "uplift",
    title: "Uplift",
    match: ["uplift", "uplifts"],
    plain: "How much better the new version did than the old one. As a multiple: new rate ÷ old rate; as a percentage: how much more that is.",
    example: "4.8% against 3%: 1.6 times the standard rate, an uplift of 60%.",
    from: "Provost & Fawcett 2013",
    de: { title: "Uplift", match: ["Uplift", "Uplifts"], plain: "Wie viel besser die neue Version abschnitt als die alte. Als Vielfaches: neue Rate ÷ alte Rate; in Prozent: wie viel mehr das ist.", example: "4,8 % gegenüber 3 %: das 1,6-Fache der Standardrate, ein Uplift von 60 %." },
  },
  {
    id: "pilot",
    title: "Pilot",
    match: ["pilot", "pilots"],
    plain: "A small first run of a new measure on part of the customers, to see whether it works before it reaches everyone.",
    de: { title: "Pilot", match: ["Pilot", "Piloten", "pilotieren", "Pilotwerte", "Pilotwerten"], plain: "Ein kleiner erster Durchlauf einer neuen Maßnahme mit einem Teil der Kunden, um zu sehen, ob sie wirkt, bevor sie alle erreicht." },
  },
  {
    id: "ab-test",
    title: "A/B test",
    match: ["A/B test", "A/B tests", "A/B testing", "A/B-testing"],
    plain: "Two versions shown at the same time to two groups chosen by chance: A gets the old version, B the new one. The difference in a KPI shows what the change did.",
    from: "Kohavi et al. 2020",
    de: { title: "A/B-Test", match: ["A/B-Test", "A/B-Tests", "A/B-Testing", "A/B-Testergebnisse"], plain: "Zwei Versionen, gleichzeitig an zwei zufällig gewählte Gruppen gezeigt: A bekommt die alte Version, B die neue. Der Unterschied in einem KPI zeigt, was die Änderung bewirkt hat." },
  },
  {
    id: "control-group",
    title: "Control group",
    match: ["control group", "control groups", "control"],
    exactCase: true,
    plain: "The group in a test that keeps the old version. Without it you cannot tell whether a change caused a difference or something else did.",
    de: { title: "Kontrollgruppe", match: ["Kontrollgruppe", "Kontrollgruppen", "Kontrollrate"], plain: "Die Gruppe in einem Test, die die alte Version behält. Ohne sie lässt sich nicht sagen, ob eine Änderung einen Unterschied verursacht hat oder etwas anderes." },
  },
  {
    id: "hypothesis",
    title: "Hypothesis",
    match: ["hypothesis"],
    plain: "What you expect a test to show, written before it starts: if we change this, then that KPI rises, because of this reason.",
    de: { title: "Hypothese", match: ["Hypothese"], plain: "Was ein Test zeigen soll, vor dem Start aufgeschrieben: Wenn wir dies ändern, steigt jener KPI, aus diesem Grund." },
  },
  {
    id: "sample",
    title: "Sample, sample size",
    match: ["sample", "small sample", "sample size"],
    plain: "The customers or orders a result rests on. With few of them, chance can move the result a lot; about 100 decisions (won or lost) per group is a common minimum before reading a test.",
    de: { title: "Stichprobe", match: ["Stichprobe", "Stichprobengröße", "Mindeststichprobe"], plain: "Die Kunden oder Bestellungen, auf denen ein Ergebnis beruht. Bei wenigen kann der Zufall das Ergebnis stark verschieben; etwa 100 Entscheidungen (gewonnen oder verloren) pro Gruppe sind ein übliches Minimum, bevor man einen Test liest." },
  },
  {
    id: "outcome-kpi",
    title: "Outcome KPI",
    match: ["outcome KPI", "outcome KPIs", "outcome", "outcomes"],
    exactCase: true,
    plain: "A KPI that is the result itself: orders, revenue, customers kept. It moves last and is what management is judged by.",
    from: "Kaplan & Norton 1992",
    de: { title: "Outcome-KPI", match: ["Outcome-KPI", "Outcome-KPIs", "Outcome", "Outcomes"], plain: "Ein KPI, der das Ergebnis selbst ist: Bestellungen, Umsatz, gehaltene Kunden. Er bewegt sich zuletzt, und das Management wird an ihm gemessen." },
  },
  {
    id: "driver-kpi",
    title: "Driver KPI",
    match: ["driver KPI", "driver KPIs", "driver", "drivers"],
    exactCase: true,
    plain: "A customer behaviour that comes before the result and that a team can move this month: offers that carry a customer story, second meetings, customers who can repeat the benefit.",
    from: "Kaplan & Norton 1992",
    de: { title: "Treiber-KPI", match: ["Treiber-KPI", "Treiber-KPIs", "Treiber"], plain: "Ein Kundenverhalten, das vor dem Ergebnis kommt und das ein Team in diesem Monat bewegen kann: Angebote mit Kunden-Story, zweite Gespräche, Kunden, die den Nutzen wiedergeben können." },
  },
  {
    id: "guardrail",
    title: "Guardrail",
    match: ["guardrail", "guardrails"],
    plain: "A metric that must not get worse while you push the result, such as complaints about pressure or promises the product cannot keep. If it is crossed, a test or rollout stops.",
    from: "Kohavi et al. 2020",
    de: { title: "Guardrail (Leitplanke)", match: ["Guardrail", "Guardrails", "Guardrail-Kennzahlen"], plain: "Eine Kennzahl, die nicht schlechter werden darf, während Sie das Ergebnis vorantreiben, etwa Beschwerden über Druck oder Versprechen, die das Produkt nicht halten kann. Wird sie überschritten, stoppt ein Test oder Rollout." },
  },
  {
    id: "vanity",
    title: "Vanity metric",
    match: ["vanity metric", "vanity metrics", "vanity"],
    plain: "A number that looks like progress but counts your own activity or reach (slides produced, calls made, likes) and decides nothing.",
    from: "Ries 2011",
    de: { title: "Vanity Metric", match: ["Vanity Metric", "Vanity Metrics", "Vanity"], plain: "Eine Zahl, die nach Fortschritt aussieht, aber die eigene Aktivität oder Reichweite zählt (erstellte Folien, geführte Anrufe, Likes) und nichts entscheidet." },
  },
  {
    id: "rollout",
    title: "Rollout",
    match: ["rollout", "roll out", "rolled out"],
    plain: "Giving a tested version to all customers, not just the test group.",
    de: { title: "Rollout", match: ["Rollout", "ausrollen", "ausgerollt"], plain: "Eine getestete Version allen Kunden geben, nicht nur der Testgruppe." },
  },
  {
    id: "ems",
    title: "Effect, comprehensibility, persuasiveness",
    match: ["comprehensibility", "Comprehensibility", "persuasiveness", "Persuasiveness"],
    plain: "The plan's three tests for a sales measure, each Low (1) to High (3), multiplied. Effect: how much it changes the result. Comprehensibility: how easily the customer understands the benefit (in their own words and through a story 3, as a benefit only 2, as features 1). Persuasiveness: how credibly it convinces.",
    example: "Effect 2 × comprehensibility 3 × persuasiveness 2 = 12.",
    de: { title: "Wirkung, Verständlichkeit, Überzeugungskraft", match: ["Verständlichkeit", "Überzeugungskraft"], plain: "Die drei Tests des Plans für eine Vertriebsmaßnahme, jeweils Niedrig (1) bis Hoch (3), multipliziert. Wirkung: wie stark sie das Ergebnis ändert. Verständlichkeit: wie leicht der Kunde den Nutzen versteht (in seinen eigenen Worten und über eine Story 3, nur als Nutzen 2, als Features 1). Überzeugungskraft: wie glaubwürdig sie überzeugt.", example: "Wirkung 2 × Verständlichkeit 3 × Überzeugungskraft 2 = 12." },
  },
  {
    id: "black-box",
    title: "Black box",
    match: ["black box", "black-box"],
    plain: "A system whose results you see but whose reasons you cannot. It may be right, but nobody can check it, explain it or measure what it did.",
    de: { title: "Black Box", match: ["Black Box", "Black-Box"], plain: "Ein System, dessen Ergebnisse man sieht, dessen Gründe aber nicht. Es kann stimmen, aber niemand kann es prüfen, erklären oder messen, was es bewirkt hat." },
  },
  // --- general terms kept from the course ------------------------------------------

  {
    id: "churn",
    title: "Churn, churn rate",
    match: ["churn", "churn rate", "churn rates", "churned"],
    plain: "Churn means customers leaving. The churn rate is the share who leave in a period.",
    example: "400 customers and 32 cancellations in a year: a churn rate of 8%.",
    de: { title: "Churn, Churn Rate (Abwanderungsquote)", match: ["Churn", "Churn Rate", "Churn Rates", "Abwanderung"], plain: "Churn heißt, dass Kunden gehen. Die Churn Rate ist der Anteil, der in einem Zeitraum geht.", example: "400 Kunden und 32 Kündigungen in einem Jahr: eine Churn Rate von 8 %." },
  },
  {
    id: "crm",
    title: "CRM — customer relationship management system",
    match: ["CRM"],
    plain: "The software in which a sales team records every customer and deal: contacts, notes, orders, next steps.",
    de: { title: "CRM — Customer Relationship Management", match: ["CRM", "CRM-Daten", "CRM-Notizen"], plain: "Die Software, in der ein Vertriebsteam jeden Kunden und jeden Deal festhält: Kontakte, Notizen, Bestellungen, nächste Schritte." },
  },
  {
    id: "mittelstand",
    title: "Mittelstand (mid-sized companies)",
    match: ["Mittelstand"],
    exactCase: true,
    plain: "The German word for mid-sized, often family-owned companies, the backbone of the German economy. Many have a small IT team or none.",
    de: { title: "Mittelstand", match: ["Mittelstand", "Mittelstandsunternehmen", "Mittelständler"], plain: "Mittelgroße, oft familiengeführte Unternehmen, das Rückgrat der deutschen Wirtschaft. Viele haben ein kleines oder gar kein IT-Team." },
  },
  {
    id: "tripwire",
    title: "Tripwire",
    match: ["tripwire"],
    plain: "A result agreed in advance that makes you change course: a metric, a threshold, a date and an action.",
    example: "If the closing rate is below 7% by month 3, one rule is adjusted.",
    de: { title: "Tripwire", match: ["Tripwire", "Tripwires"], plain: "Ein vorab vereinbartes Ergebnis, bei dem Sie den Kurs ändern: eine Kennzahl, ein Schwellenwert, ein Datum und eine Aktion.", example: "Liegt die Abschlussquote bis Monat 3 unter 7 %, wird eine Regel angepasst." },
  },
  {
    id: "staged",
    title: "Staged decision",
    match: ["staged", "stage it", "in stages"],
    plain: "Deciding the direction now, but committing money in steps, each released only when a checkpoint is met.",
    from: "Courtney et al. 1997",
    de: { title: "Gestufte Entscheidung", match: ["stufenweise", "gestufte", "in Stufen"], plain: "Die Richtung jetzt entscheiden, das Geld aber in Schritten binden, die jeweils erst freigegeben werden, wenn ein Kontrollpunkt erreicht ist." },
  },
  {
    id: "baseline",
    title: "Baseline",
    match: ["baseline", "baselines"],
    plain: "The value of a metric before you change anything. Without it you cannot tell whether a measure made a difference.",
    de: { title: "Baseline (Ausgangswert)", match: ["Baseline", "Ausgangswert", "Ausgangswerte"], plain: "Der Wert einer Kennzahl, bevor Sie etwas ändern. Ohne ihn können Sie nicht sagen, ob eine Maßnahme etwas bewirkt hat." },
  },
  {
    id: "owner",
    title: "Owner",
    match: ["owner", "owners"],
    plain: "The one person who can change a measure without asking anyone else, and who must act when its trigger fires.",
    de: { title: "Owner", match: ["Owner"], plain: "Die eine Person, die eine Maßnahme ändern kann, ohne jemanden zu fragen, und die handeln muss, wenn ihr Trigger auslöst." },
  },
  {
    id: "trigger",
    title: "Trigger",
    match: ["trigger", "triggers", "triggered"],
    plain: "Two uses. An emotional trigger is a feeling that sets a buying decision in motion (trust, security, status, belonging). For a funded item, a trigger is a written rule that says when the owner must act, with a metric, a number, a date and an action.",
    de: { title: "Trigger", match: ["Trigger"], plain: "Zwei Bedeutungen. Ein emotionaler Trigger ist ein Gefühl, das eine Kaufentscheidung in Gang setzt (Vertrauen, Sicherheit, Status, Zugehörigkeit). Bei einem finanzierten Punkt ist ein Trigger eine schriftliche Regel, die sagt, wann der Owner handeln muss, mit Kennzahl, Zahl, Datum und Aktion." },
  },
  {
    id: "pickup",
    title: "Pickup point",
    match: ["pickup point"],
    plain: "The number and the date at which you look again at something you postponed. It turns “later” into a decision.",
    de: { title: "Pickup Point", match: ["Pickup Point"], plain: "Die Zahl und das Datum, zu dem Sie etwas Zurückgestelltes wieder ansehen. So wird aus „später“ eine Entscheidung." },
  },
  {
    id: "premortem",
    title: "Premortem",
    match: ["premortem"],
    plain: "Before a plan starts, imagine it has failed and write down why. It brings hidden assumptions into the open.",
    from: "Klein 2007",
    de: { title: "Premortem", match: ["Premortem"], plain: "Bevor ein Plan startet, stellt man sich vor, er sei gescheitert, und schreibt auf, warum. So kommen versteckte Annahmen ans Licht." },
  },
  {
    id: "no-regret",
    title: "No-regret move",
    match: ["no-regret", "no-regret move", "no-regret items"],
    plain: "A step that is right whatever the uncertain facts turn out to be. You can take it now, while you wait for the rest of the evidence.",
    example: "An approved library of true customer stories helps whichever way of pitching proves strongest later.",
    from: "Courtney et al. 1997",
    de: { title: "No-regret-Schritt", match: ["No-regret", "No-regret-Punkte", "No-regret-Schritt"], plain: "Ein Schritt, der richtig ist, egal wie die unsicheren Fakten ausfallen. Sie können ihn jetzt gehen, während Sie auf den Rest der Evidenz warten.", example: "Eine freigegebene Bibliothek wahrer Kunden-Storys hilft jeder Art zu pitchen, die sich später als stärkste erweist." },
  },
  // --- sales figures -------------------------------------------------------------------
  {
    id: "closing",
    title: "Close rate",
    match: ["close rate", "close rates", "closing rate", "closing rates", "deal rate"],
    plain: "The share of offers that became a signed deal: deals ÷ offers × 100.",
    example: "30 deals from 400 offers: 30 ÷ 400 × 100 = 7.5%.",
    de: { title: "Abschlussquote", match: ["Abschlussquote", "Abschlussquoten"], plain: "Der Anteil der Angebote, die zu einem unterschriebenen Auftrag wurden: Abschlüsse ÷ Angebote × 100.", example: "30 Abschlüsse aus 400 Angeboten: 30 ÷ 400 × 100 = 7,5 %." },
  },
  {
    id: "lift",
    title: "Lift",
    match: ["lift"],
    plain: "How many times better one group did than another: the rate of one group ÷ the rate of the other, for example the close rate with a story ÷ the close rate without. A lift of 2 means twice as often.",
    example: "18% against 12%: 18 ÷ 12 = a lift of 1.5.",
    de: { title: "Lift", match: ["Lift"], plain: "Wie viel Mal besser eine Gruppe abschnitt als eine andere: die Quote der einen Gruppe ÷ die der anderen, etwa die Abschlussquote mit Story ÷ die ohne. Ein Lift von 2 heißt doppelt so oft.", example: "18 % gegenüber 12 %: 18 ÷ 12 = ein Lift von 1,5." },
  },
  {
    id: "touchpoint",
    title: "Touchpoint",
    match: ["touchpoint", "touchpoints"],
    plain: "Any moment in which a customer comes into contact with the company: a page, an e-mail, a call, an invoice.",
    de: { title: "Touchpoint", match: ["Touchpoint", "Touchpoints"], plain: "Jeder Moment, in dem ein Kunde mit dem Unternehmen in Kontakt kommt: eine Seite, eine E-Mail, ein Anruf, eine Rechnung." },
  },
  {
    id: "social",
    title: "Social media",
    match: ["social media"],
    plain: "Public platforms such as LinkedIn or Instagram where a company posts and customers comment. Reach there is not the same as customers who buy.",
    de: { title: "Social Media", match: ["Social Media", "Social-Media-Post", "Social-Media-Posts", "Social-Media-Kampagne"], plain: "Öffentliche Plattformen wie LinkedIn oder Instagram, auf denen ein Unternehmen postet und Kunden kommentieren. Reichweite dort ist nicht dasselbe wie Kunden, die kaufen." },
  },
  // --- journey and plan ------------------------------------------------------------------
  {
    id: "journey",
    title: "Customer journey",
    match: ["customer journey", "customer journeys", "journey", "journeys"],
    plain: "The whole path a customer takes with a company, across every channel: from the first search to the purchase, onboarding, service and renewal.",
    from: "Lemon & Verhoef 2016",
    de: { title: "Customer Journey", match: ["Customer Journey", "Journey", "Journeys"], plain: "Der ganze Weg eines Kunden mit einem Unternehmen, über jeden Kanal: von der ersten Suche über den Kauf, das Onboarding und den Service bis zur Verlängerung." },
  },
  {
    id: "roadmap",
    title: "Roadmap",
    match: ["roadmap", "roadmaps"],
    plain: "A plan of what is done in which order over the coming months, with a start, an owner and a checkpoint for each item.",
    de: { title: "Roadmap", match: ["Roadmap", "Roadmap-Punkte"], plain: "Ein Plan, was in den kommenden Monaten in welcher Reihenfolge getan wird, mit Start, Owner und Prüfpunkt für jeden Punkt." },
  },

  // --- emotional sales psychology and storytelling ----------------------------------
  {
    id: "emotional-trigger",
    title: "Emotional trigger",
    match: ["emotional trigger", "emotional triggers", "trigger of a B2B purchase"],
    plain: "A feeling that sets a buying decision in motion. In B2B sales four matter most: trust, security, status and belonging. A sentence that speaks to one of them is heard differently from a list of features.",
    from: "Zaltman 2003",
    de: { title: "Emotionaler Trigger", match: ["emotionale Trigger", "emotionalen Trigger", "emotionaler Trigger"], plain: "Ein Gefühl, das eine Kaufentscheidung in Gang setzt. Im B2B-Vertrieb zählen vier am meisten: Vertrauen, Sicherheit, Status und Zugehörigkeit. Ein Satz, der eines davon anspricht, wird anders gehört als eine Liste von Features." },
  },
  {
    id: "b2b",
    title: "B2B — business to business",
    match: ["B2B"],
    exactCase: true,
    plain: "Selling to companies rather than to private people. The buyer is often a group (the user, the IT lead, the managing director), and each person may care about something different.",
    de: { title: "B2B — Business to Business", match: ["B2B", "B2B-Vertrieb", "B2B-Kaufs", "B2B-Käufer"], plain: "Verkaufen an Unternehmen statt an Privatpersonen. Der Käufer ist oft eine Gruppe (der Nutzer, die IT-Leitung, die Geschäftsführung), und jede Person kann auf etwas anderes achten." },
  },
  {
    id: "feature",
    title: "Feature",
    match: ["feature", "features", "feature list"],
    plain: "What a product has or does, described from the product's side: “daily backup”, “role-based rights”. True, but it leaves the customer to work out what it means for them.",
    de: { title: "Feature", match: ["Feature", "Features", "Feature-Liste", "Feature-Präsentation"], plain: "Was ein Produkt hat oder tut, von der Seite des Produkts beschrieben: „tägliches Backup“, „rollenbasierte Rechte“. Wahr, aber der Kunde muss selbst herausfinden, was es für ihn bedeutet." },
  },
  {
    id: "benefit",
    title: "Benefit",
    match: ["benefit", "benefits", "benefit message", "benefit messages"],
    exactCase: true,
    plain: "What changes for the customer because of a feature, said in the customer's words: “you never lose a day's work”. The benefit answers the customer's question “what's in it for me?”.",
    from: "Rackham 1988",
    de: { title: "Nutzen", match: ["Nutzen", "Nutzenbotschaft", "Nutzenbotschaften"], plain: "Was sich für den Kunden durch ein Feature ändert, in den Worten des Kunden gesagt: „Sie verlieren nie die Arbeit eines Tages“. Der Nutzen beantwortet die Frage des Kunden „Was habe ich davon?“." },
  },
  {
    id: "story",
    title: "Story, storytelling",
    match: ["storytelling", "customer story", "customer stories", "story", "stories"],
    plain: "A short true account of a real customer: the problem they had, what was done, and what changed. Listeners picture it, remember it and argue against it less than against an argument. In sales it must be true and approved by the customer it names.",
    from: "Green & Brock 2000",
    de: { title: "Story, Storytelling", match: ["Storytelling", "Kunden-Story", "Kunden-Storys", "Story", "Storys"], plain: "Ein kurzer wahrer Bericht über einen echten Kunden: das Problem, das er hatte, was getan wurde und was sich änderte. Zuhörer stellen ihn sich vor, erinnern ihn und widersprechen ihm weniger als einem Argument. Im Vertrieb muss er wahr und vom genannten Kunden freigegeben sein." },
  },
  {
    id: "pitch",
    title: "Pitch",
    match: ["pitch", "pitches", "pitch deck"],
    plain: "The way a salesperson presents an offer to a customer: what they say first, what they show, and how they ask for the decision.",
    de: { title: "Pitch", match: ["Pitch", "Pitches", "Pitch-Deck", "Story-Pitch", "Story-Pitches"], plain: "Die Art, wie ein Vertriebsmitarbeiter einem Kunden ein Angebot präsentiert: was er zuerst sagt, was er zeigt und wie er um die Entscheidung bittet." },
  },
  {
    id: "customer-types",
    title: "Emotional customer types",
    match: ["customer type", "customer types", "security-oriented", "innovation-driven", "price-oriented", "relationship-oriented"],
    plain: "A practitioner model with four types: security-oriented (avoid risk, wants proof), innovation-driven (wants to be first), price-oriented (wants the best value) and relationship-oriented (wants people to trust). It guides a conversation; it is not a label for a person.",
    example: "A customer who asks many risk questions and compares three offers is most likely security-oriented.",
    de: { title: "Emotionale Kundentypen", match: ["Kundentyp", "Kundentypen", "Kundentyps", "sicherheitsorientiert", "sicherheitsorientierte", "sicherheitsorientierten", "sicherheitsorientierter", "innovationsgetrieben", "innovationsgetriebener", "preisorientiert", "preisorientierte", "preisorientierten", "beziehungsorientiert", "beziehungsorientierte", "beziehungsorientierten"], plain: "Ein Praxismodell mit vier Typen: sicherheitsorientiert (Risiko vermeiden, will Belege), innovationsgetrieben (will vorn sein), preisorientiert (will den besten Wert) und beziehungsorientiert (will Menschen, denen er traut). Es leitet ein Gespräch; es ist kein Etikett für eine Person.", example: "Ein Kunde, der viele Risikofragen stellt und drei Angebote vergleicht, ist am ehesten sicherheitsorientiert." },
  },
  {
    id: "authenticity",
    title: "Authenticity, manipulation",
    match: ["authentic", "authenticity", "manipulation", "manipulative", "manipulate"],
    plain: "Authentic selling uses true stories, real risks and real proof, and leaves the decision to the customer. Manipulation invents urgency or scarcity, exaggerates, or plays on fears that are not real. The test: would you be comfortable if the customer knew exactly what you did and why?",
    from: "Cialdini 2006",
    de: { title: "Authentizität, Manipulation", match: ["authentisch", "Authentizität", "Manipulation", "manipulativ", "manipuliert", "manipulieren"], plain: "Authentisches Verkaufen nutzt wahre Storys, echte Risiken und echte Belege und überlässt die Entscheidung dem Kunden. Manipulation erfindet Dringlichkeit oder Knappheit, übertreibt oder spielt mit Ängsten, die nicht echt sind. Der Test: Wären Sie entspannt, wenn der Kunde genau wüsste, was Sie taten und warum?" },
  },
  {
    id: "social-proof",
    title: "Social proof",
    match: ["social proof"],
    plain: "People follow what people like them do. In B2B sales: “firms of your size in your industry chose this”. It works only when the examples are real.",
    from: "Cialdini 2006",
    de: { title: "Sozialer Beweis", match: ["sozialen Beweis", "sozialer Beweis"], plain: "Menschen folgen dem, was Menschen wie sie tun. Im B2B-Vertrieb: „Firmen Ihrer Größe in Ihrer Branche haben das gewählt“. Es wirkt nur, wenn die Beispiele echt sind." },
  },
  {
    id: "reference",
    title: "Reference customer",
    match: ["reference customer", "reference customers", "reference", "references"],
    plain: "An existing customer who agrees that a prospect may call them and ask how it really went. Strong proof, especially for security- and relationship-oriented customers.",
    de: { title: "Referenzkunde", match: ["Referenzkunde", "Referenzkunden", "Referenz", "Referenzen", "Referenzkundenprogramm"], plain: "Ein Bestandskunde, der zustimmt, dass ein Interessent ihn anrufen und fragen darf, wie es wirklich lief. Ein starker Beleg, besonders für sicherheits- und beziehungsorientierte Kunden." },
  },
  {
    id: "prospect",
    title: "Prospect",
    match: ["prospect", "prospects"],
    plain: "A company that might become a customer and is talking to sales, but has not signed yet.",
    de: { title: "Interessent", match: ["Interessent", "Interessenten"], plain: "Ein Unternehmen, das Kunde werden könnte und mit dem Vertrieb spricht, aber noch nicht unterschrieben hat." },
  },
  {
    id: "opportunity",
    title: "Opportunity",
    match: ["opportunity", "opportunities"],
    plain: "A concrete chance of a deal recorded in the CRM: this prospect, this offer, this expected value.",
    de: { title: "Opportunity", match: ["Opportunity", "Opportunities"], plain: "Eine konkrete Chance auf einen Abschluss, im CRM erfasst: dieser Interessent, dieses Angebot, dieser erwartete Wert." },
  },
  {
    id: "cso",
    title: "CSO — Chief Sales Officer",
    match: ["CSO", "Chief Sales Officer"],
    plain: "The manager who answers for all of sales: how the team sells, what it earns and how customers experience it, and who reports to the board.",
    de: { match: ["CSO", "Chief Sales Officer"], plain: "Die Führungskraft, die für den gesamten Vertrieb verantwortlich ist: wie das Team verkauft, was es einbringt und wie Kunden es erleben, und die an den Vorstand berichtet." },
  },
  {
    id: "sales-ops",
    title: "Sales operations",
    match: ["sales operations", "Sales Operations"],
    plain: "The team behind the salespeople: it runs the CRM, defines and reports the KPIs, and prepares the monthly review.",
    de: { title: "Sales Operations", match: ["Sales Operations"], plain: "Das Team hinter den Vertriebsleuten: Es betreibt das CRM, definiert und berichtet die KPIs und bereitet das monatliche Review vor." },
  },
  {
    id: "role-play",
    title: "Role play",
    match: ["role play", "role plays"],
    plain: "Practice in training: one person plays the customer, another the salesperson, and the group gives feedback. Used to try a story before it is told to a real customer.",
    de: { title: "Rollenspiel", match: ["Rollenspiel", "Rollenspiele", "Rollenspielen"], plain: "Übung im Training: Eine Person spielt den Kunden, eine andere den Vertriebsmitarbeiter, und die Gruppe gibt Feedback. So probiert man eine Story aus, bevor sie einem echten Kunden erzählt wird." },
  },
  {
    id: "coaching",
    title: "Coaching reflection",
    match: ["coaching reflection", "coaching"],
    plain: "A short guided look back at your own work: what surprised you, what you would do differently, what you take into your next conversation.",
    de: { title: "Coaching-Reflexion", match: ["Coaching-Reflexion", "Coaching"], plain: "Ein kurzer angeleiteter Rückblick auf die eigene Arbeit: was Sie überrascht hat, was Sie anders machen würden, was Sie ins nächste Gespräch mitnehmen." },
  },
  {
    id: "roi",
    title: "ROI — return on investment",
    match: ["ROI"],
    exactCase: true,
    plain: "What an investment brings back compared with what it cost. An ROI story shows a customer's savings or gains in money.",
    example: "€40,000 spent, €100,000 saved: a gain of €60,000.",
    de: { title: "ROI — Return on Investment", match: ["ROI", "ROI-Story"], plain: "Was eine Investition im Vergleich zu ihren Kosten zurückbringt. Eine ROI-Story zeigt die Ersparnis oder den Gewinn eines Kunden in Geld.", example: "40.000 € ausgegeben, 100.000 € gespart: ein Gewinn von 60.000 €." },
  },
  {
    id: "urgency",
    title: "Urgency, scarcity",
    match: ["urgency", "scarcity"],
    plain: "Pressure to decide now (“only this week”, “only three left”). Honest when the limit is real; manipulative when it is invented to rush the customer.",
    from: "Cialdini 2006",
    de: { title: "Dringlichkeit, Knappheit", match: ["Dringlichkeit", "Knappheit"], plain: "Druck, jetzt zu entscheiden („nur diese Woche“, „nur noch drei“). Ehrlich, wenn die Grenze echt ist; manipulativ, wenn sie erfunden ist, um den Kunden zu drängen." },
  },
  {
    id: "credibility",
    title: "Credibility",
    match: ["credibility", "credible", "credibly"],
    plain: "Whether the customer believes what they hear. It is built by true stories and proof they can check, and lost quickly by one exaggeration that is found out.",
    de: { title: "Glaubwürdigkeit", match: ["Glaubwürdigkeit", "glaubwürdig", "glaubwürdige"], plain: "Ob der Kunde glaubt, was er hört. Sie entsteht durch wahre Storys und Belege, die er prüfen kann, und geht schnell verloren durch eine Übertreibung, die auffliegt." },
  },
  {
    id: "cost-of-waiting",
    title: "Cost of waiting",
    match: ["cost of waiting", "costs of waiting"],
    plain: "What it costs to leave something out for now: the item's price divided by what one customer kept is worth in a year, rounded up, is the number of customers who must leave before waiting has cost as much as the item.",
    example: "An app costs €36,000 and a customer kept is worth €12,000 a year: 36,000 ÷ 12,000 = 3 customers.",
    de: { title: "Kosten des Wartens", match: ["Kosten des Wartens", "Kosten des Wartens"], plain: "Was es kostet, etwas vorerst wegzulassen: der Preis des Punkts geteilt durch das, was ein gehaltener Kunde im Jahr wert ist, aufgerundet, ist die Zahl der Kunden, die gehen müssen, bevor das Warten so viel gekostet hat wie der Punkt.", example: "Eine App kostet 36.000 € und ein gehaltener Kunde ist 12.000 € im Jahr wert: 36.000 ÷ 12.000 = 3 Kunden." },
  },
  {
    id: "halfway",
    title: "Halfway between today and the aim",
    match: ["halfway", "halfway mark", "halfway between today and the aim"],
    plain: "A number found by taking today's figure and adding half the gap to the aim (or to the limit still accepted). It is the least that shows a real change, so it is a sensible line for a trigger or a tripwire.",
    example: "Today 70%, aim 80%: 70 + (80 − 70) ÷ 2 = 75%.",
    de: { title: "Hälfte des Weges zwischen heute und Ziel", match: ["Hälfte des Weges", "Hälfte des Weges zwischen heute und Ziel"], plain: "Eine Zahl, die man findet, indem man zum heutigen Wert die Hälfte des Abstands zum Ziel (oder zur noch akzeptierten Grenze) addiert. Sie ist das Mindeste, das eine echte Veränderung zeigt, also eine sinnvolle Linie für einen Trigger oder Tripwire.", example: "Heute 70 %, Ziel 80 %: 70 + (80 − 70) ÷ 2 = 75 %." },
  },
  {
    id: "dashboard",
    title: "Dashboard",
    match: ["dashboard", "dashboards"],
    plain: "One screen that shows the few numbers a team steers by, updated by the systems, so nobody has to ask for a report.",
    example: "A sales dashboard shows the conversion rate, the open offers and the complaints on one page.",
    de: { title: "Dashboard", match: ["Dashboard", "Dashboards"], plain: "Ein Bildschirm, der die wenigen Zahlen zeigt, nach denen ein Team steuert, von den Systemen aktualisiert, sodass niemand einen Bericht anfordern muss.", example: "Ein Vertriebs-Dashboard zeigt Conversion Rate, offene Angebote und Beschwerden auf einer Seite." },
  },
  {
    id: "renewal",
    title: "Renewal",
    match: ["renewal", "renewals", "renew", "renews"],
    plain: "When a customer extends the contract for another period instead of ending it. The renewal rate is the share of contracts that are extended.",
    example: "Of 100 contracts that end this year, 80 are extended: the renewal rate is 80%.",
    de: { title: "Renewal (Vertragsverlängerung)", match: ["Renewal", "Renewals", "Verlängerung", "Verlängerungen", "verlängern", "verlängert"], plain: "Wenn ein Kunde den Vertrag für einen weiteren Zeitraum verlängert, statt ihn zu beenden. Die Verlängerungsquote ist der Anteil der Verträge, die verlängert werden.", example: "Von 100 Verträgen, die dieses Jahr enden, werden 80 verlängert: Die Verlängerungsquote ist 80 %." },
  },
  {
    id: "architecture",
    title: "Architecture (of a system)",
    match: ["architecture", "implementation architecture", "architectures"],
    plain: "Not a list of tools but how they fit together: what is built first, what depends on what. A good one is built in order, so every tool above can be trusted because the base below it is there.",
    example: "Approved stories and KPIs first, then the reference programme, then the guides on backed claims.",
    de: { title: "Architektur (eines Systems)", match: ["Architektur", "Umsetzungsarchitektur", "Architekturen"], plain: "Keine Liste von Werkzeugen, sondern wie sie zusammenpassen: was zuerst gebaut wird, was wovon abhängt. Eine gute wird der Reihe nach gebaut, sodass man jedem Werkzeug oben trauen kann, weil die Basis darunter steht.", example: "Zuerst freigegebene Storys und KPIs, dann das Referenzkundenprogramm, dann die Leitfäden auf belegten Aussagen." },
  },
  {
    id: "story-tool",
    title: "Story tool",
    match: ["story tool", "story tools"],
    plain: "Anything that carries a story into a conversation: a guide for a customer type, a training with role plays. Because it speaks to customers, it needs stories the customers approved and KPIs that measure what it did.",
    example: "The conversation guides and the storytelling training are story tools.",
    de: { title: "Story-Tool", match: ["Story-Tool", "Story-Tools"], plain: "Alles, was eine Story in ein Gespräch trägt: ein Leitfaden für einen Kundentyp, ein Training mit Rollenspielen. Weil es mit Kunden spricht, braucht es Storys, die die Kunden freigegeben haben, und KPIs, die messen, was es bewirkt hat.", example: "Die Gesprächsleitfäden und das Storytelling-Training sind Story-Tools." },
  },
  {
    id: "backed-claim",
    title: "Backed claim",
    match: ["backed claim", "backed claims", "claims backed"],
    plain: "A claim in a story that a real customer has confirmed and approved, with figures behind it. A story tool should start only when at least 80% of its claims are backed, otherwise it teaches salespeople to overclaim.",
    example: "“We saved 200 hours” is backed when the customer approved the story and its figure.",
    de: { title: "Belegte Aussage", match: ["belegte Aussage", "belegte Aussagen", "Aussagen belegt"], plain: "Eine Aussage in einer Story, die ein echter Kunde bestätigt und freigegeben hat, mit Zahlen dahinter. Ein Story-Tool sollte erst starten, wenn mindestens 80 % seiner Aussagen belegt sind, sonst bringt es Vertriebsmitarbeitenden bei, zu übertreiben.", example: "„Wir haben 200 Stunden gespart“ ist belegt, wenn der Kunde die Story und ihre Zahl freigegeben hat." },
  },
];

// --- lookup ---------------------------------------------------------------------

export const GLOSS_BY_ID: Record<string, GlossEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

/** The texts of an entry in the active language (the English text where a German version is missing). */
export function glossText(g: GlossEntry): { title: string; plain: string; example?: string; from?: string } {
  if (getLang() === "de" && g.de) return { title: g.de.title ?? g.title, plain: g.de.plain, example: g.de.example, from: g.from };
  return { title: g.title, plain: g.plain, example: g.example, from: g.from };
}

const isAcronym = (s: string) => s === s.toUpperCase() && /[A-Z]/.test(s);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function build(forms: (g: GlossEntry) => string[] | undefined) {
  const lookup = new Map<string, { entry: GlossEntry; exact: string | null }>();
  for (const g of GLOSSARY) for (const m of forms(g) ?? []) if (!lookup.has(m.toLowerCase())) lookup.set(m.toLowerCase(), { entry: g, exact: g.exactCase || isAcronym(m) ? m : null });
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${[...lookup.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRe)
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  return { lookup, re };
}

const EN = build((g) => g.match);
const DE = build((g) => g.de?.match);

/** lowercase written form → its entry, and whether that form must be matched exactly. */
export const GLOSS_LOOKUP = EN.lookup;
export const GLOSS_RE = EN.re;
export const GLOSS_LOOKUP_DE = DE.lookup;
export const GLOSS_RE_DE = DE.re;
