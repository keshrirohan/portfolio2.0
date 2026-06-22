import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://keshrirohan.vercel.app/sitemap.xml",
    host: "https://keshrirohan.vercel.app",
  };
}
