// import React, { useContext } from 'react';
// import { ContactListContext } from '../../contexts/contact-list.context';
// import { Contact } from '../contact/contact.component';

// export const ContactList = () => {
//     const [contactList, setContactList] = useContext(ContactListContext)

//     return (
//         <div>
//             {
//                 contactList.map((props) =>
//                     <Contact key={props._id} contactData={props} />
//                 )
//             }
//         </div>
//     )
// }


import React from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

import { forwardRef, useContext, useEffect, useState } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { ContactListContext } from '../../contexts/contact-list.context';
import { ViewContact } from '../view-contact/view-contact.component';
import { CurrentUserContext } from '../../contexts/current-user.context';
import AddContact from '../add-contact/add-contact';

const Add = forwardRef((props, ref) => <AddBox {...props} ref={ref} />)
const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export function ContactList() {
    const [contactList, setContactList] = useContext(ContactListContext)
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'firstName' },
            { title: 'Surname', field: 'lastName' },
            { title: 'Mobile Number', field: 'mobileNumber', type: 'numeric' },
            {
                title: 'Date Added',
                field: 'createdAt',
            },
        ],
        data: contactList
    });
    const [contactData, setContactData] = useState({});
    const [open, setOpen] = useState(false);
    const [addContactOpen, setAddContactOpen] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            console.log('contactList:', contactList);
        };
        fetchData()
    });

    return (
        <div>
            <MaterialTable
                isFreeAction={true}
                icons={tableIcons}
                title="Contact List"
                columns={state.columns}
                data={state.data}

                actions={[
                    {
                        icon: Add,
                        isFreeAction: true,
                        tooltip: 'Add User',
                        onClick: (event, rowData) => {
                            setAddContactOpen(true)
                        }
                    }
                ]}

                editable={{
                    onRowDelete: async (oldData) => {

                        //remove contact
                        await axios.delete(`http://localhost:5000/contact/${oldData._id}`, {
                            headers: { Authorization: `Bearer ${currentUser.token}` }
                        })

                        const newContactList = contactList.filter(contact => contact._id !== oldData._id)
                        await setContactList([...newContactList])

                        await setState({ ...state, data: [...newContactList] })
                    }
                }}
                onRowClick={(event, rowData) => {
                    setContactData(rowData)
                    setOpen(true)
                }}
            />

            <ViewContact state={state} setState={setState} contactData={contactData} setContactData={setContactData} open={open} setOpen={setOpen} />

            <AddContact state={state} setState={setState} open={addContactOpen} setOpen={setAddContactOpen} />

        </div>
    );
}
