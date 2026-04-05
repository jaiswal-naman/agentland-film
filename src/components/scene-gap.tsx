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
      const leftLabel = pinned.querySelector(".left-label");
      const rightNum = pinned.querySelector(".right-num");
      const rightLabel = pinned.querySelector(".right-label");
      const bottomText = pinned.querySelector(".bottom-text");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Phase 1: Left number + label (0 -> 0.25)
      tl.fromTo(
        leftNum,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" },
        0.05
      );
      tl.fromTo(
        leftLabel,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "power2.out" },
        0.15
      );

      // Phase 2: Right number + label (0.25 -> 0.5)
      tl.fromTo(
        rightNum,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" },
        0.3
      );
      tl.fromTo(
        rightLabel,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "power2.out" },
        0.4
      );

      // Phase 3: Hold (0.5 -> 0.6)
      tl.to({}, { duration: 0.1 });

      // Phase 4: Bottom text (0.6 -> 0.75)
      tl.fromTo(
        bottomText,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0.6
      );

      // Phase 5: Hold (0.75 -> 0.85)
      tl.to({}, { duration: 0.1 });

      // Phase 6: Fade all (0.85 -> 1.0)
      tl.to([leftNum, leftLabel, rightNum, rightLabel, bottomText], {
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
    <div ref={containerRef} className="relative h-[160vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full bg-[#050507] overflow-hidden relative flex items-center"
      >
        {/* Stats container -- stacks vertically on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full px-6 sm:px-12 md:px-[120px] gap-8 md:gap-0">
          {/* Left: 79% */}
          <div className="text-center md:text-left">
            <div
              className="left-num text-fluid-stat font-extrabold leading-none tracking-tighter text-[#E8E8E8] opacity-0"
            >
              79
              <span
                className="text-[#888888]"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                %
              </span>
            </div>
            <p className="left-label text-[16px] sm:text-[20px] text-[#888888] mt-2 opacity-0">
              adopting
            </p>
          </div>

          {/* Right: 11% */}
          <div className="text-center md:text-right">
            <div
              className="right-num text-fluid-stat font-extrabold leading-none tracking-tighter text-[#E8E8E8] opacity-0"
            >
              11
              <span
                className="text-[#888888]"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                %
              </span>
            </div>
            <p className="right-label text-[16px] sm:text-[20px] text-[#888888] mt-2 opacity-0">
              running
            </p>
          </div>
        </div>

        {/* Bottom: verdict */}
        <p className="bottom-text absolute bottom-[15%] left-1/2 -translate-x-1/2 text-[16px] sm:text-[20px] text-[#888888] opacity-0 whitespace-nowrap">
          The rest are stuck.
        </p>
      </div>
    </div>
  );
}
