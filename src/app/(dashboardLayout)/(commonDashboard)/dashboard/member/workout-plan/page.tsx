"use client";

import { useState } from "react";
import { Dumbbell, Calendar, Target, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageComponents";
import { Checkbox } from "@/components/ui/checkbox";

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: string;
    rest: string;
    completed: boolean;
    notes?: string;
}

interface WorkoutDay {
    day: string;
    focus: string;
    exercises: Exercise[];
    completed: boolean;
}

interface WorkoutPlan {
    id: string;
    name: string;
    description: string;
    trainerName: string;
    duration: string;
    goal: string;
    startDate: string;
    endDate: string;
    workoutDays: WorkoutDay[];
}

const mockWorkoutPlan: WorkoutPlan = {
    id: "WP-001",
    name: "Strength & Conditioning Program",
    description: "A comprehensive 8-week program designed to build strength and improve overall conditioning",
    trainerName: "David Martinez",
    duration: "8 weeks",
    goal: "Muscle Gain & Strength",
    startDate: "2024-11-01",
    endDate: "2024-12-27",
    workoutDays: [
        {
            day: "Monday",
            focus: "Chest & Triceps",
            completed: true,
            exercises: [
                {
                    id: "1",
                    name: "Barbell Bench Press",
                    sets: 4,
                    reps: "8-10",
                    rest: "90s",
                    completed: true,
                    notes: "Focus on controlled movement",
                },
                {
                    id: "2",
                    name: "Incline Dumbbell Press",
                    sets: 3,
                    reps: "10-12",
                    rest: "60s",
                    completed: true,
                },
                {
                    id: "3",
                    name: "Cable Flyes",
                    sets: 3,
                    reps: "12-15",
                    rest: "45s",
                    completed: true,
                },
                {
                    id: "4",
                    name: "Tricep Dips",
                    sets: 3,
                    reps: "10-12",
                    rest: "60s",
                    completed: true,
                },
                {
                    id: "5",
                    name: "Overhead Tricep Extension",
                    sets: 3,
                    reps: "12-15",
                    rest: "45s",
                    completed: true,
                },
            ],
        },
        {
            day: "Wednesday",
            focus: "Back & Biceps",
            completed: false,
            exercises: [
                {
                    id: "6",
                    name: "Deadlifts",
                    sets: 4,
                    reps: "6-8",
                    rest: "120s",
                    completed: false,
                    notes: "Maintain proper form",
                },
                {
                    id: "7",
                    name: "Pull-ups",
                    sets: 3,
                    reps: "8-10",
                    rest: "90s",
                    completed: false,
                },
                {
                    id: "8",
                    name: "Barbell Rows",
                    sets: 3,
                    reps: "10-12",
                    rest: "60s",
                    completed: false,
                },
                {
                    id: "9",
                    name: "Barbell Curls",
                    sets: 3,
                    reps: "10-12",
                    rest: "60s",
                    completed: false,
                },
                {
                    id: "10",
                    name: "Hammer Curls",
                    sets: 3,
                    reps: "12-15",
                    rest: "45s",
                    completed: false,
                },
            ],
        },
        {
            day: "Friday",
            focus: "Legs & Shoulders",
            completed: false,
            exercises: [
                {
                    id: "11",
                    name: "Squats",
                    sets: 4,
                    reps: "8-10",
                    rest: "120s",
                    completed: false,
                    notes: "Go deep, maintain form",
                },
                {
                    id: "12",
                    name: "Romanian Deadlifts",
                    sets: 3,
                    reps: "10-12",
                    rest: "90s",
                    completed: false,
                },
                {
                    id: "13",
                    name: "Leg Press",
                    sets: 3,
                    reps: "12-15",
                    rest: "60s",
                    completed: false,
                },
                {
                    id: "14",
                    name: "Overhead Press",
                    sets: 4,
                    reps: "8-10",
                    rest: "90s",
                    completed: false,
                },
                {
                    id: "15",
                    name: "Lateral Raises",
                    sets: 3,
                    reps: "12-15",
                    rest: "45s",
                    completed: false,
                },
            ],
        },
    ],
};

export default function WorkoutPlanPage() {
    const [workoutPlan] = useState<WorkoutPlan>(mockWorkoutPlan);
    const [selectedDay, setSelectedDay] = useState(workoutPlan.workoutDays[0]);

    const completedDays = workoutPlan.workoutDays.filter((d) => d.completed).length;
    const progressPercentage = (completedDays / workoutPlan.workoutDays.length) * 100;

    const completedExercises = selectedDay.exercises.filter((e) => e.completed).length;
    const dayProgress = (completedExercises / selectedDay.exercises.length) * 100;

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Workout Plan"
                description="Follow your personalized training program"
            />

            {/* Plan Overview */}
            <Card className="border-primary/20">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <CardTitle className="text-2xl">{workoutPlan.name}</CardTitle>
                            <CardDescription className="mt-2">{workoutPlan.description}</CardDescription>
                            <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Dumbbell className="h-4 w-4 text-primary" />
                                    <span>Trainer: {workoutPlan.trainerName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>{workoutPlan.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-primary" />
                                    <span>{workoutPlan.goal}</span>
                                </div>
                            </div>
                        </div>
                        <Badge className="bg-primary text-primary-foreground">
                            Active Plan
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Overall Progress</span>
                            <span className="font-medium">
                                {completedDays} / {workoutPlan.workoutDays.length} days completed
                            </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                    </div>
                </CardContent>
            </Card>

            {/* Workout Days */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Days List */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Workout Days</CardTitle>
                        <CardDescription>Select a day to view exercises</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {workoutPlan.workoutDays.map((day) => (
                            <button
                                key={day.day}
                                onClick={() => setSelectedDay(day)}
                                className={
                                    `w-full p-4 rounded-lg border text-left transition-colors ${selectedDay.day === day.day
                                        ? "border-primary bg-primary/5"
                                        : "hover:bg-muted"
                                    }`
                                }
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-semibold">{day.day}</p>
                                        <p className="text-sm text-muted-foreground">{day.focus}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {day.exercises.length} exercises
                                        </p>
                                    </div>
                                    {day.completed ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Exercise Details */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle>{selectedDay.day} - {selectedDay.focus}</CardTitle>
                                <CardDescription>
                                    {selectedDay.exercises.length} exercises
                                </CardDescription>
                            </div>
                            {selectedDay.completed && (
                                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                                    Completed
                                </Badge>
                            )}
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Day Progress</span>
                                <span className="font-medium">
                                    {completedExercises} / {selectedDay.exercises.length} exercises
                                </span>
                            </div>
                            <Progress value={dayProgress} className="h-2" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {selectedDay.exercises.map((exercise, index) => (
                            <div
                                key={exercise.id}
                                className={
                                    `p-4 rounded-lg border ${exercise.completed ? "bg-green-500/5 border-green-500/20" : ""
                                    }`
                                }
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold">{exercise.name}</h4>
                                                {exercise.notes && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        💡 {exercise.notes}
                                                    </p>
                                                )}
                                            </div>
                                            <Checkbox
                                                checked={exercise.completed}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">Sets:</span>
                                                <span className="font-medium">{exercise.sets}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">Reps:</span>
                                                <span className="font-medium">{exercise.reps}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">Rest:</span>
                                                <span className="font-medium">{exercise.rest}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!selectedDay.completed && (
                            <Button className="w-full" size="lg">
                                Mark Day as Complete
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}