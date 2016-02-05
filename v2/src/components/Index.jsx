const React = require('react');
const filet = require('../img/filet.png');

const Index = React.createClass({
  render: function() {
    return (
      <div>
        <h2>the filet zone</h2>
        <img src={filet} style={{height: 200}} />
      </div>
    );
  }
});

module.exports = Index;