import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Cpu, ChevronRight, Clock } from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { formatISTClock, getDeveloperStatus } from "../../lib/developer-status";

// Focus node definitions
const FOCUS_NODES = [
  {
    id: "ai",
    title: "AI Orchestration",
    short: "RAG & LLM Agents",
    desc: "Developing production-grade Retrieval-Augmented Generation (RAG) pipelines, semantic chunking mechanisms, and self-correcting multi-agent networks.",
    icon: Brain,
    color: "var(--color-neon)", // dynamic bronze / cyberpunk teal / sage green / amber
  },
  {
    id: "ui",
    title: "Organic Interfaces",
    short: "Micro-interactions & UX",
    desc: "Designing responsive, quiet luxury web experiences featuring smooth spring physics, custom canvas layouts, and premium editorial typography.",
    icon: Sparkles,
    color: "var(--color-lime)", // dynamic sage green / cyberpunk pink / sage green / amber
  },
  {
    id: "sys",
    title: "Distributed Backend",
    short: "Go & High-performance APIs",
    desc: "Structuring concurrent microservices using Go channels/goroutines and high-speed asynchronous model serving pipelines in Python FastAPI.",
    icon: Cpu,
    color: "var(--color-neon-soft)", // dynamic burnt sand / cyberpunk cyan / sage green / amber
  },
];

export function Dashboard() {
  // FOCUS NODES STATE
  const [activeNode, setActiveNode] = useState<(typeof FOCUS_NODES)[number] | null>(null);

  // CLOCK & STATUS STATE
  const [time, setTime] = useState("");
  const [status, setStatus] = useState({ text: "", sub: "", colorClass: "" });

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = new Date();
      const nextTime = formatISTClock(now);
      const nextStatus = getDeveloperStatus(now);

      setTime((current) => (current === nextTime ? current : nextTime));
      setStatus((current) =>
        current.text === nextStatus.text &&
        current.sub === nextStatus.sub &&
        current.colorClass === nextStatus.colorClass
          ? current
          : nextStatus,
      );
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* CARD 1: FOCUS NODES MIND MAP */}
      <SpotlightCard className="p-4 flex flex-col justify-between h-[240px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!activeNode ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-full w-full overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border/10 pb-2 mb-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground uppercase tracking-wider">
                  <Brain className="h-4 w-4 text-neon animate-pulse" />
                  <span className="font-semibold">Current Focus Areas</span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/60 uppercase">
                  Mind Map
                </span>
              </div>

              {/* Node list - Scrollable container */}
              <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1 scroll-container">
                <p className="text-xs text-muted-foreground leading-relaxed mb-2 font-sans">
                  These are the core engineering segments I am actively scaling. Click a node to
                  inspect details:
                </p>
                {FOCUS_NODES.map((node, i) => {
                  const NodeIcon = node.icon;
                  return (
                    <motion.button
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      className="flex items-center justify-between p-2 rounded-xl border border-border/20 bg-surface/20 hover:border-neon-soft/50 hover:bg-surface-2/40 text-left transition-all group/node cursor-pointer focus:outline-none"
                      data-cursor-text={`OPEN ${node.id.toUpperCase()}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="p-1.5 rounded-lg border flex items-center justify-center"
                          style={{
                            borderColor: `${node.color}35`,
                            color: node.color,
                            backgroundColor: `${node.color}08`,
                          }}
                        >
                          <NodeIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-foreground group-hover/node:text-neon-soft transition-colors font-sans block">
                            {node.title}
                          </span>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            {node.short}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover/node:text-neon-soft transition-colors" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-full w-full overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border/10 pb-2 mb-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground uppercase tracking-wider">
                  <activeNode.icon
                    className="h-4 w-4 animate-pulse"
                    style={{ color: activeNode.color }}
                  />
                  <span className="font-semibold">Focus Segment</span>
                </div>
                <button
                  onClick={() => setActiveNode(null)}
                  className="font-mono text-[10px] text-neon hover:underline uppercase cursor-pointer"
                >
                  Back
                </button>
              </div>

              {/* Scrollable details text */}
              <div className="flex-1 overflow-y-auto pr-1 scroll-container my-1">
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {activeNode.title}
                </h3>
                <span
                  className="font-mono text-[9px] uppercase tracking-widest mt-1 inline-block px-1.5 py-0.5 rounded border border-border/25 bg-surface/50"
                  style={{ color: activeNode.color, borderColor: `${activeNode.color}25` }}
                >
                  {activeNode.short}
                </span>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed font-sans">
                  {activeNode.desc}
                </p>
              </div>

              <button
                onClick={() => setActiveNode(null)}
                className="mt-2 w-full py-1.5 rounded-lg border border-border/20 bg-surface/30 hover:bg-surface-2/50 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer flex-shrink-0"
              >
                Return to Node Grid
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </SpotlightCard>

      {/* CARD 2: DEVELOPER STATUS CLOCK */}
      <SpotlightCard className="p-4 flex flex-col justify-between h-[240px] relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/10 pb-2 mb-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground uppercase tracking-wider">
            <Clock className="h-4 w-4 text-neon-soft animate-pulse" />
            <span className="font-semibold">Developer Status</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${status.colorClass}`} />
            <span className="font-mono text-[9px] text-muted-foreground uppercase">
              IST (UTC+5:30)
            </span>
          </div>
        </div>

        <div className="my-auto py-2">
          <div className="font-display text-4xl font-bold tracking-tight text-foreground tabular-nums">
            {time || "Loading..."}
          </div>
          <div className="mt-2 font-semibold text-sm text-neon flex items-center gap-1.5">
            {status.text}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed font-sans max-w-sm">
            {status.sub}
          </p>
        </div>

        <div className="border-t border-border/10 pt-2.5 mt-auto flex items-center justify-between flex-shrink-0">
          <span className="text-[9px] font-mono text-muted-foreground/45 uppercase tracking-wider">
            Live Telemetry Node
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-mono text-lime uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-lime rounded-full animate-pulse" />
            Active Sync
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}
