// lib/errors.ts
import { log } from './logger';

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    code: string,
    message: string,
    statusCode: number = 500,
    details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: unknown) {
    super('DATABASE_ERROR', message, 500, details);
  }
}

// Helper to handle errors in server actions
export function handleServerError(error: unknown, context: string): never {
  if (error instanceof AppError) {
    log.error(`${context}: ${error.message}`, error);
    throw error;
  }
  
  if (error instanceof Error) {
    log.error(`${context}: ${error.message}`, error);
    throw new AppError('INTERNAL_ERROR', 'An unexpected error occurred', 500, {
      originalError: error.message,
    });
  }
  
  log.error(`${context}: Unknown error`, error);
  throw new AppError('INTERNAL_ERROR', 'An unexpected error occurred', 500);
}