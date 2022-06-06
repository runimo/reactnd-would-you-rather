import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { saveAnswer } from '../actions/questions'
import { saveUserAnswer } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { receiveUsers } from '../actions/users'

export function handleInitialData() {
  return async (dispatch) => {
    const { users, questions } = await getInitialData()
    dispatch(receiveQuestions(questions))
    dispatch(receiveUsers(users))
  };
}

export function handleSaveQuestionAnswer (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const authedUserId = authedUser.id

    return saveQuestionAnswer(authedUserId, qid, answer)
    .then(() => {
      dispatch(saveAnswer(authedUserId, qid, answer))
      dispatch(saveUserAnswer(answer, authedUserId, qid))
    })
  }
}