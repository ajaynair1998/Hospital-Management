import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../helpers/interfaces";

const FavouritesHook = () => {
	const [favourites, setFavourites] = useState([]);
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	let location = data.location;

	useEffect(() => {
		fetchAllFavourites();
	}, [data]);

	async function fetchAllFavourites() {
		try {
			let data = await window.electron.favouritesApi.get({
				type: location,
			});
			setFavourites(data);
		} catch (err) {
			console.log(err);
		}
	}

	return favourites;
};

export default FavouritesHook;
