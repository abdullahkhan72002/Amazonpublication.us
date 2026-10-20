import type { Metadata } from "next";
import { Suspense } from "react";
import { Rubik, Syne } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LeadPopup from "@/components/layout/LeadPopup";
import TrackingCapture from "@/components/layout/TrackingCapture";
import ZendeskWidget from "@/components/layout/ZendeskWidget";
import { footerContent, headerContent, site } from "@/data/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} | Expert Book Publishing Services`,
  description:
    "Publish your book on Amazon with expert editing, cover design, formatting, printing, and marketing support from Amazon Publication.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${rubik.variable} h-full antialiased`}
    >
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WKCT7C76');`}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKCT7C76"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Suspense fallback={null}>
          <TrackingCapture />
        </Suspense>
        <Header {...headerContent} />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer {...footerContent} />
        <LeadPopup />
        <ZendeskWidget />
      </body>
    </html>
  );
}
