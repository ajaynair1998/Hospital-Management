import React, { Fragment } from "react";
import styled from "styled-components";
import FavouritesHook from "../../../hooks/favourites";
import { getFavourites } from "../../../helpers/functions";
import ChiefComplaints from "./ChiefComplaints";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";
import StickyFooter from "../../../components/StickyFooter";

let FunctionalityContainer = styled.div`
	min-height: 1000px;
`;

const Functionalities = () => {
	return (
		<Fragment>
			<FunctionalityContainer>
				<ChiefComplaints />
			</FunctionalityContainer>
			<StickyFooter />
		</Fragment>
	);
};

export default Functionalities;
