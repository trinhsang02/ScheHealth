"use client";

import localFont from "next/font/local";
import "./globals.css";
import { NavMenu } from "@/components/NavMenu/NavMenu";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Providers } from "@/store/provider";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
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
  }, []);

  return (
    <html lang="en">
      {/* Layout for all childrens in app folder */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <header>{hasToken && <NavMenu />}</header>
          <main className="flex-1 overflow-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
