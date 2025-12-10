// types/user.types.ts

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    TRAINER = 'TRAINER',
    MEMBER = 'MEMBER',
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    role: Role;
    profileImage?: string | null;
    isActive: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    member?: {
        id: string;
        membershipId: string;
        currentPlan?: {
            name: string;
        } | null;
    } | null;
    trainer?: {
        id: string;
        membershipId: string;
        rating?: number | null;
    } | null;
    admin?: {
        id: string;
        accessLevel?: string | null;
    } | null;
}

export interface UserWithDetails extends User {
    member?: {
        id: string;
        membershipId: string;
        dateOfBirth?: string | null;
        gender?: string | null;
        workoutExperience?: string | null;
        height?: number | null;
        weight?: number | null;
        currentPlan?: {
            id: string;
            name: string;
            price: number;
            durationDays: number;
        } | null;
        planStartDate?: string | null;
        planEndDate?: string | null;
        assignedTrainer?: {
            id: string;
            user: {
                name: string;
                profileImage?: string | null;
            };
        } | null;
    } | null;
    trainer?: {
        id: string;
        membershipId: string;
        bio?: string | null;
        experienceYears?: number | null;
        rating?: number | null;
        hourlyRate?: number | null;
        isAvailable: boolean;
        specializations?: Array<{
            id: string;
            name: string;
            level?: string | null;
        }>;
        availability?: Array<{
            id: string;
            dayOfWeek: string;
            startTime: string;
            endTime: string;
        }>;
    } | null;
    admin?: {
        id: string;
        accessLevel?: string | null;
    } | null;
}

export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    members: {
        total: number;
        active: number;
        inactive: number;
    };
    trainers: {
        total: number;
        active: number;
        inactive: number;
    };
    admins: number;
    recentUsers: number;
    usersByRole: Array<{
        role: Role;
        count: number;
    }>;
}

export interface UsersResponse {
    success: boolean;
    message: string;
    data: User[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: Role;
    isActive?: boolean;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export interface UpdateUserProfileData {
    name?: string;
    phone?: string;
    profileImage?: string;
}

export interface UpdateUserRoleData {
    role: Role;
}

export interface ToggleUserStatusData {
    isActive: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
}
