import React from 'react';
import { Container, Form, Col, Button, Card, ProgressBar } from "../../node_modules/react-bootstrap";
import {Link} from "react-router-dom";
import { ROUTES } from "../routes";
import "bootstrap/dist/css/bootstrap.css";
import "../css/personal_info.css";
// For the progress bar
import "../App.css";

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  gender:'',
  date: '',
  location: '',
  error: null,
};

class Personal_info extends React.Component{

  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { ...INITIAL_STATE } = this.state;

    event.preventDefault();
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      gender,
      date,
      location,
      error,
    } = this.state;

    const isInvalid =
    firstName === '' || lastName === '' ||
    email === '' || date === '' || location === '' || gender === '';

    return(

      <React.Fragment>
      
      <Container>
          <Card style={{padding: '20px'}}>
          <h1 class= "title">Let's get some information</h1>
          <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label class="font-weight-bold">First Name</Form.Label>
              <Form.Control 
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  type="text" 
                  style={{borderRadius: '5vw', background: "#EAE9E9"}}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label class="font-weight-bold">Last Name</Form.Label>
              <Form.Control 
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  type="text"
                  style={{borderRadius: '5vw', background: "#EAE9E9"}}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridEmailAddress">
            <Form.Label class="font-weight-bold">Email Address</Form.Label>
            <Form.Control
                name="email"
                value={email}
                onChange={this.handleChange}
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
                value={date}
                onChange={this.handleChange}
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
                value={gender}
                onChange={this.handleChange}
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
                value={location}
                onChange={this.handleChange}
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
                        localStorage.setItem('age', this.state.date.substring(0, 3));
                      }}
                      variant="primary" 
                      type="submit"
                      style={{borderRadius: '5vw', background: "#FE817B"}}>
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
          <ProgressBar now={20} label={"20%"} />
        </div>
      </div>

    </React.Fragment>
    ); 
  }
}



export default Personal_info