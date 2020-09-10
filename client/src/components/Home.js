import React, { useContext } from 'react';
import { FirebaseContext } from "./firebase";
import PostTile from './PostTile';
import '../css/Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Posts: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            const getPosts = this.props.firebase.loadPosts();
            getPosts.then(posts => {
            this.setState({Posts: posts});
        }) 
        }, 1000)
    }

    render() {
        return (
            <div className="post-layout">
                <div className="post-container">
                    {this.state.Posts.map((post, index) => {
                        console.log(post);
                        return (
                            <PostTile title={post.Title} author={post.Username} link={post.Link} firebase={this.props.firebase} number={index+1}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default function HomeFunction(props) {
    const value = useContext(FirebaseContext);
    
    return <Home firebase={value} props={props}></Home>
}
