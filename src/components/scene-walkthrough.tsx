"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  CONNECT phase: branded app icons with center AgentLand hub        */
/* ------------------------------------------------------------------ */
const brandIcons = [
  { letter: "S", name: "Salesforce", color: "#00A1E0" },
  { letter: "H", name: "HubSpot", color: "#FF7A59" },
  { letter: "Sl", name: "Slack", color: "#4A154B" },
  { letter: "J", name: "Jira", color: "#0052CC" },
  { letter: "G", name: "Gmail", color: "#EA4335" },
  { letter: "N", name: "Notion", color: "#191919" },
  { letter: "St", name: "Stripe", color: "#635BFF" },
  { letter: "Li", name: "Linear", color: "#5E6AD2" },
];

function ConnectVisual() {
  return (
    <div className="relative flex items-center justify-center mt-8">
      {/* Rotating dashed connection ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          border: "1.5px dashed rgba(99,102,241,0.25)",
          animation: "spinSlow 30s linear infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          border: "1px dashed rgba(99,102,241,0.15)",
          animation: "spinSlow 20s linear infinite reverse",
        }}
      />

      {/* Brand icons arranged in a circle */}
      <div className="relative" style={{ width: 260, height: 260 }}>
        {brandIcons.map((brand, i) => {
          const angle = (i / brandIcons.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 115;
          const x = Math.cos(angle) * radius + 130 - 22;
          const y = Math.sin(angle) * radius + 130 - 22;
          return (
            <div
              key={brand.name}
              className="connect-icon absolute flex items-center justify-center rounded-xl opacity-0"
              style={{
                width: 44,
                height: 44,
                left: x,
                top: y,
                background: brand.color,
                boxShadow: `0 0 20px ${brand.color}50, 0 0 40px ${brand.color}20`,
              }}
            >
              <span className="text-white font-bold text-sm select-none">
                {brand.letter}
              </span>
            </div>
          );
        })}

        {/* Center hub — AgentLand "A" */}
        <div
          className="connect-icon absolute flex items-center justify-center rounded-full opacity-0"
          style={{
            width: 64,
            height: 64,
            left: 130 - 32,
            top: 130 - 32,
            background:
              "radial-gradient(circle, #818CF8 0%, #6366F1 60%, #4F46E5 100%)",
            boxShadow:
              "0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.2), inset 0 1px 1px rgba(255,255,255,0.2)",
            animation: "pulseGlow 3s ease-in-out infinite",
          }}
        >
          <span className="text-white font-bold text-2xl select-none">A</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DISCOVER phase: scan with progress bar + glowing rows             */
/* ------------------------------------------------------------------ */
function DiscoverVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8 overflow-hidden rounded-xl border border-white/5 bg-surface">
      {/* Progress bar at top */}
      <div className="relative h-1 w-full bg-white/5">
        <div
          className="discover-progress absolute top-0 left-0 h-full"
          style={{
            width: 0,
            background:
              "linear-gradient(90deg, #6366F1, #8B5CF6, #A78BFA)",
            boxShadow: "0 0 10px rgba(139,92,246,0.5)",
          }}
        />
      </div>

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
        { label: "Invoice processing", roi: "340%", roiColor: "#10B981" },
        { label: "Customer onboarding", roi: "280%", roiColor: "#8B5CF6" },
        { label: "Report generation", roi: "210%", roiColor: "#6366F1" },
      ].map((item, i) => (
        <div
          key={i}
          className="discover-row opacity-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/5 relative"
        >
          {/* Row glow effect */}
          <div
            className="absolute inset-0 opacity-0 discover-row-glow"
            style={{
              background: `linear-gradient(90deg, transparent, ${item.roiColor}08, transparent)`,
            }}
          />
          <span className="text-sm sm:text-base text-text-muted relative z-10">
            {item.label}
          </span>
          {/* ROI badge */}
          <span
            className="relative z-10 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full"
            style={{
              color: item.roiColor,
              background: `${item.roiColor}15`,
              border: `1px solid ${item.roiColor}30`,
              boxShadow: `0 0 12px ${item.roiColor}20`,
            }}
          >
            {item.roi} ROI
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DEPLOY phase: terminal with blinking cursor + green glow          */
/* ------------------------------------------------------------------ */
function DeployVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8 rounded-xl border border-white/5 bg-surface overflow-hidden">
      {/* Terminal header — macOS dots */}
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
          <span className="text-text-muted">
            agentland deploy --agent invoice-processor
          </span>
        </div>
        <div className="terminal-line-2 opacity-0">
          <span className="text-text-dim">Building agent...</span>
        </div>
        <div className="terminal-line-3 opacity-0">
          <span className="text-text-dim">Running checks...</span>
        </div>
        <div className="terminal-line-4 opacity-0 relative">
          {/* Green glow behind success line */}
          <div
            className="deploy-success-glow absolute -inset-x-2 -inset-y-1 rounded opacity-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.15) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          <span className="text-emerald relative z-10">
            Deployed successfully.
          </span>{" "}
          <span className="text-text-dim relative z-10">Live in 4.2s</span>
          {/* Blinking cursor */}
          <span
            className="terminal-cursor inline-block cursor-blink relative z-10"
            style={{
              width: 7,
              height: 14,
              background: "#10B981",
              boxShadow: "0 0 6px rgba(16,185,129,0.5)",
              marginLeft: 6,
              verticalAlign: "middle",
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MONITOR phase: dashboard with gradient bars + LIVE indicator       */
/* ------------------------------------------------------------------ */
function MonitorVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8 rounded-xl border border-white/5 bg-surface overflow-hidden p-4 sm:p-6">
      {/* LIVE indicator */}
      <div className="flex items-center justify-end gap-2 mb-3">
        <div
          className="monitor-live opacity-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: "#10B981",
              boxShadow: "0 0 6px rgba(16,185,129,0.6)",
              animation: "livePulse 2s ease-in-out infinite",
            }}
          />
          <span
            className="text-[10px] font-bold tracking-wider"
            style={{ color: "#10B981" }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {[
          {
            label: "Agents",
            value: "12",
            gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)",
          },
          {
            label: "Executions",
            value: "8.4K",
            gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
          },
          {
            label: "Uptime",
            value: "99.9%",
            gradient: "linear-gradient(135deg, #10B981, #34D399)",
          },
        ].map((m, i) => (
          <div
            key={i}
            className="monitor-metric opacity-0 text-center p-2 sm:p-3 rounded-lg bg-base"
          >
            <div
              className="text-2xl sm:text-3xl font-bold"
              style={{
                background: m.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {m.value}
            </div>
            <div className="text-xs text-text-dim mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Mini chart with gradient glow bars */}
      <div className="monitor-chart opacity-0 flex items-end gap-1 h-16 sm:h-20">
        {[40, 65, 50, 80, 70, 90, 85, 75, 95, 88, 92, 78].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t relative"
            style={{
              height: `${h}%`,
            }}
          >
            {/* Bar with gradient */}
            <div
              className="absolute inset-0 rounded-t"
              style={{
                background: `linear-gradient(to top, #F59E0B30, #F59E0B)`,
              }}
            />
            {/* Glow on top */}
            <div
              className="absolute top-0 left-0 right-0 h-2 rounded-t"
              style={{
                background: "#F59E0B",
                boxShadow:
                  "0 -4px 12px rgba(245,158,11,0.4), 0 -2px 6px rgba(245,158,11,0.6)",
                filter: "blur(1px)",
              }}
            />
          </div>
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

        // Visual elements per phase
        if (i === 0) {
          // Connect: icons pop in with bounce
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
          // Discover: progress bar + scan line + rows + row glows
          const progressBar = phaseEl.querySelector(".discover-progress");
          const scanLine = phaseEl.querySelector(".scan-line");
          const rows = phaseEl.querySelectorAll(".discover-row");
          const rowGlows = phaseEl.querySelectorAll(".discover-row-glow");

          // Progress bar fills
          tl.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: "100%",
              duration: perPhase * 0.35,
              ease: "none",
            },
            start + perPhase * 0.1
          );

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
          // Row glows appear after rows
          tl.fromTo(
            rowGlows,
            { opacity: 0 },
            {
              opacity: 1,
              stagger: 0.015,
              duration: perPhase * 0.08,
              ease: "power2.out",
            },
            start + perPhase * 0.3
          );
        } else if (i === 2) {
          // Deploy: terminal lines + success glow + cursor
          const lines = phaseEl.querySelectorAll(
            '[class*="terminal-line"]'
          );
          const successGlow = phaseEl.querySelector(".deploy-success-glow");
          const termCursor = phaseEl.querySelector(".terminal-cursor");

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

          // Green glow on success line
          if (successGlow) {
            tl.fromTo(
              successGlow,
              { opacity: 0 },
              {
                opacity: 1,
                duration: perPhase * 0.08,
                ease: "power2.out",
              },
              start + perPhase * 0.42
            );
          }

          // Terminal cursor appears after last line
          if (termCursor) {
            tl.fromTo(
              termCursor,
              { opacity: 0 },
              {
                opacity: 1,
                duration: perPhase * 0.03,
                ease: "none",
              },
              start + perPhase * 0.45
            );
          }
        } else if (i === 3) {
          // Monitor: live indicator + metrics + chart
          const liveIndicator = phaseEl.querySelector(".monitor-live");
          const metrics = phaseEl.querySelectorAll(".monitor-metric");
          const chart = phaseEl.querySelector(".monitor-chart");

          if (liveIndicator) {
            tl.fromTo(
              liveIndicator,
              { opacity: 0 },
              {
                opacity: 1,
                duration: perPhase * 0.08,
                ease: "power2.out",
              },
              start + perPhase * 0.12
            );
          }
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
        {phases.map((phase) => (
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
