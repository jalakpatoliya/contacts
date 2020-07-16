import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/current-user.context';
import axios from "axios";
import { ContactListContext } from '../../contexts/contact-list.context';
import Header from '../header/header.comopnent';

const HomePage = ({ history }) => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [contactList, setContactList] = useContext(ContactListContext)

    useEffect(() => {
        // if user exist in local storage retrieve it
        const getUserFromLocalStorage = async () => {
            let user = localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);

                //set current user in context
                setCurrentUser(user)


                //set contactList
                const { data: { data } } = await axios.get(`http://localhost:5000/contact/all`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                })
                setContactList(data)

                history.push('/contacts')
            } else {

                history.push('/login')
            }
        };
        getUserFromLocalStorage()
    }, []);

    return (
        <div>
            <Header />
            Home
        </div>
    )
}

export default withRouter(HomePage)