"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { CalcDiagnosis } from "@/components/ui/CalcDiagnosis";
import { Field } from "@/components/ui/Field";
import { FormulaBuilder } from "@/components/ui/FormulaBuilder";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, FIGURES, FIGURE_IDS, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT } from "@/data/forecast";
import type { Basis, CustId, FigureId } from "@/data/forecast";
import { FIGURE_BUILDERS, figAnswer, figurePartFlags, partKey } from "@/lib/calcBuilder";
import { citesForecastFigure, figMatches, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { euro, num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, figureGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
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
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine sentences on the sort board below, from two recorded sales conversations: A focuses on technical details, B on benefit and story. Answer on the sort board.", "Route 1 → Task 1 → die neun Sätze auf der Sortiertafel unten, aus zwei aufgezeichneten Vertriebsgesprächen: A konzentriert sich auf technische Details, B auf Nutzen und Story. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
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
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1 to A3", "Testfragen · aus Materi A1 bis A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every sentence. They repeat the tests from Materi A1 and A2; they never say which sentence goes where.", "Stellen Sie diese Fragen zu jedem Satz. Sie wiederholen die Tests aus Materi A1 und A2; sie sagen nie, welcher Satz wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2", "A3"]} lead={tt("Taught in", "Gelehrt in")} />
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
      />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 */

const row = (id: string, label: string, value: string) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2">{label}</td>
    <td className="tnum px-3 py-2 text-right font-semibold">{value}</td>
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const setFig = (id: FigureId, v: string) => patch((s) => ({ fig: { ...s.fig, [id]: v }, figFlagged: s.figFlagged.filter((f) => f !== id), meaningFlagged: false }));
  const check = () =>
    patch((s) => {
      const figFlagged = FIGURE_IDS.filter((id) => s.fig[id].trim() !== "" && !figMatches(s.fig[id], figAnswer(id)));
      const w = s.meaning.trim();
      return { checks: s.checks + 1, figFlagged, figClue: {}, partFlags: figurePartFlags(s.parts), meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · What a customer story is worth: three figures", "Block 1.2 · Was eine Kunden-Story wert ist: drei Werte")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the three tables “Last year”, “Next year” and “All deals” directly below. Answer in the fields under the tables.", "Route 1 → Task 1 → die drei Tabellen „Letztes Jahr“, „Nächstes Jahr“ und „Alle Aufträge“ direkt darunter. Antworten Sie in den Feldern unter den Tabellen.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("SalesTech's CRM shows how last year's offers ended, split by how they were presented: technical details only, or the benefit with a customer story. The numbers you need are in the tables below. Look for them first; the buttons “Show where the numbers are” and “Show the formula” are there if you get stuck. The method is taught in", "Das CRM von SalesTech zeigt, wie die Angebote des letzten Jahres ausgingen, aufgeteilt danach, wie sie präsentiert wurden: nur technische Details, oder der Nutzen mit einer Kunden-Story. Die Zahlen stehen in den Tabellen unten. Suchen Sie sie zuerst selbst; die Schaltflächen „Zeigen, wo die Zahlen stehen“ und „Formel zeigen“ helfen, wenn Sie nicht weiterkommen. Die Methode steht in")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        {tt(", on other numbers. What you practise is combining them correctly.", ", mit anderen Zahlen. Was Sie üben, ist, sie richtig zu kombinieren.")}
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative overflow-x-auto rounded-lg border border-line md:col-span-2">
          <table className="w-full border-collapse text-caption">
            <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · offers by how they were presented (Case assumption)", "Letztes Jahr · Angebote nach Art der Präsentation (Fallannahme)")}</caption>
            <tbody>
              {row("fc-ctl-sent", tt("Technical presentation · offers", "Technische Präsentation · Angebote"), num(PILOT.control.sent))}
              {row("fc-ctl-orders", tt("Technical presentation · deals", "Technische Präsentation · Abschlüsse"), num(PILOT.control.orders))}
              {row("fc-var-sent", tt("With benefit and customer story · offers", "Mit Nutzen und Kunden-Story · Angebote"), num(PILOT.variant.sent))}
              {row("fc-var-orders", tt("With benefit and customer story · deals", "Mit Nutzen und Kunden-Story · Abschlüsse"), num(PILOT.variant.orders))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3">
          <div className="relative overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-caption">
              <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Next year", "Nächstes Jahr")}</caption>
              <tbody>{row("fc-yearly", tt("Offers a year", "Angebote pro Jahr"), num(PILOT.yearly))}</tbody>
            </table>
          </div>
          <div className="relative overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-caption">
              <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("All deals", "Alle Aufträge")}</caption>
              <tbody>{row("fc-order", tt("Average deal value", "Durchschnittlicher Auftragswert"), euro(PILOT.order))}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {FIGURE_IDS.map((id) => {
          const f = FIGURES[id];
          const b = FIGURE_BUILDERS[id];
          const flagged = l1.figFlagged.includes(id);
          const partsFlagged = b.parts.some((p) => l1.partFlags.includes(partKey(id, p.id)));
          return (
            <div key={id} className="space-y-2">
              <Field
                id={IDS.figure(id)}
                htmlFor={`fig-${id}-in`}
                label={f.label}
                help={tt(`${f.question} Type the figure as a number, for example ${f.example}.`, `${f.question} Tippen Sie den Wert als Zahl, zum Beispiel ${f.example.replace(".", ",")}.`)}
                flagged={flagged}
                clue={f.clue}
                clueShown={!!l1.figClue[id]}
                onShowClue={() => patch((s) => ({ figClue: { ...s.figClue, [id]: true } }))}
              >
                <input id={`fig-${id}-in`} className="field tnum max-w-xs" inputMode="decimal" autoComplete="off" value={l1.fig[id]} onChange={(e) => setFig(id, e.target.value)} aria-invalid={flagged || undefined} />
              </Field>
              {flagged && (
                <CalcDiagnosis
                  builder={b}
                  figure={id}
                  parts={l1.parts}
                  partFlags={l1.partFlags}
                  name={tt(`your ${id}`, `Ihr ${id}`)}
                  mismatch={(r) => tt(`The parts in the formula calculator are right and give ${r}, but the figure you entered differs. Press “Use this result in ${id}” or check the entry.`, `Die Teile im Formelrechner stimmen und ergeben ${r}, aber Ihr eingetragener Wert weicht ab. Drücken Sie „Ergebnis übernehmen in ${id}“ oder prüfen Sie den Eintrag.`)}
                />
              )}
              <div className="flex flex-wrap items-start gap-2">
                <RevealHint id={`fig-${id}-where`} label={tt("Show where the numbers are", "Zeigen, wo die Zahlen stehen")} title={tt("Numbers you need · the printed rows", "Zahlen, die Sie brauchen · die gedruckten Zeilen")}>
                  <ul className="space-y-1 text-caption">
                    {f.sources.map((s) => (
                      <li key={s.label}>
                        <button type="button" onClick={() => scrollToAndFlash(s.target, "ref")} className="flex min-h-[36px] w-full flex-wrap items-baseline gap-x-2 rounded px-2 py-1 text-left hover:bg-accentSoft">
                          <span className="text-ink">{s.label}:</span>
                          <span className="tnum font-semibold text-ink">{s.value === "F1" ? l1.fig.F1.trim() || tt("your F1", "Ihr F1") : s.value}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </RevealHint>
                <RevealHint id={`fig-${id}-formula`} label={tt("Show the formula", "Formel zeigen")} title={tt(`The formula · from Materi ${f.taughtIn}`, `Die Formel · aus Materi ${f.taughtIn}`)} forceOpen={partsFlagged}>
                  <p className="text-caption text-ink">
                    <Gloss>{f.formula}</Gloss>
                  </p>
                  <FormulaBuilder
                    figure={id}
                    builder={b}
                    parts={l1.parts}
                    partFlags={l1.partFlags}
                    onPart={(k, v) => patch((s) => ({ parts: { ...s.parts, [k]: v }, partFlags: s.partFlags.filter((x) => x !== k) }))}
                    onUse={(v) => setFig(id, String(Math.round(v * 100) / 100))}
                    unit={f.unit}
                    label={id}
                    source={tt("the tables above", "den Tabellen oben")}
                  />
                </RevealHint>
              </div>
              {mentor && <MentorGuide guide={figureGuide(id)} />}
            </div>
          );
        })}
      </div>
      <TextBox
        id={IDS.meaning}
        label={tt("What does a customer story mean for SalesTech?", "Was bedeutet eine Kunden-Story für SalesTech?")}
        help={tt("One or two sentences. Use at least one of your figures, say what SalesTech should change first, and how sure it can be.", "Ein oder zwei Sätze. Nutzen Sie mindestens einen Ihrer Werte, sagen Sie, was SalesTech zuerst ändern sollte, und wie sicher es sein kann.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which of your figures says how much more often offers with a story closed, and which says what it is worth in a year? Quote one and say what follows.", "Welche Ihrer Zahlen sagt, wie viel öfter Angebote mit Story abschlossen, und welche, was es in einem Jahr wert ist? Zitieren Sie eine und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          steps={[
            tt("Say how much more often offers with benefit and story closed (your lift, or the two rates).", "Sagen Sie, wie viel öfter Angebote mit Nutzen und Story abschlossen (Ihr Lift, oder die zwei Quoten)."),
            tt("Say what it would be worth in a year.", "Sagen Sie, was es in einem Jahr wert wäre."),
            tt("Finish with the next step, and say it as an estimate: salespeople may have told stories mainly to the warmer prospects.", "Schließen Sie mit dem nächsten Schritt, und sagen Sie es als Schätzung: Vertriebsleute erzählten Storys vielleicht vor allem den wärmeren Interessenten."),
          ]}
          refs={[{ label: tt("Offers a year", "Angebote pro Jahr"), value: num(PILOT.yearly), target: "fc-yearly" }]}
        />
      </TextBox>
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my figures and sentence", "Meine Werte und meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {l1.figFlagged.length === 0 && !l1.meaningFlagged && l1.partFlags.length === 0
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt(
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} figure${l1.figFlagged.length === 1 ? " is" : "s are"} outlined above. Each says what to check.` : ""}${l1.meaningFlagged ? " The sentence needs at least one of your figures." : ""}${l1.partFlags.length > 0 ? " A part of the formula calculator is outlined." : ""}`,
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} ${l1.figFlagged.length === 1 ? "Wert ist" : "Werte sind"} oben markiert. Jeder sagt, was zu prüfen ist.` : ""}${l1.meaningFlagged ? " Der Satz braucht mindestens einen Ihrer Werte." : ""}${l1.partFlags.length > 0 ? " Ein Teil des Formelrechners ist markiert." : ""}`,
              )}
        </Reading>
      )}
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
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight prospects” below: deal size, the share of their questions about details and risks, whether they compare several offers, and what they talk about most. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Interessenten“ unten: Auftragsgröße, der Anteil ihrer Fragen zu Details und Risiken, ob sie mehrere Angebote vergleichen, und worüber sie am meisten sprechen. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
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
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 to 1.3, and the line between emotion and manipulation in Materi A6. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 bis 1.3 und die Grenze zwischen Emotion und Manipulation in Materi A6. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you make it measurable: why do stories work, where is your argument too technical, and how would a top sales manager communicate?", "Bevor Sie es messbar machen: Warum wirken Storys, wo ist Ihre Argumentation zu technisch, und wie würde eine Top-Vertriebsleiterin kommunizieren?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
    </AnswerBlock>
  );
}
