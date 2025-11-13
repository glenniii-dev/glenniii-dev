import { Urbanist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Glenn Hensley III",
  description: "Portfolio website for Glenn Hensley III",
};

const urbanist = Urbanist({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const path = (await headers()).get("x-pathname") ?? "";
  const isAdmin = path.startsWith("/admin");
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <head>
        <meta name="apple-mobile-web-app-title" content="Glenn III" />
      </head>
      <body className={urbanist.className}>
        <Toaster />
        {/* Fixed gradient background at the top */}
        <div className="fixed top-0 left-0 right-0 h-[400px] bg-linear-to-b from-blue-500/30 to-transparent pointer-events-none -z-1"></div>

        {/* Grainy background */}
        <div className="fixed inset-0 bg-[url('/background.jpg')] bg-center opacity-4 -z-10"></div>
  
        <main className="flex-1 overflow-y-auto transition-all duration-300">{children}</main>
      </body>
    </html>
  );
}