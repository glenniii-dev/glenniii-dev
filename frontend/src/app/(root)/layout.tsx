import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Glenn Hensley III",
  description: "Portfolio website for Glenn Hensley III",
};

const urbanist = Urbanist({subsets: ["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={urbanist.className}>
        {/* Fixed gradient background at the top */}
        <div className="fixed top-0 left-0 right-0 h-[400px] bg-linear-to-b from-blue-500/30 to-transparent pointer-events-none z-0"></div>

        {/* Grainy background */}
        <div className="fixed inset-0 bg-[url('/background.jpg')] bg-center opacity-4 -z-10"></div>

        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

