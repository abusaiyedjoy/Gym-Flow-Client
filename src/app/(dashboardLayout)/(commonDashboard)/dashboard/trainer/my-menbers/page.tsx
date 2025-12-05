"use client";

import { useState } from "react";
import { Search, User, Calendar, TrendingUp, Phone, Mail, MoreVertical } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
    joinDate: string;
    status: "Active" | "Inactive" | "On Hold";
    sessionsCompleted: number;
    nextSession?: string;
    fitnessGoal: string;
    progress: number;
}

const mockClients: Client[] = [
    {
        id: "C-001",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        profileImage: "/members/john.jpg",
        joinDate: "2024-01-15",
        status: "Active",
        sessionsCompleted: 24,
        nextSession: "2024-12-06T09:00:00",
        fitnessGoal: "Weight Loss",
        progress: 75,
    },
    {
        id: "C-002",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "+1 234 567 8901",
        profileImage: "/members/sarah.jpg",
        joinDate: "2024-02-20",
        status: "Active",
        sessionsCompleted: 18,
        nextSession: "2024-12-07T10:00:00",
        fitnessGoal: "Muscle Gain",
        progress: 60,
    },
    {
        id: "C-003",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        phone: "+1 234 567 8902",
        profileImage: "/members/michael.jpg",
        joinDate: "2024-03-10",
        status: "Active",
        sessionsCompleted: 32,
        nextSession: "2024-12-06T14:00:00",
        fitnessGoal: "Athletic Performance",
        progress: 85,
    },
    {
        id: "C-004",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        phone: "+1 234 567 8903",
        profileImage: "/members/emily.jpg",
        joinDate: "2024-04-05",
        status: "On Hold",
        sessionsCompleted: 12,
        fitnessGoal: "General Fitness",
        progress: 40,
    },
    {
        id: "C-005",
        name: "James Wilson",
        email: "james.wilson@example.com",
        phone: "+1 234 567 8904",
        profileImage: "/members/james.jpg",
        joinDate: "2024-05-15",
        status: "Active",
        sessionsCompleted: 8,
        nextSession: "2024-12-08T11:00:00",
        fitnessGoal: "Strength Training",
        progress: 30,
    },
];

export default function MyMembersPage() {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("All");

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "All" || client.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Inactive":
                return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
            case "On Hold":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            default:
                return "";
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Clients"
                description="Manage and track your client progress"
            />

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Clients</p>
                                <p className="text-2xl font-bold">{clients.length}</p>
                            </div>
                            <User className="h-8 w-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active</p>
                                <p className="text-2xl font-bold">
                                    {clients.filter((c) => c.status === "Active").length}
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Sessions This Month</p>
                                <p className="text-2xl font-bold">42</p>
                            </div>
                            <Calendar className="h-8 w-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg Progress</p>
                                <p className="text-2xl font-bold">58%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search clients by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["All", "Active", "On Hold", "Inactive"].map((status) => (
                                <Button
                                    key={status}
                                    variant={filterStatus === status ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterStatus(status)}
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Client List */}
            <div className="grid gap-4">
                {filteredClients.map((client) => (
                    <Card key={client.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={client.profileImage} alt={client.name} />
                                        <AvatarFallback>
                                            {client.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">{client.name}</h3>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                                    <div className="flex items-center gap-1">
                                                        <Mail className="h-3 w-3" />
                                                        {client.email}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Phone className="h-3 w-3" />
                                                        {client.phone}
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className={getStatusColor(client.status)}>
                                                {client.status}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Fitness Goal</p>
                                                <p className="text-sm font-semibold">{client.fitnessGoal}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Sessions</p>
                                                <p className="text-sm font-semibold">{client.sessionsCompleted}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Progress</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-muted rounded-full h-2">
                                                        <div
                                                            className="bg-primary h-2 rounded-full"
                                                            style={{ width: `${client.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-semibold">{client.progress}%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Next Session</p>
                                                <p className="text-sm font-semibold">
                                                    {client.nextSession
                                                        ? new Date(client.nextSession).toLocaleDateString()
                                                        : "Not scheduled"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 w-full md:w-auto">
                                    <Link href={`/dashboard/trainer/my-menbers/${client.id}`} className="flex-1 md:flex-initial">
                                        <Button variant="outline" className="w-full">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <User className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No clients found</p>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your search or filters
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
