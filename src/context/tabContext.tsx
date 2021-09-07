import { createContext, Dispatch, SetStateAction } from "react"
type idContext = {
	id: number
	setId: Dispatch<SetStateAction<number>>
}
export const idContext = createContext({} as idContext)
