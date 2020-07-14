import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

import AddContact from '../../components/add-contact/add-contact'
import { ContactList } from '../../components/contact-list/contact-listcomponent';

export function ContactPage() {
    return (
        <div>

            <ContactList />

            <AddContact />
        </div >
    );
}
