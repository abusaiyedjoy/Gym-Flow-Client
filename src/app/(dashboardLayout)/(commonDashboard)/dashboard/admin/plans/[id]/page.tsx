"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Users, DollarSign, Calendar, Check, Loader2, Trash2, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlanService } from "@/services/plan/plan.service";
import { MembershipPlan, PlanMember } from "@/types/plan.types";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getStatusColor = (status: boolean) => {
  return status ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500";
};

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;

  const [plan, setPlan] = useState<MembershipPlan | null>(null);
  const [members, setMembers] = useState<PlanMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPlanDetails();
    fetchPlanMembers();
  }, [planId]);

  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PlanService.getPlanById(planId);
      setPlan(data);
    } catch (err: any) {
      console.error("Error fetching plan:", err);
      setError(err.message || "Failed to load plan details");
      toast.error("Failed to load plan", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanMembers = async () => {
    try {
      setMembersLoading(true);
      const response = await PlanService.getPlanMembers(planId, 1, 10);
      setMembers(response.members);
    } catch (err: any) {
      console.error("Error fetching members:", err);
    } finally {
      setMembersLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!plan) return;
    try {
      setActionLoading(true);
      await PlanService.togglePlanStatus(planId, { isActive: !plan.isActive });
      toast.success(`Plan ${!plan.isActive ? "activated" : "deactivated"} successfully`);
      await fetchPlanDetails();
    } catch (err: any) {
      toast.error("Failed to update plan status", { description: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await PlanService.deletePlan(planId);
      toast.success("Plan deleted successfully");
      router.push("/dashboard/admin/plans");
    } catch (err: any) {
      toast.error("Failed to delete plan", { description: err.message });
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center"><Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" /><p className="mt-4 text-muted-foreground">Loading plan details...</p></div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center"><p className="text-red-600 font-semibold">Error Loading Plan</p><p className="text-muted-foreground">{error || "Plan not found"}</p><Link href="/dashboard/admin/plans"><Button className="mt-4">Back to Plans</Button></Link></div>
      </div>
    );
  }

  const finalPrice = plan.price * (1 - plan.discount / 100);
  const memberCount = plan._count?.members || 0;
  const monthlyRevenue = finalPrice * memberCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/plans">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title={plan.name}
          description={`Duration: ${plan.durationDays} days`}
          action={
            <div className="flex gap-2">
              <Link href={`/dashboard/admin/plans/${params.id}/edit`}>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Plan
                </Button>
              </Link>
              <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)} disabled={actionLoading}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          }
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-3xl font-bold">৳{finalPrice.toFixed(0)}</p>
                {plan.discount > 0 && (
                  <p className="text-sm text-muted-foreground line-through">৳{plan.price}</p>
                )}
              </div>
              <div className="p-3 rounded-lg bg-green-600/10">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-3xl font-bold">{memberCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-600/10">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-3xl font-bold">৳{monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(plan.isActive)}>
                    {plan.isActive ? "Active" : "Inactive"}
                  </Badge>
                  {plan.isPopular && <Badge className="bg-orange-500/10 text-orange-500"><Award className="h-3 w-3 mr-1" />Popular</Badge>}
                </div>
                <Button onClick={handleToggleStatus} disabled={actionLoading} size="sm" className="mt-2">
                  {plan.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
              <div className="p-3 rounded-lg bg-orange-600/10">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Details */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Plan Information</CardTitle>
            <CardDescription>Detailed information about this membership plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-base">{plan.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{plan.durationDays} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-semibold">৳{finalPrice.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PT Sessions</p>
                <p className="font-semibold">{plan.personalTrainingSessions || "None"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Discount</p>
                <p className="font-semibold">{plan.discount}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>What's included in this plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Members */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Members ({memberCount})</CardTitle>
          <CardDescription>Members subscribed to this plan</CardDescription>
        </CardHeader>
        <CardContent>
          {membersLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No members enrolled yet</p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarImage src={member.user.profileImage || ""} />
                    <AvatarFallback>{member.user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{member.user.name}</p>
                    <p className="text-sm text-muted-foreground">{member.user.email}</p>
                  </div>
                  <Badge className={getStatusColor(member.user.isActive)}>
                    {member.user.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Link href={`/dashboard/admin/members/${member.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{plan.name}"? This will affect {memberCount} members.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={actionLoading}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>
              {actionLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Deleting...</> : "Delete Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
