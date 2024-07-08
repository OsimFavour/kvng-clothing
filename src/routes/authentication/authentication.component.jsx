import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const Authentication = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign In Page</h1>

            <FormInput
                label='Email'
                type="email"
                required
                // onChange={handleChange}
                name='email'
                // value={displayName}
            />

            <FormInput
                label='Password'
                type="password"
                required
                // onChange={handleChange}
                name='password'
                // value={displayName}
            />

            <Button>Sign In</Button>
            <Button buttonType='google' onClick={logGoogleUser}>Sign In with Google</Button>

            <SignUpForm/>
        </div>
    )
}

export default Authentication