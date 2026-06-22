import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  imageUrl: string;
  cloudinaryId: string;
  issueDate: Date;
  createdAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title:         { type: String, required: true, trim: true, maxlength: 200 },
    issuer:        { type: String, required: true, trim: true, maxlength: 200 },
    imageUrl:      { type: String, required: true },
    cloudinaryId:  { type: String, required: true },
    issueDate:     { type: Date,   required: true },
  },
  { timestamps: true }
);

export const Certificate =
  models.Certificate ?? model<ICertificate>("Certificate", CertificateSchema);
