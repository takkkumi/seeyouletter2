import { useForm } from "react-hook-form"
import React, { useContext, useEffect, useState } from "react"
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
} from "@chakra-ui/react"
import UserContext from "@/context/userContext"
import { postLetter, setCurrentLetter } from "@/actions/postLetterAction"
import { doc, getFirestore, onSnapshot } from "@firebase/firestore"
import { format } from "date-fns"
import { LetterLayout } from "./layout/letterLayout"
import { Letter } from "@/types/letterTypes"
import Head from "next/head"
const PostLetter = () => {
	const auth = useContext(UserContext)
	const user = auth.storeUser?.data
	const userUid = user?.uid
	const [render, setRender] = useState(false)
	const [todaysLetter, setTodaysLetter] = useState<Letter | null>(null)
	const [placeholderLetter, setPlaceholderLetter] = useState<string>(null)
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
		getValues,
		setValue,
	} = useForm()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const onSubmit = (values: any) => {
		postLetter(userUid, values.post)
		setRender(true)
		onClose()
	}

	const storeUser = useContext(UserContext)?.storeUser
	const currentLetter = storeUser?.data?.currentLetter
	const [currentValue, setCurrentValue] = useState(currentLetter)
	useEffect(() => {
		const db = getFirestore()
		const document = doc(
			db,
			"user",
			userUid,
			"letters",
			`${userUid}_${format(new Date(), "yyyy_MM_dd")}`
		)
		onSnapshot(document, (doc) => {
			setTodaysLetter(doc ? (doc.data() as Letter) : null)
		})

		setRender(false)
		console.log(todaysLetter)
		return onSnapshot(document, () => {})
	}, [render])
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
						<LetterLayout letter={todaysLetter} />
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
					onClick={onOpen}
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

				<Button mt={3} colorScheme={"gray"}>
					Delete
				</Button>
			</Flex>

			<Modal
				blockScrollOnMount={false}
				isOpen={isOpen}
				onClose={onClose}
				size="lg">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Today's Post</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl isInvalid={errors.post}>
								<FormLabel htmlFor="post">{`${auth.storeUser?.data?.name}'sPost`}</FormLabel>
								<Textarea
									defaultValue={todaysLetter?.text}
									rows={5}
									cols={60}
									wrap="hard"
									id="post"
									style={{
										lineHeight: "30px",
										backgroundImage:
											"linear-gradient(to right, #000, #000 3px, transparent 3px, transparent 8px)",
										backgroundRepeat: "repeat-x",
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
									})}
								/>
								<FormErrorMessage>
									{errors.post && errors.post.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>

						<ModalFooter>
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
							<Button
								variant="solid"
								onClick={() => {
									setCurrentLetter(storeUser?.data?.uid)
									setValue("post", "")
								}}>
								Clear
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Box>
	)
}
export default PostLetter
