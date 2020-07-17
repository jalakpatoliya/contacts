import axios from "axios";
import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ContactListContext } from '../../contexts/contact-list.context';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { EditContact } from '../edit-contact/edit-contact.component';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
    LineChart, XAxis, YAxis, Line, Brush, AreaChart, Area,
    Tooltip, CartesianGrid,
    Label
} from 'recharts';
import { CurrentUserContext } from "../../contexts/current-user.context";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export function ViewContact({ setState, state, contactData, setContactData, open, setOpen }) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

    let { firstName, lastName, middleName, email, mobileNumber, notes, totalViews, views } = contactData;

    useEffect(() => {
        try {
            const incrementViews = async () => {
                const { data: { data } } = await axios.get(`api/contact/${contactData._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser.token}`
                        },
                    })
                await setContactData({ ...contactData, ...data })
            }
            if (open) {
                incrementViews()
            }
        } catch (error) {
            alert(error.message)
        }
    }, [open])


    const [openEditContact, setOpenEditContact] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        setOpenEditContact(true)
        setOpen(false)
    }

    useEffect(() => {
        const fetchData = () => {
        };
        fetchData()
    });

    return (
        <div>
            <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Contact Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="First Name"
                                defaultValue={firstName}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Last Name"
                                defaultValue={lastName}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Middle Name"
                                defaultValue={middleName}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Mobile Number"
                                defaultValue={mobileNumber}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Email"
                                defaultValue={email}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Notes"
                                defaultValue={notes}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Views"
                                value={totalViews}
                                // defaultValue={totalViews}
                                variant="outlined"
                            />
                        </form>
                    </DialogContentText>

                    <LineChart
                        width={800} height={200} data={views}
                        margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} label="Views" />
                        <Tooltip
                            wrapperStyle={{
                                borderColor: 'white',
                                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                            }}
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                            labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                        />
                        <Line dataKey="count" stroke="#ff7300" dot={false} />
                    </LineChart>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEdit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>

            <EditContact setState={setState} state={state} contactData={contactData} setContactData={setContactData} open={openEditContact} setOpen={setOpenEditContact} />
        </div>
    );
}
