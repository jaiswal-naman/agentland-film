"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Chasm particles — small glowing dots floating along the void      */
/* ------------------------------------------------------------------ */
function ChasmParticles() {
  const particles = [
    { top: "15%", left: "30%", size: 4, delay: 0, dur: 3 },
    { top: "70%", left: "65%", size: 3, delay: 0.5, dur: 4 },
    { top: "25%", left: "55%", size: 5, delay: 1, dur: 3.5 },
    { top: "80%", left: "35%", size: 3, delay: 1.5, dur: 4.5 },
    { top: "45%", left: "20%", size: 4, delay: 0.8, dur: 3.2 },
    { top: "55%", left: "75%", size: 3, delay: 2, dur: 3.8 },
    { top: "10%", left: "45%", size: 5, delay: 0.3, dur: 4.2 },
    { top: "90%", left: "50%", size: 3, delay: 1.2, dur: 3.6 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="chasm-particle absolute rounded-full opacity-0"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: "#818CF8",
            boxShadow:
              "0 0 8px rgba(129,140,248,0.8), 0 0 16px rgba(99,102,241,0.4)",
            animation: `chasmFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

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
      const chasmContainer = pinned.querySelector(".chasm-container");
      const chasmGlow = pinned.querySelector(".chasm-glow");
      const chasmParticles = pinned.querySelectorAll(".chasm-particle");
      const gapLabel = pinned.querySelector(".gap-label");
      const leftLabel = pinned.querySelector(".left-label");
      const rightLabel = pinned.querySelector(".right-label");
      const bgOrbs = pinned.querySelectorAll(".gap-bg-orb");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // BG orbs fade in
      tl.fromTo(
        bgOrbs,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, stagger: 0.02, ease: "power2.out" },
        0
      );

      // Phase 1: 79% slams in from left (0% -> 15%)
      tl.fromTo(
        leftNum,
        { x: "-100vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.12, ease: "power3.out" },
        0.02
      );

      // Phase 2: 79% slides left, 11% slams in from right (15% -> 35%)
      tl.to(leftNum, { x: "-20vw", duration: 0.12, ease: "power2.inOut" });
      tl.fromTo(
        rightNum,
        { x: "100vw", opacity: 0 },
        { x: "20vw", opacity: 1, duration: 0.12, ease: "power3.out" },
        "<0.04"
      );

      // Phase 3: Labels appear (35% -> 42%)
      tl.fromTo(
        leftLabel,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }
      );
      tl.fromTo(
        rightLabel,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        "<0.02"
      );

      // Phase 4: Chasm grows from 0 to full width (42% -> 62%)
      tl.fromTo(
        chasmContainer,
        { width: 0, opacity: 0 },
        { width: 200, opacity: 1, duration: 0.15, ease: "power2.out" }
      );
      tl.fromTo(
        chasmGlow,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "power2.out" },
        "<0.05"
      );

      // Particles appear
      tl.fromTo(
        chasmParticles,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.01,
          duration: 0.08,
          ease: "power2.out",
        },
        "<0.05"
      );

      // Phase 5: Gap label (62% -> 72%)
      tl.fromTo(
        gapLabel,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }
      );

      // Phase 6: Hold (72% -> 88%)
      tl.to({}, { duration: 0.16 });

      // Phase 7: Fade out (88% -> 100%)
      tl.to(pinned.querySelector(".gap-content"), {
        opacity: 0,
        duration: 0.12,
        ease: "power2.in",
      });
      tl.to(
        bgOrbs,
        { opacity: 0, duration: 0.12, ease: "power2.in" },
        "<"
      );

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        {/* Background gradient orbs */}
        <div
          className="gap-bg-orb absolute opacity-0"
          style={{
            width: 400,
            height: 400,
            top: "10%",
            left: "5%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "pulseGlow 6s ease-in-out infinite",
          }}
        />
        <div
          className="gap-bg-orb absolute opacity-0"
          style={{
            width: 350,
            height: 350,
            bottom: "15%",
            right: "10%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "pulseGlow 8s ease-in-out 1s infinite",
          }}
        />

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

            {/* Glowing chasm in center */}
            <div
              className="chasm-container absolute flex items-center justify-center overflow-visible opacity-0"
              style={{
                width: 0,
                height: 300,
              }}
            >
              {/* Central void gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(99,102,241,0.03) 20%, rgba(99,102,241,0.08) 50%, rgba(99,102,241,0.03) 80%, transparent)",
                }}
              />

              {/* Left edge glow */}
              <div
                className="absolute left-0 top-0 h-full"
                style={{
                  width: 3,
                  background:
                    "linear-gradient(180deg, transparent 5%, #6366F1 30%, #818CF8 50%, #6366F1 70%, transparent 95%)",
                  boxShadow:
                    "0 0 15px rgba(99,102,241,0.6), 0 0 30px rgba(99,102,241,0.3), -4px 0 20px rgba(99,102,241,0.2)",
                }}
              />

              {/* Right edge glow */}
              <div
                className="absolute right-0 top-0 h-full"
                style={{
                  width: 3,
                  background:
                    "linear-gradient(180deg, transparent 5%, #6366F1 30%, #818CF8 50%, #6366F1 70%, transparent 95%)",
                  boxShadow:
                    "0 0 15px rgba(99,102,241,0.6), 0 0 30px rgba(99,102,241,0.3), 4px 0 20px rgba(99,102,241,0.2)",
                }}
              />

              {/* Central pulsing glow */}
              <div
                className="chasm-glow absolute opacity-0"
                style={{
                  width: "100%",
                  height: "60%",
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
                  filter: "blur(20px)",
                  animation: "chasmPulse 3s ease-in-out infinite",
                }}
              />

              {/* Floating particles */}
              <ChasmParticles />
            </div>

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
              That gap costs companies everything.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
