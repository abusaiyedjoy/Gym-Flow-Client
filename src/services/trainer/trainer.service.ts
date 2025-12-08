// services/trainer/trainer.service.ts

import { serverFetch } from '@/lib/serverFetch';
import {
  Trainer,
  TrainersResponse,
  TrainerStatsResponse,
  GetTrainersParams,
  CreateTrainerData,
  UpdateTrainerData,
  ApiResponse,
} from '@/types/trainer.types';

export class TrainerService {
  private static readonly BASE_PATH = '/trainer';

  /**
   * Get all trainers with pagination and filters
   */
  static async getAllTrainers(params?: GetTrainersParams): Promise<TrainersResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.specialization) queryParams.append('specialization', params.specialization);
    if (params?.isAvailable !== undefined) queryParams.append('isAvailable', params.isAvailable.toString());
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${this.BASE_PATH}?${queryString}` : this.BASE_PATH;

    const response = await serverFetch.get(endpoint);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch trainers');
    }

    return await response.json();
  }

  /**
   * Get trainer by ID
   */
  static async getTrainerById(trainerId: string): Promise<Trainer> {
    const response = await serverFetch.get(`${this.BASE_PATH}/${trainerId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch trainer');
    }

    const result: ApiResponse<Trainer> = await response.json();
    return result.data;
  }

  /**
   * Get trainer statistics
   */
  static async getTrainerStats(): Promise<ApiResponse<TrainerStatsResponse>> {
    const response = await serverFetch.get(`${this.BASE_PATH}/stats`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch trainer stats');
    }

    return await response.json();
  }

  /**
   * Create new trainer
   */
  static async createTrainer(_: null, formData: FormData): Promise<ApiResponse<Trainer>> {
    const specializationsRaw = formData.getAll('specializations');
    const certificationsRaw = formData.getAll('certifications');
    const languagesRaw = formData.getAll('languages');

    // Parse specializations from JSON strings to objects
    const specializations = specializationsRaw.length > 0
      ? specializationsRaw.map(spec => JSON.parse(spec as string))
      : [];

    // Convert FormDataEntryValue[] to string[]
    const certifications = certificationsRaw.length > 0
      ? certificationsRaw.map(cert => cert as string)
      : [];

    const languages = languagesRaw.length > 0
      ? languagesRaw.map(lang => lang as string)
      : [];

    // Build payload matching backend schema exactly
    const payload: any = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      experienceYears: Number(formData.get('experienceYears')),
      maxCapacity: Number(formData.get('maxCapacity')),
    };

    // Add optional fields only if they exist
    const phone = formData.get('phone');
    if (phone) payload.phone = phone as string;

    const bio = formData.get('bio');
    if (bio) payload.bio = bio as string;

    const salary = formData.get('salary');
    if (salary) payload.salary = Number(salary);

    // Add arrays only if they have items
    if (certifications.length > 0) payload.certifications = certifications;
    if (languages.length > 0) payload.languages = languages;
    if (specializations.length > 0) payload.specializations = specializations;

    const response = await serverFetch.post(this.BASE_PATH, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result: ApiResponse<Trainer> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create trainer');
    }

    return result;
  }

  /**
   * Update trainer
   */
  static async updateTrainer(_: null, formData: FormData): Promise<ApiResponse<Trainer>> {
    const trainerId = formData.get('trainerId') as string;
    const specializations = formData.getAll('specializations');
    const certifications = formData.getAll('certifications');

    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      dateOfBirth: formData.get('dateOfBirth'),
      gender: formData.get('gender'),
      specializations: specializations.length > 0 ? specializations : undefined,
      certifications: certifications.length > 0 ? certifications : undefined,
      experienceYears: formData.get('experienceYears') ? Number(formData.get('experienceYears')) : undefined,
      maxCapacity: formData.get('maxCapacity') ? Number(formData.get('maxCapacity')) : undefined,
      hourlyRate: formData.get('hourlyRate') ? Number(formData.get('hourlyRate')) : undefined,
      bio: formData.get('bio'),
      isAvailable: formData.get('isAvailable') === 'true',
    };

    const response = await serverFetch.put(`${this.BASE_PATH}/${trainerId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result: ApiResponse<Trainer> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update trainer');
    }

    return result;
  }

  /**
   * Delete trainer (soft delete)
   */
  static async deleteTrainer(trainerId: string): Promise<{ message: string }> {
    const response = await serverFetch.delete(`${this.BASE_PATH}/${trainerId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete trainer');
    }

    const result: ApiResponse<{ message: string }> = await response.json();
    return result.data;
  }
}