"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  Users,
  DollarSign,
  TrendingUp,
  Edit,
  Eye,
  Loader2,
  CheckCircle2,
  Trash2,
  Plus,
} from "lucide-react";
import { PlanService } from "@/services/plan/plan.service";
import { MembershipPlan } from "@/types/plan.types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PlansPageContent() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await PlanService.getAllPlans({ limit: 100 });
      setPlans(response.data);
    } catch (err: any) {
      console.error("Error fetching plans:", err);
      setError(err.message || "Failed to load plans");
      toast.error("Failed to load plans", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (planId: string, currentStatus: boolean) => {
    try {
      setActionLoading(planId);
      await PlanService.togglePlanStatus(planId, { isActive: !currentStatus });
      toast.success("Success!", {
        description: `Plan ${!currentStatus ? "activated" : "deactivated"} successfully`,
      });
      await fetchPlans();
    } catch (err: any) {
      toast.error("Failed to update plan status", {
        description: err.message,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!planToDelete) return;

    try {
      setActionLoading(planToDelete);
      await PlanService.deletePlan(planToDelete);
      toast.success("Success!", {
        description: "Plan deleted successfully",
      });
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
      await fetchPlans();
    } catch (err: any) {
      toast.error("Failed to delete plan", {
        description: err.message,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const confirmDelete = (planId: string) => {
    setPlanToDelete(planId);
    setDeleteDialogOpen(true);
  };

  const activePlans = plans.filter((p) => p.isActive).length;
  const totalMembers = plans.reduce(
    (sum, plan) => sum + (plan._count?.members || 0),
    0
  );
  const totalRevenue = plans.reduce((sum, plan) => {
    const finalPrice = plan.price * (1 - plan.discount / 100);
    return sum + finalPrice * (plan._count?.members || 0);
  }, 0);
  const avgPrice =
    plans.length > 0
      ? Math.round(
          plans.reduce((sum, plan) => sum + plan.price, 0) / plans.length
        )
      : 0;

  if (loading) {
    return null; // Suspense will show skeleton
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-6 rounded-xl max-w-md">
            <h2 className="text-xl font-bold mb-2">Error Loading Plans</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={fetchPlans}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Plans</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {activePlans}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                of {plans.length} total
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Members
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {totalMembers}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monthly Revenue
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  +15%
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Price</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${avgPrice}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const finalPrice = plan.price * (1 - plan.discount / 100);
          const memberCount = plan._count?.members || 0;
          const monthlyRevenue = finalPrice * memberCount;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.isPopular ? "ring-2 ring-orange-500" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div
                className={`p-8 ${
                  plan.isPopular
                    ? "bg-gradient-to-br from-orange-50 to-red-50"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-6">
                  {plan.discount > 0 ? (
                    <>
                      <span className="text-5xl font-bold text-gray-900">
                        ${finalPrice.toFixed(0)}
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        ${plan.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                  )}
                  <span className="text-gray-600 text-lg">
                    /{plan.durationDays} days
                  </span>
                </div>
                {plan.discount > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-semibold text-green-600">
                      {plan.discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="p-8 space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.personalTrainingSessions > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">
                        {plan.personalTrainingSessions} Personal Training
                        Sessions
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Active Members
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {memberCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <div className="flex items-center gap-2">
                      {plan.isActive ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-green-600">
                            Active
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-sm font-medium text-red-600">
                            Inactive
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Monthly Revenue
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      ${monthlyRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50 flex gap-3">
                <Link
                  href={`/dashboard/admin/plans/${plan.id}`}
                  className="flex-1"
                >
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    disabled={actionLoading === plan.id}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </Link>
                <Link
                  href={`/dashboard/admin/plans/${plan.id}/edit`}
                  className="flex-1"
                >
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-medium text-white hover:shadow-lg transition-all"
                    disabled={actionLoading === plan.id}
                  >
                    <Edit className="w-4 h-4" />
                    Edit Plan
                  </button>
                </Link>
              </div>

              {/* Toggle & Delete Buttons */}
              <div className="p-6 pt-0 bg-gray-50 flex gap-3">
                <button
                  onClick={() => handleToggleStatus(plan.id, plan.isActive)}
                  disabled={actionLoading === plan.id}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    plan.isActive
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {actionLoading === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>{plan.isActive ? "Deactivate" : "Activate"}</>
                  )}
                </button>
                <button
                  onClick={() => confirmDelete(plan.id)}
                  disabled={actionLoading === plan.id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State for Additional Plans */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 text-center border-2 border-dashed border-gray-300">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Plus className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Create More Plans
          </h3>
          <p className="text-gray-600 mb-6">
            Expand your offerings by creating additional membership plans to
            cater to different fitness goals and budgets.
          </p>
          <Link href="/dashboard/admin/plans/create">
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
              Create New Plan
            </button>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this plan? This action cannot be
              undone and will affect all members currently enrolled in this
              plan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setPlanToDelete(null);
              }}
              disabled={actionLoading !== null}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={actionLoading !== null}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Plan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}