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
    <div ref={containerRef}>
      {/* MOBILE LAYOUT -- simple, flowing, no absolute, no vh heights */}
      <div ref={mobileRef} className="md:hidden">
        <section className="flex flex-col items-start justify-start px-4 pt-20 pb-12 bg-[#050507]">
          <h2 className="animate-in text-[20px] font-medium text-[#E8E8E8] mb-6 text-center">
            See what you&apos;re missing.
          </h2>

          <div className="animate-in w-full border border-[#1A1A1A] bg-[#0C0C0E] rounded-xl p-5">
            {/* Label */}
            <p className="text-[11px] uppercase tracking-widest text-[#888] mb-4">
              Free Audit
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-[#E8E8E8] text-[14px]"
                >
                  <span className="text-[#888888] text-[13px]">&rarr;</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="w-full py-3 rounded-lg font-semibold text-white text-[16px] transition-all duration-300"
              style={{ backgroundColor: "#6366F1" }}
            >
              Get Your Free Audit &rarr;
            </button>

            {/* Trust signal */}
            <p className="text-[12px] text-[#555555] mt-4 text-center">
              Read-only access &middot; No credit card &middot; Results in 24
              hours
            </p>
          </div>

        </section>
      </div>

      {/* DESKTOP LAYOUT -- original pin+scrub with absolute positioning */}
      <div className="hidden md:block relative h-[140vh]">
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
              <p className="text-[11px] uppercase tracking-widest text-[#888] mb-4">
                Free Audit
              </p>

              {/* Steps */}
              <div className="space-y-4 mb-8">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-[#E8E8E8] text-[16px]"
                  >
                    <span className="text-[#888888] text-[13px]">&rarr;</span>
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
              <p className="text-[14px] text-[#555555] mt-4">
                Read-only access &middot; No credit card &middot; Results in 24
                hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
