import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Krishna Instrumentation Works",
    short_name: "Krishna Inst.",
    description: "Precision instrumentation, automation, calibration and engineering solutions",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/krishna_favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
