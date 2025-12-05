"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Save,
    Copy,
    GripVertical,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: string;
    rest: string;
    notes: string;
}

interface WorkoutDay {
    id: string;
    dayNumber: number;
    dayName: string;
    exercises: Exercise[];
    focus: string;
}

export default function CreateWorkoutPlanPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [planName, setPlanName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");
    const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([
        {
            id: "day-1",
            dayNumber: 1,
            dayName: "Day 1",
            focus: "Upper Body",
            exercises: [
                {
                    id: "ex-1",
                    name: "Bench Press",
                    sets: 4,
                    reps: "8-10",
                    rest: "90 sec",
                    notes: "Focus on controlled movement",
                },
            ],
        },
    ]);
    const [selectedClients, setSelectedClients] = useState<string[]>([]);

    const addWorkoutDay = () => {
        const newDay: WorkoutDay = {
            id: `day-${workoutDays.length + 1}`,
            dayNumber: workoutDays.length + 1,
            dayName: `Day ${workoutDays.length + 1}`,
            focus: "",
            exercises: [],
        };
        setWorkoutDays([...workoutDays, newDay]);
    };

    const removeWorkoutDay = (dayId: string) => {
        setWorkoutDays(workoutDays.filter((day) => day.id !== dayId));
    };

    const addExercise = (dayId: string) => {
        setWorkoutDays(
            workoutDays.map((day) => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        exercises: [
                            ...day.exercises,
                            {
                                id: `ex-${Date.now()}`,
                                name: "",
                                sets: 3,
                                reps: "10-12",
                                rest: "60 sec",
                                notes: "",
                            },
                        ],
                    };
                }
                return day;
            })
        );
    };

    const removeExercise = (dayId: string, exerciseId: string) => {
        setWorkoutDays(
            workoutDays.map((day) => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
                    };
                }
                return day;
            })
        );
    };

    const updateExercise = (
        dayId: string,
        exerciseId: string,
        field: keyof Exercise,
        value: any
    ) => {
        setWorkoutDays(
            workoutDays.map((day) => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        exercises: day.exercises.map((ex) => {
                            if (ex.id === exerciseId) {
                                return { ...ex, [field]: value };
                            }
                            return ex;
                        }),
                    };
                }
                return day;
            })
        );
    };

    const updateDayFocus = (dayId: string, focus: string) => {
        setWorkoutDays(
            workoutDays.map((day) => {
                if (day.id === dayId) {
                    return { ...day, focus };
                }
                return day;
            })
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSaving(false);
        router.push("/dashboard/trainer/workout-plans");
    };

    const mockClients = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Sarah Johnson" },
        { id: "3", name: "Michael Chen" },
        { id: "4", name: "Emily Rodriguez" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <PageHeader
                    title="Create Workout Plan"
                    description="Design a new workout plan for your clients"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Enter the basic details of your workout plan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="planName">Plan Name *</Label>
                                <Input
                                    id="planName"
                                    placeholder="e.g., Advanced Strength Training Program"
                                    value={planName}
                                    onChange={(e) => setPlanName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    rows={3}
                                    placeholder="Describe the goals and focus of this workout plan..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="strength">Strength Training</SelectItem>
                                            <SelectItem value="cardio">Cardio</SelectItem>
                                            <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                            <SelectItem value="muscle-building">Muscle Building</SelectItem>
                                            <SelectItem value="athletic">Athletic Performance</SelectItem>
                                            <SelectItem value="general">General Fitness</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                                    <Select value={difficulty} onValueChange={setDifficulty}>
                                        <SelectTrigger id="difficulty">
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (weeks) *</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    placeholder="e.g., 8"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Workout Days */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Workout Days</CardTitle>
                                    <CardDescription>
                                        Configure exercises for each training day
                                    </CardDescription>
                                </div>
                                <Button onClick={addWorkoutDay} size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Day
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {workoutDays.map((day, dayIndex) => (
                                <Card key={day.id} className="border-primary/20">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <h3 className="font-semibold">{day.dayName}</h3>
                                                    <Input
                                                        placeholder="e.g., Upper Body"
                                                        value={day.focus}
                                                        onChange={(e) =>
                                                            updateDayFocus(day.id, e.target.value)
                                                        }
                                                        className="mt-1 h-8 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => addExercise(day.id)}
                                                >
                                                    <Plus className="h-4 w-4 mr-1" />
                                                    Exercise
                                                </Button>
                                                {workoutDays.length > 1 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeWorkoutDay(day.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {day.exercises.map((exercise, exIndex) => (
                                            <div
                                                key={exercise.id}
                                                className="p-4 border rounded-lg space-y-3"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{exIndex + 1}</Badge>
                                                        <Input
                                                            placeholder="Exercise name"
                                                            value={exercise.name}
                                                            onChange={(e) =>
                                                                updateExercise(
                                                                    day.id,
                                                                    exercise.id,
                                                                    "name",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="flex-1"
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeExercise(day.id, exercise.id)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>

                                                <div className="grid gap-3 md:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Sets</Label>
                                                        <Input
                                                            type="number"
                                                            value={exercise.sets}
                                                            onChange={(e) =>
                                                                updateExercise(
                                                                    day.id,
                                                                    exercise.id,
                                                                    "sets",
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Reps</Label>
                                                        <Input
                                                            value={exercise.reps}
                                                            onChange={(e) =>
                                                                updateExercise(
                                                                    day.id,
                                                                    exercise.id,
                                                                    "reps",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="8-10"
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Rest</Label>
                                                        <Input
                                                            value={exercise.rest}
                                                            onChange={(e) =>
                                                                updateExercise(
                                                                    day.id,
                                                                    exercise.id,
                                                                    "rest",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="60 sec"
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <Label className="text-xs">Notes</Label>
                                                    <Input
                                                        value={exercise.notes}
                                                        onChange={(e) =>
                                                            updateExercise(
                                                                day.id,
                                                                exercise.id,
                                                                "notes",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Optional notes or tips..."
                                                        className="h-8"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        {day.exercises.length === 0 && (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <p>No exercises added yet</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => addExercise(day.id)}
                                                    className="mt-2"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add First Exercise
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full"
                            >
                                {isSaving ? (
                                    "Saving..."
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Plan
                                    </>
                                )}
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Copy className="h-4 w-4 mr-2" />
                                Save as Template
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.back()}
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Assign to Clients */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Assign to Clients</CardTitle>
                            <CardDescription>
                                Select clients who will use this plan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockClients.map((client) => (
                                <div key={client.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={client.id}
                                        checked={selectedClients.includes(client.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedClients([...selectedClients, client.id]);
                                            } else {
                                                setSelectedClients(
                                                    selectedClients.filter((id) => id !== client.id)
                                                );
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor={client.id}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {client.name}
                                    </Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Days:</span>
                                <span className="font-semibold">{workoutDays.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Exercises:</span>
                                <span className="font-semibold">
                                    {workoutDays.reduce(
                                        (sum, day) => sum + day.exercises.length,
                                        0
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Clients Selected:</span>
                                <span className="font-semibold">{selectedClients.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="font-semibold">
                                    {duration || "Not set"} weeks
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
