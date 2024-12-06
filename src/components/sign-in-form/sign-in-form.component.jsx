import { useState } from "react"

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"
import FormInput from "../form-input/form-input.component"

import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles"
import { useDispatch } from "react-redux"
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action"

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        try {
            dispatch(googleSignInStart())
        } catch (error) {
            switch(error.code) {
                case 'auth/popup-closed-by-user':
                    alert('Please do not close popup')
                    break
                case 'auth/network-request-failed':
                    alert('There is no internet connection')
                    break
                case 'auth/popup-blocked':
                    alert('No internet connection')
                    break
                case 'auth/cancelled-popup-request':
                    alert('Please do not cancel popup')
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            dispatch(emailSignInStart())
            
            resetFormFields()

        } catch (error) {
            console.log('User sign in failed', error);
            
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