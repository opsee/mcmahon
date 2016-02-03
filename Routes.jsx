const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const Root = require('./components/Root.jsx');

module.exports = (
  <Route handler={Root} path='/' />
);