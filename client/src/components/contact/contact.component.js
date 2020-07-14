import React, { useState, useContext } from 'react';
import axios from "axios";
import { CurrentUserContext } from '../../contexts/current-user.context';
import { ContactListContext } from '../../contexts/contact-list.context';
import { ViewContact } from "../view-contact/view-contact.component";

export const Contact = ({ contactData }) => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [contactList, setContactList] = useContext(ContactListContext)

    const [openViewContact, setOpenViewContact] = useState(false)
    const [openDeleteContact, setOpenDeleteContact] = useState(false)

    const removeContact = async (e) => {
        //remove contact
        await axios.delete(`http://localhost:5000/contact/${contactData._id}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` }
        })

        //update contactList
        const { data: { data } } = await axios.get(`http://localhost:5000/contact/all`, {
            headers: { Authorization: `Bearer ${currentUser.token}` }
        })
        setContactList(data)
    }

    const toggleOpen = (state, setState) => {
        setState(!state)
    }

    return (
        <div>
            <h4 onClick={() => toggleOpen(openViewContact, setOpenViewContact)} >{contactData.firstName}</h4>

            <button onClick={removeContact}>delete</button>
            {openViewContact}
            <ViewContact contactData={contactData} open={openViewContact} setOpen={setOpenViewContact} />
        </div>
    )
}