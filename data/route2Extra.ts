import type { ArchId, KpiId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Step A item cards of Route 2 print besides the panel's own facts (CLAUDE.md #47, #46): one line of a normal day at SalesTech with
 * the item in use, who does what and what changes for the customer. Case assumptions, like every other figure of Route 2.
 */
export type ArchExtra = { scene: string };

export const ARCH_EXTRA: Record<ArchId, ArchExtra> = bi({
  foundation: {
    scene: t(
      "Before a first meeting a salesperson picks the story of a customer from the prospect's industry, with the benefit message of the product and a note that this customer approved it. The prospect hears a real firm like theirs, not a feature list.",
      "Vor einem ersten Gespräch wählt ein Vertriebsmitarbeiter die Story eines Kunden aus der Branche des Interessenten, mit der Nutzenbotschaft des Produkts und einem Vermerk, dass dieser Kunde sie freigegeben hat. Der Interessent hört eine echte Firma wie seine, keine Feature-Liste.",
    ),
  },
  chat: {
    scene: t(
      "A salesperson opens the guide for a security-oriented customer: the questions to ask, the benefit to lead with, the proof to bring and the words to avoid. The customer feels understood in the first minutes.",
      "Ein Vertriebsmitarbeiter öffnet den Leitfaden für einen sicherheitsorientierten Kunden: die Fragen, der Nutzen zum Einstieg, der mitzubringende Beleg und die zu meidenden Worte. Der Kunde fühlt sich in den ersten Minuten verstanden.",
    ),
  },
  personal: {
    scene: t(
      "In two days a salesperson turns three features into benefits, tells a story in two minutes and practises with each customer type in role plays. In the next meeting the customer hears a benefit, not a slide.",
      "In zwei Tagen verwandelt ein Vertriebsmitarbeiter drei Features in Nutzen, erzählt eine Story in zwei Minuten und übt in Rollenspielen mit jedem Kundentyp. Im nächsten Gespräch hört der Kunde einen Nutzen, keine Folie.",
    ),
  },
  routing: {
    scene: t(
      "A cautious prospect in logistics gets a call from a logistics customer who already uses the product and tells it in their own words. The prospect hears it from someone like them, not from the seller.",
      "Ein vorsichtiger Interessent aus der Logistik bekommt einen Anruf von einem Logistikkunden, der das Produkt schon nutzt und es mit eigenen Worten erzählt. Der Interessent hört es von jemandem wie ihm, nicht vom Verkäufer.",
    ),
  },
  training: {
    scene: t(
      "After each offer the salesperson picks in a CRM field which story was used. Once a month a short meeting reads the KPIs per story and keeps, tests or stops each approach.",
      "Nach jedem Angebot wählt der Vertriebsmitarbeiter in einem CRM-Feld, welche Story genutzt wurde. Einmal im Monat liest ein kurzes Meeting die KPIs pro Story und behält, testet oder stoppt jeden Ansatz.",
    ),
  },
  tracking: {
    scene: t(
      "A cautious customer receives case figures, certificates and a small pilot offer with the quote, so it can check before it commits. Nobody asks it to simply trust.",
      "Ein vorsichtiger Kunde erhält mit dem Angebot Fallzahlen, Zertifikate und ein kleines Pilotangebot, damit er prüfen kann, bevor er sich festlegt. Niemand verlangt, einfach zu vertrauen.",
    ),
  },
  suite: {
    scene: t(
      "A vendor tool writes the story and the offer for each prospect by itself. Its sources and claims are not shown and nobody checks them before the call, so a claim that sounds exaggerated can reach a customer unseen.",
      "Ein Anbieter-Werkzeug schreibt Story und Angebot für jeden Interessenten selbst. Seine Quellen und Behauptungen werden nicht gezeigt, und niemand prüft sie vor dem Gespräch, sodass eine Behauptung, die übertrieben klingt, einen Kunden ungesehen erreichen kann.",
    ),
  },
  relaunch: {
    scene: t(
      "A known sports presenter recommends SalesTech in video and print. Customers know the name better, but a salesperson in the room still has to explain what the product does for them.",
      "Ein bekannter Sportmoderator empfiehlt SalesTech in Video und Print. Kunden kennen den Namen besser, aber ein Vertriebsmitarbeiter im Raum muss immer noch erklären, was das Produkt für sie tut.",
    ),
  },
});

/** The aim printed beside each customer KPI in "the numbers today" (the figure Step B's "what I watch" sentence can quote). */
export const KPI_AIM: Partial<Record<KpiId, number>> = { conv: 18, engage: 65 };
