"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, X, Loader2, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PageHeader } from "@/components/shared/PageComponents";
import { PlanService } from "@/services/plan/plan.service";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Validation schema
const createPlanSchema = z.object({
    name: z.string().min(2, "Plan name must be at least 2 characters"),
    description: z.string().optional(),
    durationDays: z.string().min(1, "Duration is required"),
    price: z.string().min(1, "Price is required"),
    features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
    personalTrainingSessions: z.string(),
    discount: z.string(),
    isPopular: z.boolean(),
});

type CreatePlanFormData = z.infer<typeof createPlanSchema>;

export default function CreatePlanPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CreatePlanFormData>({
        resolver: zodResolver(createPlanSchema),
        defaultValues: {
            name: "",
            description: "",
            durationDays: "30",
            price: "",
            features: [""],
            personalTrainingSessions: "0",
            discount: "0",
            isPopular: false,
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        // @ts-ignore
        name: "features",
    });

    const onSubmit = async (data: CreatePlanFormData) => {
        try {
            setIsSubmitting(true);

            // Convert string values to numbers and validate
            const durationDays = parseInt(data.durationDays);
            const price = parseFloat(data.price);
            const personalTrainingSessions = parseInt(data.personalTrainingSessions);
            const discount = parseFloat(data.discount);

            if (isNaN(durationDays) || durationDays <= 0) {
                toast.error("Invalid duration", {
                    description: "Duration must be a positive number",
                });
                return;
            }

            if (isNaN(price) || price <= 0) {
                toast.error("Invalid price", {
                    description: "Price must be a positive number",
                });
                return;
            }

            if (isNaN(discount) || discount < 0 || discount > 100) {
                toast.error("Invalid discount", {
                    description: "Discount must be between 0 and 100",
                });
                return;
            }

            // Filter out empty features
            const filteredFeatures = data.features.filter((f) => f.trim() !== "");

            if (filteredFeatures.length === 0) {
                toast.error("No features", {
                    description: "Please add at least one feature",
                });
                return;
            }

            await PlanService.createPlan({
                name: data.name.trim(),
                description: data.description?.trim(),
                durationDays,
                price,
                features: filteredFeatures,
                personalTrainingSessions,
                discount,
                isPopular: data.isPopular,
            });

            toast.success("Success!", {
                description: "Membership plan created successfully",
            });

            router.push("/dashboard/admin/plans");
        } catch (error: any) {
            console.error("Error creating plan:", error);
            toast.error("Failed to create plan", {
                description: error.message || "An error occurred while creating the plan",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <PageHeader
                    title="Create Membership Plan"
                    description="Add a new membership plan for your gym"
                />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Enter the basic details of the membership plan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Plan Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Plan Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Basic, Pro, Premium"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Brief description of the plan"
                                                className="resize-none"
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A short description to help members understand the plan
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Duration */}
                                <FormField
                                    control={form.control}
                                    name="durationDays"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration (Days) <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="30"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Plan duration in days (e.g., 30 for monthly)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price (৳) <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1000"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Price in BDT
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Personal Training Sessions */}
                                <FormField
                                    control={form.control}
                                    name="personalTrainingSessions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Personal Training Sessions</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Number of PT sessions included (0 for none)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Discount */}
                                <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount (%)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    min="0"
                                                    max="100"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Discount percentage (0-100)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Is Popular */}
                            <FormField
                                control={form.control}
                                name="isPopular"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Mark as Popular Plan
                                            </FormLabel>
                                            <FormDescription>
                                                This plan will be highlighted and recommended to new members. Only one plan can be popular at a time.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Plan Features</CardTitle>
                            <CardDescription>
                                Add the features and benefits included in this plan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {fields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`features.${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={index === 0 ? "" : "sr-only"}>
                                                Feature {index + 1}
                                            </FormLabel>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input
                                                        placeholder={`e.g., ${index === 0
                                                                ? "Unlimited gym access"
                                                                : index === 1
                                                                    ? "Group fitness classes"
                                                                    : "Nutrition consultation"
                                                            }`}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                {fields.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append("" as any)}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Feature
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Create Plan
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
