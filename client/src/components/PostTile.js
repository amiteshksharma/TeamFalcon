import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/PostTile.css';
import Upvote from './Upvote';

export default function PostTile(props) {
    const history = useHistory();
    const [likes, setLikes] = useState({Likes: {Total: 0}});
    const [commentTotal, setCommentTotal] = useState({Comments: 0});


    console.log(likes.Likes.Total);
    useEffect(() => {
        const getLikes = props.firebase.loadLikes(props.title);
        getLikes.then(count => {
            console.log(count)
            if(count.length !== 0) {
                console.log('here')
                console.log(count[0])
                setLikes({Likes: count[0]});
            }
        })

        const getNumComments = props.firebase.getTotalComments(props.title);
        getNumComments.then(num => {
            setCommentTotal({Comments: num});
        })

    }, [])

    const onClick = () => {
        history.push({
            pathname: `/comment/${props.title}`,
            state: {
                Title: props.title,
                Likes: likes.Likes,
                Author: props.author,
                Link: props.link
            }
         })
    }

    const profile = () => {
        history.push({
            pathname: `/profile/${props.author}`,
            state: {
                Author: props.author
            }
        })
    }

    return (
        <div className="total-tile-layout">
            <p className="order-number">{props.number}.</p>
            <Upvote title={props.title} likes={likes.Likes} />
            <div className="tile-layout">
                <div className="post-information">
                    <a href={props.link}>{props.title}</a>
                </div>
                
                <div className="post-bottom-information">
                    <p>{likes.Likes.Total} points by 
                        <span className="profile-redirect" 
                            onClick={() => profile()}>{" " + props.author}
                        </span>     
                    </p>
                    <span style={{marginRight: 'calc(0.2vw)', marginLeft: 'calc(0.2vw)'}} >|</span>
                    <p>{commentTotal.Comments} Comments</p>
                    <span style={{marginRight: 'calc(0.2vw)', marginLeft: 'calc(0.2vw)'}} >|</span>
                    <p onClick={() => onClick()} className="comment-link">Comment</p>
                </div>
            </div>
        </div>
    )
}