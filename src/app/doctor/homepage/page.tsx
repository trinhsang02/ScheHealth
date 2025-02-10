"use client"

import { useState } from "react"
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Giả lập dữ liệu số ca khám trong ngày
  const appointmentData = [
    { hour: "08:00", appointments: 3 },
    { hour: "09:00", appointments: 5 },
    { hour: "10:00", appointments: 7 },
    { hour: "11:00", appointments: 4 },
    { hour: "12:00", appointments: 2 },
    { hour: "13:00", appointments: 6 },
    { hour: "14:00", appointments: 8 },
    { hour: "15:00", appointments: 5 },
    { hour: "16:00", appointments: 3 },
  ]

  // Tính tổng số ca khám
  const totalAppointments = appointmentData.reduce((sum, data) => sum + data.appointments, 0)

  // Giả lập hiệu suất làm việc
  const performancePercentage = 78

  return (
    <div className="min-h-screen bg-background">

      {/* Dashboard Content */}
      <main className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Trang chủ</h1>
            <p className="text-muted-foreground">Chào ngày mới, chúc bạn một ngày tốt lành!</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Notifications</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Metric Cards and Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Tổng số bệnh nhân hôm nay</span>
                  <span className="text-2xl font-bold">{totalAppointments}</span>
                  <span className="text-sm text-green-600">+5</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Số ca hẹn đã hoàn thành</span>
                  <span className="text-2xl font-bold">24</span>
                  <span className="text-sm text-green-600">90%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Bệnh nhân mới</span>
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-sm text-green-600">30%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Thời gian khám trung bình</span>
                  <span className="text-2xl font-bold">18 min</span>
                  <span className="text-sm text-yellow-600">+2 min </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-full">
            <CardContent className="p-0 flex justify-center items-center">
              <Calendar mode="single" selected={new Date()} className="h-full" />
            </CardContent>
          </Card>
        </div>

        {/* Chart and Performance */}
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Appointments Today</h3>
              <ChartContainer className="h-[300px]" config={{}}>
                <BarChart data={appointmentData}>
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Efficiency</span>
                    <span className="text-sm font-medium">{performancePercentage}%</span>
                  </div>
                  <Progress value={performancePercentage} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Patient Satisfaction</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Documentation Accuracy</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

