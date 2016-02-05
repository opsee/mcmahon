const React = require('react');
const Router = require('react-router');

const routes = require('./src/Routes.jsx');
const router = require('./src/Router.jsx');
const context = require('./src/context.jsx');

// Client-side rendering
if (typeof document !== 'undefined') {
  // TODO initialProps
  React.render(router, document.body);
}

module.exports = (locals, callback) => {
  const history = Router.createMemoryHistory();
  const location = history.createLocation(locals.path);

  Router.match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = React.renderToStaticMarkup(context(renderProps));
    callback(null, '<!DOCTYPE html>' + html);
  });
};