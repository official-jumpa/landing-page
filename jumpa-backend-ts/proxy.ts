import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_ALLOWED_ORIGIN,
  process.env.NEXT_PUBLIC_ALLOWED_ORIGIN_1,
  process.env.NEXT_PUBLIC_ALLOWED_ORIGIN_2,
  process.env.ALLOWED_ORIGIN,
].filter((o): o is string => !!o);

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Expose-Headers": "Set-Cookie",
  "Access-Control-Max-Age": "86400",
};

export function proxy(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": isAllowed ? origin : "",
        ...CORS_HEADERS,
      },
    });
  }

  const response = NextResponse.next();

  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    Object.entries(CORS_HEADERS).forEach(([k, v]) => response.headers.set(k, v));
  }

  return response;
}

export const config = {
  // Apply only to /api/* routes
  matcher: "/api/:path*",
};
