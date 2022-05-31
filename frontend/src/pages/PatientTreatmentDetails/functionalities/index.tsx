import React, { Fragment } from "react";
import styled from "styled-components";
import FavouritesHook from "../../../hooks/favourites";
import { getFavourites } from "../../../helpers/functions";
import ChiefComplaints from "./ChiefComplaints";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";
import StickyFooter from "../../../components/StickyFooter";
import { FunctionalitySwitch } from "./functionalitySwitch";
import InputDialog from "../../../components/InputDialog";

let FunctionalityContainer = styled.div`
	min-height: 1000px;
`;

const Functionalities = () => {
	return (
		<Fragment>
			<FunctionalityContainer>
				<FunctionalitySwitch />
			</FunctionalityContainer>
			<InputDialog />
			<StickyFooter />
		</Fragment>
	);
};

export default Functionalities;
