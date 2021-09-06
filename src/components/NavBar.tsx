import { useRouter } from "next/router"
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { pages } from "@/types/tabTypes"

const NavBar: React.FC<{ tabs: pages; id: number }> = ({ tabs, id }) => {
	return (
		<Tabs variant="enclosed">
			<TabList>
				{tabs.map((tab, index) => (
					<Tab
						_selected={{ color: "blue.800", bg: "blue.50" }}
						key={index}>
						{tab.label}
					</Tab>
				))}
			</TabList>
			<TabPanels bg="blue.100">
				{tabs.map((tab, index) => (
					<TabPanel key={index}>{tab.children}</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	)
}
export default NavBar
