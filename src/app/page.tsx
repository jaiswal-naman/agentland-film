"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LenisProvider from "@/components/lenis-provider";
import Nav from "@/components/nav";
import ScrollProgress from "@/components/scroll-progress";
import CustomCursor from "@/components/custom-cursor";
import SceneVoid from "@/components/scene-void";
import SceneGap from "@/components/scene-gap";
import SceneProblems from "@/components/scene-problems";
import SceneName from "@/components/scene-name";
import SceneWalkthrough from "@/components/scene-walkthrough";
import SceneInvitation from "@/components/scene-invitation";
import SceneCredits from "@/components/scene-credits";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LenisProvider>
      <Nav />
      <ScrollProgress />
      <CustomCursor />
      <div
        className={
          entered
            ? "opacity-100 transition-opacity duration-700"
            : "opacity-0"
        }
      >
        <main>
          <SceneVoid />
          <SceneGap />
          <SceneProblems />
          <SceneName />
          <SceneWalkthrough />
          <SceneInvitation />
          <SceneCredits />
        </main>
      </div>
    </LenisProvider>
  );
}
