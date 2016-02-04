const React = require('react');

const Header = require('./Header.jsx');
const css = require('./style.css');

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>Opsee</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
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
