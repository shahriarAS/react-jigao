import React from "react";
import firebase from "../Firebase/Config"
import { useAuthState } from "react-firebase-hooks/auth"

const auth = firebase.auth();

function Login() {
    const [user] = useAuthState(auth)

    function signInWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function (result) {
            var user = result.user;
        })
    }

    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <button className="btn btn-primary btn-lg btn-block" onClick={signInWithGoogle} type='submit'>Login With Google</button>
            </div>
        </div>
    )
}

export default Login;