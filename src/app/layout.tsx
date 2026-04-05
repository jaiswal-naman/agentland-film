import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AgentLand - Your Business. Automated.",
  description:
    "Connect your tools. Discover automation opportunities. Deploy AI agents. Monitor everything. AgentLand is the platform that makes AI adoption inevitable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", spaceGrotesk.className, "font-sans", geist.variable)}>
      <body className="min-h-screen bg-base text-text">{children}</body>
    </html>
  );
}
