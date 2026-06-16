"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export function ParticleField() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Particles
      id="portfolio-particles"
      className="absolute inset-0 -z-10"
      options={{
        background: { color: "transparent" },
        fullScreen: { enable: false },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          color: { value: ["#22d3ee", "#8b5cf6", "#ffffff"] },
          links: {
            color: "#38bdf8",
            distance: 145,
            enable: true,
            opacity: 0.22,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: { enable: true },
            value: 58,
          },
          opacity: {
            value: { min: 0.2, max: 0.65 },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: { enable: true },
          },
          modes: {
            grab: {
              distance: 180,
              links: { opacity: 0.45 },
            },
          },
        },
      }}
    />
  );
}
