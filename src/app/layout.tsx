import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TweetAlchemy – Tweet Enhancer & Optimizer",
  description:
    "Boost your Twitter presence with TweetAlchemy – the ultimate tweet enhancer and tweet optimizer. Fix grammar, add spacing, improve tone, and maximize engagement effortlessly.",
  keywords: [
    "tweet enhancer",
    "tweet optimizer",
    "optimize tweets",
    "Twitter growth",
    "tweet formatting",
    "social media optimizer",
    "tweet engagement",
    "AI tweet rewrite",
  ],
  openGraph: {
    title: "TweetAlchemy – Tweet Enhancer & Optimizer",
    description:
      "AI-powered tweet enhancer that optimizes grammar, tone, hashtags, and formatting for maximum Twitter engagement.",
    url: "https://tweetalchemy.vercel.app/", 
    siteName: "TweetAlchemy",
    images: [
      {
        url: "/PREVIEW-TWEETALCHEMY.png", // 
        width: 1200,
        height: 630,
        alt: "TweetAlchemy – AI Tweet Enhancer & Optimizer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TweetAlchemy – Tweet Enhancer & Optimizer",
    description:
      "Enhance your tweets with AI. Fix grammar, spacing, tone, hashtags, and boost Twitter engagement instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
