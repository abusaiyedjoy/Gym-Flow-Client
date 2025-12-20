import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageComponents";
import { PaymentService } from "@/services/payment/payment.service";
import { PaymentFilters } from "@/components/modules/Payment/PaymentFilters";
import { PaymentTable } from "@/components/modules/Payment/PaymentTable";
import { PaymentStats } from "@/components/modules/Payment/PaymentStats";
import Loading from "./loading";

interface SearchParams {
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
    paymentMethod?: string;
    startDate?: string;
    endDate?: string;
}

async function getPaymentsData(searchParams: SearchParams) {
    try {
        const response = await PaymentService.getAllPayments({
            page: parseInt(searchParams.page || "1"),
            limit: parseInt(searchParams.limit || "50"),
            status: searchParams.status as any,
            paymentMethod: searchParams.paymentMethod as any,
            search: searchParams.search,
            sortBy: "createdAt",
            order: "desc",
        });
        return response;
    } catch (error) {
        console.error("Error fetching payments:", error);
        return { data: [], pagination: null };
    }
}

async function getStats() {
    try {
        const response = await PaymentService.getPaymentStats();
        return response.data;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return {
            totalRevenue: 0,
            paidPayments: 0,
            pendingPayments: 0,
            overduePayments: 0,
        };
    }
}

export default async function AdminPaymentPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const [paymentsResponse, stats] = await Promise.all([
        getPaymentsData(searchParams),
        getStats(),
    ]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Payment Management"
                description="Track and manage all payment transactions"
            />

            <Suspense fallback={<Loading />}>
                <PaymentStats stats={stats} />
            </Suspense>

            <Suspense fallback={<Loading/>}>
                <PaymentFilters />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <PaymentTable 
                    payments={paymentsResponse.data} 
                    pagination={paymentsResponse.pagination}
                />
            </Suspense>
        </div>
    );
}
