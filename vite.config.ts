import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Deploy targets:
//   DEPLOY_TARGET=gh        -> GitHub Pages (subpath /kdk-university/)
//   DEPLOY_TARGET=cloudflare (or unset in prod) -> Cloudflare Pages (root /)
const deployTarget = process.env.DEPLOY_TARGET || "cloudflare";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? (deployTarget === "gh" ? "/kdk-university/" : "/") : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
