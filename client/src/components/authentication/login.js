import React, { Component } from "react";
import { withRouter } from "../../../node_modules/react-router-dom";
import { compose } from "recompose";

import { ForgetPasswordLink } from "./forgotPassword";
import { SignUpLink } from "./signup";
import { withFirebase } from "../firebase";
import { ROUTES } from "../../routes";


class LoginIn extends Component {
  render() {
    return (
      <div>
        <h1>SignIn</h1>
        <LogInForm />
        <ForgetPasswordLink />
        <SignUpLink />
      </div>
    );
  }
}

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class LogInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('Email', email);
        const getProfile = this.props.firebase.loadProfile(email)
        getProfile.then(profile => {
          console.log(profile);
          localStorage.setItem('Username', profile.Username);  
        })
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <p>Enter Your Email:</p>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <p>Enter Password:</p>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const LogInForm = compose(withRouter, withFirebase)(LogInFormBase);

export default LoginIn;

export { LogInForm };
