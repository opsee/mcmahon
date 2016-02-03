var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

var data = {};
var routes = [
  '/'
];

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: 'dist',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', routes, data)
  ]
};
