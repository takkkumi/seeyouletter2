import { useRouter } from "next/router"
import Link from "next/link"
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	Spacer,
	useDisclosure,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"

import { pages } from "@/types/tabTypes"
import React, { useContext } from "react"
import AppContext from "@/context/appContext"
import { firebaseGoogleLogin, firebaseLogout } from "@/actions/firebase_client"

const NavBar: React.FC<{ tabs: pages; id: number }> = ({ tabs, id }) => {
	const router = useRouter()
	const auth = useContext(AppContext)
	// const { isOpen, onOpen, onClose } = useDisclosure()
	const user = auth?.storeUser?.data ?? null
	return (
		<Tabs
			variant="enclosed"
			defaultIndex={tabs.findIndex(
				({ pathName }) => pathName === router.pathname
			)}>
			<TabList>
				{tabs.map((tab, index) => (
					<Link href={tab.pathName} key={index}>
						<Tab
							_selected={{ color: "blue.800", bg: "blue.50" }}
							key={index}>
							{tab.label}
						</Tab>
					</Link>
				))}
				<Spacer />
				<Menu autoSelect={false}>
					<MenuButton
						as={IconButton}
						icon={<HamburgerIcon />}
						variant="outline"
					/>

					<MenuList>
						{auth.isLogin ? (
							<MenuItem
								onClick={async () => {
									await firebaseLogout(user)
									auth.setIsLogin(false)
									router.push("/")
								}}>
								Logout
							</MenuItem>
						) : (
							<MenuItem
								onClick={async () => {
									await firebaseGoogleLogin()
									if (auth.user) {
										auth.setIsLogin(true)
										router.push("/")
									}
								}}>
								Login
							</MenuItem>
							// <Modal isOpen={isOpen} onClose={onClose}>
							// 	<ModalOverlay />
							// 	<ModalContent>
							// 		<ModalHeader>Modal Title</ModalHeader>
							// 		<ModalCloseButton />
							// 		<ModalBody></ModalBody>

							// 		<ModalFooter>
							// 			<Button
							// 				colorScheme="blue"
							// 				mr={3}
							// 				onClick={onClose}>
							// 				Close
							// 			</Button>
							// 			<Button variant="ghost">
							// 				Register
							// 			</Button>
							// 		</ModalFooter>
							// 	</ModalContent>
							// </Modal>
						)}
						<MenuItem>Create a Copy</MenuItem>
						<MenuItem>Mark as Draft</MenuItem>
						<MenuItem>Delete</MenuItem>
						<MenuItem>Attend a Workshop</MenuItem>
					</MenuList>
				</Menu>
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
