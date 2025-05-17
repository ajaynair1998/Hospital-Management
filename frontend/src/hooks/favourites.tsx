import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../helpers/functions";
import { IStore } from "../helpers/interfaces";
import { setFavourites } from "../redux/reducers/favouritesDataReducer";

const FavouritesHook = () => {
	const dispatch = useDispatch();
	const [favourites, setFavouritesInState]: any[] = useState([]);
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	let location = data.location;
	useEffect(() => {
		fetchAllFavourites();
	}, [data]);

	async function fetchAllFavourites() {
		try {
			let favouritesFromBackend = await getFavourites(data.location);
			if (favouritesFromBackend.status === 200) {
				setFavouritesInState(favouritesFromBackend.data);
				dispatch(setFavourites(favouritesFromBackend.data));
			}
		} catch (err) {
			console.log(err);
		}
	}

	return favourites;
};

export default FavouritesHook;
