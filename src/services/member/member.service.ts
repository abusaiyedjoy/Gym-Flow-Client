// services/member/member.service.ts

import { serverFetch } from '@/lib/serverFetch';
import {
  Member,
  MembersResponse,
  MemberDashboard,
  MemberStatsResponse,
  GetMembersParams,
  UpdateFitnessProfileData,
  AssignTrainerData,
  UpdateMemberPlanData,
  RenewMembershipData,
  ApiResponse,
} from '@/types/member.types';

export class MemberService {
  private static readonly BASE_PATH = '/member';

  /**
   * Get all members with pagination and filters
   */
  static async getAllMembers(params?: GetMembersParams): Promise<MembersResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.planId) queryParams.append('planId', params.planId);
    if (params?.trainerId) queryParams.append('trainerId', params.trainerId);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
    if (params?.workoutExperience) queryParams.append('workoutExperience', params.workoutExperience);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${this.BASE_PATH}?${queryString}` : this.BASE_PATH;

    const response = await serverFetch.get(endpoint);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch members');
    }

    return await response.json();
  }

  /**
   * Get member by ID
   */
  static async getMemberById(memberId: string): Promise<Member> { 
    const response = await serverFetch.get(`${this.BASE_PATH}/${memberId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch member');
    }

    const result: ApiResponse<Member> = await response.json();
    return result.data;
  }

  /**
   * Get member dashboard data
   */
  static async getMemberDashboard(memberId: string): Promise<MemberDashboard> {
    const response = await serverFetch.get(`${this.BASE_PATH}/${memberId}/dashboard`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch member dashboard');
    }

    const result: ApiResponse<MemberDashboard> = await response.json();
    return result.data;
  }

  /**
   * Get member statistics
   */
  static async getMemberStats(): Promise<MemberStatsResponse> {
    const response = await serverFetch.get(`${this.BASE_PATH}/stats`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch member stats');
    }

    const result: ApiResponse<MemberStatsResponse> = await response.json();
    return result.data;
  }

  /**
   * Get members with expiring membership
   */
  static async getExpiringMembers(days: number = 7): Promise<Member[]> {
    const response = await serverFetch.get(`${this.BASE_PATH}/expiring-soon?days=${days}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch expiring members');
    }

    const result: ApiResponse<Member[]> = await response.json();
    return result.data;
  }

  /**
   * Create new member
   */
  static async createMember(_: null, formData: FormData): Promise<ApiResponse<Member>> {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      height: Number(formData.get("height")),
      currentWeight: Number(formData.get("currentWeight")),
      targetWeight: Number(formData.get("targetWeight")),
      bloodGroup: formData.get("bloodGroup"),
      emergencyContact: formData.get("emergencyContact"),
      emergencyContactName: formData.get("emergencyContactName"),
      address: formData.get("address"),
      planId: formData.get("planId"),
    };

    const response = await serverFetch.post(this.BASE_PATH, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: ApiResponse<Member> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create member");
    }

    return result; // IMPORTANT
  }


  /**
   * Update member
   */
  static async updateMember(_: null, formData: FormData): Promise<ApiResponse<Member>> {
    const memberId = formData.get("memberId") as string;

    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      height: formData.get("height") ? Number(formData.get("height")) : undefined,
      currentWeight: formData.get("currentWeight") ? Number(formData.get("currentWeight")) : undefined,
      targetWeight: formData.get("targetWeight") ? Number(formData.get("targetWeight")) : undefined,
      bloodGroup: formData.get("bloodGroup"),
      emergencyContact: formData.get("emergencyContact"),
      emergencyContactName: formData.get("emergencyContactName"),
      address: formData.get("address"),
    };

    const response = await serverFetch.put(`${this.BASE_PATH}/${memberId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result: ApiResponse<Member> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update member');
    }

    return result;
  }

  /**
   * Update fitness profile
   */
  static async updateFitnessProfile(
    memberId: string,
    profileData: UpdateFitnessProfileData
  ): Promise<Member> {
    const response = await serverFetch.put(`${this.BASE_PATH}/${memberId}/fitness-profile`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update fitness profile');
    }

    const result: ApiResponse<Member> = await response.json();
    return result.data;
  }

  /**
   * Assign trainer to member
   */
  static async assignTrainer(memberId: string, trainerData: AssignTrainerData): Promise<Member> {
    const response = await serverFetch.put(`${this.BASE_PATH}/${memberId}/assign-trainer`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to assign trainer');
    }

    const result: ApiResponse<Member> = await response.json();
    return result.data;
  }

  /**
   * Update member plan
   */
  static async updateMemberPlan(memberId: string, planData: UpdateMemberPlanData): Promise<Member> {
    const response = await serverFetch.put(`${this.BASE_PATH}/${memberId}/update-plan`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update member plan');
    }

    const result: ApiResponse<Member> = await response.json();
    return result.data;
  }

  /**
   * Renew membership
   */
  static async renewMembership(
    memberId: string,
    renewalData: RenewMembershipData
  ): Promise<{ member: Member; payment: any }> {
    const response = await serverFetch.post(`${this.BASE_PATH}/${memberId}/renew-membership`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renewalData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to renew membership');
    }

    const result: ApiResponse<{ member: Member; payment: any }> = await response.json();
    return result.data;
  }

  /**
   * Delete member (soft delete)
   */
  static async deleteMember(memberId: string): Promise<{ message: string }> {
    const response = await serverFetch.delete(`${this.BASE_PATH}/${memberId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete member');
    }

    const result: ApiResponse<{ message: string }> = await response.json();
    return result.data;
  }
}