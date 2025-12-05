"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Users, UserCheck, UserX, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";
import { DataTable, Column } from "@/components/shared/DataTable";

interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    membershipStatus: "Active" | "Inactive" | "Expired";
    planName: string;
    joinDate: string;
}

// Mock data - replace with actual API call
const mockMembers: Member[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+8801712345678",
        membershipStatus: "Active",
        planName: "Premium Plan",
        joinDate: "2024-01-15",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+8801798765432",
        membershipStatus: "Active",
        planName: "Basic Plan",
        joinDate: "2024-02-20",
    },
];

export default function MembersPage() {
    const [members] = useState<Member[]>(mockMembers);

    const columns: Column<Member>[] = [
        {
            header: "Name",
            accessor: "name",
            cell: (value, row) => (
                <Link
                    href={`/dashboard/admin/members/${row.id}`}
                    className="font-medium text-primary hover:underline"
                >
                    {value}
                </Link>
            ),
        },
        {
            header: "Email",
            accessor: "email",
        },
        {
            header: "Phone",
            accessor: "phone",
        },
        {
            header: "Status",
            accessor: "membershipStatus",
            cell: (value) => (
                <Badge
                    variant={
                        value === "Active" ? "default" : value === "Expired" ? "destructive" : "secondary"
                    }
                >
                    {value}
                </Badge>
            ),
        },
        {
            header: "Plan",
            accessor: "planName",
        },
        {
            header: "Join Date",
            accessor: "joinDate",
        },
    ];

    const activeMembers = members.filter((m) => m.membershipStatus === "Active").length;
    const inactiveMembers = members.filter((m) => m.membershipStatus === "Inactive").length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Members"
                description="Manage your gym members and their memberships"
                action={
                    <Link href="/dashboard/admin/members/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Member
                        </Button>
                    </Link>
                }
            />

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Members"
                    value={members.length}
                    icon={<Users className="h-4 w-4" />}
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Active Members"
                    value={activeMembers}
                    icon={<UserCheck className="h-4 w-4" />}
                    description="Currently active"
                />
                <StatsCard
                    title="Inactive Members"
                    value={inactiveMembers}
                    icon={<UserX className="h-4 w-4" />}
                    description="Need attention"
                />
                <StatsCard
                    title="This Month"
                    value={5}
                    icon={<TrendingUp className="h-4 w-4" />}
                    description="New signups"
                    trend={{ value: 20, isPositive: true }}
                />
            </div>

            {/* Members Table */}
            <DataTable
                data={members}
                columns={columns}
                searchable
                searchPlaceholder="Search members..."
                paginated
                itemsPerPage={10}
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/members/${row.id}`}>
                            <Button variant="ghost" size="sm">
                                View
                            </Button>
                        </Link>
                        <Link href={`/dashboard/admin/members/${row.id}/edit`}>
                            <Button variant="ghost" size="sm">
                                Edit
                            </Button>
                        </Link>
                    </div>
                )}
            />
        </div>
    );
}
