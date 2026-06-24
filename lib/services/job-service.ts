import { jobRepository } from '@/lib/repositories/job-repository';
import { invalidateUserJobCaches } from '@/lib/invalidate-jobs-server';
import { 
  getCachedJobs, 
  getCachedJob, 
  getCachedStats, 
  getCachedCharts 
} from '@/lib/jobs/queries';
import type { CreateAndEditJobType } from '@/utils/types';

export const jobService = {
  async createJob(clerkId: string, data: CreateAndEditJobType) {
    const job = await jobRepository.create({ ...data, clerkId });
    await invalidateUserJobCaches(clerkId, job.id);
    return job;
  },

  async getJobs(clerkId: string, filters: {
    search?: string;
    jobStatus?: string;
    jobMode?: string;
    monthYear?: string;
    page: number;
    limit: number;
  }) {
    return getCachedJobs(
      clerkId,
      filters.search ?? '',
      filters.jobStatus ?? 'all',
      filters.jobMode ?? 'all',
      filters.monthYear ?? 'all',
      filters.page,
      filters.limit
    );
  },

  async getJob(clerkId: string, id: string) {
    return getCachedJob(clerkId, id);
  },

  async updateJob(clerkId: string, id: string, data: CreateAndEditJobType) {
    const job = await jobRepository.update(id, clerkId, data);
    await invalidateUserJobCaches(clerkId, id);
    return job;
  },

  async deleteJob(clerkId: string, id: string) {
    const job = await jobRepository.delete(id, clerkId);
    await invalidateUserJobCaches(clerkId, id);
    return job;
  },

  async getStats(clerkId: string) {
    return getCachedStats(clerkId);
  },

  async getCharts(clerkId: string) {
    return getCachedCharts(clerkId);
  },
};