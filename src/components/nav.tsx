"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-4"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <span className="pl-8 text-[14px] font-bold text-[#E8E8E8] tracking-tight">
        AgentLand
      </span>
      <a
        href="#"
        className="pr-8 text-[13px] text-[#888] hover:text-[#E8E8E8] transition-colors duration-200"
      >
        Get Audit &rarr;
      </a>
    </nav>
  );
}
