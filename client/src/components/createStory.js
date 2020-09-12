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
    const [unique, setUnique] = useState(false);
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const isValidUrl = () => {
        let isTrue = true;
        if(!url.includes(".com")) isTrue = false;
        if(!url.includes("http://")) isTrue = false;
        if(!url.includes("https://")) isTrue = false;
        return isTrue;
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
            createPost.then(title => {
                if(!title) {
                    setUnique(true)
                    setValidationTitle(true)
                    return;
                } else {
                    history.push('/');
                }
            })
        }
    }

    console.log(unique);
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" 
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    setUnique(false)
                                    setValidationTitle(false)
                                }}
                                isInvalid={validationTitle}
                            />
                            {!unique && <Form.Control.Feedback type="invalid">
                                Please enter a valid Title
                            </Form.Control.Feedback>}

                            {unique && <Form.Control.Feedback type="invalid">
                                This title is already taken. Please enter a new one!
                            </Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter Valid URL" 
                            onChange={(e) => {
                                setUrl(e.target.value)
                                setValidationUrl(false)
                            }}
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