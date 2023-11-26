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
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
