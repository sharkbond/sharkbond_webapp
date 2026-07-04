import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shark Bond | India's Trusted Solvent Cement Manufacturer",
  description: "Premium PVC, UPVC & CPVC Solvent Cement by Chemseal Industries. Strong Bond. Lasting Trust.",
  keywords: ["Shark Bond", "Solvent Cement", "PVC", "UPVC", "CPVC", "Chemseal Industries", "Pipe Cement"],
  metadataBase: new URL("https://www.sharkbond.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Shark Bond | India's Trusted Solvent Cement Manufacturer",
    description: "Premium PVC, UPVC & CPVC Solvent Cement by Chemseal Industries. Strong Bond. Lasting Trust.",
    url: "https://www.sharkbond.com",
    siteName: "Shark Bond",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Shark Bond - India's Trusted Solvent Cement Manufacturer",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shark Bond | India's Trusted Solvent Cement Manufacturer",
    description: "Premium PVC, UPVC & CPVC Solvent Cement by Chemseal Industries. Strong Bond. Lasting Trust.",
    images: ["/assets/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GC8FC7C4VR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GC8FC7C4VR');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${inter.variable} font-body antialiased`}>
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
