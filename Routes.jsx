const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;

const Root = require('./components/Root.jsx');
const Index = require('./components/Index.jsx');
const About = require('./components/About.jsx');

module.exports = (
  <Router>
    <Route component={Root} path='/'>
      <IndexRoute component={Index} />
      <Route path="about" component={About} />
    </Route>
  </Router>
);