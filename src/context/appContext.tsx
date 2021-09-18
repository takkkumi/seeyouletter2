import { Dispatch } from "react"
import { createContext } from "react"
import { firebaseUser } from "../types/userTypes"

export type Functions = {
	isLoading: boolean
	setUser: Dispatch<any>
	setStoreUser: Dispatch<any>
	setIsLogin: Dispatch<any>
	setIsLoading: Dispatch<any>
	setRender: Dispatch<any>
}

const AppContext = createContext({} as firebaseUser & Functions)
export default AppContext
