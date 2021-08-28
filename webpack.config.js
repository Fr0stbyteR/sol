const path = require("path");

/** @type {import("webpack").Configuration} */
const config = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      type: "commonjs"
    },
    globalObject: "globalThis"
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2017'
          }
        },
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
    filename: "index.js",
    library: {
      type: "module"
    }
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2017'
          }
        },
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
