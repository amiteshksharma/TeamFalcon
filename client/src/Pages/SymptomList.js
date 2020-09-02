import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Container, Row, Col, Spinner, Button, ProgressBar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ROUTES } from "../routes";
import SelectedTab from '../components/SelectedTab';
import Navigation from './Navigation';
import LOGO from '../logo.png';
import '../css/SymptomList.css';
import '../App.css'

const animatedComponents = makeAnimated();

const NamesTab = localStorage.getItem('symptom-body');

class SymptomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            OptionsList: [],
            NamesList: NamesTab !== null && NamesTab !== undefined  && NamesTab !== 'undefined' ? JSON.parse(localStorage.getItem('symptom-body')) : [],
            SymptomsArray: [],
            Loading: true
        }

        this.removeName = this.removeName.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    removeName(list) {
        this.setState({NamesList: list}, () => {
            localStorage.setItem('symptom-body', JSON.stringify(this.state.NamesList));
        });
    }

    handleChange(e) {
        this.setState({SymptomsArray: e}, () => {
            localStorage.setItem('symptom-types', JSON.stringify(this.state.SymptomsArray));
        })
    }

    componentDidMount() {
        let symptomsArray = [];
        if(localStorage.getItem('symptom-types')) {
            symptomsArray = JSON.parse(localStorage.getItem('symptom-types'));
        } 

        fetch('/symptoms')
        .then(response => response.json())
        .then(data => {
            let arr = this.state.OptionsList;
            data.forEach(symptom => {
                let obj = {};
                obj.value = symptom.ID;
                obj.label = symptom.Name;
                arr.push(obj);      
            })
            this.setState({OptionsList: arr, Loading: false, SymptomsArray: symptomsArray}); 
        }).catch(error => {
            console.log(error) 
        })
    }

    render() {
        console.log(this.state.NamesList)
        return (
            <div>
                <Navigation logo={LOGO} />
                <Container fluid>
                    <Row style={{marginLeft: 'calc(8vw)', marginTop: 'calc(4vh)'}}>
                        <Col md={{ span: 4, offset: 4 }}><h2>What are the symptoms?</h2></Col>
                    </Row>
                </Container>

                <section className="body-section">
                    <div className="body-div">
                        {this.state.NamesList.map(name => {
                            return (
                                <SelectedTab name={name} list={this.state.NamesList} deletion={this.removeName} />
                            )
                        })}
                    </div>
                </section>

                <section className="select-section">
                    <div className="select-div-input">
                        {this.state.Loading ? 
                            <div className="spinner-div"><Spinner animation="border" variant="info" /></div>
                        : 
                            <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={this.state.OptionsList}
                            placeholder={"Select Symptoms..."}
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.SymptomsArray}
                        /> } 
                    </div>
                </section>

                <Container>
                    <Row style={{marginTop: 'calc(37vh)'}}>
                        <Col md={{ span: 3, offset: 5 }}>
                        <Link to={ROUTES.PRELIMINARYDIAGNOSIS}>
                            <Button 
                                variant="primary"
                                type="submit"
                                style={{backgroundColor: '#FE817B', border: 'none', borderRadius: 'calc(1vw)', 
                                paddingRight: 'calc(1.5vw)', paddingLeft: 'calc(1.5vw)'}}
                                disabled={this.state.isDisabled}>Next: Get Diagnosis</Button>
                        </Link>
                        </Col>
                    </Row>
                </Container>

                <div className="progress-bar-div">
                    <div className="progress-bar-div-center">
                        <ProgressBar now={49} label={"49%"} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SymptomList;