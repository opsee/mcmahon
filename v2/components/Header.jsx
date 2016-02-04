const React = require('react');
const css = require('../css/style.css.json');

const Header = React.createClass({
  render: function () {
    return (
      <header className={css.header}>
        <a href='/'>Index</a>
        <a href='/about'>About</a>
      </header>
    );
  }
})

module.exports = Header;