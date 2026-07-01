import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Menu,
  X,
  Coffee,
  Zap,
  Leaf,
  Terminal,
  Home,
  FolderGit,
  Sparkles,
  FileText,
  Trophy,
  Mail,
} from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderGit },
  { to: "/skills", label: "Skills", icon: Sparkles },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/profiles", label: "Profiles", icon: Trophy },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

type Theme = "espresso" | "cyber" | "sage" | "amber";

const themes = [
  { id: "espresso", label: "Espresso Editorial", icon: Coffee },
  { id: "cyber", label: "Cyber Horizon", icon: Zap },
  { id: "sage", label: "Zen Sage", icon: Leaf },
  { id: "amber", label: "Amber Terminal", icon: Terminal },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_theme") as Theme;
      return saved || "espresso";
    }
    return "espresso";
  });

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_theme", newTheme);
      const root = document.documentElement;
      root.classList.remove("theme-cyber", "theme-sage", "theme-amber");
      if (newTheme !== "espresso") {
        root.classList.add(`theme-${newTheme}`);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[min(1100px,calc(100%-1.5rem))] -translate-x-1/2"
    >
      <div className="glass-strong flex items-center justify-between gap-4 rounded-2xl px-5 py-3">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-neon to-lime text-background font-display font-bold shadow-[0_0_20px_var(--color-neon)]">
            B
          </span>
          <span className="font-display text-2xl font-bold tracking-wide">Barath</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs lg:text-sm text-muted-foreground transition hover:text-foreground"
                activeProps={{ className: "text-neon font-semibold animate-glow" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-surface/40 p-1 rounded-xl border border-border/25">
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  title={t.label}
                  data-cursor-text={t.label.toUpperCase()}
                  className={`grid h-8 w-8 place-items-center rounded-lg transition-all ${
                    isActive
                      ? "bg-neon text-background shadow-[0_0_12px_var(--color-neon)]"
                      : "text-muted-foreground hover:bg-surface/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>

          <Link
            to="/contact"
            className="rounded-xl bg-gradient-to-r from-neon to-lime px-4 py-2 text-sm font-semibold text-background shadow-[0_0_24px_var(--color-neon)] transition hover:scale-105"
          >
            Hire Me
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
        >
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                activeProps={{ className: "text-neon font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                <Icon className="h-4 w-4" />
                <span>{l.label}</span>
              </Link>
            );
          })}

          {/* Mobile Theme Selector */}
          <div className="mt-3 border-t border-border/20 pt-3 flex items-center justify-around">
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                    isActive ? "text-neon font-semibold" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[9px] font-mono">{t.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
