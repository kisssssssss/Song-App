import type { Configuration } from "webpack";
import { resolve } from "node:path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/electron/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/renderer/assets"),
      "@routes": resolve(__dirname, "src/renderer/routes"),
      "@page": resolve(__dirname, "src/renderer/page"),
      "@component": resolve(__dirname, "src/renderer/component"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
