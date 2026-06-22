import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
  secure:      true,
});

export { cloudinary };

/* Upload a base64 data URI or remote URL to Cloudinary */
export async function uploadToCloudinary(
  source: string,
  folder: string = "portfolio"
): Promise<{ secure_url: string; public_id: string }> {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    resource_type: "image",
    overwrite: true,
    transformation: [{ quality: "auto:good", fetch_format: "auto" }],
  });
  return { secure_url: result.secure_url, public_id: result.public_id };
}

/* Delete an image from Cloudinary by its public_id */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
