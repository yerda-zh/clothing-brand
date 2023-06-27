import {
    signInWithGooglePopup,
    signInUserWithEmail
} from "../../utils/firebase/firebase.util";
import Button, {BUTTON_TYPE_CLASSES} from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import { useState } from "react";

import {SignInContainer, Buttons} from './sign-in-form.styles.jsx';

const defaultSignIn = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [signInFields, setSignInFields] = useState(defaultSignIn);
    const { email, password } = signInFields;
    
    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    };

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
            await signInUserWithEmail(email, password);
            resetSignInFields();
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
        <SignInContainer>
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
                <Buttons>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>
                        Sign in with google
                    </Button>
                </Buttons>                  
            </form>
        </SignInContainer>
    );
}
export default SignInForm;