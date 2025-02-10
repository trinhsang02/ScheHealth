"use client"

import * as React from "react"
import Link from "next/link"
import {
  HomeIcon,
  CalendarCheck,
  Settings,
  LogOut,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Dữ liệu menu
const data = {
  user: {
    name: "Bs. Nguyễn Văn A",
    email: "Dr.ANguyen@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  coreFeatures: [
    { name: "Trang chủ", url: "/doctor/homepage", icon: HomeIcon },
    { name: "Danh sách lịch hẹn", url: "/doctor/Patientlist", icon: CalendarCheck },
    { name: "Cài đặt", url: "/doctor/setting", icon: Settings },
    { name: "Đăng xuất", url: "/", icon: LogOut },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <span className="text-xl font-bold p-1">ScheHealth</span>
      </SidebarHeader>

      <SidebarContent>
        {data.coreFeatures.map((item) => (
          <Link key={item.url} href={item.url}>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition ${
                selectedItem === item.url ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedItem(item.url)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
