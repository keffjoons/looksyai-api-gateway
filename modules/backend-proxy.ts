import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";

/**
 * Proxy requests to the Render backend with authentication headers
 */
export async function proxyToBackend(
  request: ZuploRequest,
  context: ZuploContext
): Promise<Response> {
  // Get the backend URL from environment
  const backendUrl = environment.BACKEND_URL || 'https://looksy-api.onrender.com';

  // Create the proxied URL
  const url = new URL(request.url);
  url.host = new URL(backendUrl).host;
  url.protocol = new URL(backendUrl).protocol;

  // Forward the request with additional headers
  const headers = new Headers(request.headers);

  // Add consumer information from Zuplo's API key authentication
  if (request.user) {
    headers.set('X-Consumer-Id', request.user.sub || 'anonymous');
    // Additional user data if available
    if (request.user.data?.keyId) {
      headers.set('X-API-Key-Id', request.user.data.keyId);
    }
  }

  // Add optional gateway secret for backend verification
  if (environment.GATEWAY_SECRET) {
    headers.set('X-Gateway-Secret', environment.GATEWAY_SECRET);
  }

  // Create the backend request
  const backendRequest = new Request(url.toString(), {
    method: request.method,
    headers: headers,
    body: request.method !== 'GET' && request.method !== 'HEAD'
      ? await request.blob()
      : undefined
  });

  try {
    // Make the request to the backend
    const response = await fetch(backendRequest);

    // Return the response
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

  } catch (error) {
    // Log the error
    context.log.error('Backend proxy error:', error);

    // Return a test response when backend is down
    // This helps verify Zuplo is working even if Render isn't
    return new Response(
      JSON.stringify({
        error: 'Backend service unavailable',
        message: 'Render backend at ' + backendUrl + ' is not responding',
        debug: 'Zuplo gateway is working correctly',
        timestamp: new Date().toISOString()
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}