import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import '../css/Upvote.css';

export default function Upvote(props) {
    const [liked, setLiked] = useState({Liked: false});
    const [posts, setPosts] = useState({Posts: []});
    const firebase = useContext(FirebaseContext);
    const getEmail = localStorage.getItem('Email');
    
    useEffect(() => {
        if(getEmail === null){
            
        }else{
            const getAllLikedPosts = firebase.getUserPostsLikes(getEmail);
            getAllLikedPosts.then(titles => {
                setPosts({Posts: titles});
                if(titles.includes(props.title)) {
                    setLiked({Liked: true})
                }
            })
        }
    }, [])

    const clicked = () => {
        if(getEmail === null){

        }else{
            if(liked.Liked) {
                setLiked({Liked: false});
                firebase.downvote(props.title, props.likes.Total, getEmail);
            } else {
                setLiked({Liked: true});
                firebase.upvote(props.title, props.likes.Total, getEmail);   
            }
        }
    }

    if(!liked.Liked) {
        return (
            <div className="liked-icon" onClick={() => clicked()}>
                <FontAwesomeIcon icon={faCaretUp} />
            </div>
        )
    } else {
        return (
            <div className="unliked-icon" onClick={() => clicked()}>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
        )
    }
}