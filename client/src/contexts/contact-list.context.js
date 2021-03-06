import React, { createContext, useState } from 'react'

export const ContactListContext = createContext();

export const ContactListProvider = (props) => {
    const [contactList, setContactList] = useState([]);

    return (
        <ContactListContext.Provider value={[contactList, setContactList]}>
            {props.children}
        </ContactListContext.Provider>
    )
}