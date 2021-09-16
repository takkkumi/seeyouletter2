import { Timestamp } from "@firebase/firestore"

export type Letter = {
	postDay: string
	id: string
	postTime: Timestamp
	text: string
	sendDay: string
	userUid: string
}
