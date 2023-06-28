import { createContext, useEffect, useReducer } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

import { createAction } from "../utils/reducer/reducer.utils";
// optimization we have created so that we don't have to write type:, payload. 

// the actual storage we will be using
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in UserReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

// wrapping userProvider with the children inside, so that we can get any values being passed by userProvider
// in our case, we are using userProvider to wrap around the App so that anything inside the app can use the context
export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user)=>{
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = {currentUser, setCurrentUser};

    useEffect(()=>{
        const unsubcribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubcribe;
    }, []);
    // onAuthStateChanged is open method which means that is running all the time, and we need it stop listening 

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}