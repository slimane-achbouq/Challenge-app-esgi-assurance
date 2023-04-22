import React from "react"

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(null)
    const jwt = localStorage.getItem('cpe-user-token');
    const API_URL = 'http://localhost:8000/v1';

    const fetchCurrentUser = async () => {
        let response = await fetch(`${API_URL}/user-info`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            // body: JSON.stringify({'auth_link' : authLinkId})
        });
        response = await response.json()
        setCurrentUser(response)
    }

    return (
        <CurrentUserContext.Provider value={{currentUser, fetchCurrentUser}}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)