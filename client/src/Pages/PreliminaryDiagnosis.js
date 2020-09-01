import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ListGroup, ListGroupItem, Card, CardBody, CardTitle, CardLink} from 'reactstrap';
import SelectedTab from '../components/SelectedTab';



class PreliminaryDiagnosis extends React.Component {
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Card style={{width: '400px'}}>
                                 <CardBody>
                                <CardTitle style={{float: 'left'}}>My Symptoms</CardTitle>
                                <CardLink href="#" style={{float: 'right'}}>Edit</CardLink>
                                </CardBody>
                                </Card> 
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <ListGroup>
                                    <ListGroupItem >Possible Diagnosis</ListGroupItem>
                                    <ListGroupItem >XXXXXXX</ListGroupItem>
                                    <ListGroupItem >XXXXXXXXX</ListGroupItem>
                                    <ListGroupItem >XXXXXXXXX</ListGroupItem>
                                    <ListGroupItem >XXXXXXXXXXX</ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>

                </Container>
               
            </div>
        );
    }
}

export default PreliminaryDiagnosis;