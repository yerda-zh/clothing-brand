import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInUserWithEmail
} from "../../utils/firebase/firebase.util";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import { useState } from "react";

import './sign-in-form.styles.scss';

const defaultSignIn = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        alert('Signed in with Google account');
    };

    const [signInFields, setSignInFields] = useState(defaultSignIn);
    const { email, password } = signInFields;
    
    const resetSignInFields = () => {
        setSignInFields(defaultSignIn);
    }
    
    const handleChangeSignIn = (event)=>{
        const { name, value } = event.target;

        setSignInFields({...signInFields, [name]: value});
    }

    // main code
    const handleSignIn = async(event)=>{
        event.preventDefault();

        try {
            const response = await signInUserWithEmail(email, password);
            console.log(response);
            resetSignInFields();
            alert('Signed In');
        } catch(error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect password, please try again');
                    break;
                case 'auth/user-not-found':
                    alert('The user not found');
                    break;
                default:
                    console.log(error);

            }
        }
    }
    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSignIn}>
                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChangeSignIn} 
                    name="email" 
                    value={email}
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChangeSignIn} 
                    name="password" 
                    value={password}
                />
                <div className="buttons">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={logGoogleUser}>
                        Sign in with google
                    </Button>
                </div>                  
            </form>
        </div>
    );
}
export default SignInForm;