const React = require('react');

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
          {this.props.children}
        </body>
      </html>
    )
  }
})

module.exports = Root;
