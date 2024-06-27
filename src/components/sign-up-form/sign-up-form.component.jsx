import { useState } from "react"

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

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({...formFields, [name]: value })
    }


    return (
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={() => {}}>
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

                <button type="submit"></button>                
            </form>
        </div>
    )
}

export default SignUpForm