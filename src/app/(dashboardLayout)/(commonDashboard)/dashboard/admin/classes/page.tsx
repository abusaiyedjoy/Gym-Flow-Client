"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Calendar, Users, Clock, TrendingUp, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Card, CardContent } from "@/components/ui/card";

interface Class {
    id: string;
    name: string;
    category: string;
    trainer: string;
    schedule: string;
    duration: number;
    capacity: number;
    enrolled: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    status: "Active" | "Inactive";
}

const mockClasses: Class[] = [
    {
        id: "CLS-001",
        name: "HIIT Cardio Blast",
        category: "Cardio",
        trainer: "David Martinez",
        schedule: "Mon, Wed, Fri - 6:00 AM",
        duration: 45,
        capacity: 20,
        enrolled: 18,
        difficulty: "Intermediate",
        status: "Active",
    },
    {
        id: "CLS-002",
        name: "Strength & Conditioning",
        category: "Strength",
        trainer: "Sarah Johnson",
        schedule: "Tue, Thu - 7:00 AM",
        duration: 60,
        capacity: 15,
        enrolled: 15,
        difficulty: "Advanced",
        status: "Active",
    },
    {
        id: "CLS-003",
        name: "Yoga Flow",
        category: "Flexibility",
        trainer: "Emily Rodriguez",
        schedule: "Daily - 8:00 AM",
        duration: 60,
        capacity: 25,
        enrolled: 22,
        difficulty: "Beginner",
        status: "Active",
    },
    {
        id: "CLS-004",
        name: "Spin Class",
        category: "Cardio",
        trainer: "Michael Chen",
        schedule: "Mon, Wed, Fri - 5:30 PM",
        duration: 45,
        capacity: 18,
        enrolled: 16,
        difficulty: "Intermediate",
        status: "Active",
    },
];

export default function ClassesPage() {
    const [classes] = useState<Class[]>(mockClasses);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Intermediate":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "Advanced":
                return "bg-red-500/10 text-red-700 dark:text-red-400";
            default:
                return "";
        }
    };

    const getStatusColor = (status: string) => {
        return status === "Active"
            ? "bg-green-500/10 text-green-700 dark:text-green-400"
            : "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    };

    const columns: Column<Class>[] = [
        {
            header: "Class Name",
            accessor: "name",
            cell: (row) => (
                <div>
                    <p className="font-semibold">{row.name}</p>
                    <p className="text-sm text-muted-foreground">{row.category}</p>
                </div>
            ),
        },
        {
            header: "Trainer",
            accessor: "trainer",
        },
        {
            header: "Schedule",
            accessor: "schedule",
            cell: (row) => (
                <div className="text-sm">
                    <p>{row.schedule}</p>
                    <p className="text-muted-foreground">{row.duration} minutes</p>
                </div>
            ),
        },
        {
            header: "Capacity",
            accessor: "capacity",
            cell: (row) => (
                <div className="text-sm">
                    <p className="font-semibold">
                        {row.enrolled}/{row.capacity}
                    </p>
                    <p className="text-muted-foreground">
                        {Math.round((row.enrolled / row.capacity) * 100)}% full
                    </p>
                </div>
            ),
        },
        {
            header: "Difficulty",
            accessor: "difficulty",
            cell: (row) => (
                <Badge className={getDifficultyColor(row.difficulty)}>
                    {row.difficulty}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <Badge className={getStatusColor(row.status)}>{row.status}</Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "id",
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/admin/classes/${row.id}`}>
                        <Button variant="ghost" size="sm">
                            View
                        </Button>
                    </Link>
                    <Link href={`/dashboard/admin/classes/${row.id}/edit`}>
                        <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    const stats = [
        {
            title: "Total Classes",
            value: classes.length.toString(),
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Active Classes",
            value: classes.filter((c) => c.status === "Active").length.toString(),
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Total Enrolled",
            value: classes.reduce((sum, c) => sum + c.enrolled, 0).toString(),
            icon: Users,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "Avg Capacity",
            value: `${Math.round(
                (classes.reduce((sum, c) => sum + (c.enrolled / c.capacity) * 100, 0) /
                    classes.length)
            )}%`,
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Classes Management"
                description="Manage gym classes and schedules"
                action={
                    <Link href="/dashboard/admin/classes/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Class
                        </Button>
                    </Link>
                }
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                </div>
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Data Table */}
            <DataTable columns={columns} data={classes} searchPlaceholder="Search classes..." />
        </div>
    );
}
