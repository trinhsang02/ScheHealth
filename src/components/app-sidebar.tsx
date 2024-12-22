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
  // navMain: [
  //   {
  //     title: "Dashboard",
  //     url: "#",
  //     icon: HomeIcon,
  //   },
  //   {
  //     title: "Models",
  //     url: "#",
  //     icon: Bot,
  //     items: [
  //       {
  //         title: "Genesis",
  //         url: "#",
  //       },
  //       {
  //         title: "Explorer",
  //         url: "#",
  //       },
  //       {
  //         title: "Quantum",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  system: [
    {
      name: "Cài đặt",
      url: "#",
      icon: Settings,
    },
    {
      name: "Đăng xuất",
      url: "#",
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
      url: "#",
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
      name: "Quản lý lịch hẹn",
      url: "#",
      icon: CalendarCheck,
    },
    {
      name: "Quản lý ca khám",
      url: "#",
      icon: List,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Logo app */}
      </SidebarHeader>
      <SidebarContent>
        <NavFunction projects={data.coreFeatures} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <NavAdmin projects={data.admin} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <NavSystem projects={data.system} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
