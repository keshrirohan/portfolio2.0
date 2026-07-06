// This file defines the "Certificate" model — a blueprint that tells MongoDB
// what a certificate document should look like (its fields and rules).
// Mongoose uses this blueprint to validate data before saving it to the database.
import mongoose, { Schema, Document, models, model } from "mongoose";

// ICertificate is a TypeScript interface — it describes the shape of one certificate object.
// Every certificate stored in the database will have exactly these fields.
export interface ICertificate extends Document {
  title: string;        // The name of the certificate (e.g. "AWS Certified Developer")
  issuer: string;       // Who gave you the certificate (e.g. "Amazon Web Services")
  imageUrl: string;     // The public URL of the certificate image (hosted on Cloudinary)
  cloudinaryId: string; // Cloudinary's internal ID for the image — needed to delete it later
  issueDate: Date;      // The date the certificate was awarded to you
  createdAt: Date;      // Auto-added by Mongoose — when this record was saved to the database
}

// CertificateSchema defines the validation rules for each field.
// Mongoose checks these rules every time you try to save a certificate.
const CertificateSchema = new Schema<ICertificate>(
  {
    // required: true  → this field MUST be provided or saving will fail
    // trim: true      → automatically removes extra spaces from the start and end
    // maxlength: 200  → the text can't be longer than 200 characters
    title:         { type: String, required: true, trim: true, maxlength: 200 },
    issuer:        { type: String, required: true, trim: true, maxlength: 200 },
    imageUrl:      { type: String, required: true },  // Must have an image URL
    cloudinaryId:  { type: String, required: true },  // Must have the Cloudinary ID for deletion
    issueDate:     { type: Date,   required: true },  // Must have a date
  },
  // timestamps: true tells Mongoose to automatically add two extra fields:
  //   createdAt → set when the document is first saved
  //   updatedAt → updated every time the document is changed
  { timestamps: true }
);

// Export the Certificate model so API routes can use it to query the database.
// The "??" check means: if the model already exists (because of hot-reload in dev),
// reuse it — otherwise Mongoose would throw an error about re-registering the same model.
export const Certificate =
  models.Certificate ?? model<ICertificate>("Certificate", CertificateSchema);
