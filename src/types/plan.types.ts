// types/plan.types.ts

export interface MembershipPlan {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    price: number;
    features: string[];
    personalTrainingSessions: number;
    discount: number;
    isActive: boolean;
    isPopular: boolean;
    createdAt: string;
    updatedAt: string;
    _count?: {
        members: number;
        payments: number;
    };
}

export interface PlanMember {
    id: string;
    employeeId: string;
    joinDate: string;
    user: {
        name: string;
        email: string;
        phone?: string;
        profileImage?: string;
        isActive: boolean;
    };
}

export interface PlanStats {
    totalPlans: number;
    activePlans: number;
    inactivePlans: number;
    popularPlan: {
        id: string;
        name: string;
        memberCount: number;
    } | null;
    mostPurchasedPlan: {
        id: string;
        name: string;
        purchaseCount: number;
    } | null;
    totalRevenue: number;
    plansByDuration: Array<{
        durationDays: number;
        count: number;
    }>;
    revenueByPlan: Array<{
        planId: string;
        planName: string;
        revenue: number;
        count: number;
    }>;
}

export interface PlanSavings {
    planName: string;
    originalPrice: number;
    discount: number;
    discountAmount: number;
    finalPrice: number;
    monthlyEquivalent: number;
    durationDays: number;
    similarPlans: Array<{
        name: string;
        price: number;
    }>;
}

export interface GetPlansParams {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
    isPopular?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export interface PlansResponse {
    success: boolean;
    message: string;
    data: MembershipPlan[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    timestamp: string;
}

export interface SinglePlanResponse {
    success: boolean;
    message: string;
    data: MembershipPlan;
    timestamp: string;
}

export interface PlanStatsResponse {
    success: boolean;
    message: string;
    data: PlanStats;
    timestamp: string;
}

export interface PlanMembersResponse {
    success: boolean;
    message: string;
    data: {
        members: PlanMember[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    timestamp: string;
}

export interface CreatePlanData {
    name: string;
    description?: string;
    durationDays: number;
    price: number;
    features: string[];
    personalTrainingSessions?: number;
    discount?: number;
    isPopular?: boolean;
}

export interface UpdatePlanData {
    name?: string;
    description?: string;
    durationDays?: number;
    price?: number;
    features?: string[];
    personalTrainingSessions?: number;
    discount?: number;
    isPopular?: boolean;
}

export interface TogglePlanStatusData {
    isActive: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}
