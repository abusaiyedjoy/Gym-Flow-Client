"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Shield,
  Edit,
  Trash2,
  Eye,
  Ban,
  CheckCircle,
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
import { UserService } from "@/services/user/user.service";
import { User, GetUsersParams, Role } from "@/types/user.types";
import { toast } from "sonner";

export function UsersPageContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);

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
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [role, setRole] = useState<Role | undefined>(undefined);

  const fetchUsers = async (params?: GetUsersParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await UserService.getAllUsers(params);
      setUsers(response.data);
      if (response.meta) setPagination(response.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await UserService.getUserStats();
      setStats(res);
    } catch (error) {
      console.error("Stats error:", error);
    }
  };

  useEffect(() => {
    fetchUsers({
      page: pagination.page,
      limit: pagination.limit,
      search: search || undefined,
      isActive,
      role,
    });

    fetchStats();
  }, [pagination.page]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchUsers({
      page: 1,
      limit: pagination.limit,
      search: search || undefined,
      isActive,
      role,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setIsActive(undefined);
    setRole(undefined);
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchUsers({ page: 1, limit: pagination.limit });
  };

  const handleToggleStatus = async (
    userId: string,
    userName: string,
    currentStatus: boolean
  ) => {
    const action = currentStatus ? "deactivate" : "activate";

    setConfirmDialog({
      open: true,
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
      description: `Are you sure you want to ${action} user "${userName}"? ${
        currentStatus
          ? "This will prevent the user from accessing the system."
          : "This will restore user access to the system."
      }`,
      onConfirm: async () => {
        try {
          setConfirmDialog((prev) => ({ ...prev, loading: true }));
          setStatusLoading(userId);
          await UserService.toggleUserStatus(userId, {
            isActive: !currentStatus,
          });

          // Refresh the list
          fetchUsers({
            page: pagination.page,
            limit: pagination.limit,
            search: search || undefined,
            isActive,
            role,
          });

          // Refresh stats
          fetchStats();

          toast.success(`User ${action}d successfully`);
          setConfirmDialog((prev) => ({ ...prev, open: false, loading: false }));
        } catch (error: any) {
          toast.error(
            process.env.NODE_ENV === "development"
              ? error.message
              : `Failed to ${action} user. Please try again.`
          );
          setConfirmDialog((prev) => ({ ...prev, loading: false }));
        } finally {
          setStatusLoading(null);
        }
      },
    });
  };

  const handleDelete = async (userId: string, userName: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete User",
      description: `Are you sure you want to delete user "${userName}"? This action cannot be undone and will permanently remove all user data.`,
      onConfirm: async () => {
        try {
          setConfirmDialog((prev) => ({ ...prev, loading: true }));
          setDeleteLoading(userId);
          await UserService.deleteUser(userId);

          // Refresh the list
          fetchUsers({
            page: pagination.page,
            limit: pagination.limit,
            search: search || undefined,
            isActive,
            role,
          });

          // Refresh stats
          fetchStats();

          toast.success("User deleted successfully");
          setConfirmDialog((prev) => ({ ...prev, open: false, loading: false }));
        } catch (error: any) {
          toast.error(
            process.env.NODE_ENV === "development"
              ? error.message
              : "Failed to delete user. Please try again."
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

  const getRoleColor = (userRole: Role) => {
    switch (userRole) {
      case Role.SUPER_ADMIN:
        return "bg-purple-100 text-purple-800";
      case Role.ADMIN:
        return "bg-blue-100 text-blue-800";
      case Role.TRAINER:
        return "bg-green-100 text-green-800";
      case Role.MEMBER:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleBadge = (userRole: Role) => {
    const displayRole = userRole.replace("_", " ");
    return <Badge className={getRoleColor(userRole)}>{displayRole}</Badge>;
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

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="h-4 w-4" />}
            description={`${stats.recentUsers} new this week`}
          />
          <StatsCard
            title="Active Users"
            value={stats.activeUsers}
            icon={<UserCheck className="h-4 w-4" />}
            description={`${stats.members.active} active members`}
          />
          <StatsCard
            title="Trainers"
            value={stats.trainers.total}
            icon={<Users className="h-4 w-4" />}
            description={`${stats.trainers.active} active`}
          />
          <StatsCard
            title="Admins"
            value={stats.admins}
            icon={<Shield className="h-4 w-4" />}
            description="System administrators"
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
              placeholder="Name, email, phone..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role || ""}
              onChange={(e) => setRole((e.target.value as Role) || undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Roles</option>
              <option value={Role.SUPER_ADMIN}>Super Admin</option>
              <option value={Role.ADMIN}>Admin</option>
              <option value={Role.TRAINER}>Trainer</option>
              <option value={Role.MEMBER}>Member</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={isActive === undefined ? "" : isActive.toString()}
              onChange={(e) =>
                setIsActive(
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true"
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Additional Info</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Joined</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((user) => {
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <Link
                            href={`/dashboard/admin/users/${user.id}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {user.name}
                          </Link>
                          <div className="text-xs text-gray-500">
                            {user.isVerified ? (
                              <span className="text-green-600">
                                ✓ Verified
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                Not verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm">{user.email}</div>
                      <div className="text-sm text-gray-500">
                        {user.phone || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>

                    <td className="px-6 py-4">
                      {user.member && user.member.currentPlan && (
                        <div className="text-sm">
                          <div>Plan: {user.member.currentPlan.name}</div>
                          <div className="text-xs text-gray-500">
                            ID: {user.member.membershipId}
                          </div>
                        </div>
                      )}
                      {user.trainer && (
                        <div className="text-sm">
                          <div>Rating: {user.trainer.rating || "N/A"}</div>
                          <div className="text-xs text-gray-500">
                            ID: {user.trainer.membershipId}
                          </div>
                        </div>
                      )}
                      {user.admin && (
                        <div className="text-sm text-purple-600">
                          Admin Access
                        </div>
                      )}
                      {!user.member && !user.trainer && !user.admin && (
                        <span className="text-gray-500 text-sm">-</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        className={
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/users/${user.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/users/${user.id}/edit`}>
                          <Button variant="ghost" size="sm" title="Edit User">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          title={user.isActive ? "Deactivate" : "Activate"}
                          onClick={() =>
                            handleToggleStatus(
                              user.id,
                              user.name,
                              user.isActive
                            )
                          }
                          disabled={statusLoading === user.id}
                        >
                          {statusLoading === user.id ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : user.isActive ? (
                            <Ban className="h-4 w-4 text-orange-600" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Delete User"
                          onClick={() => handleDelete(user.id, user.name)}
                          disabled={deleteLoading === user.id}
                        >
                          {deleteLoading === user.id ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-red-600" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

            <div className="px-3 text-sm flex items-center">
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