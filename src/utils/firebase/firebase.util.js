import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from 'firebase/auth';
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9i-97hsl3lMi1QTcR9zwjZfERj8YAucU",
    authDomain: "clothing-brand-db-a54bc.firebaseapp.com",
    projectId: "clothing-brand-db-a54bc",
    storageBucket: "clothing-brand-db-a54bc.appspot.com",
    messagingSenderId: "842554595923",
    appId: "1:842554595923:web:41f3ee66504491666884a6"
  };
  
initializeApp(firebaseConfig); //CRUD operations will be done using this

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore(); // direct database we will be using

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    // snapshots are actual data we are getting from the database
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});

    return categoryMap;
}




export const createUserDocumentFromAuth = async(userAuth, addInformation={})=>{
    if (!userAuth) return; // way of protecting our code

    const userDocRef=doc(db, 'users', userAuth.uid);
    // doc takes three parameters: database, collection, and identifier
    console.log(userDocRef);

    const userSnapshot= await getDoc(userDocRef);
    console.log(userSnapshot);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addInformation,
            }); //two parameters: user doc ref, and variables we want to pass
        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }// userSnapshot exists return false when there is no such user, the !makes it opposite so it would return true 
    // so that we can create an if statement

    return userDocRef;
    // if there is such user, return that
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // way of protecting our code

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmail = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
