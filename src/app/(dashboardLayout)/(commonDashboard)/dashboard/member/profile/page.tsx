"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, MapPin, Heart, Activity, Target, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/userInfo";

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user info from /auth/me
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getUserInfo();

                if (!data) {
                    setError("Failed to load user information");
                    return;
                }

                setUserInfo(data);
            } catch (err: any) {
                console.error("Error fetching user info:", err);
                setError(err.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error || !userInfo) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <p className="text-red-600 font-semibold">Failed to load profile</p>
                    <p className="text-muted-foreground">{error || "User not found"}</p>
                </div>
            </div>
        );
    }

    // Extract member data
    const member = userInfo.member;

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
                            <AvatarImage src={userInfo.profileImage || ""} alt={userInfo.name} />
                            <AvatarFallback className="text-2xl">
                                {userInfo.name.split(" ").map((n: string) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                                <p className="text-muted-foreground">Member ID: {member?.employeeId || userInfo.id}</p>
                                <div className="flex gap-2 mt-2 justify-center md:justify-start">
                                    <Badge variant={userInfo.isActive ? "default" : "destructive"}>
                                        {userInfo.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                    <Badge variant={userInfo.isVerified ? "default" : "secondary"}>
                                        {userInfo.isVerified ? "Verified" : "Unverified"}
                                    </Badge>
                                    <Badge variant="outline">{userInfo.role}</Badge>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {member?.fitnessGoals && member.fitnessGoals.length > 0 ? (
                                    member.fitnessGoals.map((goal: string) => (
                                        <Badge key={goal} variant="secondary">
                                            {goal}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No fitness goals set</p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Joined {member?.joinDate ? new Date(member.joinDate).toLocaleDateString() : "N/A"}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Activity className="h-4 w-4" />
                                    {member?.workoutExperience || "Not specified"}
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
                                        <p className="font-medium">{userInfo.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{userInfo.phone || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                                    <p className="font-medium">
                                        {member?.dateOfBirth
                                            ? new Date(member.dateOfBirth).toLocaleDateString()
                                            : "Not provided"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Gender</p>
                                    <p className="font-medium">{member?.gender || "Not provided"}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Blood Group</p>
                                    <p className="font-medium">{member?.bloodGroup || "Not provided"}</p>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <p className="font-medium">{member?.address || "Not provided"}</p>
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
                                    <p className="font-medium">{member?.height ? `${member.height} cm` : "Not provided"}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Current Weight</p>
                                    <p className="font-medium">{member?.currentWeight ? `${member.currentWeight} kg` : "Not provided"}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Target Weight</p>
                                    <div className="flex items-center gap-2">
                                        <Target className="h-4 w-4 text-primary" />
                                        <p className="font-medium">{member?.targetWeight ? `${member.targetWeight} kg` : "Not set"}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Workout Experience</p>
                                    <Badge variant="outline">{member?.workoutExperience || "Not specified"}</Badge>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Weekly Frequency</p>
                                    <p className="font-medium">{member?.weeklyFrequency || 0} times per week</p>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Fitness Goals</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {member?.fitnessGoals && member.fitnessGoals.length > 0 ? (
                                            member.fitnessGoals.map((goal: string) => (
                                                <Badge key={goal} className="bg-primary/10 text-primary hover:bg-primary/20">
                                                    {goal}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No fitness goals set</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Preferred Workout Styles</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {member?.preferredWorkoutStyle && member.preferredWorkoutStyle.length > 0 ? (
                                            member.preferredWorkoutStyle.map((style: string) => (
                                                <Badge key={style} variant="secondary">
                                                    {style}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No workout styles set</p>
                                        )}
                                    </div>
                                </div>

                                {member?.healthConditions && member.healthConditions.length > 0 && (
                                    <div className="space-y-1 md:col-span-2">
                                        <p className="text-sm text-muted-foreground">Health Conditions</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {member.healthConditions.map((condition: string) => (
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
                                        <p className="font-medium">{member?.emergencyContactName || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Contact Number</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{member?.emergencyContact || "Not provided"}</p>
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