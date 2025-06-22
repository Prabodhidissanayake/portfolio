import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prabodhi Dissanayake - Frontend Developer Portfolio",
  description:
    "Creative Frontend Developer focused on building clean and interactive user experiences. Specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "frontend developer",
    "react",
    "nextjs",
    "typescript",
    "web development",
    "HTML5",
    "CSS3",
    "JavaScript",
    "Redux",
    "Tailwind",
    "REST",
  ],
  authors: [{ name: "Prabodhi Dissanayake" }],
  creator: "Prabodhi Dissanayake",
  openGraph: {
    title: "Prabodhi Dissanayake - Frontend Developer",
    description:
      "Creative Frontend Developer focused on building clean and interactive user experiences.",
    url: "", //Todo: replace website url after we deploy it
    siteName: "Prabodhi Dissanayake Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prabodhi Dissanayake - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabodhi Dissanayake - Frontend Developer",
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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
