import React from 'react';
import { Container, Row, Col, ListGroup, Spinner, Card, Button, ProgressBar } from 'react-bootstrap';
import SelectedTab from '../components/SelectedTab';
import { Link } from 'react-router-dom';
import { ROUTES } from "../routes";
import Navigation from './Navigation';
import LOGO from '../logo.png';
import '../css/Diagnosis.css';
import '../App.css';

class PreliminaryDiagnosis extends React.Component {
    constructor(props) {
        super(props);
        const getSymptoms = localStorage.getItem('symptom-types');
        const getBodyPartsID = localStorage.getItem('symptomIds');
        const getBodyParts = localStorage.getItem('symptom-body');

        this.state = {
            MySymptoms: [],
            SymptomsList: getSymptoms !== null && getSymptoms !== undefined  && getSymptoms !== 'undefined' && getSymptoms !== 'null' ? JSON.parse(getSymptoms) : [],
            BodyPartsId: getBodyPartsID !== null && getBodyPartsID !== undefined  && getBodyPartsID !== 'undefined' ? JSON.parse(getBodyPartsID) : [],
            BodyParts: getBodyParts !== null && getBodyParts !== undefined  && getBodyParts !== 'undefined' ? JSON.parse(getBodyParts) : [],
            Diagnosis: [],
            Loading: true
        }

        this.removeName = this.removeName.bind(this);
        this.removeBody = this.removeBody.bind(this);
    }

    removeName(list) {
        this.setState({SymptomsList: list}, () => {
            localStorage.setItem('symptom-types', JSON.stringify(this.state.SymptomsList));
            window.location.reload();
        });
    }

    removeBody(list) {
        this.setState({BodyParts: list}, () => {
            localStorage.setItem('symptom-body', JSON.stringify(this.state.BodyParts));
            window.location.reload();
        });
    }

    componentDidMount() {
        let ids = []
        this.state.SymptomsList.forEach(symptoms => {
            ids.push(symptoms.value);
        })

        this.state.BodyPartsId.forEach(symptoms => {
            ids.push(symptoms);
        })

        const userDetails = JSON.parse(localStorage.getItem('user'));

        fetch('/diagnosis', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                Symptoms: ids,
                Gender: userDetails.gender.toLowerCase(),
                Age: parseInt(userDetails.date.substring(0, 4))
            })   
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({Diagnosis: data, Loading: false});
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <Navigation logo={LOGO} />
                <Container fluid style={{marginTop: 'calc(3vh)'}}>
                    <Row>
                        <Col md={{ span: 2, offset: 1 }}>
                            <div>
                                <Card style={{width: '25vw', marginTop: 'calc(4vh)'}}>
                                    <Card.Body>
                                    <Card.Title style={{float: 'left', width: '100%'}}>All Selected Symptoms</Card.Title>
                                    <Card.Text style={{float: 'left'}}>
                                        <div className="card-tabs-div">
                                            {this.state.BodyParts.map(body => {
                                                return (
                                                    <SelectedTab name={body} list={this.state.BodyParts} deletion={this.removeBody} isDiagnosis={true} />    
                                                )
                                            })}
                                            {this.state.SymptomsList.map(symptom => {
                                                console.log(symptom)
                                                return (
                                                    <SelectedTab name={symptom.label} list={this.state.SymptomsList} deletionObj={this.removeName} isDiagnosis={true}/>
                                                )
                                            })}
                                        </div>
                                    </Card.Text>
                                    </Card.Body>
                                </Card> 
                            </div>
                        </Col>
                        <Col  md={{ span: 3, offset: 2 }}>
                            <div className="listgroup-div">
                                <ListGroup variant="flush">
                                    <ListGroup.Item style={{fontSize: 'calc(1.3vw)', backgroundColor: '#4D6466', color: 'white'}}>Possible Diagnosis</ListGroup.Item>
                                    <div className="listgroup-item-div">
                                        {this.state.Loading ? 
                                        <div className="listgroup-loading">
                                            <Spinner animation="border" variant="info" />
                                        </div> :
                                        (this.state.Diagnosis.length === 0 ? 
                                        <h3 className="no-diagnosis">There appears to be no diagnosis right now...</h3> : this.state.Diagnosis.map(diagnosis => {
                                            return (
                                                <div className="single-tile-div">
                                                    <ListGroup.Item>
                                                        <h3 className="single-tile-div-name">{diagnosis.Issue.Name}</h3>
                                                    </ListGroup.Item>
                                                </div>
                                            )
                                        }))}
                                    </div>
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>

                    {this.state.Loading ? null : 
                    <Row style={{marginTop: 'calc(10vh)'}}>
                        <Col md={{ span: 3, offset: 5 }}>
                        <Link to={ROUTES.CLINICS}>
                            <Button 
                                variant="primary"
                                type="submit"
                                style={{backgroundColor: '#FE817B', border: 'none', borderRadius: 'calc(1vw)', 
                                paddingRight: 'calc(1.5vw)', paddingLeft: 'calc(1.5vw)'}}
                                >Next: Find nearest clinic</Button>
                        </Link>
                        </Col>
                    </Row>}

                </Container>

                {this.state.Loading ? null : 
                <div className="progress-bar-div">
                    <div className="progress-bar-div-center">
                        <ProgressBar now={65} label={"65%"} />
                    </div>
                </div>}
               
            </div>
        );
    }
}

export default PreliminaryDiagnosis;