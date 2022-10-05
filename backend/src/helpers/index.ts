import moment from "moment";

export function getAge(dateOfBirth: string): number {
	let currentDate = moment();
	let givenDate = moment(dateOfBirth, "YYYY-MM-DD HH:mm:ss");
	let age = currentDate.diff(givenDate, "years");
	return age;
}

export function checkIfNumber(text: any) {
	try {
		return !isNaN(text);
	} catch (err) {
		return false;
	}
}
