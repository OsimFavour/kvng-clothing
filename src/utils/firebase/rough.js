import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD7W5u5pn2J0_-hjyaJtPfPOs5K55LHsDs",
  authDomain: "kvng-db.firebaseapp.com",
  projectId: "kvng-db",
  storageBucket: "kvng-db.appspot.com",
  messagingSenderId: "970962837987",
  appId: "1:970962837987:web:97b520c391a6dec4fd00d6"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)