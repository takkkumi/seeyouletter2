import {
	collection,
	deleteField,
	doc,
	getFirestore,
	onSnapshot,
	serverTimestamp,
	setDoc,
} from "@firebase/firestore"
import { addDays, format } from "date-fns"
import { getDoc, updateDoc } from "firebase/firestore"

const today = new Date()
const dayRef = format(today, "yyyy_MM_dd")
export const postLetter = async (userUid: string, text: string) => {
	const db = getFirestore()
	const now = serverTimestamp()

	const sendDay = format(addDays(today, 3), "yyyy_MM_dd")
	try {
		const userRef = doc(
			db,
			"user",
			userUid,
			"letters",
			`${userUid}_${dayRef}`
		)
		await setDoc(userRef, {
			postDay: dayRef,
			userUid: userUid,
			text: text,
			postTime: now,
			sendDay: sendDay,
			id: `${userUid}_${dayRef}`,
		})
		console.log(
			(
				await getDoc(
					doc(db, "user", userUid, "letters", `${userUid}_${dayRef}`)
				)
			).data()
		)
	} catch (error) {
		console.log(error)
	}
	return console.log(dayRef)
}

export const setCurrentLetter = async (userUid: string, text?: string) => {
	const db = getFirestore()
	try {
		await updateDoc(doc(db, "user", userUid), {
			currentLetter: text ? text : deleteField(),
		})
	} catch (error) {
		console.log(error)
	}
	return console.log(dayRef)
}
