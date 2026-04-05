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

      // Pin
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false,
      });

      const bigText = pinned.querySelector(".big-text");
      const subText = pinned.querySelector(".sub-text");
      const revealGroup = pinned.querySelector(".reveal-group");

      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Phase 1: "AUTOMATION" fades from #1A1A1A to #E8E8E8 (0 -> 0.25)
      tl.fromTo(
        bigText,
        { color: "#1A1A1A", opacity: 1 },
        { color: "#E8E8E8", duration: 0.25, ease: "power2.out" },
        0
      );

      // Phase 2: Sub text fades in (0.2 -> 0.35)
      tl.fromTo(
        subText,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0.2
      );

      // Phase 3: Hold (0.35 -> 0.5)
      tl.to({}, { duration: 0.15 });

      // Phase 4: All text fades out (0.5 -> 0.6)
      tl.to([bigText, subText], {
        opacity: 0,
        duration: 0.1,
        ease: "power2.in",
      });

      // Phase 5: Reveal text fades in (0.6 -> 0.8)
      tl.fromTo(
        revealGroup,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        0.6
      );

      // Phase 6: Hold (0.8 -> 0.9)
      tl.to({}, { duration: 0.1 });

      // Phase 7: Dissolve (0.9 -> 1.0)
      tl.to(revealGroup, {
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
    <div ref={containerRef} className="relative h-[180vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex flex-col justify-center bg-[#050507] overflow-hidden"
      >
        {/* Phase 1-2: Big text left-aligned */}
        <div className="pl-[120px] pr-8">
          <h1
            className="big-text font-extrabold leading-[0.9] tracking-tight"
            style={{
              fontSize: "clamp(80px, 14vw, 200px)",
              color: "#1A1A1A",
            }}
          >
            AUTOMATION
          </h1>
          <p
            className="sub-text mt-6 text-[24px] text-[#888888] opacity-0"
            style={{ maxWidth: "600px" }}
          >
            is hiding inside your company.
          </p>
        </div>

        {/* Phase 5: Centered reveal */}
        <div className="reveal-group absolute inset-0 flex items-center justify-center opacity-0">
          <p className="text-[clamp(32px,5vw,60px)] font-semibold tracking-tight text-[#E8E8E8]">
            AgentLand{" "}
            <span className="text-[#6366F1]">finds</span>{" "}
            it.
          </p>
        </div>
      </div>
    </div>
  );
}
