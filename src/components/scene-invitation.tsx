"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

gsap.registerPlugin(ScrollTrigger);

const opportunities = [
  {
    label: "Invoice Processing",
    hours: "+14h/wk",
    savings: "$14,400/yr",
    percent: 88,
    gradient: "from-indigo-500 to-indigo-400",
    barColor: "linear-gradient(90deg, #6366F1, #818CF8)",
  },
  {
    label: "Customer Onboarding",
    hours: "+8h/wk",
    savings: "$9,600/yr",
    percent: 74,
    gradient: "from-violet-500 to-violet-400",
    barColor: "linear-gradient(90deg, #8B5CF6, #A78BFA)",
  },
  {
    label: "Report Generation",
    hours: "+6h/wk",
    savings: "$7,200/yr",
    percent: 61,
    gradient: "from-cyan-500 to-cyan-400",
    barColor: "linear-gradient(90deg, #06B6D4, #22D3EE)",
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
      const bars = pinned.querySelectorAll(".inv-bar-fill");
      const cta = pinned.querySelector(".inv-cta");
      const ctaBtn = pinned.querySelector(".inv-cta-btn");

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

      // Progress bars animate width
      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-percent") || "0";
        tl.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${targetWidth}%`,
            duration: 0.15,
            ease: "power2.out",
          },
          0.3
        );
      });

      // CTA button with glow intensify
      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.5
      );

      // CTA glow intensifies on reveal
      if (ctaBtn) {
        tl.fromTo(
          ctaBtn,
          { boxShadow: "0 0 0px rgba(99, 102, 241, 0)" },
          {
            boxShadow:
              "0 0 30px rgba(99, 102, 241, 0.4), 0 0 60px rgba(99, 102, 241, 0.2), 0 0 120px rgba(99, 102, 241, 0.1)",
            duration: 0.15,
            ease: "power2.out",
          },
          0.55
        );
      }

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

          {/* Floating glass audit card with perspective tilt */}
          <div className="relative animate-float">
            {/* Glowing backdrop */}
            <div className="glow-backdrop" />

            <div
              className="inv-card glass-card glass-card-glow p-6 sm:p-8 opacity-0 relative"
              style={{
                transform:
                  "perspective(1000px) rotateY(-2deg) rotateX(2deg)",
              }}
            >
              <BorderBeam size={80} duration={6} colorFrom="#6366F1" colorTo="#A78BFA" />
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
                    className="inv-row flex flex-col py-3 px-4 rounded-lg bg-base/50 border border-white/5 opacity-0"
                  >
                    <div className="flex items-center justify-between mb-2">
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
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="inv-bar-fill h-full rounded-full"
                        data-percent={opp.percent}
                        style={{
                          width: "0%",
                          background: opp.barColor,
                        }}
                      />
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
          </div>

          {/* CTA */}
          <div className="inv-cta mt-8 sm:mt-10 opacity-0">
            <ShimmerButton
              className="inv-cta-btn mx-auto px-8 py-4 text-base sm:text-lg font-semibold"
              shimmerColor="#818CF8"
              background="rgba(99, 102, 241, 0.15)"
              borderRadius="9999px"
            >
              <span className="flex items-center gap-2 text-white">
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
              </span>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
