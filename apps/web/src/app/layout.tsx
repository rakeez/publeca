import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Publeca — Sell tickets, host events, get paid",
  description:
    "Publeca is the event booking platform for hosts in Sri Lanka and beyond. Custom landing pages, local payments and BNPL, QR tickets, and built-in ad conversion tracking.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
