"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MemberService } from "@/services/member/member.service";
import { Member } from "@/types/member.types";

type GenderType = "MALE" | "FEMALE" | "OTHER";

interface EditMemberFormData {
  name: string;
  phone: string;
  dateOfBirth: string;
  gender: GenderType;
  height: number;
  currentWeight: number;
  targetWeight: number;
  bloodGroup: string;
  emergencyContact: string;
  emergencyContactName: string;
  address: string;
}

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditMemberFormData>();

  const selectedGender = watch("gender");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MemberService.getMemberById(params.id as string);
        setMember(data);

        // Set form values
        setValue("name", data.user.name);
        setValue("phone", data.user.phone || "");
        setValue("dateOfBirth", data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "");
        setValue("gender", data.gender as GenderType || "MALE");
        setValue("height", data.height || 0);
        setValue("currentWeight", data.currentWeight || 0);
        setValue("targetWeight", data.targetWeight || 0);
        setValue("bloodGroup", data.bloodGroup || "");
        setValue("emergencyContact", data.emergencyContact || "");
        setValue("emergencyContactName", data.emergencyContactName || "");
        setValue("address", data.address || "");
      } catch (err: any) {
        setError(err.message || "Failed to load member details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMember();
    }
  }, [params.id, setValue]);

  const onSubmit = async (data: EditMemberFormData) => {
    setServerError("");
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("memberId", params.id as string);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("gender", data.gender);
      formData.append("height", data.height.toString());
      formData.append("currentWeight", data.currentWeight.toString());
      formData.append("targetWeight", data.targetWeight.toString());
      formData.append("bloodGroup", data.bloodGroup);
      formData.append("emergencyContact", data.emergencyContact);
      formData.append("emergencyContactName", data.emergencyContactName);
      formData.append("address", data.address);

      const response = await MemberService.updateMember(null, formData);

      if (response.success) {
        router.push(`/admin/members/${params.id}`);
      } else {
        setServerError(response.message || "Failed to update member");
      }
    } catch (error: any) {
      setServerError(error.message || "Failed to update member. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">{error || "Member not found"}</p>
        <Link href="/admin/members">
          <Button variant="outline">Back to Members</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/members/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title="Edit Member"
          description={`Update information for ${member.user.name}`}
        />
      </div>

      {serverError && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update member's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^(\+880|0)?1[3-9]\d{8}$/,
                          message: "Invalid Bangladesh phone number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...register("dateOfBirth")}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={selectedGender}
                      onValueChange={(value) => setValue("gender", value as GenderType)}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Input
                      id="bloodGroup"
                      placeholder="e.g., A+, O-, AB+"
                      {...register("bloodGroup")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    {...register("address")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Body Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Body Metrics</CardTitle>
                <CardDescription>Update physical measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      {...register("height", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                    <Input
                      id="currentWeight"
                      type="number"
                      step="0.1"
                      {...register("currentWeight", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      step="0.1"
                      {...register("targetWeight", { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>Contact person in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    {...register("emergencyContactName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contact Phone</Label>
                  <Input
                    id="emergencyContact"
                    {...register("emergencyContact")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Member ID</p>
                  <p className="font-semibold">{member.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{member.user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed here
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-semibold ${member.user.isActive ? "text-green-600" : "text-gray-600"}`}>
                    {member.user.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                {member.currentPlan && (
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="font-semibold">{member.currentPlan.name}</p>
                    <p className="text-sm text-green-600">${member.currentPlan.price}</p>
                  </div>
                )}
                {member.assignedTrainer && (
                  <div>
                    <p className="text-sm text-muted-foreground">Trainer</p>
                    <p className="font-semibold">{member.assignedTrainer.user.name}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Link href={`/admin/members/${params.id}`} className="block">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
