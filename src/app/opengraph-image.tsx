import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Skilled Nursing & Rehabilitation in Rock Island, Illinois`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(120deg, #0a1628 0%, #162c49 60%, #213c5f 100%)", color: "#fbf8f2", padding: 80, position: "relative" }}>
        <div style={{ position: "absolute", right: 60, top: 40, display: "flex", opacity: 0.12 }}>
          <svg width="460" height="540" viewBox="0 0 48 56"><path d="M7 47V25a17 17 0 0 1 34 0v22" fill="none" stroke="#fbf8f2" strokeWidth="1.2" /><path d="M15 47V27.5a9 9 0 0 1 18 0V47" fill="none" stroke="#d2b87f" strokeWidth="1" /></svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <svg width="64" height="75" viewBox="0 0 48 56">
              <path d="M7 47V25a17 17 0 0 1 34 0v22" fill="none" stroke="#fbf8f2" strokeWidth="2.4" />
              <path d="M15 47V27.5a9 9 0 0 1 18 0V47" fill="none" stroke="#d2b87f" strokeWidth="1.8" />
              <path d="M24 9.6l2.6 2.6-2.6 2.6-2.6-2.6z" fill="#d2b87f" />
              <path d="M3 51.5c4.2-2.3 8.4-2.3 12.6 0s8.4 2.3 12.6 0 8.4-2.3 12.6 0" fill="none" stroke="#fbf8f2" strokeWidth="1.5" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 40, letterSpacing: 8, fontFamily: "serif" }}>ROCK ISLAND</div>
              <div style={{ fontSize: 16, letterSpacing: 10, color: "#e3cf9f" }}>NURSING HOME</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 68, lineHeight: 1.05, fontFamily: "serif", maxWidth: 900 }}>Compassionate Care. Genuine Connections. A Place to Call Home.</div>
            <div style={{ marginTop: 28, fontSize: 24, color: "#e3cf9f", letterSpacing: 4 }}>SKILLED NURSING · REHABILITATION · LONG-TERM CARE · ROCK ISLAND, IL</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
