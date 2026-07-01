import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Variant = "fade" | "zoom" | "blur" | "slide" | "parallax";

const variants: Record<Variant, Variants> = {
  fade: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(20px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(20px)" },
  },
  slide: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },
  parallax: {
    initial: { opacity: 0, y: 80, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -40, scale: 1.02 },
  },
};

export function PageShell({
  children,
  variant = "fade",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <motion.main
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pt-28 ${className}`}
    >
      {children}
    </motion.main>
  );
}

import { LucideIcon } from "lucide-react";

export function SectionTitle({
  kicker,
  title,
  subtitle,
  icon: Icon,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mb-12 flex flex-col items-center text-center"
    >
      {Icon && (
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-surface border border-neon/30 text-neon shadow-[0_0_20px_rgba(224,168,153,0.15)]">
          <Icon className="h-6 w-6" />
        </div>
      )}
      {kicker && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">{kicker}</p>
      )}
      <h2 className="text-balance text-4xl font-bold md:text-5xl">
        <span className="neon-text">{title}</span>
      </h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
