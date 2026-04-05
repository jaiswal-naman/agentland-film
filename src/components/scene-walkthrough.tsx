"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  CONNECT phase: animated grid of integration squares               */
/* ------------------------------------------------------------------ */
function ConnectVisual() {
  const icons = Array.from({ length: 12 }, (_, i) => {
    const colors = [
      "#6366F1",
      "#818CF8",
      "#A78BFA",
      "#8B5CF6",
      "#6366F1",
      "#10B981",
      "#F59E0B",
      "#EC4899",
      "#06B6D4",
      "#F97316",
      "#6366F1",
      "#818CF8",
    ];
    return (
      <div
        key={i}
        className="connect-icon w-10 h-10 sm:w-12 sm:h-12 rounded-lg opacity-0"
        style={{
          background: colors[i],
          boxShadow: `0 0 20px ${colors[i]}40`,
        }}
      />
    );
  });

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-sm mx-auto mt-8">
      {icons}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DISCOVER phase: animated scan line                                */
/* ------------------------------------------------------------------ */
function DiscoverVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8 h-32 sm:h-40 overflow-hidden rounded-xl border border-white/5 bg-surface">
      {/* Scan line */}
      <div
        className="scan-line absolute top-0 left-0 w-full h-[2px] opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
          boxShadow: "0 0 20px #8B5CF680",
        }}
      />
      {/* Result rows */}
      {[
        { label: "Invoice processing", roi: "340% ROI", delay: 0 },
        { label: "Customer onboarding", roi: "280% ROI", delay: 1 },
        { label: "Report generation", roi: "210% ROI", delay: 2 },
      ].map((item, i) => (
        <div
          key={i}
          className={`discover-row opacity-0 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/5`}
        >
          <span className="text-sm sm:text-base text-text-muted">
            {item.label}
          </span>
          <span className="text-sm sm:text-base font-medium text-violet">
            {item.roi}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DEPLOY phase: terminal animation                                  */
/* ------------------------------------------------------------------ */
function DeployVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8 rounded-xl border border-white/5 bg-surface overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-xs text-text-dim font-mono">terminal</span>
      </div>
      {/* Terminal lines */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2">
        <div className="terminal-line-1 opacity-0">
          <span className="text-emerald">$</span>{" "}
          <span className="text-text-muted">agentland deploy --agent invoice-processor</span>
        </div>
        <div className="terminal-line-2 opacity-0">
          <span className="text-text-dim">Building agent...</span>
        </div>
        <div className="terminal-line-3 opacity-0">
          <span className="text-text-dim">Running checks...</span>
        </div>
        <div className="terminal-line-4 opacity-0">
          <span className="text-emerald">
            Deployed successfully.
          </span>{" "}
          <span className="text-text-dim">Live in 4.2s</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MONITOR phase: mini dashboard                                     */
/* ------------------------------------------------------------------ */
function MonitorVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8 rounded-xl border border-white/5 bg-surface overflow-hidden p-4 sm:p-6">
      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {[
          { label: "Agents", value: "12", color: "#F59E0B" },
          { label: "Executions", value: "8.4K", color: "#F59E0B" },
          { label: "Uptime", value: "99.9%", color: "#10B981" },
        ].map((m, i) => (
          <div
            key={i}
            className={`monitor-metric opacity-0 text-center p-2 sm:p-3 rounded-lg bg-base`}
          >
            <div
              className="text-lg sm:text-2xl font-bold"
              style={{ color: m.color }}
            >
              {m.value}
            </div>
            <div className="text-xs text-text-dim mt-1">{m.label}</div>
          </div>
        ))}
      </div>
      {/* Mini chart (CSS bars) */}
      <div className="monitor-chart opacity-0 flex items-end gap-1 h-16 sm:h-20">
        {[40, 65, 50, 80, 70, 90, 85, 75, 95, 88, 92, 78].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, #F59E0B40, #F59E0B)`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Walkthrough Scene                                            */
/* ------------------------------------------------------------------ */
const phases = [
  {
    key: "connect",
    title: "Connect",
    glowClass: "text-glow",
    titleColor: "#6366F1",
    subtitle: "100+ integrations. Set up in minutes.",
    Visual: ConnectVisual,
  },
  {
    key: "discover",
    title: "Discover",
    glowClass: "text-glow-violet",
    titleColor: "#8B5CF6",
    subtitle: "AI finds every automation opportunity. Ranked by ROI.",
    Visual: DiscoverVisual,
  },
  {
    key: "deploy",
    title: "Deploy",
    glowClass: "text-glow-emerald",
    titleColor: "#10B981",
    subtitle: "One click. It's live.",
    Visual: DeployVisual,
  },
  {
    key: "monitor",
    title: "Monitor",
    glowClass: "text-glow-amber",
    titleColor: "#F59E0B",
    subtitle: "Every agent. Every execution. Full visibility.",
    Visual: MonitorVisual,
  },
];

export default function SceneWalkthrough() {
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

      const phaseEls = pinned.querySelectorAll(".wt-phase");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      const perPhase = 1 / phases.length;

      phaseEls.forEach((phaseEl, i) => {
        const start = i * perPhase;
        const title = phaseEl.querySelector(".wt-title");
        const subtitle = phaseEl.querySelector(".wt-subtitle");
        const visual = phaseEl.querySelector(".wt-visual");

        // Appear
        tl.fromTo(
          phaseEl,
          { opacity: 0, display: "none" },
          {
            opacity: 1,
            display: "flex",
            duration: 0.001,
            ease: "none",
          },
          start
        );

        // Title animate in
        tl.fromTo(
          title,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: perPhase * 0.15,
            ease: "power2.out",
          },
          start
        );

        // Visual elements
        if (i === 0) {
          // Connect: icons appear
          const icons = phaseEl.querySelectorAll(".connect-icon");
          tl.fromTo(
            icons,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              stagger: 0.01,
              duration: perPhase * 0.2,
              ease: "back.out(1.4)",
            },
            start + perPhase * 0.15
          );
        } else if (i === 1) {
          // Discover: scan line + rows
          const scanLine = phaseEl.querySelector(".scan-line");
          const rows = phaseEl.querySelectorAll(".discover-row");
          tl.fromTo(
            scanLine,
            { opacity: 0, y: 0 },
            {
              opacity: 1,
              y: 120,
              duration: perPhase * 0.2,
              ease: "none",
            },
            start + perPhase * 0.12
          );
          tl.fromTo(
            rows,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.02,
              duration: perPhase * 0.12,
              ease: "power2.out",
            },
            start + perPhase * 0.2
          );
        } else if (i === 2) {
          // Deploy: terminal lines
          const lines = phaseEl.querySelectorAll(
            '[class*="terminal-line"]'
          );
          lines.forEach((line, li) => {
            tl.fromTo(
              line,
              { opacity: 0 },
              {
                opacity: 1,
                duration: perPhase * 0.06,
                ease: "none",
              },
              start + perPhase * (0.15 + li * 0.07)
            );
          });
        } else if (i === 3) {
          // Monitor: metrics + chart
          const metrics = phaseEl.querySelectorAll(".monitor-metric");
          const chart = phaseEl.querySelector(".monitor-chart");
          tl.fromTo(
            metrics,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.015,
              duration: perPhase * 0.12,
              ease: "power2.out",
            },
            start + perPhase * 0.15
          );
          tl.fromTo(
            chart,
            { opacity: 0 },
            {
              opacity: 1,
              duration: perPhase * 0.1,
              ease: "power2.out",
            },
            start + perPhase * 0.3
          );
        }

        // Subtitle
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: perPhase * 0.1,
            ease: "power2.out",
          },
          start + perPhase * 0.2
        );

        // Visual container
        tl.fromTo(
          visual,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: perPhase * 0.12,
            ease: "power2.out",
          },
          start + perPhase * 0.15
        );

        // Hold
        tl.to({}, { duration: perPhase * 0.25 }, start + perPhase * 0.45);

        // Fade out
        tl.to(
          phaseEl,
          {
            opacity: 0,
            duration: perPhase * 0.15,
            ease: "power2.in",
          },
          start + perPhase * 0.75
        );

        // Then hide
        tl.set(phaseEl, { display: "none" }, start + perPhase * 0.95);
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full flex items-center justify-center bg-base overflow-hidden"
      >
        {phases.map((phase, i) => (
          <div
            key={phase.key}
            className="wt-phase absolute inset-0 flex-col items-center justify-center px-6 sm:px-8 opacity-0"
            style={{ display: "none" }}
          >
            {/* Phase title */}
            <h2
              className={`wt-title text-[50px] sm:text-[60px] md:text-[70px] lg:text-[80px] font-bold tracking-tighter leading-none ${phase.glowClass} opacity-0`}
              style={{ color: phase.titleColor }}
            >
              {phase.title}
            </h2>

            {/* Subtitle */}
            <p className="wt-subtitle text-lg sm:text-xl text-text-muted mt-4 sm:mt-6 text-center max-w-lg opacity-0">
              {phase.subtitle}
            </p>

            {/* Visual */}
            <div className="wt-visual opacity-0 w-full">
              <phase.Visual />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
