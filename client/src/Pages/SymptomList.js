import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Container, Row, Col } from "react-bootstrap";
import SelectedTab from '../components/SelectedTab';
import '../css/SymptomList.css';

const animatedComponents = makeAnimated();

class SymptomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            OptionsList: [],
            NamesList: []
        }

        this.removeName = this.removeName.bind(this);
    }

    removeName(list) {
        this.setState({NamesList: list}, () => {
            localStorage.setItem('symptom-body', JSON.stringify(this.state.NamesList));
        });
    }

    componentDidMount() {
        let getNames = localStorage.getItem('symptom-body');
        getNames = JSON.parse(getNames);
        this.setState({NamesList: getNames}); 

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
            this.setState({OptionsList: arr, NamesList: getNames}); 
        }).catch(error => {
            console.log(error) 
        })
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row style={{marginLeft: 'calc(8vw)'}}>
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
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={this.state.OptionsList}
                            placeholder={"Select Symptoms..."}
                        />  
                    </div>
                </section>
            </div>
        )
    }
}

export default SymptomList;