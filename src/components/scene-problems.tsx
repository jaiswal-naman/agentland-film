"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  { word: "Lost.", sentence: "They don\u2019t know what to automate." },
  { word: "Wasted.", sentence: "80% of time building connectors, not agents." },
  { word: "Empty.", sentence: "The AI talent they need doesn\u2019t exist." },
  { word: "Drowning.", sentence: "Tools that don\u2019t talk to each other." },
];

export default function SceneProblems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const pinned = pinnedRef.current;
      if (!container || !pinned) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Mobile: each problem pair fades in when scrolled into view
        const groups = pinned.querySelectorAll(".problem-group");
        groups.forEach((group, i) => {
          gsap.fromTo(
            group,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
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

      const groups = pinned.querySelectorAll(".problem-group");
      const segmentDuration = 1 / statements.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      groups.forEach((group, i) => {
        const start = i * segmentDuration;
        const wordEl = group.querySelector(".problem-word");
        const sentenceEl = group.querySelector(".problem-sentence");

        // Word fades in
        tl.fromTo(
          wordEl,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: segmentDuration * 0.15, ease: "power2.out" },
          start
        );

        // Word holds briefly
        tl.to({}, { duration: segmentDuration * 0.1 }, start + segmentDuration * 0.15);

        // Sentence fades in below word
        tl.fromTo(
          sentenceEl,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: segmentDuration * 0.15, ease: "power2.out" },
          start + segmentDuration * 0.25
        );

        // Hold both
        tl.to({}, { duration: segmentDuration * 0.3 }, start + segmentDuration * 0.4);

        // Both fade out
        tl.to(
          [wordEl, sentenceEl],
          { opacity: 0, y: -20, duration: segmentDuration * 0.2, ease: "power2.inOut" },
          start + segmentDuration * 0.7
        );
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative min-h-screen md:h-[200vh]">
      <div
        ref={pinnedRef}
        className="min-h-screen md:h-screen w-full bg-[#050507] overflow-hidden flex items-center"
      >
        {/* Mobile: stacked naturally. Desktop: absolute positioned for pin/scrub */}
        <div className="pl-6 sm:pl-12 lg:pl-[120px] pr-6 sm:pr-8 relative w-full py-24 md:py-0">
          {statements.map((item, i) => (
            <div
              key={i}
              className="problem-group md:absolute py-8 md:py-0"
              style={{ maxWidth: "640px" }}
            >
              <p className="problem-word text-[32px] md:text-[clamp(40px,7vw,60px)] font-bold text-[#E8E8E8] leading-tight md:opacity-0">
                {item.word}
              </p>
              <p className="problem-sentence text-[18px] md:text-[clamp(20px,3vw,28px)] text-[#888] mt-3 leading-relaxed md:opacity-0">
                {item.sentence}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
