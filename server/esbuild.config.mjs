// esbuild.config.mjs
import * as esbuild from "esbuild";

await esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node22",
    outfile: "dist/server.js",
    sourcemap: true,
    minify: process.env.NODE_ENV === "production",
    packages: "external",
  })
  .catch(() => process.exit(1));

console.log("⚡ Build complete");
