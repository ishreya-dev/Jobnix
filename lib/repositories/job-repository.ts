// lib/repositories/job-repository.ts
import prisma from '@/utils/db';
import { logger } from '@/lib/logger';
import type { JobType, CreateAndEditJobType } from '@/utils/types';

const repoLogger = logger.child({ repository: 'job-repository' });

export const jobRepository = {
  async create(data: CreateAndEditJobType & { clerkId: string }): Promise<JobType> {
    repoLogger.debug({ clerkId: data.clerkId }, 'Creating job in database');
    return prisma.job.create({ data });
  },

  async delete(id: string, clerkId: string): Promise<JobType> {
    repoLogger.debug({ id, clerkId }, 'Deleting job from database');
    return prisma.job.delete({ 
      where: { id, clerkId } 
    });
  },

  async update(id: string, clerkId: string, data: CreateAndEditJobType): Promise<JobType> {
    repoLogger.debug({ id, clerkId }, 'Updating job in database');
    return prisma.job.update({ 
      where: { id, clerkId }, 
      data 
    });
  },

  async findById(id: string, clerkId: string): Promise<JobType | null> {
    repoLogger.debug({ id, clerkId }, 'Finding job in database');
    return prisma.job.findFirst({ 
      where: { id, clerkId } 
    });
  },
};