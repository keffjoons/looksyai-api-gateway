# API Key Management & User Authentication Setup Guide

This guide explains how to enable self-service API key management in the Looksy AI Developer Portal.

## Overview

Currently, the API has:
- ✅ API key authentication on endpoints (`/v1/tryon`)
- ✅ Rate limiting (100 requests per 60 minutes per user)
- ❌ Self-service user signup and API key creation

To enable users to create accounts and manage their own API keys, you need to:
1. Choose and configure an authentication provider
2. Enable the API Keys plugin in Zudoku
3. (Optional) Customize rate limits per API key

## Step 1: Choose an Authentication Provider

The dev portal supports multiple authentication providers. Choose one based on your needs:

### Option A: Clerk (Recommended - Easiest Setup)

**Pros:** Simple setup, modern UI, generous free tier
**Cost:** Free up to 10,000 monthly active users

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your Publishable Key (starts with `pk_...`)
4. In `docs/zudoku.config.ts`, uncomment and configure:

```typescript
authentication: {
  type: "clerk",
  clerkPubKey: "pk_test_...", // Your Clerk publishable key
},
```

5. Uncomment the apiKeys plugin:

```typescript
apiKeys: {
  enabled: true,
},
```

### Option B: Auth0

**Pros:** Enterprise-grade, extensive features
**Cost:** Free up to 7,000 active users

1. Sign up at [auth0.com](https://auth0.com)
2. Create a new application (Single Page Application)
3. Configure Allowed Callback URLs: `https://looksyai-api-main-2c962bd.zuplo.site/*`
4. Copy your Domain and Client ID
5. In `docs/zudoku.config.ts`, uncomment and configure:

```typescript
authentication: {
  type: "auth0",
  domain: "yourdomain.us.auth0.com",
  clientId: "your-client-id",
  scopes: ["openid", "profile", "email"],
},
```

6. Uncomment the apiKeys plugin:

```typescript
apiKeys: {
  enabled: true,
},
```

### Option C: Supabase

**Pros:** Open source, includes database, good for custom user data
**Cost:** Free tier available

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Authentication → Providers → GitHub (or your preferred provider)
3. Copy your project URL and anon public key
4. In `docs/zudoku.config.ts`, uncomment and configure:

```typescript
authentication: {
  type: "supabase",
  provider: "github", // or "google", "twitter", etc.
  supabaseUrl: "https://your-project.supabase.co",
  supabaseKey: "your-anon-public-key",
},
```

5. Uncomment the apiKeys plugin:

```typescript
apiKeys: {
  enabled: true,
},
```

## Step 2: Deploy the Changes

After configuring authentication in `zudoku.config.ts`:

1. Commit your changes:
   ```bash
   git add docs/zudoku.config.ts
   git commit -m "Enable self-service API key management"
   git push
   ```

2. Zuplo will automatically redeploy your dev portal

3. Once deployed, users can:
   - Visit the dev portal
   - Click "Sign In" or "Sign Up"
   - Navigate to `/settings/api-keys`
   - Create, view, and delete their API keys

## Step 3: Rate Limiting Configuration

The current rate limit is set globally at **100 requests per 60 minutes per user** in `/config/policies.json`.

### Per-API-Key Rate Limiting

To set different rate limits based on subscription tiers or user types, you can customize the rate-limit policy:

1. Update `config/policies.json`:

```json
{
  "name": "rate-limit",
  "policyType": "rate-limit-inbound",
  "handler": {
    "export": "RateLimitInboundPolicy",
    "module": "$import(@zuplo/runtime)",
    "options": {
      "rateLimitBy": "function",
      "identifier": {
        "export": "default",
        "module": "$import(./modules/rate-limit-identifier)"
      }
    }
  }
}
```

2. Create `modules/rate-limit-identifier.ts`:

```typescript
import { ZuploRequest, ZuploContext } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const user = request.user;

  // Get user's subscription tier from metadata
  const tier = user?.data?.tier || "free";

  // Return identifier and limits based on tier
  switch (tier) {
    case "pro":
      return {
        key: user.sub,
        requestsAllowed: 1000,
        timeWindowMinutes: 60
      };
    case "enterprise":
      return {
        key: user.sub,
        requestsAllowed: 10000,
        timeWindowMinutes: 60
      };
    default: // free tier
      return {
        key: user.sub,
        requestsAllowed: 100,
        timeWindowMinutes: 60
      };
  }
}
```

## Testing the Setup

1. Visit your dev portal: `https://looksyai-api-main-2c962bd.zuplo.site/`
2. Click "Sign In" or "Sign Up"
3. Complete authentication
4. Navigate to `/settings/api-keys`
5. Create a new API key
6. Test the API with your new key:

```bash
curl -X POST https://looksyai-api-main-2c962bd.zuplo.app/v1/tryon/multi-angle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_NEW_API_KEY" \
  -d '{
    "userImage": "https://example.com/user.jpg",
    "productImages": ["https://example.com/product.jpg"],
    "options": {
      "outputFormat": "url"
    }
  }'
```

## Monitoring & Analytics

After enabling API key management, you can track:

- Number of users/API keys created
- API usage per key
- Rate limit violations
- Key creation/deletion events

Access analytics in:
1. Zuplo Portal: [portal.zuplo.com](https://portal.zuplo.com)
2. Dev Portal: `/settings/api-keys` (usage stats per key)

## Security Best Practices

1. **Key Rotation**: Encourage users to rotate keys periodically
2. **Key Expiration**: Set expiration dates on keys when created
3. **Scope Limiting**: Consider implementing API scopes for different endpoints
4. **Monitoring**: Set up alerts for unusual API usage patterns
5. **Revocation**: Be ready to quickly revoke keys if compromised

## Troubleshooting

### Users can't see API Keys page
- Check that authentication is properly configured
- Ensure `apiKeys.enabled: true` is set
- Verify the auth provider credentials are correct

### API key authentication fails
- Check that the `api-key-inbound` policy is applied to routes
- Verify the Authorization header format: `Bearer zpka_...`
- Check Zuplo logs for authentication errors

### Rate limits not working
- Verify the `rate-limit` policy is applied to routes
- Check that `rateLimitBy: "user"` is set correctly
- Review Zuplo logs for rate limit events

## Next Steps

1. **Customize the signup flow**: Add custom fields, email verification
2. **Implement usage quotas**: Track and limit total API calls per user
3. **Add billing integration**: Use Stripe for paid tiers
4. **Create admin dashboard**: Manage users and keys centrally
5. **Set up webhooks**: Get notified of key creation/usage events

## Resources

- [Zuplo API Key Management Docs](https://zuplo.com/docs/articles/api-key-management)
- [Zudoku Authentication Guide](https://zuplo.com/docs/dev-portal/zudoku/configuration/authentication)
- [Managing API Keys and Identities](https://zuplo.com/docs/dev-portal/zudoku/guides/managing-api-keys-and-identities)
- [Rate Limiting Policy](https://zuplo.com/docs/policies/rate-limit-inbound)
