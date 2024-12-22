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
import SpecialtiesPage from './specialtiesManager/page';

export default function MainViewDoctor() {
    const router = useRouter();

    return (
        <div>
            {/* Header Section */}
            <header>
            </header>

            {/* Main Content */}
            <main>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <SpecialtiesPage />
                    </SidebarInset>
                </SidebarProvider>
            </main>

            {/* Footer */}
            <footer>
            </footer>
        </div>
    );
}



