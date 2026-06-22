import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Certificate } from "@/lib/models/Certificate";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

async function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  return !!(await verifyToken(token));
}

/* GET /api/certificates — public list with search + pagination */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const page   = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit  = Math.min(50, parseInt(searchParams.get("limit") ?? "12", 10));
    const skip   = (page - 1) * limit;

    const query = search
      ? { $or: [{ title: { $regex: search, $options: "i" } }, { issuer: { $regex: search, $options: "i" } }] }
      : {};

    const [items, total] = await Promise.all([
      Certificate.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Certificate.countDocuments(query),
    ]);

    return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch certificates." }, { status: 500 });
  }
}

/* POST /api/certificates — create (admin only) */
export async function POST(req: NextRequest) {
  if (!(await requireAuth(req)))
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json() as {
      title: string; issuer: string; issueDate: string; imageData: string;
    };
    const { title, issuer, issueDate, imageData } = body;

    if (!title || !issuer || !issueDate || !imageData)
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });

    const { secure_url, public_id } = await uploadToCloudinary(imageData, "portfolio/certificates");

    const cert = await Certificate.create({
      title, issuer, issueDate: new Date(issueDate),
      imageUrl: secure_url, cloudinaryId: public_id,
    });

    return NextResponse.json(cert, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create certificate." }, { status: 500 });
  }
}
