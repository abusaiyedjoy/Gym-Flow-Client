"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageComponents";
import { DynamicForm, FormFieldConfig } from "@/components/shared/DynamicForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const memberSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^(\+880|0)?1[3-9]\d{8}$/, "Invalid Bangladesh phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    planId: z.string().min(1, "Please select a plan"),
});

const fields: FormFieldConfig[] = [
    {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter member's full name",
    },
    {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "member@example.com",
    },
    {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "+8801XXXXXXXXX",
        description: "Enter Bangladesh phone number",
    },
    {
        name: "password",
        label: "Temporary Password",
        type: "password",
        placeholder: "Create a temporary password",
        description: "Member will be asked to change this on first login",
    },
    {
        name: "planId",
        label: "Membership Plan",
        type: "select",
        placeholder: "Select a plan",
        options: [
            { value: "1", label: "Basic Plan - $29/month" },
            { value: "2", label: "Premium Plan - $49/month" },
            { value: "3", label: "Elite Plan - $79/month" },
        ],
    },
];

export default function CreateMemberPage() {
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof memberSchema>) => {
        try {
            // TODO: Replace with actual API call
            console.log("Creating member:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Show success message (you can use toast here)
            alert("Member created successfully!");

            // Redirect to members list
            router.push("/dashboard/admin/members");
        } catch (error) {
            console.error("Error creating member:", error);
            alert("Failed to create member. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Add New Member"
                description="Create a new member account and assign membership plan"
                action={
                    <Link href="/dashboard/admin/members">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Members
                        </Button>
                    </Link>
                }
            />

            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Member Information</CardTitle>
                        <CardDescription>
                            Enter the member's details and assign a membership plan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DynamicForm
                            schema={memberSchema}
                            fields={fields}
                            onSubmit={handleSubmit}
                            submitLabel="Create Member"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
