# Quick Start

Get up and running with the LooksyAI API in minutes.

## Prerequisites

- A LooksyAI API key (see [Authentication](./authentication.md))
- Product and user images (HTTPS URLs or base64 encoded)

## Your First Request

### 1. Prepare Your Images

You'll need:
- **User Image**: A photo of the person (full body or upper body)
- **Product Images**: One or more product images from different angles

### 2. Make the API Call

```bash
curl -X POST https://looksyai-api-main-2c962bd.zuplo.app/v1/tryon \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "userImage": "https://example.com/user-photo.jpg",
    "productImages": [
      "https://example.com/product-front.jpg",
      "https://example.com/product-back.jpg"
    ]
  }'
```

### 3. Understand the Response

Success response (200 OK):

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

## Next Steps

- Review the full [API Reference](../api-reference.md)
- Learn about [Best Practices](../guides/best-practices.md)
- Explore [Image Requirements](../guides/image-requirements.md)

## Code Examples

### JavaScript/Node.js

```javascript
const response = await fetch('https://looksyai-api-main-2c962bd.zuplo.app/v1/tryon', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.LOOKSY_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userImage: 'https://example.com/user.jpg',
    productImages: ['https://example.com/product.jpg']
  })
});

const data = await response.json();
console.log(data);
```

### Python

```python
import requests

response = requests.post(
    'https://looksyai-api-main-2c962bd.zuplo.app/v1/tryon',
    headers={
        'Authorization': f'Bearer {os.environ["LOOKSY_API_KEY"]}',
        'Content-Type': 'application/json'
    },
    json={
        'userImage': 'https://example.com/user.jpg',
        'productImages': ['https://example.com/product.jpg']
    }
)

data = response.json()
print(data)
```

### PHP

```php
<?php
$apiKey = getenv('LOOKSY_API_KEY');

$data = [
    'userImage' => 'https://example.com/user.jpg',
    'productImages' => ['https://example.com/product.jpg']
];

$options = [
    'http' => [
        'header' => "Authorization: Bearer $apiKey\r\n" .
                    "Content-Type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents('https://looksyai-api-main-2c962bd.zuplo.app/v1/tryon', false, $context);
$response = json_decode($result);

print_r($response);
?>
```
