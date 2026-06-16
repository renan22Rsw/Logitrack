import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/sign-in", "/sign-up"];
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

async function tryRefresh(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!refreshToken) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          cookie: `refresh_token=${refreshToken}`,
        },
      },
    );

    if (!response.ok) return null;

    return response.headers.get("set-cookie");
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("access_token")?.value;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  const payload = token ? await verifyToken(token) : null;
  const isAuthenticated = !!payload;

  if (!isAuthenticated && !isPublic) {
    const newCookie = await tryRefresh(request);

    if (newCookie) {
      const response = NextResponse.next();
      response.headers.set("set-cookie", newCookie);
      return response;
    }

    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
