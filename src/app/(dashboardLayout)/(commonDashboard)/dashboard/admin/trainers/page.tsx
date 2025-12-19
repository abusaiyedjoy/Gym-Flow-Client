import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { TrainersPageSkeleton } from "@/components/modules/trainer/TrainerSkeleton";
import { TrainersPageContent } from "@/components/modules/trainer/TrainerPageContent";

export default function TrainersPage() {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Trainers"
        description="Manage gym trainers and their schedules"
        action={
          <Link className="cursor-pointer" href="/dashboard/admin/trainers/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Trainer
            </Button>
          </Link>
        }
      />

      <Suspense fallback={<TrainersPageSkeleton />}>
        <TrainersPageContent />
      </Suspense>
    </div>
  );
}