import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { hideLoading, showLoading  } from 'react-redux-loading'
import { receiveQuestions } from '../actions/questions'
import { receiveUsers } from '../actions/users'
import { saveAnswer } from '../actions/questions'
import { saveUserAnswer } from '../actions/users'

export function handleInitialData() {
  return async (dispatch) => {
    dispatch(showLoading())
    const { users, questions } = await getInitialData()
    dispatch(receiveQuestions(questions))
    dispatch(receiveUsers(users))
    dispatch(hideLoading())
  };
}

export function handleSaveQuestionAnswer (qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const { authedUser } = getState()
    const authedUserId = authedUser.id

    return saveQuestionAnswer(authedUserId, qid, answer)
    .then(() => {
      dispatch(saveAnswer(authedUserId, qid, answer))
      dispatch(saveUserAnswer(answer, authedUserId, qid))
      dispatch(hideLoading())
    })
  }
}