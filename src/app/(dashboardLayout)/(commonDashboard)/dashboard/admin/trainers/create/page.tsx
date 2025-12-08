"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { TrainerService } from "@/services/trainer/trainer.service";
import { Specialization } from "@/types/trainer.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CreateTrainerFormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    experienceYears: number;
    bio?: string;
    salary?: number;
    maxCapacity: number;
}

interface SpecializationItem {
    specialization: Specialization;
    proficiencyLevel: number;
    yearsOfExperience: number;
}

const CreateTrainerPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTrainerFormData>();

    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [certifications, setCertifications] = useState<string[]>([]);
    const [certInput, setCertInput] = useState("");
    const [languages, setLanguages] = useState<string[]>(["Bangla", "English"]);
    const [langInput, setLangInput] = useState("");
    const [specializations, setSpecializations] = useState<SpecializationItem[]>([]);
    const [selectedSpec, setSelectedSpec] = useState<Specialization | "">("");
    const [proficiencyLevel, setProficiencyLevel] = useState(5);
    const [specYears, setSpecYears] = useState(0);

    const router = useRouter();

    const specializationOptions = Object.values(Specialization);

    const addCertification = () => {
        if (certInput.trim()) {
            setCertifications([...certifications, certInput.trim()]);
            setCertInput("");
        }
    };

    const removeCertification = (index: number) => {
        setCertifications(certifications.filter((_, i) => i !== index));
    };

    const addLanguage = () => {
        if (langInput.trim() && !languages.includes(langInput.trim())) {
            setLanguages([...languages, langInput.trim()]);
            setLangInput("");
        }
    };

    const removeLanguage = (index: number) => {
        setLanguages(languages.filter((_, i) => i !== index));
    };

    const addSpecialization = () => {
        if (selectedSpec) {
            const exists = specializations.find(s => s.specialization === selectedSpec);
            if (!exists) {
                setSpecializations([
                    ...specializations,
                    {
                        specialization: selectedSpec,
                        proficiencyLevel,
                        yearsOfExperience: specYears,
                    },
                ]);
                setSelectedSpec("");
                setProficiencyLevel(5);
                setSpecYears(0);
            }
        }
    };

    const removeSpecialization = (index: number) => {
        setSpecializations(specializations.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: CreateTrainerFormData) => {
        setServerError("");
        setIsLoading(true);

        try {
            // Build FormData to match Postman payload format
            const formData = new FormData();

            // Required fields
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("experienceYears", data.experienceYears.toString());
            formData.append("maxCapacity", data.maxCapacity.toString());

            // Optional fields - only add if they have values
            if (data.phone) formData.append("phone", data.phone);
            if (data.bio) formData.append("bio", data.bio);
            if (data.salary) formData.append("salary", data.salary.toString());

            // Arrays - append each item individually
            certifications.forEach((cert) => {
                formData.append("certifications", cert);
            });

            languages.forEach((lang) => {
                formData.append("languages", lang);
            });

            // Specializations - stringify each object
            specializations.forEach((spec) => {
                formData.append("specializations", JSON.stringify(spec));
            });

            const response = await TrainerService.createTrainer(null, formData);

            if (response.success) {
                router.push("/dashboard/admin/trainers");
            } else {
                setServerError(response.message || "Failed to create trainer");
            }
        } catch (error: any) {
            console.error("Create trainer error:", error);
            setServerError(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/trainers"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Trainers
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Trainer</h1>
                    <p className="text-gray-600">
                        Create a new trainer account and set their specializations
                    </p>
                </div>

                {/* Server Error */}
                {serverError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-center">{serverError}</p>
                    </div>
                )}

                {/* Form Card */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2 space-y-6">
                            {/* Personal Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Basic trainer details</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                {...register("name", {
                                                    required: "Name is required",
                                                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                                                })}
                                                placeholder="Enter full name"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address",
                                                    },
                                                })}
                                                placeholder="trainer@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password *</Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                                        message: "Password must contain uppercase, lowercase, and number",
                                                    },
                                                })}
                                                placeholder="Enter password"
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password.message}</p>
                                            )}
                                        </div>

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
                                                placeholder="+8801XXXXXXXXX"
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-red-600">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            {...register("bio")}
                                            rows={3}
                                            placeholder="Brief description about the trainer..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Professional Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Professional Details</CardTitle>
                                    <CardDescription>Experience and capacity information</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="experienceYears">Experience (years) *</Label>
                                            <Input
                                                type="number"
                                                id="experienceYears"
                                                {...register("experienceYears", {
                                                    required: "Experience is required",
                                                    min: { value: 0, message: "Must be 0 or greater" },
                                                    valueAsNumber: true,
                                                })}
                                                placeholder="0"
                                            />
                                            {errors.experienceYears && (
                                                <p className="text-sm text-red-600">{errors.experienceYears.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="salary">Salary ($)</Label>
                                            <Input
                                                type="number"
                                                id="salary"
                                                {...register("salary", { valueAsNumber: true })}
                                                placeholder="5000"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="maxCapacity">Max Capacity *</Label>
                                            <Input
                                                type="number"
                                                id="maxCapacity"
                                                {...register("maxCapacity", {
                                                    required: "Max capacity is required",
                                                    min: { value: 1, message: "Must be at least 1" },
                                                    valueAsNumber: true,
                                                })}
                                                defaultValue={20}
                                                placeholder="20"
                                            />
                                            {errors.maxCapacity && (
                                                <p className="text-sm text-red-600">{errors.maxCapacity.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Certifications */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Certifications</CardTitle>
                                    <CardDescription>Add professional certifications</CardDescription>
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
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Languages */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Languages</CardTitle>
                                    <CardDescription>Languages the trainer speaks</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            value={langInput}
                                            onChange={(e) => setLangInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                                            placeholder="e.g., Hindi"
                                        />
                                        <Button type="button" onClick={addLanguage}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((lang, index) => (
                                            <Badge key={index} variant="secondary" className="gap-1">
                                                {lang}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => removeLanguage(index)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            {/* Specializations */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Specializations</CardTitle>
                                    <CardDescription>Add trainer specializations</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Specialization</Label>
                                        <select
                                            value={selectedSpec}
                                            onChange={(e) => setSelectedSpec(e.target.value as Specialization)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="">Select...</option>
                                            {specializationOptions.map((spec) => (
                                                <option key={spec} value={spec}>
                                                    {spec.replace(/_/g, " ")}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Proficiency (1-10)</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={proficiencyLevel}
                                            onChange={(e) => setProficiencyLevel(parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Years of Experience</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={specYears}
                                            onChange={(e) => setSpecYears(parseInt(e.target.value))}
                                        />
                                    </div>

                                    <Button type="button" onClick={addSpecialization} className="w-full">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Specialization
                                    </Button>

                                    <div className="space-y-2">
                                        {specializations.map((spec, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-2 border rounded-lg"
                                            >
                                                <div className="text-sm">
                                                    <p className="font-medium">{spec.specialization.replace(/_/g, " ")}</p>
                                                    <p className="text-xs text-gray-500">
                                                        Level {spec.proficiencyLevel} • {spec.yearsOfExperience} years
                                                    </p>
                                                </div>
                                                <X
                                                    className="h-4 w-4 cursor-pointer text-red-600"
                                                    onClick={() => removeSpecialization(index)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Creating..." : "Create Trainer"}
                                    </Button>
                                    <Link href="/admin/trainers" className="block">
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
        </div>
    );
};

export default CreateTrainerPage;