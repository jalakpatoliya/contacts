import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
