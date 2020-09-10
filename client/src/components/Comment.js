import React, { useContext } from 'react';
import { FirebaseContext } from "./firebase";
import '../css/Comment.css';
import { Row, Container, Col, Form, Button } from 'react-bootstrap';

class Comment extends React.Component {

    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            Author: props.prop.location.state.Author,
            Likes: props.prop.location.state.Likes,
            Title: props.prop.location.state.Title,
            CommentTotal: 0,
            Comments: [],
            Text: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const getNumComments = this.props.firebase.getTotalComments(this.state.Title);
        getNumComments.then(num => {
            this.setState({CommentTotal: num});
        })  
        
        const loadComments = this.props.firebase.loadComments(this.state.Title);
        loadComments.then(comments => {
            const result = Object.keys(comments).map((key) => [key, comments[key]]);
            this.setState({Comments: result})
        })   
    }

    handleClick() {
        const text = this.state.Text;
        const username = localStorage.getItem('Username');
        const addComment = this.props.firebase.commentPost(this.state.Title, text, username);
        this.setState({Text: ''});

        this.componentDidMount();
    }

    render() {
        return (
            <div className="comment-layout">
                <div className="comment-background">
                    <Container fluid>
                        <Row>
                            <Col md={{ span: 4, offset: 1 }}>
                                <div className="post-description">
                                    <p className="post-title">{this.state.Title}</p>
                                    <p className="post-info">{this.state.Likes} points by {this.state.Author} | {this.state.CommentTotal} comments </p>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 5, offset: 1 }}>
                                <Form.Group controlId="exampleForm.ControlTextarea1" 
                                    onChange={(e) => this.setState({Text: e.target.value})}
                                    value={this.state.Text}>
                                    <Form.Control as="textarea" rows="4" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 5, offset: 1 }}>
                                <Button onClick={() => this.handleClick()}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                    <div className="comment-div">
                        <div className="comment-container">
                            {this.state.Comments.map(comment => {
                                if(comment[1] === null) {
                                    return;
                                }
                                return (
                                    <div>
                                        <h5>{comment[0]}</h5>
                                        <p className="comment-p">{comment[1]} </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default function CommentFunction(props) {
    const value = useContext(FirebaseContext);
    
    return <Comment firebase={value} prop={props}></Comment>
}
