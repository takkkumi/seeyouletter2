import { Letter } from "@/types/letterTypes"
import { Box, Divider, Square, Text } from "@chakra-ui/layout"
import React from "react"

interface Props {
	letter: Letter
}
export const LetterLayout = (prop: Props) => {
	let texts: string[] = []
	const brTexts = prop.letter.text.split("\n")
	const kreeBrTexts = brTexts.map((text) => {
		let count = 0

		for (let i = 0; i < text.length; i++) {
			if (text[i].match(/[ -~]/)) {
				count += 0.6
			} else {
				count += 1
			}
		}

		return count
	})
	brTexts.map((item) => {
		for (let i = 0; i < item.length / 20; i++) {
			texts.push(item.substr(i * 20, 20))
		}
	})

	console.log(texts)
	return (
		<Box
			rounded="lg"
			maxW="620px"
			p={5}
			paddingTop={3}
			paddingBottom={7}
			bg="gray.200">
			{texts.map((text, index) => (
				<Box maxW="580px" key={index}>
					<Text
						fontSize={"lg"}
						color={"blackAlpha.800"}
						style={{
							whiteSpace: "pre-line",
							fontFamily: "Klee One",
						}}
						bg="gray.200">
						{text}
					</Text>
					<Divider bgColor="black" variant="dashed" />
				</Box>
			))}
		</Box>
	)
}
