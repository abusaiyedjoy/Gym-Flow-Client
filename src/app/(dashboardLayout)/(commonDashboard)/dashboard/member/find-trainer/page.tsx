"use client";

import { useState } from "react";
import { Target, Zap, Brain, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, EmptyState } from "@/components/shared/PageComponents";
import Link from "next/link";

interface Trainer {
    id: string;
    name: string;
    profileImage: string;
    specializations: string[];
    rating: number;
    experience: string;
    availableSlots: number;
    pricePerSession: number;
}

const mockTrainers: Trainer[] = [
    {
        id: "1",
        name: "Mike Johnson",
        profileImage: "/Images/avatar-placeholder.png",
        specializations: ["Strength Training", "Bodybuilding", "Weight Loss"],
        rating: 4.8,
        experience: "8 years",
        availableSlots: 12,
        pricePerSession: 50,
    },
    {
        id: "2",
        name: "Sarah Williams",
        profileImage: "/Images/avatar-placeholder.png",
        specializations: ["Yoga", "Flexibility", "Mindfulness"],
        rating: 4.9,
        experience: "6 years",
        availableSlots: 8,
        pricePerSession: 45,
    },
    {
        id: "3",
        name: "David Chen",
        profileImage: "/Images/avatar-placeholder.png",
        specializations: ["HIIT", "Cardio", "Athletic Performance"],
        rating: 4.7,
        experience: "10 years",
        availableSlots: 15,
        pricePerSession: 55,
    },
];

export default function FindTrainerPage() {
    const [trainers] = useState<Trainer[]>(mockTrainers);
    const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

    const allSpecializations = Array.from(
        new Set(trainers.flatMap((t) => t.specializations))
    );

    const filteredTrainers = selectedSpec
        ? trainers.filter((t) => t.specializations.includes(selectedSpec))
        : trainers;

    const getSpecIcon = (spec: string) => {
        const iconMap: Record<string, any> = {
            "Strength Training": Zap,
            "HIIT": Target,
            "Yoga": Heart,
            "Mindfulness": Brain,
        };
        const Icon = iconMap[spec] || Target;
        return <Icon className="h-4 w-4" />;
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Find Your Perfect Trainer"
                description="Browse expert trainers and find the best match for your fitness goals"
            />

            {/* Filter by Specialization */}
            <Card>
                <CardHeader>
                    <CardTitle>Filter by Specialization</CardTitle>
                    <CardDescription>Choose a specialization to find matching trainers</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedSpec === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSpec(null)}
                        >
                            All Trainers
                        </Button>
                        {allSpecializations.map((spec) => (
                            <Button
                                key={spec}
                                variant={selectedSpec === spec ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedSpec(spec)}
                            >
                                {spec}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Trainers Grid */}
            {filteredTrainers.length === 0 ? (
                <EmptyState
                    title="No trainers found"
                    description="Try adjusting your filters to see more results"
                    icon={<Target className="h-12 w-12" />}
                    action={
                        <Button onClick={() => setSelectedSpec(null)}>Clear Filters</Button>
                    }
                />
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTrainers.map((trainer) => (
                        <Card key={trainer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={trainer.profileImage}
                                        alt={trainer.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <CardTitle className="text-xl">{trainer.name}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm text-muted-foreground">
                                                ⭐ {trainer.rating}
                                            </span>
                                            <span className="text-sm text-muted-foreground">•</span>
                                            <span className="text-sm text-muted-foreground">
                                                {trainer.experience}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium mb-2">Specializations:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {trainer.specializations.map((spec) => (
                                            <Badge key={spec} variant="secondary" className="text-xs">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Available Slots</span>
                                        <span className="font-medium">{trainer.availableSlots}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Price per Session</span>
                                        <span className="font-medium">${trainer.pricePerSession}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Link href={`/trainers/${trainer.id}`} className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            View Profile
                                        </Button>
                                    </Link>
                                    <Button className="flex-1">Book Now</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* AI Recommendation Card */}
            <Card className="border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI-Powered Recommendations
                    </CardTitle>
                    <CardDescription>
                        Get personalized trainer recommendations based on your fitness goals
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/dashboard/member/find-trainer/results">
                        <Button className="w-full">
                            Get AI Recommendations
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
