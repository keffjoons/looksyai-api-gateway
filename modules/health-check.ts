import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

/**
 * Simple health check endpoint
 */
export async function healthCheck(
  request: ZuploRequest,
  context: ZuploContext
): Promise<Response> {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      service: 'looksyai-api-gateway',
      timestamp: new Date().toISOString(),
      environment: context.env.NODE_ENV || 'production'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}