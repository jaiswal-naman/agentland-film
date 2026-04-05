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

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Mobile: each phase fades in when scrolled into view, no pin
        const phaseEls = pinned.querySelectorAll(".wt-phase-mobile");
        phaseEls.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
        return;
      }

      // Desktop: existing pin+scrub logic
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
    <div ref={containerRef} className="relative min-h-screen md:h-[260vh]">
      <div
        ref={pinnedRef}
        className="min-h-screen md:h-screen w-full bg-[#050507] overflow-hidden relative"
      >
        {/* Mobile layout: stacked phases that scroll naturally */}
        <div className="md:hidden flex flex-col w-full">
          {phases.map((phase) => (
            <div
              key={phase.word}
              className="wt-phase-mobile min-h-[40vh] py-16 flex flex-col items-center justify-center text-center px-6"
            >
              <h3 className="text-fluid-phase font-extrabold tracking-tight leading-none text-[#E8E8E8]">
                {phase.word}
              </h3>
              <p className="text-[16px] text-[#888888] mt-3 max-w-md">
                {phase.subtitle}
              </p>
              {/* Static colored line on mobile */}
              <div
                className="mt-6 h-[2px] w-[40px]"
                style={{ backgroundColor: phase.lineColor }}
              />
            </div>
          ))}
        </div>

        {/* Desktop layout: absolute positioned phases for pin/scrub */}
        {phases.map((phase) => {
          const alignClass =
            phase.align === "right"
              ? "items-center md:items-end text-center md:text-right pr-6 sm:pr-12 lg:pr-[120px]"
              : phase.align === "left"
                ? "items-center md:items-start text-center md:text-left pl-6 sm:pl-12 lg:pl-[120px]"
                : "items-center text-center";

          return (
            <div
              key={phase.word}
              className={`wt-phase hidden md:flex absolute inset-0 flex-col justify-center px-8 opacity-0 ${alignClass}`}
              style={{ display: "none" }}
            >
              <h3
                className="wt-title text-fluid-phase font-extrabold tracking-tight leading-none text-[#E8E8E8] opacity-0"
              >
                {phase.word}
              </h3>
              <p className="wt-subtitle text-[18px] sm:text-[22px] md:text-[24px] text-[#888888] mt-3 sm:mt-4 opacity-0 max-w-md">
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
