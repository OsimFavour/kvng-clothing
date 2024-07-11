import { useState } from "react"
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-in-form.styles.scss'
import Button from "../button/button.component"


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
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        
        try {
            
            resetFormFields()

        } catch (error) {
            
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
                    >
                        Google Sign In
                    </Button>

                </div>
                                
            </form>
        </div>
    )
}

export default SignInForm 