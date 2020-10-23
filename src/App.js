import React from 'react';
import './bootstrap-4.5.3-dist/css/bootstrap.min.css';
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

export const userProfileContext = React.createContext()

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth)
  return (
    <userProfileContext.Provider value={user}>
      <Provider store={QuestionStore}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/" exact component={DisplayQuestion} />
            <Route path="/ask">
              {user ? <AskQuestion /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route component={Error} />
          </Switch>
        </div>
      </Provider>
    </userProfileContext.Provider>
  );
}

export default App;
