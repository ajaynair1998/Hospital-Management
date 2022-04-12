import React, { useEffect } from "react";
import IStore from "../../models/store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Favourites from "../../components/favourites";
import BasicSaveAllButton from "../../components/save-all-button";
import SelectionArray from "../../components/selection-array";
import TextFieldComponent from "../../components/text-field";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;
const ChiefComplaints = () => {
	let { data } = useSelector((state: IStore) => state.favouritesDataStore);

	useEffect(() => {
		fetchAllFavourites();
	}, []);

	async function fetchAllFavourites() {
		try {
			let data = await window.electron.favouritesApi.get({
				type: "chief-complaints",
			});
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Container>
			<Favourites />
			<SelectionArray />
			<TextFieldComponent />
			<BasicSaveAllButton onClick={() => {}} text={"Save"} />
		</Container>
	);
};

export default ChiefComplaints;
