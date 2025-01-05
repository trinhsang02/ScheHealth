'use client'

import { useState } from "react"
import Link from "next/link"

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { useRouter } from "next/navigation"
import authService from "@/services/api/authService"

const ForgotPasswordPatient: React.FC = () => {
    const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Email không hợp lệ')
      return
    }

    const resetPasswordRequest = {
      email,
      role: 'patient',
    }
    try{
      const response = authService.resetPassword(resetPasswordRequest)
      console.log('Nhận mật khẩu mới thành công', response);
      router.push('/')
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.message || 'Lỗi hệ thống, vui lòng thử lại sau')
    }
    setIsSubmitted(true)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 sm:p-8">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
          <CardDescription>
            Xác nhận Email chúng tôi sẽ gửi mật khẩu tạm thời cho bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Kiểm tra email của bạn</AlertTitle>
              <AlertDescription>
                Chúng tôi đã gửi mật khẩu mới về email của bạn
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button variant= "system" type="submit" className="w-full">
                Lấy lại mật khẩu
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Bạn đã nhớ mật khẩu?{" "}
            <Link href="/" className="text-primary underline-offset-4 hover:underline">
              Đăng nhập
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )

}
export default ForgotPasswordPatient;