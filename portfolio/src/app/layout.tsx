import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Johnson - Frontend Developer Portfolio",
  description:
    "Creative Frontend Developer focused on building clean and interactive user experiences. Specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "frontend developer",
    "react",
    "nextjs",
    "typescript",
    "web development",
  ],
  authors: [{ name: "Alex Johnson" }],
  creator: "Alex Johnson",
  openGraph: {
    title: "Alex Johnson - Frontend Developer",
    description:
      "Creative Frontend Developer focused on building clean and interactive user experiences.",
    url: "https://yourportfolio.com",
    siteName: "Alex Johnson Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alex Johnson - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Johnson - Frontend Developer",
    description:
      "Creative Frontend Developer focused on building clean and interactive user experiences.",
    images: ["/og-image.jpg"],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
