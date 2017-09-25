const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

const DEV = process.env.NODE_ENV !== 'production';

const prodPlugins = [
  new webpack.DefinePlugin({
    // prettier-ignore
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.__REACT_NATIVE_DEBUG_ENABLED__': DEV,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new MinifyPlugin(),
];

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  const defaultPlugins = config.plugins.concat([
    new FriendlyErrorsWebpackPlugin(),
  ]);

  const overwrite = {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: { cacheDirectory: true },
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
        {
          test: /\.(gif|jpe?g|png|svg|otf|ttf)$/,
          loader: 'url-loader',
          query: { name: '[name].[ext]' },
        },
      ],
    },
    plugins: DEV ? defaultPlugins : prodPlugins,
  };

  return Object.assign(config, overwrite);
};
