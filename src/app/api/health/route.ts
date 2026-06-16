import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "portfolio",
    database: "mongodb",
    timestamp: new Date().toISOString(),
  });
}
