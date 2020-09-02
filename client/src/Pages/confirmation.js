import React from 'react';
import { Media, Card, CardBody } from 'reactstrap';
import tick from '../css/tick.png';
import calender from '../css/calender.png';
import location from '../css/location.png';
import contact from '../css/contact.png';
import Navigation from './Navigation';
import LOGO from '../logo.png';
import { Container, Row, Col } from 'react-bootstrap';

import '../css/confirmation.css';

const getClinicDetails = JSON.parse(localStorage.getItem('clinic'));
const getUserDetails = JSON.parse(localStorage.getItem('user'));
console.log(getUserDetails);

class Confirmation extends React.Component {
    constructor(props) {
        super(props);

        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date) {
        const array = date.split('-');
        return array[1] + "/" + array[2] + "/" + array[0]
    }

    render() {
        return (

            <div>
                <Navigation logo={LOGO} />

                <Container style={{ marginLeft: '34%' }}>
                    <Row style={{ fontSize: '30px' }} >
                        <Col>
                            <Media left href="#">
                                <Media object src={tick} style={{ width: "80px" }} /></Media>
                            <strong>Your Appointment is Confirmed!</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 style={{ marginLeft: '150px' }}><strong>Appointment Details</strong></h5>
                            <h6 style={{ marginLeft: '150px' }}>Confirmation #: 093452</h6>
                        </Col>
                    </Row>
                    <br />
                    <Row style={{ marginLeft: '50px' }}>
                        <Col>
                            <Media left href="#">
                                <Media object src={calender} style={{ width: "50px", marginRight: '30px' }} />
                            </Media>
                            <strong>{new Date().toUTCString()}</strong>
                        </Col>
                    </Row>
                    <br />
                    <Row style={{ marginLeft: '50px' }}>
                        <Col>
                            <Media left href="#" style={{ marginRight: '30px' }}>
                                <Media object src={location} style={{ width: "50px" }} />
                            </Media>
                            <strong>{getClinicDetails.name} · {getClinicDetails.distance} </strong>
                            <p style={{ marginLeft: '80px' }}> 
                            Address: {getClinicDetails.address}<br />
                            Hours: {getClinicDetails.hours} <br /> 
                            {getClinicDetails.days} <br /> 
                            Phone: {getClinicDetails.phone}<br />
                            Website: {getClinicDetails.website}</p>

                        </Col>
                    </Row>
                    <br />
                    <Row style={{ marginLeft: '50px' }}>
                        <Col>
                            <Media left href="#" style={{ marginRight: '30px' }}>
                                <Media object src={contact} style={{ width: "50px" }} />
                            </Media>
                            <strong>{getUserDetails.first_name + " " + getUserDetails.last_name} </strong>
                            <p style={{ marginLeft: '80px' }}>Email: {getUserDetails.email} <br />DOB: {this.formatDate(getUserDetails.date)}<br /> </p>
                        </Col>
                    </Row>   
                </Container>

            </div>

        );
    }
}

export default Confirmation;