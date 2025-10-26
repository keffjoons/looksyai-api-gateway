import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

/**
 * Add custom headers to requests going to the backend API
 */
export default async function addCustomHeaders(
  request: ZuploRequest,
  context: ZuploContext
): Promise<ZuploRequest | Response> {
  // Add gateway secret to verify requests are from Zuplo
  if (context.route.raw.operationId !== "health-check") {
    request.headers.set("X-Zuplo-Gateway-Secret", context.env.ZUPLO_GATEWAY_SECRET || "");
  }

  // Add user context headers if authenticated
  if (context.user) {
    request.headers.set("X-User-Id", context.user.sub);
    request.headers.set("X-User-Tier", context.user.data?.tier || "starter");

    // Add rate limit info
    const tier = context.user.data?.tier || "starter";
    request.headers.set("X-Rate-Limit-Tier", tier);
  }

  // Add request ID for tracing
  request.headers.set("X-Request-Id", context.requestId);

  // Add timestamp
  request.headers.set("X-Gateway-Timestamp", new Date().toISOString());

  return request;
}