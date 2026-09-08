import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/prueba-glass",   // nombre del repo
  assetPrefix: "/prueba-glass", // asegura que los assets se sirvan bien
  images: {
    unoptimized: true, // esta es la forma correcta
  },
};

export default nextConfig;
