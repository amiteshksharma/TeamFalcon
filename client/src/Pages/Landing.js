import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { ROUTES } from '../routes';
import {Link} from "react-router-dom";
import Navigation from './Navigation';
import LOGO from '../Logo_group.png';
import '../css/landing.css';

class Landing extends React.Component {
  render() {
    return (
      <div className="background-div">
      <Navigation logo={LOGO} />
        <div className="text-center">
          <h1 className="title">Your new digital healthcare partner</h1>
          <div className="p-body-div">
            <p align="center">Falcon is a revolutionary optimization tool that helps you receive preliminary diagnoses and book your medical appointments</p>
          </div>
          <Link to={ROUTES.INFO}>
            <Button 
                  onClick={()=>{
                    console.log("Button has been clicked");
                  }}
                  variant="primary"
                  type="submit"
                  style={{marginTop: 'calc(16vh)'}}>Get Started</Button>
          </Link>
        </div>
      </div>

  )
  }
}
export default Landing;