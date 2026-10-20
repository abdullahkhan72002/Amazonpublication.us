"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#0a0080", "#3b34b0", "#ffffff", "#d4af37", "#8b86d9"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  life: number;
};

export default function ThankYouConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles: Particle[] = [];
    let frame = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawnBurst = (originX: number, originY: number, count: number) => {
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 9;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 6,
          size: 6 + Math.random() * 8,
          rotation: Math.random() * 360,
          spin: (Math.random() - 0.5) * 12,
          color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
          life: 1,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      frame += 1;

      if (frame === 1) {
        spawnBurst(canvas.width * 0.5, canvas.height * 0.22, 90);
        spawnBurst(canvas.width * 0.22, canvas.height * 0.18, 50);
        spawnBurst(canvas.width * 0.78, canvas.height * 0.18, 50);
      }

      for (const particle of particles) {
        particle.vy += 0.18;
        particle.vx *= 0.995;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.spin;
        particle.life -= 0.0045;

        if (particle.life <= 0) continue;

        context.save();
        context.globalAlpha = Math.max(particle.life, 0);
        context.translate(particle.x, particle.y);
        context.rotate((particle.rotation * Math.PI) / 180);
        context.fillStyle = particle.color;
        context.fillRect(
          -particle.size / 2,
          -particle.size / 4,
          particle.size,
          particle.size / 2,
        );
        context.restore();
      }

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden
    />
  );
}
