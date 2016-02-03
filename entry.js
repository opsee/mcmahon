// entry.js with no routing
const React = require('react');
const Root = require('./components/Root.jsx');
const Router = require('react-router');
const routes = require('./Routes.jsx');

// TODO Client render?

module.exports = (locals, callback) => {
  const history = Router.createMemoryHistory();
  const location = history.createLocation(locals.path);

  Router.match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = React.renderToStaticMarkup(React.createElement(Root, locals))
    callback(null, '<!DOCTYPE html>' + html)
  });
};