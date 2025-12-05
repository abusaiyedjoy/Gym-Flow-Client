"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface DynamicFormProps {
    schema: z.ZodObject<any>;
    onSubmit: (data: any) => Promise<void>;
    fields: FormFieldConfig[];
    defaultValues?: Record<string, any>;
    submitLabel?: string;
    isLoading?: boolean;
}

export interface FormFieldConfig {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "number" | "textarea" | "select" | "date";
    placeholder?: string;
    description?: string;
    options?: { value: string; label: string }[];
    disabled?: boolean;
}

export function DynamicForm({
    schema,
    onSubmit,
    fields,
    defaultValues = {},
    submitLabel = "Submit",
    isLoading = false,
}: DynamicFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const handleSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);
            await onSubmit(data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {fields.map((field) => (
                    <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: formField }) => (
                            <FormItem>
                                <FormLabel>{field.label}</FormLabel>
                                <FormControl>
                                    {field.type === "textarea" ? (
                                        <Textarea
                                            placeholder={field.placeholder}
                                            disabled={field.disabled || isSubmitting}
                                            {...formField}
                                        />
                                    ) : field.type === "select" ? (
                                        <Select
                                            onValueChange={formField.onChange}
                                            defaultValue={formField.value}
                                            disabled={field.disabled || isSubmitting}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            disabled={field.disabled || isSubmitting}
                                            {...formField}
                                        />
                                    )}
                                </FormControl>
                                {field.description && (
                                    <FormDescription>{field.description}</FormDescription>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <Button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full md:w-auto"
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {submitLabel}
                </Button>
            </form>
        </Form>
    );
}
