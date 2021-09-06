import { idContext } from "@/context/tabContext"
import { Box, Text } from "@chakra-ui/react"
import { useContext } from "react"
import BasicLayout from "../components/layout/basicLayout"

export const AboutContent = () => {
	return (
		<Box padding={10} backgroundColor="blue.100">
			{" "}
			<Text fontSize="xl" fontStyle="initial" position="static">
				About
			</Text>
		</Box>
	)
}
const AboutPage = () => {
	const setId = useContext(idContext).setId
	setId(0)
	return <BasicLayout />
}
export default AboutPage
