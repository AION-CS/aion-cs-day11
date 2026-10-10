"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES, LINE_KEY } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT, FORECAST } from "@/data/forecast";
import type { Basis, CustId, } from "@/data/forecast";
import { citesForecastFigure, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { euro, num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
import { pickKey, sortKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Feature, benefit or story?", "Block 1.1 · Feature, Nutzen oder Story?")}
      kind="OBJECTIVE"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine sentences on the sort board below, from two recorded sales conversations: A focuses on technical details, B on benefit and story. Answer on the sort board.", "Route 1 → Task 1 → die neun Sätze auf der Sortiertafel unten, aus zwei aufgezeichneten Vertriebsgesprächen: A konzentriert sich auf technische Details, B auf Nutzen und Story. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A2"]} />
      <PlacementBoard<LevelTag>
        items={LINES.map((r) => ({ id: r.id, meta: r.source, text: r.text }))}
        bins={LEVEL_TAGS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.sort}
        onPlace={(id, tag) => place(id as LineId, tag)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.line}
        keyPhrases={LINE_KEY}
        clues={Object.fromEntries(LINES.map((r) => [r.id, r.clue]))}
        reasons={Object.fromEntries(LINES.map((r) => [r.id, r.why]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("sentence", "Satz")}
        intro={tt("Drag a sentence onto what it is, or select it and then select a kind. Select a placed one to move it again. One kind per sentence: feature, benefit or story.", "Ziehen Sie einen Satz auf das, was er ist, oder wählen Sie ihn aus und dann eine Art. Wählen Sie einen platzierten, um ihn zu verschieben. Eine Art pro Satz: Feature, Nutzen oder Story.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A2", "Testfragen · aus Materi A2")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every sentence. They repeat the tests from Materi A2; they never say which sentence goes where.", "Stellen Sie diese Fragen zu jedem Satz. Sie wiederholen die Tests aus Materi A2; sie sagen nie, welcher Satz wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraInsight}
        label={tt("A weak moment of conversation A", "Eine schwache Stelle von Gespräch A")}
        help={tt("Name a moment in conversation A where the customer is lost, what the salesperson says there, and what the customer would need to hear instead (“so …”). At least 30 characters.", "Nennen Sie eine Stelle in Gespräch A, an der der Kunde verloren geht, was der Vertriebsmitarbeiter dort sagt, und was der Kunde stattdessen hören müsste („sodass …“). Mindestens 30 Zeichen.")}
        value={l1.extraInsight}
        onChange={(v) => patch({ extraInsight: v })}
        min={MIN_LINE}
        rows={2}
      >
        <WritingHelp
          id="extra-insight-kit"
          refs={[
            { label: tt("What the customers say (the case)", "Was die Kunden sagen (der Fall)"), value: tt("they do not understand the benefit, offers look interchangeable, few offers close", "sie verstehen den Nutzen nicht, Angebote wirken austauschbar, wenige Angebote schließen ab"), target: "case-brief" },
            { label: tt("The three kinds of sentence (Materi A2)", "Die drei Arten von Sätzen (Materi A2)"), value: tt("feature · benefit · story", "Feature · Nutzen · Story"), target: "mat-A2" },
            { label: tt("The nine sentences above", "Die neun Sätze oben"), value: tt("conversation A is technical, conversation B uses benefit and story", "Gespräch A ist technisch, Gespräch B nutzt Nutzen und Story"), target: IDS.line(LINES[0].id) },
          ]}
          steps={[
            tt("Pick one moment of conversation A that is too technical (a sentence that only names a feature).", "Wählen Sie einen Moment aus Gespräch A, der zu technisch ist (ein Satz, der nur ein Feature nennt)."),
            tt("Say what the customer would need to hear instead: the benefit, or a story of a customer like them.", "Sagen Sie, was der Kunde stattdessen hören müsste: den Nutzen oder eine Story eines Kunden wie ihm."),
            tt("Finish with “so …”: what would change for the customer.", "Schließen Sie mit „also …“: was sich für den Kunden ändern würde."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="extra-insight-example" guide={extraInsightGuide()} />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional, read-only) */

const row = (id: string, cells: string[]) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2 font-semibold">{cells[0]}</td>
    {cells.slice(1).map((c, i) => (
      <td key={i} className="tnum px-3 py-2 text-right">
        {c}
      </td>
    ))}
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => {
      const w = s.meaning.trim();
      return { checks: s.checks + 1, meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  const pct1 = (v: number) => `${num(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the offer figures: two close rates side by side", "Block 1.2 · Die Angebotswerte lesen: zwei Abschlussquoten nebeneinander")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the table “Last year” directly below, with the two close rates the app prints. Answer in the field under the table.", "Route 1 → Task 1 → die Tabelle „Letztes Jahr“ direkt darunter, mit den zwei Abschlussquoten, die die App druckt. Antworten Sie im Feld unter der Tabelle.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("SalesTech's CRM shows how last year's offers ended, split by how they were presented: technical details only, or the benefit with a customer story. The app divides deals by offers and prints both close rates for you; nothing is left to calculate. Your job is to read them side by side and say what they do and do not tell SalesTech. How such a rate is worked out is shown in", "Das CRM von SalesTech zeigt, wie die Angebote des letzten Jahres ausgingen, aufgeteilt danach, wie sie präsentiert wurden: nur technische Details, oder der Nutzen mit einer Kunden-Story. Die App teilt Abschlüsse durch Angebote und druckt beide Abschlussquoten für Sie; es bleibt nichts zu rechnen. Ihre Aufgabe ist, sie nebeneinander zu lesen und zu sagen, was sie SalesTech sagen und was nicht. Wie eine solche Quote entsteht, zeigt")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        .
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · offers by how they were presented (Case assumption)", "Letztes Jahr · Angebote nach Art der Präsentation (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("Offers", "Angebote")}</th>
              <th className="px-3 py-2 text-right">{tt("Deals", "Abschlüsse")}</th>
              <th className="px-3 py-2 text-right">{tt("Close rate (printed)", "Abschlussquote (gedruckt)")}</th>
            </tr>
          </thead>
          <tbody>
            {row("fc-ctl", [tt("Technical presentation", "Technische Präsentation"), num(PILOT.control.sent), num(PILOT.control.orders), pct1(FORECAST.controlRate)])}
            {row("fc-var", [tt("With benefit and customer story", "Mit Nutzen und Kunden-Story"), num(PILOT.variant.sent), num(PILOT.variant.orders), pct1(FORECAST.f1)])}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(`Read it like this: of every 100 offers, ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} closed when presented technically and ${num(FORECAST.f1, { maximumFractionDigits: 1 })} with benefit and a customer story, so the story offers closed ${num(FORECAST.f2)} times as often. But salespeople chose which offers got a story, so the true effect may be smaller.`, `So lesen Sie es: Von je 100 Angeboten schlossen ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} ab, wenn sie technisch präsentiert wurden, und ${num(FORECAST.f1, { maximumFractionDigits: 1 })} mit Nutzen und Kunden-Story; die Story-Angebote schlossen also ${num(FORECAST.f2)}-mal so oft ab. Aber die Vertriebsleute wählten, welche Angebote eine Story bekamen, also kann der wahre Effekt kleiner sein.`)}
      </p>
      <TextBox
        id={IDS.meaning}
        label={tt("What do the offer figures mean for SalesTech?", "Was bedeuten die Angebotswerte für SalesTech?")}
        help={tt("One or two sentences. Quote at least one printed figure, say what SalesTech should do next, and why it cannot be sure yet that the story alone made the difference.", "Ein oder zwei Sätze. Zitieren Sie mindestens einen gedruckten Wert, sagen Sie, was SalesTech als Nächstes tun sollte, und warum es noch nicht sicher sein kann, dass allein die Story den Unterschied machte.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which printed figure says how much more often the story offers closed, and who decided which offers got a story? Quote one figure and say what follows.", "Welcher gedruckte Wert sagt, wie viel öfter die Story-Angebote abschlossen, und wer entschied, welche Angebote eine Story bekamen? Zitieren Sie einen Wert und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          refs={[
            { label: tt("Close rates, technical and with a story", "Abschlussquoten, technisch und mit Story"), value: `${pct1(FORECAST.controlRate)} · ${pct1(FORECAST.f1)}`, target: "fc-var" },
            { label: tt("Deals behind each group", "Abschlüsse hinter jeder Gruppe"), value: `${PILOT.control.orders} · ${PILOT.variant.orders}`, target: "fc-ctl" },
            { label: tt("Why a comparison like this is not yet proof (Materi A6)", "Warum ein solcher Vergleich noch kein Beweis ist (Materi A6)"), value: tt("salespeople chose which offers got a story", "die Vertriebsleute wählten, welche Angebote eine Story bekamen"), target: "mat-A6" },
          ]}
          steps={[
            tt("Say how much more often the story offers closed (the two rates, or “twice as often”).", "Sagen Sie, wie viel öfter die Story-Angebote abschlossen (die zwei Quoten, oder „doppelt so oft“)."),
            tt("Say what SalesTech should do next, for example test a story opening fairly.", "Sagen Sie, was SalesTech als Nächstes tun sollte, zum Beispiel einen Story-Einstieg fair testen."),
            tt("Say it as an estimate: salespeople picked which offers got a story.", "Sagen Sie es als Schätzung: Die Vertriebsleute wählten, welche Angebote eine Story bekamen."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="meaning-example" guide={meaningGuide()} />
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my sentence", "Meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {!l1.meaningFlagged
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt("The sentence is outlined: it needs at least one printed figure and a few words more.", "Der Satz ist markiert: Er braucht mindestens einen gedruckten Wert und ein paar Worte mehr.")}
        </Reading>
      )}
      <BlockMissing block="1.2" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (k: "valuable" | "churners", id: CustId) => patch((s) => ({ [k]: s[k].includes(id) ? s[k].filter((x) => x !== id) : [...s[k], id], pickResult: null }) as Partial<typeof s>);
  const setRow = (i: number, p: Partial<{ basis: Basis | null; text: string }>) => patch((s) => ({ insights: s.insights.map((h, j) => (j === i ? { ...h, ...p } : h)), insFlagged: s.insFlagged.filter((x) => x !== i) }));
  const check = () => patch((s) => ({ checks: s.checks + 1, insChecked: true, insClue: false, insFlagged: insightFlags(s), pickResult: pickHolds(s), pickClue: false }));
  const opts = CUSTOMERS.map((c) => ({ id: c.id, label: c.name }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Customer types, and three improvements for conversation A", "Block 1.3 · Kundentypen, und drei Verbesserungen für Gespräch A")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight prospects” below: deal size, the share of their questions about details and risks, whether they compare several offers, and what they talk about most. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Interessenten“ unten: Auftragsgröße, der Anteil ihrer Fragen zu Details und Risiken, ob sie mehrere Angebote vergleichen, und worüber sie am meisten sprechen. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
      <p className="rounded-md border border-line bg-mist/40 px-3 py-2 text-caption text-ink">
        <Gloss>
          {tt("How to read the table. Each row is one prospect from the sales team's notes. “Deal size” is what the deal would be worth. “Questions about details and risks” says how much the prospect asks about specifications and what could go wrong. “Compares offers? · Talks most about” says whether the prospect puts offers side by side and what the prospect keeps coming back to: terms (price, guarantees, contract), what is new, or the people.", "So lesen Sie die Tabelle. Jede Zeile ist ein Interessent aus den Notizen des Vertriebsteams. „Auftragsgröße“ ist, was der Auftrag wert wäre. „Fragen zu Details und Risiken“ sagt, wie viel der Interessent zu Spezifikationen fragt und dazu, was schiefgehen könnte. „Vergleicht Angebote? · Spricht vor allem über“ sagt, ob der Interessent Angebote nebeneinanderlegt und worauf er immer wieder zurückkommt: Konditionen (Preis, Garantien, Vertrag), was neu ist, oder die Menschen.")}
        </Gloss>
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Eight prospects · the sales team's notes (Case assumption)", "Acht Interessenten · Notizen des Vertriebsteams (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Prospect", "Interessent")}</th>
              <th className="px-3 py-2 text-right">{tt("Deal size, €", "Auftragsgröße, €")}</th>
              <th className="px-3 py-2">{tt("Questions about details and risks", "Fragen zu Details und Risiken")}</th>
              <th className="px-3 py-2">{tt("Compares offers? · Talks most about", "Vergleicht Angebote? · Spricht vor allem über")}</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} id={`cust-${c.id}`} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{c.name}</td>
                <td className="tnum px-3 py-2 text-right">{num(c.volume)}</td>
                <td className={clsx("tnum px-3 py-2", c.leave >= LEAVE_MIN && "font-semibold")}>{pct(c.leave)}</td>
                <td className="px-3 py-2">{`${DECISION_LABEL[c.decision ? "yes" : "no"]} · ${KNOWN_LABEL[c.known]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div id={IDS.valuable} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`a · The ${PICK} security-oriented customers`, `a · Die ${PICK} sicherheitsorientierten Kunden`)}</p>
          <OptionList<CustId> multi label={tt("Security-oriented", "Sicherheitsorientiert")} value={l1.valuable} onChange={(id) => toggle("valuable", id)} disabledIds={l1.valuable.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.valuable, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.valuable.length} of ${PICK} chosen.`, `${l1.valuable.length} von ${PICK} gewählt.`)}</p>
        </div>
        <div id={IDS.churners} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`b · The ${PICK} relationship-oriented customers`, `b · Die ${PICK} beziehungsorientierten Kunden`)}</p>
          <OptionList<CustId> multi label={tt("Relationship-oriented", "Beziehungsorientiert")} value={l1.churners} onChange={(id) => toggle("churners", id)} disabledIds={l1.churners.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.churners, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.churners.length} of ${PICK} chosen.`, `${l1.churners.length} von ${PICK} gewählt.`)}</p>
        </div>
      </div>
      {l1.pickResult && (
        <Reading>
          {tt(`${l1.pickResult.holds} of ${l1.pickResult.total} picks hold. A check never says which. `, `${l1.pickResult.holds} von ${l1.pickResult.total} Wahlen stimmen. Eine Prüfung sagt nie, welche. `)}
          {l1.pickClue ? (
            tt("Clue: a security-oriented customer asks mostly about details and risks and compares offers. A relationship-oriented customer talks about the people. Which prospects have 50% or more detail and risk questions and compare several offers? Who talks most about the people?", "Hinweis: Ein sicherheitsorientierter Kunde fragt vor allem nach Details und Risiken und vergleicht Angebote. Ein beziehungsorientierter Kunde spricht über die Menschen. Welche Interessenten haben 50 % oder mehr Detail- und Risikofragen und vergleichen mehrere Angebote? Wer spricht vor allem über die Menschen?")
          ) : l1.pickResult.holds < l1.pickResult.total ? (
            <button type="button" onClick={() => patch({ pickClue: true })} className="btn-ghost btn-sm border-gold">
              {tt("Show clue", "Hinweis zeigen")}
            </button>
          ) : null}
        </Reading>
      )}
      <AnswerKey block={pickKey()} />
      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("c · Three concrete improvements", "c · Drei konkrete Verbesserungen")}</p>
        <p className="text-body text-ink">
          <Gloss>{tt("Write three concrete improvements for conversation A, each using a different approach: say the benefit, tell a customer story, or speak to the emotion (trust, security, status, belonging). Say what the customer understands or feels.", "Schreiben Sie drei konkrete Verbesserungen für Gespräch A, jede mit einem anderen Ansatz: den Nutzen sagen, eine Kunden-Story erzählen oder die Emotion ansprechen (Vertrauen, Sicherheit, Status, Zugehörigkeit). Sagen Sie, was der Kunde versteht oder fühlt.")}</Gloss>
        </p>
        <p className="text-caption text-ash">
          {tt("The frame: ", "Der Rahmen: ")}
          {INSIGHT_FRAME.v}
        </p>
        {l1.insights.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.insight(i)}
              label={tt(`Improvement ${i + 1}`, `Verbesserung ${i + 1}`)}
              help={tt(`Choose the approach, then write what the salesperson says instead and what the customer understands or feels, in one or two sentences (“…, so …”), at least ${INSIGHT_MIN} characters.`, `Wählen Sie den Ansatz und schreiben Sie dann, was der Vertriebsmitarbeiter stattdessen sagt und was der Kunde versteht oder fühlt, in ein oder zwei Sätzen („…, sodass …“), mindestens ${INSIGHT_MIN} Zeichen.`)}
              value={a.text}
              onChange={(v) => setRow(i, { text: v })}
              min={INSIGHT_MIN}
              flagged={l1.insFlagged.includes(i)}
              clue={tt(`Use the frame: ${INSIGHT_FRAME.v} Choose an approach no other row uses, and finish with “so” and what the customer understands or feels.`, `Nutzen Sie den Rahmen: ${INSIGHT_FRAME.v} Wählen Sie einen Ansatz, den keine andere Zeile nutzt, und schließen Sie mit „sodass“ und dem, was der Kunde versteht oder fühlt.`)}
              clueShown={l1.insClue}
              onShowClue={() => patch({ insClue: true })}
            >
              <div>
                <label htmlFor={`insight-${i}-basis`} className="smallcaps block">
                  {tt("Approach", "Ansatz")}
                </label>
                <select id={`insight-${i}-basis`} className="field mt-1 max-w-md" value={a.basis ?? ""} onChange={(e) => setRow(i, { basis: (e.target.value || null) as Basis | null })}>
                  <option value="">{tt("Choose the approach…", "Ansatz wählen…")}</option>
                  {BASES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {a.basis && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("Chosen: ", "Gewählt: ")}{BASIS_LABEL[a.basis]}</p>}
              </div>
            </TextBox>
            {i === 0 && (
          <WritingHelp
            id="insight-kit"
            refs={[
              { label: tt("What each customer type needs (Materi A3)", "Was jeder Kundentyp braucht (Materi A3)"), value: tt("security · innovation · price · relationship", "Sicherheit · Innovation · Preis · Beziehung"), target: "mat-A3" },
              { label: tt("The eight prospects (table above)", "Die acht Interessenten (Tabelle oben)"), value: tt("what each one asks about and talks about most", "wonach jeder fragt und worüber er am meisten spricht"), target: "cust-c1" },
            ]}
            steps={[
              tt("Pick a weak step of conversation A and say what is wrong with it (a feature, no benefit, no story).", "Wählen Sie einen schwachen Schritt aus Gespräch A und sagen Sie, was daran falsch ist (ein Feature, kein Nutzen, keine Story)."),
              tt("Write the changed sentence or step, concretely.", "Schreiben Sie den geänderten Satz oder Schritt, konkret."),
              tt("Finish with what the customer would understand or feel.", "Schließen Sie mit dem, was der Kunde verstehen oder fühlen würde."),
            ]}
          />
            )}
            <ExampleAnswer id={`insight-${i}-example`} guide={insightGuide(i)} />
            {mentor && <MentorGuide guide={insightGuide(i)} />}
          </div>
        ))}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my picks and improvements", "Meine Wahl und Verbesserungen prüfen")} checks={l1.checks} />
      {l1.insChecked && (
        <Reading>
          {l1.insFlagged.length === 0
            ? tt(`Nothing is outlined among the improvements. All ${INSIGHT_COUNT} use different approaches and say what the customer understands or feels; whether they are good is for you and your facilitator to judge.`, `Bei den Verbesserungen ist nichts markiert. Alle ${INSIGHT_COUNT} nutzen verschiedene Ansätze und sagen, was der Kunde versteht oder fühlt; ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(`${l1.insFlagged.length} improvement${l1.insFlagged.length === 1 ? " is" : "s are"} outlined: the approach is missing or repeated, the text is short, or it does not say what the customer understands or feels.`, `${l1.insFlagged.length} ${l1.insFlagged.length === 1 ? "Verbesserung ist" : "Verbesserungen sind"} markiert: Der Ansatz fehlt oder wiederholt sich, der Text ist kurz, oder er sagt nicht, was der Kunde versteht oder fühlt.`)}
        </Reading>
      )}
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("Why do stories work more strongly than arguments, and what is the difference between information and emotion?", "Warum wirken Storys stärker als Argumente, und was ist der Unterschied zwischen Information und Emotion?"), help: tt("One or two sentences, using a sentence from conversation A and one from conversation B.", "Ein oder zwei Sätze, mit einem Satz aus Gespräch A und einem aus Gespräch B.") },
    { k: "causation", label: tt("Where is the argument in conversation A too technical, and how would you adapt it to a customer type?", "Wo ist die Argumentation in Gespräch A zu technisch, und wie würden Sie sie an einen Kundentyp anpassen?"), help: tt("Name the moment, the customer type from Block 1.3, and what you would say instead.", "Nennen Sie die Stelle, den Kundentyp aus Block 1.3, und was Sie stattdessen sagen würden.") },
    { k: "decider", label: tt("How would a top sales manager communicate, and where does emotion become manipulation?", "Wie würde eine Top-Vertriebsleiterin kommunizieren, und wo wird Emotion zu Manipulation?"), help: tt("Name how they would open, what they would prove, and one thing they would never say. Be concrete.", "Nennen Sie, wie sie beginnen würde, was sie belegen würde, und eine Sache, die sie nie sagen würde. Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 and 1.3, and the line between emotion and manipulation in Materi A6. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 und 1.3 und die Grenze zwischen Emotion und Manipulation in Materi A6. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you make it measurable: why do stories work, where is your argument too technical, and how would a top sales manager communicate?", "Bevor Sie es messbar machen: Warum wirken Storys, wo ist Ihre Argumentation zu technisch, und wie würde eine Top-Vertriebsleiterin kommunizieren?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}
