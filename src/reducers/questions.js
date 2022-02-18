import { ADD_QUESTION, RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions(state = {}, action){
    switch (action.type) {
        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [question.id]: question
            }
        case RECEIVE_QUESTIONS:
            return action.questions;
        default:
            return state;
    }
}