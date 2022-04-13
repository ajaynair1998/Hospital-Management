import React, { useEffect } from "react";
import { IStore } from "../../helpers/interfaces";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Favourites from "../../components/favourites";
import BasicSaveAllButton from "../../components/save-all-button";
import SelectionArray from "../../components/selection-array";
import TextFieldComponent from "../../components/text-field";
import FavouritesHook from "../../hooks/favourites";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;
const ChiefComplaints = () => {
	let favourites = FavouritesHook();

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
