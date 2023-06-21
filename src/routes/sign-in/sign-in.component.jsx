import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import { useState } from "react";

import './sign-in.styles.scss';

const defaultSignIn = {
    email: '',
    password: '',
};

const SignIn=()=>{
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    const [signInFields, setSignInFields] = useState(defaultSignIn);
    const { email, password } = signInFields;
    
    const resetSignInFields = () => {
        setSignInFields(defaultSignIn);
    }

    const handleSignIn = async(event)=>{
        event.preventDefault();
    }
    
    const handleChangeSignIn = (event)=>{
        const { name, value } = event.target;

        setSignInFields({...signInFields, [name]: value});
    }

    return (
        <div className="container">
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
                    <Button type="submit">Sign In</Button>
                </form>

                <Button buttonType='google' onClick={logGoogleUser}>
                    Sign in with google
                </Button>
            </div>
            <SignUpForm/>
        </div>
    );
}
export default SignIn;