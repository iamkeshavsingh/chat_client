export const signinStart = () => {
    return {
        type: 'SINGIN'
    }
}


export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}


