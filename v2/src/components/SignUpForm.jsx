const React = require('react');
const garf = require('../img/garf.jpg');

module.exports = React.createClass({

  getInitialState() {
    return {
      showGarf: false
    };
  },

  onSubmit(e) {
    e.preventDefault();
    this.setState({ showGarf: true });
  },

  renderForm() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="js-submit-email">Email:</label>
          <input id="js-submit-email" name="email" placeholder="pepe@therarest.com" type="email" autofocus />
        </div>

        <div>
          <label htmlFor="js-submit-name">Name:</label>
          <input id="js-submit-name" name="name" placeholder="pepe" type="text" />
        </div>

        <div>
          <input type="submit" value="submit ur self" />
        </div>
      </form>
    );
  },

  renderGarf() {
    return (
      <div>
        <h1>Congration</h1>
        <img src={garf} />
      </div>
    );
  },

  render() {
    return this.state.showGarf ? this.renderGarf() : this.renderForm();
  }
});