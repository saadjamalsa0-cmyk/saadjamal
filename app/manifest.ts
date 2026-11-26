import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سعد جمال للمقاولات | Saad Jamal Contracting",
    short_name: "سعد جمال",
    description: "Scaffolders, welders, specialized manpower and equipment rental in Saudi Arabia",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8f0f2c",
    lang: "ar",
    dir: "rtl",
    icons: [
      { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
