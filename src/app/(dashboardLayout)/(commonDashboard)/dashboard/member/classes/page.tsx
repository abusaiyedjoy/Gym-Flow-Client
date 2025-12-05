"use client";

import { useState } from "react";
import { Activity, Calendar, Clock, Users, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface GymClass {
    id: string;
    name: string;
    description: string;
    instructor: string;
    instructorImage?: string;
    schedule: string;
    duration: number;
    capacity: number;
    enrolled: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
    category: string;
    location: string;
    isBooked: boolean;
}

const mockClasses: GymClass[] = [
    {
        id: "1",
        name: "HIIT Cardio Blast",
        description: "High-intensity interval training to boost your metabolism and burn calories",
        instructor: "Sarah Johnson",
        schedule: "Mon, Wed, Fri - 6:00 AM",
        duration: 45,
        capacity: 20,
        enrolled: 15,
        difficulty: "Intermediate",
        category: "Cardio",
        location: "Studio A",
        isBooked: true,
    },
    {
        id: "2",
        name: "Power Yoga Flow",
        description: "Build strength and flexibility through dynamic yoga sequences",
        instructor: "Mike Chen",
        schedule: "Tue, Thu - 7:00 AM",
        duration: 60,
        capacity: 15,
        enrolled: 12,
        difficulty: "Intermediate",
        category: "Yoga",
        location: "Studio B",
        isBooked: false,
    },
    {
        id: "3",
        name: "Strength Training 101",
        description: "Learn proper form and technique for weightlifting",
        instructor: "David Martinez",
        schedule: "Mon, Wed - 5:00 PM",
        duration: 60,
        capacity: 12,
        enrolled: 10,
        difficulty: "Beginner",
        category: "Strength",
        location: "Gym Floor",
        isBooked: false,
    },
    {
        id: "4",
        name: "Spin Cycle",
        description: "Energetic indoor cycling class with motivating music",
        instructor: "Emily White",
        schedule: "Tue, Thu, Sat - 6:30 AM",
        duration: 45,
        capacity: 25,
        enrolled: 20,
        difficulty: "All Levels",
        category: "Cardio",
        location: "Spin Studio",
        isBooked: true,
    },
    {
        id: "5",
        name: "Pilates Core",
        description: "Strengthen your core and improve posture",
        instructor: "Lisa Anderson",
        schedule: "Wed, Fri - 9:00 AM",
        duration: 50,
        capacity: 15,
        enrolled: 8,
        difficulty: "Beginner",
        category: "Pilates",
        location: "Studio B",
        isBooked: false,
    },
    {
        id: "6",
        name: "Boxing Fitness",
        description: "Learn boxing techniques while getting a full-body workout",
        instructor: "James Brown",
        schedule: "Mon, Thu - 6:00 PM",
        duration: 60,
        capacity: 16,
        enrolled: 14,
        difficulty: "Advanced",
        category: "Combat",
        location: "Studio A",
        isBooked: false,
    },
];

const categories = ["All", "Cardio", "Strength", "Yoga", "Pilates", "Combat"];

export default function MemberClassesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activeTab, setActiveTab] = useState("available");

    const filteredClasses = mockClasses.filter(
        (cls) => selectedCategory === "All" || cls.category === selectedCategory
    );

    const availableClasses = filteredClasses.filter((cls) => !cls.isBooked);
    const bookedClasses = filteredClasses.filter((cls) => cls.isBooked);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Intermediate":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "Advanced":
                return "bg-red-500/10 text-red-700 dark:text-red-400";
            default:
                return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
        }
    };

    const ClassCard = ({ gymClass }: { gymClass: GymClass }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg">{gymClass.name}</CardTitle>
                        <CardDescription className="mt-1">{gymClass.description}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(gymClass.difficulty)}>
                        {gymClass.difficulty}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{gymClass.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{gymClass.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{gymClass.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{gymClass.location}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm">
                        <span className="font-medium">{gymClass.enrolled}</span>
                        <span className="text-muted-foreground">/{gymClass.capacity} enrolled</span>
                    </div>
                    {gymClass.isBooked ? (
                        <Button variant="outline" disabled>
                            Booked
                        </Button>
                    ) : (
                        <Link href={`/dashboard/member/classes/book/${gymClass.id}`}>
                            <Button size="sm">
                                Book Now
                            </Button>
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Classes"
                description="Browse and book group fitness classes"
            />

            {/* Category Filter */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Classes Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="available">
                        Available ({availableClasses.length})
                    </TabsTrigger>
                    <TabsTrigger value="booked">
                        My Classes ({bookedClasses.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="mt-6">
                    {availableClasses.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {availableClasses.map((gymClass) => (
                                <ClassCard key={gymClass.id} gymClass={gymClass} />
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No classes available</h3>
                                <p className="text-muted-foreground text-center">
                                    No classes match your current filter. Try selecting a different category.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="booked" className="mt-6">
                    {bookedClasses.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {bookedClasses.map((gymClass) => (
                                <ClassCard key={gymClass.id} gymClass={gymClass} />
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No booked classes</h3>
                                <p className="text-muted-foreground text-center mb-4">
                                    You haven't booked any classes yet. Browse available classes to get started!
                                </p>
                                <Button onClick={() => setActiveTab("available")}>Browse Classes</Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}