import { Letter } from "@/types/letterTypes"
import { Box, Text } from "@chakra-ui/layout"
import React from "react"

interface Props {
	letter: Letter
}
export const TodaysLetter = (prop: Props) => {
	const texts = prop.letter.text.split("\n")
	return (
		<Box
			rounded="lg"
			maxW="560px"
			p={7}
			paddingTop={3}
			paddingBottom={7}
			bg="gray.200">
			{texts.map((text, index) => (
				<Box maxW="575px" key={index}>
					<Text
						fontSize={"md"}
						color={"blackAlpha.900"}
						width={"500px"}
						lineHeight="30px"
						fontFamily="Klee One"
						bg="gray.200"
						style={{
							background:
								"linear-gradient(to Top, #A0AEC0 0.5px, #E2E8F0 1px)",
							backgroundSize: "110% 30px",
							backgroundOrigin: "content-box",
							backgroundAttachment: "local",
						}}>
						{text}
					</Text>
				</Box>
			))}
		</Box>
	)
}
