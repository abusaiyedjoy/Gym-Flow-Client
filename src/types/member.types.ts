// types/member.types.ts

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum WorkoutExperience {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum PreferredTime {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  SSLCOMMERZ = 'SSLCOMMERZ',
  STRIPE = 'STRIPE',
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

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
}

export interface Trainer {
  id: string;
  user: {
    name: string;
    email?: string;
    profileImage?: string | null;
  };
  specializations?: string[];
}

export interface Payment {
  id: string;
  amount: number;
  discount: number;
  finalAmount: number;
  paymentMethod: PaymentMethod;
  invoiceNumber: string;
  status: string;
  paymentDate: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  date: string;
  checkIn: string;
  checkOut?: string;
}

export interface BodyMetric {
  id: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  recordDate: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  isActive: boolean;
  trainer: Trainer;
}

export interface Member {
  message: string;
  redirectTo: string;
  success: any;
  id: string;
  userId: string;
  employeeId: string;
  dateOfBirth?: string | null;
  gender?: Gender | null;
  height?: number | null;
  currentWeight?: number | null;
  targetWeight?: number | null;
  bloodGroup?: string | null;
  emergencyContact?: string | null;
  emergencyContactName?: string | null;
  address?: string | null;
  currentPlanId?: string | null;
  assignedTrainerId?: string | null;
  membershipStartDate?: string | null;
  membershipEndDate?: string | null;
  fitnessGoals?: string[];
  healthConditions?: string[];
  workoutExperience?: WorkoutExperience | null;
  preferredWorkoutStyle?: string[];
  weeklyFrequency?: number | null;
  preferredTime?: PreferredTime | null;
  trainerAssignedDate?: string | null;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  currentPlan?: MembershipPlan | null;
  assignedTrainer?: Trainer | null;
  payments?: Payment[];
  attendance?: Attendance[];
  bodyMetrics?: BodyMetric[];
  workoutPlans?: WorkoutPlan[];
}

export interface MemberStats {
  totalAttendance: number;
  thisMonthAttendance: number;
  upcomingClasses: number;
  daysRemaining: number;
}

export interface MemberDashboard {
  member: Member;
  stats: MemberStats;
  latestMetrics?: BodyMetric;
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
  redirectTo: string;
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}

export interface MembersResponse {
  success: boolean;
  message: string;
  data: Member[];
  meta: PaginationMeta;
  timestamp: string;
}

export interface MemberStatsResponse {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  newMembersThisMonth: number;
  membersWithTrainer: number;
  membersWithoutTrainer: number;
  membersWithPlan: number;
  membersWithoutPlan: number;
  membersByExperience: Array<{
    experience: WorkoutExperience | null;
    count: number;
  }>;
}

export interface GetMembersParams {
  page?: number;
  limit?: number;
  search?: string;
  planId?: string;
  trainerId?: string;
  isActive?: boolean;
  workoutExperience?: WorkoutExperience;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface CreateMemberData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  height?: number;
  currentWeight?: number;
  targetWeight?: number;
  bloodGroup?: string;
  emergencyContact?: string;
  emergencyContactName?: string;
  address?: string;
}

export interface UpdateMemberData {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  height?: number;
  currentWeight?: number;
  targetWeight?: number;
  bloodGroup?: string;
  emergencyContact?: string;
  emergencyContactName?: string;
  address?: string;
}

export interface UpdateFitnessProfileData {
  fitnessGoals?: string[];
  healthConditions?: string[];
  workoutExperience?: WorkoutExperience;
  preferredWorkoutStyle?: string[];
  weeklyFrequency?: number;
  preferredTime?: PreferredTime;
}

export interface AssignTrainerData {
  trainerId: string;
}

export interface UpdateMemberPlanData {
  planId: string;
}

export interface RenewMembershipData {
  planId: string;
  paymentMethod: PaymentMethod;
}