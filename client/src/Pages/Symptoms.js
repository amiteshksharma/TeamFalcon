import React from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import ButtonTab from '../components/ButtonTab';
import SelectedTab from '../components/SelectedTab';
import '../css/Symptoms.css';
import '../App.css';
import Navigation from './Navigation';
import LOGO from '../logo.png';
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

class Symptoms extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      MarkedSymptoms: [],
      NameSymptoms: localStorage.getItem('symptom-body') !== null && localStorage.getItem('symptom-body') !== undefined ? JSON.parse(localStorage.getItem('symptom-body')) : [],
      isDisabled: localStorage.getItem('symptom-body') !== null && localStorage.getItem('symptom-body') !== undefined ? false : true,
    }

    this.updateMarkedSymptoms = this.updateMarkedSymptoms.bind(this);
    this.removeName = this.removeName.bind(this);
  }

  updateMarkedSymptoms(value, name) {
    if(name.length === 0) {
      this.setState({isDisabled: true});
    } else {
      this.setState({isDisabled: false});
    }
    this.setState({MarkedSymptoms: value, NameSymptoms: name}, () => {
      const uniqueIds = Array.from(new Set(this.state.MarkedSymptoms));
      localStorage.setItem('symptomIds', JSON.stringify(uniqueIds));
      localStorage.setItem('symptom-body', JSON.stringify(this.state.NameSymptoms))
    });
  }

  removeName(list) {
    this.setState({NameSymptoms: list}, () => {
        localStorage.setItem('symptom-body', JSON.stringify(this.state.NameSymptoms));
        window.location.reload();
    });
  }

  render() {
    console.log(this.state.NameSymptoms)
    return (
      <div className="symptoms-page">
        <Navigation logo={LOGO} />
        <Container fluid>
          <Row style={{marginTop: 'calc(5vh)'}}>
            <Col md={{ span: 7, offset: 3 }}><h2 className="symptoms-page-h2">Where on the body are you experiencing symptoms (if any)</h2></Col>
          </Row>
        </Container>

        <section className="selected-section">
          <div className="select-div">
              {this.state.NameSymptoms.map(name => {
                  return (
                      <SelectedTab key={name} name={name} list={this.state.NameSymptoms} deletion={this.removeName} />
                  )
              })}
          </div>
          </section>

        <Container>
          <Row style={{marginTop: 'calc(8vh)'}}>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={16} updateArray={this.updateMarkedSymptoms} type={"Abdomen"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={16} updateArray={this.updateMarkedSymptoms} type={"Pelvis"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms }id={16} updateArray={this.updateMarkedSymptoms} type={"Buttocks"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={7} updateArray={this.updateMarkedSymptoms} type={"Arms"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={7} updateArray={this.updateMarkedSymptoms} type={"Shoulder"}/>
          </Row>

          <Row style={{marginTop: 'calc(8vh)'}}>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={6} updateArray={this.updateMarkedSymptoms} type={"Head"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={6} updateArray={this.updateMarkedSymptoms} type={"Throat"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={6} updateArray={this.updateMarkedSymptoms} type={"Neck"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={10} updateArray={this.updateMarkedSymptoms} type={"Legs"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={17} updateArray={this.updateMarkedSymptoms} type={"Skin"}/>
          </Row>

          <Row style={{marginTop: 'calc(8vh)'}}>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={15} updateArray={this.updateMarkedSymptoms} type={"Chest"} offset={2}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={15} updateArray={this.updateMarkedSymptoms} type={"Back"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={17} updateArray={this.updateMarkedSymptoms} type={"Joints"}/>
            <ButtonTab array={this.state.MarkedSymptoms} nameArray={this.state.NameSymptoms} id={17} updateArray={this.updateMarkedSymptoms} type={"General"}/>
          </Row>

          <Row style={{marginTop: 'calc(12vh)'}}>
            <Col md={{ span: 3, offset: 5 }}>
              <Link to={ROUTES.SYMPTOM_LIST}>
                <Button 
                      onClick={()=>{
                        const uniqueIds = Array.from(new Set(this.state.MarkedSymptoms));
                        localStorage.setItem('symptomIds', JSON.stringify(uniqueIds));
                        localStorage.setItem('symptom-body', JSON.stringify(this.state.NameSymptoms))
                      }}
                      style={{backgroundColor: '#FE817B', border: 'none', borderRadius: 'calc(1vw)', 
                      paddingRight: 'calc(1.5vw)', paddingLeft: 'calc(1.5vw)'}}
                      variant="primary"
                      type="submit"
                      disabled={this.state.isDisabled}>Next: Select Symptoms</Button>
              </Link>
            </Col>
          </Row>
        </Container>

        <div className="progress-bar-div">
          <div className="progress-bar-div-center">
            <ProgressBar now={33} label={"33%"} />
          </div>
        </div>
      </div>

    )
  }
}
export default Symptoms