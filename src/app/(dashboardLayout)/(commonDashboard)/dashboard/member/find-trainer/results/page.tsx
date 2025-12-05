"use client";

import { useState } from "react";
import { Search, Star, Award, Dumbbell, Filter, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface Trainer {
    id: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
    specialization: string[];
    experience: number;
    rating: number;
    totalClients: number;
    bio: string;
    availability: string;
    price: number;
}

const mockTrainers: Trainer[] = [
    {
        id: "T-001",
        name: "David Martinez",
        email: "david.martinez@gym.com",
        phone: "+1 234 567 8900",
        profileImage: "/trainers/david.jpg",
        specialization: ["Strength Training", "Weight Loss", "Muscle Gain"],
        experience: 8,
        rating: 4.9,
        totalClients: 45,
        bio: "Certified personal trainer with 8 years of experience in strength training and body transformation.",
        availability: "Mon-Fri, 6AM-8PM",
        price: 80,
    },
    {
        id: "T-002",
        name: "Sarah Johnson",
        email: "sarah.johnson@gym.com",
        phone: "+1 234 567 8901",
        profileImage: "/trainers/sarah.jpg",
        specialization: ["HIIT", "Cardio", "Weight Loss"],
        experience: 6,
        rating: 4.8,
        totalClients: 38,
        bio: "High-energy trainer specializing in HIIT workouts and cardiovascular fitness.",
        availability: "Mon-Sat, 5AM-7PM",
        price: 70,
    },
    {
        id: "T-003",
        name: "Michael Chen",
        email: "michael.chen@gym.com",
        phone: "+1 234 567 8902",
        profileImage: "/trainers/michael.jpg",
        specialization: ["Yoga", "Flexibility", "Mindfulness"],
        experience: 10,
        rating: 5.0,
        totalClients: 52,
        bio: "Expert yoga instructor focusing on flexibility, balance, and mental wellness.",
        availability: "Tue-Sun, 7AM-6PM",
        price: 90,
    },
    {
        id: "T-004",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@gym.com",
        phone: "+1 234 567 8903",
        profileImage: "/trainers/emily.jpg",
        specialization: ["CrossFit", "Functional Training", "Athletic Performance"],
        experience: 7,
        rating: 4.7,
        totalClients: 40,
        bio: "CrossFit Level 2 trainer with expertise in functional movements and athletic performance.",
        availability: "Mon-Fri, 4PM-9PM",
        price: 75,
    },
    {
        id: "T-005",
        name: "James Wilson",
        email: "james.wilson@gym.com",
        phone: "+1 234 567 8904",
        profileImage: "/trainers/james.jpg",
        specialization: ["Powerlifting", "Strength", "Olympic Lifting"],
        experience: 12,
        rating: 4.9,
        totalClients: 35,
        bio: "Former competitive powerlifter with 12 years of coaching experience.",
        availability: "Wed-Sun, 6AM-3PM",
        price: 95,
    },
    {
        id: "T-006",
        name: "Lisa Thompson",
        email: "lisa.thompson@gym.com",
        phone: "+1 234 567 8905",
        profileImage: "/trainers/lisa.jpg",
        specialization: ["Pilates", "Core Strength", "Posture Correction"],
        experience: 9,
        rating: 4.8,
        totalClients: 42,
        bio: "Certified Pilates instructor specializing in core strength and postural alignment.",
        availability: "Mon-Sat, 8AM-5PM",
        price: 85,
    },
];

export default function TrainerSearchResultsPage() {
    const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>("All");

    const specializations = ["All", "Strength Training", "HIIT", "Yoga", "CrossFit", "Weight Loss", "Pilates"];

    const filteredTrainers = trainers.filter((trainer) => {
        const matchesSearch =
            trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trainer.specialization.some((spec) =>
                spec.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesSpecialization =
            selectedSpecialization === "All" ||
            trainer.specialization.includes(selectedSpecialization);
        return matchesSearch && matchesSpecialization;
    });

    return (
        <div className="space-y-6">
            <PageHeader
                title="Find a Trainer"
                description="Browse our expert trainers and find your perfect match"
            />

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or specialization..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline" className="md:w-auto">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>

                    {/* Specialization Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {specializations.map((spec) => (
                            <Button
                                key={spec}
                                variant={selectedSpecialization === spec ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedSpecialization(spec)}
                            >
                                {spec}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? "s" : ""} found
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Button variant="outline" size="sm">
                        Highest Rated
                    </Button>
                </div>
            </div>

            {/* Trainer Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTrainers.map((trainer) => (
                    <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={trainer.profileImage} alt={trainer.name} />
                                    <AvatarFallback>
                                        {trainer.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{trainer.name}</CardTitle>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{trainer.rating}</span>
                                        <span className="text-sm text-muted-foreground">
                                            ({trainer.totalClients} clients)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">{trainer.bio}</p>

                            {/* Specializations */}
                            <div className="flex flex-wrap gap-1">
                                {trainer.specialization.slice(0, 3).map((spec) => (
                                    <Badge key={spec} variant="secondary" className="text-xs">
                                        {spec}
                                    </Badge>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{trainer.experience}+ years</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{trainer.totalClients} clients</span>
                                </div>
                            </div>

                            {/* Price and Availability */}
                            <div className="pt-3 border-t space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Rate</span>
                                    <span className="font-semibold">${trainer.price}/session</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Availability</span>
                                    <span className="text-xs">{trainer.availability}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                <Link href={`/dashboard/member/trainers/${trainer.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full" size="sm">
                                        View Profile
                                    </Button>
                                </Link>
                                <Button className="flex-1" size="sm">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    Book
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredTrainers.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Search className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No trainers found</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Try adjusting your search or filters
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedSpecialization("All");
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
