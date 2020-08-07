import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post/Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './Components/ImageUpload/ImageUpload';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const App = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user Logged in
                setUser(authUser);
            } else {
                setUser(null);
            }
        })
        return () => {
            unsubscribe();
        }
    }, [username, email]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, [])

    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));
        setOpen(false);
    }
    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
        setOpenSignIn(false);
    }

    return (
        <div className="app">
            {
                user?.displayName ? (
                    <ImageUpload username={user.displayName} />
                ) : (
                    <h3>Please Login...</h3>
                )
            }
            {/* Modal for SIGN UP button */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <div className="app__headerImage">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram Logo" className="app__headerImage" />
                            </div>
                        </center>
                        <Input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>

            {/* Modal for SIGN IN button */}
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <div className="app__headerImage">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram Logo" className="app__headerImage" />
                            </div>
                        </center>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signIn}>Sign In</Button>
                    </form>
                </div>
            </Modal>

            <div className="app__header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram Logo" className="app__headerImage" />
            </div>
            {user ? (
                <Button onClick={() => (auth.signOut())}>Logout</Button>
            ) : (
                    <div className="app__loginContainer">
                        <Button onClick={() => (setOpen(true))}>Sign Up</Button>
                        <Button onClick={() => (setOpenSignIn(true))}>Sign In</Button>
                    </div>
                )}
            {
                posts.map(({ id, post }) => {
                    return (<Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL} />);
                })
            }
        </div>
    );
}

export default App;
