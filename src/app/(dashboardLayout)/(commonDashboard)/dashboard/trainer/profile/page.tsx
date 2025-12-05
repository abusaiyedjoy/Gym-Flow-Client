"use client";

import { useState } from "react";
import { User, Mail, Phone, Award, Dumbbell, Star, Calendar, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface TrainerProfile {
    id: string;
    employeeId: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
    bio: string;
    specialization: string[];
    certifications: string[];
    experienceYears: number;
    languages: string[];
    rating: number;
    reviewCount: number;
    totalClients: number;
    currentClients: number;
    maxCapacity: number;
    successRate: number;
    sessionsCompleted: number;
    availability: string[];
    hourlyRate: number;
    joinedDate: string;
    isAvailable: boolean;
}

const mockProfile: TrainerProfile = {
    id: "T-001",
    employeeId: "EMP-2023-1001",
    name: "David Martinez",
    email: "david.martinez@gym.com",
    phone: "+1 234 567 8900",
    profileImage: "/trainers/david.jpg",
    bio: "Certified personal trainer with 8 years of experience in strength training and body transformation. Passionate about helping clients achieve their fitness goals through personalized workout plans and nutritional guidance. Specialized in weight loss, muscle gain, and athletic performance enhancement.",
    specialization: ["Strength Training", "Weight Loss", "Muscle Gain", "Athletic Performance"],
    certifications: [
        "NASM Certified Personal Trainer",
        "Precision Nutrition Level 1",
        "CrossFit Level 2 Trainer",
        "Sports Nutrition Specialist",
        "TRX Suspension Training",
    ],
    experienceYears: 8,
    languages: ["English", "Spanish"],
    rating: 4.9,
    reviewCount: 127,
    totalClients: 45,
    currentClients: 42,
    maxCapacity: 50,
    successRate: 92.5,
    sessionsCompleted: 1240,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    hourlyRate: 80,
    joinedDate: "2019-06-15",
    isAvailable: true,
};

export default function TrainerProfilePage() {
    const [profile] = useState<TrainerProfile>(mockProfile);

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Profile"
                description="Manage your professional profile and credentials"
            />

            {/* Profile Header Card */}
            <Card className="border-primary/20">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src={profile.profileImage} alt={profile.name} />
                            <AvatarFallback className="text-3xl">
                                {profile.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-3xl font-bold">{profile.name}</h2>
                                <p className="text-muted-foreground mt-1">Professional Fitness Trainer</p>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {profile.specialization.map((spec) => (
                                    <Badge key={spec} className="bg-primary/10 text-primary">
                                        {spec}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-start">
                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-primary" />
                                    <span>{profile.experienceYears} years experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{profile.rating} ({profile.reviewCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Dumbbell className="h-4 w-4 text-primary" />
                                    <span>{profile.currentClients}/{profile.maxCapacity} clients</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <Link href="/dashboard/trainer/settings">
                                    <Button>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </Link>
                                <Button variant="outline">
                                    View Public Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <Dumbbell className="h-8 w-8 mx-auto text-primary" />
                            <div>
                                <p className="text-3xl font-bold">{profile.currentClients}</p>
                                <p className="text-sm text-muted-foreground">Current Clients</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <Calendar className="h-8 w-8 mx-auto text-primary" />
                            <div>
                                <p className="text-3xl font-bold">{profile.sessionsCompleted}</p>
                                <p className="text-sm text-muted-foreground">Sessions Completed</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <Star className="h-8 w-8 mx-auto text-yellow-400 fill-yellow-400" />
                            <div>
                                <p className="text-3xl font-bold">{profile.rating}</p>
                                <p className="text-sm text-muted-foreground">Average Rating</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <Award className="h-8 w-8 mx-auto text-primary" />
                            <div>
                                <p className="text-3xl font-bold">{profile.certifications.length}</p>
                                <p className="text-sm text-muted-foreground">Certifications</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <div className="h-8 w-8 mx-auto text-primary flex items-center justify-center font-bold text-lg">%</div>
                            <div>
                                <p className="text-3xl font-bold">{profile.successRate}%</p>
                                <p className="text-sm text-muted-foreground">Success Rate</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="about" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Me</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <p className="text-muted-foreground">{profile.bio}</p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h4 className="font-semibold mb-3">Contact Information</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{profile.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{profile.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3">Professional Details</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Employee ID:</span>
                                            <span className="font-medium">{profile.employeeId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Joined Date:</span>
                                            <span className="font-medium">{new Date(profile.joinedDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Languages:</span>
                                            <span className="font-medium">{profile.languages.join(", ")}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3">Capacity</h4>
                                    <div className="text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Current Clients:</span>
                                            <span className="font-medium">{profile.currentClients}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Max Capacity:</span>
                                            <span className="font-medium">{profile.maxCapacity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Availability:</span>
                                            <Badge variant={profile.isAvailable ? "default" : "secondary"}>
                                                {profile.isAvailable ? "Available" : "Unavailable"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3">Rate</h4>
                                    <div className="text-sm">
                                        <p className="text-2xl font-bold text-primary">${profile.hourlyRate}</p>
                                        <p className="text-muted-foreground">per session</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="certifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Professional Certifications</CardTitle>
                            <CardDescription>My credentials and qualifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {profile.certifications.map((cert, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-4 border rounded-lg"
                                    >
                                        <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-semibold">{cert}</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Certified Professional
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="availability">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Availability</CardTitle>
                            <CardDescription>Days available for training sessions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {[
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday",
                                ].map((day) => {
                                    const isAvailable = profile.availability.includes(day);
                                    return (
                                        <div
                                            key={day}
                                            className={`flex items-center justify-between p-4 border rounded-lg ${isAvailable ? "bg-green-500/5 border-green-500/20" : "opacity-50"
                                                }`}
                                        >
                                            <span className="font-semibold">{day}</span>
                                            <Badge
                                                variant={isAvailable ? "default" : "secondary"}
                                                className={isAvailable ? "bg-green-500" : ""}
                                            >
                                                {isAvailable ? "Available" : "Not Available"}
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-6">
                                <Button className="w-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Update Availability
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
