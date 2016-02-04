const React = require('react');
const Router = require('react-router');

const routes = require('./Routes.jsx');
const context = require('./context.jsx');

// TODO Client render?

module.exports = (locals, callback) => {
  const history = Router.createMemoryHistory();
  const location = history.createLocation(locals.path);

  Router.match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = React.renderToStaticMarkup(context(renderProps));
    callback(null, '<!DOCTYPE html>' + html);
  });
};