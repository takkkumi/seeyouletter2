import { Box, Text } from "@chakra-ui/react"
import { useContext } from "react"
import BasicLayout from "../components/layout/basicLayout"
import UserContext from "../context/userContext"

function HomePage() {
	return (
		<BasicLayout>
			<Box padding={10} backgroundColor="blue.100">
				<Text fontSize="xl" fontStyle="initial" position="static">
					Welcome to Next.js!!
				</Text>
			</Box>
		</BasicLayout>
	)
}

export default HomePage
