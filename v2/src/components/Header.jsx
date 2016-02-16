import React from 'react'
import {Link} from 'react-router';
import LogoColor from 'Emissary/src/js/components/global/LogoColor.jsx';

const css = require('../css/style.css.json');

const Header = React.createClass({
  render: function () {
    return (
      <header className={css.header}>
        <Link to='/'>Index</Link>
        <Link to='/about'>About</Link>
        <LogoColor />
      </header>
    );
  }
})

module.exports = Header;