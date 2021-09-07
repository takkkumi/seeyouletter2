import { storeUserData } from "./../types/userTypes"
import {
	getAuth,
	setPersistence,
	browserLocalPersistence,
	GoogleAuthProvider,
	signInWithPopup,
	getAdditionalUserInfo,
	createUserWithEmailAndPassword,
	User,
	connectAuthEmulator,
	signInWithCredential,
} from "firebase/auth"
import { getApps, initializeApp } from "firebase/app"
import {
	addDoc,
	collection,
	connectFirestoreEmulator,
	doc,
	getFirestore,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "@firebase/firestore"
import { connectStorageEmulator, getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DETABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BAKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
const isLocal = window.location.hostname === "localhost"

export const firebaseInit = async () => {
	if (!getApps().length) {
		initializeApp(firebaseConfig)

		if (isLocal) {
			connectFirestoreEmulator(getFirestore(), "localhost", 8080)
			connectAuthEmulator(getAuth(), "http://localhost:9099")
			connectStorageEmulator(getStorage(), "localhost", 9199)
		}
	}
}
export const firebaseGoogleLogin = async () => {
	const auth = getAuth()
	const db = getFirestore()
	const now = serverTimestamp()

	const provider = new GoogleAuthProvider()

	await signInWithPopup(auth, provider)
		.then(async (result) => {
			// const credential = GoogleAuthProvider.credentialFromResult(result)
			// const token = credential.accessToken

			const user = result.user
			const usersRef = collection(db, "user")

			await setDoc(doc(usersRef, user.uid), {
				uid: user.uid,
				name: user.displayName,
				email: user.email,
				userPhoto: user.photoURL,
				createdAt: now,
				lastLogin: now,
			})
		})
		.catch((error) => {
			console.log(error)
		})
}

export const firebaseLogout = async (user: User | storeUserData) => {
	const auth = getAuth()
	const db = getFirestore()
	const now = serverTimestamp()
	const usersRef = collection(db, "user")
	try {
		auth.signOut()
		updateDoc(doc(usersRef, user.uid), {
			lastLogin: now,
		})
	} catch (error) {
		console.log(error)
	}
}

export const firebaseEmailRegister = async (
	email: string,
	password: string
) => {
	const auth = getAuth()
	const db = getFirestore()
	const now = serverTimestamp()
	const usersRef = collection(db, "user")
	await createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const user = userCredential.user

			await setDoc(doc(usersRef, user.uid), {
				uid: user.uid,
				name: user.displayName,
				email: user.email,
				userPhoto: user.photoURL,
				createdAt: now,
				lastLogin: now,
			})
		})
		.catch((error) => {
			console.log(error.message)
		})
}
