import { Flex } from "@chakra-ui/react"
import NavBar from "../NavBar"
import Head from "next/head"

type Props = {
	title?: string
}
const BasicLayout: React.FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || "See  you letter"}</title>
			</Head>
			<Flex direction="column">
				<NavBar />
				{children}
			</Flex>
		</>
	)
}
export default BasicLayout
