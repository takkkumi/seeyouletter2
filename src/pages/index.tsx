import PostLetter from "@/components/postLetter"
import AppContext from "@/context/appContext"
import { Box, Text } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import BasicLayout from "../components/layout/basicLayout"
import { TabContext } from "../context/tabContext"

export const HomeContent = () => {
	const user = useContext(AppContext)
	const storeUser = user?.storeUser
	const userName = user?.user?.displayName
	return storeUser ? (
		<PostLetter />
	) : (
		<Box padding={15} backgroundColor="blue.100">
			<Text fontSize="xl" fontStyle="initial" position="static">
				"Welcome to Next.js!!"
			</Text>
		</Box>
	)
}
const HomePage = () => {
	const { id, setId } = useContext(TabContext)
	useEffect(() => {
		setId(0)
	}, [id])

	return <BasicLayout />
}

export default HomePage
