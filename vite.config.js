import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  // Relative assets work on both the GitHub project URL and a custom domain.
  base: "./",
});
