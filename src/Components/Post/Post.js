import React from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar'
function Post({ imageURL, caption, username }) {
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
                <strong>{username} : </strong>
                {caption}
            </h4>
        </div>
    )
}

export default Post
