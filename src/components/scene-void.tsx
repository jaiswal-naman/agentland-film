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
      const cursor = pinned.querySelector(".typing-cursor");
      const allContent = pinned.querySelector(".void-content");
      const glowBg = pinned.querySelector(".indigo-glow-bg");
      const orbs = pinned.querySelectorAll(".floating-orb");

      // Master timeline scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Orbs fade in early
      tl.fromTo(
        orbs,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, stagger: 0.02, ease: "power2.out" },
        0
      );

      // Glow background fades in with text
      tl.fromTo(
        glowBg,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" },
        0
      );

      // Phase 1: Type line 1 (0% -> 35%)
      tl.fromTo(
        line1Chars,
        { opacity: 0 },
        { opacity: 1, stagger: 0.02, duration: 0.25, ease: "none" },
        0.02
      );

      // Show cursor after line 1
      tl.fromTo(
        cursor,
        { opacity: 0 },
        { opacity: 1, duration: 0.01, ease: "none" },
        0.27
      );

      // Phase 2: Hold (35% -> 48%)
      tl.to({}, { duration: 0.13 });

      // Phase 3: Type line 2 (48% -> 70%)
      tl.fromTo(
        line2Chars,
        { opacity: 0 },
        { opacity: 1, stagger: 0.02, duration: 0.18, ease: "none" }
      );

      // Phase 4: Hold (70% -> 82%)
      tl.to({}, { duration: 0.12 });

      // Phase 5: Dissolve (82% -> 100%)
      tl.to(cursor, {
        opacity: 0,
        duration: 0.02,
        ease: "none",
      });
      tl.to(allContent, {
        opacity: 0,
        scale: 0.98,
        filter: "blur(8px)",
        duration: 0.15,
        ease: "power2.in",
      });
      tl.to(
        glowBg,
        {
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        "<"
      );
      tl.to(
        orbs,
        {
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        "<"
      );

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  const line1 = "Your company is full of automation.";
  const line2 = "You just can't see it yet.";

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        {/* Floating gradient orbs */}
        <div
          className="floating-orb absolute opacity-0"
          style={{
            width: 300,
            height: 300,
            top: "15%",
            left: "10%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "floatOrb1 12s ease-in-out infinite",
          }}
        />
        <div
          className="floating-orb absolute opacity-0"
          style={{
            width: 250,
            height: 250,
            bottom: "20%",
            right: "8%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "floatOrb2 15s ease-in-out infinite",
          }}
        />
        <div
          className="floating-orb absolute opacity-0"
          style={{
            width: 200,
            height: 200,
            top: "60%",
            left: "55%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "floatOrb3 18s ease-in-out infinite",
          }}
        />

        {/* Pulsing indigo glow behind text */}
        <div
          className="indigo-glow-bg absolute opacity-0"
          style={{
            width: 600,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
            animation: "pulseGlow 4s ease-in-out infinite",
          }}
        />

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

          {/* Line 2 — indigo gradient text */}
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight relative">
            {line2.split("").map((char, i) => (
              <span
                key={i}
                className="line2-char inline-block opacity-0"
                style={{
                  background:
                    "linear-gradient(135deg, #818CF8, #6366F1, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            {/* Blinking cursor */}
            <span
              className="typing-cursor inline-block opacity-0 cursor-blink align-middle"
              style={{
                width: 2,
                height: "0.85em",
                background: "#6366F1",
                boxShadow:
                  "0 0 8px rgba(99,102,241,0.6), 0 0 16px rgba(99,102,241,0.3)",
                marginLeft: 4,
                borderRadius: 1,
                verticalAlign: "baseline",
                position: "relative",
                top: "0.05em",
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
