import { HttpProblems, ZuploContext, ZuploRequest } from "@zuplo/runtime";

/**
 * Custom rate limiting configuration for different API tiers
 */
export const rateLimitConfig = {
  tiers: {
    starter: {
      requestsAllowed: 10,
      timeWindowMinutes: 1,
    },
    growth: {
      requestsAllowed: 100,
      timeWindowMinutes: 1,
    },
    pro: {
      requestsAllowed: 1000,
      timeWindowMinutes: 1,
    },
    enterprise: {
      requestsAllowed: 10000,
      timeWindowMinutes: 1,
    }
  }
};

/**
 * Rate limit policy that adjusts based on user tier
 */
export default async function rateLimitByTier(
  request: ZuploRequest,
  context: ZuploContext
): Promise<ZuploRequest | Response> {
  // Get user tier from context (set by API key policy)
  const userTier = context.user?.data?.tier || "starter";

  // Get rate limit config for tier
  const tierConfig = rateLimitConfig.tiers[userTier] || rateLimitConfig.tiers.starter;

  // You can add custom logic here to track usage
  // For now, this is handled by the RateLimitInboundPolicy in routes.oas.json

  // Add rate limit headers to response
  context.waitUntil(
    Promise.resolve().then(() => {
      // This would typically track in a database or cache
      console.log(`Rate limit check for ${context.user?.sub} - Tier: ${userTier}`);
    })
  );

  return request;
}