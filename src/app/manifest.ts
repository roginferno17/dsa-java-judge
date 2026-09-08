import type { MetadataRoute } from "next"

/**
 * Web app manifest.
 *
 * This is what makes Chrome and Edge offer "Install DSA Java Judge" — which
 * gives a real Start Menu entry, a taskbar icon, and a standalone window with no
 * address bar. It is the cheapest honest route to a desktop app: no Electron,
 * no bundled Chromium, no extra megabytes.
 *
 * `display: standalone` is the part that removes the browser chrome.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DSA Java Judge",
    short_name: "DSA Judge",
    description:
      "A local, offline judge for Striver's A2Z DSA sheet — 398 problems with a real Java harness.",
    start_url: "/roadmap",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
