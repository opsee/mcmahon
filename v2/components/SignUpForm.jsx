const React = require('react');

module.exports = React.createClass({
  render() {
    return(
      <form>
        <div>
          <label for="js-submit-email">Email:</label>
          <input id="js-submit-email" name="email" placeholder="pepe@therarest.com" type="email" autofocus />
        </div>

        <div>
          <label for="js-submit-name">Name:</label>
          <input id="js-submit-name" name="name" placeholder="pepe" type="text" />
        </div>

        <div>
          <input type="submit" value="submit ur self" />
        </div>
      </form>
    );
  }
});