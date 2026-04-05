"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const name = "AgentLand";
const words = ["CONNECT", "DISCOVER", "BUILD", "DEPLOY", "MONITOR"];

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

      const chars = pinned.querySelectorAll(".name-char");
      const wordEls = pinned.querySelectorAll(".sub-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Phase 1: Characters appear one by one (0 -> 0.5)
      tl.fromTo(
        chars,
        { opacity: 0 },
        { opacity: 1, stagger: 0.04, duration: 0.45, ease: "none" },
        0.05
      );

      // Phase 2: Words appear (0.5 -> 0.75)
      tl.fromTo(
        wordEls,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.2, ease: "power2.out" },
        0.55
      );

      // Phase 3: Hold (0.75 -> 0.85)
      tl.to({}, { duration: 0.1 });

      // Phase 4: Fade out (0.85 -> 1.0)
      tl.to([...Array.from(chars), ...Array.from(wordEls)], {
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full bg-[#050507] overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Name */}
        <h2
          className="font-extrabold tracking-tight leading-none"
          style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
        >
          {name.split("").map((char, i) => (
            <span key={i} className="name-char inline-block opacity-0 text-[#E8E8E8]">
              {char}
            </span>
          ))}
        </h2>

        {/* Sub-words */}
        <div className="mt-8 flex items-center gap-4 flex-wrap justify-center">
          {words.map((word, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="sub-word text-[20px] text-[#555555] tracking-[0.3em] uppercase opacity-0">
                {word}
              </span>
              {i < words.length - 1 && (
                <span className="text-[#333333] text-[12px] opacity-50">&middot;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
