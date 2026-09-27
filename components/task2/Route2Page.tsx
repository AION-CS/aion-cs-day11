"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriB } from "@/components/materi/Materi";
import { Task2 } from "@/components/task2/Task2";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

export function Route2Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-3">
        <div className="space-y-1">
          <p className="smallcaps text-accent">{tt("Route 2 · Level 3 · Management decision", "Route 2 · Level 3 · Managemententscheidung")}</p>
          <h1>{tt("Build an emotional sales strategy that stays credible", "Eine emotionale Vertriebsstrategie aufbauen, die glaubwürdig bleibt")}</h1>
        </div>
        <blockquote className="max-w-prose space-y-2 border-l-4 border-gold bg-accentSoft px-4 py-3 text-body text-ink">
          <p>
            <Gloss>
              {tt("Route 1 looked at single conversations at SalesTech: feature, benefit or story, what a story is worth, which customer type is in front of you and how to test a pitch fairly. Level 3 asks a different question: what does an emotional sales strategy look like for the whole team, which stories are central, how does each customer type hear them, where is the risk of losing credibility, and what do you decide today although nobody knows how customers will react?", "Route 1 hat einzelne Gespräche bei SalesTech betrachtet: Feature, Nutzen oder Story, was eine Story wert ist, welcher Kundentyp vor Ihnen sitzt und wie man einen Pitch fair testet. Level 3 stellt eine andere Frage: Wie sieht eine emotionale Vertriebsstrategie für das ganze Team aus, welche Storys sind zentral, wie hört jeder Kundentyp sie, wo liegt das Risiko, Glaubwürdigkeit zu verlieren, und was entscheiden Sie heute, obwohl niemand weiß, wie Kunden reagieren werden?")}
            </Gloss>
          </p>
        </blockquote>
      </header>
      <SuggestedOrderBanner
        routeKey="r2"
        text={tt(
          "Route 1 first is recommended, because the situation quotes the kinds of metric and the measures you named there. Every section stays open, so you can work through this route regardless.",
          "Route 1 zuerst wird empfohlen, weil die Lage die Arten von Kennzahlen und die Maßnahmen zitiert, die Sie dort benannt haben. Jeder Abschnitt bleibt offen, Sie können diese Route trotzdem bearbeiten.",
        )}
      />
      <SectionRail route={2} />
      <PageNav route={2} />
      <MateriB />
      <Task2 />
      <ResetRoute route={2} />
    </div>
  );
}
