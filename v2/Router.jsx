const React = require('react');
const Router = require('react-router').Router;
const browserHistory = require('react-router').browserHistory;
const routes = require('./Routes.jsx');

module.exports = (
  <Router history={browserHistory} routes={routes} />
);