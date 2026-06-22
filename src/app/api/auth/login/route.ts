import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, verifyToken, getTokenFromRequest, COOKIE_NAME } from "@/lib/auth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? "";
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD ?? "admin123";

/* POST /api/auth/login */
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json() as { username: string; password: string };

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    let valid = false;
    if (ADMIN_PASSWORD_HASH) {
      valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    } else {
      // Plain-text fallback for dev — use ADMIN_PASSWORD_HASH in production
      valid = password === ADMIN_PASSWORD_PLAIN;
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = await signToken({ username, role: "admin" });

    const res = NextResponse.json({ ok: true, message: "Logged in successfully." });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

/* GET /api/auth/login — check current session */
export async function GET(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, user: { username: payload.username } });
}

/* DELETE /api/auth/login — logout */
export async function DELETE() {
  const res = NextResponse.json({ ok: true, message: "Logged out." });
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
