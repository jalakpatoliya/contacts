import React, { useState, useContext } from 'react';
import ContactList from '../../components/contact-list/contact-listcomponent';
import Header from '../header/header.comopnent';

export function ContactPage() {
    return (
        <div>
            <Header />
            <ContactList />
        </div >
    );
}
