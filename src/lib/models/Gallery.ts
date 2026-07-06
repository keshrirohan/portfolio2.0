// This file defines the "Gallery" model — a blueprint for gallery image items stored in MongoDB.
// It works exactly like Certificate.ts: Mongoose uses this schema to validate
// every gallery document before it gets saved to the database.
import mongoose, { Schema, Document, models, model } from "mongoose";

// IGallery is a TypeScript interface describing what one gallery item looks like.
// Every gallery document in the database will have exactly these fields.
export interface IGallery extends Document {
  title:        string; // A short display title for the image (e.g. "Hackathon 2024")
  description:  string; // An optional longer description of the image
  imageUrl:     string; // The public URL of the image (hosted on Cloudinary)
  cloudinaryId: string; // Cloudinary's internal ID — used to delete the image from Cloudinary later
  category:     string; // Groups images together (e.g. "events", "projects", "travel")
  createdAt:    Date;   // Auto-added by Mongoose — when this record was first saved
}

// GallerySchema sets the rules for what values each field can hold.
// Mongoose checks these rules every time you try to save a gallery item.
const GallerySchema = new Schema<IGallery>(
  {
    // required: true  → this field MUST be provided or the save will fail
    // trim: true      → removes accidental leading/trailing spaces from the value
    // maxlength: N    → value can't exceed N characters
    title:        { type: String, required: true, trim: true, maxlength: 200 },

    // default: ""     → if description is not provided, it will be saved as an empty string
    description:  { type: String, default: "", trim: true, maxlength: 1000 },

    imageUrl:     { type: String, required: true },  // Must have an image URL to display
    cloudinaryId: { type: String, required: true },  // Must have this so we can delete it later
    category:     { type: String, required: true, trim: true, maxlength: 100 },
  },
  // timestamps: true makes Mongoose automatically add:
  //   createdAt → the date/time this item was first added to the database
  //   updatedAt → the date/time this item was last modified
  { timestamps: true }
);

// Export the Gallery model so API routes can query the gallery collection.
// The "??" check prevents Mongoose from throwing an error when Next.js hot-reloads
// the file in development — instead of re-creating the model, we reuse the existing one.
export const Gallery =
  models.Gallery ?? model<IGallery>("Gallery", GallerySchema);
