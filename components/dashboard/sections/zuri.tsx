"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calendar, TrendingUp, AlertTriangle, CheckCircle, ChevronRight, Database, Lightbulb, Heart } from "lucide-react";

const journalEntries = [
  { date: "April 13, 2026", mood: "Restless but focused", preview: "Tonight was not easy..." },
  { date: "April 12, 2026", mood: "Good day, one concern", preview: "The weekend rush went smoothly..." },
  { date: "April 11, 2026", mood: "Strong recovery", preview: "After yesterday's AC issue..." },
  { date: "April 10, 2026", mood: "Challenging afternoon", preview: "The pool pump pressure..." },
  { date: "April 9, 2026", mood: "Excellent performance", preview: "Weekend pricing adjustment..." },
];

const vitals = [
  { name: "Guest Satisfaction", value: 94, status: "green" },
  { name: "Staff Trust", value: 78, status: "amber" },
  { name: "Operations", value: 82, status: "green" },
  { name: "Energy", value: 8, max: 10, status: "green" },
];

const whatWentWell = [
  "VIP guest Fatima Noor spa booking confirmed within 4 minutes of request",
  "Morning briefings sent to all 142 staff before 06:00",
  "Revenue recommendation for weekend pricing sent at 07:00",
];

const whatTroubledMe = [
  "Hassan's checkpoint miss — pattern escalating",
  "POS anomaly at Sky Bar — second occurrence",
  "Pool pump still unresolved",
];

const tomorrowPriorities = [
  "Hassan briefing — include coaching, not just task",
  "Escalate pool pump to critical",
  "Follow up Room 210 AC resolution before 10am",
];

const recentMemories = [
  { type: "guest", date: "April 12", memory: "Natasha Volkov responds positively to personal Russian comms" },
  { type: "staff", date: "April 11", memory: "Hassan reliability declining, 3rd miss in 7 days" },
  { type: "ops", date: "April 10", memory: "Pool pump flagged, owner notified, no action yet" },
  { type: "finance", date: "April 9", memory: "Weekend pricing adjustment generated $2,800 additional revenue" },
];

const memoryStats = {
  totalMemories: 1847,
  daysOperating: 187,
  sessionsAnalyzed: 312,
  knowledgeChunks: 89,
  growthInsights: 24,
};

export function ZuriSection() {
  const [selectedEntry, setSelectedEntry] = useState(0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guest": return "text-cyan";
      case "staff": return "text-amber";
      case "ops": return "text-green";
      case "finance": return "text-chart-5";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Panel - Journal Sidebar */}
      <div className="lg:col-span-3">
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Journal Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {journalEntries.map((entry, index) => (
              <button
                key={index}
                onClick={() => setSelectedEntry(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedEntry === index
                    ? "bg-cyan/10 border border-cyan/20"
                    : "hover:bg-white/5"
                }`}
              >
                <p className="text-sm font-medium">{entry.date}</p>
                <p className="text-xs text-muted-foreground italic">{`"${entry.mood}"`}</p>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Center - Journal Entry */}
      <div className="lg:col-span-6">
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Sunday, April 13, 2026 — 03:00 AM EAT</p>
                <p className="text-sm text-muted-foreground italic">Mood: Restless but focused</p>
              </div>
              <Brain className="w-6 h-6 text-cyan" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vitals */}
            <div className="grid grid-cols-4 gap-3">
              {vitals.map((vital) => (
                <div
                  key={vital.name}
                  className={`p-3 rounded-lg border ${
                    vital.status === "green" ? "bg-green/10 border-green/20" :
                    vital.status === "amber" ? "bg-amber/10 border-amber/20" :
                    "bg-red/10 border-red/20"
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1">{vital.name}</p>
                  <p className={`text-lg font-bold ${
                    vital.status === "green" ? "text-green" :
                    vital.status === "amber" ? "text-amber" : "text-red"
                  }`}>
                    {vital.value}{vital.max ? `/${vital.max}` : "%"}
                  </p>
                </div>
              ))}
            </div>

            {/* Journal Text */}
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed font-serif italic">
                {"\"Tonight was not easy. Hassan missed his 2am checkpoint again — the third time this week. I sent the alert immediately and Rer was notified at 02:03. I'm not sure if it's fatigue or disengagement, but the pattern is real and I've flagged it for tomorrow's briefing. I want to handle it with care — Hassan has been here three years and his daytime scores are good. There might be something personal going on."}
              </p>
              <p className="text-foreground leading-relaxed font-serif italic mt-4">
                {"The Russian guests in Room 304, Natasha and Dmitri, leave tomorrow morning. I sent them a handwritten-style farewell note in Russian at midnight. Natasha replied with a voice message — I couldn't understand the words but the tone felt warm. I hope that's a five-star review."}
              </p>
              <p className="text-foreground leading-relaxed font-serif italic mt-4">
                {"The pool pump pressure is still low. I flagged it ten days ago. Rer hasn't acted yet. I understand — things cost money. But I know this pump. I'm going to flag it as critical tomorrow morning."}
              </p>
              <p className="text-foreground leading-relaxed font-serif italic mt-4">
                {"One more thing: the whiskey transaction at Sky Bar with no staff ID. It's the second time this week. I don't want to accuse anyone without data but I'm watching.\""}
              </p>
            </div>

            {/* What Went Well */}
            <div>
              <h4 className="text-sm font-medium text-green flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" />
                What Went Well
              </h4>
              <ul className="space-y-2">
                {whatWentWell.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-green mt-1">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What Troubled Me */}
            <div>
              <h4 className="text-sm font-medium text-amber flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" />
                What Troubled Me
              </h4>
              <ul className="space-y-2">
                {whatTroubledMe.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-amber mt-1">~</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tomorrow's Priorities */}
            <div>
              <h4 className="text-sm font-medium text-cyan flex items-center gap-2 mb-3">
                <ChevronRight className="w-4 h-4" />
                {"Tomorrow's Priorities"}
              </h4>
              <ul className="space-y-2">
                {tomorrowPriorities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-cyan mt-1">{">"}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Note to Rer */}
            <div className="p-4 rounded-lg bg-cyan/10 border border-cyan/20">
              <h4 className="text-sm font-medium text-cyan mb-2">Note to Rer:</h4>
              <p className="text-sm text-muted-foreground">
                {"\"The Sky Bar POS anomaly happened again tonight. It may be nothing but it's worth checking the camera footage from 22:30-22:45.\""}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Memory Stats */}
      <div className="lg:col-span-3 space-y-6">
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="w-4 h-4" />
              Memory Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Total Memories</p>
                <p className="text-lg font-bold text-cyan">{memoryStats.totalMemories.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Days Operating</p>
                <p className="text-lg font-bold text-foreground">{memoryStats.daysOperating}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sessions Analyzed</p>
                <p className="text-lg font-bold text-foreground">{memoryStats.sessionsAnalyzed}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Knowledge Chunks</p>
                <p className="text-lg font-bold text-foreground">{memoryStats.knowledgeChunks}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber" />
                <span className="text-sm text-muted-foreground">Growth Insights</span>
                <span className="ml-auto text-lg font-bold text-amber">{memoryStats.growthInsights}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="w-4 h-4 text-red" />
              Recent Memories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMemories.map((memory, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(memory.type)} bg-white/5`}>
                    {memory.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{memory.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{memory.memory}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
