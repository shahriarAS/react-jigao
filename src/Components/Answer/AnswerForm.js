import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userProfileContext } from "../../App";
import firebase from "../Firebase/Config"

function AnswerForm(props) {
    const { question } = props
    const { user, questionsObj } = useContext(userProfileContext)
    const { register, handleSubmit } = useForm()

    function SubmitAnswer(data) {
        const questionKey = Object.keys(questionsObj).filter(i => questionsObj[i].id === question.id)
        data.question = question.id
        data.id = Date.now()
        data.user = user.displayName
        data.upvoat = 0
        data.downvoat = 0
        firebase.database().ref().child(`questions/${questionKey}/answers`).push(data)
    }
    return (
        <form onSubmit={handleSubmit(SubmitAnswer)}>
            <div className="form-group">
                <label htmlFor="answerid">Answer</label>
                <textarea className="form-control" id="answerid" rows="3" name="answer" placeholder="Write your answer" ref={register({ maxLength: 250 })}></textarea>
            </div>
            <button className="btn btn-primary btn-lg btn-block" onClick={handleSubmit(SubmitAnswer)} type='submit'>Answer</button>
        </form>
    )
}

export default AnswerForm