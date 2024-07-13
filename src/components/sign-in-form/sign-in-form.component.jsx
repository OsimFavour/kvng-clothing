import { useContext, useState } from "react"

import { 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils"

import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"

import { UserContext } from "../../contexts/user.context"

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    console.log(formFields);

    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            // console.log("Here is the response >>>>>", response);
            setCurrentUser(user)
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
        <div className="sign-in-container">
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

                <div className="buttons-container">

                    <Button type="submit">Sign In</Button>

                    <Button 
                        onClick={signInWithGoogle} 
                        buttonType='google'
                        type='button'
                    >
                        Google Sign In
                    </Button>

                </div>
                                
            </form>
        </div>
    )
}

export default SignInForm 