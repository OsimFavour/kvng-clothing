import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignUpForm = () => {
    
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }
        
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            )

            await createUserDocumentFromAuth(user, { displayName })

            resetFormFields()

        } catch (error) {
            if (error.code === 'auth/network-request-failed') {
                alert('No network connection')
            }
            else if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            }
            else {
                console.log('User creation encountered an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({...formFields, [name]: value })
    }


    return (
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input 
                    type='text' 
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <label>Email</label>
                <input 
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <label>Password</label>
                <input 
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <label>Confirm Password</label>
                <input 
                    type='password'
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <button type="submit">Submit</button>                
            </form>
        </div>
    )
}

export default SignUpForm 