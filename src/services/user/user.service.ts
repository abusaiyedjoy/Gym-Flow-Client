// services/user/user.service.ts

import { serverFetch } from '@/lib/serverFetch';
import {
    User,
    UserWithDetails,
    UsersResponse,
    UserStats,
    GetUsersParams,
    UpdateUserProfileData,
    UpdateUserRoleData,
    ToggleUserStatusData,
    ApiResponse,
} from '@/types/user.types';

export class UserService {
    private static readonly BASE_PATH = '/user';

    static async getAllUsers(params?: GetUsersParams): Promise<UsersResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.role) queryParams.append('role', params.role);
        if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.order) queryParams.append('order', params.order);

        const queryString = queryParams.toString();
        const endpoint = queryString ? `${this.BASE_PATH}?${queryString}` : this.BASE_PATH;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch users');
        }

        return await response.json();
    }

    static async getUserById(userId: string): Promise<UserWithDetails> {
        const response = await serverFetch.get(`${this.BASE_PATH}/${userId}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user');
        }

        const result: ApiResponse<UserWithDetails> = await response.json();
        return result.data;
    }

    static async getUserStats(): Promise<UserStats> {
        const response = await serverFetch.get(`${this.BASE_PATH}/stats`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user stats');
        }

        const result: ApiResponse<UserStats> = await response.json();
        return result.data;
    }

    static async updateUserProfile(
        userId: string,
        data: UpdateUserProfileData
    ): Promise<User> {
        const response = await serverFetch.put(`${this.BASE_PATH}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update user profile');
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    }

    static async toggleUserStatus(
        userId: string,
        data: ToggleUserStatusData
    ): Promise<User> {
        const response = await serverFetch.put(
            `${this.BASE_PATH}/${userId}/toggle-status`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to toggle user status');
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    }

    static async updateUserRole(
        userId: string,
        data: UpdateUserRoleData
    ): Promise<User> {
        const response = await serverFetch.put(
            `${this.BASE_PATH}/${userId}/update-role`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update user role');
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    }

    static async deleteUser(userId: string): Promise<{ message: string }> {
        const response = await serverFetch.delete(`${this.BASE_PATH}/${userId}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete user');
        }

        const result: ApiResponse<{ message: string }> = await response.json();
        return result.data;
    }

    static async uploadAvatar(
        userId: string,
        file: File
    ): Promise<{ url: string }> {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await serverFetch.post(
            `${this.BASE_PATH}/${userId}/upload-avatar`,
            {
                body: formData,
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to upload avatar');
        }

        const result: ApiResponse<{ url: string }> = await response.json();
        return result.data;
    }
}
