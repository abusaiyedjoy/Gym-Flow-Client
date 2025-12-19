import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageComponents";
import { UsersPageSkeleton } from "@/components/modules/user/UserSkeletonLoader";
import { UsersPageContent } from "@/components/modules/user/UserPageContent";

export default function UsersPage() {
  return (
    <div className="p-4 sm:p-8">
      <PageHeader
        title="User Management"
        description="Manage all system users, roles, and permissions"
      />

      <Suspense fallback={<UsersPageSkeleton />}>
        <UsersPageContent />
      </Suspense>
    </div>
  );
}