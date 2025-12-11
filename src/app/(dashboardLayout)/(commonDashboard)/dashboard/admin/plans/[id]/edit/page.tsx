"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageComponents";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PlanService } from "@/services/plan/plan.service";
import { toast } from "sonner";

const editPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z.string().optional(),
  durationDays: z.string().min(1, "Duration is required"),
  price: z.string().min(1, "Price is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  personalTrainingSessions: z.string(),
  discount: z.string(),
  isPopular: z.boolean(),
});

type EditPlanFormData = z.infer<typeof editPlanSchema>;

export default function EditPlanPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<EditPlanFormData>({
    resolver: zodResolver(editPlanSchema),
    defaultValues: {
      name: "",
      description: "",
      durationDays: "",
      price: "",
      features: [""],
      personalTrainingSessions: "0",
      discount: "0",
      isPopular: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "features",
  });

  useEffect(() => {
    fetchPlanData();
  }, [planId]);

  const fetchPlanData = async () => {
    try {
      setLoading(true);
      const data = await PlanService.getPlanById(planId);
      form.reset({
        name: data.name,
        description: data.description || "",
        durationDays: data.durationDays.toString(),
        price: data.price.toString(),
        features: data.features.length > 0 ? data.features : [""],
        personalTrainingSessions: data.personalTrainingSessions.toString(),
        discount: data.discount.toString(),
        isPopular: data.isPopular,
      });
    } catch (err: any) {
      toast.error("Failed to load plan", { description: err.message });
      router.push("/dashboard/admin/plans");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EditPlanFormData) => {
    try {
      setSubmitting(true);
      const updateData = {
        name: data.name,
        description: data.description,
        durationDays: parseInt(data.durationDays),
        price: parseFloat(data.price),
        features: data.features.filter((f) => f.trim() !== ""),
        personalTrainingSessions: parseInt(data.personalTrainingSessions),
        discount: parseFloat(data.discount),
        isPopular: data.isPopular,
      };

      await PlanService.updatePlan(planId, updateData);
      toast.success("Plan updated successfully");
      router.push(`/dashboard/admin/plans/${planId}`);
    } catch (err: any) {
      toast.error("Failed to update plan", { description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/admin/plans/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader title="Edit Plan" description="Update membership plan details and features" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update plan name and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name *</Label>
                  <Input id="name" {...form.register("name")} />
                  {form.formState.errors.name && <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={4} {...form.register("description")} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Features</CardTitle>
                <CardDescription>Add or remove features included in this plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input {...form.register(`features.${index}` as const)} placeholder="Feature description" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} disabled={fields.length === 1}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" onClick={() => append("")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
                {form.formState.errors.features && <p className="text-sm text-red-600">{form.formState.errors.features.message}</p>}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Duration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (৳) *</Label>
                  <Input id="price" type="number" step="0.01" {...form.register("price")} />
                  {form.formState.errors.price && <p className="text-sm text-red-600">{form.formState.errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="durationDays">Duration (Days) *</Label>
                  <Input id="durationDays" type="number" {...form.register("durationDays")} />
                  {form.formState.errors.durationDays && <p className="text-sm text-red-600">{form.formState.errors.durationDays.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" type="number" min="0" max="100" {...form.register("discount")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personalTrainingSessions">PT Sessions</Label>
                  <Input id="personalTrainingSessions" type="number" min="0" {...form.register("personalTrainingSessions")} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="isPopular" checked={form.watch("isPopular")} onCheckedChange={(checked) => form.setValue("isPopular", checked as boolean)} />
                  <Label htmlFor="isPopular" className="cursor-pointer">Mark as Popular</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : "Save Changes"}
                </Button>
                <Link href={`/dashboard/admin/plans/${params.id}`} className="block">
                  <Button type="button" variant="outline" className="w-full">Cancel</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
