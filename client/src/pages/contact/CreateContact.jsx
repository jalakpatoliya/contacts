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

import { CurrentUserContext } from '../../contexts/current-user.context';

import { ContactListContext } from '../../contexts/contact-list.context';

const CreateContact = (props) => {

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [contactList, setContactList] = useContext(ContactListContext);

    const [mobileNumber, setmobileNumber] = useState('917405320323');
    const [contactDetails, setContactDetails] = useState({
        firstName: 'asdfasdfasdf',
        lastName: 'asdfsadfsdf',
        middleName: 'sadfasdf',
        email: 'jalak@gmail.com',
        notes: 'asdfdfsa',
    })
    const { firstName, lastName, middleName, email, notes } = contactDetails;


    const handleChange = event => {
        const { name, value } = event.target;

        setContactDetails({ ...contactDetails, [name]: value });
    };





    const handleSubmit = async event => {
        event.preventDefault();

        const bodyParameters = { firstName, lastName, middleName, email, notes, mobileNumber }
        console.log(currentUser);

        //add contact
        await axios.post(`http://localhost:5000/contact/create`,
            bodyParameters,
            {
                // headers: { Authorization: `Bearer ${currentUser.token}` },
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmMGIzYWM0MmNjMWRkMWY5Njc1NmI2ZSIsImVtYWlsIjoiamFsYWtAZ21haWwuY29tIn0sImlhdCI6MTU5NDY1MDI0OX0.XX34eLi0Wk3gzdNJxoEPi4esui5tBz81oIjoxcGlu24`
                },
            })

        //update contactList
        const { data: { data } } = await axios.get(`http://localhost:5000/contact/all`, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmMGIzYWM0MmNjMWRkMWY5Njc1NmI2ZSIsImVtYWlsIjoiamFsYWtAZ21haWwuY29tIn0sImlhdCI6MTU5NDY1MDI0OX0.XX34eLi0Wk3gzdNJxoEPi4esui5tBz81oIjoxcGlu24` }
        })
        setContactList(data)

        //clear form
        props.setOpen(false)
    }

    return (<React.Fragment>
        <Dialog open={props.open} onClose={() => props.setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Contact</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    value={firstName}
                    required
                />

                <TextField
                    autoFocus
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    required
                />
                <TextField
                    autoFocus
                    name="middleName"
                    value={middleName}
                    onChange={handleChange}
                    margin="dense"
                    id="middleName"
                    label="Middle Name"
                    type="text"
                />
                <TextField
                    autoFocus
                    name="email"
                    value={email}
                    onChange={handleChange}
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
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
            </DialogContent>
            <DialogActions>

                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog >
    </React.Fragment>)
}

export default CreateContact;