import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import '../css/Symptoms.css';

class Symptoms extends React.Component {
  componentDidMount() {
    // fetch('/symptoms')
    // .then(response => response.json())
    // .then(data => console.log(data))
  }

  render() {
    return (
      <div className="symptoms-page">
        <Container fluid>
          <Row style={{marginTop: 'calc(5vh)'}}>
            <Col md={{ span: 7, offset: 4 }}><h2>Where are you experience symptoms (if any)</h2></Col>
          </Row>
        </Container>

        <Container>
          <Row style={{marginTop: 'calc(18vh)'}}>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
          </Row>
        </Container>

        <Container>
          <Row style={{marginTop: 'calc(10vh)'}}>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
            <Col md={{ span: 1, offset: 1 }}><Button>Hello</Button></Col>
          </Row>
        </Container>
      </div>

    )
  }
}
export default Symptoms