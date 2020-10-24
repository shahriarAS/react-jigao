import React, { useEffect, useState } from 'react';
// import './bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './App.css'
import firebase from "./Components/Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth"
import AskQuestion from './Components/Question/AskQuestion';
import { Provider } from "react-redux"
import QuestionStore from './redux/Question/QuestionStore';
import NavBar from './Components/NavBar';
import { Switch, Route, Redirect } from "react-router-dom";
import DisplayQuestion from './Components/Question/DisplayQuestion';
import Error from './Components/Error';
import Login from './Components/User/Login';
import Profile from './Components/User/Profile';
import SingleQuestion from './Components/Question/SingleQuestion';

export const userProfileContext = React.createContext()

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth)
  const [questions, setQuestions] = useState(
    {}
  )

  useEffect(() => {
    firebase.database().ref().child("questions").on("value", snapshot => {
      if (snapshot.val() != null) {
        console.log("Firebase Render")
        setQuestions(snapshot.val())
      }
    })
  }, [])


  return (
    <userProfileContext.Provider value={{ user: user, questions: Object.values(questions), questionsObj: questions }}>
      <Provider store={QuestionStore}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/" exact component={DisplayQuestion} />
            <Route path="/ask">
              {user ? <AskQuestion /> : <Redirect to="/login" />}
            </Route>
            <Route path="/profile/:user">
              {user ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/question/:id/:title" render={(props) => <SingleQuestion {...props}/>}/>
            <Route component={Error} />
          </Switch>
        </div>
      </Provider>
    </userProfileContext.Provider>
  );
}

export default App;
