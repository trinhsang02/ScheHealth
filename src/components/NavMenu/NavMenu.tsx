"use client"
import Link from "next/link"
import React, { useState } from "react"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "../ui/button"

export function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">ScheHealth</span>
        </Link>
        <nav className="flex items-center space-x-6 justify-end p-5">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Trang chủ
          </Link>
          <Menubar className="border-0">
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium transition-colors hover:text-primary data-[state=open]:text-primary">
                Lịch khám
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/lich-kham/dat-lich">Đặt lịch khám</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/lich-kham/lich-su">Lịch sử khám</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/lich-kham/theo-doi">Theo dõi lịch khám</Link>
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
                    <Link href="/">Thông tin cá nhân</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/">Bảo mật</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/">Đăng xuất</Link>
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