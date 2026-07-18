import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, Coffee } from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { formatISTClock, getDeveloperStatus } from "../../lib/developer-status";

interface CoffeeParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export function Dashboard() {
  // COFFEE CLICKER STATE
  const [coffeeCount, setCoffeeCount] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("coffee_count");
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [particles, setParticles] = useState<CoffeeParticle[]>([]);

  const handleAddCoffee = () => {
    const newCount = coffeeCount + 1;
    setCoffeeCount(newCount);
    localStorage.setItem("coffee_count", newCount.toString());

    // Generate random particle velocities
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 20;

    const emojis = ["☕", "☕", "☕", "☕", "☕", "🔥", "✨", "☕"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    setParticles((prev) => [...prev, { id: Date.now() + Math.random(), x, y, emoji }]);
  };

  const removeParticle = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

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
      {/* CARD 1: VIRTUAL COFFEE CLICKER */}
      <SpotlightCard className="p-4 flex flex-col justify-between h-[240px] relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/10 pb-2 mb-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground uppercase tracking-wider">
            <Coffee className="h-4 w-4 text-neon-soft animate-pulse" />
            <span className="font-semibold">Virtual Fuel</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/60 uppercase">
            Interactive
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 my-auto">
          <div>
            <div className="font-display text-4xl font-bold tracking-tight text-foreground tabular-nums">
              {coffeeCount}
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed font-sans max-w-[200px]">
              Cups of coffee sent by visitors. Refill my supply!
            </p>
          </div>

          <div className="relative flex items-center justify-center w-24 h-24">
            {/* Particles overlay */}
            <AnimatePresence>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.5, x: p.x, y: p.y }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  onAnimationComplete={() => removeParticle(p.id)}
                  className="absolute pointer-events-none text-xl z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {p.emoji}
                </motion.span>
              ))}
            </AnimatePresence>

            <motion.button
              onClick={handleAddCoffee}
              whileTap={{ scale: 0.92 }}
              data-cursor-text="REFILL"
              className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neon to-lime flex items-center justify-center text-background shadow-[0_0_24px_var(--color-neon)] hover:scale-105 transition cursor-pointer"
            >
              <Coffee className="h-8 w-8" />
            </motion.button>
          </div>
        </div>

        <div className="border-t border-border/10 pt-2 mt-auto flex justify-between items-center text-[9px] text-muted-foreground/45 font-mono flex-shrink-0 uppercase tracking-wider">
          <span>Click cup to send coffee</span>
          <div className="flex items-center gap-1 text-neon animate-pulse">
            <Sparkles className="h-3 w-3" />
            <span>Tactile effect</span>
          </div>
        </div>
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
