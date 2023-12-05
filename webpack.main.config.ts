import type { Configuration } from "webpack";
import { resolve } from "node:path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const mainConfig: Configuration = {
  entry: "./src/electron/index.ts",
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@renderer": resolve(__dirname, "src/renderer"),
      "@api": resolve(__dirname, "src/renderer/services/api"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
