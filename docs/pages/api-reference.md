# API Reference

Complete reference for the LooksyAI Virtual Try-On API.

## Base URL

```
https://looksyai-api-main-2c962bd.zuplo.app
```

## Authentication

All endpoints require an API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

See [Authentication Guide](./getting-started/authentication.md) for details.

---

## Endpoints

### POST /v1/tryon

Generate virtual try-on images from user and product photos.

#### Request

**Headers**
- `Authorization: Bearer YOUR_API_KEY` (required)
- `Content-Type: application/json` (required)

**Body Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userImage` | string | Yes | URL or base64 encoded image of the user |
| `productImages` | array[string] | Yes | Array of product image URLs or base64 encoded images |

**Example Request**

```json
{
  "userImage": "https://example.com/user.jpg",
  "productImages": [
    "https://example.com/product-front.jpg",
    "https://example.com/product-back.jpg"
  ]
}
```

#### Response

**Success Response (200 OK)**

```json
{
  "results": [
    {
      "angle": "front",
      "imageUrl": "https://storage.example.com/result-front.jpg"
    },
    {
      "angle": "back",
      "imageUrl": "https://storage.example.com/result-back.jpg"
    }
  ],
  "processingTimeMs": 2500,
  "credits": 2
}
```

**Response Fields**

| Field | Type | Description |
|-------|------|-------------|
| `results` | array | Array of generated try-on images |
| `results[].angle` | string | Angle/view of the result image |
| `results[].imageUrl` | string | URL to the generated image |
| `processingTimeMs` | number | Time taken to process the request |
| `credits` | number | Credits consumed for this request |

#### Error Responses

**400 Bad Request**

Invalid request parameters.

```json
{
  "error": "Bad Request",
  "message": "Invalid image format",
  "statusCode": 400
}
```

**401 Unauthorized**

Missing or invalid API key.

```json
{
  "type": "https://httpproblems.com/http-status/401",
  "title": "Unauthorized",
  "status": 401,
  "detail": "No Authorization Header"
}
```

**429 Too Many Requests**

Rate limit exceeded.

```json
{
  "type": "https://httpproblems.com/http-status/429",
  "title": "Too Many Requests",
  "status": 429,
  "detail": "Rate limit exceeded"
}
```

**500 Internal Server Error**

Server error during processing.

```json
{
  "error": "Internal Server Error",
  "message": "Processing failed",
  "statusCode": 500
}
```

---

### GET /health

Check API health status.

#### Request

**No authentication required**

#### Response

**Success Response (200 OK)**

```json
{
  "status": "ok",
  "timestamp": "2025-10-26T22:17:50.682Z",
  "version": "1.0.0"
}
```

---

## Rate Limits

Rate limits apply per API key:

| Plan | Requests per Hour |
|------|-------------------|
| Free | 100 |
| Pro | Contact Sales |

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1698264000
```

## Image Requirements

### User Images

- **Format**: JPEG, PNG
- **Size**: Maximum 10MB
- **Resolution**: Recommended 1024x1024 or higher
- **Content**: Clear view of person, good lighting

### Product Images

- **Format**: JPEG, PNG
- **Size**: Maximum 5MB per image
- **Resolution**: Recommended 1024x1024
- **Background**: Plain or transparent background recommended
- **Multiple Angles**: Supported (front, back, side views)

## Best Practices

1. **Use HTTPS URLs**: Always use secure HTTPS URLs for image inputs
2. **Optimize Images**: Compress images before upload to reduce processing time
3. **Handle Errors**: Implement proper error handling and retry logic
4. **Cache Results**: Cache generated images to avoid redundant processing
5. **Monitor Rate Limits**: Track rate limit headers to avoid hitting limits
