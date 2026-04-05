"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneGap() {
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
    <div ref={containerRef}>
      {/* MOBILE LAYOUT -- simple, flowing, no absolute, no vh heights */}
      <div ref={mobileRef} className="md:hidden">
        <section className="flex flex-col items-center justify-start px-5 pt-24 pb-16 gap-6 bg-[#050507]">
          <div className="text-center animate-in">
            <span className="text-[56px] font-extrabold text-[#E8E8E8] leading-none font-[family-name:var(--font-mono)]">
              79<span className="text-[#888888] text-[24px]">%</span>
            </span>
            <p className="text-[16px] text-[#888888] mt-2">adopting</p>
          </div>
          <div className="animate-in w-12 h-px bg-[#333333]" />
          <div className="text-center animate-in">
            <span className="text-[72px] font-extrabold leading-none font-[family-name:var(--font-mono)]">
              <span className="gradient-text-accent">11</span>
              <span className="text-[#888888] text-[24px]">%</span>
            </span>
            <p className="text-[16px] text-[#888888] mt-2">running</p>
          </div>
          <p className="animate-in text-[15px] text-[#666] mt-6">
            The rest are stuck.
          </p>
        </section>
      </div>

      {/* DESKTOP LAYOUT -- original pin+scrub with absolute positioning */}
      <div className="hidden md:block relative h-[160vh]">
        <div
          ref={pinnedRef}
          className="h-screen w-full bg-[#050507] overflow-hidden relative flex items-center"
        >
          <div className="flex flex-row items-center justify-between w-full px-12 lg:px-[120px]">
            {/* 79% */}
            <div className="text-center">
              <div className="left-num text-fluid-stat font-extrabold leading-none tracking-[-0.04em] text-[#E8E8E8] opacity-0 font-[family-name:var(--font-mono)]">
                79
                <span
                  className="text-[#888888]"
                  style={{ fontSize: "clamp(24px, 6vw, 80px)" }}
                >
                  %
                </span>
              </div>
              <p className="left-label text-[20px] text-[#888888] mt-2 opacity-0">
                adopting
              </p>
            </div>

            {/* 11% */}
            <div className="text-center">
              <div className="right-num text-fluid-stat font-extrabold leading-none tracking-[-0.04em] opacity-0 font-[family-name:var(--font-mono)]">
                <span className="gradient-text-accent">11</span>
                <span
                  className="text-[#888888]"
                  style={{ fontSize: "clamp(24px, 6vw, 80px)" }}
                >
                  %
                </span>
              </div>
              <p className="right-label text-[20px] text-[#888888] mt-2 opacity-0">
                running
              </p>
            </div>

            {/* Bottom verdict */}
            <p className="bottom-text text-[20px] text-[#888888] opacity-0 absolute bottom-[15%] left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
              The rest are stuck.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
