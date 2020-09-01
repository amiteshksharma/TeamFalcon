import React, { useState, useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import '../css/Symptoms.css';

export default function ButtonTab(props) {
    const [marked, isMarked] = useState({Marked: false});
    const arr = props.array;
    const nameArr = props.nameArray;
    const id = props.id;
    const name = props.type;

    useEffect(() => {
        if(nameArr.includes(name)) {
            isMarked({Marked: true});
        }
    }, [nameArr]);

    return (
        <Col md={{ span: 1, offset: props.offset ? props.offset : 1 }}>
            <Button onClick={() => {
                if(!marked.Marked) {
                    arr.push(id);
                    nameArr.push(name)
                    props.updateArray(arr, nameArr);
                    isMarked({Marked: true});
                } else {
                    const index = arr.findIndex(value => value === id);
                    arr.splice(index, 1);
                    const nameIndex = nameArr.findIndex(value => value === name)
                    nameArr.splice(nameIndex, 1);
                    props.updateArray(arr, nameArr);
                    isMarked({Marked: false});
                }
            }}
            style={{fontSize: 'calc(1.2vw)', width: 'calc(8.5vw)', backgroundColor: marked.Marked ? '#789E9E' : '#B7D8D6', 
            border: 'none', borderRadius: 'calc(1vw)', color: 'black'}}
            >{name}</Button>
        </Col>
    )
}