import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring physics for a lag-behind flashlight highlight effect
  const springX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 20 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[-1] h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[110px]"
      style={{
        x: springX,
        y: springY,
        background: "radial-gradient(circle, var(--color-neon) 0%, transparent 70%)",
      }}
    />
  );
}
