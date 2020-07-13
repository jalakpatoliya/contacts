import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

import CreateContact from './CreateContact'
import { ContactList } from '../../components/contact-list/contact-listcomponent';

export function ContactPage() {


    const [open, setOpen] = React.useState(false);



    return (
        <div>

            <ContactList />

            <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
                Add New Contact
            </Button>

            <CreateContact open={open} setOpen={setOpen} />
        </div >
    );
}
