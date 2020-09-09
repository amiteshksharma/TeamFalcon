import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stories from "./components/Stories";
import HomeFunction from './components/Home';
import createStory from "./components/createStory";
import login from "./components/authentication/login";
import forgotPassword from "./components/authentication/forgotPassword";
import Navigation from "./components/Navigation"
import { withAuthentication } from "./components/session";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Misc */
import { ROUTES } from "./routes";

function App() {

  return (
    
    //The router navigates to the different pages
    <React.Fragment>
    <Router>
      <Navigation />
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomeFunction} />
          <Route exact path={ROUTES.STORIES} component={Stories} />
          <Route exact path={ROUTES.CREATE} component={createStory} />
          <Route exact path={ROUTES.LOGIN} component={login} />
          <Route exact path={ROUTES.FORGOT_PASSWORD} component={forgotPassword} />
        </Switch>
    </Router>
    </React.Fragment>
  );
}

export default withAuthentication(App);
