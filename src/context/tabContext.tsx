import { createContext, Dispatch, SetStateAction } from "react"
type TabContext = {
	id: number
	setId: Dispatch<SetStateAction<number>>
}
export const TabContext = createContext({} as TabContext)
