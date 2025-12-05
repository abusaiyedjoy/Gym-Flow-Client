"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Dumbbell, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";
import { DataTable, Column } from "@/components/shared/DataTable";

interface Trainer {
    id: string;
    name: string;
    email: string;
    specializations: string[];
    rating: number;
    activeClients: number;
    status: "Active" | "Inactive";
}

const mockTrainers: Trainer[] = [
    {
        id: "1",
        name: "Mike Johnson",
        email: "mike@gymflow.com",
        specializations: ["Strength Training", "Bodybuilding"],
        rating: 4.8,
        activeClients: 15,
        status: "Active",
    },
    {
        id: "2",
        name: "Sarah Williams",
        email: "sarah@gymflow.com",
        specializations: ["Yoga", "Flexibility"],
        rating: 4.9,
        activeClients: 20,
        status: "Active",
    },
];

export default function TrainersPage() {
    const [trainers] = useState<Trainer[]>(mockTrainers);

    const columns: Column<Trainer>[] = [
        {
            header: "Name",
            accessor: "name",
            cell: (value, row) => (
                <Link
                    href={`/dashboard/admin/trainers/${row.id}`}
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
            header: "Specializations",
            accessor: "specializations",
            cell: (value: string[]) => (
                <div className="flex flex-wrap gap-1">
                    {value.map((spec, i) => (
                        <Badge key={i} variant="secondary">
                            {spec}
                        </Badge>
                    ))}
                </div>
            ),
        },
        {
            header: "Rating",
            accessor: "rating",
            cell: (value) => (
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{value}</span>
                </div>
            ),
        },
        {
            header: "Active Clients",
            accessor: "activeClients",
        },
        {
            header: "Status",
            accessor: "status",
            cell: (value) => (
                <Badge variant={value === "Active" ? "default" : "secondary"}>
                    {value}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Trainers"
                description="Manage gym trainers and their schedules"
                action={
                    <Link href="/dashboard/admin/trainers/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Trainer
                        </Button>
                    </Link>
                }
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Trainers"
                    value={trainers.length}
                    icon={<Dumbbell className="h-4 w-4" />}
                />
                <StatsCard
                    title="Active Trainers"
                    value={trainers.filter((t) => t.status === "Active").length}
                    icon={<Award className="h-4 w-4" />}
                />
                <StatsCard
                    title="Total Clients"
                    value={trainers.reduce((sum, t) => sum + t.activeClients, 0)}
                    icon={<Users className="h-4 w-4" />}
                />
                <StatsCard
                    title="Avg Rating"
                    value={(trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length).toFixed(1)}
                    icon={<Star className="h-4 w-4" />}
                />
            </div>

            <DataTable
                data={trainers}
                columns={columns}
                searchable
                searchPlaceholder="Search trainers..."
                paginated
                itemsPerPage={10}
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/trainers/${row.id}`}>
                            <Button variant="ghost" size="sm">
                                View
                            </Button>
                        </Link>
                        <Link href={`/dashboard/admin/trainers/${row.id}/edit`}>
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
