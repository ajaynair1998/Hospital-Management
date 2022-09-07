import moment from "moment";

export function getAge(dateOfBirth: string): number {
	console.log(
		"🚀 ~ file: index.ts ~ line 4 ~ getAge ~ dateOfBirth",
		dateOfBirth
	);
	let currentDate = moment();
	let givenDate = moment(dateOfBirth, "YYYY-MM-DD HH:mm:ss");
	console.log("🚀 ~ file: index.ts ~ line 6 ~ getAge ~ givenDate", givenDate);
	let age = currentDate.diff(givenDate, "years");
	return age;
}
