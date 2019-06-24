const path = require('path');

const config = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[chunkhash].js',
  },
  node: {
    fs: 'empty'
  },
  target: 'node',
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
  ]
};
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.output.filename = 'index.js';
  }
  if (argv.mode === 'production') {
    config.output.filename = 'index.min.js';
  }
  return config;
};