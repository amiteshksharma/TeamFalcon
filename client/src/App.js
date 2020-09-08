import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Misc */
import { ROUTES } from "./routes";

function App() {
  return (
    //The router navigates to the different pages
      // <Router>
      //   {/* <Breadcrumbs /> */}
      //   <Switch>
      //     <Route exact path={ROUTES.LANDING} component={Landing} />
      //     <Route exact path={ROUTES.INFO} component={Personal_info} />
      //     <Route exact path={ROUTES.SYMPTOMS} component={Symptoms} />
      //     <Route exact path={ROUTES.SYMPTOM_LIST} component={SymptomList} />
      //     <Route exact path={ROUTES.PRELIMINARYDIAGNOSIS} component={PreliminaryDiagnosis} />
      //     <Route exact path={ROUTES.CLINICS} component={Clinics} />
      //     <Route exact path={ROUTES.CONFIRMATION} component={Confirmation} />
      //   </Switch>
      // </Router>
      <div>
        <h1>Hellow world</h1>
      </div>
  );
}

export default App;
