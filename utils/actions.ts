// utils/actions.ts
"use server";

import { log } from "@/lib/logger";
import { 
  AppError, 
  ValidationError, 
  NotFoundError,
} from "@/lib/errors";
import { 
  ApiResponse, 
  successResponse, 
  errorResponse,
  appErrorToResponse 
} from "@/lib/types/api";
import { authenticateAndRedirect } from "@/lib/auth/auth-utils";
import { jobService } from "@/lib/services/job-service";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { toJobDTO, toJobDTOs, type JobResponseDTO } from "@/lib/dto/job.dto";
import type { JobFilterOptions } from "@/lib/jobs/filter-types";
import type { StatsResult } from "@/lib/jobs/queries";

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<ApiResponse<JobResponseDTO>> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Creating new job", { userId });
    
    const validated = createAndEditJobSchema.safeParse(values);
    if (!validated.success) {
      throw new ValidationError("Invalid job data", validated.error.errors);
    }
    
    const result = await jobService.createJob(userId, values);
    log.info("Job created successfully", { userId, jobId: result.id });
    return successResponse(toJobDTO(result));
  } catch (error) {
    log.error("Failed to create job", error);
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  jobMode?: string;
  monthYear?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  jobMode,
  monthYear,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<ApiResponse<{
  jobs: JobResponseDTO[];
  count: number;
  page: number;
  totalPages: number;
}>> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching jobs", { userId, search, jobStatus, page });
    
    const result = await jobService.getJobs(userId, {
      search,
      jobStatus,
      jobMode,
      monthYear,
      page,
      limit,
    });
    
    log.debug("Jobs fetched", { userId, count: result.jobs.length });
    return successResponse({
      jobs: toJobDTOs(result.jobs),
      count: result.count,
      page: result.page,
      totalPages: result.totalPages,
    }, {
      page: result.page,
      totalPages: result.totalPages,
      totalCount: result.count,
    });
  } catch (error) {
    log.error("Failed to fetch jobs", error);
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

export async function getJobFilterOptionsAction(): Promise<ApiResponse<JobFilterOptions>> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching job filter options", { userId });
    
    const { getCachedJobFilterOptions } = await import("@/lib/jobs/queries");
    const result = await getCachedJobFilterOptions(userId);
    
    log.debug("Job filter options fetched", { userId });
    return successResponse(result);
  } catch (error) {
    log.error("Failed to fetch job filter options", error);
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

export async function deleteJobAction(id: string): Promise<ApiResponse<JobResponseDTO>> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Deleting job", { userId, jobId: id });
    
    const result = await jobService.deleteJob(userId, id);
    if (!result) {
      throw new NotFoundError("Job");
    }
    
    log.info("Job deleted successfully", { userId, jobId: id });
    return successResponse(toJobDTO(result));
  } catch (error) {
    log.error("Failed to delete job", error, { jobId: id });
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

export async function getSingleJobAction(id: string): Promise<ApiResponse<JobResponseDTO>> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching single job", { userId, jobId: id });
    
    const job = await jobService.getJob(userId, id);
    if (!job) {
      throw new NotFoundError("Job");
    }
    
    log.debug("Job fetched successfully", { userId, jobId: id });
    return successResponse(toJobDTO(job));
  } catch (error) {
    log.error("Failed to fetch single job", error, { jobId: id });
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<ApiResponse<JobResponseDTO>> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Updating job", { userId, jobId: id });
    
    const validated = createAndEditJobSchema.safeParse(values);
    if (!validated.success) {
      throw new ValidationError("Invalid job data", validated.error.errors);
    }
    
    const result = await jobService.updateJob(userId, id, values);
    if (!result) {
      throw new NotFoundError("Job");
    }
    
    log.info("Job updated successfully", { userId, jobId: id });
    return successResponse(toJobDTO(result));
  } catch (error) {
    log.error("Failed to update job", error, { jobId: id });
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

export async function getStatsAction(): Promise<ApiResponse<StatsResult>> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching stats", { userId });
    
    const result = await jobService.getStats(userId);
    
    log.debug("Stats fetched", { userId });
    return successResponse(result);
  } catch (error) {
    log.error("Failed to fetch stats", error);
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

export async function getChartsDataAction(): Promise<
  ApiResponse<Array<{ date: string; count: number }>>
> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching charts data", { userId });
    
    const result = await jobService.getCharts(userId);
    
    log.debug("Charts data fetched", { userId });
    return successResponse(result);
  } catch (error) {
    log.error("Failed to fetch charts data", error);
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}

export async function getAllJobsForDownloadAction(): Promise<ApiResponse<JobResponseDTO[]>> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Downloading all jobs", { userId });
    
    const prisma = (await import("./db")).default;
    const result = await prisma.job.findMany({
      where: { clerkId: userId },
      orderBy: { createdAt: "desc" },
    });
    
    log.info("Jobs downloaded", { userId, count: result.length });
    return successResponse(toJobDTOs(result));
  } catch (error) {
    log.error("Failed to download jobs", error);
    if (error instanceof AppError) {
      return appErrorToResponse(error);
    }
    return errorResponse("INTERNAL_ERROR", "An unexpected error occurred");
  }
}