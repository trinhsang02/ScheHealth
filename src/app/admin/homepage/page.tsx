'use client'

import { useState } from 'react'
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { LucideBarChart, User2, Users, Settings, Bell, Search, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { DatePickerWithRange } from './date-range-picker'

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="min-h-screen bg-background">

            {/* Dashboard Content */}
            <main className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    {/* <DatePickerWithRange /> */}
                    {/* <Button>Download</Button> */}
                </div>

                <Tabs defaultValue="overview" className="mb-8">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Metric Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Tổng doanh thu</span>
                                <span className="text-2xl font-bold">100.000.000 VNĐ</span>
                                <span className="text-sm text-green-600">+20.1%</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Subscriptions</span>
                                <span className="text-2xl font-bold">+2350</span>
                                <span className="text-sm text-green-600">+180.1% from last month</span>
                            </div>
                        </CardContent>
                    </Card> */}

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Số bác sĩ</span>
                                <span className="text-2xl font-bold">50</span>
                                <span className="text-sm text-green-600">Ổn định</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Số chuyên khoa</span>
                                <span className="text-2xl font-bold">10</span>
                                <span className="text-sm text-green-600">Ổn định</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Chart and Recent Sales */}
                <div className="grid gap-4 md:grid-cols-7">
                    <Card className="md:col-span-4 w-full">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Overview</h3>
                            <ChartContainer className="h-[300px]" config={{}}>
                                <BarChart
                                    data={[
                                        { month: "Jan", value: 2800 },
                                        { month: "Feb", value: 4500 },
                                        { month: "Mar", value: 2000 },
                                        { month: "Apr", value: 4500 },
                                        { month: "May", value: 4000 },
                                        { month: "Jun", value: 3800 },
                                        { month: "Jul", value: 1500 },
                                        { month: "Aug", value: 3800 },
                                        { month: "Sep", value: 6000 },
                                        { month: "Oct", value: 2200 },
                                        { month: "Nov", value: 2200 },
                                        { month: "Dec", value: 4800 }
                                    ]}
                                >
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => value}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="hsl(var(--primary))"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Recent Sales</h3>
                            <p className="text-sm text-muted-foreground mb-4">You made 265 sales this month.</p>

                            <div className="space-y-4">
                                {[
                                    { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
                                    { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                                    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
                                    { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                                    { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
                                ].map((sale) => (
                                    <div key={sale.email} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback>{sale.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{sale.name}</p>
                                                <p className="text-sm text-muted-foreground">{sale.email}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium">{sale.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

