import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(180deg, #ffffff 0%, #FBF6F8 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#2563EB",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            U
          </div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Unheic</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.15, maxWidth: 900 }}>
          Convert HEIC to JPG Online, Instantly
        </div>
        <div style={{ marginTop: 24, fontSize: 24, color: "#64748b", maxWidth: 760 }}>
          Client-side conversion. Your photos never leave your device.
        </div>
      </div>
    ),
    size,
  );
}
