const React = require('react');

const Header = require('./Header.jsx');
const css = require('./style.css');
const j = require('./style.css.json');
const logo = require('../img/logo-color-border-light.svg');
const pepe = require('../img/pepe.png');

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>Opsee</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body>
          <div className={j.root}>
            <h1>Welcome to</h1>
            <div><img src={logo} alt="Opsee logo" className={j.logo} /></div>
            <div><img src={pepe} /></div>
            <Header />
            {this.props.children}
          </div>
        </body>
      </html>
    )
  }
})

module.exports = Root;
