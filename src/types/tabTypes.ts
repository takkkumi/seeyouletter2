import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"

type page = {
	children: ReactJSXElement
	pathName: string
	title: string
	label: string
}
export type pages = page[]
