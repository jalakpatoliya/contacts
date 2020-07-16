import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { CurrentUserContext, CurrentUserProvider } from './contexts/current-user.context';
import { ContactListProvider } from './contexts/contact-list.context';
import { ContactPage } from './pages/contact/contact.component';
import HomePage from './pages/home/home.component';
import SignUp from './components/sign-up/sign-up.component';
import SignIn from "./components/sign-in/sign-in.component";

const App = () => {
  return (
    <div>
      <CurrentUserProvider>
        <ContactListProvider>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={SignIn} />
            <Route exact path='/contacts' component={ContactPage} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </ContactListProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
