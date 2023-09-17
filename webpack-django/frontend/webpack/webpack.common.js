const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: Path.resolve(__dirname, '../src/dashboard/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../../build'),
    filename: 'js/[name].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: '/static/',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: Path.resolve(__dirname, '../public'), to: 'public' },
      ],
    }),
    // dashboard page
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/dashboard/base.ejs'),
      filename: Path.resolve(
        __dirname,
        '../../templates/dashboard/dashboard-base.html'
      ),
      chunks: ['index'],
      inject: false,
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // {
      //   test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      //   type: 'asset',
      // },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
};
