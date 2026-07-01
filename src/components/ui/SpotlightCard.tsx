import { type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "data-cursor-text"?: string;
}

export function SpotlightCard({
  children,
  className = "",
  onClick,
  "data-cursor-text": cursorText,
}: SpotlightCardProps) {
  return (
    <div
      onClick={onClick}
      data-cursor-text={cursorText}
      className={`group glass relative overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-surface-2/65 hover:shadow-[0_25px_50px_rgba(0,0,0,0.55)] ${className}`}
    >
      {/* 4-Side Sequential Border Draw starting from zero */}
      <span className="absolute top-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-neon to-neon-soft transition-all duration-300 ease-out group-hover:w-full z-20" />
      <span className="absolute top-0 right-0 w-[1.5px] h-0 bg-gradient-to-b from-neon-soft to-lime transition-all duration-200 ease-out delay-150 group-hover:h-full z-20" />
      <span className="absolute bottom-0 right-0 h-[1.5px] w-0 bg-gradient-to-l from-lime to-neon transition-all duration-300 ease-out delay-300 group-hover:w-full z-20" />
      <span className="absolute bottom-0 left-0 w-[1.5px] h-0 bg-gradient-to-t from-neon to-neon-soft transition-all duration-200 ease-out delay-450 group-hover:h-full z-20" />

      {/* Radial glow expansion starting from zero size at the center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div
          className="h-[200%] w-[200%] rounded-full opacity-0 scale-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
          style={{ backgroundImage: "var(--card-glow)" }}
        />
      </div>

      {/* Inner Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
