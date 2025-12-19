import React from "react";

export default function TrainersLoading() {
    return (
        <div className="space-y-6 p-6 min-h-screen animate-pulse bg-white">
            {/* Header Skeleton */}
            <div className="h-10 w-1/3 bg-red-200 rounded mb-8" />
            {/* Stats Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-red-100 rounded-lg" />
                ))}
            </div>
            {/* Filters Skeleton */}
            <div className="h-24 bg-red-100 rounded-lg mb-6" />
            {/* Table Skeleton */}
            <div className="h-96 bg-red-100 rounded-lg" />
            {/* Pagination Skeleton */}
            <div className="h-10 w-full bg-red-100 rounded mt-6" />
        </div>
    );
}