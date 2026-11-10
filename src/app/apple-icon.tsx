import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
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
          background: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
          borderRadius: "40px",
          border: "4px solid rgba(199, 210, 254, 0.4)",
          color: "#ffffff",
          fontSize: "88px",
          fontWeight: 900,
          fontFamily: "monospace",
          letterSpacing: "-3px",
        }}
      >
        SS
      </div>
    ),
    {
      ...size,
    }
  );
}
