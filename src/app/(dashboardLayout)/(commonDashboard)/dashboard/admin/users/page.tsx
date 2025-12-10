"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus,
    Users,
    UserCheck,
    UserX,
    TrendingUp,
    Edit,
    Trash2,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";

import { MemberService } from "@/services/member/member.service";
import { Member, GetMembersParams, WorkoutExperience } from "@/types/member.types";

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [stats, setStats] = useState<any>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

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
    const [workoutExperience, setWorkoutExperience] = useState<
        WorkoutExperience | undefined
    >(undefined);

    const fetchMembers = async (params?: GetMembersParams) => {
        try {
            setLoading(true);
            setError(null);
            const response = await MemberService.getAllMembers(params);

            setMembers(response.data);
            if (response.meta) setPagination(response.meta);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch members");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await MemberService.getMemberStats();
            setStats(res);
        } catch (error) {
            console.error("Stats error:", error);
        }
    };

    useEffect(() => {
        fetchMembers({
            page: pagination.page,
            limit: pagination.limit,
            search: search || undefined,
            isActive,
            workoutExperience,
        });

        fetchStats();
    }, [pagination.page]);

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchMembers({
            page: 1,
            limit: pagination.limit,
            search: search || undefined,
            isActive,
            workoutExperience,
        });
    };

    const handleClearFilters = () => {
        setSearch("");
        setIsActive(undefined);
        setWorkoutExperience(undefined);
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchMembers({ page: 1, limit: pagination.limit });
    };

    const handleDelete = async (memberId: string, memberName: string) => {
        if (!confirm(`Are you sure you want to delete member "${memberName}"?`)) {
            return;
        }

        try {
            setDeleteLoading(memberId);
            await MemberService.deleteMember(memberId);

            // Refresh the list
            fetchMembers({
                page: pagination.page,
                limit: pagination.limit,
                search: search || undefined,
                isActive,
                workoutExperience,
            });

            // Refresh stats
            fetchStats();
        } catch (error: any) {
            alert(error.message || "Failed to delete member");
        } finally {
            setDeleteLoading(null);
        }
    };

    const formatDate = (date?: string | null) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getMembershipStatus = (endDate?: string | null) => {
        if (!endDate)
            return { text: "No Plan", color: "bg-gray-100 text-gray-800" };

        const end = new Date(endDate);
        const now = new Date();
        const daysLeft = Math.ceil(
            (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysLeft < 0) return { text: "Expired", color: "bg-red-100 text-red-800" };
        if (daysLeft <= 7)
            return { text: `${daysLeft}d left`, color: "bg-yellow-100 text-yellow-800" };

        return { text: "Active", color: "bg-green-100 text-green-800" };
    };

    if (loading && members.length === 0) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            {/* Header */}
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

            {/* Stats Cards */}
            {stats && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Members"
                        value={stats.totalMembers}
                        icon={<Users className="h-4 w-4" />}
                    />
                    <StatsCard
                        title="Active Members"
                        value={stats.activeMembers}
                        icon={<UserCheck className="h-4 w-4" />}
                    />
                    <StatsCard
                        title="Inactive Members"
                        value={stats.inactiveMembers}
                        icon={<UserX className="h-4 w-4" />}
                    />
                    <StatsCard
                        title="New This Month"
                        value={stats.newThisMonth}
                        icon={<TrendingUp className="h-4 w-4" />}
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

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={isActive === undefined ? "" : isActive.toString()}
                            onChange={(e) =>
                                setIsActive(
                                    e.target.value === "" ? undefined : e.target.value === "true"
                                )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experience
                        </label>
                        <select
                            value={workoutExperience || ""}
                            onChange={(e) =>
                                setWorkoutExperience(
                                    (e.target.value as WorkoutExperience) || undefined
                                )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All Levels</option>
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
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

            {/* Members Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left">Member</th>
                                <th className="px-6 py-3 text-left">Contact</th>
                                <th className="px-6 py-3 text-left">Plan</th>
                                <th className="px-6 py-3 text-left">Trainer</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Joined</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {members.map((member) => {
                                const status = getMembershipStatus(member.membershipEndDate);

                                return (
                                    <tr key={member.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {member.user.profileImage ? (
                                                    <img
                                                        src={member.user.profileImage}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                                        {member.user.name.charAt(0)}
                                                    </div>
                                                )}

                                                <div>
                                                    <Link
                                                        href={`/admin/members/${member.id}`}
                                                        className="font-medium text-primary hover:underline"
                                                    >
                                                        {member.user.name}
                                                    </Link>
                                                    <div className="text-xs text-gray-500">
                                                        {member.employeeId}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div>{member.user.email}</div>
                                            <div className="text-gray-500">
                                                {member.user.phone || "N/A"}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div>{member.currentPlan?.name || "No Plan"}</div>
                                            {member.membershipEndDate && (
                                                <div className="text-gray-500 text-xs">
                                                    Expires: {formatDate(member.membershipEndDate)}
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            {member.assignedTrainer ? (
                                                member.assignedTrainer.user.name
                                            ) : (
                                                <span className="text-gray-500">Not assigned</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <Badge className={status.color}>{status.text}</Badge>
                                        </td>

                                        <td className="px-6 py-4">
                                            {formatDate(member.joinDate)}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/members/${member.id}`}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/members/${member.id}/edit`}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Edit Member"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    title="Delete Member"
                                                    onClick={() => handleDelete(member.id, member.user.name)}
                                                    disabled={deleteLoading === member.id}
                                                >
                                                    {deleteLoading === member.id ? (
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

                        <div className="px-3 text-sm">
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
        </div>
    );
}
