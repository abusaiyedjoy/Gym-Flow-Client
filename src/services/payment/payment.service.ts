
import { serverFetch } from '@/lib/serverFetch';
import {
    Payment,
    PaymentResponse,
    InitiatePaymentData,
    InitiatePaymentResponse,
    CreatePaymentData,
    PaymentStatsResponse,
    GetPaymentsParams,
} from '@/types/payment.types';

interface PaymentsResponseWithPagination {
    success: boolean;
    message: string;
    data: Payment[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export class PaymentService {
    private static readonly BASE_PATH = '/payment';

    /**
     * Get all payments with pagination and filters
     */
    static async getAllPayments(params?: GetPaymentsParams): Promise<PaymentsResponseWithPagination> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.memberId) queryParams.append('memberId', params.memberId);
        if (params?.planId) queryParams.append('planId', params.planId);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.paymentMethod) queryParams.append('paymentMethod', params.paymentMethod);
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.order) queryParams.append('order', params.order);

        const queryString = queryParams.toString();
        const endpoint = queryString ? `${this.BASE_PATH}?${queryString}` : this.BASE_PATH;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch payments');
        }

        return await response.json();
    }

    /**
     * Get payment by ID
     */
    static async getPaymentById(paymentId: string): Promise<Payment> {
        const response = await serverFetch.get(`${this.BASE_PATH}/${paymentId}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch payment');
        }

        const result: PaymentResponse = await response.json();
        return result.data;
    }

    /**
     * Get member payments
     */
    static async getMemberPayments(
        memberId: string,
        page: number = 1,
        limit: number = 10
    ): Promise<PaymentsResponseWithPagination> {
        const response = await serverFetch.get(
            `${this.BASE_PATH}/member/${memberId}?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch member payments');
        }

        return await response.json();
    }

    /**
     * Get payment statistics
     */
    static async getPaymentStats(
        startDate?: string,
        endDate?: string
    ): Promise<PaymentStatsResponse> {
        const queryParams = new URLSearchParams();
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        const queryString = queryParams.toString();
        const endpoint = queryString ? `${this.BASE_PATH}/stats?${queryString}` : `${this.BASE_PATH}/stats`;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch payment stats');
        }

        return await response.json();
    }

    /**
     * Create new payment (for admin)
     */
    static async createPayment(data: CreatePaymentData): Promise<PaymentResponse> {
        const response = await serverFetch.post(this.BASE_PATH, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result: PaymentResponse = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to create payment');
        }

        return result;
    }

    /**
     * Initiate online payment
     */
    static async initiatePayment(data: InitiatePaymentData): Promise<InitiatePaymentResponse> {
        const response = await serverFetch.post(`${this.BASE_PATH}/initiate`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result: InitiatePaymentResponse = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to initiate payment');
        }

        return result;
    }

    /**
     * Update payment status
     */
    static async updatePaymentStatus(
        paymentId: string,
        status: string,
        notes?: string
    ): Promise<PaymentResponse> {
        const response = await serverFetch.put(`${this.BASE_PATH}/${paymentId}/status`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, notes }),
        });

        const result: PaymentResponse = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to update payment status');
        }

        return result;
    }

    /**
     * Process refund
     */
    static async processRefund(
        paymentId: string,
        reason: string,
        amount?: number
    ): Promise<PaymentResponse> {
        const response = await serverFetch.post(`${this.BASE_PATH}/${paymentId}/refund`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason, amount }),
        });

        const result: PaymentResponse = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to process refund');
        }

        return result;
    }

    /**
     * Get invoice
     */
    static async getInvoice(paymentId: string): Promise<any> {
        const response = await serverFetch.get(`${this.BASE_PATH}/${paymentId}/invoice`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch invoice');
        }

        return await response.json();
    }

    /**
     * Get overdue payments
     */
    static async getOverduePayments(): Promise<PaymentsResponseWithPagination> {
        const response = await serverFetch.get(`${this.BASE_PATH}/overdue`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch overdue payments');
        }

        return await response.json();
    }

    /**
     * Get pending payments
     */
    static async getPendingPayments(): Promise<PaymentsResponseWithPagination> {
        const response = await serverFetch.get(`${this.BASE_PATH}/pending`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch pending payments');
        }

        return await response.json();
    }

    /**
     * Get member's most recent pending payment
     */
    static async getMemberPendingPayment(memberId: string): Promise<Payment | null> {
        try {
            const response = await this.getMemberPayments(memberId, 1, 10);

            // Find the most recent pending payment
            const pendingPayment = response.data.find(
                (payment: Payment) => payment.status === 'PENDING'
            );

            return pendingPayment || null;
        } catch (error) {
            console.error('Failed to fetch pending payment:', error);
            return null;
        }
    }

    /**
     * Test payment success (for development)
     */
    static async testPaymentSuccess(paymentId: string): Promise<PaymentResponse> {
        const response = await serverFetch.post(`${this.BASE_PATH}/test-success/${paymentId}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to test payment success');
        }

        return await response.json();
    }
}