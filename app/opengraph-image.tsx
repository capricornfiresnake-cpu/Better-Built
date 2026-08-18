import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card. Generated at build time, no image asset to maintain. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0c0f",
          color: "#f7f7f5",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 30,
              height: 30,
              border: "2px solid #c9a468",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 16, height: 16, backgroundColor: "#c9a468" }} />
          </div>
          <div style={{ fontSize: 24, letterSpacing: 6, fontWeight: 700 }}>
            {site.wordmark}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -4,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Better Websites.</span>
            <span style={{ color: "#8a8f98" }}>Better Business.</span>
          </div>
          <div style={{ width: 96, height: 3, backgroundColor: "#c9a468", marginTop: 40 }} />
          <div style={{ fontSize: 28, color: "#b7bcc5", marginTop: 28 }}>
            Modern websites for businesses. From $800.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
