import { saveQuestion } from "../utils/api"

export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function saveAnswer (authedUser, qid, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
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