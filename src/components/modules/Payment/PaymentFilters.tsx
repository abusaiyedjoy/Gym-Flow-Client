"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentStatus, PaymentMethod } from "@/types/payment.types";

export function PaymentFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (updates: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            
            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
            });

            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (key: string, value: string) => {
        const queryString = createQueryString({ [key]: value });
        router.push(`?${queryString}`, { scroll: false });
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by invoice, transaction ID, or member..."
                            defaultValue={searchParams.get("search") || ""}
                            onChange={(e) => handleFilterChange("search", e.target.value)}
                        />
                    </div>
                    <Select
                        value={searchParams.get("status") || "all"}
                        onValueChange={(value) => handleFilterChange("status", value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value={PaymentStatus.PAID}>Paid</SelectItem>
                            <SelectItem value={PaymentStatus.PENDING}>Pending</SelectItem>
                            <SelectItem value={PaymentStatus.OVERDUE}>Overdue</SelectItem>
                            <SelectItem value={PaymentStatus.CANCELLED}>Cancelled</SelectItem>
                            <SelectItem value={PaymentStatus.REFUNDED}>Refunded</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={searchParams.get("paymentMethod") || "all"}
                        onValueChange={(value) => handleFilterChange("paymentMethod", value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="All Methods" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Methods</SelectItem>
                            <SelectItem value={PaymentMethod.CASH}>Cash</SelectItem>
                            <SelectItem value={PaymentMethod.CARD}>Card</SelectItem>
                            <SelectItem value={PaymentMethod.BKASH}>bKash</SelectItem>
                            <SelectItem value={PaymentMethod.NAGAD}>Nagad</SelectItem>
                            <SelectItem value={PaymentMethod.SSLCOMMERZ}>SSLCommerz</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}