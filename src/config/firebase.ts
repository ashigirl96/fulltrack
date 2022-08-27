// Import the functions you need from the SDKs you need
import { required } from '@/lib/environment'
import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: required(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: required(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: required(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: required(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: required(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  ),
  appId: required(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId: required(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
