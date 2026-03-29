import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { AuthProvider } from "@/lib/firebase/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Explainify | Understand Anything Instantly",
  description:
    "Paste any complex text and get a simple, child-friendly explanation powered by AI. Free to start today.",
  keywords: ["ELI5", "explain", "AI", "simplify", "learning", "education"],
  openGraph: {
    title: "Explainify | Understand Anything Instantly",
    description: "Explain complex topics in the simplest way possible — powered by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <body className={`flex flex-col min-h-full ${inter.className}`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

