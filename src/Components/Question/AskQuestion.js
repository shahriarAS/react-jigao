import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userProfileContext } from "../../App";
import firebase from "../Firebase/Config"

function AskQuestion() {
    const user = useContext(userProfileContext)
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch(
    )
    function SubmitQuestion(data) {
        console.log(data)
        data.id = Date.now()
        data.user = user.displayName
        data.downvoat = 0
        data.upvoat = 0
        firebase.database().ref().child("questions").push(data)
        dispatch(
            {
                type: "ASK",
                info: "Asking Question",
                payload: data,
            })
    }
    return (
        <div className="row">
            <div className="col-sm">
                <form onSubmit={handleSubmit(SubmitQuestion)}>
                    <div className="form-group">
                        <label htmlFor="titleid">Title</label>
                        <input type="text" className="form-control" id="titleid" name="title" placeholder="Write your questions title" ref={register({ required: true, maxLength: 250 })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoriesid">Category</label>
                        <select className="form-control" id="categoriesid" name="categories" ref={register({ required: true, maxLength: 250 })}>
                            <option value="">None</option>
                            <option value="Python">Python</option>
                            <option value="C">C</option>
                            <option value="Java">Java</option>
                            <option value="Javascript">Javascript</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="questionid">Question</label>
                        <textarea className="form-control" id="questionid" rows="3" name="question" placeholder="Write your questions description" ref={register({ required: true, maxLength: 250 })}></textarea>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" onClick={handleSubmit(SubmitQuestion)} type='submit'>Ask</button>
                </form>
            </div>
            <div className="col-sm">
                Questions from logged in use
    </div>
        </div>
    )
}

export default AskQuestion