"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Copy, Eye, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface WorkoutPlan {
    id: string;
    name: string;
    description: string;
    category: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    daysPerWeek: number;
    assignedTo: number;
    createdDate: string;
}

const mockPlans: WorkoutPlan[] = [
    {
        id: "WP-001",
        name: "Weight Loss Program",
        description: "12-week progressive program focused on fat loss and cardiovascular health",
        category: "Weight Loss",
        difficulty: "Beginner",
        duration: "12 weeks",
        daysPerWeek: 4,
        assignedTo: 8,
        createdDate: "2024-01-15",
    },
    {
        id: "WP-002",
        name: "Muscle Building Blueprint",
        description: "8-week strength and hypertrophy focused program for muscle gain",
        category: "Muscle Gain",
        difficulty: "Advanced",
        duration: "8 weeks",
        daysPerWeek: 5,
        assignedTo: 12,
        createdDate: "2024-02-10",
    },
    {
        id: "WP-003",
        name: "Athletic Performance",
        description: "10-week program for improving athletic performance and explosiveness",
        category: "Athletic Performance",
        difficulty: "Intermediate",
        duration: "10 weeks",
        daysPerWeek: 6,
        assignedTo: 5,
        createdDate: "2024-03-05",
    },
    {
        id: "WP-004",
        name: "Beginner's Strength Foundation",
        description: "6-week introduction to strength training with proper form focus",
        category: "Strength Training",
        difficulty: "Beginner",
        duration: "6 weeks",
        daysPerWeek: 3,
        assignedTo: 15,
        createdDate: "2024-04-20",
    },
];

export default function WorkoutPlansPage() {
    const [plans, setPlans] = useState<WorkoutPlan[]>(mockPlans);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState<string>("All");

    const filteredPlans = plans.filter((plan) => {
        const matchesSearch =
            plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plan.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty =
            filterDifficulty === "All" || plan.difficulty === filterDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Intermediate":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "Advanced":
                return "bg-red-500/10 text-red-700 dark:text-red-400";
            default:
                return "";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Workout Plans"
                    description="Create and manage personalized workout programs"
                />
                <Link href="/dashboard/trainer/workout-plans/create">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Plan
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Plans</p>
                            <p className="text-2xl font-bold">{plans.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Active Assignments</p>
                            <p className="text-2xl font-bold">
                                {plans.reduce((sum, plan) => sum + plan.assignedTo, 0)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Most Popular</p>
                            <p className="text-sm font-bold line-clamp-1">
                                {plans.sort((a, b) => b.assignedTo - a.assignedTo)[0]?.name}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">This Month</p>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search workout plans..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                                <Button
                                    key={difficulty}
                                    variant={filterDifficulty === difficulty ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterDifficulty(difficulty)}
                                >
                                    {difficulty}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Plans Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredPlans.map((plan) => (
                    <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                                </div>
                                <Badge className={getDifficultyColor(plan.difficulty)}>
                                    {plan.difficulty}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Category</span>
                                <span className="font-semibold">{plan.category}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Duration</span>
                                <span className="font-semibold">{plan.duration}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Training Days</span>
                                <span className="font-semibold">{plan.daysPerWeek} days/week</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Assigned To</span>
                                <Badge variant="secondary">{plan.assignedTo} clients</Badge>
                            </div>

                            <div className="flex gap-2 pt-4 border-t">
                                <Link href={`/dashboard/trainer/workout-plans/${plan.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full" size="sm">
                                        <Eye className="h-3 w-3 mr-2" />
                                        View
                                    </Button>
                                </Link>
                                <Link href={`/dashboard/trainer/workout-plans/${plan.id}/edit`}>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-3 w-3 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                    <Copy className="h-3 w-3 mr-2" />
                                    Clone
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredPlans.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Search className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No workout plans found</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Try adjusting your search or filters
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("");
                                setFilterDifficulty("All");
                            }}
                        >
                            Clear Filters
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
