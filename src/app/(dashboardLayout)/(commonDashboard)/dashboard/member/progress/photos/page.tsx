"use client";

import { useState } from "react";
import { Upload, Calendar, Trash2, Eye, Download, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";

interface ProgressPhoto {
    id: string;
    date: string;
    category: "Front" | "Side" | "Back";
    imageUrl: string;
    weight: number;
    notes?: string;
}

const mockPhotos: ProgressPhoto[] = [
    {
        id: "P-001",
        date: "2024-12-01",
        category: "Front",
        imageUrl: "/progress/front-dec.jpg",
        weight: 185,
        notes: "Starting to see definition in abs",
    },
    {
        id: "P-002",
        date: "2024-12-01",
        category: "Side",
        imageUrl: "/progress/side-dec.jpg",
        weight: 185,
    },
    {
        id: "P-003",
        date: "2024-12-01",
        category: "Back",
        imageUrl: "/progress/back-dec.jpg",
        weight: 185,
    },
    {
        id: "P-004",
        date: "2024-11-01",
        category: "Front",
        imageUrl: "/progress/front-nov.jpg",
        weight: 190,
    },
    {
        id: "P-005",
        date: "2024-11-01",
        category: "Side",
        imageUrl: "/progress/side-nov.jpg",
        weight: 190,
    },
    {
        id: "P-006",
        date: "2024-11-01",
        category: "Back",
        imageUrl: "/progress/back-nov.jpg",
        weight: 190,
    },
];

export default function ProgressPhotosPage() {
    const [photos, setPhotos] = useState<ProgressPhoto[]>(mockPhotos);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", "Front", "Side", "Back"];

    const filteredPhotos =
        selectedCategory === "All"
            ? photos
            : photos.filter((photo) => photo.category === selectedCategory);

    const groupedPhotos = filteredPhotos.reduce((acc, photo) => {
        const date = photo.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(photo);
        return acc;
    }, {} as Record<string, ProgressPhoto[]>);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            console.log("Files to upload:", files);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Progress Photos"
                description="Track your transformation with progress photos"
            />

            {/* Upload Section */}
            <Card className="border-primary/20">
                <CardHeader>
                    <CardTitle>Upload New Photos</CardTitle>
                    <CardDescription>
                        Take photos from the same angle and lighting for best comparison
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 hover:bg-muted/50 transition-colors cursor-pointer">
                        <input
                            type="file"
                            id="photo-upload"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <label
                            htmlFor="photo-upload"
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-semibold mb-2">Upload Progress Photos</p>
                            <p className="text-sm text-muted-foreground mb-4">
                                Click to browse or drag and drop
                            </p>
                            <Button type="button">
                                <Upload className="h-4 w-4 mr-2" />
                                Choose Files
                            </Button>
                        </label>
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Tips for Progress Photos:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Take photos at the same time of day</li>
                            <li>• Use the same lighting and location</li>
                            <li>• Wear the same clothing (or minimal clothing)</li>
                            <li>• Take front, side, and back views</li>
                            <li>• Relax your muscles for consistent comparison</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Photo Gallery */}
            <div className="space-y-8">
                {Object.entries(groupedPhotos)
                    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                    .map(([date, datePhotos]) => (
                        <Card key={date}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            {new Date(date).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Weight: {datePhotos[0].weight} lbs
                                        </CardDescription>
                                    </div>
                                    <Badge>{datePhotos.length} photos</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    {datePhotos.map((photo) => (
                                        <div
                                            key={photo.id}
                                            className="group relative aspect-3/4 bg-muted rounded-lg overflow-hidden"
                                        >
                                            {/* Placeholder for image */}
                                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
                                                <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-2 left-2">
                                                <Badge className="bg-black/50 backdrop-blur-sm">
                                                    {photo.category}
                                                </Badge>
                                            </div>

                                            {/* Hover Actions */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Button size="sm" variant="secondary">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="secondary">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {datePhotos[0].notes && (
                                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                        <p className="text-sm">
                                            <span className="font-semibold">Notes:</span> {datePhotos[0].notes}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
            </div>

            {/* Empty State */}
            {filteredPhotos.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No photos yet</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Start tracking your progress by uploading your first photos
                        </p>
                        <Button>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photos
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
