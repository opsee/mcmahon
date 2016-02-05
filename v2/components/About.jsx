const React = require('react');
const SignUpForm = require('./SignUpForm.jsx');

const About = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Sign up</h1>
        <SignUpForm />
      </div>
    );
  }
});

module.exports = About;