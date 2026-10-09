import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Suspense } from "react";
import SiteFooter from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteHeaderFallback } from "@/components/site-header-fallback";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eyad Lazkani | Data Engineering Student & Software Developer",
  description:
    "Eyad Lazkani is a Data Engineering student at OsloMet and software developer building web products and real-world software.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          className="fixed top-2 left-2 z-20 -translate-y-[150%] bg-foreground px-3 py-2 text-white focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
