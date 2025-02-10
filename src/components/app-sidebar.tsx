"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, CalendarCheck, Settings, LogOut } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import logo from "@/assets/logo.png"
import { authService } from "@/services/api/authService";
import avatarImage from "@/assets/avatar.png";

const userData = () => {
  const userData = authService.getUserData();
  return userData;
};

// This is sample data.
const data = {
  user: {
    name: userData()?.name || "",
    email: "Dr.ANguyen@example.com",
    avatar: avatarImage.src,
  },
  coreFeatures: [
    { name: "Trang chủ", url: "/doctor/homepage", icon: HomeIcon },
    {
      name: "Danh sách lịch hẹn",
      url: "/doctor/Patientlist",
      icon: CalendarCheck,
    },
    { name: "Cài đặt", url: "/doctor/setting", icon: Settings },
    { name: "Đăng xuất", url: "/", icon: LogOut },
  ],
};

const handleSignOut = async () => {
  await authService.logout();
  window.location.href = "/";
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        {data.coreFeatures.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            onClick={(e) => {
              if (item.name === "Đăng xuất") {
                e.preventDefault();
                handleSignOut();
              } else {
                setSelectedItem(item.url);
              }
            }}
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition ${
                selectedItem === item.url
                  ? "bg-gray-200 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
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
  );
}
