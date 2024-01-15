// vite.config.js
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import path from "path";
import UnoCSS from 'unocss/vite';
function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    server: {
      host: "127.0.0.1",
      port: 3000,
    },
    plugins: [vue(),UnoCSS()],
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": _resolve("src"),
      },
    },

    base: "./",
    build: {
      outDir: "src-utools/dist",
    },
  });
};
