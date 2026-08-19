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
          backgroundColor: "#08090b",
          color: "#f2f0ea",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* The drafting grid, drawn as a stack of hairlines. */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * 200,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: "rgba(108,99,255,0.14)",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 30,
              height: 30,
              border: "2px solid rgba(108,99,255,0.6)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ width: 14, height: 14, backgroundColor: "#6c63ff" }} />
          </div>
          <div style={{ fontSize: 22, letterSpacing: 6, fontWeight: 700 }}>
            {site.wordmark}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 0.92,
              letterSpacing: -5,
              fontWeight: 800,
              display: "flex",
              flexDirection: "column",
              textTransform: "uppercase",
            }}
          >
            <span>Better Websites.</span>
            <span style={{ color: "#9a9ca3" }}>Better Business.</span>
          </div>
          <div
            style={{ width: 110, height: 3, backgroundColor: "#6c63ff", marginTop: 40 }}
          />
          <div style={{ fontSize: 26, color: "#9a9ca3", marginTop: 26 }}>
            Modern websites for businesses. From $800.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
