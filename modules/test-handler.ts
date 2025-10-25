import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function testHandler(
  request: ZuploRequest,
  context: ZuploContext
): Promise<Response> {
  return new Response(JSON.stringify({ message: "Test handler works!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}