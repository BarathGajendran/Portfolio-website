import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, useRef, type MouseEvent } from "react";

export function MagneticButton({
  children,
  onClick,
  href,
  download,
  className = "",
  "data-cursor-text": cursorText,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  download?: string;
  className?: string;
  "data-cursor-text"?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-neon to-lime px-8 py-4 font-display font-semibold text-background shadow-[0_0_40px_var(--color-neon)] transition-shadow hover:shadow-[0_0_70px_var(--color-neon)] ${className}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
          {children}
        </span>
        <span className="animate-shimmer absolute inset-0 z-0" />
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} download={download} onClick={onClick} data-cursor-text={cursorText}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} type="button" data-cursor-text={cursorText}>
      {inner}
    </button>
  );
}
