"use client";

import { useState, useEffect } from 'react';
import { Search, Star, Award, Users, Calendar, TrendingUp, Heart, MessageSquare, ArrowRight, Filter, Sparkles, CheckCircle, Globe, Zap, Target, Medal, Phone, Mail, UserCheck, Clock } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { TrainerService } from '@/services/trainer/trainer.service';
import { Trainer as TrainerType } from '@/types/trainer.types';

const gradients = [
  "from-primary to-secondary",
  "from-red-500 to-pink-600",
  "from-purple-500 to-indigo-600",
  "from-blue-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-yellow-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-purple-600",
];

export default function TrainerContent() {
  const [trainers, setTrainers] = useState<TrainerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'experienced'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'clients'>('rating');

  // Fetch trainers from API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await TrainerService.getAllTrainers({
          page: 1,
          limit: 50, // Get all trainers for public display
        });

        if (response.success && response.data) {
          setTrainers(response.data);
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

    fetchTrainers();
  }, []);

  const filteredTrainers = trainers
    .filter(trainer => {
      const matchesSearch =
        trainer.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (trainer.bio && trainer.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
        trainer.specializations?.some(s => s.specialization.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'available' && trainer.isAvailable) ||
        (selectedFilter === 'experienced' && trainer.experienceYears >= 7);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'experience': return b.experienceYears - a.experienceYears;
        case 'clients': return b.totalClients - a.totalClients;
        default: return 0;
      }
    });


  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading trainers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                Expert Trainers
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              Choose from our team of certified professionals dedicated to your fitness success
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search trainers by name, specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 lg:pb-0">
              {[
                { value: 'all', label: 'All Trainers', icon: Users },
                { value: 'available', label: 'Available', icon: UserCheck },
                { value: 'experienced', label: 'Most Experienced', icon: Medal }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSelectedFilter(value as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${selectedFilter === value
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="rating">Top Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="clients">Most Popular</option>
              </select>
            </div>
          </div>

          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            {filteredTrainers.length} trainers found
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTrainers.length === 0 ? (
            <div className="max-w-md mx-auto text-center p-12 bg-white dark:bg-zinc-900 rounded-3xl shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No trainers found</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                View All Trainers
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTrainers.map((trainer, index) => {
                const capacityPercentage = (trainer.currentClients / trainer.maxCapacity) * 100;
                const isFull = capacityPercentage >= 100;

                return (
                  <div
                    key={trainer.id}
                    className="group relative bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-zinc-200 dark:border-zinc-800"
                  >
                    {/* Gradient Header */}
                    <div className={`relative h-48 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden`}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                      {/* Gradient Orbs */}
                      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />

                      {/* Profile Image */}
                      <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2">
                        <div className="relative">
                          <div className="w-28 h-28 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-zinc-900 group-hover:scale-110 transition-transform duration-500">
                            {trainer.user.profileImage ? (
                              <Image
                                src={trainer.user.profileImage}
                                alt={trainer.user.name}
                                width={100}
                                height={100}
                                className="w-24 h-24 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                                {trainer.user.name.charAt(0)}
                              </div>
                            )}
                          </div>

                          {/* Rating Badge */}
                          {trainer.rating > 0 && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800">
                              <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                              <span className="text-sm font-bold">{trainer.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {trainer.isAvailable ? (
                          <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/30">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs font-medium">Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-red-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/30">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs font-medium">Busy</span>
                          </div>
                        )}
                      </div>

                      {/* Employee ID */}
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/30">
                        <span className="text-xs font-medium">{trainer.employeeId}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-16 px-6 pb-6">
                      {/* Name & Specialization */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600 transition-all">
                          {trainer.user.name}
                        </h3>
                        {trainer.specializations && trainer.specializations.length > 0 && (
                          <div className="flex flex-wrap gap-1 justify-center">
                            {trainer.specializations.map((spec) => (
                              <span
                                key={spec.id}
                                className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium"
                              >
                                {spec.specialization.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 text-center">
                        {trainer.bio}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-3 text-center">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{trainer.experienceYears}</div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400">Years</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-3 text-center">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">{trainer.totalClients}</div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400">Clients</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-3 text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{trainer.successRate}%</div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400">Success</div>
                        </div>
                      </div>

                      {/* Capacity Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-zinc-600 dark:text-zinc-400">Capacity</span>
                          <span className={`font-medium ${isFull ? 'text-red-600' : 'text-green-600'}`}>
                            {trainer.currentClients}/{trainer.maxCapacity}
                          </span>
                        </div>
                        <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isFull ? 'bg-red-500' : 'bg-gradient-to-r from-green-400 to-green-600'
                              }`}
                            style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <Globe className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          <span>{trainer.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <MessageSquare className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          <span>{trainer.reviewCount} Reviews</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <Calendar className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          <span>Joined {formatDate(trainer.joinDate)}</span>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {trainer.certifications.slice(0, 2).map((cert, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                            >
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-zinc-700 dark:text-zinc-300">{cert}</span>
                            </div>
                          ))}
                          {trainer.certifications.length > 2 && (
                            <div className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">
                              +{trainer.certifications.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link href={`/trainers/${trainer.id}`}>
                        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-medium transition-all hover:shadow-lg group/btn">
                          View Profile
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}