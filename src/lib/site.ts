export const siteConfig = {
  name: "Unheic",
  shortName: "Unheic",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://unheic.app",
  tagline: "Convert HEIC to JPG Online, Instantly",
  description:
    "Lightning-fast client-side HEIC to JPG conversion. Your photos never leave your device. No file size limits, no sign-up required.",
  engine: "1.5.2",
  maxFiles: 50,
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
