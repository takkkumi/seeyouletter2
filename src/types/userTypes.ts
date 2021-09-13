import { User } from "firebase/auth"
import { DocumentReference, FieldValue } from "firebase/firestore"
export type storeUserData = {
	uid: string
	name: string
	email: string
	userPhotoURL: string
	createdAt: FieldValue
	lastLogin: FieldValue
	currentLetter: string | null
}

export type firebaseUser = {
	user?: User
	storeUser?: {
		data: storeUserData
		ref: DocumentReference
	}
	isLogin: boolean
}
