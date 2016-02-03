// components/Header.jsx
const React = require('react')

const Header = React.createClass({
  render: function () {
    return (
      <header>
        <a href='/'>Index</a>
        <a href='/about'>About</a>
      </header>
    );
  }
})

module.exports = Header;