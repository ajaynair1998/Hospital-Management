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
