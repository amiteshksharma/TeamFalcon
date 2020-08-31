import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import '../css/Symptoms.css';

export default function ButtonTab(props) {
    const [marked, isMarked] = useState({Marked: false});
    const arr = props.array;
    const id = props.id;
    const name = props.type;

    return (
        <Col md={{ span: 1, offset: props.offset ? props.offset : 1 }}>
            <Button onClick={() => {
                if(!marked.Marked) {
                    arr.push(id);
                    props.updateArray(arr);
                    isMarked({Marked: true});
                } else {
                    const index = arr.findIndex(value => value === id);
                    arr.splice(index, 1);
                    props.updateArray(arr);
                    isMarked({Marked: false});
                }
            }}
            style={{fontSize: 'calc(1.2vw)', width: 'calc(8.5vw)', backgroundColor: marked.Marked ? 'rgb(168, 90, 50)' : null}}
            >{name}</Button>
        </Col>
    )
}