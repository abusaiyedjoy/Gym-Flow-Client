"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import { Progress } from "@/components/ui/progress";

interface Review {
    id: string;
    memberId: string;
    clientName: string;
    clientImage?: string;
    rating: number; // 1-5
    comment: string;
    tags: string[]; // ["Professional", "Motivating", "Knowledgeable"]
    isVerified: boolean;
    date: string;
    helpful: number;
}

const mockReviews: Review[] = [
    {
        id: "R-001",
        memberId: "M-001",
        clientName: "John Doe",
        clientImage: "/members/john.jpg",
        rating: 5,
        comment:
            "David is an exceptional trainer! His knowledge and dedication have helped me lose 20 lbs in 3 months. He creates personalized workouts that challenge me while keeping me motivated. Highly recommend!",
        tags: ["Professional", "Motivating", "Knowledgeable"],
        isVerified: true,
        date: "2024-11-15",
        helpful: 12,
    },
    {
        id: "R-002",
        memberId: "M-002",
        clientName: "Sarah Johnson",
        clientImage: "/members/sarah.jpg",
        rating: 5,
        comment:
            "Best trainer I've ever worked with. Very professional and knows exactly how to push you to achieve your goals. The workout plans are well-structured and effective.",
        tags: ["Professional", "Results-Oriented", "Supportive"],
        isVerified: true,
        date: "2024-11-10",
        helpful: 8,
    },
    {
        id: "R-003",
        memberId: "M-003",
        clientName: "Michael Chen",
        clientImage: "/members/michael.jpg",
        rating: 4,
        comment:
            "Great trainer with excellent technique knowledge. I've seen significant improvements in my strength. Would give 5 stars if sessions were a bit longer.",
        tags: ["Knowledgeable", "Patient"],
        isVerified: true,
        date: "2024-11-05",
        helpful: 5,
    },
    {
        id: "R-004",
        memberId: "M-004",
        clientName: "Emily Rodriguez",
        clientImage: "/members/emily.jpg",
        rating: 5,
        comment:
            "David's approach to training is perfect for beginners. He takes time to explain each exercise and ensures proper form. Very patient and encouraging!",
        tags: ["Patient", "Encouraging", "Detail-Oriented"],
        isVerified: true,
        date: "2024-10-28",
        helpful: 15,
    },
    {
        id: "R-005",
        memberId: "M-005",
        clientName: "James Wilson",
        clientImage: "/members/james.jpg",
        rating: 5,
        comment:
            "Incredible results in just 2 months! David's nutrition advice combined with the training program has transformed my body. Couldn't ask for a better trainer.",
        tags: ["Results-Oriented", "Holistic Approach", "Motivating"],
        isVerified: true,
        date: "2024-10-20",
        helpful: 10,
    },
];

export default function ReviewsPage() {
    const [reviews] = useState<Review[]>(mockReviews);
    const [filterRating, setFilterRating] = useState<number | null>(null);

    const filteredReviews = filterRating
        ? reviews.filter((r) => r.rating === filterRating)
        : reviews;

    const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((r) => r.rating === rating).length,
        percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
    }));

    return (
        <div className="space-y-6">
            <PageHeader
                title="Client Reviews"
                description="Feedback and ratings from your clients"
            />

            {/* Overview Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-primary/20">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2">
                                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                                <p className="text-4xl font-bold">{averageRating.toFixed(1)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Average Rating</p>
                            <div className="flex items-center justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= Math.round(averageRating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <MessageSquare className="h-8 w-8 mx-auto text-primary" />
                            <p className="text-4xl font-bold">{reviews.length}</p>
                            <p className="text-sm text-muted-foreground">Total Reviews</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <ThumbsUp className="h-8 w-8 mx-auto text-primary" />
                            <p className="text-4xl font-bold">
                                {Math.round(
                                    (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100
                                )}%
                            </p>
                            <p className="text-sm text-muted-foreground">Positive Reviews</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Rating Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle>Rating Distribution</CardTitle>
                    <CardDescription>Breakdown of client ratings</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {ratingDistribution.map((item) => (
                            <div key={item.rating} className="flex items-center gap-4">
                                <div className="flex items-center gap-1 w-20">
                                    <span className="font-semibold">{item.rating}</span>
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                </div>
                                <Progress value={item.percentage} className="flex-1 h-2" />
                                <span className="text-sm text-muted-foreground w-16 text-right">
                                    {item.count} ({Math.round(item.percentage)}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Filter */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold">Filter by rating:</span>
                        <div className="flex gap-2">
                            <Button
                                variant={filterRating === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterRating(null)}
                            >
                                All
                            </Button>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <Button
                                    key={rating}
                                    variant={filterRating === rating ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterRating(rating)}
                                >
                                    {rating} <Star className="h-3 w-3 ml-1" />
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <Card key={review.id}>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={review.clientImage} alt={review.clientName} />
                                    <AvatarFallback>
                                        {review.clientName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold">{review.clientName}</p>
                                                {review.isVerified && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Verified
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(review.date).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-4 w-4 ${star <= review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-muted-foreground"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground">{review.comment}</p>

                                    {/* Tags */}
                                    {review.tags && review.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {review.tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-sm">
                                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                                            <ThumbsUp className="h-4 w-4" />
                                            <span>Helpful ({review.helpful})</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredReviews.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Star className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No reviews found</p>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your filters
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
