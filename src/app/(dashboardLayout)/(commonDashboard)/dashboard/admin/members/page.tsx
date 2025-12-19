import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { MembersPageSkeleton } from "@/components/modules/member/MemberPageSkeleton";
import { MembersPageContent } from "@/components/modules/member/MemberPageContent";

export default function MembersPage() {
  return (
    <div className="space-y-6 p-6 min-h-screen">
      <PageHeader
        title="Members"
        description="Manage your gym members and their memberships"
        action={
          <Link className="cursor-pointer" href="/dashboard/admin/members/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </Link>
        }
      />

      <Suspense fallback={<MembersPageSkeleton />}>
        <MembersPageContent />
      </Suspense>
    </div>
  );
}