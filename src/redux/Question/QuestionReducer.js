import firebase from "../../Components/Firebase/Config"

const initialState = {
    questions: [
        // { id: Date.now(), user: "Shahriar", title: "What is my ip?", categories: "internet", question: "I want to know my ip.", answers: [], upvoat: 0, downvoat: 0 }
    ]
}

function QuestionReducer(state = initialState, action) {
    switch (action.type) {
        case "ASK":
            return { ...state, questions: [...state.questions, action.payload] }
        case "RENDER":
            return { ...state, questions: Object.values(action.payload) }
        default:
            return state
    }
}

export default QuestionReducer