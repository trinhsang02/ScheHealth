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
import { useRouter } from 'next/navigation'

export function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter();
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
          <Link href="/patient/homepage" className="text-sm font-medium transition-colors hover:text-primary">
            Trang chủ
          </Link>

          <Link href="/patient/schedule" className="text-sm font-medium transition-colors hover:text-primary">
            Lịch khám
          </Link>
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
                    <Link href="/patient/profile">Thông tin cá nhân</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/patient/">Bảo mật</Link>
                  </MenubarItem>
                  <MenubarItem>
                    {/* <Link href="/">Đăng xuất</Link> */}
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