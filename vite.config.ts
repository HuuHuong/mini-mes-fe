import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
      "@common": resolve(__dirname, "src/common"),
      "@components": resolve(__dirname, "src/components"),
      "@config": resolve(__dirname, "src/config"),
      "@networking": resolve(__dirname, "src/networking"),
      "@redux": resolve(__dirname, "src/redux"),
      "@routers": resolve(__dirname, "src/routers"),
      "@screens": resolve(__dirname, "src/screens"),
      "@types": resolve(__dirname, "src/types"),
      "@utils": resolve(__dirname, "src/utils"),
      "@themes": resolve(__dirname, "src/themes"),
      "@services": resolve(__dirname, "src/services"),
    },
  },
});
