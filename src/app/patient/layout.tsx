"use client";

import localFont from "next/font/local";
import { NavMenu } from "@/components/NavMenu/NavMenu";
import { useEffect, useState } from "react";

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
  role,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <header>{hasToken && <NavMenu role={role} />}</header>
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
