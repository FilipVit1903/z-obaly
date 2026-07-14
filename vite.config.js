import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/z-obaly/",

  // Nastavení moderního překladače pro SASS (vypne otravná varování v konzoli)
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Zde definujeme obě HTML stránky jako vstupní body pro kompilaci
        main: resolve(__dirname, "index.html"),
        produkty: resolve(__dirname, "produkty.html"),
      },
    },
  },
});
