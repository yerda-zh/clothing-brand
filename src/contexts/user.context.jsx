import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

// the actual storage we will be using
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

// wrapping userProvider with the children inside, so that we can get any values being passed by userProvider
// in our case, we are using userProvider to wrap around the App so that anything inside the app can use the context
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
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