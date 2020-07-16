import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { CurrentUserContext } from '../../contexts/current-user.context';
import { ContactListContext } from "../../contexts/contact-list.context";
import { withRouter } from 'react-router'
import Header from "../../pages/header/header.comopnent";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const SignUp = ({ history }) => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [contactList, setContactList] = useContext(ContactListContext)
    const [email, setName] = useState('')
    const [password, setPassword] = useState('')

    const updateEmail = (e) => {
        setName(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //signUp
            await axios.post(`api/signup`, { email, password })

            alert('SignUp successfull, pls login')

            //moving to login page
            history.push('/login')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <Header />
            <Grid
                container
                spacing={10}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Paper elevation={3} style={{
                    width: 250,
                    padding: 20
                }}>
                    <br />
                    <br />
                    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <TextField type='email' onChange={updateEmail} value={email} id="outlined-basic" placeholder='email' variant="outlined" />
                        <br />
                        <TextField type="password" onChange={updatePassword} value={password} id="outlined-basic" placeholder='password' variant="outlined" />
                        <Button size='large' type='submit' variant="contained" style={{ color: 'white', backgroundColor: '#469ac6', padding: '15px 95px' }} disableElevation>SignUp</Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}


export default withRouter(SignUp);