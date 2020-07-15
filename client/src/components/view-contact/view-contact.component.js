import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ContactListContext } from '../../contexts/contact-list.context';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { EditContact } from '../edit-contact/edit-contact.component';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export function ViewContact({ setState, state, contactData, setContactData, open, setOpen }) {
    const { firstName, lastName, middleName, email, mobileNumber, notes } = contactData;
    const classes = useStyles();

    const [openEditContact, setOpenEditContact] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        setOpenEditContact(true)
        setOpen(false)
    }

    useEffect(() => {
        const fetchData = () => {
        };
        fetchData()
    });

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Contact Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="First Name"
                                defaultValue={firstName}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Last Name"
                                defaultValue={lastName}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Middle Name"
                                defaultValue={middleName}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Mobile Number"
                                defaultValue={mobileNumber}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Email"
                                defaultValue={email}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Notes"
                                defaultValue={notes}
                                variant="outlined"
                            />
                        </form>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEdit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>

            <EditContact setState={setState} state={state} contactData={contactData} setContactData={setContactData} open={openEditContact} setOpen={setOpenEditContact} />

        </div>
    );
}
