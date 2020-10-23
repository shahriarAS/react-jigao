import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import QuestionReducer from "./QuestionReducer"

const QuestionStore = createStore(QuestionReducer, composeWithDevTools())

export default QuestionStore