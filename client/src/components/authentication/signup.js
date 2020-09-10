import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../firebase';
import { ROUTES } from "../../routes";
 
class SignUpPage extends Component{
 render(){
     return(
        <div>
        <h1>SignUp</h1>
        <SignUpForm />
      </div>
     );
 } 
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component{
    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                  .user(authUser.user.uid)
                  .set({
                    username,
                    email,
                });
            })
            .then(() =>{
                this.setState({ ...INITIAL_STATE});
                this.props.firebase.createProfile(username, email);
                localStorage.setItem('Email', email);
                localStorage.setItem('Username', username);
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            })
        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value });
    };

    render(){
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

        return(
            <form onSubmit={this.onSubmit}>
                <p>Enter Your Username:</p>
                <input
                    name= "username"
                    value= {username}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder= "Enter Username"
                />
                <p>Enter Your Email:</p>
                <input
                    name= "email"
                    value= {email}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder= "Email Address"
                />
                <br />
                <p>Enter Password:</p>
                <input
                    name= "passwordOne"
                    value= {passwordOne}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder= "Password"
                />
                <p>Confirm Password:</p>
                <input
                    name= "passwordTwo"
                    value= {passwordTwo}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder= "Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () =>(
    <p>
        Dont have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};