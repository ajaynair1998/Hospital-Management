import React from "react";
import styled from "styled-components";
import FavouritesHook from "../../../hooks/favourites";
import { getFavourites } from "../../../helpers/functions";
import ChiefComplaints from "./ChiefComplaints";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";

let FunctionalityContainer = styled.div``;

const Functionalities = () => {
	return (
		<FunctionalityContainer>
			<ChiefComplaints />
		</FunctionalityContainer>
	);
};

export default Functionalities;
