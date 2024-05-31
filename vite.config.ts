/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";
import { URL, fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { minify } from "terser";
import react from '@vitejs/plugin-react-swc'

import dts from "vite-plugin-dts";

import * as packageJson from './package.json'

function minifyBundles() {
  return {
    name: "minifyBundles",
    async generateBundle(options: any, bundle: any) {
      for (const key in bundle) {
        if (bundle[key].type == 'chunk' && key.endsWith('.js')) {
          const minifyCode = await minify(bundle[key].code, { sourceMap: false })
          bundle[key].code = minifyCode.code
        }
      }
      return bundle
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: [
        "**/test/setup.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
      ],
    }),
    minifyBundles(),
  ],
  build: {
    copyPublicDir: false,
    sourcemap: false,
    minify: true,
    lib: {
      fileName: "main",
      name: '@sovgut/use-storage',
      entry: resolve("src", "main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', ...Object.keys(packageJson.peerDependencies)],
    },
  },
  optimizeDeps: {
    include: ["eventemitter3"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      exclude: ["**/src/main.ts"],
    },
  },
});
