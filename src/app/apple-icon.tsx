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
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2E7C86 0%, #14212B 100%)",
          borderRadius: "40px",
          border: "4px solid rgba(194, 174, 143, 0.45)",
          color: "#F4F5F2",
          fontSize: "92px",
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: "-2px",
        }}
      >
        <span>SS</span>
        {/* Milestone yellow marker dot */}
        <div
          style={{
            position: "absolute",
            top: "22px",
            right: "22px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#E1AD1C",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
