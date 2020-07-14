import React, { createContext, useState } from 'react'

export const CurrentUserContext = createContext();

export const CurrentUserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({
        email: "jalak@gmail.com",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmMGIzYWM0MmNjMWRkMWY5Njc1NmI2ZSIsImVtYWlsIjoiamFsYWtAZ21haWwuY29tIn0sImlhdCI6MTU5NDcwNjYzOX0.BC_SnM2__7qlCprAA7eZ9hlYjuqlql6hz-xrPAGcQyU"
    });

    return (
        <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}