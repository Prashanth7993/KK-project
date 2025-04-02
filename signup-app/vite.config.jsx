import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx", // Ensure JSX syntax is enabled
    include: /src\/.*\.jsx?$/,
  },
});
