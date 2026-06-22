import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IGallery extends Document {
  title:        string;
  description:  string;
  imageUrl:     string;
  cloudinaryId: string;
  category:     string;
  createdAt:    Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title:        { type: String, required: true, trim: true, maxlength: 200 },
    description:  { type: String, default: "", trim: true, maxlength: 1000 },
    imageUrl:     { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    category:     { type: String, required: true, trim: true, maxlength: 100 },
  },
  { timestamps: true }
);

export const Gallery =
  models.Gallery ?? model<IGallery>("Gallery", GallerySchema);
