import React from 'react';
import { Media, Card, CardBody } from 'reactstrap';
import tick from '../css/tick.png';
import calender from '../css/calender.png';
import location from '../css/location.png';
import contact from '../css/contact.png';
import Navigation from './Navigation';
import LOGO from '../logo.png';
import { Container, Row, Col, Spinner, ProgressBar } from 'react-bootstrap';

import '../css/confirmation.css';

class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: true,
            getClinicDetails: JSON.parse(localStorage.getItem('getClinic')),
            getUserDetails: JSON.parse(localStorage.getItem('user'))
        }

        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date) {
        const array = date.split('-');
        return array[1] + "/" + array[2] + "/" + array[0]
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({Loading: false});  
            localStorage.clear();  
        }, 3500)
    }

    render() {
        return (
            <div>
                <Navigation logo={LOGO} />
                {this.state.Loading ?  
                <div className="spinner-confirmation">
                    <Spinner animation="border" variant="success" />
                </div> : 

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
                            <strong>{this.state.getClinicDetails.name} · {this.state.getClinicDetails.distance} </strong>
                            <p style={{ marginLeft: '80px' }}> 
                            Address: {this.state.getClinicDetails.address}<br />
                            Hours: {this.state.getClinicDetails.hours} <br /> 
                            {this.state.getClinicDetails.days} <br /> 
                            Phone: {this.state.getClinicDetails.phone}<br />
                            Website: {this.state.getClinicDetails.website}</p>

                        </Col>
                    </Row>
                    <br />
                    <Row style={{ marginLeft: '50px' }}>
                        <Col>
                            <Media left href="#" style={{ marginRight: '30px' }}>
                                <Media object src={contact} style={{ width: "50px" }} />
                            </Media>
                            <strong>{this.state.getUserDetails.first_name + " " + this.state.getUserDetails.last_name} </strong>
                            <p style={{ marginLeft: '80px' }}>Email: {this.state.getUserDetails.email} <br />DOB: {this.formatDate(this.state.getUserDetails.date)}<br /> </p>
                        </Col>
                    </Row>   
                </Container>
                }
                <div className="progress-bar-div">
                    <div className="progress-bar-div-center">
                        <ProgressBar now={100} label={"100%"} />
                    </div>
                </div>
            </div>

        );
    }
}

export default Confirmation;