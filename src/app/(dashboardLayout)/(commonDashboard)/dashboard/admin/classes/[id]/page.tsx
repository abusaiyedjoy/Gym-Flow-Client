"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Users, Clock, Calendar, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockClass = {
    id: "CLS-001",
    name: "HIIT Cardio Blast",
    description: "High-intensity interval training designed to boost cardiovascular fitness and burn maximum calories. Perfect for those looking to push their limits and achieve rapid results.",
    category: "Cardio",
    difficulty: "Intermediate",
    trainer: {
        id: "T-001",
        name: "David Martinez",
        image: "/trainers/david.jpg",
        rating: 4.9,
    },
    schedule: "Mon, Wed, Fri",
    startTime: "6:00 AM",
    duration: 45,
    capacity: 20,
    enrolled: 18,
    location: "Studio A",
    status: "Active",
};

const mockParticipants = [
    { id: "M-001", name: "John Doe", image: "/members/john.jpg", attendance: 95 },
    { id: "M-002", name: "Sarah Johnson", image: "/members/sarah.jpg", attendance: 88 },
    { id: "M-003", name: "Michael Chen", image: "/members/michael.jpg", attendance: 92 },
    { id: "M-004", name: "Emily Rodriguez", image: "/members/emily.jpg", attendance: 85 },
];

export default function ClassDetailPage() {
    const router = useRouter();
    const [classData] = useState(mockClass);
    const [participants] = useState(mockParticipants);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Intermediate":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "Advanced":
                return "bg-red-500/10 text-red-700 dark:text-red-400";
            default:
                return "";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{classData.name}</h1>
                            <Badge className={getDifficultyColor(classData.difficulty)}>
                                {classData.difficulty}
                            </Badge>
                            <Badge variant={classData.status === "Active" ? "default" : "secondary"}>
                                {classData.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">{classData.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => router.push(`/dashboard/admin/classes/${classData.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{classData.enrolled}/{classData.capacity}</p>
                                <p className="text-sm text-muted-foreground">Enrollment</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600/10 rounded-lg">
                                <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{classData.duration}</p>
                                <p className="text-sm text-muted-foreground">Minutes</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-600/10 rounded-lg">
                                <Calendar className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">{classData.schedule}</p>
                                <p className="text-sm text-muted-foreground">{classData.startTime}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-600/10 rounded-lg">
                                <MapPin className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">{classData.location}</p>
                                <p className="text-sm text-muted-foreground">Location</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="details" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="participants">Participants</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Class Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-3">
                                    <div>
                                        <Label className="text-sm text-muted-foreground">Category</Label>
                                        <p className="font-semibold mt-1">{classData.category}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm text-muted-foreground">Difficulty Level</Label>
                                        <p className="font-semibold mt-1">{classData.difficulty}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm text-muted-foreground">Duration</Label>
                                        <p className="font-semibold mt-1">{classData.duration} minutes</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm text-muted-foreground">Location</Label>
                                        <p className="font-semibold mt-1">{classData.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Trainer</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={classData.trainer.image} alt={classData.trainer.name} />
                                        <AvatarFallback>
                                            {classData.trainer.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">{classData.trainer.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold">{classData.trainer.rating}</span>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View Profile
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Enrollment Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Current Enrollment</span>
                                        <span className="text-sm font-semibold">
                                            {classData.enrolled}/{classData.capacity} ({Math.round((classData.enrolled / classData.capacity) * 100)}%)
                                        </span>
                                    </div>
                                    <Progress
                                        value={(classData.enrolled / classData.capacity) * 100}
                                        className="h-3"
                                    />
                                </div>
                                <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Available Spots:</span>
                                        <span className="font-semibold">{classData.capacity - classData.enrolled}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Waitlist:</span>
                                        <span className="font-semibold">0</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="participants">
                    <Card>
                        <CardHeader>
                            <CardTitle>Enrolled Members</CardTitle>
                            <CardDescription>{participants.length} active participants</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {participants.map((participant) => (
                                    <div
                                        key={participant.id}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={participant.image} alt={participant.name} />
                                                <AvatarFallback>
                                                    {participant.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{participant.name}</p>
                                                <p className="text-sm text-muted-foreground">Member ID: {participant.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold">{participant.attendance}%</p>
                                            <p className="text-xs text-muted-foreground">Attendance</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="schedule">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Schedule</CardTitle>
                            <CardDescription>Recurring class times</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {["Monday", "Wednesday", "Friday"].map((day) => (
                                    <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-semibold">{day}</p>
                                            <p className="text-sm text-muted-foreground">{classData.startTime} - {classData.duration} minutes</p>
                                        </div>
                                        <Badge>Active</Badge>
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
    return <label className={className}>{children}</label>;
}
