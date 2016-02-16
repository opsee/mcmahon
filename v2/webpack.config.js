const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const path = require('path');

const data = require('./src/data');

const CONTEXT_DIR = path.join(__dirname, '/src');
const EMISSARY_DIR = path.resolve(__dirname, 'node_modules', 'Emissary');

module.exports = {
  entry: './src/entry.js',

  output: {
    filename: 'bundle.js',
    path: 'dist',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: [CONTEXT_DIR, EMISSARY_DIR]
      }, {
        test: /\.css$/,
        loader: 'css-loader!postcss-loader',
        include: [CONTEXT_DIR, EMISSARY_DIR]
      }, {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        include: [CONTEXT_DIR, EMISSARY_DIR]
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=8192',
        include: [CONTEXT_DIR, EMISSARY_DIR]
      }
    ]
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.svg', '.png', '.jpg'],
    modulesDirectories: ['node_modules']
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
