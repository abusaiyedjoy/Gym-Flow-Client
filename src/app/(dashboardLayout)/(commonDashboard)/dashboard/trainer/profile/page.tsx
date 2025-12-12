"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, Award, Dumbbell, Star, Calendar, Edit, Camera, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageComponents";
import { TrainerService } from "@/services/trainer/trainer.service";
import { UserService } from "@/services/user/user.service";
import { getMe } from "@/services/auth/auth.service";
import { Trainer, DayOfWeek } from "@/types/trainer.types";
import { toast } from "sonner";
import Link from "next/link";

const formatSpecialization = (spec: string) => {
    return spec.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
};

const getDayName = (day: DayOfWeek): string => {
    const dayMap: Record<DayOfWeek, string> = {
        [DayOfWeek.SUNDAY]: "Sunday",
        [DayOfWeek.MONDAY]: "Monday",
        [DayOfWeek.TUESDAY]: "Tuesday",
        [DayOfWeek.WEDNESDAY]: "Wednesday",
        [DayOfWeek.THURSDAY]: "Thursday",
        [DayOfWeek.FRIDAY]: "Friday",
        [DayOfWeek.SATURDAY]: "Saturday",
    };
    return dayMap[day];
};

export default function TrainerProfilePage() {
    const [profile, setProfile] = useState<Trainer | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getMe();

            if (!response.success || !response.data) {
                toast.error("Failed to fetch user information");
                return;
            }

            const userData = response.data;

            if (!userData.trainer?.id) {
                toast.error("Trainer profile not found");
                return;
            }

            const trainerData = await TrainerService.getTrainerById(userData.trainer.id);
            setProfile(trainerData);
        } catch (error: any) {
            console.error("Failed to fetch profile:", error);
            toast.error(error.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        try {
            setUploading(true);
            const response = await getMe();

            if (!response.success || !response.data?.id) {
                toast.error("User not found");
                return;
            }

            // Upload avatar
            const result = await UserService.uploadAvatar(response.data.id, file);

            // Update profile with new image
            if (profile) {
                setProfile({
                    ...profile,
                    user: {
                        ...profile.user,
                        profileImage: result.url
                    }
                });
            }

            toast.success("Profile picture updated successfully");
        } catch (error: any) {
            console.error("Failed to upload avatar:", error);
            toast.error(error.message || "Failed to upload profile picture");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <p className="text-muted-foreground">Failed to load profile</p>
                <Button onClick={fetchProfile}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Profile"
                description="Manage your professional profile and credentials"
            />

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* Profile Header Card */}
            <Card className="border-primary/20">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={profile.user.profileImage || undefined} alt={profile.user.name} />
                                <AvatarFallback className="text-3xl">
                                    {profile.user.name.split(" ").map((n: string) => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                                onClick={handleAvatarClick}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Camera className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-3xl font-bold">{profile.user.name}</h2>
                                <p className="text-muted-foreground mt-1">Professional Fitness Trainer</p>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {profile.specializations?.map((spec) => (
                                    <Badge key={spec.id} className="bg-primary/10 text-primary">
                                        {formatSpecialization(spec.specialization)}
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
                                    <span>{profile.rating.toFixed(1)} ({profile.reviewCount} reviews)</span>
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
                                <p className="text-3xl font-bold">{profile._count?.workoutPlans || 0}</p>
                                <p className="text-sm text-muted-foreground">Workout Plans</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <Star className="h-8 w-8 mx-auto text-yellow-400 fill-yellow-400" />
                            <div>
                                <p className="text-3xl font-bold">{profile.rating.toFixed(1)}</p>
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
                                <p className="text-3xl font-bold">{profile.successRate.toFixed(1)}%</p>
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
                                <p className="text-muted-foreground">{profile.bio || "No bio available"}</p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h4 className="font-semibold mb-3">Contact Information</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{profile.user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{profile.user.phone || "Not provided"}</span>
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
                                            <span className="font-medium">{new Date(profile.joinDate).toLocaleDateString()}</span>
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
                                    <h4 className="font-semibold mb-3">Experience</h4>
                                    <div className="text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Total Clients:</span>
                                            <span className="font-medium">{profile.totalClients}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Success Rate:</span>
                                            <span className="font-medium">{profile.successRate.toFixed(1)}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Reviews:</span>
                                            <span className="font-medium">{profile.reviewCount}</span>
                                        </div>
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
                                {Object.values(DayOfWeek).map((day) => {
                                    const dayAvailability = profile.availability?.filter(
                                        (avail) => avail.dayOfWeek === day
                                    );
                                    const isAvailable = dayAvailability && dayAvailability.length > 0;

                                    return (
                                        <div
                                            key={day}
                                            className={`flex flex-col p-4 border rounded-lg ${isAvailable
                                                ? "bg-green-500/5 border-green-500/20"
                                                : "opacity-50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">{getDayName(day)}</span>
                                                <Badge
                                                    variant={isAvailable ? "default" : "secondary"}
                                                    className={isAvailable ? "bg-green-500" : ""}
                                                >
                                                    {isAvailable ? "Available" : "Not Available"}
                                                </Badge>
                                            </div>
                                            {isAvailable && dayAvailability && (
                                                <div className="mt-2 text-sm text-muted-foreground">
                                                    {dayAvailability.map((slot, idx) => (
                                                        <div key={idx}>
                                                            {slot.startTime} - {slot.endTime}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
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
