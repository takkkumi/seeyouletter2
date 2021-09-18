import { useForm } from "react-hook-form"
import React, { useContext, useEffect, useRef, useState } from "react"
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Textarea,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	Spacer,
	Image,
	Box,
	HStack,
	VStack,
	Grid,
	Flex,
	AlertDialogOverlay,
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from "@chakra-ui/react"
import UserContext from "@/context/appContext"
import { postLetter, setCurrentLetter } from "@/actions/postLetterAction"
import { doc, getFirestore, onSnapshot } from "@firebase/firestore"
import { format } from "date-fns"

import { TodaysLetter } from "./todaysLetter"
import { Letter } from "@/types/letterTypes"
import Head from "next/head"

const PostLetter = () => {
	const auth = useContext(UserContext)
	const user = auth.storeUser?.data
	const setRender = auth.setRender
	const userUid = user?.uid

	const [todaysLetter, setTodaysLetter] = useState<Letter | null>(null)

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
	} = useForm()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const onSubmit = (values: any) => {
		postLetter(userUid, values.post)
		setCurrentLetter(userUid)
		setRender(true)
		onClose()
	}
	const [deleteLetterOpen, setDeleteLetterOpen] = useState(false)
	const OnDeleteLetterClose = () => setDeleteLetterOpen(false)
	const cancelRef = useRef()
	const storeUser = useContext(UserContext)?.storeUser
	const currentLetter = storeUser?.data?.currentLetter
	useEffect(() => {
		const db = getFirestore()

		const document = doc(
			db,
			"user",
			userUid,
			"letters",
			`${userUid}_${format(new Date(), "yyyy_MM_dd")}`
		)

		const unsub = () => {
			onSnapshot(document, (doc) => {
				console.log(doc.data())
				setTodaysLetter(doc ? (doc.data() as Letter) : null)
			})
		}

		return unsub()
	}, [])
	return (
		<Box>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Klee+One:wght@600&display=swap"
					rel="stylesheet"
				/>
				;
			</Head>
			<Grid>
				{todaysLetter ? (
					<>
						<Text fontSize="md" color={"blackAlpha.500"}>
							Today's Letter
						</Text>
						<TodaysLetter letter={todaysLetter} />
					</>
				) : (
					<Text as="em" color={"red.300"}>
						"Let's send letter for you."
					</Text>
				)}
			</Grid>
			<Flex>
				<Button
					mr="1"
					onClick={() => {
						setRender(true)
						setValue(
							"post",
							todaysLetter?.text || currentLetter || null
						)
						onOpen()
					}}
					mt={3}
					colorScheme={"blackAlpha"}>
					<Image
						boxSize="30px"
						objectFit="cover"
						alt="see you letter"
						src="https://firebasestorage.googleapis.com/v0/b/seeyouletter-9f0b4.appspot.com/o/favicon%2Fandroid-chrome-256x256.png?alt=media&token=33d16da5-730f-4754-9dc4-c3c92aa9a43e"
					/>
					{todaysLetter?.text
						? "Edit Today's Letter"
						: "Write Today's Letter"}
				</Button>

				{todaysLetter && (
					<Button
						mt={3}
						colorScheme={"gray"}
						onClick={() => setDeleteLetterOpen(true)}>
						Delete
					</Button>
				)}
			</Flex>

			<Modal
				blockScrollOnMount={false}
				isOpen={isOpen}
				onClose={onClose}
				size="2xl"
				scrollBehavior="outside"
				closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent width="580">
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Today's Post</ModalHeader>
						<ModalCloseButton />
						<ModalBody alignItems="flex-start" width="570px">
							{console.log(currentLetter)}
							<FormControl isInvalid={errors.post}>
								<FormLabel htmlFor="post">{`${auth.storeUser?.data?.name}'sPost`}</FormLabel>
								<Textarea
									resize="none"
									defaultValue={
										currentLetter || todaysLetter?.text
									}
									rows={5}
									overflow="visible"
									width="520px"
									id="post"
									style={{
										lineHeight: "30px",
										background:
											"linear-gradient(to bottom, #A0AEC0 0.5px, #EDF2F7 1px)",
										backgroundSize: "110% 30px",
										backgroundOrigin: "content-box",
										backgroundAttachment: "local",
										fontFamily: "Klee One",
									}}
									placeholder={"Dear you"}
									{...register("post", {
										required: "This is required",
										maxLength: {
											value: 400,
											message: "Max length should be 400",
										},
										validate: {
											maxRow: (v) =>
												v.split("\n").length <= 15 ||
												"You can only break lines 15 times.",
										},
									})}
								/>
								<FormErrorMessage>
									{errors.post && errors.post.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>

						<ModalFooter width="570px">
							<Button
								isDisabled={!!errors?.name}
								colorScheme="teal"
								isLoading={isSubmitting}
								type="submit">
								Submit
							</Button>
							<Spacer />
							<Button
								colorScheme="blue"
								mr={3}
								onClick={() => {
									setCurrentLetter(
										storeUser?.data?.uid,
										getValues("post")
									)
									onClose()
								}}>
								save
							</Button>
							{currentLetter && (
								<Button
									mr={3}
									colorScheme="gray"
									onClick={() =>
										setValue("post", currentLetter)
									}>
									savedData
								</Button>
							)}
							<Button
								variant="solid"
								mr={3}
								onClick={() => {
									setValue("post", "")
								}}>
								Clear
							</Button>
							<Button
								bgColor="red.400"
								color="whiteAlpha.900"
								variant="solid"
								onClick={onClose}>
								Close
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
			<AlertDialog
				isOpen={deleteLetterOpen}
				leastDestructiveRef={cancelRef}
				onClose={OnDeleteLetterClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Customer
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={OnDeleteLetterClose}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									postLetter(userUid)
									OnDeleteLetterClose()
								}}
								ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	)
}
export default PostLetter
