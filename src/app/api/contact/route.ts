import { NextResponse } from "next/server";

import { getDb } from "@/lib/mongodb";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid contact payload.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const db = await getDb();
  const insertResult = await db.collection("contact_messages").insertOne({
    ...result.data,
    createdAt: new Date(),
  });

  return NextResponse.json(
    { id: insertResult.insertedId.toString() },
    { status: 201 },
  );
}
