import axios from "axios";
import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

import { ContactListContext } from '../../contexts/contact-list.context';
import { CurrentUserContext } from "../../contexts/current-user.context";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export function EditContact({ state, setState, contactData, setContactData, open, setOpen }) {
    const classes = useStyles();

    const { _id, firstName, lastName, middleName, mobileNumber, email, notes } = contactData;

    const [contactList, setContactList] = useContext(ContactListContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({ ...contactData, [name]: value });
    }

    const handleSubmit = async () => {
        try {

            //update contact
            const bodyParameters = { ...contactData }
            const { data: { data } } = await axios.put(`api/contact/${_id}`,
                bodyParameters,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`
                    },
                })

            //update contactList    
            const newContactList = contactList.filter(contact => contact._id !== _id)
            await setContactList([...newContactList, { ...data }])

            await setState({ ...state, data: [...newContactList, { ...data }] })
            handleClose();
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancel = async () => {
        //remove changes
        // setContactData({ ...contactData })

        handleClose()
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Contact Details</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="outlined-disabled"
                            name="firstName"
                            label="First Name"
                            value={firstName}
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-disabled"
                            name="lastName"
                            label="Last Name"
                            value={lastName}
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-disabled"
                            name="middleName"
                            label="Middle Name"
                            value={middleName}
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-disabled"
                            name="email"
                            label="Email"
                            value={email}
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-disabled"
                            name="notes"
                            label="Notes"
                            value={notes}
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <PhoneInput
                            name="mobileNumber"
                            value={mobileNumber}
                            onChange={handleChange}
                            // country={'in'}
                            required
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
