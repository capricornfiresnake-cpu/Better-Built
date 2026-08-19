import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. The same placed-module mark as the wordmark. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090b",
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            border: "8px solid rgba(108,99,255,0.55)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ width: 52, height: 52, backgroundColor: "#6c63ff" }} />
        </div>
      </div>
    ),
    size,
  );
}
