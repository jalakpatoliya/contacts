import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { CurrentUserContext, CurrentUserProvider } from './contexts/current-user.context';
import { ContactListProvider } from './contexts/contact-list.context';
import { ContactPage } from './pages/contact/contact.component';

const App = () => {
  return (
    <div>
      <CurrentUserProvider>
        <ContactListProvider>
          <Switch>
            <Route exact path='/' component={SignInAndSignUpPage} />
            <Route exact path='/contacts' component={ContactPage} />
          </Switch>
        </ContactListProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
