import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f2138" }}>
        <svg width="120" height="140" viewBox="0 0 48 56">
          <path d="M7 47V25a17 17 0 0 1 34 0v22" fill="none" stroke="#fbf8f2" strokeWidth="2.6" />
          <path d="M15 47V27.5a9 9 0 0 1 18 0V47" fill="none" stroke="#d2b87f" strokeWidth="2" />
          <path d="M24 9.6l2.6 2.6-2.6 2.6-2.6-2.6z" fill="#d2b87f" />
          <path d="M3 51.5c4.2-2.3 8.4-2.3 12.6 0s8.4 2.3 12.6 0 8.4-2.3 12.6 0" fill="none" stroke="#fbf8f2" strokeWidth="1.6" />
        </svg>
      </div>
    ),
    size,
  );
}
