const { merge } = require('webpack-merge');
const base = require('./webpack.config.base');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 9527,
    historyApiFallback: true,
    proxy: {},
  },
});
