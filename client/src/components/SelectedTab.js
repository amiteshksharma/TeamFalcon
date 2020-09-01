import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import '../css/SymptomList.css';

export default function SelectedTab(props) {
    const name = props.name;
    const list = props.list;

    const handleClick = () => {
        if(props.deletion) {
            console.log('here')
            const index = list.findIndex(value => value === name);
            console.log(index);
            list.splice(index, 1);
            props.deletion(list);
        } else {
            const array = list.filter(element => element.label !== name);
            props.deletionObj(array);
        }
    }

    return (
        <div className="tab-div" style={{paddingRight: props.isDiagnosis ? 'calc(1.5vw)' : null}}>
            <h3 className="tab-div-name" >{name}</h3>  
            {props.isDiagnosis ? null : 
            <div className="remove-tab-div" onClick={() => handleClick()}>
                <h2 className="remove-tab">X</h2> 
            </div>}
        </div>
    )
}