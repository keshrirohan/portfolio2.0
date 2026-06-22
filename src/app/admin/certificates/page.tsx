import type { Metadata } from "next";
import CertificatesClient from "./CertificatesClient";

export const metadata: Metadata = { title: "Certificate Management" };

export default function CertificatesPage() {
  return <CertificatesClient />;
}
