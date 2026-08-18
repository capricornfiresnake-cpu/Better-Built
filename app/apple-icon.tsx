import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. Same registration mark as the wordmark. */
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
          backgroundColor: "#0b0c0f",
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            border: "15px solid #c9a468",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 46, height: 46, backgroundColor: "#c9a468" }} />
        </div>
      </div>
    ),
    size,
  );
}
