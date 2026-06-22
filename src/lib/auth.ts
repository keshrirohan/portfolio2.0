import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "fallback-dev-secret-change-this"
);
const COOKIE_NAME = "admin_token";
const EXPIRES_IN  = "7d";

/* Sign a JWT for the admin user */
export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(SECRET);
}

/* Verify and decode a JWT string — returns payload or null */
export async function verifyToken(
  token: string
): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

/* Extract token from cookie header in a Request */
export function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

/* Check if the current request is authenticated (server component / action helper) */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export { COOKIE_NAME };
