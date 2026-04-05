"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LenisProvider from "@/components/lenis-provider";
import SceneVoid from "@/components/scene-void";
import SceneGap from "@/components/scene-gap";
import SceneProblems from "@/components/scene-problems";
import SceneName from "@/components/scene-name";
import SceneWalkthrough from "@/components/scene-walkthrough";
import SceneInvitation from "@/components/scene-invitation";
import SceneCredits from "@/components/scene-credits";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <LenisProvider>
      <main>
        <SceneVoid />
        <SceneGap />
        <SceneProblems />
        <SceneName />
        <SceneWalkthrough />
        <SceneInvitation />
        <SceneCredits />
      </main>
    </LenisProvider>
  );
}
