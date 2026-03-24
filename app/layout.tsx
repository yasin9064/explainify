import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Explainify | Understand Anything Instantly",
  description:
    "Paste any complex text and get a simple, child-friendly explanation powered by AI. Free to start — no signup required.",
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
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
