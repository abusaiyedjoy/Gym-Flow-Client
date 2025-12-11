// services/plan/plan.service.ts

import { serverFetch } from '@/lib/serverFetch';
import {
    MembershipPlan,
    PlansResponse,
    SinglePlanResponse,
    PlanStats,
    PlanStatsResponse,
    PlanMembersResponse,
    PlanSavings,
    GetPlansParams,
    CreatePlanData,
    UpdatePlanData,
    TogglePlanStatusData,
    ApiResponse,
} from '@/types/plan.types';

export class PlanService {
    private static readonly BASE_PATH = '/plan';

    /**
     * Get all membership plans with pagination and filters
     */
    static async getAllPlans(params?: GetPlansParams): Promise<PlansResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
        if (params?.isPopular !== undefined) queryParams.append('isPopular', params.isPopular.toString());
        if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.order) queryParams.append('order', params.order);

        const queryString = queryParams.toString();
        const endpoint = queryString ? `${this.BASE_PATH}?${queryString}` : this.BASE_PATH;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch plans');
        }

        return await response.json();
    }

    /**
     * Get active plans only (for public display)
     */
    static async getActivePlans(): Promise<MembershipPlan[]> {
        const response = await serverFetch.get(`${this.BASE_PATH}/active`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch active plans');
        }

        const result: ApiResponse<MembershipPlan[]> = await response.json();
        return result.data;
    }

    /**
     * Get popular plans
     */
    static async getPopularPlans(): Promise<MembershipPlan[]> {
        const response = await serverFetch.get(`${this.BASE_PATH}/popular`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch popular plans');
        }

        const result: ApiResponse<MembershipPlan[]> = await response.json();
        return result.data;
    }

    /**
     * Get plan by ID
     */
    static async getPlanById(planId: string): Promise<MembershipPlan> {
        const response = await serverFetch.get(`${this.BASE_PATH}/${planId}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch plan');
        }

        const result: SinglePlanResponse = await response.json();
        return result.data;
    }

    /**
     * Get plan statistics
     */
    static async getPlanStats(): Promise<PlanStats> {
        const response = await serverFetch.get(`${this.BASE_PATH}/stats`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch plan stats');
        }

        const result: PlanStatsResponse = await response.json();
        return result.data;
    }

    /**
     * Get plan members
     */
    static async getPlanMembers(
        planId: string,
        page: number = 1,
        limit: number = 10
    ): Promise<PlanMembersResponse['data']> {
        const response = await serverFetch.get(
            `${this.BASE_PATH}/${planId}/members?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch plan members');
        }

        const result: PlanMembersResponse = await response.json();
        return result.data;
    }

    /**
     * Calculate plan savings
     */
    static async calculateSavings(planId: string): Promise<PlanSavings> {
        const response = await serverFetch.get(`${this.BASE_PATH}/${planId}/savings`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to calculate savings');
        }

        const result: ApiResponse<PlanSavings> = await response.json();
        return result.data;
    }

    /**
     * Compare multiple plans
     */
    static async comparePlans(planIds: string[]): Promise<MembershipPlan[]> {
        const response = await serverFetch.post(`${this.BASE_PATH}/compare`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ planIds }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to compare plans');
        }

        const result: ApiResponse<MembershipPlan[]> = await response.json();
        return result.data;
    }

    /**
     * Create new membership plan (Admin only)
     */
    static async createPlan(data: CreatePlanData): Promise<MembershipPlan> {
        const response = await serverFetch.post(this.BASE_PATH, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create plan');
        }

        const result: SinglePlanResponse = await response.json();
        return result.data;
    }

    /**
     * Update membership plan (Admin only)
     */
    static async updatePlan(
        planId: string,
        data: UpdatePlanData
    ): Promise<MembershipPlan> {
        const response = await serverFetch.put(`${this.BASE_PATH}/${planId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update plan');
        }

        const result: SinglePlanResponse = await response.json();
        return result.data;
    }

    /**
     * Toggle plan status (Admin only)
     */
    static async togglePlanStatus(
        planId: string,
        data: TogglePlanStatusData
    ): Promise<MembershipPlan> {
        const response = await serverFetch.patch(
            `${this.BASE_PATH}/${planId}/toggle-status`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to toggle plan status');
        }

        const result: SinglePlanResponse = await response.json();
        return result.data;
    }

    /**
     * Delete membership plan (Admin only)
     */
    static async deletePlan(planId: string): Promise<{ message: string }> {
        const response = await serverFetch.delete(`${this.BASE_PATH}/${planId}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete plan');
        }

        const result: ApiResponse<{ message: string }> = await response.json();
        return result.data;
    }
}
