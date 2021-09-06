import { createContext, Dispatch, SetStateAction } from "react"
type idContext = {
	id: number
	setId: Dispatch<SetStateAction<any>>
}
export const idContext = createContext({} as idContext)
