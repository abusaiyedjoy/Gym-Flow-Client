"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Mail, Phone, Award, Users, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const mockTrainer = {
  id: "T-001",
  name: "David Martinez",
  email: "david.martinez@gymflow.com",
  phone: "+1 (555) 234-5678",
  joinDate: "2023-06-15",
  status: "Active",
  specialization: "Strength Training",
  rating: 4.9,
  totalClients: 32,
  activeSessions: 156,
  experience: "8 years",
};

const certifications = [
  { name: "Certified Personal Trainer (CPT)", issuer: "NASM", year: "2016" },
  { name: "Strength & Conditioning Specialist", issuer: "NSCA", year: "2018" },
  { name: "Nutrition Coach", issuer: "Precision Nutrition", year: "2020" },
];

const clients = [
  { id: "M-001", name: "John Smith", plan: "Premium", progress: 85, joinDate: "2024-01-15" },
  { id: "M-012", name: "Emily Davis", plan: "Elite", progress: 92, joinDate: "2024-02-20" },
  { id: "M-023", name: "Michael Brown", plan: "Premium", progress: 78, joinDate: "2024-03-10" },
  { id: "M-034", name: "Sarah Wilson", plan: "Elite", progress: 88, joinDate: "2024-01-25" },
];

const schedule = [
  { day: "Monday", time: "6:00 AM - 2:00 PM", sessions: 6 },
  { day: "Tuesday", time: "6:00 AM - 2:00 PM", sessions: 5 },
  { day: "Wednesday", time: "6:00 AM - 2:00 PM", sessions: 6 },
  { day: "Thursday", time: "6:00 AM - 2:00 PM", sessions: 5 },
  { day: "Friday", time: "6:00 AM - 12:00 PM", sessions: 4 },
];

const getStatusColor = (status: string) => {
  return status === "Active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500";
};

export default function TrainerDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/trainers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title={mockTrainer.name}
          description={`Trainer ID: ${mockTrainer.id}`}
          action={
            <Link href={`/dashboard/admin/trainers/${params.id}/edit`}>
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
                <AvatarFallback className="text-3xl">{mockTrainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold">{mockTrainer.name}</h3>
                <p className="text-muted-foreground">{mockTrainer.specialization}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(mockTrainer.status)}>
                  {mockTrainer.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{mockTrainer.rating}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{mockTrainer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{mockTrainer.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {mockTrainer.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span>{mockTrainer.experience} Experience</span>
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
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{mockTrainer.totalClients}</p>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{mockTrainer.activeSessions}</p>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-2xl font-bold">{mockTrainer.rating}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Professional credentials and qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Clients ({clients.length})</CardTitle>
              <CardDescription>Members currently training with this trainer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{client.name}</p>
                      <Badge variant="outline">{client.plan}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Member since {client.joinDate}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{client.progress}%</span>
                      </div>
                      <Progress value={client.progress} />
                    </div>
                  </div>
                  <Link href={`/dashboard/admin/members/${client.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Training sessions and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule.map((item) => (
                <div key={item.day} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{item.day}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <Badge variant="outline">{item.sessions} sessions</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Retention</CardTitle>
                <CardDescription>Client satisfaction and retention rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Retention Rate</span>
                      <span className="text-sm text-muted-foreground">94%</span>
                    </div>
                    <Progress value={94} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Client Satisfaction</span>
                      <span className="text-sm text-muted-foreground">4.9/5.0</span>
                    </div>
                    <Progress value={98} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
                <CardDescription>This month's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Sessions</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="font-semibold text-green-600">43</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cancelled</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="font-bold text-primary">95.6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
