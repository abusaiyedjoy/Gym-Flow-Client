"use client";

import { useState } from "react";
import { Clock, Users, MapPin, Calendar, User, AlertCircle, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface ClassSchedule {
    id: string;
    date: string;
    time: string;
    duration: number;
    availableSlots: number;
    totalSlots: number;
}

interface ClassDetails {
    id: string;
    name: string;
    category: string;
    description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    instructor: {
        name: string;
        image?: string;
        bio: string;
    };
    schedule: ClassSchedule[];
    benefits: string[];
    requirements: string[];
    location: string;
}

const mockClass: ClassDetails = {
    id: "CLS-001",
    name: "High-Intensity Interval Training",
    category: "Cardio",
    description:
        "A challenging HIIT workout that combines cardio and strength training to maximize calorie burn and improve cardiovascular fitness. Perfect for those looking to push their limits and achieve maximum results in minimal time.",
    difficulty: "Intermediate",
    instructor: {
        name: "Sarah Johnson",
        image: "/instructors/sarah.jpg",
        bio: "Certified HIIT instructor with 6 years of experience. Specializes in high-energy workouts that deliver results.",
    },
    schedule: [
        {
            id: "SCH-001",
            date: "2024-12-06",
            time: "06:00 AM",
            duration: 45,
            availableSlots: 5,
            totalSlots: 20,
        },
        {
            id: "SCH-002",
            date: "2024-12-06",
            time: "05:00 PM",
            duration: 45,
            availableSlots: 8,
            totalSlots: 20,
        },
        {
            id: "SCH-003",
            date: "2024-12-08",
            time: "06:00 AM",
            duration: 45,
            availableSlots: 12,
            totalSlots: 20,
        },
        {
            id: "SCH-004",
            date: "2024-12-08",
            time: "05:00 PM",
            duration: 45,
            availableSlots: 3,
            totalSlots: 20,
        },
    ],
    benefits: [
        "Burns up to 500 calories in 45 minutes",
        "Improves cardiovascular endurance",
        "Builds lean muscle mass",
        "Boosts metabolism for hours after workout",
        "Increases strength and power",
    ],
    requirements: [
        "Basic fitness level required",
        "Comfortable workout attire",
        "Water bottle",
        "Towel",
        "Athletic shoes",
    ],
    location: "Studio A - Second Floor",
};

export default function BookClassPage() {
    const [classDetails] = useState<ClassDetails>(mockClass);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
    const [isBooking, setIsBooking] = useState(false);

    const handleBooking = async () => {
        if (!selectedSchedule) return;

        setIsBooking(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsBooking(false);
        console.log("Booking confirmed for schedule:", selectedSchedule);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Intermediate":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "Advanced":
                return "bg-red-500/10 text-red-700 dark:text-red-400";
            default:
                return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Book Class"
                description="Select a time slot and confirm your booking"
            />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Class Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{classDetails.name}</CardTitle>
                                    <CardDescription className="mt-2">
                                        {classDetails.category}
                                    </CardDescription>
                                </div>
                                <Badge className={getDifficultyColor(classDetails.difficulty)}>
                                    {classDetails.difficulty}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">{classDetails.description}</p>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-semibold">{classDetails.schedule[0].duration} min</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Class Size</p>
                                        <p className="font-semibold">Max {classDetails.schedule[0].totalSlots}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-semibold">{classDetails.location}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Instructor */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Instructor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={classDetails.instructor.image} />
                                    <AvatarFallback>
                                        {classDetails.instructor.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg">{classDetails.instructor.name}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {classDetails.instructor.bio}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Benefits & Requirements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="benefits">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                                </TabsList>
                                <TabsContent value="benefits" className="space-y-3 mt-4">
                                    {classDetails.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <div className="mt-0.5 p-0.5 bg-green-500 rounded-full shrink-0">
                                                <Check className="h-3 w-3 text-white" />
                                            </div>
                                            <span className="text-sm">{benefit}</span>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="requirements" className="space-y-3 mt-4">
                                    {classDetails.requirements.map((requirement, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                            <span className="text-sm">{requirement}</span>
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Booking Sidebar */}
                <div className="space-y-6">
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Select Time Slot</CardTitle>
                            <CardDescription>Choose your preferred class time</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {classDetails.schedule.map((schedule) => {
                                const isSelected = selectedSchedule === schedule.id;
                                const isFull = schedule.availableSlots === 0;
                                const isLowAvailability = schedule.availableSlots <= 3;

                                return (
                                    <button
                                        key={schedule.id}
                                        onClick={() => !isFull && setSelectedSchedule(schedule.id)}
                                        disabled={isFull}
                                        className={`w-full p-4 border rounded-lg text-left transition-all ${isFull
                                                ? "opacity-50 cursor-not-allowed"
                                                : isSelected
                                                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                                                    : "hover:border-primary/50"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-semibold">
                                                        {new Date(schedule.date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm">{schedule.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {schedule.availableSlots} / {schedule.totalSlots} spots
                                                    </span>
                                                </div>
                                            </div>
                                            {isFull ? (
                                                <Badge variant="destructive">Full</Badge>
                                            ) : isLowAvailability ? (
                                                <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
                                                    Low spots
                                                </Badge>
                                            ) : null}
                                        </div>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* Booking Summary */}
                    {selectedSchedule && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Class</span>
                                        <span className="font-medium text-right">{classDetails.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Date & Time</span>
                                        <span className="font-medium">
                                            {new Date(
                                                classDetails.schedule.find((s) => s.id === selectedSchedule)?.date || ""
                                            ).toLocaleDateString()}{" "}
                                            {classDetails.schedule.find((s) => s.id === selectedSchedule)?.time}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-medium">{classDetails.schedule[0].duration} min</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Location</span>
                                        <span className="font-medium">{classDetails.location}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <Button
                                        onClick={handleBooking}
                                        disabled={isBooking}
                                        className="w-full"
                                    >
                                        {isBooking ? "Booking..." : "Confirm Booking"}
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center mt-3">
                                        You can cancel up to 2 hours before the class
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Cancellation Policy */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Cancellation Policy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Free cancellation up to 2 hours before class</li>
                                <li>• Late cancellations may incur a fee</li>
                                <li>• No-shows will be charged full price</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
