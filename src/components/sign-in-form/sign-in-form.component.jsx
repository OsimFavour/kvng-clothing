import { useState } from "react"

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils"

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"
import FormInput from "../form-input/form-input.component"

import { 
    ButtonsContainer, 
    SignInContainer 
} from "./sign-in-form.styles.jsx"

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            await signInAuthUserWithEmailAndPassword(email, password)
    
            resetFormFields()

        } catch (error) {
            switch(error.code) {
                case 'auth/network-request-failed':
                    alert('There is no internet connection')
                    break
                case 'auth/cancelled-popup-request':
                    alert('Please do not cancel popup')
                    break
                case 'auth/popup-closed-by-user':
                    alert('Please do not close popup')
                    break
                case 'auth/internal-error':
                    alert('Internal Error')
                    break
                case 'auth/invalid-credential':
                    alert('No data associated with your credentials. Try again.')
                    break
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({...formFields, [name]: value })
    }


    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <ButtonsContainer>

                    <Button type="submit">Sign In</Button>

                    <Button 
                        onClick={signInWithGoogle} 
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type='button'
                    >
                        Google Sign In
                    </Button>

                </ButtonsContainer>
                                
            </form>
        </SignInContainer>
    )
}

export default SignInForm 