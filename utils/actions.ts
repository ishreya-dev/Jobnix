// utils/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { jobService } from "@/lib/services/job-service";
import { log } from "@/lib/logger";
import { 
  AppError, 
  ValidationError, 
  NotFoundError, 
  UnauthorizedError,
  handleServerError 
} from "@/lib/errors";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import type { JobFilterOptions } from "@/lib/jobs/filter-types";
import type { StatsResult } from "@/lib/jobs/queries";

async function authenticateAndRedirect(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    log.warn("Unauthenticated access attempt, redirecting to home");
    redirect("/");
  }
  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Creating new job", { userId });
    
    // Validate input
    const validated = createAndEditJobSchema.safeParse(values);
    if (!validated.success) {
      throw new ValidationError("Invalid job data", validated.error.errors);
    }
    
    const result = await jobService.createJob(userId, values);
    log.info("Job created successfully", { userId, jobId: result.id });
    return result;
  } catch (error) {
    log.error("Failed to create job", error);
    // Re-throw specific errors, return null for others
    if (error instanceof AppError) {
      throw error;
    }
    return null;
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
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
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
    
    log.debug("Jobs fetched", { userId, count: result.jobs.length, totalPages: result.totalPages });
    return result;
  } catch (error) {
    log.error("Failed to fetch jobs", error);
    if (error instanceof AppError) {
      throw error;
    }
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function getJobFilterOptionsAction(): Promise<JobFilterOptions> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching job filter options", { userId });
    
    const { getCachedJobFilterOptions } = await import("@/lib/jobs/queries");
    const result = await getCachedJobFilterOptions(userId);
    
    log.debug("Job filter options fetched", { userId, months: result.months.length });
    return result;
  } catch (error) {
    log.error("Failed to fetch job filter options", error);
    if (error instanceof AppError) {
      throw error;
    }
    return { months: [] };
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Deleting job", { userId, jobId: id });
    
    const result = await jobService.deleteJob(userId, id);
    if (!result) {
      throw new NotFoundError("Job");
    }
    
    log.info("Job deleted successfully", { userId, jobId: id });
    return result;
  } catch (error) {
    log.error("Failed to delete job", error, { jobId: id });
    if (error instanceof AppError) {
      throw error;
    }
    return null;
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching single job", { userId, jobId: id });
    
    const job = await jobService.getJob(userId, id);
    if (!job) {
      log.warn("Job not found", { userId, jobId: id });
      redirect("/dashboard");
    }
    
    log.debug("Job fetched successfully", { userId, jobId: id });
    return job;
  } catch (error) {
    log.error("Failed to fetch single job", error, { jobId: id });
    if (error instanceof AppError) {
      throw error;
    }
    redirect("/dashboard");
  }
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Updating job", { userId, jobId: id });
    
    // Validate input
    const validated = createAndEditJobSchema.safeParse(values);
    if (!validated.success) {
      throw new ValidationError("Invalid job data", validated.error.errors);
    }
    
    const result = await jobService.updateJob(userId, id, values);
    if (!result) {
      throw new NotFoundError("Job");
    }
    
    log.info("Job updated successfully", { userId, jobId: id });
    return result;
  } catch (error) {
    log.error("Failed to update job", error, { jobId: id });
    if (error instanceof AppError) {
      throw error;
    }
    return null;
  }
}

export async function getStatsAction(): Promise<StatsResult> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching stats", { userId });
    
    const result = await jobService.getStats(userId);
    
    log.debug("Stats fetched", { userId });
    return result;
  } catch (error) {
    log.error("Failed to fetch stats", error);
    if (error instanceof AppError) {
      throw error;
    }
    redirect("/dashboard");
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  try {
    const userId = await authenticateAndRedirect();
    log.debug("Fetching charts data", { userId });
    
    const result = await jobService.getCharts(userId);
    
    log.debug("Charts data fetched", { userId, dataPoints: result.length });
    return result;
  } catch (error) {
    log.error("Failed to fetch charts data", error);
    if (error instanceof AppError) {
      throw error;
    }
    redirect("/dashboard");
  }
}

export async function getAllJobsForDownloadAction(): Promise<JobType[]> {
  try {
    const userId = await authenticateAndRedirect();
    log.info("Downloading all jobs", { userId });
    
    const prisma = (await import("./db")).default;
    const result = await prisma.job.findMany({
      where: { clerkId: userId },
      orderBy: { createdAt: "desc" },
    });
    
    log.info("Jobs downloaded", { userId, count: result.length });
    return result;
  } catch (error) {
    log.error("Failed to download jobs", error);
    if (error instanceof AppError) {
      throw error;
    }
    return [];
  }
}