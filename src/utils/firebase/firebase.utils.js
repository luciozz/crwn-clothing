import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
 } from 'firebase/auth';

 import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
  } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyDwp1uVZ_tnk46yDTIdgusSMsmMpUWLUFQ",

  authDomain: "crwn-clothing-db-a4f74.firebaseapp.com",

  projectId: "crwn-clothing-db-a4f74",

  storageBucket: "crwn-clothing-db-a4f74.appspot.com",

  messagingSenderId: "1031676496738",

  appId: "1:1031676496738:web:e41f13efc39ecc2efb7a3b"

};


// Initialize Firebase

const firebasApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  
  return userDocRef;
}