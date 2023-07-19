import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";

import { useDispatch } from "react-redux";
import Button from "../button/button.component";

import {SignUpContainer} from './sign-up-form.styles.jsx';
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm =()=>{
    const [formFields, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }

    const handleSubmits = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match');
            return;
        }

        try{
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('The email is already in use, please use another email or sign in using existing email address.');
            } else {
                console.log('user creation encoutered an error', error);
            }
            
        }
    }

    const handleChange = (event)=>{
        const { name, value } = event.target; // target gives us everything that is attached to that specific field

        setFormField({...formFields, [name]: value});
        // this means that we are updating only the corresponding field, while other fields are spread on

    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmits}>
                <FormInput 
                    label="Diplay Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}
export default SignUpForm;