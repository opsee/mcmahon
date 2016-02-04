const React = require('react');

const Header = require('./Header.jsx');
const css = require('./style.css');
const logo = require('../img/logo-color-border-light.svg');

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>Opsee</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body>
          <div>
            <img src={logo} alt="Opsee logo" />
          </div>
          <Header />
          {this.props.children}
        </body>
      </html>
    )
  }
})

module.exports = Root;
