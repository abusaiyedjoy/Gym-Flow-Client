// types/trainer.types.ts

export enum Specialization {
    WEIGHT_TRAINING = 'WEIGHT_TRAINING',
    CARDIO = 'CARDIO',
    YOGA = 'YOGA',
    CROSSFIT = 'CROSSFIT',
    PILATES = 'PILATES',
    NUTRITION = 'NUTRITION',
    REHABILITATION = 'REHABILITATION',
    STRENGTH_TRAINING = 'STRENGTH_TRAINING',
    FLEXIBILITY = 'FLEXIBILITY',
    SPORTS_SPECIFIC = 'SPORTS_SPECIFIC',
}

export enum DayOfWeek {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    profileImage?: string | null;
    isActive: boolean;
    isVerified: boolean;
    createdAt: string;
}

export interface TrainerSpecialization {
    id: string;
    specialization: Specialization;
    proficiencyLevel: number;
    yearsOfExperience: number;
    trainerId: string;
}

export interface TrainerAvailability {
    id: string;
    trainerId: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface Member {
    id: string;
    user: {
        name: string;
        email: string;
        profileImage?: string | null;
    };
    currentPlan?: {
        name: string;
    } | null;
}

export interface Class {
    id: string;
    name: string;
    isActive: boolean;
    schedules?: any[];
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    member: {
        user: {
            name: string;
            profileImage?: string | null;
        };
    };
}

export interface Trainer {
    id: string;
    userId: string;
    employeeId: string;
    experienceYears: number;
    certifications: string[];
    bio?: string | null;
    languages: string[];
    salary?: number | null;
    maxCapacity: number;
    currentClients: number;
    totalClients: number;
    rating: number;
    reviewCount: number;
    successRate: number;
    isAvailable: boolean;
    joinDate: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    specializations?: TrainerSpecialization[];
    availability?: TrainerAvailability[];
    members?: Member[];
    classes?: Class[];
    reviews?: Review[];
    _count?: {
        members: number;
        classes: number;
        reviews: number;
        workoutPlans: number;
    };
}

export interface TrainerStats {
    totalTrainers: number;
    activeTrainers: number;
    inactiveTrainers: number;
    availableTrainers: number;
    unavailableTrainers: number;
    avgCapacityUsage: number;
    topRatedTrainers: Trainer[];
    trainersBySpecialization: Array<{
        specialization: string;
        count: number;
    }>;
}

export interface TrainerDashboard {
    trainer: Trainer;
    stats: {
        totalMembers: number;
        activeMembers: number;
        totalClasses: number;
        upcomingClasses: number;
        totalWorkoutPlans: number;
        averageRating: number;
        thisMonthReviews: number;
        capacityUsage: number;
    };
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: PaginationMeta;
    timestamp: string;
}

export interface TrainersResponse {
    success: boolean;
    message: string;
    data: Trainer[];
    meta: PaginationMeta;
    timestamp: string;
}

export interface TrainerStatsResponse extends ApiResponse<TrainerStats> { }

export interface GetTrainersParams {
    page?: number;
    limit?: number;
    search?: string;
    specialization?: Specialization;
    isAvailable?: boolean;
    minRating?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export interface CreateTrainerData {
    name: string;
    email: string;
    password: string;
    phone?: string;
    experienceYears: number;
    certifications?: string[];
    bio?: string;
    languages?: string[];
    salary?: number;
    maxCapacity?: number;
    specializations?: Array<{
        specialization: Specialization;
        proficiencyLevel?: number;
        yearsOfExperience?: number;
    }>;
}

export interface UpdateTrainerData {
    name?: string;
    phone?: string;
    experienceYears?: number;
    certifications?: string[];
    bio?: string;
    languages?: string[];
    salary?: number;
    maxCapacity?: number;
    isAvailable?: boolean;
}
