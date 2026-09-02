import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSA Java Judge — Learn DSA from A to Z",
  description:
    "A complete DSA learning ecosystem combining Striver A2Z structure, LeetCode-style coding, interactive learning, and local progress tracking.",
  keywords: [
    "DSA",
    "Java",
    "Data Structures",
    "Algorithms",
    "LeetCode",
    "Striver A2Z",
    "Coding Interview",
    "Programming",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
