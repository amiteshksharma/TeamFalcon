import React from 'react';
import { Container, Form, Col, Button } from "../../node_modules/react-bootstrap";
import {Link} from "react-router-dom";
import { ROUTES } from "../routes";
import "bootstrap/dist/css/bootstrap.css";
import "../Style/personal_info.css";

class Personal_info extends React.Component{

  constructor(props){
    super(props);
    this.state = { zipcode: '' };
  }

  handleChange = event => {
    this.setState({ zipcode: event.target.value });
  };

  render() {
    return(
      <React.Fragment>
      <h1 class= "title">Let's get some information (?)</h1>
      <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label class="font-weight-bold">First Name</Form.Label>
            <Form.Control type="first name" />
          </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label class="font-weight-bold">Last Name</Form.Label>
            <Form.Control type="last name"/>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridEmailAddress">
          <Form.Label class="font-weight-bold">Email Address</Form.Label>
          <Form.Control/>
        </Form.Group>

        <Form.Group controlId="formGridDateOfBirth">
          <Form.Label class="font-weight-bold">Date of Birth</Form.Label>
          <Form.Control placeholder= "MM/DD/YYYY" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridZipCode">
            <Form.Label class="font-weight-bold">Location</Form.Label>
            <Form.Control 
              type = "text"
              name = "zipcode"
              value = {this.state.username}
              onChange = {this.handleChange}
              placeholder= "Zip Code" />
        </Form.Group>
        </Form.Row>
        
        <div class="text-center">
          <Link to={ROUTES.SYMPTOMS}>
            <Button class="text-center" 
                    onClick={() => {
                      console.log("The button has been clicked");
                    }}
                    variant="primary" 
                    type="submit">
              Next: Select Symptoms
            </Button>
          </Link>
        </div>
      </Form>
    </Container>
    </React.Fragment>
    ); 
  }
}
export default Personal_info