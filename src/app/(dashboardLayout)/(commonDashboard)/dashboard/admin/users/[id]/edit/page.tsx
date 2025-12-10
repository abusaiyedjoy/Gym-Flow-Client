"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { UserService } from "@/services/user/user.service";
import { UserWithDetails, Role } from "@/types/user.types";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: Role.MEMBER,
    isActive: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await UserService.getUserById(params.id as string);
        setUser(data);
        setFormData({
          name: data.name,
          phone: data.phone || "",
          role: data.role,
          isActive: data.isActive,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Update profile
      await UserService.updateUserProfile(params.id as string, {
        name: formData.name,
        phone: formData.phone || undefined,
      });

      // Update role if changed
      if (formData.role !== user?.role) {
        await UserService.updateUserRole(params.id as string, {
          role: formData.role,
        });
      }

      // Update status if changed
      if (formData.isActive !== user?.isActive) {
        await UserService.toggleUserStatus(params.id as string, {
          isActive: formData.isActive,
        });
      }

      setSuccess("User updated successfully!");
      setTimeout(() => {
        router.push(`/dashboard/admin/users/${params.id}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">{error}</p>
        <Link href="/dashboard/admin/users">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link href={`/dashboard/admin/users/${params.id}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User Details
          </Button>
        </Link>
        <PageHeader
          title="Edit User"
          description={`Modify ${user?.name}'s profile, role, and status`}
        />
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update user's basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              {/* User ID (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  name="userId"
                  value={user?.id || ""}
                  disabled
                  className="bg-gray-100 cursor-not-allowed font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>
              Change user's role and permissions
              <span className="block mt-1 text-red-600 text-xs">
                Warning: Changing roles affects user permissions immediately
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">User Role *</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value={Role.MEMBER}>Member</option>
                <option value={Role.TRAINER}>Trainer</option>
                <option value={Role.ADMIN}>Admin</option>
                <option value={Role.SUPER_ADMIN}>Super Admin</option>
              </select>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current Role:</p>
                <Badge className="mt-1">
                  {user?.role.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            {/* Role Descriptions */}
            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium text-gray-700">Role Permissions:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-700 min-w-[120px]">Member:</span>
                  <span className="text-gray-600">Access to workouts, bookings, and personal dashboard</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-green-700 min-w-[120px]">Trainer:</span>
                  <span className="text-gray-600">Manage classes, sessions, and assigned members</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-blue-700 min-w-[120px]">Admin:</span>
                  <span className="text-gray-600">Manage members, trainers, classes, and plans</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-purple-700 min-w-[120px]">Super Admin:</span>
                  <span className="text-gray-600">Full system access including user roles and settings</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Management */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Activate or deactivate user account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="isActive" className="text-base">Account Status</Label>
                <p className="text-sm text-gray-600">
                  Inactive users cannot log in to the system
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {!formData.isActive && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> Deactivating this account will immediately log out the user
                  and prevent them from accessing the system.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href={`/dashboard/admin/users/${params.id}`}>
            <Button type="button" variant="outline" disabled={saving}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
