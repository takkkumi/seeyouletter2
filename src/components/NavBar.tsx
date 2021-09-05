import {} from "next"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
} from "@chakra-ui/react"

const NavBar: React.FC = () => {
	return (
		<Breadcrumb>
			<BreadcrumbItem>
				<BreadcrumbLink href="#">Home</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem>
				<BreadcrumbLink href="#">Docs</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem isCurrentPage>
				<BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
			</BreadcrumbItem>
		</Breadcrumb>
	)
}
export default NavBar
