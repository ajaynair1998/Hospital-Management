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
