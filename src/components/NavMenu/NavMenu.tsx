"use client"
import Link from "next/link"
import React, { useState } from "react"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "../ui/button"
import authService from "../../services/api/authService"
import { useRouter, usePathname } from 'next/navigation'

export function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    router.push('/')
    authService.logout()
    setIsLoggedIn(false)
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between">
        <Link href="/patient/homepage" className="flex items-center space-x-2">
          <span className="text-xl font-bold p-5">ScheHealth</span>
        </Link>
        <nav className="flex items-center space-x-6 justify-end p-5">
          <Link
            href="/patient/homepage"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/patient/homepage' ? 'text-primary' : ''
              }`}
          >
            Trang chủ
          </Link>

          <Menubar className="border-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-medium transition-colors hover:text-primary data-[state=open]:text-primary">
                  Lịch khám
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Button variant="link">
                      <Link href="/patient/schedule">Lịch sử đặt lịch</Link>
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
          <Link href="/ho-so" className="text-sm font-medium transition-colors hover:text-primary">
            Hồ sơ
          </Link>
          {isLoggedIn ? (
            <Menubar className="border-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-medium transition-colors hover:text-primary data-[state=open]:text-primary">
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
                    <Button variant="link" onClick={handleLogout}>Đăng xuất</Button>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Button asChild variant="system">
              <Link href="/">
                Đăng nhập
              </Link>
            </Button>
          )

          }

        </nav>
      </div>
    </header>
  )
}