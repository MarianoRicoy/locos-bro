import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SiteChrome } from "@/components/features/site-chrome";
import { siteConfig } from "@/lib/site-config";

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Light.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning className={`${satoshi.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
