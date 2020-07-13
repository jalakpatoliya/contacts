import React, { useContext } from 'react';
import axios from "axios";
import { CurrentUserContext } from '../../contexts/current-user.context';
import { ContactListContext } from '../../contexts/contact-list.context';


export const Contact = ({ firstName, _id }) => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [contactList, setContactList] = useContext(ContactListContext)

    const removeContact = async (e) => {
        //remove contact
        await axios.delete(`http://localhost:5000/contact/${_id}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` }
        })

        //update contactList
        const { data: { data } } = await axios.get(`http://localhost:5000/contact/all`, {
            headers: { Authorization: `Bearer ${currentUser.token}` }
        })
        setContactList(data)
    }


    return (
        <div>
            <h4>{firstName}</h4>
            <button onClick={removeContact}>delete</button>
        </div>
    )
}