"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Phone, Calendar, TrendingUp, Dumbbell, Heart, Target, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface ClientDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
    joinDate: string;
    status: string;
    fitnessGoal: string;
    currentWeight: number;
    targetWeight: number;
    height: number;
    age: number;
    sessionsCompleted: number;
    nextSession?: string;
    progress: number;
}

interface WorkoutSession {
    id: string;
    date: string;
    duration: number;
    type: string;
    notes: string;
}

interface BodyMetric {
    date: string;
    weight: number;
    bodyFat: number;
}

const mockClient: ClientDetail = {
    id: "C-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    profileImage: "/members/john.jpg",
    joinDate: "2024-01-15",
    status: "Active",
    fitnessGoal: "Weight Loss",
    currentWeight: 185,
    targetWeight: 165,
    height: 70,
    age: 32,
    sessionsCompleted: 24,
    nextSession: "2024-12-06T09:00:00",
    progress: 75,
};

const mockSessions: WorkoutSession[] = [
    {
        id: "S-001",
        date: "2024-12-01",
        duration: 60,
        type: "Strength Training",
        notes: "Great progress on bench press. Increased weight by 10lbs.",
    },
    {
        id: "S-002",
        date: "2024-11-28",
        duration: 45,
        type: "HIIT Cardio",
        notes: "High energy session. Client showed excellent endurance.",
    },
    {
        id: "S-003",
        date: "2024-11-25",
        duration: 60,
        type: "Strength Training",
        notes: "Focus on lower body. Good form on squats.",
    },
];

const mockMetrics: BodyMetric[] = [
    { date: "2024-12-01", weight: 185, bodyFat: 22 },
    { date: "2024-11-01", weight: 190, bodyFat: 24 },
    { date: "2024-10-01", weight: 195, bodyFat: 26 },
];

export default function MemberDetailPage() {
    const [client] = useState<ClientDetail>(mockClient);
    const [sessions] = useState<WorkoutSession[]>(mockSessions);
    const [metrics] = useState<BodyMetric[]>(mockMetrics);

    const weightLost = mockMetrics[mockMetrics.length - 1].weight - client.currentWeight;
    const totalWeightToLose = mockMetrics[mockMetrics.length - 1].weight - client.targetWeight;
    const progressPercentage = (weightLost / totalWeightToLose) * 100;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/trainer/my-menbers">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <PageHeader
                    title={client.name}
                    description="Client profile and progress tracking"
                />
            </div>

            {/* Client Header */}
            <Card className="border-primary/20">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={client.profileImage} alt={client.name} />
                            <AvatarFallback className="text-2xl">
                                {client.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold">{client.name}</h2>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2 justify-center md:justify-start">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {client.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {client.phone}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Joined {new Date(client.joinDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                                    {client.status}
                                </Badge>
                                <Badge className="bg-primary/10 text-primary">
                                    {client.fitnessGoal}
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <Button>
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                                <Button variant="outline">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Session
                                </Button>
                                <Link href="/dashboard/trainer/workout-plans/create">
                                    <Button variant="outline">
                                        <Dumbbell className="h-4 w-4 mr-2" />
                                        Assign Plan
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Current Weight</p>
                            <p className="text-2xl font-bold">{client.currentWeight} lbs</p>
                            <p className="text-xs text-muted-foreground">
                                Target: {client.targetWeight} lbs
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Weight Lost</p>
                            <p className="text-2xl font-bold text-green-600">{weightLost} lbs</p>
                            <p className="text-xs text-muted-foreground">
                                {totalWeightToLose - weightLost} lbs to go
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Sessions</p>
                            <p className="text-2xl font-bold">{client.sessionsCompleted}</p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Overall Progress</p>
                            <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                            <Progress value={progressPercentage} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sessions">Session History</TabsTrigger>
                    <TabsTrigger value="metrics">Body Metrics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Age</span>
                                    <span className="font-semibold">{client.age} years</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Height</span>
                                    <span className="font-semibold">{client.height} inches</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Fitness Goal</span>
                                    <span className="font-semibold">{client.fitnessGoal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Next Session</span>
                                    <span className="font-semibold">
                                        {client.nextSession
                                            ? new Date(client.nextSession).toLocaleString()
                                            : "Not scheduled"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Weight Loss Progress</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress to Goal</span>
                                        <span className="font-semibold">{Math.round(progressPercentage)}%</span>
                                    </div>
                                    <Progress value={progressPercentage} className="h-3" />
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{mockMetrics[mockMetrics.length - 1].weight}</p>
                                        <p className="text-xs text-muted-foreground">Starting</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-primary">{client.currentWeight}</p>
                                        <p className="text-xs text-muted-foreground">Current</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{client.targetWeight}</p>
                                        <p className="text-xs text-muted-foreground">Target</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {sessions.slice(0, 3).map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg"
                                    >
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Dumbbell className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-semibold">{session.type}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(session.date).toLocaleDateString()} • {session.duration} min
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">{session.notes}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sessions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Session History</CardTitle>
                            <CardDescription>
                                Complete history of training sessions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {sessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg"
                                    >
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-semibold">{session.type}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(session.date).toLocaleDateString("en-US", {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                                <Badge variant="secondary">{session.duration} min</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">{session.notes}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="metrics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Body Metrics History</CardTitle>
                            <CardDescription>Track physical progress over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {metrics.map((metric, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <TrendingUp className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    {new Date(metric.date).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {index === 0 ? "Latest" : `${index} month${index > 1 ? "s" : ""} ago`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 text-right">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Weight</p>
                                                <p className="font-semibold">{metric.weight} lbs</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Body Fat</p>
                                                <p className="font-semibold">{metric.bodyFat}%</p>
                                            </div>
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
