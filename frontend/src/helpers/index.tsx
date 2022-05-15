import moment from "moment";

export const convertToReadableDate = (date: string | undefined) => {
	try {
		let currentTime = moment(date);
		return currentTime.format("Do MMMM YYYY hh:mm a");
	} catch (err: any) {
		console.log(err);
	}
};
