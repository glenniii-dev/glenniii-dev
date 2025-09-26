import type { Metadata } from "next";
import "../globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from "next/head";
config.autoAddCss = false

export const metadata: Metadata = {
  title: "Glenn Hensley III",
  description: "Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-title" content="Glenn" />
      </Head>
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
