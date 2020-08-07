import React, { useState } from 'react';
import { Button } from '@material-ui/core';


function ImageUpload() {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    
    function handleImageChange(event) {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    
    function handleImageUpload() {
    
    }
    
    return (
        <div>
            <input type="text" placeholder="Please add a caption..." onChange={e => (setCaption(e.target.value))} value={caption} />
            <input type="file" onChange={handleImageChange} />
            <Button onClick={handleImageUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload;