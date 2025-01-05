'use client'

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import authService from "../../services/api/authService"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Email không hợp lệ')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.login(email, password)

      if (response.success && response.data) {
        // AuthService sẽ tự động lưu token và thông tin người dùng
        const dashboardRoute = authService.getDashboardRoute()
        router.push(dashboardRoute)
      } else {
        setError(response.message || 'Đăng nhập thất bại')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.message || 'Lỗi hệ thống, vui lòng thử lại sau')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 sm:p-8">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email để đăng nhập ngay!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  href="/patient/forgotPassword"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <Button
              variant="system"
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link href="/patient/register" className="underline italic">
              Đăng ký ngay!
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
