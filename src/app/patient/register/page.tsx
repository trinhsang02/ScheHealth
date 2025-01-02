'use client'

import React, { useState } from 'react';
import Link from "next/link"
import { Eye, EyeOff } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader,CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import authService from '../../../services/api/authService';
import { useRouter } from "next/navigation"

const RegisterPatient: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError('Email không hợp lệ')
        return
      }
      if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự')
        return
      }
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp');
        return;
      }

      const registerRequest = {
        name,
        email,
        password,
        role: 'patient',
      };

      try {
        const response = await authService.register(registerRequest);
        console.log('Đăng ký thành công', response);
        router.push('/')
      } catch (error: any) {
        console.error('Đăng ký thất bại', error);
        setError(error.message || 'Đăng ký thất bại');
      }
    }
  
    return (
      <div className="flex h-screen w-full items-center justify-center p-4 sm:p-8">
        <Card className="mx-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl ">Đăng ký</CardTitle>
            <CardDescription>
            Tạo tài khoản để bắt đầu hành trình ngay!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleRegister}>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="grid gap-2">
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Xác nhận lại mật khẩu</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button variant="system" type="submit" className="w-full">
              Đăng ký
            </Button>
            <Button variant="outline" className="w-full">
              Tiếp tục với Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Bạn đã có tài khoản?{" "}
            <Link href="/patient/login" className="underline">
              Đăng nhập ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPatient;
