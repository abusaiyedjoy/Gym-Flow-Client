"use client";

import { Users, UserPlus, Shield, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const adminUsers = [
    {
        id: "1",
        name: "John Admin",
        email: "admin@gymflow.com",
        role: "Super Admin",
        status: "Active",
        lastLogin: "2024-12-15 10:30 AM",
    },
    {
        id: "2",
        name: "Sarah Manager",
        email: "sarah@gymflow.com",
        role: "Manager",
        status: "Active",
        lastLogin: "2024-12-15 09:15 AM",
    },
    {
        id: "3",
        name: "Mike Support",
        email: "mike@gymflow.com",
        role: "Support",
        status: "Active",
        lastLogin: "2024-12-14 4:20 PM",
    },
    {
        id: "4",
        name: "Emily Staff",
        email: "emily@gymflow.com",
        role: "Staff",
        status: "Inactive",
        lastLogin: "2024-12-10 2:30 PM",
    },
];

const roles = [
    {
        name: "Super Admin",
        description: "Full system access and control",
        permissions: ["All Permissions"],
        userCount: 1,
    },
    {
        name: "Manager",
        description: "Manage members, trainers, and classes",
        permissions: ["Manage Members", "Manage Trainers", "Manage Classes", "View Reports"],
        userCount: 2,
    },
    {
        name: "Support",
        description: "Handle member inquiries and support tickets",
        permissions: ["View Members", "View Classes", "Manage Support Tickets"],
        userCount: 3,
    },
    {
        name: "Staff",
        description: "Limited access for front desk operations",
        permissions: ["Check-in Members", "View Schedule"],
        userCount: 5,
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-500/10 text-green-500";
        case "Inactive":
            return "bg-gray-500/10 text-gray-500";
        default:
            return "bg-gray-500/10 text-gray-500";
    }
};

const getRoleColor = (role: string) => {
    switch (role) {
        case "Super Admin":
            return "bg-primary/10 text-primary";
        case "Manager":
            return "bg-blue-500/10 text-blue-500";
        case "Support":
            return "bg-orange-500/10 text-orange-500";
        case "Staff":
            return "bg-gray-500/10 text-gray-500";
        default:
            return "bg-gray-500/10 text-gray-500";
    }
};

export default function UsersSettingsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="User Management"
                description="Manage admin users, roles, and permissions"
                action={
                    <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add User
                    </Button>
                }
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Admin Users</p>
                                <p className="text-3xl font-bold">11</p>
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
                                <p className="text-sm text-muted-foreground">Active Users</p>
                                <p className="text-3xl font-bold">9</p>
                            </div>
                            <div className="p-3 rounded-lg bg-green-600/10">
                                <Shield className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Roles</p>
                                <p className="text-3xl font-bold">4</p>
                            </div>
                            <div className="p-3 rounded-lg bg-primary/10">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Admin Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Admin Users</CardTitle>
                    <CardDescription>Manage administrative access and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Login</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src="/placeholder.svg" />
                                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getRoleColor(user.role)}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(user.status)}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Roles & Permissions */}
            <Card>
                <CardHeader>
                    <CardTitle>Roles & Permissions</CardTitle>
                    <CardDescription>Define user roles and their access levels</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {roles.map((role) => (
                            <div key={role.name} className="p-4 border rounded-lg">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{role.name}</h3>
                                            <Badge variant="outline">{role.userCount} users</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{role.description}</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {role.permissions.map((permission) => (
                                        <Badge key={permission} variant="secondary">
                                            {permission}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
