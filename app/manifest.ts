import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Bao Money Manager", short_name: "Bao", description: "A calm view of your money.", start_url: "/", display: "standalone", background_color: "#F7F7F5", theme_color: "#071F1A", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
