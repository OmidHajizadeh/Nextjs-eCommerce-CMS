import "./globals.css";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import ToastProvider from "@/lib/ToastProvider";
import MaterialThemeProvider from "@/lib/Material/MaterialProvider";
import RTLCacheProvider from "@/lib/Material/RTL";

export const metadata = {
  title: "داشبورد",
  description: "Ayrin Admin",
};

const mainFont = localFont({
  src: [
    {
      path: "../fonts/yekanBakh/YekanBakh-Thin.woff2",
      weight: "100",
    },
    {
      path: "../fonts/yekanBakh/YekanBakh-Light.woff2",
      weight: "300",
    },
    {
      path: "../fonts/yekanBakh/YekanBakh-Regular.woff2",
      weight: "normal",
    },
    {
      path: "../fonts/yekanBakh/YekanBakh-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../fonts/yekanBakh/YekanBakh-Bold.woff2",
      weight: "bold",
    },
    {
      path: "../fonts/yekanBakh/YekanBakh-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../fonts/yekanBakh/YekanBakh-Black.woff2",
      weight: "900",
    },
    {
      path: "../fonts/yekanBakh/YekanBakh-ExtraBlack.woff2",
      weight: "950",
    },
  ],
  variable: "--font-main",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <MaterialThemeProvider>
        <RTLCacheProvider>
          <html lang="fa" dir="rtl">
            <body className={`${mainFont.variable} !font-main`}>
              <ToastProvider />
              {children}
            </body>
          </html>
        </RTLCacheProvider>
      </MaterialThemeProvider>
    </ClerkProvider>
  );
}
