import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
}

export function CountUp({ end, duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const prevEndRef = useRef(0);

  useEffect(() => {
    const start = prevEndRef.current;
    const diff = end - start;

    // If the difference is small (like incrementing coffee by 1), use a quick transition
    const activeDuration = Math.abs(diff) === 1 ? 250 : duration;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / activeDuration, 1);

      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);

      setCount(Math.floor(start + easeProgress * diff));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        prevEndRef.current = end;
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return <>{count}</>;
}
