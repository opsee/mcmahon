import React from 'react'
import {Link} from 'react-router';
import Loader from 'Emissary/src/js/components/global/Loader.jsx';

const css = require('../css/style.css.json');

const Header = React.createClass({
  render: function () {
    return (
      <div>
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