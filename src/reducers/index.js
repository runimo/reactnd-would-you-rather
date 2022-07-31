import { combineReducers } from 'redux'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'
import questions from './questions'
import users from './users'

export default combineReducers({
  authedUser,
  loadingBar: loadingBarReducer,
  questions,
  users
});