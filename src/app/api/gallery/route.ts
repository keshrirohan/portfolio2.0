import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Gallery } from "@/lib/models/Gallery";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

async function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  return !!(await verifyToken(token));
}

/* GET /api/gallery */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search   = searchParams.get("search")   ?? "";
    const category = searchParams.get("category") ?? "";
    const page     = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit    = Math.min(50, parseInt(searchParams.get("limit") ?? "12", 10));
    const skip     = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (category) query.category = { $regex: category, $options: "i" };
    if (search)   query.$or = [
      { title:       { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];

    const [items, total] = await Promise.all([
      Gallery.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Gallery.countDocuments(query),
    ]);

    return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery." }, { status: 500 });
  }
}

/* POST /api/gallery */
export async function POST(req: NextRequest) {
  if (!(await requireAuth(req)))
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json() as {
      title: string; description?: string; category: string; imageData: string;
    };
    const { title, description = "", category, imageData } = body;

    if (!title || !category || !imageData)
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });

    const { secure_url, public_id } = await uploadToCloudinary(imageData, "portfolio/gallery");

    const item = await Gallery.create({
      title, description, category,
      imageUrl: secure_url, cloudinaryId: public_id,
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create gallery item." }, { status: 500 });
  }
}
