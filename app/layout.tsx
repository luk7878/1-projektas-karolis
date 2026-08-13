import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lietuvos skeptiškas jaunimas — Mąstyk laisvai",
  description:
    "Kritinis mąstymas, neformalus ugdymas ir tarptautinės jaunimo iniciatyvos.",
  metadataBase: new URL("https://ay-institutas-jaunimui.lzaksas.chatgpt.site"),
  openGraph: {
    title: "Lietuvos skeptiškas jaunimas — Mąstyk laisvai",
    description:
      "Kritinis mąstymas, neformalus ugdymas ir tarptautinės jaunimo iniciatyvos.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 909,
        alt: "Klausk. Tyrinėk. Mąstyk laisvai.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt">
      <body className={`${geist.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
