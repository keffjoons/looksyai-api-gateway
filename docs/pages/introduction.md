# Introduction

Welcome to the LooksyAI Virtual Try-On API documentation.

## Overview

LooksyAI provides a powerful API for generating photorealistic virtual try-on images using AI. Perfect for e-commerce platforms, fashion retailers, and product visualization.

## Key Features

- **Multi-Angle Support**: Upload multiple product angles for accurate try-on results
- **Fast Processing**: ~10 second generation time per image
- **High Quality**: 2.5MB+ photorealistic outputs
- **Scalable Storage**: Automatic upload to Cloudflare R2 with public URLs
- **Developer-Friendly**: RESTful API with comprehensive documentation

## Getting Started

1. [Authentication](/docs/getting-started/authentication) - Get your API key
2. [Quick Start](/docs/getting-started/quick-start) - Make your first API call
3. [API Reference](/api) - Explore all endpoints

## Architecture

```
Client → Zuplo Gateway (auth/rate limiting) → Backend API → Gemini AI → R2 Storage
```

## Need Help?

- Email: api@looksy.ai
- Documentation: [Full API Reference](/api)
