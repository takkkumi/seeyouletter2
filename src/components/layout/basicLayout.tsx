import { Flex } from "@chakra-ui/react"
import NavBar from "@/components/navbar"
import Head from "next/head"
import { pages } from "@/types/tabTypes"
import { useContext } from "react"
import { HomeContent } from "@/pages"
import { AboutContent } from "@/pages/about"
import { idContext } from "@/context/tabContext"
const BasicLayout: React.FC = () => {
	const tabPages: pages = [
		{
			title: "see you letter!",
			children: HomeContent(),
			pathName: "/",
			label: "Home",
		},
		{
			title: "see you letter",
			children: AboutContent(),
			pathName: "/about",
			label: "About",
		},
	]
	const { id } = useContext(idContext)
	return (
		<>
			<Head>
				<title>{tabPages[id].title || "See  you letter!"}</title>
			</Head>
			<Flex direction="column">
				<NavBar tabs={tabPages} id={id} />
			</Flex>
		</>
	)
}
export default BasicLayout
