# Authentication

All API requests require authentication using an API key.

## Getting Your API Key

1. Sign up for a LooksyAI account in the developer portal
2. Navigate to your dashboard
3. Click "Create API Key"
4. Copy your API key (starts with `zpka_`)

**Important**: Keep your API key secure and never commit it to version control.

## Using Your API Key

Include your API key in the `Authorization` header of every request:

```bash
Authorization: Bearer YOUR_API_KEY
```

## Example Request

```bash
curl -X POST https://looksyai-api-main-2c962bd.zuplo.app/v1/tryon \
  -H "Authorization: Bearer zpka_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "userImage": "https://example.com/user.jpg",
    "productImages": ["https://example.com/product.jpg"]
  }'
```

## Rate Limits

- **Free Tier**: 100 requests per hour
- **Pro Tier**: Contact sales for higher limits

## Errors

### 401 Unauthorized

```json
{
  "type": "https://httpproblems.com/http-status/401",
  "title": "Unauthorized",
  "status": 401,
  "detail": "No Authorization Header"
}
```

Make sure you've included the `Authorization` header with a valid API key.

### 429 Too Many Requests

```json
{
  "type": "https://httpproblems.com/http-status/429",
  "title": "Too Many Requests",
  "status": 429,
  "detail": "Rate limit exceeded"
}
```

You've exceeded your rate limit. Wait before making more requests or upgrade your plan.
