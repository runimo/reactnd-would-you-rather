import React, { Component } from 'react'
import '../App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared.js'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import Logout from './Logout'
import Nav from './Nav'
import NewQuestionForm from './NewQuestionForm'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    const { authedUser } = this.props

    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <h1 className="title">Would you rather...?</h1>

            <div className="nav-container">
              <Nav />

              { authedUser && <Logout /> }
            </div>

          </header>

          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/new' element={<NewQuestionForm />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  const currentUser = authedUser ? users[authedUser.id] : null

  return {
    authedUser: currentUser
  }
}

export default connect(mapStateToProps)(App)

