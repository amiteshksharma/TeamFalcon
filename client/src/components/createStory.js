import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import Authorization from './session/Authorization';
import { FirebaseContext } from "./firebase";
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

function CreateStory() {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [validationUrl, setValidationUrl] = useState(false);
    const [validationTitle, setValidationTitle] = useState(false);
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const isValidUrl = () => {
        return url.includes(".com") ? true : false
    }

    const isValidTitle = () => {
        const isValid = title === '' ? false : true;
        return isValid;
    }

    const submit = () => {
        const isTitleTrue = !isValidTitle() ? setValidationTitle(true) : setValidationTitle(false);
        const isUrlTrue = !isValidUrl() ? setValidationUrl(true) : setValidationUrl(false);

        if(title && url) {
            const username = localStorage.getItem('Username')
            const createPost = firebase.createPost(title, url, username);
            history.push('/');
        }

    }
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" 
                                onChange={(e) => setTitle(e.target.value)}
                                isInvalid={validationTitle}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid Title
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter Valid URL" 
                            onChange={(e) => setUrl(e.target.value)}
                            isInvalid={validationUrl}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid url
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <Button onClick={() => submit()}>Create Post</Button>
                </Col>
            </Row>
        </Container>
    );
}

const condition = authUser => !!authUser;

export default Authorization(condition)(CreateStory);