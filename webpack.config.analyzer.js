let { merge } = require('webpack-merge');
let base = require('./webpack.config.prod.js');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = merge(base, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()],
});
