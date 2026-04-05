"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is AgentLand?",
    a: "AgentLand is an AI automation platform that connects to your existing tools, discovers automation opportunities using AI, and lets you deploy and monitor AI agents -- all from one place.",
  },
  {
    q: "How does the free audit work?",
    a: "We connect to your tools (read-only), scan your workflows, and deliver a ranked list of automation opportunities with estimated ROI. No commitment required.",
  },
  {
    q: "Do I need technical expertise?",
    a: "No. AgentLand handles the technical complexity. If you can use a dashboard, you can automate with AgentLand.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are connected and running their first audit within 15 minutes. Deploying agents takes one click after that.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use read-only connections for audits, enterprise-grade encryption, and never store your business data. Your workflows stay yours.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#1A1A1A]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[16px] font-medium text-[#E8E8E8]">{q}</span>
        <svg
          className={`w-5 h-5 text-[#888888] transition-transform duration-300 flex-shrink-0 ml-4 ${open ? "rotate-45" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-[18px] text-[#888888] leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function SceneCredits() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const elements = section.querySelectorAll(".credit-animate");

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="relative bg-[#050507]">
      {/* Founder quote */}
      <section className="pt-32 pb-24 px-6">
        <div className="credit-animate max-w-xl pl-[120px]">
          {/* Decorative quote mark */}
          <div
            className="text-[80px] leading-none font-serif select-none -mb-10"
            style={{ color: "#1A1A1A" }}
          >
            &ldquo;
          </div>

          <blockquote className="text-[24px] italic text-[#E8E8E8] leading-relaxed tracking-tight mb-6">
            The bottleneck was never intelligence. It was the missing layer.
          </blockquote>

          <div className="text-[18px] text-[#888888]">Naman Jaiswal</div>
          <div className="text-[12px] text-[#333333] mt-1">
            NIT Rourkela &middot; YC Startup School &apos;26
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pt-40 pb-16 px-6 text-center">
        <div className="credit-animate">
          <h2 className="text-[clamp(48px,8vw,80px)] font-bold tracking-tight leading-none text-[#E8E8E8]">
            Your business.
          </h2>
          <h2 className="text-[clamp(48px,8vw,80px)] font-bold tracking-tight leading-none text-[#6366F1] mt-2">
            Automated.
          </h2>
        </div>

        <div className="credit-animate mt-16">
          <button
            className="py-4 px-10 rounded-lg font-semibold text-[#050507] text-[16px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            Start &rarr;
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6">
        <div className="max-w-lg mx-auto">
          <div className="credit-animate">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-[12px] text-[#333333]">
          &copy; 2026 AgentLand &middot; YC Startup School &apos;26
        </p>
      </footer>
    </div>
  );
}
