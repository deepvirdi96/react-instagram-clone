import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { storage, db } from '../../firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    function handleImageChange(event) {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    function handleImageUpload() {
        // Upload image on firebase storage
        const uploadImage = storage.ref(`images/${image.name}`).put(image);
        uploadImage.on(
            "state_changed",
            (snapshot) => {
                // Percentage for progress bar
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error Function 
                console.log(error.message);
            },
            () => {
                // On Complete Callback
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(imageURL => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption,
                            imageURL,
                            username
                        })
                    })
                setProgress(0);
                setCaption('');
                setImage(null);
            }
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progressbar" value={progress} max="100" min="0" />
            <input type="text" placeholder="Please add a caption..." onChange={e => (setCaption(e.target.value))} value={caption} />
            <input type="file" onChange={handleImageChange} />
            <Button onClick={handleImageUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload;