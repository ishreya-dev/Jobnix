// Redis is disabled to prevent Map maximum size exceeded errors.
// To enable Redis for production, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local

export const redis = null;

export async function getCache<T>(_key: string): Promise<T | null> {
  return null;
}

export async function setCache(_key: string, _value: any, _ttl?: number): Promise<void> {
  // No-op
}

export async function deleteCache(_key: string): Promise<void> {
  // No-op
}

export async function deleteCachePattern(_pattern: string): Promise<void> {
  // No-op
}

export async function publishMessage(_channel: string, _message: any): Promise<void> {
  // No-op
}

export async function subscribeMessages(_channel: string, _callback: (message: any) => void): Promise<() => void> {
  // Return a no-op unsubscribe function
  return () => {};
}

export async function isRedisAvailable(): Promise<boolean> {
  return false;
}

// ============================================================
// Stream functions for SSE invalidation (disabled)
// ============================================================

export type StreamInvalidationPayload = {
  id: string;
  jobId?: string;
};

export async function pushInvalidationStreamEvent(_userId: string, _jobId?: string): Promise<void> {
  // No-op - Redis disabled
  return;
}

export async function readInvalidationStreamEvents(
  _userId: string,
  _lastStreamId: string,
  _blockMs: number
): Promise<StreamInvalidationPayload[]> {
  // No-op - Redis disabled
  return [];
}