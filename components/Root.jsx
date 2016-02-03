const React = require('react')
const Router = require('react-router');
const RouteHandler = Router.RouteHandler;

const Header = require('./Header.jsx');

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>Opsee</title>
        </head>
        <body>
          <Header />
          hello world
        </body>
      </html>
    )
  }
})

module.exports = Root;
