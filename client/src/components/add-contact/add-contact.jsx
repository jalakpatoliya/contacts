import React, { useContext, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core'
import axios from "axios";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { makeStyles } from '@material-ui/core/styles';

import { CurrentUserContext } from '../../contexts/current-user.context';
import { ContactListContext } from '../../contexts/contact-list.context';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const AddContact = ({ state, setState, open, setOpen }) => {
    const classes = useStyles();

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [contactList, setContactList] = useContext(ContactListContext);

    // const [open, setOpen] = React.useState(false);
    const [mobileNumber, setmobileNumber] = useState('');
    const [contactDetails, setContactDetails] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        notes: '',
    })
    const { firstName, lastName, middleName, email, notes } = contactDetails;

    const handleChange = event => {
        const { name, value } = event.target;

        setContactDetails({ ...contactDetails, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {


            const bodyParameters = { firstName, lastName, middleName, email, notes, mobileNumber }

            //add contact
            await axios.post(`http://localhost:5000/contact/create`,
                bodyParameters,
                {
                    headers: { Authorization: `Bearer ${currentUser.token}` },
                })

            //update contactList
            const { data: { data } } = await axios.get(`http://localhost:5000/contact/all`, {
                headers: { Authorization: `Bearer ${currentUser.token}` }
            })
            await setContactList(data)

            await setState({ ...state, data: [...data] })

            //clear form
            setContactDetails({
                firstName: '',
                lastName: '',
                middleName: '',
                email: '',
                notes: '',
            })
            setOpen(false)
        } catch (error) {
            alert(error.message)
        }
    }

    return (<React.Fragment>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Contact</DialogTitle>
            <DialogContent>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        autoFocus
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        id="firstName"
                        label="First Name"
                        type="text"
                        value={firstName}
                        variant="outlined"
                        required
                    />

                    <TextField
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        id="lastName"
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        required
                    />
                    <TextField
                        autoFocus
                        name="middleName"
                        value={middleName}
                        onChange={handleChange}
                        id="middleName"
                        label="Middle Name"
                        type="text"
                        variant="outlined"
                    />
                    <TextField
                        name="email"
                        value={email}
                        onChange={handleChange}
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                    />
                    <TextField
                        name="notes"
                        value={notes}
                        onChange={handleChange}
                        id="notes"
                        label="Notes"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <br />
                    <br />

                    <PhoneInput
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={phone => setmobileNumber(phone)}
                        country={'in'}
                        required
                    />
                </form>
            </DialogContent>
            <DialogActions>

                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog >
    </React.Fragment>)
}

export default AddContact;