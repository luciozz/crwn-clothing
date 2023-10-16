import { useState, useEffect } from "react";

import { getRedirectResult } from "firebase/auth";
import FormInput from '../form-input/form-input.component';

import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    console.log(formFields);
    
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user)
        await createUserDocumentFromAuth(user);
    }
    
    const restFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!password || !email) {
            alert('Enter email and password!');
            return;
        };

        try {
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response);
            restFormFields();

        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);

            }
        }

        

    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput
                            label='Email'
                            type='email'
                            required
                            onChange={handleChange}
                            name='email'
                            value={email}/>
                    
                    <FormInput
                            label='Password'
                            type='password'
                            required
                            onChange={handleChange}
                            name='password' 
                            value={password}/>

                    <div className="buttons-container">
                        <Button type='submit'>SIGN IN</Button>
                        <Button type='button' buttonType='google' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                    </div>
                    
                </form>

        </div>
    )
}

export default SignInForm;