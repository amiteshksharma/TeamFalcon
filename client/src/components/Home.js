import React, { useContext } from 'react';
import { FirebaseContext } from "./firebase";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // let val = this.props.value.loadComments("Hello");
        // val.then(res => {
        //     console.log(res);
        //     res.forEach(response => {
        //         console.log(Object.values(response))
        //     })
        // })

        // let val = this.props.value.loadLikes("Post");
        // val.then(res => {
        //     console.log(res.Total);
        // })

        this.props.value.createPost("Title here", "Link here", "email@gmail.com");
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
    
    return <Home value={value}></Home>
}
