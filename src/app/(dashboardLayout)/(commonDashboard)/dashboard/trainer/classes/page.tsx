"use client";

import { useState } from "react";
import { Calendar, Clock, Users, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GymClass {
    id: string;
    name: string;
    category: string;
    date: string;
    time: string;
    duration: number;
    capacity: number;
    enrolled: number;
    location: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    status: "Scheduled" | "Completed" | "Cancelled";
}

const mockClasses: GymClass[] = [
    {
        id: "CLS-001",
        name: "HIIT Cardio Blast",
        category: "Cardio",
        date: "2024-12-06",
        time: "06:00 AM",
        duration: 45,
        capacity: 20,
        enrolled: 15,
        location: "Studio A",
        difficulty: "Intermediate",
        status: "Scheduled",
    },
    {
        id: "CLS-002",
        name: "Strength & Conditioning",
        category: "Strength",
        date: "2024-12-06",
        time: "05:00 PM",
        duration: 60,
        capacity: 15,
        enrolled: 12,
        location: "Gym Floor - Zone A",
        difficulty: "Advanced",
        status: "Scheduled",
    },
    {
        id: "CLS-003",
        name: "HIIT Cardio Blast",
        category: "Cardio",
        date: "2024-12-08",
        time: "06:00 AM",
        duration: 45,
        capacity: 20,
        enrolled: 18,
        location: "Studio A",
        difficulty: "Intermediate",
        status: "Scheduled",
    },
    {
        id: "CLS-004",
        name: "Core & Flexibility",
        category: "Yoga",
        date: "2024-12-01",
        time: "07:00 AM",
        duration: 50,
        capacity: 25,
        enrolled: 25,
        location: "Studio B",
        difficulty: "Beginner",
        status: "Completed",
    },
];

export default function TrainerClassesPage() {
    const [classes, setClasses] = useState<GymClass[]>(mockClasses);

    const upcomingClasses = classes.filter((c) => c.status === "Scheduled");
    const completedClasses = classes.filter((c) => c.status === "Completed");

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
            <div className="flex items-center justify-between">
                <PageHeader
                    title="My Classes"
                    description="Manage your group fitness classes"
                />
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Class
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Classes</p>
                            <p className="text-2xl font-bold">{classes.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Upcoming</p>
                            <p className="text-2xl font-bold">{upcomingClasses.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Participants</p>
                            <p className="text-2xl font-bold">
                                {classes.reduce((sum, c) => sum + c.enrolled, 0)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Avg Capacity</p>
                            <p className="text-2xl font-bold">
                                {Math.round(
                                    (classes.reduce((sum, c) => sum + (c.enrolled / c.capacity) * 100, 0) /
                                        classes.length) ||
                                    0
                                )}%
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {upcomingClasses.map((gymClass) => (
                        <Card key={gymClass.id}>
                            <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold">{gymClass.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {gymClass.category}
                                                </p>
                                            </div>
                                            <Badge className={getDifficultyColor(gymClass.difficulty)}>
                                                {gymClass.difficulty}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Date</p>
                                                    <p className="text-sm font-semibold">
                                                        {new Date(gymClass.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Time</p>
                                                    <p className="text-sm font-semibold">{gymClass.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Enrolled</p>
                                                    <p className="text-sm font-semibold">
                                                        {gymClass.enrolled}/{gymClass.capacity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Location</p>
                                                    <p className="text-sm font-semibold">{gymClass.location}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Capacity</span>
                                                <span className="font-semibold">
                                                    {Math.round((gymClass.enrolled / gymClass.capacity) * 100)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    style={{
                                                        width: `${(gymClass.enrolled / gymClass.capacity) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button variant="outline" className="flex-1 md:flex-initial">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                    {completedClasses.map((gymClass) => (
                        <Card key={gymClass.id} className="opacity-75">
                            <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold">{gymClass.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {gymClass.category}
                                                </p>
                                            </div>
                                            <Badge className="bg-gray-500/10 text-gray-700 dark:text-gray-400">
                                                {gymClass.status}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Date</p>
                                                    <p className="text-sm font-semibold">
                                                        {new Date(gymClass.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Time</p>
                                                    <p className="text-sm font-semibold">{gymClass.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Attended</p>
                                                    <p className="text-sm font-semibold">
                                                        {gymClass.enrolled}/{gymClass.capacity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Location</p>
                                                    <p className="text-sm font-semibold">{gymClass.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
