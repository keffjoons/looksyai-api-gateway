import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";

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
      environment: environment.NODE_ENV || 'production'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}