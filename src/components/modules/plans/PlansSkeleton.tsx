export function PlansPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-200 to-red-300 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Plans Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse"
          >
            {/* Header */}
            <div className="p-8 bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-6">
                <div className="h-12 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Features */}
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex-shrink-0"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
                </div>
              ))}

              {/* Stats */}
              <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 flex gap-3">
              <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 h-12 bg-gradient-to-r from-red-200 to-red-300 rounded-xl"></div>
            </div>

            {/* Toggle & Delete Buttons */}
            <div className="p-6 pt-0 bg-gray-50 flex gap-3">
              <div className="flex-1 h-12 bg-yellow-100 rounded-xl"></div>
              <div className="flex-1 h-12 bg-red-100 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Skeleton */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 text-center border-2 border-dashed border-gray-300">
        <div className="max-w-md mx-auto animate-pulse">
          <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 shadow-lg"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
          <div className="h-12 bg-gradient-to-r from-red-200 to-red-300 rounded-xl w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}