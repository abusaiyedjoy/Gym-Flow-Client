// types/payment.types.ts

export enum PaymentStatus {
    PAID = 'PAID',
    PENDING = 'PENDING',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
    CASH = 'CASH',
    CARD = 'CARD',
    BKASH = 'BKASH',
    NAGAD = 'NAGAD',
    SSLCOMMERZ = 'SSLCOMMERZ',
    STRIPE = 'STRIPE',
}

export interface Payment {
    id: string;
    memberId: string;
    planId: string | null;
    amount: number;
    discount: number;
    tax: number;
    finalAmount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    paymentDate: string | null;
    paidAt: string | null;
    paidAmount: number | null;
    dueDate: string | null;
    invoiceNumber: string;
    invoiceUrl: string | null;
    transactionId: string | null;
    gatewayResponse: any;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    member: {
        id: string;
        user: {
            name: string;
            email: string;
            phone: string | null;
            profileImage: string | null;
        };
    };
    plan: {
        id: string;
        name: string;
        price: number;
        durationDays: number;
        discount: number;
    } | null;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaymentsResponse {
    success: boolean;
    message: string;
    data: Payment[];
    meta: PaginationMeta;
    timestamp: string;
}

export interface PaymentResponse {
    success: boolean;
    message: string;
    data: Payment;
    timestamp: string;
}

export interface InitiatePaymentData {
    memberId: string;
    planId: string;
    paymentMethod: PaymentMethod;
    successUrl?: string;
    failUrl?: string;
    cancelUrl?: string;
}

export interface InitiatePaymentResponse {
    success: boolean;
    message: string;
    data: {
        paymentId: string;
        gatewayUrl: string;
        sessionKey: string;
    };
    timestamp: string;
}

export interface CreatePaymentData {
    memberId: string;
    planId: string;
    paymentMethod: PaymentMethod;
    discount?: number;
    notes?: string;
}

export interface PaymentStatsResponse {
    success: boolean;
    message: string;
    data: {
        totalPayments: number;
        paidPayments: number;
        pendingPayments: number;
        overduePayments: number;
        cancelledPayments: number;
        totalRevenue: number;
        revenueByMethod: Array<{
            method: string;
            revenue: number;
            count: number;
        }>;
        revenueByPlan: Array<{
            planId: string;
            planName: string;
            revenue: number;
            count: number;
        }>;
        recentPayments: Array<{
            id: string;
            invoiceNumber: string;
            memberName: string;
            planName: string;
            amount: number;
            date: string;
        }>;
    };
    timestamp: string;
}

export interface GetPaymentsParams {
    page?: number;
    limit?: number;
    search?: string;
    memberId?: string;
    planId?: string;
    status?: PaymentStatus;
    paymentMethod?: PaymentMethod;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}
