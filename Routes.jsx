const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

const Root = require('./components/Root.jsx');
// const About = require('./components/About.jsx');
const Index = require('./components/Index.jsx');




module.exports = (
  <Route handler={Root} path='/'>
  </Route>
);