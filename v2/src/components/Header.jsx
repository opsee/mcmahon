import React from 'react'
import {Link} from 'react-router';
import Loader from 'emissary/src/js/components/global/Loader.jsx';
import LogoColor from 'emissary/src/js/components/global/LogoColor.jsx';
import css from '../css/style.css.json';

const Header = React.createClass({
  render: function () {
    return (
      <div>
        <LogoColor />

        <header className={css.header}>
          <Link to='/'>Index</Link>
          <Link to='/about'>About</Link>
        </header>

        <div>
          CHECK OUT THIS LOADER:
          <Loader />
        </div>
      </div>
    );
  }
})

module.exports = Header;