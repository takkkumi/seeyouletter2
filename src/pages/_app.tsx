import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { firebaseInit } from "../actions/firebase_client"
import theme from "../theme"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { getAuth, User } from "firebase/auth"

import { useState, useEffect } from "react"
import UserContext from "../context/userContext"
import { idContext } from "@/context/tabContext"

export const MyApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState(null)
	const [storeUser, setStoreUser] = useState(null)
	const [isLogin, setIsLogin] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [id, setId] = useState(0)
	useEffect(() => {
		firebaseInit()

		const unsbscribe = getAuth().onAuthStateChanged(async (currentUser) => {
			if (currentUser) {
				if (currentUser !== user) {
					setUser(currentUser)
				}

				const getFirestoreState = async (user: User) => {
					try {
						let loginUserRef = doc(getFirestore(), "user", user.uid)
						let loginUser = await getDoc(loginUserRef)
						setStoreUser({
							data: loginUser.data(),
							ref: loginUserRef,
						})
					} catch (error) {
						console.log(error)
					}
				}

				await getFirestoreState(currentUser)
				setIsLogin(true)
			} else {
				setUser(null)
				setStoreUser(null)
			}
		})
		console.log("render")
		return () => {
			unsbscribe()
		}
	}, [isLogin])
	return (
		<UserContext.Provider
			value={{
				user,
				isLogin,
				storeUser,
				isLoading,
				setUser,
				setIsLogin,
				setStoreUser,
				setIsLoading,
			}}>
			<idContext.Provider value={{ id, setId }}>
				<ChakraProvider resetCSS theme={theme}>
					<ColorModeProvider
						options={{
							useSystemColorMode: true,
						}}>
						<Component {...pageProps} />
					</ColorModeProvider>
				</ChakraProvider>
			</idContext.Provider>
		</UserContext.Provider>
	)
}

export default MyApp
