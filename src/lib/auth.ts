// This file handles admin authentication using JWTs (JSON Web Tokens).
//
// What is a JWT?
// A JWT is a small, secure string (like a digital stamp) that proves the user is logged in.
// After the admin enters the correct password, we CREATE a token and store it in a cookie.
// On every protected page or API route, we CHECK that cookie to confirm they're still logged in.
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// The secret key used to SIGN (create) and VERIFY (check) tokens.
// It comes from your .env file (JWT_SECRET). Keep it long, random, and never share it.
// If someone knows your secret, they can forge admin tokens — so keep it safe!
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "fallback-dev-secret-change-this"
);

// The name of the browser cookie where we store the admin's token.
// When the admin logs in, a cookie with this name gets saved in their browser.
const COOKIE_NAME = "admin_token";

// How long the token stays valid before it expires and the admin must log in again.
// "7d" means 7 days. You can change it to "1d", "30d", etc.
const EXPIRES_IN  = "7d";

/* Sign a JWT for the admin user */

// Creates and returns a signed token string containing the given data (payload).
// Call this right after the admin successfully logs in, then save the result in a cookie.
export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // HS256 is the signing algorithm used
    .setIssuedAt()                        // Records the exact time the token was created
    .setExpirationTime(EXPIRES_IN)        // Token will automatically expire after EXPIRES_IN
    .sign(SECRET);                        // Seals the token with our secret key
}

/* Verify and decode a JWT string — returns payload or null */

// Checks whether a token is genuine (signed with our SECRET) and not expired.
// If valid, returns the data stored inside it (e.g. { role: "admin" }).
// If the token is fake, expired, or tampered with, returns null instead of crashing.
export async function verifyToken(
  token: string
): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET); // Decode and verify in one step
    return payload as Record<string, unknown>;
  } catch {
    // Token was invalid or expired — just return null so the caller can handle it gracefully.
    return null;
  }
}

/* Extract token from cookie header in a Request */

// Reads the admin token out of the cookies attached to an incoming API request.
// Use this inside API route handlers (which receive a NextRequest object).
// Returns the token string if found, or null if the cookie doesn't exist.
export function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

/* Check if the current request is authenticated (server component / action helper) */

// Use this in Server Components or Server Actions to check if the admin is logged in.
// It reads the cookie from the current browser session and verifies the token inside it.
// Returns true if the admin is authenticated, false if not (no cookie or bad token).
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();              // Get all cookies from the current request
  const token = cookieStore.get(COOKIE_NAME)?.value; // Pull out just the admin token value
  if (!token) return false;                         // No cookie = not logged in
  const payload = await verifyToken(token);         // Check if the token is valid
  return !!payload;                                 // true if valid payload, false if null
}

export { COOKIE_NAME };
