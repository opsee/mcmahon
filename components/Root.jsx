// components/Root.jsx
var React = require('react')

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          hello, world
        </body>
      </html>
    )
  }
})

module.exports = Root;
