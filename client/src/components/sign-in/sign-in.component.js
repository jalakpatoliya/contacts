import React, { useContext, useState } from 'react'
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/current-user.context';
import { ContactListContext } from "../../contexts/contact-list.context";
import { withRouter } from 'react-router'

const SignIn = ({ history }) => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [contactList, setContactList] = useContext(ContactListContext)
    const [email, setName] = useState('jalak@gmail.com')
    const [password, setPassword] = useState('password')

    const updateEmail = (e) => {
        setName(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //signing in
        const { data: { token } } = await axios.post(`http://localhost:5000/login`, { email, password })
        setCurrentUser({ email, token })

        //set contacts of user
        const { data: { data } } = await axios.get(`http://localhost:5000/contact/all`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setContactList(data)


        //moving to contacts page
        history.push('/contacts')
    }

    return (
        <form >
            <label>
                Email:
                </label>
            {/* <input type="text" name="email" value={email} onChange={updateEmail} required /> */}
            <input type="text" name="email" value={email} onChange={updateEmail} required />
            Password:
            {/* <input type="password" name="password" value={password} onChange={updatePassword} required /> */}
            <input type="password" name="password" value={password} onChange={updatePassword} required />
            <button type="submit" onClick={handleSubmit}>login</button>
        </form>
    )
}


export default withRouter(SignIn);