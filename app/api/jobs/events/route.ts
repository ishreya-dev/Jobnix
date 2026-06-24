// SSE events are temporarily disabled to prevent memory leaks.
// This is a placeholder that returns a simple response.

// Force Redis to be disabled
export const REDIS_ENABLED = false;

import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const { userId } = await auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Return a simple response instead of streaming
  return new Response(
    JSON.stringify({ 
      message: 'SSE events disabled', 
      status: 'ok' 
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}