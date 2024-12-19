// "use client"
// import * as React from "react"
import Link from "next/link"
import React, { useState } from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

const components: { title: string; href: string }[] = [
  {
    title: "Lịch sử khám bệnh",
    href: "/",
  },
  {
    title: "Kết quả khám bệnh",
    href: "/",
  },
  {
    title: "Đơn thuốc",
    href: "/",
  },
]

const component_account: { title: string; href: string }[] = [
  {
    title: "Thông tin cá nhân",
    href: "/",
  },
  {
    title: "Bảo mật",
    href: "/",
  },
  {
    title: "Thông báo",
    href: "/",
  },
  {
    title: "Đăng xuất",
    href: "/patient/login",
  },
]

export function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Trang chủ
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Lịch khám</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[200px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Hồ sơ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {isLoggedIn ? (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tài khoản</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[200px]">
                {component_account.map((component_account) => (
                  <ListItem
                    key={component_account.title}
                    title={component_account.title}
                    href={component_account.href}
                  >
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Link href="/patient/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Đăng nhập
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <Avatar>
            <AvatarImage src="{UIT}" alt="User Avatar" />
            <AvatarFallback />
          </Avatar>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
