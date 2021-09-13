import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { utcToZonedTime } from "date-fns-tz"
// export const japDate = (date: string | number | Date, pattern: string) => {
// 	const timeZone = "Asia/Tokyo"
// 	const zonedDate = utcToZonedTime(date, timeZone)
// 	return format(zonedDate, pattern, {
// 		locale: ja,
// 	})
// }
export const dateTransFormToDate = (date: string, ymd: string[]) => {
	const dateArray = date.split("_").map((element) => Number(element))

	return `${dateArray[0]}${ymd[0]}${dateArray[1]}${ymd[1]}${dateArray[2]}${ymd[2]} `
}
