import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anhà — Sàn nội thất",
    short_name: "Anhà",
    description: "Sàn thương mại điện tử chuyên về nội thất tại Việt Nam.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f6f2",
    theme_color: "#65be9c",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  }
}
