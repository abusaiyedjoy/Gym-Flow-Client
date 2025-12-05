"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Edit,
    Copy,
    Trash2,
    Download,
    Users,
    Calendar,
    Target,
    TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Exercise {
    name: string;
    sets: number;
    reps: string;
    rest: string;
    notes?: string;
}

interface WorkoutDay {
    day: number;
    name: string;
    focus: string;
    exercises: Exercise[];
}

interface AssignedClient {
    id: string;
    name: string;
    image?: string;
    startDate: string;
    progress: number;
    completedWorkouts: number;
    totalWorkouts: number;
}

const mockPlan = {
    id: "WP-001",
    name: "Advanced Strength Training Program",
    description:
        "A comprehensive 12-week program designed to build maximum strength and muscle mass. This plan incorporates progressive overload principles and periodization.",
    category: "Strength Training",
    difficulty: "Advanced",
    duration: 12,
    daysPerWeek: 5,
    createdDate: "2024-10-15",
    updatedDate: "2024-11-20",
    assignedClients: 12,
    completionRate: 78,
};

const mockWorkoutDays: WorkoutDay[] = [
    {
        day: 1,
        name: "Day 1",
        focus: "Upper Body - Push",
        exercises: [
            {
                name: "Barbell Bench Press",
                sets: 4,
                reps: "6-8",
                rest: "2-3 min",
                notes: "Focus on explosive concentric phase",
            },
            {
                name: "Incline Dumbbell Press",
                sets: 4,
                reps: "8-10",
                rest: "90 sec",
            },
            {
                name: "Overhead Press",
                sets: 4,
                reps: "6-8",
                rest: "2 min",
            },
            {
                name: "Cable Flyes",
                sets: 3,
                reps: "12-15",
                rest: "60 sec",
            },
            {
                name: "Tricep Dips",
                sets: 3,
                reps: "10-12",
                rest: "60 sec",
            },
        ],
    },
    {
        day: 2,
        name: "Day 2",
        focus: "Lower Body - Squat Focus",
        exercises: [
            {
                name: "Barbell Back Squat",
                sets: 5,
                reps: "5-6",
                rest: "3 min",
                notes: "Heavy weight, perfect form",
            },
            {
                name: "Romanian Deadlift",
                sets: 4,
                reps: "8-10",
                rest: "2 min",
            },
            {
                name: "Leg Press",
                sets: 3,
                reps: "12-15",
                rest: "90 sec",
            },
            {
                name: "Walking Lunges",
                sets: 3,
                reps: "12/leg",
                rest: "60 sec",
            },
        ],
    },
    {
        day: 3,
        name: "Day 3",
        focus: "Upper Body - Pull",
        exercises: [
            {
                name: "Deadlift",
                sets: 5,
                reps: "5-6",
                rest: "3 min",
            },
            {
                name: "Pull-ups",
                sets: 4,
                reps: "8-10",
                rest: "2 min",
            },
            {
                name: "Barbell Rows",
                sets: 4,
                reps: "8-10",
                rest: "90 sec",
            },
            {
                name: "Face Pulls",
                sets: 3,
                reps: "15-20",
                rest: "60 sec",
            },
            {
                name: "Barbell Curls",
                sets: 3,
                reps: "10-12",
                rest: "60 sec",
            },
        ],
    },
];

const mockAssignedClients: AssignedClient[] = [
    {
        id: "C-001",
        name: "John Doe",
        image: "/members/john.jpg",
        startDate: "2024-11-01",
        progress: 75,
        completedWorkouts: 36,
        totalWorkouts: 48,
    },
    {
        id: "C-002",
        name: "Sarah Johnson",
        image: "/members/sarah.jpg",
        startDate: "2024-10-28",
        progress: 82,
        completedWorkouts: 40,
        totalWorkouts: 48,
    },
    {
        id: "C-003",
        name: "Michael Chen",
        image: "/members/michael.jpg",
        startDate: "2024-11-05",
        progress: 65,
        completedWorkouts: 31,
        totalWorkouts: 48,
    },
];

export default function WorkoutPlanDetailPage() {
    const router = useRouter();
    const [plan] = useState(mockPlan);
    const [workoutDays] = useState(mockWorkoutDays);
    const [assignedClients] = useState(mockAssignedClients);

    const handleEdit = () => {
        router.push(`/dashboard/trainer/workout-plans/${plan.id}/edit`);
    };

    const handleClone = () => {
        // Logic to clone the plan
        console.log("Cloning plan...");
    };

    const handleDelete = () => {
        // Logic to delete the plan
        console.log("Deleting plan...");
    };

    const handleExport = () => {
        // Logic to export plan as PDF
        console.log("Exporting plan...");
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case "beginner":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "intermediate":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "advanced":
                return "bg-red-500/10 text-red-700 dark:text-red-400";
            default:
                return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
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
                            <h1 className="text-3xl font-bold">{plan.name}</h1>
                            <Badge className={getDifficultyColor(plan.difficulty)}>
                                {plan.difficulty}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClone}>
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                    </Button>
                    <Button size="sm" onClick={handleEdit}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
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
                                <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{plan.duration}</p>
                                <p className="text-sm text-muted-foreground">Weeks</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Target className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{plan.daysPerWeek}</p>
                                <p className="text-sm text-muted-foreground">Days/Week</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{plan.assignedClients}</p>
                                <p className="text-sm text-muted-foreground">Assigned Clients</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{plan.completionRate}%</p>
                                <p className="text-sm text-muted-foreground">Completion Rate</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="workouts" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="workouts">Workout Days</TabsTrigger>
                    <TabsTrigger value="clients">Assigned Clients</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                {/* Workout Days Tab */}
                <TabsContent value="workouts" className="space-y-4">
                    {workoutDays.map((day) => (
                        <Card key={day.day}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{day.name}</CardTitle>
                                        <CardDescription>{day.focus}</CardDescription>
                                    </div>
                                    <Badge variant="outline">
                                        {day.exercises.length} Exercises
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {day.exercises.map((exercise, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 p-4 border rounded-lg"
                                        >
                                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{exercise.name}</h4>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                    <span>
                                                        <span className="font-medium text-foreground">
                                                            {exercise.sets}
                                                        </span>{" "}sets
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        <span className="font-medium text-foreground">
                                                            {exercise.reps}
                                                        </span>{" "}reps
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        <span className="font-medium text-foreground">
                                                            {exercise.rest}
                                                        </span>{" "}rest
                                                    </span>
                                                </div>
                                                {exercise.notes && (
                                                    <p className="text-sm text-muted-foreground mt-2">
                                                        💡 {exercise.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* Assigned Clients Tab */}
                <TabsContent value="clients" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {assignedClients.map((client) => (
                            <Card key={client.id}>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={client.image} alt={client.name} />
                                            <AvatarFallback>
                                                {client.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <h3 className="font-semibold">{client.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Started {new Date(client.startDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Progress</span>
                                                    <span className="font-semibold">{client.progress}%</span>
                                                </div>
                                                <Progress value={client.progress} className="h-2" />
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Workouts Completed
                                                </span>
                                                <span className="font-semibold">
                                                    {client.completedWorkouts}/{client.totalWorkouts}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Details Tab */}
                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Plan Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label className="text-sm text-muted-foreground">Category</Label>
                                    <p className="font-semibold mt-1">{plan.category}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Difficulty</Label>
                                    <p className="font-semibold mt-1">{plan.difficulty}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Created Date</Label>
                                    <p className="font-semibold mt-1">
                                        {new Date(plan.createdDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Last Updated</Label>
                                    <p className="font-semibold mt-1">
                                        {new Date(plan.updatedDate).toLocaleDateString()}
                                    </p>
                                </div>
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
