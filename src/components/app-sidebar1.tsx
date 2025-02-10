"use client"

import Image from "next/image"
import * as React from "react"
import {
    Frame,
    HomeIcon,
    Map,
    PieChart,
    Settings,
    LogOut,
    Hospital,
    Briefcase,
    Pill,
} from "lucide-react"

import { NavSystem } from "@/components/nav-System"
import { NavUser } from "@/components/nav-user"
import { NavFunction } from "@/components/nav-function"
import { NavAdmin } from "@/components/nav-admin"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import logo from "@/assets/logo.png"

// This is sample data.
const data = {
    user: {
        name: "Admin",
        email: "Admin1@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    dashboard: [
        {
            name: "Dashboard",
            url: "#",
            icon: HomeIcon,
        }
    ],
    admin: [
        {
            name: "Dashboard",
            url: "/admin/homepage",
            icon: HomeIcon,
        },
        {
            name: "Chuyên khoa",
            url: "/admin/specialtiesManager",
            icon: Hospital,
        },
        {
            name: "Bác sĩ",
            url: "/admin/doctor",
            icon: PieChart,
        },
        {
            name: "Dịch vụ",
            url: "/admin/medicalService",
            icon: Briefcase,
        },
        {
            name: "Thuốc",
            url: "/admin/medicine",
            icon: Pill,
        },
        {
            name: "Cài đặt",
            url: "/doctor/setting",
            icon: Settings,
        },
        {
            name: "Đăng xuất",
            url: "/",
            icon: LogOut,
        },
    ],

}

export function AppSidebarAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Image
                src={logo}
                alt="ScheHealth Logo"
                width={150}
                height={40}
                priority
                className="p-5"
                />
            </SidebarHeader>
            <SidebarContent>
                <NavAdmin projects={data.admin} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
