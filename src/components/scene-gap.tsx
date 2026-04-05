"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneGap() {
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

      const leftNum = pinned.querySelector(".left-num");
      const rightNum = pinned.querySelector(".right-num");
      const gapLine = pinned.querySelector(".gap-line");
      const gapLabel = pinned.querySelector(".gap-label");
      const leftLabel = pinned.querySelector(".left-label");
      const rightLabel = pinned.querySelector(".right-label");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Phase 1: 79% slams in from left (0% -> 20%)
      tl.fromTo(
        leftNum,
        { x: "-100vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.15, ease: "power3.out" },
        0
      );

      // Phase 2: 79% slides left, 11% slams in (20% -> 45%)
      tl.to(leftNum, { x: "-20vw", duration: 0.15, ease: "power2.inOut" });
      tl.fromTo(
        rightNum,
        { x: "100vw", opacity: 0 },
        { x: "20vw", opacity: 1, duration: 0.15, ease: "power3.out" },
        "<0.05"
      );

      // Phase 3: Labels appear (45% -> 55%)
      tl.fromTo(
        leftLabel,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }
      );
      tl.fromTo(
        rightLabel,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
        "<0.02"
      );

      // Phase 4: Gap line grows + label (55% -> 75%)
      tl.fromTo(
        gapLine,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.15, ease: "power2.out" }
      );
      tl.fromTo(
        gapLabel,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }
      );

      // Phase 5: Hold (75% -> 90%), then fade (90% -> 100%)
      tl.to({}, { duration: 0.1 });
      tl.to(pinned.querySelector(".gap-content"), {
        opacity: 0,
        duration: 0.1,
        ease: "power2.in",
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        <div className="gap-content relative z-10 w-full h-full flex flex-col items-center justify-center">
          {/* Numbers container */}
          <div className="relative w-full flex items-center justify-center">
            {/* 79% */}
            <div className="left-num absolute opacity-0">
              <span className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-bold text-text leading-none tracking-tighter">
                79%
              </span>
              <div className="left-label opacity-0 text-center mt-2">
                <span className="text-base sm:text-lg text-text-muted">
                  want to automate
                </span>
              </div>
            </div>

            {/* Gap line in center */}
            <div
              className="gap-line absolute w-[200px] sm:w-[300px] h-[2px] opacity-0 origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #6366F1, #818CF8, #6366F1, transparent)",
                boxShadow:
                  "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.2)",
              }}
            />

            {/* 11% */}
            <div className="right-num absolute opacity-0">
              <span
                className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-bold leading-none tracking-tighter"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1, #818CF8, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                11%
              </span>
              <div className="right-label opacity-0 text-center mt-2">
                <span className="text-base sm:text-lg text-text-muted">
                  have succeeded
                </span>
              </div>
            </div>
          </div>

          {/* Gap label below */}
          <div className="gap-label opacity-0 mt-16 sm:mt-24">
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-text-muted tracking-tight">
              The production gap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
