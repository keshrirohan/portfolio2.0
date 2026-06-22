import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Gallery } from "@/lib/models/Gallery";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

async function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  return !!(await verifyToken(token));
}

type Params = { params: Promise<{ id: string }> };

/* PUT /api/gallery/:id */
export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req)))
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json() as {
      title?: string; description?: string; category?: string; imageData?: string;
    };

    const item = await Gallery.findById(id);
    if (!item) return NextResponse.json({ error: "Not found." }, { status: 404 });

    if (body.title       !== undefined) item.title       = body.title;
    if (body.description !== undefined) item.description = body.description;
    if (body.category    !== undefined) item.category    = body.category;

    if (body.imageData) {
      await deleteFromCloudinary(item.cloudinaryId);
      const { secure_url, public_id } = await uploadToCloudinary(body.imageData, "portfolio/gallery");
      item.imageUrl     = secure_url;
      item.cloudinaryId = public_id;
    }

    await item.save();
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed to update gallery item." }, { status: 500 });
  }
}

/* DELETE /api/gallery/:id */
export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req)))
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;

    const item = await Gallery.findById(id);
    if (!item) return NextResponse.json({ error: "Not found." }, { status: 404 });

    await deleteFromCloudinary(item.cloudinaryId);
    await item.deleteOne();

    return NextResponse.json({ ok: true, message: "Gallery item deleted." });
  } catch {
    return NextResponse.json({ error: "Failed to delete gallery item." }, { status: 500 });
  }
}
