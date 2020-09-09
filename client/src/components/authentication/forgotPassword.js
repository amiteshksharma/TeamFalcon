import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../firebase";
import { ROUTES } from "../../routes";

const ForgetPasswordPage = () => (
  <div>
    <h1>Forget Password</h1>
    <ForgetPasswordForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class ForgetPasswordFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const ForgetPasswordLink = () => (
  <p>
    <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</Link>
  </p>
);

export default ForgetPasswordPage;

const ForgetPasswordForm = withFirebase(ForgetPasswordFormBase);

export { ForgetPasswordForm, ForgetPasswordLink };