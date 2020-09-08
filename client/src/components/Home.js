import React, { useContext } from 'react';
import { FirebaseContext } from "./firbase";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello Wrodl!</h1>
            </div>
        )
    }
}

export default function HomeFunction() {
    const value = useContext(FirebaseContext);
    value.createPost("Time", "Hello", "spain@gmail.com")
    
    return <Home></Home>
}