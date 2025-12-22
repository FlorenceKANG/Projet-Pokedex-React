import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    // @ts-expect-error Vite 6 types missing allowedHosts
    allowedHosts: "all",
  },
});
