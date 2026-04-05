import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "@/app/globals.css";

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
    <html lang="en" className={`${spaceGrotesk.className} antialiased`}>
      <body className="min-h-screen bg-base text-text">{children}</body>
    </html>
  );
}
