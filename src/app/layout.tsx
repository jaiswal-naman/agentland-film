import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "@/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgentLand — Your Business. Automated.",
  description:
    "Connect your tools. Discover automation opportunities. Deploy AI agents. Monitor everything.",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen bg-[#050507] text-[#E8E8E8] font-[family-name:var(--font-display)]">
        {/* Film grain — the ONLY texture */}
        <div className="film-grain" />
        {children}
      </body>
    </html>
  );
}
