import React, { useState, useContext } from 'react';
import { FirebaseContext } from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../css/Comment.css';

export default function EditComment(props) {
    const firebase = useContext(FirebaseContext);
    const [newComment, setNewComment] = useState({Comment: ''});
    const [show, setShow] = useState(true);
    let comment = props.comment

    const tooltip = () => {
        return (
            <Tooltip>
                Edit comment
            </Tooltip>
        )
    }

    const editComment = () => {
        if(show) {
            setShow(!show);
        } else {
            const updateComment = firebase.updateComment(comment.Comment, newComment.Comment);
            setTimeout(() => {
                setShow(!show);
                window.location.reload()
            }, 1000);
        }
    }

    
    if(show) {
        return (
            <div>
                <p className="comment-p">{comment.Comment}</p>
                {localStorage.getItem('Username') === comment.Name ? 
                <OverlayTrigger placement="right" overlay={tooltip()} delay={{ show: 200, hide: 200}}>
                    <div className="comment-edit" 
                        onClick={(e) => editComment()}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </div>
                </OverlayTrigger> : null}
            </div>
        )
    } else {
        return (
            <div>
                <Form>
                    <Form.Control defaultValue={comment.Comment} onChange={(e) => setNewComment({Comment: e.target.value})}></Form.Control>
                </Form>
                {localStorage.getItem('Username') === comment.Name ? 
                    <OverlayTrigger placement="right" overlay={tooltip()} delay={{ show: 200, hide: 200}}>
                        <div className="comment-edit" 
                            onClick={(e) => editComment()}>
                            <FontAwesomeIcon icon={faEdit}/>
                        </div>
                    </OverlayTrigger> : null}
            </div>
        )
    }
}