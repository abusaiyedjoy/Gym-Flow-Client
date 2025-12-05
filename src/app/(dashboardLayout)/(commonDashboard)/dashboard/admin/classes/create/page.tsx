"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Calendar, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/shared/PageComponents";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateClassPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSaving(false);
        router.push("/dashboard/admin/classes");
    };

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <PageHeader
                    title="Create New Class"
                    description="Add a new class to the schedule"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Information</CardTitle>
                            <CardDescription>Basic details about the class</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="className">Class Name *</Label>
                                <Input id="className" placeholder="e.g., HIIT Cardio Blast" />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cardio">Cardio</SelectItem>
                                            <SelectItem value="strength">Strength Training</SelectItem>
                                            <SelectItem value="flexibility">Flexibility</SelectItem>
                                            <SelectItem value="hiit">HIIT</SelectItem>
                                            <SelectItem value="yoga">Yoga</SelectItem>
                                            <SelectItem value="pilates">Pilates</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                                    <Select>
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
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    placeholder="Describe the class, its goals, and what participants can expect..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule & Capacity</CardTitle>
                            <CardDescription>Set the class schedule and limits</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Days of Week *</Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {daysOfWeek.map((day) => (
                                        <div key={day} className="flex items-center space-x-2">
                                            <Checkbox id={day} />
                                            <Label htmlFor={day} className="text-sm font-normal cursor-pointer">
                                                {day.slice(0, 3)}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="startTime">Start Time *</Label>
                                    <Input id="startTime" type="time" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (min) *</Label>
                                    <Input id="duration" type="number" placeholder="60" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Max Capacity *</Label>
                                    <Input id="capacity" type="number" placeholder="20" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" placeholder="e.g., Studio A, Main Floor" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Trainer Assignment</CardTitle>
                            <CardDescription>Assign a trainer to this class</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="trainer">Trainer *</Label>
                                <Select>
                                    <SelectTrigger id="trainer">
                                        <SelectValue placeholder="Select trainer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="T-001">David Martinez</SelectItem>
                                        <SelectItem value="T-002">Sarah Johnson</SelectItem>
                                        <SelectItem value="T-003">Michael Chen</SelectItem>
                                        <SelectItem value="T-004">Emily Rodriguez</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button onClick={handleSave} disabled={isSaving} className="w-full">
                                {isSaving ? (
                                    "Saving..."
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Create Class
                                    </>
                                )}
                            </Button>
                            <Button variant="outline" onClick={() => router.back()} className="w-full">
                                Cancel
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Set recurring schedule</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>Define max capacity</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Specify duration</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
