"use client"

import type { Metadata } from "next";
import localFont from "next/font/local";
import { NavMenu } from "@/components/NavMenu/NavMenu";
import { useEffect, useState } from "react";
import { metadata } from './metadata';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  role: string;
}>) {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setHasToken(!!token);
  }, [])

  return (
    <html lang="en">

      {/* Layout for all childrens in app folder */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
        {hasToken && <NavMenu/>}
        </header> 
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
