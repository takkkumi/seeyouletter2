import UserContext from "@/context/userContext"
import { Box, Text } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import BasicLayout from "../components/layout/basicLayout"
import { idContext } from "../context/tabContext"

export const HomeContent = () => {
	const user = useContext(UserContext)
	const storeUser = user?.storeUser
	const userName = user?.user?.displayName
	return (
		<Box padding={15} backgroundColor="blue.100">
			<Text fontSize="xl" fontStyle="initial" position="static">
				{userName ? `Welcome ${userName} ` : "Welcome to Next.js!!"}
			</Text>
		</Box>
	)
}
const HomePage = () => {
	const { id, setId } = useContext(idContext)
	useEffect(() => {
		setId(0)
	}, [id])

	return <BasicLayout />
}

export default HomePage
