

export const TrainerCardSkeleton = () => {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-pulse">
      <div className="relative h-48 bg-gradient-to-br from-zinc-200 dark:from-zinc-800 to-zinc-300 dark:to-zinc-700">
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="w-28 h-28 bg-zinc-300 dark:bg-zinc-700 rounded-full border-4 border-white dark:border-zinc-900" />
        </div>

        <div className="absolute top-4 right-4">
          <div className="h-6 w-20 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
        </div>
        <div className="absolute top-4 left-4">
          <div className="h-6 w-16 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg mx-auto mb-3" />
        
        <div className="flex gap-2 justify-center mb-4">
          <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto" />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3">
              <div className="h-5 w-10 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto mb-1" />
              <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto" />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>

        <div className="space-y-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          ))}
        </div>

        <div className="flex gap-1 mb-4">
          <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>

        <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
}