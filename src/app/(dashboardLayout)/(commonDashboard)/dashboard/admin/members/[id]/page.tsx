"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Mail, Phone, Calendar, CreditCard, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockMember = {
  id: "M-001",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1990-05-15",
  joinDate: "2024-01-15",
  status: "Active",
  plan: "Premium",
  planExpiry: "2025-01-15",
  emergencyContact: "Jane Smith - +1 (555) 987-6543",
  address: "123 Main St, New York, NY 10001",
  trainer: "David Martinez",
};

const paymentHistory = [
  { id: "PAY-001", date: "2024-12-01", amount: 199, method: "Credit Card", status: "Completed" },
  { id: "PAY-002", date: "2024-11-01", amount: 199, method: "Credit Card", status: "Completed" },
  { id: "PAY-003", date: "2024-10-01", amount: 199, method: "Debit Card", status: "Completed" },
  { id: "PAY-004", date: "2024-09-01", amount: 199, method: "Credit Card", status: "Completed" },
];

const attendanceHistory = [
  { date: "2024-12-15", checkIn: "06:30 AM", checkOut: "08:00 AM", duration: "1h 30m" },
  { date: "2024-12-14", checkIn: "06:45 AM", checkOut: "08:15 AM", duration: "1h 30m" },
  { date: "2024-12-13", checkIn: "06:30 AM", checkOut: "07:45 AM", duration: "1h 15m" },
  { date: "2024-12-12", checkIn: "07:00 AM", checkOut: "08:30 AM", duration: "1h 30m" },
];

const getStatusColor = (status: string) => {
  return status === "Active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500";
};

export default function MemberDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/members">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title={mockMember.name}
          description={`Member ID: ${mockMember.id}`}
          action={
            <Link href={`/dashboard/admin/members/${params.id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          }
        />
      </div>

      {/* Profile Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-3xl">{mockMember.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold">{mockMember.name}</h3>
                <p className="text-muted-foreground">{mockMember.id}</p>
              </div>
              <Badge className={getStatusColor(mockMember.status)}>
                {mockMember.status}
              </Badge>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{mockMember.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{mockMember.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {mockMember.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{mockMember.plan}</p>
                  <p className="text-sm text-muted-foreground">Membership Plan</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Days This Month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Membership Status */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Plan Progress</span>
                  <span className="text-sm text-muted-foreground">11 months / 12 months</span>
                </div>
                <Progress value={92} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Plan Expiry</p>
                  <p className="font-semibold">{mockMember.planExpiry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Trainer</p>
                  <p className="font-semibold">{mockMember.trainer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{mockMember.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{mockMember.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{mockMember.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{mockMember.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{mockMember.address}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium">{mockMember.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>All payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="text-green-600 font-semibold">${payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/10 text-green-500">
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Recent check-in records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
