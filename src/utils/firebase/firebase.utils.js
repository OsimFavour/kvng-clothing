import { initializeApp } from "firebase/app";
import { 
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { 
  doc, 
  query,
  setDoc,
  getDoc,
  getDocs, 
  collection,
  writeBatch,
  getFirestore, 
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyD7W5u5pn2J0_-hjyaJtPfPOs5K55LHsDs",
  authDomain: "kvng-db.firebaseapp.com",
  projectId: "kvng-db",
  storageBucket: "kvng-db.appspot.com",
  messagingSenderId: "970962837987",
  appId: "1:970962837987:web:97b520c391a6dec4fd00d6"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)


export const db = getFirestore()


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done');
}


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories") 
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)

  const categoryMap = querySnapshot.docs.reduce(
    (acc, docSnapshot) => {
      const { title, items } = docSnapshot.data()
      acc[title.toLowerCase()] = items
      return acc
    }, {})
    return categoryMap
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('Error catching the user:', error.message);
    }
  }

  return userDocRef
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);

}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;
  const response =  await signInWithEmailAndPassword(auth, email, password);
  console.log(response);
  return response;
  
}


export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)