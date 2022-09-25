import moment from "moment";
import uniqid from "uniqid";
export const convertToReadableDate = (date: string | undefined | Date) => {
	try {
		let currentTime = moment(date, "YYYY-MM-DD HH:mm:ss");
		return currentTime.format("Do MMMM YYYY hh:mm a");
	} catch (err: any) {
		console.log(err.message);
	}
};

export const generateUniqueId = (): string => {
	return uniqid();
};

export const generateMaximumLengthString = (
	string: string,
	length?: number
): string => {
	try {
		if (length) {
			let newString = string.substring(0, length) + "...";
			return newString;
		}
		if (string.length > 8) {
			let newString = string.substring(0, 8) + "...";
			return newString;
		}
		return string;
	} catch (err) {
		console.log(err);
		return string;
	}
};

export const convertDbTimeToReadableString = (date: string): string => {
	try {
		let currentTime = moment(date)
			.utc()
			.format("MMMM Do YYYY, h:mm:ss a")
			.toString();
		return currentTime;
	} catch (err) {
		console.log(err);
		return "";
	}
};
