const React = require('react');

const Header = require('./Header.jsx');

const logo = require('../img/logo-color-border-light.svg');
const pepe = require('../img/pepe.png');

const style = require('../css/style.css');
const css = require('../css/style.css.json');

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>Opsee</title>
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </head>
        <body>
          <div className={css.root}>
            <h1>Welcome to</h1>
            <div><img src={logo} alt="Opsee logo" className={css.logo} /></div>
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
