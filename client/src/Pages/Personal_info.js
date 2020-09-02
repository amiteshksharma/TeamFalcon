import React, {Component} from 'react';
import { Container, Form, Col, Button, Card, ProgressBar } from "../../node_modules/react-bootstrap";
import {Link} from "react-router-dom";
import { ROUTES } from "../routes";
import "bootstrap/dist/css/bootstrap.css";
import "../css/personal_info.css";
import Navigation from './Navigation';
import LOGO from '../logo.png';
// For the progress bar
import "../App.css";

class Personal_info extends React.Component{

  userData;

  constructor(props) {
      super(props);

      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeGender = this.onChangeGender.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeLocation = this.onChangeLocation.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          first_name: '',
          last_name: '',
          email: '',
          gender: '',
          date: '',
          location: '',
          error: null
      }
  }

  // Form Events
  onChangeFirstName(e) {
    this.setState({ first_name: e.target.value })
  }

  onChangeLastName(e) {
    this.setState({ last_name: e.target.value })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeGender(e) {
    this.setState({ gender: e.target.value })
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value })
  }

  onChangeLocation(e) {
    this.setState({ location: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    this.setState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        date: '',
        location: ''
    })
  }

  // React Life Cycle
  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem('user'));

    if (localStorage.getItem('user')) {
        this.setState({
            first_name: this.userData.first_name,
            last_name: this.userData.last_name,
            email: this.userData.email,
            gender: this.userData.gender,
            date: this.userData.date,
            location: this.userData.location
        })
    } else {
        this.setState({
          first_name: '',
          last_name: '',
          email: '',
          gender: '',
          date: '',
          location: ''
        })
    }
  }

  componentWillUpdate(nextProps, nextState) {
      localStorage.setItem('user', JSON.stringify(nextState));
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      gender,
      date,
      location,
      error,
    } = this.state;

    const isInvalid =
      first_name === '' || last_name === '' ||
      email === '' || date === '' || location === '' || gender === '';

    return(

      <React.Fragment>
      <Navigation logo={LOGO} />
      <Container style={{marginTop: 'calc(2vh)'}}>
          <Card style={{padding: '20px'}}>
          <h1 class= "title">Let's get some information</h1>
          <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label class="font-weight-bold">First Name</Form.Label>
              <Form.Control 
                  name="firstName"
                  value={this.state.first_name}
                  onChange={this.onChangeFirstName}
                  type="text" 
                  style={{borderRadius: '5vw', background: "#EAE9E9"}}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label class="font-weight-bold">Last Name</Form.Label>
              <Form.Control 
                  name="lastName"
                  value={this.state.last_name}
                  onChange={this.onChangeLastName}
                  type="text"
                  style={{borderRadius: '5vw', background: "#EAE9E9"}}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridEmailAddress">
            <Form.Label class="font-weight-bold">Email Address</Form.Label>
            <Form.Control
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                type="email"
                placeholder="name@example.com"
                style={{borderRadius: '5vw', background: "#EAE9E9"}}
            />
          </Form.Group>
          <Form.Row>
          <Form.Group as = {Col} controlId="formGridDateOfBirth">
            <Form.Label class="font-weight-bold">Date of Birth</Form.Label>
            <Form.Control 
                name="date"
                value={this.state.date}
                onChange={this.onChangeDate}
                type="date" 
                placeholder= "YYYY-MM-DD" 
                style={{borderRadius: '5vw', background:"#EAE9E9"}}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label class="font-weight-bold">Gender</Form.Label>
            <Form.Control
                as="select"
                name="gender"
                value={this.state.gender}
                onChange={this.onChangeGender}
                type="gender"
                placeholder="Select"
                style={{borderRadius: '5vw', background: "#EAE9E9"}}
            >
              <option></option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group class="form-group col-md-4" controlId="formGridZipCode">
              <Form.Label class="font-weight-bold">Location</Form.Label>
              <Form.Control 
                name="location"
                value={this.state.location}
                onChange={this.onChangeLocation}
                type="text"
                placeholder="Zip Code" 
                maxLength={6}
                style={{borderRadius: '5vw', background: "#EAE9E9"}}
              />
          </Form.Group>
          </Form.Row>
          
          <div class="text-center">
            <Link to={ROUTES.SYMPTOMS}>
              <Button 
                      disabled={isInvalid}
                      class="text-center" 
                      onClick={() => {
                        console.log("The button has been clicked");
                      }}
                      variant="primary" 
                      type="submit"
                      style={{borderRadius: '5vw', background: "#FE817B", border: 'none'}}>
                Next: Select Symptoms
              </Button>
              {error && <p>{error.message}</p>}
            </Link>
          </div>
        </Form>
        </Card>
      
      </Container>

      <div className="progress-bar-div">
        <div className="progress-bar-div-center">
          <ProgressBar now={16} label={"16%"} />
        </div>
      </div>

    </React.Fragment>
    ); 
  }
}



export default Personal_info