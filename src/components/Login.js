import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  handleLogin = () => {
    const select = document.getElementById('login')
    const id = select.value
    this.props.dispatch(setAuthedUser(id));
  }

  render () {
    return (
      <div className="login">
        <p>Please login to continue</p>
        <select id="login" className="login__select">
          <option>Select...</option>
          {this.props.users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))
          }
        </select>
        <button className="login__button" onClick={this.handleLogin}>
          Login
        </button>
      </div>
    )
  };
}

function mapStateToProps ({ users }) {
  return {
    users: Object.values(users)
  }
}


export default connect(mapStateToProps)(Login)