"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneVoid() {
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
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.15,
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
      if (!pinned) return;

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

      // Phase 4: All text fades out (0.5 -> 0.65)
      tl.to([bigText, subText], {
        opacity: 0,
        duration: 0.15,
        ease: "power2.inOut",
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
        <section className="flex flex-col justify-start px-5 pt-24 pb-16 bg-[#050507]">
          <h1 className="animate-in text-[28px] sm:text-[36px] font-extrabold tracking-[-0.04em] leading-[0.95] text-[#E8E8E8] mb-3">
            AUTOMATION
          </h1>
          <p className="animate-in font-mono text-[11px] tracking-[0.15em] uppercase text-[#666] mb-12">
            is hiding inside your company.
          </p>
          <p className="animate-in text-[20px] font-semibold text-[#E8E8E8] text-center">
            AgentLand <span className="text-[#6366F1]">finds</span> it.
          </p>
        </section>
      </div>

      {/* DESKTOP LAYOUT -- original pin+scrub with absolute positioning */}
      <div className="hidden md:block relative h-[180vh]">
        <div
          ref={pinnedRef}
          className="h-screen w-full flex flex-col justify-center bg-[#050507] overflow-hidden"
        >
          {/* Ambient breathing glow */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, #6366F120 0%, transparent 70%)",
              animation: "breathe 12s ease-in-out infinite",
            }}
          />

          {/* Phase 1-2: Big text left-aligned */}
          <div className="pl-12 lg:pl-[120px] pr-8">
            <h1
              className="big-text text-fluid-hero font-extrabold leading-[0.9]"
              style={{ color: "#1A1A1A", letterSpacing: "-0.05em" }}
            >
              AUTOMATION
            </h1>
            <p
              className="sub-text text-label mt-6 text-[#888888] opacity-0"
              style={{ maxWidth: "600px" }}
            >
              is hiding inside your company.
            </p>
          </div>

          {/* Phase 5: Centered reveal */}
          <div className="reveal-group absolute inset-0 flex items-center justify-center opacity-0">
            <p className="text-h1 text-[#E8E8E8] px-6 text-center">
              AgentLand <span className="text-[#6366F1]">finds</span> it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
