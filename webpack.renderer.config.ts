import type { Configuration } from "webpack";
import { resolve } from "node:path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          { loader: "svg-sprite-loader", options: { symbolId: "icon-[name]" } },
          { loader: "svgo-loader", options: {} },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      assets: resolve(__dirname, "src/renderer/assets"),
      routes: resolve(__dirname, "src/renderer/routes"),
      page: resolve(__dirname, "src/renderer/page"),
      components: resolve(__dirname, "src/renderer/components"),
      store: resolve(__dirname, "src/renderer/store"),
      service: resolve(__dirname, "src/renderer/service"),
      utils: resolve(__dirname, "src/renderer/utils"),
      types:resolve(__dirname,"src/renderer/@types")
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
