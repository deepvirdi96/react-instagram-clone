import React, { useState, useEffect } from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar'
import { db } from '../../firebase';
import firebase from 'firebase';

function Post({ postId, user, imageURL, caption, username }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const onCommentHandler = (e) => {
        e.preventDefault();
        if (user?.displayName) {
            db.collection("posts").doc(postId).collection('comments').add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        } else {
            alert('Please sign in');
        }
        setComment('');
    }

    useEffect(() => {
        // If a post exists load all the comments related to that post
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username.toUpperCase()}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            <img src={imageURL} alt="" className="post__image" />
            <h4 className="post__text">
                <strong>{username}  </strong>
                {caption}
            </h4>
            <div className="post__comments">
                {
                    comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }
            </div>
            {
                user && (
                    <form className="post__commentBox">
                        <input
                            className="post__commentInput"
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button onClick={onCommentHandler} className="post__button">
                            Post
                        </button>
                    </form>
                )
            }

        </div>
    )
}

export default Post
