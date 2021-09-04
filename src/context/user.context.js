import React, { useReducer } from 'react'

import authReducer from '../store/auth/auth.reducer'

const INIT_STATE = {
    user: null,
    isLoggedIn: false,
    error: null,
};


const UserContext = React.createContext(INIT_STATE);

export const UserContextProvider = ({ children }) => {

    var [state, dispatch] = useReducer(authReducer, INIT_STATE);

    return (
        <UserContext.Provider
            value={{
                dispatch,
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                error: state.error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}


export default UserContext;