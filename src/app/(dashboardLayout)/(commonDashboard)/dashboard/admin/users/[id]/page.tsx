"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Mail, Phone, Calendar, CreditCard, TrendingUp, Activity, Loader2, AlertCircle } from "lucide-react";
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
import { MemberService } from "@/services/member/member.service";
import { Member } from "@/types/member.types";

const getStatusColor = (isActive: boolean) => {
  return isActive ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500";
};

const formatDate = (date: string | null | undefined) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

const calculateDaysSince = (date: string | null | undefined) => {
  if (!date) return 0;
  const start = new Date(date);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const calculatePlanProgress = (startDate: string | null | undefined, endDate: string | null | undefined) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const total = end - start;
  const elapsed = now - start;
  return Math.min(Math.max((elapsed / total) * 100, 0), 100);
};

const calculateDuration = (checkIn: string, checkOut?: string | null) => {
  if (!checkOut) return "In Progress";
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  const diff = end - start;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export default function MemberDetailPage() {
  const params = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MemberService.getMemberById(params.id as string);
        setMember(data);
      } catch (err: any) {
        setError(err.message || "Failed to load member details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMember();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">{error || "Member not found"}</p>
        <Link href="/admin/members">
          <Button variant="outline">Back to Members</Button>
        </Link>
      </div>
    );
  }

  const progress = calculatePlanProgress(member.membershipStartDate, member.membershipEndDate);
  const daysSinceJoin = calculateDaysSince(member.joinDate);
  const attendanceRate = member.attendance?.length ?
    (member.attendance.filter((a: any) => a.checkOut).length / member.attendance.length * 100).toFixed(0) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/members">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title={member.user.name}
          description={`Member ID: ${member.employeeId}`}
          action={
            <Link href={`/admin/members/${params.id}/edit`}>
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
                <AvatarImage src={member.user.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="text-3xl">
                  {member.user.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold">{member.user.name}</h3>
                <p className="text-muted-foreground">{member.employeeId}</p>
              </div>
              <Badge className={getStatusColor(member.user.isActive)}>
                {member.user.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{member.user.email}</span>
              </div>
              {member.user.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {formatDate(member.joinDate)}</span>
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
                  <p className="text-2xl font-bold">{member.currentPlan?.name || "No Plan"}</p>
                  <p className="text-sm text-muted-foreground">Membership Plan</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{attendanceRate}%</p>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{daysSinceJoin}</p>
                  <p className="text-sm text-muted-foreground">Days as Member</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Membership Status */}
          {member.currentPlan && (
            <Card>
              <CardHeader>
                <CardTitle>Membership Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Plan Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {member.membershipStartDate && member.membershipEndDate
                        ? `${formatDate(member.membershipStartDate)} - ${formatDate(member.membershipEndDate)}`
                        : "N/A"}
                    </span>
                  </div>
                  <Progress value={progress} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="font-semibold">{member.currentPlan.name}</p>
                    <p className="text-sm text-green-600">${member.currentPlan.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Trainer</p>
                    <p className="font-semibold">
                      {member.assignedTrainer?.user.name || "Not Assigned"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="fitness">Fitness Profile</TabsTrigger>
          <TabsTrigger value="payments">Payments ({member.payments?.length || 0})</TabsTrigger>
          <TabsTrigger value="attendance">Attendance ({member.attendance?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-medium">{member.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                  <p className="font-medium">{formatDate(member.dateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{member.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{member.user.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Gender</p>
                  <p className="font-medium capitalize">{member.gender?.toLowerCase() || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Blood Group</p>
                  <p className="font-medium">{member.bloodGroup || "N/A"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="font-medium">{member.address || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contact Name</p>
                  <p className="font-medium">{member.emergencyContactName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contact Phone</p>
                  <p className="font-medium">{member.emergencyContact || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fitness" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Body Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Height</p>
                  <p className="text-2xl font-bold">{member.height ? `${member.height} cm` : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Weight</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {member.currentWeight ? `${member.currentWeight} kg` : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Target Weight</p>
                  <p className="text-2xl font-bold text-green-600">
                    {member.targetWeight ? `${member.targetWeight} kg` : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fitness Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Workout Experience</p>
                  <Badge variant="outline" className="capitalize">
                    {member.workoutExperience?.toLowerCase() || "Not Set"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Weekly Frequency</p>
                  <p className="font-medium">{member.weeklyFrequency || 0} days/week</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Preferred Time</p>
                  <p className="font-medium capitalize">{member.preferredTime?.toLowerCase() || "Not Set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Fitness Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {member.fitnessGoals && member.fitnessGoals.length > 0 ? (
                      member.fitnessGoals.map((goal: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{goal}</Badge>
                      ))
                    ) : (
                      <p className="text-sm">No goals set</p>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-2">Preferred Workout Style</p>
                  <div className="flex flex-wrap gap-2">
                    {member.preferredWorkoutStyle && member.preferredWorkoutStyle.length > 0 ? (
                      member.preferredWorkoutStyle.map((style: string, idx: number) => (
                        <Badge key={idx} variant="outline">{style}</Badge>
                      ))
                    ) : (
                      <p className="text-sm">Not specified</p>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-2">Health Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {member.healthConditions && member.healthConditions.length > 0 ? (
                      member.healthConditions.map((condition: string, idx: number) => (
                        <Badge key={idx} variant="destructive">{condition}</Badge>
                      ))
                    ) : (
                      <p className="text-sm text-green-600">No conditions reported</p>
                    )}
                  </div>
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
              {member.payments && member.payments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {member.payments.map((payment: any) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                        <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          ${payment.finalAmount}
                          {payment.discount > 0 && (
                            <span className="text-xs text-muted-foreground ml-1">
                              (-${payment.discount})
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="capitalize">{payment.paymentMethod.toLowerCase()}</TableCell>
                        <TableCell>
                          <Badge className={payment.status === "COMPLETED" ? "bg-green-500/10 text-green-500" : ""}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No payment history available
                </div>
              )}
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
              {member.attendance && member.attendance.length > 0 ? (
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
                    {member.attendance.slice(0, 10).map((record: any) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{formatDate(record.date)}</TableCell>
                        <TableCell>{new Date(record.checkIn).toLocaleTimeString()}</TableCell>
                        <TableCell>
                          {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : "N/A"}
                        </TableCell>
                        <TableCell>{calculateDuration(record.checkIn, record.checkOut)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No attendance records available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
