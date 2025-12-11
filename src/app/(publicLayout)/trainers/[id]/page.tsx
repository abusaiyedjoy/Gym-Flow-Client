"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    Star,
    Award,
    Users,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Clock,
    CheckCircle,
    TrendingUp,
    Target,
    Globe,
    Briefcase,
    Heart,
    MessageSquare,
    Loader2,
    AlertCircle,
    BadgeCheck,
    Activity,
} from 'lucide-react';
import { TrainerService } from '@/services/trainer/trainer.service';
import { Trainer } from '@/types/trainer.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const gradients = [
    "from-orange-500 to-red-600",
    "from-red-500 to-pink-600",
    "from-purple-500 to-indigo-600",
    "from-blue-500 to-cyan-600",
    "from-green-500 to-emerald-600",
    "from-yellow-500 to-orange-600",
];

export default function TrainerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const trainerId = params?.id as string;

    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrainerDetails = async () => {
            if (!trainerId) return;

            try {
                setLoading(true);
                setError(null);

                const data = await TrainerService.getTrainerById(trainerId);
                setTrainer(data);
            } catch (err) {
                console.error('Fetch trainer error:', err);
                setError(err instanceof Error ? err.message : 'Failed to load trainer details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainerDetails();
    }, [trainerId]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const capacityPercentage = trainer
        ? (trainer.currentClients / trainer.maxCapacity) * 100
        : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-orange-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading trainer details...</p>
                </div>
            </div>
        );
    }

    if (error || !trainer) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
                <div className="text-center max-w-md p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-lg">
                    <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Error Loading Trainer</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        {error || 'Trainer not found'}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button onClick={() => router.back()} variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const gradient = gradients[Math.floor(Math.random() * gradients.length)];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
            {/* Hero Section */}
            <div className="relative py-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-4">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl bg-white flex items-center justify-center overflow-hidden">
                                {trainer.user.profileImage ? (
                                    <Image
                                        src={trainer.user.profileImage}
                                        alt={trainer.user.name}
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-5xl font-bold">
                                        {trainer.user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            {trainer.isAvailable && (
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    Available
                                </div>
                            )}
                        </div>

                        {/* Trainer Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl md:text-5xl text-white font-bold">{trainer.user.name}</h1>
                                {trainer.user.isVerified && (
                                    <BadgeCheck className="w-8 h-8 text-white fill-white" />
                                )}
                            </div>
                            <p className="text-xl text-white/90 mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                {trainer.employeeId}
                            </p>

                            {/* Specializations */}
                            {trainer.specializations && trainer.specializations.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {trainer.specializations.map((spec) => (
                                        <Badge
                                            key={spec.id}
                                            variant="secondary"
                                            className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-sm px-3 py-1"
                                        >
                                            {spec.specialization.replace(/_/g, ' ')}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 fill-white" />
                                    <span className="font-semibold text-lg">{trainer.rating.toFixed(1)}</span>
                                    <span className="text-sm">({trainer.reviewCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    <span className="font-semibold">{trainer.experienceYears} Years Experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span className="font-semibold">{trainer.totalClients} Total Clients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-orange-600" />
                                    About Me
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    {trainer.bio || 'No bio available'}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Tabs for Additional Info */}
                        <Card>
                            <CardContent className="pt-6">
                                <Tabs defaultValue="specializations" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="specializations">Specializations</TabsTrigger>
                                        <TabsTrigger value="certifications">Certifications</TabsTrigger>
                                        <TabsTrigger value="availability">Availability</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="specializations" className="space-y-4 mt-6">
                                        {trainer.specializations && trainer.specializations.length > 0 ? (
                                            <div className="space-y-3">
                                                {trainer.specializations.map((spec) => (
                                                    <div
                                                        key={spec.id}
                                                        className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-semibold text-lg">
                                                                {spec.specialization.replace(/_/g, ' ')}
                                                            </h4>
                                                            <Badge variant="secondary">
                                                                Level {spec.proficiencyLevel}/10
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                                            <Clock className="w-4 h-4" />
                                                            {spec.yearsOfExperience} years of experience
                                                        </div>
                                                        <Progress
                                                            value={spec.proficiencyLevel * 10}
                                                            className="mt-3"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center text-zinc-500 py-8">
                                                No specializations listed
                                            </p>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="certifications" className="space-y-3 mt-6">
                                        {trainer.certifications && trainer.certifications.length > 0 ? (
                                            <div className="grid gap-3">
                                                {trainer.certifications.map((cert, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl"
                                                    >
                                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                        <span className="text-zinc-700 dark:text-zinc-300">
                                                            {cert}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center text-zinc-500 py-8">
                                                No certifications listed
                                            </p>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="availability" className="space-y-3 mt-6">
                                        {trainer.availability && trainer.availability.length > 0 ? (
                                            <div className="grid gap-3">
                                                {trainer.availability.map((slot) => (
                                                    <div
                                                        key={slot.id}
                                                        className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Calendar className="w-5 h-5 text-orange-600" />
                                                            <span className="font-medium">
                                                                {slot.dayOfWeek}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                                                {slot.startTime} - {slot.endTime}
                                                            </span>
                                                            <Badge
                                                                variant={slot.isAvailable ? 'default' : 'secondary'}
                                                            >
                                                                {slot.isAvailable ? 'Available' : 'Busy'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center text-zinc-500 py-8">
                                                No availability schedule set
                                            </p>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Reviews Section */}
                        {trainer.reviews && trainer.reviews.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-orange-600" />
                                        Client Reviews
                                    </CardTitle>
                                    <CardDescription>
                                        What clients say about {trainer.user.name}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {trainer.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center font-bold">
                                                        {review.member.user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{review.member.user.name}</p>
                                                        <p className="text-xs text-zinc-500">
                                                            {formatDate(review.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-zinc-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-zinc-700 dark:text-zinc-300">{review.comment}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Stats & Contact */}
                    <div className="space-y-6">
                        {/* Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-600 dark:text-zinc-400">Success Rate</span>
                                        <span className="font-bold text-green-600">
                                            {trainer.successRate}%
                                        </span>
                                    </div>
                                    <Progress value={trainer.successRate} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-600 dark:text-zinc-400">Capacity</span>
                                        <span className="font-bold">
                                            {trainer.currentClients}/{trainer.maxCapacity}
                                        </span>
                                    </div>
                                    <Progress value={capacityPercentage} className="h-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {trainer.currentClients}
                                        </div>
                                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                                            Active Clients
                                        </div>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                        <div className="text-2xl font-bold text-green-600">
                                            {trainer.totalClients}
                                        </div>
                                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                                            Total Trained
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <Mail className="w-5 h-5 text-orange-600" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-zinc-500">Email</p>
                                        <p className="text-sm font-medium truncate">{trainer.user.email}</p>
                                    </div>
                                </div>

                                {trainer.user.phone && (
                                    <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                        <Phone className="w-5 h-5 text-orange-600" />
                                        <div className="flex-1">
                                            <p className="text-xs text-zinc-500">Phone</p>
                                            <p className="text-sm font-medium">{trainer.user.phone}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <Globe className="w-5 h-5 text-orange-600" />
                                    <div className="flex-1">
                                        <p className="text-xs text-zinc-500">Languages</p>
                                        <p className="text-sm font-medium">
                                            {trainer.languages.join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <Calendar className="w-5 h-5 text-orange-600" />
                                    <div className="flex-1">
                                        <p className="text-xs text-zinc-500">Member Since</p>
                                        <p className="text-sm font-medium">{formatDate(trainer.joinDate)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* CTA Card */}
                        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-none">
                            <CardContent className="pt-6 space-y-4">
                                <h3 className="text-xl font-bold">Ready to Start?</h3>
                                <p className="text-white/90 text-sm">
                                    Book a session with {trainer.user.name.split(' ')[0]} and begin your
                                    fitness journey today!
                                </p>
                                <Button
                                    className="w-full bg-white text-orange-600 hover:bg-gray-100"
                                    size="lg"
                                    disabled={!trainer.isAvailable || trainer.currentClients >= trainer.maxCapacity}
                                >
                                    {trainer.currentClients >= trainer.maxCapacity
                                        ? 'Capacity Full'
                                        : !trainer.isAvailable
                                            ? 'Currently Unavailable'
                                            : 'Book a Session'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
