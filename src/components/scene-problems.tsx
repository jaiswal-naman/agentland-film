"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  "They don't know what to automate.",
  "80% of engineering time on connectors.",
  "No AI talent to hire.",
  "Drowning in tools.",
];

export default function SceneProblems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const pinned = pinnedRef.current;
      if (!container || !pinned) return;

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false,
      });

      const statements = pinned.querySelectorAll(".problem-statement");
      const bgPulse = pinned.querySelector(".bg-pulse");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Each statement: appear -> hold -> fade. 4 statements over 100% scroll.
      const perStatement = 1 / problems.length;

      statements.forEach((stmt, i) => {
        const start = i * perStatement;

        // Appear
        tl.fromTo(
          stmt,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: perStatement * 0.3,
            ease: "power2.out",
          },
          start
        );

        // Background pulse with each statement
        tl.to(
          bgPulse,
          {
            opacity: 0.08 + i * 0.02,
            scale: 1 + i * 0.02,
            duration: perStatement * 0.2,
            ease: "power1.inOut",
          },
          start
        );

        // Hold
        tl.to({}, { duration: perStatement * 0.35 }, start + perStatement * 0.3);

        // Fade out (except last one which fades at the end)
        tl.to(
          stmt,
          {
            opacity: 0,
            y: -20,
            scale: 0.98,
            duration: perStatement * 0.35,
            ease: "power2.in",
          },
          start + perStatement * 0.65
        );
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        {/* Background pulse */}
        <div
          className="bg-pulse absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 w-full h-full flex items-center justify-center px-8">
          {/* Stack all statements on top of each other */}
          {problems.map((text, i) => (
            <p
              key={i}
              className="problem-statement absolute text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-text leading-tight tracking-tight max-w-5xl opacity-0"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
