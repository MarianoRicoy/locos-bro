import type { Metadata } from "next";
import { ABeeZee, Poppins } from "next/font/google";
import "./globals.css";

import { SiteChrome } from "@/components/features/site-chrome";
import { siteConfig } from "@/lib/site-config";

// Texto corrido, botones y h1: Poppins (varios pesos).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Títulos h2–h4: ABeeZee (solo existe en peso 400).
const abeezee = ABeeZee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abeezee",
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
    <html lang="es-AR" suppressHydrationWarning className={`${poppins.variable} ${abeezee.variable} h-full bg-black antialiased`}>
      <body className="flex min-h-full flex-col bg-black font-sans text-white antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
