import { saveQuestion } from "../utils/api"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (question) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestion({
      ...question,
      author: authedUser.id
    })
    .then((question) => dispatch(addQuestion(question)))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}