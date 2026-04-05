"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  "They don\u2019t know what to automate.",
  "They build connectors, not agents.",
  "They hire teams that don\u2019t exist.",
  "They buy tools that don\u2019t talk.",
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

      const lines = pinned.querySelectorAll(".problem-line");
      const segmentDuration = 1 / statements.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      lines.forEach((line, i) => {
        const start = i * segmentDuration;
        const fadeIn = segmentDuration * 0.25;
        const hold = segmentDuration * 0.4;
        const fadeOut = segmentDuration * 0.25;

        // Fade in
        tl.fromTo(
          line,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: fadeIn, ease: "power2.out" },
          start
        );

        // Hold
        tl.to({}, { duration: hold }, start + fadeIn);

        // Fade out
        tl.to(
          line,
          { opacity: 0, y: -20, duration: fadeOut, ease: "power2.in" },
          start + fadeIn + hold
        );
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[160vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full bg-[#050507] overflow-hidden flex items-center"
      >
        <div className="pl-[120px] pr-8 relative w-full">
          {statements.map((text, i) => (
            <p
              key={i}
              className="problem-line absolute text-[clamp(28px,4vw,48px)] font-semibold text-[#E8E8E8] leading-tight opacity-0"
              style={{ maxWidth: "640px" }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
