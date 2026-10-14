import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Publeca — Growth Consulting Firm | Marketing, Management & Events",
    template: "%s — Publeca",
  },
  description:
    "Publeca is a growth consulting firm with its own marketing, engineering and analytics teams — we find where your next growth comes from, then build it. Events too.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  manifest: "/manifest.webmanifest",
  icons: { icon: "/publeca-icon.png", apple: "/publeca-icon.png" },
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "Publeca",
    locale: "en_US",
    images: [{ url: "/publeca-icon.png", width: 512, height: 512, alt: "Publeca" }],
  },
  twitter: {
    card: "summary",
    title: "Publeca — Growth Consulting Firm",
    description:
      "Strategy and execution from one firm: growth consulting, marketing, engineering, analytics and AI — plus our events arm.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff0066",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
