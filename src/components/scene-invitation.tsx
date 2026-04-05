"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const opportunities = [
  {
    label: "Invoice Processing",
    hours: "120 hrs/month",
    savings: "$14,400/yr",
  },
  {
    label: "Customer Onboarding",
    hours: "80 hrs/month",
    savings: "$9,600/yr",
  },
  {
    label: "Report Generation",
    hours: "60 hrs/month",
    savings: "$7,200/yr",
  },
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
      const rows = pinned.querySelectorAll(".inv-row");
      const cta = pinned.querySelector(".inv-cta");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Headline appears
      tl.fromTo(
        headline,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0
      );

      // Card floats in
      tl.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" },
        0.1
      );

      // Rows stagger in
      tl.fromTo(
        rows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.12,
          ease: "power2.out",
        },
        0.25
      );

      // CTA button
      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.5
      );

      // Hold
      tl.to({}, { duration: 0.35 });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-8 text-center">
          {/* Headline */}
          <h2 className="inv-headline text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-text mb-10 sm:mb-14 opacity-0">
            See what you&apos;re leaving on the table.
          </h2>

          {/* Glass audit card */}
          <div className="inv-card glass-card glass-card-glow p-6 sm:p-8 opacity-0">
            <div className="text-left mb-6">
              <div className="text-xs uppercase tracking-widest text-accent mb-2">
                Sample Audit Preview
              </div>
              <div className="text-lg sm:text-xl font-medium text-text">
                Your Automation Opportunities
              </div>
            </div>

            {/* Opportunity rows */}
            <div className="space-y-3">
              {opportunities.map((opp, i) => (
                <div
                  key={i}
                  className="inv-row flex items-center justify-between py-3 px-4 rounded-lg bg-base/50 border border-white/5 opacity-0"
                >
                  <div>
                    <div className="text-sm sm:text-base text-text font-medium">
                      {opp.label}
                    </div>
                    <div className="text-xs text-text-dim mt-0.5">
                      {opp.hours} saved
                    </div>
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-emerald">
                    {opp.savings}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-text-muted">
                Estimated Annual Savings
              </span>
              <span className="text-xl sm:text-2xl font-bold text-accent-light">
                $31,200
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="inv-cta mt-8 sm:mt-10 opacity-0">
            <a
              href="#audit"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold text-base sm:text-lg rounded-full transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
            >
              Get Your Free Audit
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
