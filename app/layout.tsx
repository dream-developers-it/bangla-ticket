import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamdrawbd.com'),
  title: {
    default: "DreamDraw BD - Bangladesh's Premier Lottery Platform",
    template: "%s | DreamDraw BD"
  },
  description: "Official DreamDraw BD platform. Buy lottery tickets online and win amazing prizes daily. Safe, secure, and instant ticket delivery in Bangladesh.",
  keywords: ["lottery", "bangladesh lottery", "dreamdraw bd", "online lottery", "bangladesh lottery", "win prizes", "daily draw"],
  authors: [{ name: "DreamDraw BD" }],
  creator: "DreamDraw BD",
  publisher: "DreamDraw BD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DreamDraw BD - Bangladesh's Premier Lottery Platform",
    description: "Buy lottery tickets online and win big prizes daily. Safe and secure platform.",
    url: 'https://dreamdrawbd.com',
    siteName: 'DreamDraw BD',
    images: [
      {
        url: 'https://dreamdrawbd.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamDraw BD - Official Lottery Platform',
    description: 'Buy lottery tickets online and win big prizes daily. Safe and secure platform.',
    images: ['https://dreamdrawbd.com/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://dreamdrawbd.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
