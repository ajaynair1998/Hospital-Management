export const getFavourites: (category?: string) => Promise<any> = async (
	category
) => {
	try {
		let favourites;
		if (!category) {
			favourites = await window.electron.favouritesApi.get({ category: "all" });
		} else {
			favourites = await window.electron.favouritesApi.get({
				category: category,
			});
		}

		return favourites;
	} catch (err) {
		console.log(err);
	}
};

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function timeout(delay: number) {
	return new Promise((res) => setTimeout(res, delay));
}

export function shrinkName(name: string, lengthNeeded = 10) {
	if (name.length < lengthNeeded) {
		return name;
	}
	return name.slice(0, lengthNeeded) + "...";
}

export function returnDbPatientProperties(propertyName: string): string {
	let properties: { [key: string]: string } = {
		name: "name",
		date: "date",
		image: "image",
		nationality: "nationality",
		age: "number",
		dateOfBirth: "date_of_birth",
		gender: "gender",
		address: "address",
		bloodGroup: "blood_group",
		phoneNumber: "phone_number",
		mobileNumber: "mobile_number",
		email: "email",
		maritalStatus: "marital_status",
		occupation: "occupation",
		doctorName: "doctor_name",
		referredBy: "reffered_by",
	};
	if (properties[propertyName]) {
		return properties[propertyName];
	} else {
		return " ";
	}
}
