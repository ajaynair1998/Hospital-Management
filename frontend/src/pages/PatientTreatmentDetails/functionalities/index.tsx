import React from "react";
import styled from "styled-components";
import FavouritesHook from "../../../hooks/favourites";
import { getFavourites } from "../../../helpers/functions";
import ChiefComplaints from "./ChiefComplaints";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";

let FunctionalityContainer = styled.div``;

const Functionalities = () => {
	let { data } = useSelector((state: IStore) => state.favouritesDataStore);
	FavouritesHook();
	let addNewFavourite = async (
		category: string,
		data: string
	): Promise<any> => {
		try {
			let response = await window.electron.favouritesApi.post({
				category,
				data,
			});
			if (response.status === 200) {
				let allFavourites = await getFavourites();
				console.log(allFavourites);
			}
			console.log(response);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	return (
		<FunctionalityContainer>
			<ChiefComplaints addNewFavourite={addNewFavourite} favourites={data} />
		</FunctionalityContainer>
	);
};

export default Functionalities;
