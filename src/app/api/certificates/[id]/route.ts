import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Certificate } from "@/lib/models/Certificate";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

async function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  return !!(await verifyToken(token));
}

type Params = { params: Promise<{ id: string }> };

/* PUT /api/certificates/:id */
export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req)))
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json() as {
      title?: string; issuer?: string; issueDate?: string; imageData?: string;
    };

    const cert = await Certificate.findById(id);
    if (!cert) return NextResponse.json({ error: "Not found." }, { status: 404 });

    if (body.title)     cert.title     = body.title;
    if (body.issuer)    cert.issuer    = body.issuer;
    if (body.issueDate) cert.issueDate = new Date(body.issueDate);

    if (body.imageData) {
      // Delete old image first
      await deleteFromCloudinary(cert.cloudinaryId);
      const { secure_url, public_id } = await uploadToCloudinary(body.imageData, "portfolio/certificates");
      cert.imageUrl     = secure_url;
      cert.cloudinaryId = public_id;
    }

    await cert.save();
    return NextResponse.json(cert);
  } catch {
    return NextResponse.json({ error: "Failed to update certificate." }, { status: 500 });
  }
}

/* DELETE /api/certificates/:id */
export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req)))
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;

    const cert = await Certificate.findById(id);
    if (!cert) return NextResponse.json({ error: "Not found." }, { status: 404 });

    await deleteFromCloudinary(cert.cloudinaryId);
    await cert.deleteOne();

    return NextResponse.json({ ok: true, message: "Certificate deleted." });
  } catch {
    return NextResponse.json({ error: "Failed to delete certificate." }, { status: 500 });
  }
}
