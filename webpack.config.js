const path = require("path");

/** @type {import("webpack").Configuration} */
const config = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "js/[chunkhash].js",
    filename: "index.js",
    library: {
      name: "Sol",
      type: "umd"
    }
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      }
    ]
  }
};

/** @type {import("webpack").Configuration} */
const esmConfig = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist", "esm"),
    chunkFilename: "js/[chunkhash].js",
    filename: "index.js",
    library: {
      type: "module"
    }
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      }
    ]
  },
  experiments: { outputModule: true }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
    esmConfig.devtool = "source-map";
  }
  if (argv.mode === "production") {
    config.output.filename = "index.min.js";
    esmConfig.output.filename = "index.min.js";
  }
  return [config, esmConfig];
};
