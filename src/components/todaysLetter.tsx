import { Letter } from "@/types/letterTypes"
import { fittLetterText } from "@/util/fittLetterText"
import { Box, Divider, Square, Text } from "@chakra-ui/layout"
import React from "react"

interface Props {
	letter: Letter
}
export const TodaysLetter = (prop: Props) => {
	const texts = fittLetterText(prop.letter.text, 30, 0.58)
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
				<Box maxW="555px" key={index}>
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
