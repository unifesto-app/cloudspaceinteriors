import type { Metadata } from "next";
import { Gloock, Kalam, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", subsets: ["latin"], weight: "400" });
const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"] });
// Hand-lettered tags; Kalam is by the Indian Type Foundry.
const kalam = Kalam({ variable: "--font-kalam", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: { default: "Cloud Space Interiors — designs that speak, spaces that transform", template: "%s · Cloud Space Interiors" },
  description: "End-to-end interiors for homes and businesses in Hyderabad. Kitchens, wardrobes, TV units, ceilings and complete interiors with premium finishes, designed and built by one team.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${gloock.variable} ${schibsted.variable} ${kalam.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
