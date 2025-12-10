"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Calendar,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Award,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserService } from "@/services/user/user.service";
import { UserWithDetails, Role } from "@/types/user.types";

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

const formatDate = (date: string | null | undefined) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateTime = (date: string | null | undefined) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function UserDetailPage() {
  const params = useParams();
  const [user, setUser] = useState<UserWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await UserService.getUserById(params.id as string);
        setUser(data);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">{error || "User not found"}</p>
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
        <Link href="/dashboard/admin/users">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <PageHeader
          title="User Details"
          description={`View and manage ${user.name}'s profile`}
          action={
            <Link href={`/dashboard/admin/users/${user.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit User
              </Button>
            </Link>
          }
        />
      </div>

      {/* Profile Overview */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profileImage || undefined} alt={user.name} />
                <AvatarFallback className="text-3xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.replace('_', ' ')}
                  </Badge>
                  <Badge className={user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {user.isActive ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </Badge>
                  {user.isVerified && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined: {formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Updated: {formatDate(user.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Information */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          {user.member && <TabsTrigger value="member">Member Info</TabsTrigger>}
          {user.trainer && <TabsTrigger value="trainer">Trainer Info</TabsTrigger>}
          {user.admin && <TabsTrigger value="admin">Admin Info</TabsTrigger>}
        </TabsList>

        {/* General Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Basic account details and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <p className="text-sm font-mono">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <p className="text-sm">{user.role.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Verified</label>
                  <p className="text-sm">{user.isVerified ? "Yes" : "No"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Status</label>
                  <p className="text-sm">{user.isActive ? "Active" : "Inactive"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-sm">{formatDateTime(user.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-sm">{formatDateTime(user.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Member Info Tab */}
        {user.member && (
          <TabsContent value="member">
            <Card>
              <CardHeader>
                <CardTitle>Member Information</CardTitle>
                <CardDescription>Membership details and fitness profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Member ID</label>
                    <p className="text-sm font-mono">{user.member.membershipId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Plan</label>
                    <p className="text-sm">
                      {user.member.currentPlan ? (
                        <>
                          {user.member.currentPlan.name} - ${user.member.currentPlan.price}
                        </>
                      ) : (
                        "No active plan"
                      )}
                    </p>
                  </div>
                  {user.member.planStartDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Plan Start Date</label>
                      <p className="text-sm">{formatDate(user.member.planStartDate)}</p>
                    </div>
                  )}
                  {user.member.planEndDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Plan End Date</label>
                      <p className="text-sm">{formatDate(user.member.planEndDate)}</p>
                    </div>
                  )}
                  {user.member.dateOfBirth && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                      <p className="text-sm">{formatDate(user.member.dateOfBirth)}</p>
                    </div>
                  )}
                  {user.member.gender && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Gender</label>
                      <p className="text-sm">{user.member.gender}</p>
                    </div>
                  )}
                  {user.member.workoutExperience && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Experience Level</label>
                      <p className="text-sm">{user.member.workoutExperience}</p>
                    </div>
                  )}
                  {user.member.height && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Height</label>
                      <p className="text-sm">{user.member.height} cm</p>
                    </div>
                  )}
                  {user.member.weight && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Weight</label>
                      <p className="text-sm">{user.member.weight} kg</p>
                    </div>
                  )}
                  {user.member.assignedTrainer && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Assigned Trainer</label>
                      <p className="text-sm">{user.member.assignedTrainer.user.name}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Trainer Info Tab */}
        {user.trainer && (
          <TabsContent value="trainer">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trainer Information</CardTitle>
                  <CardDescription>Professional profile and expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Trainer ID</label>
                      <p className="text-sm font-mono">{user.trainer.membershipId}</p>
                    </div>
                    {user.trainer.rating && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Rating</label>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <p className="text-sm">{user.trainer.rating.toFixed(1)} / 5.0</p>
                        </div>
                      </div>
                    )}
                    {user.trainer.experienceYears && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Experience</label>
                        <p className="text-sm">{user.trainer.experienceYears} years</p>
                      </div>
                    )}
                    {user.trainer.hourlyRate && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Hourly Rate</label>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <p className="text-sm">${user.trainer.hourlyRate}/hour</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Availability</label>
                      <p className="text-sm">
                        {user.trainer.isAvailable ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>

                  {user.trainer.bio && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Bio</label>
                      <p className="text-sm text-gray-700 mt-1">{user.trainer.bio}</p>
                    </div>
                  )}

                  {user.trainer.specializations && user.trainer.specializations.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-2 block">
                        Specializations
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {user.trainer.specializations.map((spec) => (
                          <Badge key={spec.id} variant="outline">
                            {spec.name}
                            {spec.level && ` (${spec.level})`}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {user.trainer.availability && user.trainer.availability.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {user.trainer.availability.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{schedule.dayOfWeek}</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        )}

        {/* Admin Info Tab */}
        {user.admin && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Information</CardTitle>
                <CardDescription>Administrative access and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Admin ID</label>
                    <p className="text-sm font-mono">{user.admin.id}</p>
                  </div>
                  {user.admin.accessLevel && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Access Level</label>
                      <p className="text-sm">{user.admin.accessLevel}</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Administrative Privileges
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        This user has administrative access to the system. They can manage users,
                        content, and system settings based on their access level.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
