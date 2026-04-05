"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneVoid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const pinned = pinnedRef.current;
      if (!container || !pinned) return;

      // Pin the scene
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false,
      });

      // Get all character spans for line 1
      const line1Chars = pinned.querySelectorAll(".line1-char");
      const line2Chars = pinned.querySelectorAll(".line2-char");
      const allContent = pinned.querySelector(".void-content");

      // Master timeline scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Phase 1: Type line 1 (0% -> 40%)
      tl.fromTo(
        line1Chars,
        { opacity: 0 },
        { opacity: 1, stagger: 0.02, duration: 0.3, ease: "none" },
        0
      );

      // Phase 2: Hold (40% -> 55%)
      tl.to({}, { duration: 0.15 });

      // Phase 3: Type line 2 (55% -> 80%)
      tl.fromTo(
        line2Chars,
        { opacity: 0 },
        { opacity: 1, stagger: 0.02, duration: 0.2, ease: "none" }
      );

      // Phase 4: Hold, then dissolve (80% -> 100%)
      tl.to({}, { duration: 0.05 });
      tl.to(allContent, {
        opacity: 0,
        scale: 0.98,
        filter: "blur(8px)",
        duration: 0.15,
        ease: "power2.in",
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  const line1 = "Your company is full of automation.";
  const line2 = "You just can't see it yet.";

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        {/* Subtle noise particles */}
        <div className="absolute inset-0 bg-breathe opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="void-content relative z-10 text-center px-8 max-w-4xl">
          {/* Line 1 */}
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-text-muted leading-tight mb-6">
            {line1.split("").map((char, i) => (
              <span key={i} className="line1-char inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>

          {/* Line 2 */}
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-text text-glow-white leading-tight">
            {line2.split("").map((char, i) => (
              <span key={i} className="line2-char inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
