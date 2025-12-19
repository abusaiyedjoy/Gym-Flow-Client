import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PlansPageSkeleton } from "@/components/modules/plans/PlansSkeleton";
import { PlansPageContent } from "@/components/modules/plans/PlansPageContent";

export default function AdminPlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Membership Plans</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your membership offerings</p>
          </div>
          <Link href="/dashboard/admin/plans/create">
            <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Plus className="w-5 h-5" />
              Create New Plan
            </button>
          </Link>
        </div>

        <Suspense fallback={<PlansPageSkeleton />}>
          <PlansPageContent />
        </Suspense>
      </div>
    </div>
  );
}