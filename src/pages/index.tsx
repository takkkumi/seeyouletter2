import { Box, Text } from "@chakra-ui/react"
import { useContext } from "react"
import BasicLayout from "../components/layout/basicLayout"
import { idContext } from "../context/tabContext"

export const HomeContent = () => {
	return (
		<Box padding={15} backgroundColor="blue.100">
			<Text fontSize="xl" fontStyle="initial" position="static">
				Welcome to Next.js!!
			</Text>
		</Box>
	)
}
const HomePage = () => {
	const { setId } = useContext(idContext)
	setId(0)
	return <BasicLayout />
}

export default HomePage
