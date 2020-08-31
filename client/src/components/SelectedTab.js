import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import '../css/SymptomList.css';

export default function SelectedTab(props) {
    const name = props.name;
    const list = props.list;

    const handleClick = () => {
        const index = list.findIndex(value => value === name);
        console.log(index);
        list.splice(index, 1);
        props.deletion(list);
    }

    return (
        <div className="tab-div">
            <h3 className="tab-div-name">{name}</h3>  
            <div className="remove-tab-div" onClick={() => handleClick()}>
                <h2 className="remove-tab">X</h2> 
            </div>
        </div>
    )
}