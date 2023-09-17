const Path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

// check webpack dev server: http://localhost:9091/webpack-dev-server
module.exports = merge(common, {
  target: 'web',
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
    publicPath: 'http://localhost:9091/',
  },
  devServer: {
    client: {
      logging: 'error',
    },
    hot: true,
    host: '0.0.0.0',
    port: 9091,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    devMiddleware: {
      writeToDisk: true,
    },
    watchFiles: [
      Path.join(__dirname, '../frontend/**/*.py'),
      Path.join(__dirname, '../frontend/**/*.html'),
    ],
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
