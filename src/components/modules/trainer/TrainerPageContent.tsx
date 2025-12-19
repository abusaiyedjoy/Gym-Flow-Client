"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Star,
  Users,
  Award,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatsCard } from "@/components/shared/PageComponents";
import { TrainerService } from "@/services/trainer/trainer.service";
import {
  Trainer,
  GetTrainersParams,
  Specialization,
} from "@/types/trainer.types";
import { toast } from "sonner";

export function TrainersPageContent() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    loading?: boolean;
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  // Filters
  const [search, setSearch] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(
    undefined
  );
  const [specialization, setSpecialization] = useState<
    Specialization | undefined
  >(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);

  const fetchTrainers = async (params?: GetTrainersParams) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching trainers with params:", params);

      const response = await TrainerService.getAllTrainers(params);

      console.log("Trainers response:", response);

      setTrainers(response.data);
      if (response.meta) setPagination(response.meta);
    } catch (err) {
      console.error("Fetch trainers error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch trainers"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await TrainerService.getTrainerStats();
      console.log("Stats response:", res);
      setStats(res.data);
    } catch (error) {
      console.error("Stats error:", error);
    }
  };

  useEffect(() => {
    fetchTrainers({
      page: pagination.page,
      limit: pagination.limit,
      search: search || undefined,
      isAvailable,
      specialization,
      minRating,
    });

    fetchStats();
  }, [pagination.page]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchTrainers({
      page: 1,
      limit: pagination.limit,
      search: search || undefined,
      isAvailable,
      specialization,
      minRating,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setIsAvailable(undefined);
    setSpecialization(undefined);
    setMinRating(undefined);
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchTrainers({ page: 1, limit: pagination.limit });
  };

  const handleDelete = async (trainerId: string, trainerName: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete Trainer",
      description: `Are you sure you want to delete trainer "${trainerName}"? This action cannot be undone and will permanently remove all trainer data.`,
      onConfirm: async () => {
        try {
          setConfirmDialog((prev) => ({ ...prev, loading: true }));
          setDeleteLoading(trainerId);
          await TrainerService.deleteTrainer(trainerId);

          // Refresh the list
          fetchTrainers({
            page: pagination.page,
            limit: pagination.limit,
            search: search || undefined,
            isAvailable,
            specialization,
            minRating,
          });

          // Refresh stats
          fetchStats();

          toast.success("Trainer deleted successfully");
          setConfirmDialog((prev) => ({
            ...prev,
            open: false,
            loading: false,
          }));
        } catch (error: any) {
          toast.error(
            process.env.NODE_ENV === "development"
              ? error.message
              : "Failed to delete trainer. Please try again."
          );
          setConfirmDialog((prev) => ({ ...prev, loading: false }));
        } finally {
          setDeleteLoading(null);
        }
      },
    });
  };

  const formatDate = (date?: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSpecializations = (specializations?: any[]) => {
    if (!specializations || specializations.length === 0) return "None";
    return specializations
      .map((s) => s.specialization.replace(/_/g, " "))
      .join(", ");
  };

  if (loading) {
    return null; // Suspense will show skeleton
  }

  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          !confirmDialog.loading &&
          setConfirmDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog.title}</DialogTitle>
            <DialogDescription>{confirmDialog.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog((prev) => ({ ...prev, open: false }))
              }
              disabled={confirmDialog.loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDialog.onConfirm}
              disabled={confirmDialog.loading}
            >
              {confirmDialog.loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Trainers"
            value={stats.totalTrainers}
            icon={<Dumbbell className="h-4 w-4" />}
          />
          <StatsCard
            title="Active Trainers"
            value={stats.activeTrainers}
            icon={<Award className="h-4 w-4" />}
          />
          <StatsCard
            title="Available"
            value={stats.availableTrainers}
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard
            title="Avg Capacity"
            value={`${stats.avgCapacityUsage}%`}
            icon={<Star className="h-4 w-4" />}
          />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Name, email, ID..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={isAvailable === undefined ? "" : isAvailable.toString()}
              onChange={(e) =>
                setIsAvailable(
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true"
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Rating
            </label>
            <select
              value={minRating || ""}
              onChange={(e) =>
                setMinRating(
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
              <option value="3.0">3.0+</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2">
            <Button onClick={handleSearch} className="flex-1">
              Search
            </Button>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Trainers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Trainer</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Experience</th>
                <th className="px-6 py-3 text-left">Specializations</th>
                <th className="px-6 py-3 text-left">Rating</th>
                <th className="px-6 py-3 text-left">Clients</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {trainers?.length > 0 ? (
                trainers.map((trainer) => {
                  return (
                    <tr key={trainer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {trainer.user.profileImage ? (
                            <img
                              src={trainer.user.profileImage}
                              alt={trainer.user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                              {trainer.user.name.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <Link
                              href={`/dashboard/admin/trainers/${trainer.id}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {trainer.user.name}
                            </Link>
                            <div className="text-xs text-gray-500">
                              {trainer.employeeId}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm">{trainer.user.email}</div>
                        <div className="text-sm text-gray-500">
                          {trainer.user.phone || "N/A"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {trainer.experienceYears} years
                        </div>
                        {trainer.certifications &&
                          trainer.certifications.length > 0 && (
                            <div className="text-xs text-gray-500">
                              {trainer.certifications.length} cert(s)
                            </div>
                          )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {trainer.specializations &&
                          trainer.specializations.length > 0 ? (
                            trainer.specializations
                              .slice(0, 2)
                              .map((spec, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {spec.specialization.replace(/_/g, " ")}
                                </Badge>
                              ))
                          ) : (
                            <span className="text-gray-500 text-sm">None</span>
                          )}
                          {trainer.specializations &&
                            trainer.specializations.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{trainer.specializations.length - 2}
                              </Badge>
                            )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-sm">
                            {trainer.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {trainer.reviewCount} reviews
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {trainer.currentClients} / {trainer.maxCapacity}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round(
                            (trainer.currentClients / trainer.maxCapacity) *
                              100
                          )}
                          % capacity
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant={
                              trainer.user.isActive ? "default" : "secondary"
                            }
                            className="w-fit"
                          >
                            {trainer.user.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {trainer.isAvailable && (
                            <Badge variant="outline" className="w-fit text-xs">
                              Available
                            </Badge>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/admin/trainers/${trainer.id}`}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/admin/trainers/${trainer.id}/edit`}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Edit Trainer"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Delete Trainer"
                            onClick={() =>
                              handleDelete(trainer.id, trainer.user.name)
                            }
                            disabled={deleteLoading === trainer.id}
                          >
                            {deleteLoading === trainer.id ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No trainers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
          <div className="text-gray-700 text-sm">
            Showing{" "}
            <span className="font-medium">
              {(pagination.page - 1) * pagination.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            of <span className="font-medium">{pagination.total}</span> results
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={!pagination.hasPrev}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
            >
              Previous
            </Button>

            <div className="flex items-center px-3 text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </div>

            <Button
              variant="outline"
              disabled={!pagination.hasNext}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}