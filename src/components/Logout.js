import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Logout extends Component {
  handleLogout = () => {
    this.props.dispatch(setAuthedUser(''))
  }
  render () {
    const { authedUser } = this.props

    return (
      <div className="logout">
        <img alt="Your avatar" className="avatar" height="70px" width="70px" src={authedUser.avatarURL} />
        <p className="logout-user">Hello, {authedUser.name}</p>

        <button className="logout__button" onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: users[authedUser.id]
  }
}

export default connect(mapStateToProps)(Logout)