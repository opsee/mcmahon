const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const data = require('./data');

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: 'dist',
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

  postcss() {
    return [
      require('postcss-modules'),
      require('postcss-cssnext')()
    ];
  }
};
