import React, { useContext } from 'react';
import { FirebaseContext } from "./firebase";
import '../css/Comment.css';
import { Row, Container, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Authorization } from './session';
import Upvote from './Upvote';
import EditComment from './EditComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from "../routes";

let titlePost = '';

class Comment extends React.Component {

    constructor(props) {
        super(props);

        console.log(props.prop.location.state)

        this.state = {
            Author: props.prop.location.state.Author,
            Likes: props.prop.location.state.Likes,
            Title: props.prop.location.state.Title,
            Link: props.prop.location.state.Link,
            CommentTotal: 0,
            Comments: [],
            Text: '',
            NewTitle: '',
            ShowTextbox: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.remove = this.remove.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.tooltipDelete = this.tooltipDelete.bind(this);
        this.tooltipEdit = this.tooltipEdit.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        titlePost = this.state.Title;
        const getNumComments = this.props.firebase.getTotalComments(this.state.Title);
        getNumComments.then(num => {
            this.setState({CommentTotal: num});
        })  
        
        const loadComments = this.props.firebase.loadComments(this.state.Title);
        loadComments.then(comments => {
            console.log(comments)
            this.setState({Comments: comments})
        })   
    }

    handleClick() {
        const text = this.state.Text;
        const username = localStorage.getItem('Username');
        const addComment = this.props.firebase.commentPost(this.state.Title, text, username);
        this.setState({Text: ''});

        this.componentDidMount();
    }

    remove(comment, name) {
        const removeComment = this.props.firebase.deleteComment(comment, name);
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    editTitle() {
        if(this.state.ShowTextbox) {
            if(this.state.NewTitle === '') return;
            console.log('here');
            const updateTitle = this.props.firebase.updatePost(this.state.Title, this.state.NewTitle, this.state.Link, this.state.Author);
            updateTitle.then(data => {
                console.log(data);
                this.setState({
                    Author: data.Username,
                    Likes: data.Total,
                    Title: data.Title,
                    Link: data.Link
                })
            })
            this.setState({ShowTextbox: false, NewTitle: ''});
        } else {
            this.setState({ShowTextbox: true});
        }
    }

    deletePost() {
        this.props.firebase.removePost(this.state.Title);
        console.log(this.props)
        this.props.prop.history.push("/")
    }

    tooltipDelete(tag) {
        return (
            <Tooltip>
                Delete {tag}
            </Tooltip>
        )
    }

    tooltipEdit(tag) {
        return (
            <Tooltip>
                Edit {tag}
            </Tooltip>
        )
    }

    redirect() {
        this.props.prop.history.push({
            pathname: `/profile/${this.state.Author}`,
            state: {
                Author: this.state.Author
            }
        })
    }

    render() {
        return (
            <div className="comment-layout">
                <div className="comment-background">
                    <Container fluid>
                        <Row>
                            <Col md={{ span: 4, offset: 1 }}>
                                <div className="post-description">
                                    <div className="post-header-text">
                                        <p className="post-title"><strong><a href={this.state.Link}>{this.state.Title}</a></strong></p>
                                        {localStorage.getItem('Username') == this.state.Author ? 
                                        <OverlayTrigger placement="right" overlay={this.tooltipEdit("Title")} delay={{ show: 200, hide: 200}}>
                                            <div className="edit-title" onClick={() => this.editTitle()}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </div>
                                        </OverlayTrigger> : null}
                                    </div>

                                    {localStorage.getItem('Username') == this.state.Author ? 
                                        <OverlayTrigger placement="right" overlay={this.tooltipDelete("Post")} delay={{ show: 200, hide: 200}}>
                                            <div className="delete-post" onClick={() => this.deletePost()}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </div>
                                        </OverlayTrigger> : null}

                                    <p className="post-info"><Upvote title={this.state.Title} likes={this.state.Likes} />
                                    {" "}{this.state.Likes.Total} points by 
                                        <div onClick={() => this.redirect()} className="author-link">
                                            {this.state.Author}
                                        </div> | {this.state.CommentTotal} comments </p>
                                </div>
                                {this.state.ShowTextbox ? 
                                    <Row>
                                        <Col md={{ span: 5, offset: 0 }}>
                                            <Form.Group controlId="exampleForm.ControlTextarea1" >
                                                <Form.Control  
                                                    type="text"
                                                    onChange={(e) => this.setState({NewTitle: e.target.value})}
                                                    value={this.state.NewTitle}
                                                    placeholder="Enter new title here..."
                                                    />
                                            </Form.Group>
                                        </Col>
                                    </Row> : null }
                            </Col>
                        </Row>

                        {localStorage.getItem('Username') ? 
                        <div>
                            <Row>
                                <Col md={{ span: 5, offset: 1 }}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                                        <Form.Control as="textarea" rows="4" 
                                            type="text"
                                            onChange={(e) => this.setState({Text: e.target.value})}
                                            value={this.state.Text}
                                            placeholder="Enter comment here..."
                                            />
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
                        </div>: null}

                    </Container>

                    <div className="comment-div">
                        <div className="comment-container">
                            {this.state.Comments.map(comment => {
                                if(comment === null) return;
                                return (
                                    <div className="comment-node" key={comment.Comment}>
                                        <h5>{comment.Name}</h5>
                                        <EditComment comment={comment} />
                                        {localStorage.getItem('Username') === comment.Name ? 
                                        <OverlayTrigger placement="right" overlay={this.tooltipDelete("Comment")} delay={{ show: 200, hide: 200}}>
                                            <div className="comment-delete" 
                                                onClick={() => this.remove(comment.Comment, comment.Name)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </div>
                                        </OverlayTrigger> : null}
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

function CommentFunction(props) {
    const value = useContext(FirebaseContext);
    
    return <Comment firebase={value} prop={props}></Comment>
}

export default CommentFunction;