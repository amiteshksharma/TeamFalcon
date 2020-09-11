import React, { useState, useContext, useEffect } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FirebaseContext } from "./firebase";

function Profile(props) {
    const [author, setAuthor] = useState(props.location.state.Author)
    const [timestamp, setTimestamp] = useState({Timestamp: ''})
    const [karma, setKarma] = useState({Karma: 0});
    const [comments, setComments] = useState({Comments: 0});
    const [post, setPost] = useState({Post: []})
    const firebase = useContext(FirebaseContext);

    const convertToDate = (info) => {
        console.log(info)
        const toDate = new Date(0)
        toDate.setUTCSeconds(info[0].Timestamp.seconds);
        return toDate.toString()
    }    

    useEffect(() => {
        const getProfile = firebase.getProfile(author);
        getProfile.then(info => {
            console.log(info)
            setTimestamp({Timestamp: convertToDate(info)});
            const getTotalLikes = firebase.getUserPostsLikes(info[0].Email)
            getTotalLikes.then(likes => {
                setKarma({Karma: likes.length});
            })
        })

        const getCommentTotal = firebase.getUserComments(author);
        getCommentTotal.then(res => {
            setComments({Comments: res});
        })

        const getPostTotal = firebase.getUserPosts(author);
        getPostTotal.then(post => {
            setPost({Post: post.length});
        })
    }, []);

    const convertToKarma = () => {
        const likes = karma.Karma;
        const convert = likes * 2;

        const comment = comments.Comments;
        const convertComments = comment * 3

        const posts = post.Post;
        const convertPost = posts * 4;

        return convert + convertComments + convertPost;
    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 5, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Profile Page</Card.Title>
                            <Card.Text>
                                <strong>User:</strong> {author}
                                <br></br>
                                <br></br>
                                <strong>Account created on:</strong> {timestamp.Timestamp}
                                <br></br>
                                <br></br>
                                <strong>Total Posts Likes:</strong> {karma.Karma}
                                <br></br>
                                <br></br>
                                <strong>Karma:</strong> {convertToKarma(karma.Karma)}
                                <br></br>
                                <br></br>
                                <strong>Posts Created:</strong> {post.Post}
                                
                            </Card.Text>
                        </Card.Body>  
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;