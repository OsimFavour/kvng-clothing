import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>

            <SignUpForm/>
        </div>
    )
}

export default SignIn