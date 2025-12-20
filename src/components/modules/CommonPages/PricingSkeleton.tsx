// Skeleton Loader Component
export const PricingCardSkeleton = ({ isPopular = false }: { isPopular?: boolean }) => {
  return (
    <div className={`relative ${isPopular ? "lg:scale-105" : ""}`}>
      {/* Popular Badge Skeleton */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="h-8 w-40 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse" />
        </div>
      )}

      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-zinc-800 animate-pulse">
        <div className="relative p-8">
          {/* Icon & Member Count Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded" />
              <div className="w-6 h-4 bg-gray-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>

          {/* Plan Name Skeleton */}
          <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-2" />
          <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded mb-6" />

          {/* Price Skeleton */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-1">
              <div className="h-12 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-6 w-20 bg-gray-200 dark:bg-zinc-800 rounded" />
            </div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>

          {/* PT Sessions Badge Skeleton */}
          <div className="mb-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-xl">
            <div className="h-5 w-40 bg-gray-200 dark:bg-zinc-700 rounded" />
          </div>

          {/* Features Skeleton */}
          <div className="space-y-3 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded-full flex-shrink-0" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="h-14 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl" />
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-zinc-700 dark:to-zinc-600" />
      </div>
    </div>
  );
}