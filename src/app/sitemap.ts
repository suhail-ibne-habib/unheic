import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { conversionTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["", "/tools", "/how-it-works", "/privacy", "/api", "/privacy-policy"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified,
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...conversionTools
      .filter((tool) => tool.href !== "/")
      .map((tool) => ({
        url: `${siteConfig.url}${tool.href}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
