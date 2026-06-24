import type { JobType } from '@/utils/types';

export type JobResponseDTO = {
  id: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
  createdAt: string;
  updatedAt: string;
};

export function toJobDTO(job: JobType): JobResponseDTO {
  return {
    id: job.id,
    position: job.position,
    company: job.company,
    location: job.location,
    status: job.status,
    mode: job.mode,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}

export function toJobDTOs(jobs: JobType[]): JobResponseDTO[] {
  return jobs.map(toJobDTO);
}

export function toJobPaginatedDTO(
  data: {
    jobs: JobType[];
    count: number;
    page: number;
    totalPages: number;
  }
): {
  jobs: JobResponseDTO[];
  count: number;
  page: number;
  totalPages: number;
} {
  return {
    jobs: toJobDTOs(data.jobs),
    count: data.count,
    page: data.page,
    totalPages: data.totalPages,
  };
}