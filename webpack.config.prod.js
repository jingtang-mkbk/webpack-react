const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.config.base');
const path = require('path');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const isCI = process.env.CI === 'true';

module.exports = merge(base, {
  mode: 'production',
  // cache: isCI ? {
  //   type: 'filesystem',
  //   cacheDirectory: path.resolve(
  //     '/opt/'
  //   )
  // }
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: false,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new CssMinimizerPlugin({}),
    ],
    minimizer: true,
    splitChunks: {
      maxInitialRequests: 12,
      chunks: 'all',
      cacheGroups: {
        tools: {
          test: /[\\/]node_modules[\\/](lodash|mement|dayjs|intl|axios|crypto-js)[\\/]/,
          priority: -10,
          name: 'bundles.tools',
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          priority: -9,
          name: 'bundles.react',
        },
        antDesign: {
          test: /[\\/]node_modules[\\/](@antd-design|antd)[\\/]/,
          priority: -8,
          name: 'bundles.antd',
          reuseExistingChunk: true,
        },
        rc: {
          test: () =>
            /rc-/.test(module.context) ||
            /react-color/.test(module.context) ||
            /video-react/.test(module.context),
          priority: -7,
          name: 'bundles.rc',
        },
        echarts: {
          test: /[\\/]node_modules[\\/](echarts)[\\/]/,
          priority: -6,
          name: 'bundles.charts',
          reuseExistingChunk: true,
        },
        zrender: {
          test: /[\\/]node_modules[\\/](zrender)[\\/]/,
          priority: -3,
          name: 'bundles.zrender',
          reuseExistingChunk: true,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
          name: 'bundles.common',
          reuseExistingChunk: true,
        },
      },
    },
  },
});
