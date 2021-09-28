import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared.js';
import illustration from './images/would_you_rather_illustration_jcomp_freepik.jpg'
import Login from './components/Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Would you rather...?</h1>
        </header>

        <div class="img-container">
          <img class="illustration" src={ illustration } alt="" />
          <a class="copyright-link" href='https://www.freepik.com/vectors/people'>People vector created by jcomp - www.freepik.com</a>
        </div>

        <Login />
      </div>
    );
  }
}

export default connect()(App)

