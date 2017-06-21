const path = require('path');
const webpack = require('webpack');
const minimize = process.argv.indexOf('--minimize') !== -1;
const plugins = [];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    minimize: true,
  }));
}

module.exports = {
  context: __dirname,
  entry: [
    './assets/js/index.js',
  ],

  output: {
    path: path.join(__dirname, 'build/js'),
    filename: 'bundle.js',
    publicPath: '/build/js',
  },

  resolve: {
    extensions: ['', '.js', '.es6'],
    modulesDirectories: ['node_modules'],
  },

  plugins,

  module: {
    preLoaders: [
        { test: [/\.js$/, /\.es6$/], exclude: /node_modules/, loader: 'eslint', options: { fix: true } },
    ],
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
    ],
  },
};
