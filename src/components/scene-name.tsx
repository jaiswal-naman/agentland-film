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
  const mobileRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const pinned = pinnedRef.current;
      const mobile = mobileRef.current;
      if (!container) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        if (!mobile) return;
        const elements = mobile.querySelectorAll(".animate-in");
        elements.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.2,
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

      // Desktop: existing pin+scrub logic with character animation
      if (!pinned) return;

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
        ease: "power2.inOut",
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* MOBILE LAYOUT -- simple, flowing, no absolute, no vh heights */}
      <div ref={mobileRef} className="md:hidden">
        <section className="flex flex-col items-center justify-center px-5 py-20 bg-[#050507]">
          <h2 className="animate-in text-[28px] font-bold tracking-tighter text-[#E8E8E8]">
            AgentLand
          </h2>
          <p className="animate-in text-[11px] text-[#666] tracking-[0.15em] uppercase mt-4 text-center">
            CONNECT &middot; DISCOVER &middot; BUILD &middot; DEPLOY &middot;
            MONITOR
          </p>
        </section>
      </div>

      {/* DESKTOP LAYOUT -- original pin+scrub with absolute positioning */}
      <div className="hidden md:block relative h-[140vh]">
        <div
          ref={pinnedRef}
          className="h-screen w-full bg-[#050507] overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Name: per-character animation */}
          <h2 className="text-fluid-name font-extrabold tracking-tight leading-none">
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="name-char inline-block opacity-0 text-[#E8E8E8]"
              >
                {char}
              </span>
            ))}
          </h2>

          {/* Sub-words */}
          <div className="mt-8 flex items-center gap-4 flex-wrap justify-center px-4">
            {words.map((word, i) => (
              <span key={i} className="flex items-center gap-4">
                <span className="sub-word text-[18px] md:text-[24px] text-[#888888] tracking-[0.3em] uppercase opacity-0">
                  {word}
                </span>
                {i < words.length - 1 && (
                  <span className="text-[#333333] text-[12px] opacity-50">
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
