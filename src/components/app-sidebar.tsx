"use client"

import * as React from "react"
import {
  Frame,
  HomeIcon,
  Map,
  PieChart,
  Settings,
  LogOut,
  Hospital,
  User,
  CalendarCheck,
  List,
  Briefcase,
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


// This is sample data.
const data = {
  user: {
    name: "Bs. Nguyễn Văn A",
    email: "Dr.ANguyen@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  dashboard: [
  {
    name: "Dashboard",
    url: "#",
    icon: HomeIcon,
  }
],

  system: [
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

  admin: [
    {
      name: "Chuyên khoa",
      url: "/doctor/specialtiesManager",
      icon: Hospital,
    },
    {
      name: "Bác sĩ",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Bệnh nhân",
      url: "#",
      icon: User,
    },
    {
      name: "Dịch vụ",
      url: "/doctor/medicalService",
      icon: Briefcase,
    },
  ],
  
  coreFeatures: [
    {
      name: "Trang chủ",
      url: "#",
      icon: HomeIcon,
    },
    {
      name: "Danh sách lịch hẹn",
      url: "/doctor/Patientlist",
      icon: CalendarCheck,
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
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <span className="text-xl font-bold p-1">ScheHealth</span>
      </SidebarHeader>
      <SidebarContent>
        <NavFunction projects={data.coreFeatures} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        {/* <NavAdmin projects={data.admin} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> */}
        {/* <NavSystem projects={data.system} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
