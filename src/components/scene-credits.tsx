"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";

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
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base sm:text-lg font-medium text-text group-hover:text-accent transition-colors">
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-text-dim transition-transform duration-300 flex-shrink-0 ml-4 ${open ? "rotate-45" : ""}`}
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
        <p className="pb-5 text-sm sm:text-base text-text-muted leading-relaxed">
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
    <div ref={sectionRef} className="relative bg-base">
      {/* Founder */}
      <section className="py-24 sm:py-32 px-6 sm:px-8">
        <div className="credit-animate max-w-3xl mx-auto text-center">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              }}
            >
              N
            </div>
          </div>

          {/* Decorative quote mark */}
          <div
            className="text-[120px] sm:text-[160px] leading-none font-serif select-none -mb-16 sm:-mb-20"
            style={{ color: "rgba(99, 102, 241, 0.15)" }}
          >
            &ldquo;
          </div>

          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light text-text leading-relaxed tracking-tight mb-8">
            The bottleneck was never intelligence. It was the missing layer
            between &lsquo;we want AI&rsquo; and &lsquo;AI is
            running.&rsquo; The window opened in 2026 — and we&apos;re
            building it now.
          </blockquote>

          {/* Gradient divider */}
          <div className="flex justify-center mb-8">
            <div
              className="h-0.5 w-8 rounded-full"
              style={{
                background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-lg sm:text-xl font-semibold text-text">
              Naman Jaiswal
            </div>
            <div className="text-sm sm:text-base text-text-muted">
              Founder, AgentLand
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-text-dim">
              <span>NIT Rourkela</span>
              <span className="w-1 h-1 rounded-full bg-text-dim" />
              <span>YC Startup School &apos;26</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h3 className="credit-animate text-2xl sm:text-3xl font-semibold text-text mb-10 text-center">
            Questions
          </h3>
          <div className="credit-animate">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5 overflow-hidden">
        {/* Meteor streaks */}
        <Meteors number={15} />

        {/* Animated gradient blobs */}
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #6366F1 0%, transparent 70%)",
            animation: "breathe 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            animation: "breathe 8s ease-in-out infinite 2s",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            className="credit-animate text-[40px] sm:text-[60px] md:text-[70px] lg:text-[80px] font-bold tracking-tighter leading-none mb-8"
            style={{
              background:
                "linear-gradient(135deg, #EDEDED 0%, #6366F1 50%, #22D3EE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your business.
            <br />
            Automated.
          </h2>
          <div className="credit-animate">
            <ShimmerButton
              className="mx-auto px-10 py-5 text-base font-semibold"
              shimmerColor="#ffffff"
              background="rgba(255, 255, 255, 1)"
              borderRadius="9999px"
              shimmerSize="0.05em"
            >
              <span className="flex items-center gap-2" style={{ color: "#09090B" }}>
                Start Your Free Audit
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
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 sm:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-text-dim">
            <span>&copy; 2026 AgentLand. All rights reserved.</span>
            <span className="w-1 h-1 rounded-full bg-text-dim" />
            <span>YC Startup School &apos;26</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-dim">
            <a
              href="#"
              className="hover:text-text-muted transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-text-muted transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:hello@agentland.ai"
              className="hover:text-text-muted transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
