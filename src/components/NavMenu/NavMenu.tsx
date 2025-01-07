"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import authService from "../../services/api/authService";

export function NavMenu({ role }: { role?: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/");
    authService.logout();
    setIsLoggedIn(false);
  };

  // Hàm kiểm tra trạng thái active của link
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between">
        <Link href="/patient/homepage" className="flex items-center space-x-2">
          <span className="text-xl font-bold p-5">ScheHealth</span>
        </Link>
        <nav className="flex items-center space-x-6 justify-end p-5">

          <Button variant="link" className={isActive("/patient/homepage") ? "text-primary font-bold " : "text-sm font-medium transition-colors hover:text-primary"}>
            <Link href={"/patient/homepage"}>Trang chủ</Link>
          </Button>

          {/* Lịch khám */}
          <Menubar className="border-0">
            <MenubarMenu>
              <MenubarTrigger
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/patient/bookingHistory") ||
                  isActive("/patient/schedule")
                  ? "text-primary font-bold"
                  : ""
                  }`}
              >
                Lịch khám
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Button variant="link">
                    <Link href="/patient/bookingHistory">Lịch sử đặt lịch</Link>
                  </Button>
                </MenubarItem>
                <MenubarItem>
                  <Button variant="link">
                    <Link href="/patient/schedule">Lịch sử khám bệnh</Link>
                  </Button>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {/* Tài khoản */}
          {isLoggedIn ? (
            <Menubar className="border-0">
              <MenubarMenu>
                <MenubarTrigger
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/patient/profile") ? "text-primary font-bold" : ""
                    }`}
                >
                  Tài khoản
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Button variant="link">
                      <Link href="/patient/profile">Thông tin cá nhân</Link>
                    </Button>
                  </MenubarItem>
                  <MenubarItem>
                    <Button variant="link">
                      <Link href="/patient/">Bảo mật</Link>
                    </Button>
                  </MenubarItem>
                  <MenubarItem>
                    <Button variant="link" onClick={handleLogout}>
                      Đăng xuất
                    </Button>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Button asChild variant="system">
              <Link href="/">Đăng nhập</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
