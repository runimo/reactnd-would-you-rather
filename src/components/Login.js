import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  handleLogin = () => {
    const select = document.getElementById('login')
    const id = select.value
    this.props.dispatch(setAuthedUser(id))
  }

  render () {
    const { users } = this.props

      return (
        <Fragment>
          <div className="img-container">
            <img className="illustration" src="/images/would_you_rather_illustration_jcomp_freepik.jpg" alt="Illustration of a woman sitting cross-legged and scratching her head, looking at a huge question mark" />
            <a className="copyright-link" href='https://www.freepik.com/vectors/people'>People vector created by jcomp - www.freepik.com</a>
          </div>

          <div className="login">
            <p>Please login to continue</p>
            <select id="login" className="login__select">
              <option>Select...</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
              }
            </select>
            <button className="btn btn-primary" onClick={this.handleLogin}>
              Login
            </button>
          </div>
        </Fragment>
      )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    users: Object.values(users)
  }
}


export default connect(mapStateToProps)(Login)