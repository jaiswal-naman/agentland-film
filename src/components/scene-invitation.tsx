"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  "Connect one system",
  "We scan your workflows",
  "You get a ranked report",
];

export default function SceneInvitation() {
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

      const headline = pinned.querySelector(".inv-headline");
      const card = pinned.querySelector(".inv-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Headline fades in
      tl.fromTo(
        headline,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        0.05
      );

      // Card scales in
      tl.fromTo(
        card,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
        0.15
      );

      // Hold
      tl.to({}, { duration: 0.5 });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[140vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full bg-[#050507] overflow-hidden flex items-center justify-center"
      >
        <div className="w-full max-w-lg mx-auto px-6 text-center">
          {/* Headline */}
          <h2 className="inv-headline text-[clamp(32px,5vw,48px)] font-semibold tracking-tight text-[#E8E8E8] mb-12 opacity-0">
            See what you&apos;re missing.
          </h2>

          {/* Card */}
          <div
            className="inv-card rounded-xl border border-[#1A1A1A] bg-[#0C0C0E] p-8 opacity-0"
            style={{ maxWidth: "448px", margin: "0 auto" }}
          >
            {/* Label */}
            <p className="text-[14px] uppercase tracking-widest text-[#888888] mb-6">
              Free Audit
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-[#E8E8E8] text-[16px]"
                >
                  <span className="text-[#888888] text-[14px]">&rarr;</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="w-full py-3 px-8 rounded-lg font-semibold text-white text-[16px] transition-all duration-300 hover:tracking-[0.05em] hover:-translate-y-0.5 hover:opacity-90"
              style={{ backgroundColor: "#6366F1" }}
            >
              Get Your Free Audit &rarr;
            </button>

            {/* Trust signal */}
            <p className="text-[14px] text-[#555] mt-4">Read-only access &middot; No credit card &middot; Results in 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
