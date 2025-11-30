"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, Award, Users, Calendar, TrendingUp, Heart, MessageSquare, ArrowRight, Filter, Sparkles, CheckCircle } from "lucide-react";
import Image from 'next/image';

const trainers = [
  {
    id: 1,
    name: "Rahul Ahmed",
    specialization: "Weight Training & Nutrition",
    experience: "6 Years",
    rating: 4.9,
    reviews: 245,
    successRate: 92,
    clients: 150,
    certifications: ["NASM-CPT", "Nutrition Specialist", "Strength Coach"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-orange-500 to-red-600",
    availability: "Mon, Wed, Fri",
    price: "৳3,500/month",
    featured: true,
    languages: ["Bengali", "English"],
    achievements: ["Best Trainer 2023", "500+ Transformations"],
    bio: "Passionate about helping clients achieve their strength and nutrition goals through personalized programs."
  },
  {
    id: 2,
    name: "Fatima Khan",
    specialization: "Yoga & Mindfulness",
    experience: "8 Years",
    rating: 5.0,
    reviews: 312,
    successRate: 96,
    clients: 200,
    certifications: ["RYT-500", "Meditation Teacher", "Prenatal Yoga"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-red-500 to-orange-600",
    availability: "Tue, Thu, Sat",
    price: "৳3,000/month",
    featured: true,
    languages: ["Bengali", "English", "Hindi"],
    achievements: ["Yoga Master Award", "300+ Students"],
    bio: "Dedicated to helping individuals find balance through yoga and meditation practices."
  },
  {
    id: 3,
    name: "Arif Hossain",
    specialization: "CrossFit & Functional Training",
    experience: "7 Years",
    rating: 4.8,
    reviews: 189,
    successRate: 90,
    clients: 120,
    certifications: ["CF-L2", "Strength Coach", "Olympic Lifting"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-orange-600 to-red-500",
    availability: "Mon-Fri",
    price: "৳4,000/month",
    featured: false,
    languages: ["Bengali", "English"],
    achievements: ["CrossFit Regional Coach", "100+ Athletes Trained"],
    bio: "Specializing in high-intensity functional training for maximum performance."
  },
  {
    id: 4,
    name: "Nadia Islam",
    specialization: "Zumba & Dance Fitness",
    experience: "5 Years",
    rating: 4.9,
    reviews: 267,
    successRate: 94,
    clients: 180,
    certifications: ["Zumba Instructor", "Dance Coach", "Aerobics Specialist"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-red-600 to-orange-500",
    availability: "Mon, Wed, Fri",
    price: "৳2,500/month",
    featured: true,
    languages: ["Bengali", "English"],
    achievements: ["Dance Fitness Expert", "5000+ Classes"],
    bio: "Making fitness fun through energetic dance-based workouts and Zumba classes."
  },
  {
    id: 5,
    name: "Kamal Uddin",
    specialization: "Boxing & Combat Sports",
    experience: "9 Years",
    rating: 4.9,
    reviews: 201,
    successRate: 88,
    clients: 100,
    certifications: ["Boxing Coach", "MMA Trainer", "Sports Conditioning"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-orange-500 to-red-600",
    availability: "Tue, Thu, Sat",
    price: "৳4,500/month",
    featured: false,
    languages: ["Bengali", "English"],
    achievements: ["National Boxing Coach", "15+ Champions"],
    bio: "Former professional boxer with expertise in combat sports and conditioning."
  },
  {
    id: 6,
    name: "Sadia Rahman",
    specialization: "Nutrition & Wellness",
    experience: "6 Years",
    rating: 5.0,
    reviews: 298,
    successRate: 95,
    clients: 220,
    certifications: ["Registered Dietitian", "Wellness Coach", "Sports Nutrition"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-red-500 to-orange-600",
    availability: "Mon-Sat",
    price: "৳3,000/month",
    featured: true,
    languages: ["Bengali", "English"],
    achievements: ["Top Nutritionist", "1000+ Diet Plans"],
    bio: "Helping clients achieve their health goals through evidence-based nutrition plans."
  },
  {
    id: 7,
    name: "Tanvir Ahmed",
    specialization: "HIIT & Cardio Training",
    experience: "4 Years",
    rating: 4.7,
    reviews: 156,
    successRate: 89,
    clients: 95,
    certifications: ["HIIT Specialist", "Cardio Coach", "Personal Trainer"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-orange-600 to-red-500",
    availability: "Mon, Wed, Fri",
    price: "৳2,800/month",
    featured: false,
    languages: ["Bengali", "English"],
    achievements: ["HIIT Expert", "200+ Transformations"],
    bio: "High-energy trainer focused on explosive cardio workouts and fat loss."
  },
  {
    id: 8,
    name: "Lamia Sultana",
    specialization: "Pilates & Core Training",
    experience: "5 Years",
    rating: 4.8,
    reviews: 178,
    successRate: 91,
    clients: 110,
    certifications: ["Pilates Instructor", "Core Specialist", "Rehabilitation"],
    imgUrl: "/Images/profile1.jpg",
    gradient: "from-red-600 to-orange-500",
    availability: "Tue, Thu, Sat",
    price: "৳3,200/month",
    featured: false,
    languages: ["Bengali", "English"],
    achievements: ["Pilates Master", "Injury Recovery Expert"],
    bio: "Specializing in core strengthening and injury rehabilitation through Pilates."
  }
];

const specializations = ["All", "Weight Training", "Yoga", "CrossFit", "Dance", "Boxing", "Nutrition", "HIIT", "Pilates"];
const sortOptions = ["Top Rated", "Most Experienced", "Most Popular", "Price: Low to High", "Price: High to Low"];

export default function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [sortBy, setSortBy] = useState('Top Rated');
  const [viewMode, setViewMode] = useState('all'); // all, featured

  const filteredTrainers = trainers
    .filter(trainer => {
      const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialization = selectedSpecialization === 'All' ||
        trainer.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());
      const matchesView = viewMode === 'all' || (viewMode === 'featured' && trainer.featured);
      return matchesSearch && matchesSpecialization && matchesView;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Top Rated': return b.rating - a.rating;
        case 'Most Experienced': return parseInt(b.experience) - parseInt(a.experience);
        case 'Most Popular': return b.clients - a.clients;
        case 'Price: Low to High': return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'Price: High to Low': return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
                Expert Trainers
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              Choose from our team of certified professionals who are dedicated to helping you achieve your fitness goals
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search trainers by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Tabs Section */}
      <section className="mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <TabsList className="bg-zinc-100 dark:bg-zinc-900">
                <TabsTrigger value="all" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white">
                  All Trainers ({trainers.length})
                </TabsTrigger>
                <TabsTrigger value="featured" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Featured ({trainers.filter(t => t.featured).length})
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-zinc-900">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-zinc-900">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Tabs>

          <div className="mt-3 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
            <span>{filteredTrainers.length} trainers found</span>
            {(searchQuery || selectedSpecialization !== 'All') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialization('All');
                }}
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTrainers.length === 0 ? (
            <Card className="max-w-md mx-auto text-center p-12">
              <div className="text-6xl mb-4">🔍</div>
              <CardTitle className="mb-2">No trainers found</CardTitle>
              <CardDescription className="mb-6">
                Try adjusting your search or filters
              </CardDescription>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialization('All');
                  setViewMode('all');
                }}
                className="bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              >
                View All Trainers
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTrainers.map((trainer) => (
                <Card
                  key={trainer.id}
                  className="group pt-0 hover:shadow-2xl transition-all duration-500 overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-orange-500/30"
                >
                  {/* Header with Gradient */}
                  <div className={`relative h-40 bg-linear-to-br ${trainer.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[20px_20px] opacity-50" />

                    {/* Profile Circle */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-2 border-white/50">
                        <Image
                          src={trainer.imgUrl}
                          alt={trainer.name}
                          height={100}
                          width={100}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </div>

                      {/* Rating Badge */}
                      <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900">
                        <Star className="w-3 h-3 fill-orange-500 text-orange-500 mr-1" />
                        {trainer.rating}
                      </Badge>
                    </div>

                    {/* Featured Badge */}
                    {trainer.featured && (
                      <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white border-white/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-500 group-hover:to-red-600 transition-all">
                      {trainer.name}
                    </CardTitle>
                    <CardDescription className="text-orange-600 dark:text-orange-400 font-medium">
                      {trainer.specialization}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 pb-3">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-2 text-center">
                        <div className="text-lg font-bold text-zinc-900 dark:text-white">{trainer.experience}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">Experience</div>
                      </div>
                      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-2 text-center">
                        <div className="text-lg font-bold bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                          {trainer.successRate}%
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">Success</div>
                      </div>
                    </div>

                    {/* Info Items */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>{trainer.clients} Active Clients</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <MessageSquare className="w-4 h-4 text-orange-500" />
                        <span>{trainer.reviews} Reviews</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>{trainer.availability}</span>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1">
                      {trainer.certifications.slice(0, 2).map((cert, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                      {trainer.certifications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{trainer.certifications.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">Starting from</span>
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">{trainer.price}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2 pt-0">
                    <Button className="flex-1 bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white group/btn">
                      View Profile
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}