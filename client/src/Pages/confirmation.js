import React from 'react';
import { Media, Card, CardBody } from 'reactstrap';
import tick from '../css/tick.png';
import calender from '../css/calender.png';
import location from '../css/location.png';
import contact from '../css/contact.png';
import { Container, Row, Col } from 'react-bootstrap';

import '../css/confirmation.css'

class Confirmation extends React.Component {
render(){
    return(
       
            <div style={{marginLeft: '30%'}}> 
        
        
            <Row style={{fontSize: '30px'}}>
                <Col>
                <Media left href="#">
                <Media object src={tick} style={{width: "80px"}}/></Media>
                <strong>Your Appointment is Confirmed!</strong>
                </Col>
            </Row>
            <Row>
            <Col>
                <h5 style={{marginLeft: '150px'}}><strong>Appointment Details</strong></h5>
                <h6 style={{marginLeft: '150px'}}>Confirmation #: 093452</h6>
            </Col>
            </Row>
            <br />
            <Row style={{marginLeft: '50px'}}>
            <Col>
            <Media left href="#">
            <Media object src={calender} style={{width: "50px", marginRight: '30px'}}/>
            </Media>
            <strong>Thu, September 3, 2020 at 12:00PM</strong>
            </Col>
            </Row>
            <br />
            <Row style={{marginLeft: '50px'}}>
                <Col>
                <Media left href="#" style={{marginRight: '30px'}}>
                <Media object src={location} style={{width: "50px"}}/>
                </Media>
                <strong>Toronto General Hospital · 0.8mi </strong>
                    <p style={{ marginLeft: '80px'}}>Address: 200 Elizabeth St, Toronto, ON <br />Hours: Open 24 hours <br/> Monday – Sunday <br/> Phone: +1 (416) 340-3131 <br />Website: unh.ca</p>
                    
                </Col>
            </Row>
            <br />
            <Row style={{marginLeft: '50px'}}>
                <Col>
                <Media left href="#" style={{marginRight: '30px'}}>
                <Media object src={contact} style={{width: "50px"}}/>
                </Media>
                <strong>Bob Falcon</strong>
                    <p style={{ marginLeft: '80px'}}>Email: bfalcon@somemail.com <br />DOB: 10/10/1985<br/> </p>
                </Col>
            </Row>
           
        </div>
        
      );
   }
}

export default Confirmation;