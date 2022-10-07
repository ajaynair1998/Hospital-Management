import { categoriesList } from "../pages/PatientTreatmentDetails/categories";

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
		referredBy: "referred_by",
	};
	if (properties[propertyName]) {
		return properties[propertyName];
	} else {
		return " ";
	}
}
export function handleClickGoToNextCategory(args: {
	location: string;
}): IHandleClickNextCategory {
	try {
		let allLocations = categoriesList.map((category) => category.location);
		let allCategories = categoriesList.map(
			(category) => category.category_name
		);
		let currentLocationIndex = allLocations.indexOf(args.location);
		let next_location = allLocations[currentLocationIndex + 1];
		let next_category = allCategories[currentLocationIndex + 1];
		return {
			next_location,
			next_category,
		};
	} catch (err: any) {
		console.log(err);
		return null as unknown as IHandleClickNextCategory;
	}
}

interface IHandleClickNextCategory {
	next_location: string;
	next_category: string;
}
