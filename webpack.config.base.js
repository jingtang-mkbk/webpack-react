const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'static/js[name].js',
    chunkFilename: 'static/js/[name].[contenthash:8].async.js',
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(jsx|js|tsx|ts)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
            ],
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    modifyVars: {},
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.(sass|scss)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 1 * 1024,
              },
            },
            generator: {
              filename: 'static/imgs/[hash:8][ext][query]',
            },
          },
          {
            test: /\.(ttf|woff2|map4|map3|avi)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[hash:8][ext][query]',
            },
          },
          {
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],
          },
          {
            test: /\.xml$/i,
            use: ['xml-loader'],
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.less', '.scss'],
    fallback: { crypto: false },
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      inject: 'body',
      publicPath: process.env.NODE_ENV === 'production' ? '.' : '.',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === 'production'
          ? 'static/css/[name].[contenthash:8].async.css'
          : 'static/css/[name].async.css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
          to: './',
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.BannerPlugin('copyright by xxx'),
    new ESLintPlugin({ fix: true }),
    new WebpackBar({
      basic: false,
      profile: false,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ].filter(Boolean),
  performance: {
    maxAssetSize: 512 * 1024 * 1024,
    maxEntrypointSize: 512 * 1024 * 1024,
  },
};
