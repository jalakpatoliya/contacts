import React, { useContext } from 'react';
import { ContactListContext } from '../../contexts/contact-list.context';
import { Contact } from '../contact/contact.component';

export const ContactList = () => {
    const [contactList, setContactList] = useContext(ContactListContext)

    return (
        <div>
            {
                contactList.map((props) =>
                    <Contact key={props._id} {...props} />
                )
            }
        </div>
    )
}

