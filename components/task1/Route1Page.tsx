"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriA } from "@/components/materi/Materi";
import { Task1 } from "@/components/task1/Task1";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { tt } from "@/lib/lang";

export function Route1Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Route 1 · Levels 1 and 2 · Knowledge and application", "Route 1 · Level 1 und 2 · Wissen und Anwendung")}</p>
        <h1>{tt("Emotional sales psychology: say the benefit, tell a story, and fit the customer type", "Emotionale Verkaufspsychologie: den Nutzen sagen, eine Story erzählen und zum Kundentyp passen")}</h1>
      </header>
      <SuggestedOrderBanner
        routeKey="r1"
        text={tt("Materi A → the Storytelling Analysis task, one case in two parts (Understand the emotional effect, Make it measurable and choose). Every section stays open, so you can start anywhere.", "Materi A → die Aufgabe Storytelling Analysis, ein Fall in zwei Teilen (Die emotionale Wirkung verstehen, Messbar machen und auswählen). Jeder Abschnitt bleibt offen, Sie können überall beginnen.")}
      />
      <SectionRail route={1} />
      <PageNav route={1} />
      <MateriA />
      <Task1 />
      <ResetRoute route={1} />
    </div>
  );
}
