import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name, short_name: site.shortName, description: site.brandStatement,
    start_url: "/", display: "browser", background_color: "#fbf8f2", theme_color: "#0f2138",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
