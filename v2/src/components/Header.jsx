const React = require('react');
const Link = require('react-router').Link;
const Button = require('Emissary/src/js/components/forms/Button.jsx');
const css = require('../css/style.css.json');

const Header = React.createClass({
  render: function () {
    console.log(Button)

    return (
      <header className={css.header}>
        <Link to='/'>Index</Link>
        <Link to='/about'>About</Link>
      </header>
    );
  }
})

module.exports = Header;