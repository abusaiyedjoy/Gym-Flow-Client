"use client";

import { useState, useEffect, use } from "react";
import { Target, Zap, Brain, Heart, Star, Award, Users, Dumbbell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, EmptyState } from "@/components/shared/PageComponents";
import Link from "next/link";
import { TrainerService } from "@/services/trainer/trainer.service";
import { Trainer, Specialization } from "@/types/trainer.types";
import { BookTrainerDialog } from "@/components/modules/Payment/BookTrainerDialog";
import { Toaster } from "sonner";

export default function FindTrainerPage() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSpec, setSelectedSpec] = useState<Specialization | null>(null);
    const [minRating, setMinRating] = useState<number | undefined>(undefined);
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [showBookingDialog, setShowBookingDialog] = useState(false);



    const fetchTrainers = async (specialization?: Specialization, rating?: number) => {
        try {
            setLoading(true);
            setError(null);

            console.log("Fetching trainers with params:", { specialization, rating });

            const params: any = {
                page: 1,
                limit: 50, // Get more trainers for browsing
            };

            // Only add optional params if they have values
            if (specialization) {
                params.specialization = specialization;
            }
            if (rating) {
                params.minRating = rating;
            }

            const response = await TrainerService.getAllTrainers(params);

            console.log("Trainers response:", response);

            if (response.success && response.data) {
                // Filter to only show available trainers on frontend
                const availableTrainers = response.data.filter(trainer => trainer.isAvailable);
                setTrainers(availableTrainers);
            } else {
                setError("Failed to load trainers");
            }
        } catch (err) {
            console.error("Fetch trainers error:", err);
            setError(err instanceof Error ? err.message : "Failed to fetch trainers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers(selectedSpec || undefined, minRating);
    }, [selectedSpec, minRating]);

    const handleSpecializationChange = (spec: Specialization | null) => {
        setSelectedSpec(spec);
    };

    const handleRatingChange = (rating: number | undefined) => {
        setMinRating(rating);
    };

    const allSpecializations = Object.values(Specialization);

    const getSpecIcon = (spec: string) => {
        const iconMap: Record<string, any> = {
            "STRENGTH_TRAINING": Zap,
            "WEIGHT_TRAINING": Dumbbell,
            "CARDIO": Target,
            "YOGA": Heart,
            "CROSSFIT": Award,
            "SPORTS_SPECIFIC": Users,
        };
        const Icon = iconMap[spec] || Target;
        return <Icon className="h-4 w-4" />;
    };

    const handleBookTrainer = (trainer: Trainer) => {
        setSelectedTrainer(trainer);
        setShowBookingDialog(true);
    };

    const handleCloseBookingDialog = () => {
        setShowBookingDialog(false);
        setSelectedTrainer(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Find Your Perfect Trainer"
                description="Browse expert trainers and find the best match for your fitness goals"
            />

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-2">
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
                                onClick={() => handleSpecializationChange(null)}
                            >
                                All Trainers
                            </Button>
                            {allSpecializations.map((spec) => (
                                <Button
                                    key={spec}
                                    variant={selectedSpec === spec ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleSpecializationChange(spec)}
                                >
                                    {spec.replace(/_/g, " ")}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Filter by Rating */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter by Rating</CardTitle>
                        <CardDescription>Show trainers with minimum rating</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={minRating === undefined ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleRatingChange(undefined)}
                            >
                                All Ratings
                            </Button>
                            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                                <Button
                                    key={rating}
                                    variant={minRating === rating ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleRatingChange(rating)}
                                >
                                    {rating}+ ⭐
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Trainers Grid */}
            {trainers.length === 0 ? (
                <EmptyState
                    title="No trainers found"
                    description="Try adjusting your filters to see more results"
                    icon={<Target className="h-12 w-12" />}
                    action={
                        <Button onClick={() => {
                            setSelectedSpec(null);
                            setMinRating(undefined);
                        }}>
                            Clear Filters
                        </Button>
                    }
                />
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {trainers.length} trainer{trainers.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {trainers.map((trainer) => (
                            <Card key={trainer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start gap-4">
                                        {trainer.user.profileImage ? (
                                            <img
                                                src={trainer.user.profileImage}
                                                alt={trainer.user.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-2xl">
                                                {trainer.user.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <CardTitle className="text-xl">{trainer.user.name}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-medium">
                                                        {trainer.rating.toFixed(1)}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-muted-foreground">•</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {trainer.experienceYears} {trainer.experienceYears === 1 ? 'year' : 'years'}
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {trainer.reviewCount} reviews
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Bio */}
                                    {trainer.bio && (
                                        <div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {trainer.bio}
                                            </p>
                                        </div>
                                    )}

                                    {/* Specializations */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">Specializations:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {trainer.specializations && trainer.specializations.length > 0 ? (
                                                trainer.specializations.slice(0, 3).map((spec, idx) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                        {spec.specialization.replace(/_/g, " ")}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-muted-foreground">No specializations</span>
                                            )}
                                            {trainer.specializations && trainer.specializations.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{trainer.specializations.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    {trainer.certifications && trainer.certifications.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium mb-1">Certifications:</p>
                                            <p className="text-xs text-muted-foreground">
                                                {trainer.certifications.length} certification{trainer.certifications.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    )}

                                    {/* Languages */}
                                    {trainer.languages && trainer.languages.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium mb-1">Languages:</p>
                                            <p className="text-xs text-muted-foreground">
                                                {trainer.languages.join(", ")}
                                            </p>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Current Clients</span>
                                            <span className="font-medium">
                                                {trainer.currentClients} / {trainer.maxCapacity}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Availability</span>
                                            <Badge
                                                variant={trainer.isAvailable ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                {trainer.isAvailable ? "Available" : "Busy"}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Link href={`/dashboard/member/trainers/${trainer.id}`} className="flex-1">
                                            <Button variant="outline" className="w-full">
                                                View Profile
                                            </Button>
                                        </Link>
                                        <Button
                                            className="flex-1 cursor-pointer"
                                            disabled={!trainer.isAvailable || trainer.currentClients >= trainer.maxCapacity}
                                            onClick={() => handleBookTrainer(trainer)}
                                        >
                                            {trainer.currentClients >= trainer.maxCapacity ? "Full" : "Book Now"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            {/* AI Recommendation Card */}
            <Card className="border-primary bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        AI-Powered Recommendations
                    </CardTitle>
                    <CardDescription>
                        Get personalized trainer recommendations based on your fitness goals, experience level, and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/dashboard/member/find-trainer/results">
                        <Button className="w-full">
                            <Brain className="h-4 w-4 mr-2" />
                            Get AI Recommendations
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Booking Dialog */}
            {selectedTrainer && (
                <BookTrainerDialog
                    isOpen={showBookingDialog}
                    onClose={handleCloseBookingDialog}
                    trainer={selectedTrainer}
                    memberId={selectedTrainer.userId}
                />
            )}

            {/* Toast Notifications */}
            <Toaster position="top-right" richColors />
        </div>
    );
}