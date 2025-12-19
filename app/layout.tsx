import type React from "react";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Naskh_Arabic,
  Amiri_Quran,
  Amiri,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import MidnightReset from "@/components/midnight-reset";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar",
});

export const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri-quran",
});

export const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "Athkar - أذكار المسلم",
  description: "Islamic remembrances and supplications - أذكار وأدعية من الكتاب والسنة",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${notoNaskhArabic.variable} ${amiriQuran.variable} ${amiri.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>
            {/* ✅ Auto reset counters/progress at local midnight (00:00) */}
            <MidnightReset
              progressKey="athkar-progress"
              lastResetKey="athkar_last_reset"
              reloadAfterReset={true}
            />

            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
