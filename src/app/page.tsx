"use client";

import dynamic from "next/dynamic";
import LenisProvider from "@/components/lenis-provider";
import CursorSpotlight from "@/components/cursor-spotlight";

const SceneVoid = dynamic(() => import("@/components/scene-void"), {
  ssr: false,
});
const SceneGap = dynamic(() => import("@/components/scene-gap"), {
  ssr: false,
});
const SceneProblems = dynamic(() => import("@/components/scene-problems"), {
  ssr: false,
});
const SceneName = dynamic(() => import("@/components/scene-name"), {
  ssr: false,
});
const SceneWalkthrough = dynamic(
  () => import("@/components/scene-walkthrough"),
  { ssr: false }
);
const SceneInvitation = dynamic(
  () => import("@/components/scene-invitation"),
  { ssr: false }
);
const SceneCredits = dynamic(() => import("@/components/scene-credits"), {
  ssr: false,
});

export default function Home() {
  return (
    <LenisProvider>
      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* Scenes */}
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
