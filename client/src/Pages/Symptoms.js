import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ButtonTab from '../components/ButtonTab';
import '../css/Symptoms.css';
import Breadcrumbs from './Breadcrumbs';
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

class Symptoms extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      MarkedSymptoms: []
    }

    this.updateMarkedSymptoms = this.updateMarkedSymptoms.bind(this);
  }

  componentDidMount() {
    // fetch('/symptoms')
    // .then(response => response.json())
    // .then(data => console.log(data))
  }

  updateMarkedSymptoms(value) {
    this.setState({MarkedSymptoms: value});
  }

  render() {
    return (
      <div className="symptoms-page">
        <Container fluid>
          <Row style={{marginTop: 'calc(5vh)'}}>
            <Col md={{ span: 7, offset: 3 }}><h2>Where on the body are you experiencing symptoms (if any)</h2></Col>
          </Row>
        </Container>

        <Container>
          <Row style={{marginTop: 'calc(12vh)'}}>
            <ButtonTab array={this.state.MarkedSymptoms} id={16} updateArray={this.updateMarkedSymptoms} type={"Abdomen"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={16} updateArray={this.updateMarkedSymptoms} type={"Pelvis"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={16} updateArray={this.updateMarkedSymptoms} type={"Buttocks"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={7} updateArray={this.updateMarkedSymptoms} type={"Arms"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={7} updateArray={this.updateMarkedSymptoms} type={"Shoulder"}/>
          </Row>

          <Row style={{marginTop: 'calc(10vh)'}}>
            <ButtonTab array={this.state.MarkedSymptoms} id={6} updateArray={this.updateMarkedSymptoms} type={"Head"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={6} updateArray={this.updateMarkedSymptoms} type={"Throat"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={6} updateArray={this.updateMarkedSymptoms} type={"Neck"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={10} updateArray={this.updateMarkedSymptoms} type={"Legs"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={17} updateArray={this.updateMarkedSymptoms} type={"Skin"}/>
          </Row>

          <Row style={{marginTop: 'calc(10vh)'}}>
            <ButtonTab array={this.state.MarkedSymptoms} id={15} updateArray={this.updateMarkedSymptoms} type={"Chest"} offset={2}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={15} updateArray={this.updateMarkedSymptoms} type={"Back"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={17} updateArray={this.updateMarkedSymptoms} type={"Joints"}/>
            <ButtonTab array={this.state.MarkedSymptoms} id={17} updateArray={this.updateMarkedSymptoms} type={"General"}/>
          </Row>

          <Row style={{marginTop: 'calc(17vh)'}}>
            <Col md={{ span: 3, offset: 5 }}>
              <Link to={ROUTES.SYMPTOMS}>
                <Button 
                      onClick={()=>{
                        const uniqueIds = Array.from(new Set(this.state.MarkedSymptoms));
                        console.log(uniqueIds);
                        localStorage.setItem('symptomIds', JSON.stringify(uniqueIds));
                      }}
                      variant="primary"
                      type="submit">Next: Select Symptoms</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

    )
  }
}
export default Symptoms