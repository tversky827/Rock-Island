import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, sans } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site, SITE_URL } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} | Skilled Nursing & Rehabilitation in Rock Island, IL`, template: `%s | ${site.name}` },
  description:
    "Rock Island Nursing Home offers compassionate skilled nursing, short-term rehabilitation, and long-term care in Rock Island, Illinois, serving families throughout the Quad Cities.",
  applicationName: site.name,
  formatDetection: { telephone: false },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  robots: process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#0f2138", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="pb-14 lg:pb-0">
        <a href="#main" className="sr-only z-[60] bg-navy-900 px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <PreviewBanner />
        <Footer />
        <MobileCtaBar />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}
