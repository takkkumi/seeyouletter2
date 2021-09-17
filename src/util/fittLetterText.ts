export const fittLetterText = (
	text: string,
	col: number,
	lowerCaseValue: number
) => {
	const texts = text.split("\n")
	let resultTexts = []
	texts.map((text) => {
		let count = 0
		let prevI = 0
		for (let i = 0; i <= text.length - 1; i++) {
			if (count >= col || i == text.length - 1) {
				resultTexts.push(text.slice(prevI, i))
				prevI = i
				console.log(count)
				count = 0
			}
			if (text[i].match(/[ -~]/)) {
				count += lowerCaseValue
			} else {
				count += 1
			}
			count = Math.round(count * 100) / 100
		}
	})
	return resultTexts
}
