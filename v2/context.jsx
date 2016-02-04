const RouterContext = require('react-router').RouterContext;
const React = require('react');

module.exports = function(renderProps) {
  return <RouterContext {...renderProps} />;
};