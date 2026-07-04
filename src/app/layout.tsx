import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
