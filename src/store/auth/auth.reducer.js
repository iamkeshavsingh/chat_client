function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER': return { ...state, user: action.payload, isLoggedIn: true, error: null };
        default: return state;
    }
}


export default reducer;