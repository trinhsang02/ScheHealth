'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
export default function MainViewPatient() {
    const router = useRouter();

    return (
        <div>
            {/* Header Section */}
            <header>
            </header>

            {/* Main Content */}
            <main>

            </main>

            {/* Footer */}
            <footer>
            </footer>
        </div>
    );
}


