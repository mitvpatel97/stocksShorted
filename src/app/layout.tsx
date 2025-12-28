import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Short Interest Tracker | Top 25 Most Shorted Stocks",
  description: "Track the top 25 most shorted stocks in the stock market. Real-time short float, short interest, and days to cover data.",
  keywords: ["short interest", "short float", "shorted stocks", "stock market", "trading", "investing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-zinc-950 text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
