import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm =()=>{
    const [formFields, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }

    const handleSubmits = async (event) => {
        event.preventDefault();

        if(password != confirmPassword){
            alert('passwords do not match');
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
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
        <div onSubmit={handleSubmits}>
            <h1>Sign up with your email and password</h1>
            <form>
                <label>Diplay Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <label>Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default SignUpForm;