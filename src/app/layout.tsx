import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavMenu } from "@/components/NavMenu/NavMenu";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


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

export const metadata: Metadata = {
  title: "ScheHealth",
  description: "Scheduling your health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  role: string;
}>) {
  return (
    <html lang="en">

      {/* Layout for all childrens in app folder */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
