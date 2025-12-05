"use client";

import { Calendar, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const todayAttendance = [
  { id: "M-001", name: "John Smith", checkIn: "06:30 AM", checkOut: "08:00 AM", status: "Completed" },
  { id: "M-012", name: "Emily Davis", checkIn: "07:00 AM", checkOut: "-", status: "Active" },
  { id: "M-023", name: "Michael Brown", checkIn: "06:45 AM", checkOut: "08:15 AM", status: "Completed" },
  { id: "M-034", name: "Sarah Wilson", checkIn: "07:30 AM", checkOut: "-", status: "Active" },
  { id: "M-045", name: "David Lee", checkIn: "06:00 AM", checkOut: "07:30 AM", status: "Completed" },
];

const recentActivity = [
  { id: "M-056", name: "Lisa Anderson", action: "Checked In", time: "2 mins ago" },
  { id: "M-067", name: "Tom Wilson", action: "Checked Out", time: "5 mins ago" },
  { id: "M-078", name: "Anna Martinez", action: "Checked In", time: "12 mins ago" },
  { id: "M-089", name: "Chris Taylor", action: "Checked Out", time: "18 mins ago" },
];

const weeklyStats = [
  { day: "Monday", count: 142 },
  { day: "Tuesday", count: 135 },
  { day: "Wednesday", count: 148 },
  { day: "Thursday", count: 132 },
  { day: "Friday", count: 155 },
  { day: "Saturday", count: 178 },
  { day: "Sunday", count: 98 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500/10 text-green-500";
    case "Completed":
      return "bg-blue-500/10 text-blue-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Management"
        description="Track member check-ins and gym activity"
        action={<Button>Export Report</Button>}
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Check-ins</p>
                <p className="text-3xl font-bold">89</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-600/10">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Currently Active</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="p-3 rounded-lg bg-green-600/10">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Daily</p>
                <p className="text-3xl font-bold">142</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Peak Hour</p>
                <p className="text-3xl font-bold">7 PM</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-600/10">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today's Attendance</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Check-ins</CardTitle>
              <CardDescription>Members who checked in today</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{record.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.name}</p>
                            <p className="text-sm text-muted-foreground">{record.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Summary</CardTitle>
              <CardDescription>Check-ins for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((stat) => (
                  <div key={stat.day} className="flex items-center gap-4">
                    <div className="w-24">
                      <p className="font-medium">{stat.day}</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-8 bg-primary/10 rounded-lg relative overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-lg"
                          style={{ width: `${(stat.count / 178) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <p className="font-semibold">{stat.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest check-in and check-out activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{activity.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.id}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{activity.action}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
