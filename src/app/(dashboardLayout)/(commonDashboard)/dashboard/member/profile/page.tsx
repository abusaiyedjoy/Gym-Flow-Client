"use client";

import { useState } from "react";
import { User, Mail, Phone, Calendar, MapPin, Heart, Activity, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface MemberProfile {
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
    employeeId: string;
    dateOfBirth?: string;
    gender?: string;
    height?: number;
    currentWeight?: number;
    targetWeight?: number;
    bloodGroup?: string;
    address?: string;
    emergencyContact?: string;
    emergencyContactName?: string;
    fitnessGoals: string[];
    healthConditions: string[];
    workoutExperience: string;
    preferredWorkoutStyle: string[];
    weeklyFrequency: number;
    joinDate: string;
}

const mockProfile: MemberProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    profileImage: "/placeholder-avatar.jpg",
    employeeId: "MEM-001",
    dateOfBirth: "1990-01-15",
    gender: "Male",
    height: 175,
    currentWeight: 80,
    targetWeight: 75,
    bloodGroup: "O+",
    address: "123 Main St, New York, NY 10001",
    emergencyContact: "+1 234 567 8901",
    emergencyContactName: "Jane Doe",
    fitnessGoals: ["Weight Loss", "Muscle Gain", "Improve Endurance"],
    healthConditions: [],
    workoutExperience: "Intermediate",
    preferredWorkoutStyle: ["Strength Training", "Cardio"],
    weeklyFrequency: 4,
    joinDate: "2024-01-15",
};

export default function ProfilePage() {
    const [profile] = useState<MemberProfile>(mockProfile);

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Profile"
                description="Manage your personal information and fitness preferences"
            />

            {/* Profile Header Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Avatar className="h-24 w-24 md:h-32 md:w-32">
                            <AvatarImage src={profile.profileImage} alt={profile.name} />
                            <AvatarFallback className="text-2xl">
                                {profile.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold">{profile.name}</h2>
                                <p className="text-muted-foreground">Member ID: {profile.employeeId}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {profile.fitnessGoals.map((goal) => (
                                    <Badge key={goal} variant="secondary">
                                        {goal}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Activity className="h-4 w-4" />
                                    {profile.workoutExperience}
                                </div>
                            </div>

                            <Link href="/dashboard/member/profile/edit">
                                <Button>Edit Profile</Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="fitness">Fitness Profile</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency</TabsTrigger>
                </TabsList>

                {/* Personal Information */}
                <TabsContent value="personal" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Your personal and contact details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{profile.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{profile.phone}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                                    <p className="font-medium">
                                        {profile.dateOfBirth
                                            ? new Date(profile.dateOfBirth).toLocaleDateString()
                                            : "Not provided"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Gender</p>
                                    <p className="font-medium">{profile.gender || "Not provided"}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Blood Group</p>
                                    <p className="font-medium">{profile.bloodGroup || "Not provided"}</p>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <p className="font-medium">{profile.address || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Fitness Profile */}
                <TabsContent value="fitness" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Fitness Profile</CardTitle>
                            <CardDescription>Your fitness goals and preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Height</p>
                                    <p className="font-medium">{profile.height ? `${profile.height} cm` : "Not provided"}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Current Weight</p>
                                    <p className="font-medium">{profile.currentWeight ? `${profile.currentWeight} kg` : "Not provided"}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Target Weight</p>
                                    <div className="flex items-center gap-2">
                                        <Target className="h-4 w-4 text-primary" />
                                        <p className="font-medium">{profile.targetWeight ? `${profile.targetWeight} kg` : "Not set"}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Workout Experience</p>
                                    <Badge variant="outline">{profile.workoutExperience}</Badge>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Weekly Frequency</p>
                                    <p className="font-medium">{profile.weeklyFrequency} times per week</p>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Fitness Goals</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {profile.fitnessGoals.map((goal) => (
                                            <Badge key={goal} className="bg-primary/10 text-primary hover:bg-primary/20">
                                                {goal}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Preferred Workout Styles</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {profile.preferredWorkoutStyle.map((style) => (
                                            <Badge key={style} variant="secondary">
                                                {style}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {profile.healthConditions.length > 0 && (
                                    <div className="space-y-1 md:col-span-2">
                                        <p className="text-sm text-muted-foreground">Health Conditions</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {profile.healthConditions.map((condition) => (
                                                <Badge key={condition} variant="destructive">
                                                    {condition}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Emergency Contact */}
                <TabsContent value="emergency" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Emergency Contact</CardTitle>
                            <CardDescription>Contact information for emergencies</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Contact Name</p>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{profile.emergencyContactName || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Contact Number</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{profile.emergencyContact || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}