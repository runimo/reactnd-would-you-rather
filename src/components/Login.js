import React, { Component } from 'react';

class Login extends Component {
  render () {
    return (
      <div class="login">
        <p>Please login to continue</p>
        <select class="login__select">
          <option>Select...</option>
          <option></option>
        </select>
        <button class="login__button">
          Login
        </button>
      </div>

    )
  };
}

export default Login