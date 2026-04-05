"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    word: "Connect",
    subtitle: "Your systems. Ten minutes.",
    align: "right" as const,
    lineDir: "rtl" as const,
    lineColor: "#22D3EE",
  },
  {
    word: "Discover",
    subtitle: "AI reads your workflows. Finds what\u2019s worth automating.",
    align: "left" as const,
    lineDir: "ltr" as const,
    lineColor: "#8B5CF6",
  },
  {
    word: "Deploy",
    subtitle: "One click. It\u2019s live.",
    align: "center" as const,
    lineDir: "center" as const,
    lineColor: "#10B981",
  },
  {
    word: "Monitor",
    subtitle: "Every agent. Every execution.",
    align: "right" as const,
    lineDir: "rtl" as const,
    lineColor: "#F59E0B",
  },
];

export default function SceneWalkthrough() {
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

      const phaseEls = pinned.querySelectorAll(".wt-phase");
      const perPhase = 1 / phases.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      phaseEls.forEach((phaseEl, i) => {
        const start = i * perPhase;
        const title = phaseEl.querySelector(".wt-title");
        const subtitle = phaseEl.querySelector(".wt-subtitle");
        const line = phaseEl.querySelector(".wt-line");

        // Show phase
        tl.fromTo(
          phaseEl,
          { opacity: 0, display: "none" },
          { opacity: 1, display: "flex", duration: 0.001, ease: "none" },
          start
        );

        // Title fades in
        tl.fromTo(
          title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: perPhase * 0.2, ease: "power2.out" },
          start + perPhase * 0.02
        );

        // Subtitle fades in
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: perPhase * 0.15, ease: "power2.out" },
          start + perPhase * 0.18
        );

        // Line grows
        if (line) {
          const dir = phases[i].lineDir;
          if (dir === "rtl") {
            tl.fromTo(
              line,
              { scaleX: 0, transformOrigin: "right center" },
              { scaleX: 1, duration: perPhase * 0.3, ease: "power2.out" },
              start + perPhase * 0.25
            );
          } else if (dir === "ltr") {
            tl.fromTo(
              line,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: perPhase * 0.3, ease: "power2.out" },
              start + perPhase * 0.25
            );
          } else {
            tl.fromTo(
              line,
              { scaleX: 0, transformOrigin: "center center" },
              { scaleX: 1, duration: perPhase * 0.3, ease: "power2.out" },
              start + perPhase * 0.25
            );
          }
        }

        // Hold
        tl.to({}, { duration: perPhase * 0.2 }, start + perPhase * 0.55);

        // Fade out
        tl.to(
          phaseEl,
          { opacity: 0, duration: perPhase * 0.15, ease: "power2.inOut" },
          start + perPhase * 0.75
        );

        // Hide
        tl.set(phaseEl, { display: "none" }, start + perPhase * 0.95);
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[260vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full bg-[#050507] overflow-hidden relative"
      >
        {phases.map((phase, i) => {
          const alignClass =
            phase.align === "right"
              ? "items-end text-right pr-[120px]"
              : phase.align === "left"
                ? "items-start text-left pl-[120px]"
                : "items-center text-center";

          return (
            <div
              key={phase.word}
              className={`wt-phase absolute inset-0 flex-col justify-center px-8 opacity-0 ${alignClass}`}
              style={{ display: "none" }}
            >
              <h3
                className="wt-title text-fluid-phase font-extrabold tracking-tight leading-none text-[#E8E8E8] opacity-0"
              >
                {phase.word}
              </h3>
              <p className="wt-subtitle text-[24px] text-[#888888] mt-4 opacity-0 max-w-md">
                {phase.subtitle}
              </p>
              <div
                className="wt-line mt-8 h-[1px]"
                style={{
                  width: "min(400px, 60vw)",
                  transform: "scaleX(0)",
                  backgroundColor: phase.lineColor,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
