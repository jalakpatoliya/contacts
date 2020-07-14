import React, { createContext, useState } from 'react'

export const ContactListContext = createContext();

export const ContactListProvider = (props) => {
    const [contactList, setContactList] = useState([
        {
            creator: "5f0b3ac42cc1dd1f96756b6e",
            landlineNumber: "22976206",
            firstName: "jalak",
            lastName: "patoliya",
            middleName: "mukeshbhai",
            mobileNumber: "7405320323",
            notes: "this is a note",
            views: 4,
            __v: 0,
            _id: "5f0c8856e39c4d0ad9cc289f",
        },
        {
            creator: "5f0b3ac42cc1dd1f96756b6e",
            email: "jalak@gmail.com",
            firstName: "asdfasdfasdf",
            lastName: "asdfsadfsdf",
            middleName: "sadfasdf",
            mobileNumber: "917405320323",
            notes: "asdfdfsa",
            views: 4,
            __v: 0,
            _id: "5f0c8ad8e39c4d0ad9cc28a1",
        }
    ]);

    return (
        <ContactListContext.Provider value={[contactList, setContactList]}>
            {props.children}
        </ContactListContext.Provider>
    )
}