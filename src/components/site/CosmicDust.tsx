import { useEffect, useRef } from "react";

interface DustParticle {
  x: number;
  y: number;
  baseSpeedY: number;
  speedY: number;
  speedX: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  angle: number;
  wobbleSpeed: number;
}

export function CosmicDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let currentSettings = {
      particleCount: 95,
      speedMultiplier: 1.0,
      repelRadius: 180,
      colorPalette: "bronze",
      sizeMultiplier: 1.0,
    };

    const getPaletteColors = (palette: string) => {
      switch (palette) {
        case "cyan":
          return ["34, 211, 238", "59, 130, 246", "168, 85, 247"]; // Cyan, Blue, Amethyst
        case "sage":
          return ["110, 231, 183", "52, 211, 153", "167, 243, 208"]; // Sage Green, Emerald, Mint
        case "amber":
          return ["245, 158, 11", "239, 68, 68", "251, 146, 60"]; // Amber, Red, Orange
        case "bronze":
        default:
          return ["192, 132, 252", "251, 191, 36", "242, 193, 108"]; // Amethyst, Solar Gold, Amber
      }
    };

    const particles: DustParticle[] = [];

    const createParticle = (yPos?: number): DustParticle => {
      const radius = Math.random() * 1.8 + 0.6; // Small base ember size
      const baseAlpha = Math.random() * 0.4 + 0.2; // Soft opacity
      const colors = getPaletteColors(currentSettings.colorPalette);
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: yPos !== undefined ? yPos : Math.random() * height,
        baseSpeedY: Math.random() * -0.5 - 0.2, // Drifting upwards
        speedY: 0,
        speedX: 0,
        radius,
        color,
        alpha: baseAlpha,
        baseAlpha,
        angle: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
      };
    };

    // Initialize particles
    const adjustParticleCount = () => {
      const targetCount = currentSettings.particleCount;
      if (particles.length < targetCount) {
        while (particles.length < targetCount) {
          particles.push(createParticle());
        }
      } else if (particles.length > targetCount) {
        particles.splice(targetCount);
      }
    };

    adjustParticleCount();

    const handleConfigChange = (e: Event) => {
      const newSettings = (e as CustomEvent).detail;
      if (!newSettings) return;

      const prevPalette = currentSettings.colorPalette;
      currentSettings = { ...currentSettings, ...newSettings };

      // Adjust density
      adjustParticleCount();

      // If color palette changed, update existing particle colors
      if (prevPalette !== currentSettings.colorPalette) {
        const paletteColors = getPaletteColors(currentSettings.colorPalette);
        particles.forEach((p) => {
          p.color = paletteColors[Math.floor(Math.random() * paletteColors.length)];
        });
      }
    };

    window.addEventListener("cosmic-config", handleConfigChange);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;
      const mActive = mouseRef.current.active;
      const repelRadius = currentSettings.repelRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wobble left/right drift using sine wave
        p.angle += p.wobbleSpeed;
        p.speedX = Math.sin(p.angle) * 0.15;
        p.speedY = p.baseSpeedY * currentSettings.speedMultiplier;

        // Base coordinate update
        p.x += p.speedX;
        p.y += p.speedY;

        // Calculate distance to mouse
        let displayX = p.x;
        let displayY = p.y;

        if (mActive) {
          const dx = p.x - mX;
          const dy = p.y - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius; // 0 at edge, 1 at center
            // Push particle coordinates gently away for display
            displayX += (dx / (dist || 1)) * force * 35;
            displayY += (dy / (dist || 1)) * force * 35;

            // Brighten up slightly when influenced by cursor
            p.alpha = Math.min(p.baseAlpha + force * 0.35, 0.85);
          } else {
            p.alpha = p.baseAlpha;
          }
        }

        // Wrap around boundaries
        if (p.y < -10) {
          // Reset at bottom
          particles[i] = createParticle(height + 10);
          continue;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(displayX, displayY, p.radius * currentSettings.sizeMultiplier, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("cosmic-config", handleConfigChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 block h-full w-full bg-transparent"
    />
  );
}
