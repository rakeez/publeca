import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Publeca — Promote, sell out, and run your events",
    template: "%s — Publeca",
  },
  description:
    "Publeca grows your event end to end — Meta & Google ads, creative, photography and videography, ticketing, and door check-in. Done for you, or self-serve with our platform.",
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
    title: "Publeca — Promote, sell out, and run your events",
    description:
      "Event marketing, ticketing and check-in for Sri Lanka — done for you, or self-serve.",
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
