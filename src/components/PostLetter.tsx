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
} from "@chakra-ui/react"
import UserContext from "@/context/userContext"
import { postLetter, setCurrentLetter } from "@/actions/postLetter"
import { doc, getFirestore, onSnapshot } from "@firebase/firestore"
import { format } from "date-fns/esm"

const PostLetter = () => {
	const auth = useContext(UserContext)
	const user = auth.storeUser?.data
	const userUid = user?.uid
	const [render, setRender] = useState(false)
	const [todaysLetter, setTodaysLetter] = useState(null)
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const onSubmit = (values: any) => {
		postLetter(userUid, values.post)
		setRender(true)
		onClose()
	}
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
		onSnapshot(document, (doc) => {
			setTodaysLetter(doc ? doc.data() : null)
		})

		setRender(false)
		console.log(todaysLetter)
		return onSnapshot(document, () => {})
	}, [render])
	return (
		<Box>
			<Text>{todaysLetter?.text}</Text>

			<Button onClick={onOpen} mt={3} colorScheme={"blackAlpha"}>
				<Image
					boxSize="34px"
					objectFit="cover"
					alt="see you letter"
					src="https://firebasestorage.googleapis.com/v0/b/seeyouletter-9f0b4.appspot.com/o/favicon%2Fandroid-chrome-256x256.png?alt=media&token=33d16da5-730f-4754-9dc4-c3c92aa9a43e"
				/>
				{todaysLetter?.text
					? "Edit Today's Letter"
					: "Write Today's Letter"}
			</Button>

			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Today's Post</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl isInvalid={errors.post}>
								<FormLabel htmlFor="post">{`${auth.storeUser?.data?.name}'sPost`}</FormLabel>
								<Textarea
									id="post"
									placeholder={
										currentLetter
											? currentLetter
											: "Today's post"
									}
									{...register("post", {
										required: "This is required",
									})}
								/>
								<FormErrorMessage></FormErrorMessage>
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
									reset()
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
