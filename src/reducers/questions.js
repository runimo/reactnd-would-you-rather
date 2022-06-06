import { ADD_QUESTION, RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER } from "../actions/questions";

export default function questions(state = {}, action){
    switch (action.type) {
        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [question.id]: question
            }
        case RECEIVE_QUESTIONS:
            return action.questions
        case SAVE_QUESTION_ANSWER:
            const { authedUser, qid, answer } = action
        return {
            ...state,
            [qid]: {
                ...state[qid],
                [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat(authedUser),
                }
            }
        }
        default:
            return state;
    }
}