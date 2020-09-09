import React from "react";
import { withRouter } from "../../../node_modules/react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../firebase";
import { ROUTES } from "../../routes";

const Authorization = (condition) => (Component) => {
  class Authorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(Authorization);
};

export default Authorization;
