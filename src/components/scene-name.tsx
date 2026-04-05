"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const taglineWords = ["Connect.", "Discover.", "Build.", "Deploy.", "Monitor."];

export default function SceneName() {
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

      const nameChars = pinned.querySelectorAll(".name-char");
      const taglineWordsEls = pinned.querySelectorAll(".tagline-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Phase 1: Type "AgentLand." character by character (0% -> 50%)
      nameChars.forEach((char, i) => {
        tl.fromTo(
          char,
          { opacity: 0, scale: 1.2 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.04,
            ease: "power2.out",
          },
          i * 0.04
        );

        // Particle glow burst per character
        tl.fromTo(
          char,
          { textShadow: "0 0 80px rgba(99, 102, 241, 0.8)" },
          {
            textShadow: "0 0 20px rgba(99, 102, 241, 0.2)",
            duration: 0.06,
            ease: "power2.out",
          },
          i * 0.04
        );
      });

      // Phase 2: Tagline words light up in sequence (55% -> 90%)
      tl.to({}, { duration: 0.08 });

      taglineWordsEls.forEach((word, i) => {
        tl.fromTo(
          word,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.06,
            ease: "power2.out",
          },
          0.55 + i * 0.07
        );
      });

      // Phase 3: Hold then fade (90% -> 100%)
      tl.to({}, { duration: 0.05 });
      tl.to(pinned.querySelector(".name-content"), {
        opacity: 0,
        duration: 0.05,
        ease: "power2.in",
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  const name = "AgentLand.";

  return (
    <div ref={containerRef} className="relative h-[150vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        <div className="name-content relative z-10 text-center px-8">
          {/* Brand name */}
          <h1 className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-bold tracking-tighter leading-none mb-8">
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="name-char inline-block opacity-0 text-text"
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Tagline */}
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            {taglineWords.map((word, i) => (
              <span
                key={i}
                className="tagline-word text-lg sm:text-xl md:text-2xl font-light tracking-wide opacity-[0.15]"
                style={{
                  color:
                    i === 0
                      ? "#6366F1"
                      : i === 1
                        ? "#8B5CF6"
                        : i === 2
                          ? "#6366F1"
                          : i === 3
                            ? "#10B981"
                            : "#F59E0B",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
