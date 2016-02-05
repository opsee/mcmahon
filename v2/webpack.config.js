const config = require('config');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const data = require('./src/data');

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: config.staticDir,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader!postcss-loader'
      }, {
        test: /\.jsx$/,
        loader: 'jsx-loader'
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
  ],

  postcss(webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('postcss-modules'),
      require('postcss-cssnext')()
    ];
  }
};
