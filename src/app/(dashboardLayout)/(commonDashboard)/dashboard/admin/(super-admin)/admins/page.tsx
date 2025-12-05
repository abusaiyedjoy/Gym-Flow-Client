"use client";

import { UserPlus, Shield, Users, Crown } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const adminUsers = [
  {
    id: "A-001",
    name: "John Admin",
    email: "admin@gymflow.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-12-15 10:30 AM",
    permissions: ["All Access"],
  },
  {
    id: "A-002",
    name: "Sarah Manager",
    email: "sarah@gymflow.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-12-15 09:15 AM",
    permissions: ["Members", "Trainers", "Classes", "Reports"],
  },
  {
    id: "A-003",
    name: "Mike Support",
    email: "mike@gymflow.com",
    role: "Support",
    status: "Active",
    lastLogin: "2024-12-14 4:20 PM",
    permissions: ["View Members", "View Classes"],
  },
  {
    id: "A-004",
    name: "Emily Staff",
    email: "emily@gymflow.com",
    role: "Staff",
    status: "Inactive",
    lastLogin: "2024-12-10 2:30 PM",
    permissions: ["Check-in"],
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Super Admin":
      return "bg-primary/10 text-primary";
    case "Admin":
      return "bg-blue-500/10 text-blue-500";
    case "Support":
      return "bg-orange-500/10 text-orange-500";
    case "Staff":
      return "bg-gray-500/10 text-gray-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

const getStatusColor = (status: string) => {
  return status === "Active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500";
};

export default function AdminsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Management"
        description="Manage administrative users and access control"
        action={
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Admins</p>
                <p className="text-3xl font-bold">{adminUsers.length}</p>
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
                <p className="text-sm text-muted-foreground">Active Admins</p>
                <p className="text-3xl font-bold">{adminUsers.filter(a => a.status === "Active").length}</p>
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
                <p className="text-sm text-muted-foreground">Super Admins</p>
                <p className="text-3xl font-bold">{adminUsers.filter(a => a.role === "Super Admin").length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Crown className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Roles</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-600/10">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>Manage administrative access and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{admin.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">{admin.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(admin.role)}>
                      {admin.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.slice(0, 2).map((perm, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                      {admin.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{admin.permissions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(admin.status)}>
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {admin.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <Select>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Actions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="permissions">Permissions</SelectItem>
                        <SelectItem value="suspend">Suspend</SelectItem>
                        <SelectItem value="delete">Delete</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Admin Roles</CardTitle>
            <CardDescription>Different levels of administrative access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Super Admin</h4>
              </div>
              <p className="text-sm text-muted-foreground">Full system access including user management, system settings, and all features.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold">Admin</h4>
              </div>
              <p className="text-sm text-muted-foreground">Manage members, trainers, classes, and view reports. Cannot modify system settings.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-orange-600" />
                <h4 className="font-semibold">Support</h4>
              </div>
              <p className="text-sm text-muted-foreground">View-only access to members and classes. Can handle support tickets.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-gray-600" />
                <h4 className="font-semibold">Staff</h4>
              </div>
              <p className="text-sm text-muted-foreground">Limited access for check-in operations and viewing schedules.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Recent admin actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { admin: "John Admin", action: "Updated system settings", time: "10 mins ago" },
              { admin: "Sarah Manager", action: "Added new trainer", time: "25 mins ago" },
              { admin: "Mike Support", action: "Viewed member report", time: "1 hour ago" },
              { admin: "John Admin", action: "Created new admin user", time: "2 hours ago" },
            ].map((log, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{log.admin}</p>
                  <p className="text-sm text-muted-foreground">{log.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
