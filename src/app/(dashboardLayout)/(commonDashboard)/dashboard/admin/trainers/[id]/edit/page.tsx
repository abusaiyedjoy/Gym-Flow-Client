"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, AlertCircle, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrainerService } from "@/services/trainer/trainer.service";
import { Trainer, Specialization } from "@/types/trainer.types";

interface EditTrainerFormData {
  name: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  experienceYears: number;
  bio?: string;
  hourlyRate?: number;
  maxCapacity: number;
  isAvailable: boolean;
}

export default function EditTrainerPage() {
  const params = useParams();
  const router = useRouter();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certInput, setCertInput] = useState("");
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [selectedSpec, setSelectedSpec] = useState<Specialization | "">("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditTrainerFormData>();

  const watchIsAvailable = watch("isAvailable");
  const specializationOptions = Object.values(Specialization);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await TrainerService.getTrainerById(params.id as string);
        setTrainer(data);

        // Set form values
        setValue("name", data.user.name);
        setValue("phone", data.user.phone || "");
        // setValue("dateOfBirth", data.user.dateOfBirth || "");
        // setValue("gender", data.user.gender || "");
        setValue("experienceYears", data.experienceYears);
        setValue("bio", data.bio || "");
        // setValue("hourlyRate", data.hourlyRate || 0);
        setValue("maxCapacity", data.maxCapacity);
        setValue("isAvailable", data.isAvailable);

        // Set arrays
        setCertifications(data.certifications || []);
        
        // Extract specializations from the specializations array
        if (data.specializations && data.specializations.length > 0) {
          const specs = data.specializations.map(s => s.specialization);
          setSpecializations(specs);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load trainer details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTrainer();
    }
  }, [params.id, setValue]);

  const addCertification = () => {
    if (certInput.trim()) {
      setCertifications([...certifications, certInput.trim()]);
      setCertInput("");
    }
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addSpecialization = () => {
    if (selectedSpec && !specializations.includes(selectedSpec)) {
      setSpecializations([...specializations, selectedSpec]);
      setSelectedSpec("");
    }
  };

  const removeSpecialization = (index: number) => {
    setSpecializations(specializations.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: EditTrainerFormData) => {
    setServerError("");
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("trainerId", params.id as string);
      
      // Required fields
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("experienceYears", data.experienceYears.toString());
      formData.append("maxCapacity", data.maxCapacity.toString());
      formData.append("isAvailable", data.isAvailable.toString());
      
      // Optional fields
      if (data.dateOfBirth) formData.append("dateOfBirth", data.dateOfBirth);
      if (data.gender) formData.append("gender", data.gender);
      if (data.bio) formData.append("bio", data.bio);
      if (data.hourlyRate) formData.append("hourlyRate", data.hourlyRate.toString());
      
      // Arrays - append each item separately
      specializations.forEach(spec => {
        formData.append("specializations", spec);
      });
      
      certifications.forEach(cert => {
        formData.append("certifications", cert);
      });

      const response = await TrainerService.updateTrainer(null, formData);

      if (response.success) {
        router.push(`/admin/trainers/${params.id}`);
      } else {
        setServerError(response.message || "Failed to update trainer");
      }
    } catch (error: any) {
      setServerError(error.message || "Failed to update trainer. Please try again.");
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

  if (error || !trainer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">{error || "Trainer not found"}</p>
        <Link href="/admin/trainers">
          <Button variant="outline">Back to Trainers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/trainers/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title="Edit Trainer"
          description={`Update information for ${trainer.user.name}`}
        />
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
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
                <CardDescription>Update trainer's personal details</CardDescription>
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
                    <Label htmlFor="experienceYears">Experience (years) *</Label>
                    <Input
                      id="experienceYears"
                      type="number"
                      {...register("experienceYears", {
                        required: "Experience is required",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.experienceYears && (
                      <p className="text-sm text-red-600">{errors.experienceYears.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      type="date"
                      id="dateOfBirth"
                      {...register("dateOfBirth")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      {...register("gender")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    {...register("bio")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
                <CardDescription>Update professional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      {...register("hourlyRate", { valueAsNumber: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxCapacity">Max Capacity *</Label>
                    <Input
                      id="maxCapacity"
                      type="number"
                      {...register("maxCapacity", {
                        required: "Max capacity is required",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.maxCapacity && (
                      <p className="text-sm text-red-600">{errors.maxCapacity.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isAvailable">Availability</Label>
                    <Select
                      value={watchIsAvailable?.toString()}
                      onValueChange={(value) => setValue("isAvailable", value === "true")}
                    >
                      <SelectTrigger id="isAvailable">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Available</SelectItem>
                        <SelectItem value="false">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Manage professional certifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
                    placeholder="e.g., Certified Personal Trainer"
                  />
                  <Button type="button" onClick={addCertification}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {cert}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeCertification(index)}
                      />
                    </Badge>
                  ))}
                  {certifications.length === 0 && (
                    <p className="text-sm text-gray-500">No certifications added</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card>
              <CardHeader>
                <CardTitle>Specializations</CardTitle>
                <CardDescription>Manage trainer specializations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <select
                    value={selectedSpec}
                    onChange={(e) => setSelectedSpec(e.target.value as Specialization)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select specialization...</option>
                    {specializationOptions
                      .filter(spec => !specializations.includes(spec))
                      .map((spec) => (
                        <option key={spec} value={spec}>
                          {spec.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                  <Button type="button" onClick={addSpecialization}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="text-sm font-medium">
                        {spec.replace(/_/g, " ")}
                      </div>
                      <X
                        className="h-4 w-4 cursor-pointer text-red-600 hover:text-red-800"
                        onClick={() => removeSpecialization(index)}
                      />
                    </div>
                  ))}
                  {specializations.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No specializations added yet
                    </p>
                  )}
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
                  <p className="text-sm text-muted-foreground">Trainer ID</p>
                  <p className="font-semibold">{trainer.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{trainer.user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed here
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-semibold ${trainer.user.isActive ? "text-green-600" : "text-gray-600"}`}>
                    {trainer.user.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Clients</p>
                  <p className="font-semibold">{trainer.currentClients} / {trainer.maxCapacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold">{trainer.rating.toFixed(1)} ⭐</p>
                  <p className="text-xs text-muted-foreground">{trainer.reviewCount} reviews</p>
                </div>
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
                <Link href={`/admin/trainers/${params.id}`} className="block">
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