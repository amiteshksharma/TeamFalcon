import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/PostTile.css';

export default function PostTile(props) {
    const history = useHistory();
    const [likes, setLikes] = useState({Likes: 0});

    useEffect(() => {
        const getLikes = props.firebase.loadLikes(props.title);
        getLikes.then(count => {
            setLikes({Likes: count.Total});
        })

    }, [])

    const onClick = () => {
        history.push({
            pathname: `/comment/${props.title}`,
            state: {
                Title: props.title,
                Likes: likes.Likes,
                Author: props.author
            }
         })
    }

    return (
        <div className="total-tile-layout">
            <p className="order-number">{props.number}.</p>
            <div className="tile-layout">
                <div className="post-information">
                    <a href={props.link}>{props.title}</a>
                </div>
                
                <div className="post-bottom-information">
                    <p>{likes.Likes} points by {props.author} </p>
                    <span style={{marginRight: 'calc(0.2vw)', marginLeft: 'calc(0.2vw)'}} >|</span>
                    <p onClick={() => onClick()}className="comment-link">Comment here</p>
                </div>
            </div>
        </div>
    )
}