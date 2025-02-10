"use client";

import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import {
  LucideBarChart,
  User2,
  Users,
  Settings,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import jsPDF from "jspdf";
// import { DatePickerWithRange } from './date-range-picker'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Thống kê đặt lịch
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Tỷ lệ đặt thành công
                    </p>
                    <p className="text-2xl font-bold">85.5%</p>
                    <p className="text-sm text-green-600">
                      +5.2% so với tháng trước
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Thời gian chờ trung bình
                    </p>
                    <p className="text-2xl font-bold">2.5 ngày</p>
                    <p className="text-sm text-red-600">
                      +0.5 ngày so với tháng trước
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Số lượt đặt lịch/ngày
                    </p>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-green-600">
                      +12% so với tháng trước
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Tỷ lệ hủy lịch
                    </p>
                    <p className="text-2xl font-bold">4.2%</p>
                    <p className="text-sm text-green-600">
                      -1.5% so với tháng trước
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Phân bố theo chuyên khoa
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      department: "Khoa Tim mạch",
                      appointments: 450,
                      trend: "+12%",
                    },
                    {
                      department: "Khoa Nội tổng quát",
                      appointments: 380,
                      trend: "+8%",
                    },
                    {
                      department: "Khoa Nhi",
                      appointments: 320,
                      trend: "+15%",
                    },
                    { department: "Khoa Sản", appointments: 280, trend: "+5%" },
                    {
                      department: "Khoa Mắt",
                      appointments: 250,
                      trend: "+10%",
                    },
                  ].map((dept) => (
                    <div
                      key={dept.department}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">
                          {dept.appointments} lượt khám/tháng
                        </p>
                      </div>
                      <span className="text-sm text-green-600">
                        {dept.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "reports":
        const generateMockPDF = (title: string) => {
          const doc = new jsPDF();

          // Add content
          doc.setFontSize(16);
          doc.text(title, 20, 20);

          doc.setFontSize(12);
          doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

          doc.setFontSize(14);
          doc.text("Hospital Management Report", 20, 50);

          // Add sample data
          const data = [
            "Sample Statistics:",
            "- Total Appointments: 1,234",
            "- Completed Appointments: 1,100",
            "- Cancelled Appointments: 134",
            "- Success Rate: 89%",
            "",
            "Department Performance:",
            "- Cardiology: 92% satisfaction",
            "- Pediatrics: 88% satisfaction",
            "- Neurology: 90% satisfaction",
            "",
            "Generated by Hospital Management System",
          ];

          data.forEach((text, index) => {
            doc.text(text, 20, 70 + index * 10);
          });

          return doc.output("blob");
        };

        const generateMockExcel = (title: string) => {
          // Create a simple CSV content for Excel
          const content = `
Title,${title}
Generated Date,${new Date().toLocaleString()}

Category,Value,Change
Total Revenue,1200000,+15%
Patient Count,450,+8%
Average Wait Time,25,-10%
Satisfaction Rate,92%,+5%
            `;
          return new Blob([content], { type: "application/vnd.ms-excel" });
        };

        const handleDownload = async (reportTitle: string, type: string) => {
          const button = document.activeElement as HTMLButtonElement;
          if (button) {
            const originalText = button.innerText;
            button.disabled = true;
            button.innerText = "Đang tải...";

            try {
              // Generate the appropriate mock file
              const blob =
                type.toLowerCase() === "pdf"
                  ? generateMockPDF(reportTitle)
                  : generateMockExcel(reportTitle);

              // Create download link
              const url = window.URL.createObjectURL(blob);
              const timestamp = new Date().toISOString().split("T")[0];
              const fileName = `${reportTitle
                .toLowerCase()
                .replace(/ /g, "-")}-${timestamp}.${type.toLowerCase()}`;

              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", fileName);
              document.body.appendChild(link);
              link.click();

              // Cleanup
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);

              // Show success message
              setTimeout(() => {
                button.disabled = false;
                button.innerText = originalText;
              }, 1000);
            } catch (error) {
              console.error("Download failed:", error);
              button.innerText = "Lỗi tải xuống";
              setTimeout(() => {
                button.disabled = false;
                button.innerText = originalText;
              }, 2000);
            }
          }
        };

        return (
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">
                    Báo cáo theo thời gian
                  </h3>
                  <div className="flex gap-2">
                    <select
                      className="p-2 border rounded-md bg-background"
                      defaultValue={new Date().getFullYear()}
                    >
                      {[2024, 2023, 2022].map((year) => (
                        <option key={year} value={year}>
                          Năm {year}
                        </option>
                      ))}
                    </select>
                    <select
                      className="p-2 border rounded-md bg-background"
                      defaultValue={new Date().getMonth() + 1}
                    >
                      {[
                        "Tháng 1",
                        "Tháng 2",
                        "Tháng 3",
                        "Tháng 4",
                        "Tháng 5",
                        "Tháng 6",
                        "Tháng 7",
                        "Tháng 8",
                        "Tháng 9",
                        "Tháng 10",
                        "Tháng 11",
                        "Tháng 12",
                      ].map((month, index) => (
                        <option key={month} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Báo cáo tổng quan", type: "PDF", size: "2.5 MB" },
                    {
                      title: "Báo cáo tài chính",
                      type: "XLSX",
                      size: "1.8 MB",
                    },
                    { title: "Báo cáo nhân sự", type: "PDF", size: "3.2 MB" },
                    {
                      title: "Báo cáo chuyên khoa",
                      type: "PDF",
                      size: "4.1 MB",
                    },
                  ].map((report) => (
                    <div
                      key={report.title}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.type} • {report.size}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() =>
                          handleDownload(report.title, report.type)
                        }
                      >
                        <span>Tải xuống</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "notifications":
        return (
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Recent Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "New appointment request", time: "5 minutes ago" },
                    { title: "System update completed", time: "1 hour ago" },
                    { title: "New doctor registered", time: "2 hours ago" },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Mark as read
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
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
                      { month: "Dec", value: 4800 },
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
                <p className="text-sm text-muted-foreground mb-4">
                  You made 265 sales this month.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      name: "Olivia Martin",
                      email: "olivia.martin@email.com",
                      amount: "+$1,999.00",
                    },
                    {
                      name: "Jackson Lee",
                      email: "jackson.lee@email.com",
                      amount: "+$39.00",
                    },
                    {
                      name: "Isabella Nguyen",
                      email: "isabella.nguyen@email.com",
                      amount: "+$299.00",
                    },
                    {
                      name: "William Kim",
                      email: "will@email.com",
                      amount: "+$99.00",
                    },
                    {
                      name: "Sofia Davis",
                      email: "sofia.davis@email.com",
                      amount: "+$39.00",
                    },
                  ].map((sale) => (
                    <div
                      key={sale.email}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{sale.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {sale.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sale.email}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">{sale.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Content */}
      <main className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {/* <DatePickerWithRange /> */}
          {/* <Button>Download</Button> */}
        </div>

        <Tabs
          defaultValue="overview"
          className="mb-8"
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Metric Cards */}
        {activeTab === "overview" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tổng doanh thu
                  </span>
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
                  <span className="text-sm font-medium text-muted-foreground">
                    Số bác sĩ
                  </span>
                  <span className="text-2xl font-bold">50</span>
                  <span className="text-sm text-green-600">Ổn định</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Số chuyên khoa
                  </span>
                  <span className="text-2xl font-bold">10</span>
                  <span className="text-sm text-green-600">Ổn định</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Render tab content */}
        {renderTabContent()}
      </main>
    </div>
  );
}
