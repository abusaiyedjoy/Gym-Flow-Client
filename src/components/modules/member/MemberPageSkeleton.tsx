export function MembersPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-6 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-red-200 rounded w-28"></div>
              <div className="h-8 w-8 bg-red-200 rounded"></div>
            </div>
            <div className="h-8 bg-red-200 rounded w-16 mb-2"></div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-red-200 rounded w-20"></div>
              <div className="h-10 bg-red-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50 border-b">
              <tr>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <th key={i} className="px-6 py-3 text-left">
                    <div className="h-4 bg-red-200 rounded w-20"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-red-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-red-200 rounded w-32"></div>
                        <div className="h-3 bg-red-200 rounded w-20"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-red-200 rounded w-40"></div>
                      <div className="h-3 bg-red-200 rounded w-28"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-red-200 rounded w-24"></div>
                      <div className="h-3 bg-red-200 rounded w-28"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-red-200 rounded w-28"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-red-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-red-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-8 w-8 bg-red-200 rounded"
                        ></div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="bg-red-50 px-6 py-4 border-t flex items-center justify-between">
          <div className="h-4 bg-red-200 rounded w-48"></div>
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-red-200 rounded"></div>
            <div className="h-9 w-32 bg-red-200 rounded"></div>
            <div className="h-9 w-24 bg-red-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
