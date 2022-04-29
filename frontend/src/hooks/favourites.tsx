import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../helpers/functions";
import { IStore } from "../helpers/interfaces";
import { setFavourites } from "../redux/Reducers/favouritesDataReducer";

const FavouritesHook = () => {
	const dispatch = useDispatch();
	const [favourites, setFavouritesInState] = useState([]);
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	let location = data.location;

	useEffect(() => {
		fetchAllFavourites();
	}, [data]);

	async function fetchAllFavourites() {
		try {
			let favourites = await getFavourites(data.location);
			if (favourites.status === 200) {
				setFavouritesInState(data);
				dispatch(setFavourites(favourites.data));
			}
		} catch (err) {
			console.log(err);
		}
	}

	return favourites;
};

export default FavouritesHook;
