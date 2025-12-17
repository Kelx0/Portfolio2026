// astro.config.ts
import { defineConfig } from "astro/config";

export default defineConfig({
  trailingSlash: "always",
  // Prod
  // site: "https://www.kelx.fr/",
  // Local
  site: "http://localhost:4321/",
  base: "/",
  trailingSlash: "always",
  output: "server",
});
